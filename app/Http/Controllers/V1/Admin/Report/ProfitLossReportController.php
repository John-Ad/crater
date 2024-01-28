<?php

namespace Crater\Http\Controllers\V1\Admin\Report;

use PDF;
use Carbon\Carbon;
use Crater\Models\Company;
use Crater\Models\Expense;
use Crater\Models\Payment;
use Crater\Models\Currency;
use Illuminate\Http\Request;
use Crater\Models\CompanySetting;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Response;
use Crater\Http\Controllers\Controller;

class ProfitLossReportController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $hash
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request, $hash)
    {
        $company = Company::where('unique_hash', $hash)->first();

        $this->authorize('view report', $company);

        $locale = CompanySetting::getSetting('language', $company->id);

        App::setLocale($locale);

        $paymentsAmount = Payment::whereCompanyId($company->id)
            ->applyFilters($request->only(['from_date', 'to_date']))
            ->sum('base_amount');

        $expenseCategories = Expense::with('category')
            ->whereCompanyId($company->id)
            ->applyFilters($request->only(['from_date', 'to_date']))
            ->expensesAttributes()
            ->get();

        $totalAmount = 0;
        foreach ($expenseCategories as $category) {
            $totalAmount += $category->total_amount;
        }

        $dateFormat = CompanySetting::getSetting('carbon_date_format', $company->id);
        $from_date = Carbon::createFromFormat('Y-m-d', $request->from_date)->format($dateFormat);
        $to_date = Carbon::createFromFormat('Y-m-d', $request->to_date)->format($dateFormat);
        $currency = Currency::findOrFail(CompanySetting::getSetting('currency', $company->id));

        // download csv
        if ($request->has('download') && $request->has("csv")) {
            return $this->downloadCSV($paymentsAmount, $expenseCategories, $from_date, $to_date, $totalAmount, $currency, $company);
        }

        $colors = [
            'primary_text_color',
            'heading_text_color',
            'section_heading_text_color',
            'border_color',
            'body_text_color',
            'footer_text_color',
            'footer_total_color',
            'footer_bg_color',
            'date_text_color',
        ];
        $colorSettings = CompanySetting::whereIn('option', $colors)
            ->whereCompany($company->id)
            ->get();

        view()->share([
            'company' => $company,
            'income' => $paymentsAmount,
            'expenseCategories' => $expenseCategories,
            'totalExpense' => $totalAmount,
            'colorSettings' => $colorSettings,
            'company' => $company,
            'from_date' => $from_date,
            'to_date' => $to_date,
            'currency' => $currency,
        ]);
        $pdf = PDF::loadView('app.pdf.reports.profit-loss');

        if ($request->has('preview')) {
            return view('app.pdf.reports.profit-loss');
        }

        if ($request->has('download')) {
            return $pdf->download();
        }

        return $pdf->stream();
    }

    /**
     * Creates CSV file for download
     * 
     * @param float $totalPayments
     * @param array[] $expenseCategory
     * @param string $from_date
     * @param string $to_date
     * @param float $totalExpenses
     * @param Currency $currency
     * @param Company $company
     * @return \Illuminate\Support\Facades\Response
     */
    private function downloadCSV($totalPayments, $expenseCategories, $from_date, $to_date, $totalExpenses, $currency, $company)
    {
        $csvFileName = 'profitLoss.csv';

        return response()->streamDownload(function () use ($totalPayments, $expenseCategories, $from_date, $to_date, $totalExpenses, $currency, $company) {

            $handle = fopen('php://output', 'w');
            fputcsv($handle, [$company->name, '']);
            fputcsv($handle, [trans('pdf_profit_loss_label'), $from_date . ' - ' . $to_date]);
            fputcsv($handle, ['', '']);
            fputcsv($handle, [trans('pdf_income_label'), format_money($totalPayments, $currency)]);
            fputcsv($handle, ['', '']);
            fputcsv($handle, [trans('pdf_expenses_label'), '']);
            fputcsv($handle, ['Category', 'Amount']);
            foreach ($expenseCategories as $expenseCategory) {
                fputcsv($handle, [$expenseCategory->category->name, format_money($expenseCategory->total_amount, $currency)]);
            }

            fputcsv($handle, ['----', '----']);
            fputcsv($handle, ['Total', format_money($totalExpenses, $currency)]);
            fputcsv($handle, ['', '']);
            fputcsv($handle, [trans('pdf_net_profit_label'), format_money($totalPayments - $totalExpenses, $currency)]);

            fclose($handle);

        }, $csvFileName);
    }
}
