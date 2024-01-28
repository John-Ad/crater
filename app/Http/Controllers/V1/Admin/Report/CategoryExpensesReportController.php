<?php

namespace Crater\Http\Controllers\V1\Admin\Report;

use PDF;
use Carbon\Carbon;
use Crater\Models\Company;
use Crater\Models\Expense;
use Crater\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Crater\Models\CompanySetting;
use Illuminate\Support\Facades\App;
use Crater\Http\Controllers\Controller;

class CategoryExpensesReportController extends Controller
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
            return $this->downloadCSV($expenseCategories, $from_date, $to_date, $totalAmount, $currency, $company);
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

        $reportName = 'app.pdf.reports.expenses';

        view()->share([
            'expenseCategories' => $expenseCategories,
            'colorSettings' => $colorSettings,
            'totalExpense' => $totalAmount,
            'company' => $company,
            'from_date' => $from_date,
            'to_date' => $to_date,
            'currency' => $currency,
        ]);
        $pdf = PDF::loadView($reportName);

        if ($request->has('preview')) {
            return view($reportName);
        }

        if ($request->has('download')) {
            return $pdf->download();
        }

        return $pdf->stream();
    }

    /**
     * Creates CSV file for download
     * 
     * @param array[] $expenseCategories
     * @param string $from_date
     * @param string $to_date
     * @param float $totalAmount
     * @param Currency $currency
     * @param Company $company
     * @return \Illuminate\Support\Facades\Response
     */
    private function downloadCSV($expenseCategories, $from_date, $to_date, $totalAmount, $currency, $company)
    {
        return response()->streamDownload(function () use ($expenseCategories, $from_date, $to_date, $totalAmount, $currency, $company) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [$company->name, '']);
            fputcsv($handle, [trans('pdf_expense_by_category_report_label'), $from_date . ' - ' . $to_date]);
            fputcsv($handle, ['', '']);
            fputcsv($handle, ['Category', 'Total Amount']);

            foreach ($expenseCategories as $expenseCategory) {
                fputcsv($handle, [$expenseCategory->category->name, format_money($expenseCategory->total_amount, $currency)]);
            }

            fputcsv($handle, ['----', '----']);
            fputcsv($handle, ['Total', format_money($totalAmount, $currency)]);

            fclose($handle);

        }, 'expensesByCategory.csv');
    }
}
