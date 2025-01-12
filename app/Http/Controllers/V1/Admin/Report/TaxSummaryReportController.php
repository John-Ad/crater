<?php

namespace Crater\Http\Controllers\V1\Admin\Report;

use PDF;
use Carbon\Carbon;
use Crater\Models\Tax;
use Crater\Models\Company;
use Crater\Models\Currency;
use Illuminate\Http\Request;
use Crater\Models\CompanySetting;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Response;
use Crater\Http\Controllers\Controller;

class TaxSummaryReportController extends Controller
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

        $taxTypes = Tax::with('taxType', 'invoice', 'invoiceItem')
            ->whereCompany($company->id)
            ->whereInvoicesFilters($request->only(['from_date', 'to_date']))
            ->taxAttributes()
            ->get();

        $totalAmount = 0;
        foreach ($taxTypes as $taxType) {
            $totalAmount += $taxType->total_tax_amount;
        }

        $dateFormat = CompanySetting::getSetting('carbon_date_format', $company->id);
        $from_date = Carbon::createFromFormat('Y-m-d', $request->from_date)->format($dateFormat);
        $to_date = Carbon::createFromFormat('Y-m-d', $request->to_date)->format($dateFormat);
        $currency = Currency::findOrFail(CompanySetting::getSetting('currency', $company->id));

        // download csv
        if ($request->has('download') && $request->has("csv")) {
            return $this->downloadCSV($taxTypes, $from_date, $to_date, $totalAmount, $currency, $company);
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
            'taxTypes' => $taxTypes,
            'totalTaxAmount' => $totalAmount,
            'colorSettings' => $colorSettings,
            'company' => $company,
            'from_date' => $from_date,
            'to_date' => $to_date,
            'currency' => $currency,
        ]);

        $pdf = PDF::loadView('app.pdf.reports.tax-summary');

        if ($request->has('preview')) {
            return view('app.pdf.reports.tax-summary');
        }

        if ($request->has('download')) {
            return $pdf->download();
        }

        return $pdf->stream();
    }

    private function downloadCSV($taxTypes, $from_date, $to_date, $totalAmount, $currency, $company)
    {
        $csvFileName = 'taxSummary.csv';

        return response()->streamDownload(function () use ($taxTypes, $from_date, $to_date, $totalAmount, $currency, $company) {

            $handle = fopen('php://output', 'w');
            fputcsv($handle, [$company->name, '']);
            fputcsv($handle, [trans('pdf_tax_summery_label'), $from_date . ' - ' . $to_date]);
            fputcsv($handle, ['', '']);
            fputcsv($handle, ['Name', 'Amount']);

            foreach ($taxTypes as $tax) {
                fputcsv($handle, [$tax->taxType->name, format_money($tax->total_tax_amount, $currency)]);
            }

            fputcsv($handle, ['----', '----']);
            fputcsv($handle, ['Total', format_money($totalAmount, $currency)]);

            fclose($handle);

        }, $csvFileName);
    }
}
