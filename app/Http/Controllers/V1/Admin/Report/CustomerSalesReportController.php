<?php

namespace Crater\Http\Controllers\V1\Admin\Report;

use PDF;
use Carbon\Carbon;
use Crater\Models\Company;
use Crater\Models\Currency;
use Crater\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Crater\Models\CompanySetting;
use Illuminate\Support\Facades\App;
use Crater\Http\Controllers\Controller;

class CustomerSalesReportController extends Controller
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

        $start = Carbon::createFromFormat('Y-m-d', $request->from_date);
        $end = Carbon::createFromFormat('Y-m-d', $request->to_date);

        $customers = Customer::with([
            'invoices' => function ($query) use ($start, $end) {
                $query->whereBetween(
                    'invoice_date',
                    [$start->format('Y-m-d'), $end->format('Y-m-d')]
                );
            }
        ])
            ->where('company_id', $company->id)
            ->applyInvoiceFilters($request->only(['from_date', 'to_date']))
            ->get();

        $totalAmount = 0;
        foreach ($customers as $customer) {
            $customerTotalAmount = 0;
            foreach ($customer->invoices as $invoice) {
                $customerTotalAmount += $invoice->base_total;
            }
            $customer->totalAmount = $customerTotalAmount;
            $totalAmount += $customerTotalAmount;
        }

        $dateFormat = CompanySetting::getSetting('carbon_date_format', $company->id);
        $from_date = Carbon::createFromFormat('Y-m-d', $request->from_date)->format($dateFormat);
        $to_date = Carbon::createFromFormat('Y-m-d', $request->to_date)->format($dateFormat);
        $currency = Currency::findOrFail(CompanySetting::getSetting('currency', $company->id));

        // download csv
        if ($request->has('download') && $request->has("csv")) {
            return $this->downloadCSV($customers, $from_date, $to_date, $totalAmount, $currency, $company);
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
            'customers' => $customers,
            'totalAmount' => $totalAmount,
            'colorSettings' => $colorSettings,
            'company' => $company,
            'from_date' => $from_date,
            'to_date' => $to_date,
            'currency' => $currency,
        ]);

        $pdf = PDF::loadView('app.pdf.reports.sales-customers');

        if ($request->has('preview')) {
            return view('app.pdf.reports.sales-customers');
        }

        if ($request->has('download')) {
            return $pdf->download();
        }

        return $pdf->stream();
    }

    /**
     * Creates CSV file for download
     * 
     * @param array[] $customers
     * @param string $from_date
     * @param string $to_date
     * @param float $totalAmount
     * @param Currency $currency
     * @param Company $company
     * @return \Illuminate\Support\Facades\Response
     */
    private function downloadCSV($customers, $from_date, $to_date, $totalAmount, $currency, $company)
    {
        return response()->streamDownload(function () use ($customers, $from_date, $to_date, $totalAmount, $currency, $company) {

            $handle = fopen('php://output', 'w');
            fputcsv($handle, [$company->name, '', '', '']);
            fputcsv($handle, [trans('pdf_customer_sales_report'), $from_date . ' - ' . $to_date]);
            fputcsv($handle, ['', '', '', '']);
            fputcsv($handle, ['Customer', 'Date', 'Invoice Number', 'Amount']);

            foreach ($customers as $customer) {
                $index = 0;
                foreach ($customer->invoices as $invoice) {
                    $row = [$invoice->formattedInvoiceDate, $invoice->invoice_number, format_money($invoice->base_total, $currency)];
                    if ($index == 0) {
                        array_unshift($row, $customer->name);
                    } else {
                        array_unshift($row, '');
                    }
                    fputcsv($handle, $row);
                    $index++;
                }
            }

            fputcsv($handle, ['----', '----', '----', '----']);
            fputcsv($handle, ['Total', '', '', format_money($totalAmount, $currency)]);

            fclose($handle);

        }, 'customer-sales-report.csv');
    }
}
