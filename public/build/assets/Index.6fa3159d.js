import{J as L,a0 as I,B as g,I as t,k as T,C as N,D as H,r as f,o as F,e as z,h as p,f as e,w as i,u as b,i as q,t as x,U as E,l as Z,m as X}from"./vendor.cacf1c49.js";import{d as G,b as J}from"./main.4ef36092.js";const ee={class:"grid gap-8 md:grid-cols-12 pt-10"},te={class:"col-span-8 md:col-span-4"},ae={class:"flex flex-col my-6 lg:space-x-3 lg:flex-row"},oe=p("div",{class:"hidden w-5 h-0 mx-4 border border-gray-400 border-solid xl:block",style:{"margin-top":"2.5rem"}},null,-1),re={class:"col-span-8"},ne=["src"],le={setup(j){const{t:h}=L(),D=G();D.downloadReportPDF=V,D.downloadReportCSV=S;const c=I([{label:h("dateRange.today"),key:"Today"},{label:h("dateRange.this_week"),key:"This Week"},{label:h("dateRange.this_month"),key:"This Month"},{label:h("dateRange.this_quarter"),key:"This Quarter"},{label:h("dateRange.this_year"),key:"This Year"},{label:h("dateRange.previous_week"),key:"Previous Week"},{label:h("dateRange.previous_month"),key:"Previous Month"},{label:h("dateRange.previous_quarter"),key:"Previous Quarter"},{label:h("dateRange.previous_year"),key:"Previous Year"},{label:h("dateRange.custom"),key:"Custom"}]),k=g(c[2]),s=g(["By Customer","By Item"]),y=g("By Customer");let B=g(new Date),R=g(null),o=g(null),O=g(null),a=I({from_date:t().startOf("month").format("YYYY-MM-DD").toString(),to_date:t().endOf("month").format("YYYY-MM-DD").toString()});const r=J(),m=T(()=>R.value),d=T(()=>r.selectedCompany),w=T(()=>`${o.value}?from_date=${t(a.from_date).format("YYYY-MM-DD")}&to_date=${t(a.to_date).format("YYYY-MM-DD")}`),C=T(()=>`${O.value}?from_date=${t(a.from_date).format("YYYY-MM-DD")}&to_date=${t(a.to_date).format("YYYY-MM-DD")}`);N(B,n=>{a.from_date=t(n).startOf("year").toString(),a.to_date=t(n).endOf("year").toString()}),H(()=>{o.value=`/reports/sales/customers/${d.value.unique_hash}`,O.value=`/reports/sales/items/${d.value.unique_hash}`,l()});function _(n,u){return t()[n](u).format("YYYY-MM-DD")}function Y(n,u){return t().subtract(1,u)[n](u).format("YYYY-MM-DD")}function W(){switch(k.value.key){case"Today":a.from_date=t().format("YYYY-MM-DD"),a.to_date=t().format("YYYY-MM-DD");break;case"This Week":a.from_date=_("startOf","isoWeek"),a.to_date=_("endOf","isoWeek");break;case"This Month":a.from_date=_("startOf","month"),a.to_date=_("endOf","month");break;case"This Quarter":a.from_date=_("startOf","quarter"),a.to_date=_("endOf","quarter");break;case"This Year":a.from_date=_("startOf","year"),a.to_date=_("endOf","year");break;case"Previous Week":a.from_date=Y("startOf","isoWeek"),a.to_date=Y("endOf","isoWeek");break;case"Previous Month":a.from_date=Y("startOf","month"),a.to_date=Y("endOf","month");break;case"Previous Quarter":a.from_date=Y("startOf","quarter"),a.to_date=Y("endOf","quarter");break;case"Previous Year":a.from_date=Y("startOf","year"),a.to_date=Y("endOf","year");break}}async function l(){return y.value==="By Customer"?(R.value=w.value,!0):(R.value=C.value,!0)}async function v(){let n=await P();return window.open(m.value,"_blank"),n}function P(){return y.value==="By Customer"?(R.value=w.value,!0):(R.value=C.value,!0)}function V(){if(!P())return!1;window.open(m.value+"&download=true"),setTimeout(()=>y.value==="By Customer"?(R.value=w.value,!0):(R.value=C.value,!0),200)}function S(){if(!P())return!1;window.open(m.value+"&download=true&csv=true"),setTimeout(()=>y.value==="By Customer"?(R.value=w.value,!0):(R.value=C.value,!0),200)}return(n,u)=>{const M=f("BaseMultiselect"),U=f("BaseInputGroup"),Q=f("BaseDatePicker"),A=f("BaseButton"),K=f("BaseIcon");return F(),z("div",ee,[p("div",te,[e(U,{label:n.$t("reports.sales.date_range"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(M,{modelValue:k.value,"onUpdate:modelValue":[u[0]||(u[0]=$=>k.value=$),W],options:b(c),"value-prop":"key","track-by":"key",label:"label",object:""},null,8,["modelValue","options"])]),_:1},8,["label"]),p("div",ae,[e(U,{label:n.$t("reports.sales.from_date")},{default:i(()=>[e(Q,{modelValue:b(a).from_date,"onUpdate:modelValue":u[1]||(u[1]=$=>b(a).from_date=$)},null,8,["modelValue"])]),_:1},8,["label"]),oe,e(U,{label:n.$t("reports.sales.to_date")},{default:i(()=>[e(Q,{modelValue:b(a).to_date,"onUpdate:modelValue":u[2]||(u[2]=$=>b(a).to_date=$)},null,8,["modelValue"])]),_:1},8,["label"])]),e(U,{label:n.$t("reports.sales.report_type"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(M,{modelValue:y.value,"onUpdate:modelValue":[u[3]||(u[3]=$=>y.value=$),l],options:s.value,placeholder:n.$t("reports.sales.report_type"),class:"mt-1"},null,8,["modelValue","options","placeholder"])]),_:1},8,["label"]),e(A,{variant:"primary-outline",class:"content-center hidden mt-0 w-md md:flex md:mt-8",type:"submit",onClick:E(P,["prevent"])},{default:i(()=>[q(x(n.$t("reports.update_report")),1)]),_:1},8,["onClick"])]),p("div",re,[p("iframe",{src:b(m),class:"hidden w-full h-screen border-gray-100 border-solid rounded md:flex"},null,8,ne),p("a",{class:"flex items-center justify-center h-10 px-5 py-1 text-sm font-medium leading-none text-center text-white rounded whitespace-nowrap md:hidden bg-primary-500",onClick:v},[e(K,{name:"DocumentTextIcon",class:"h-5 mr-2"}),p("span",null,x(n.$t("reports.view_pdf")),1)])])])}}},se={class:"grid gap-8 md:grid-cols-12 pt-10"},de={class:"col-span-8 md:col-span-4"},ue={class:"flex flex-col mt-6 lg:space-x-3 lg:flex-row"},ie=p("div",{class:"hidden w-5 h-0 mx-4 border border-gray-400 border-solid xl:block",style:{"margin-top":"2.5rem"}},null,-1),ce={class:"flex flex-col mt-6 lg:space-x-3 lg:flex-row"},me={class:"col-span-8"},pe=["src"],fe={setup(j){const h=G(),D=J(),{t:c}=L();h.downloadReportPDF=V,h.downloadReportCSV=S;const k=I([{label:c("dateRange.today"),key:"Today"},{label:c("dateRange.this_week"),key:"This Week"},{label:c("dateRange.this_month"),key:"This Month"},{label:c("dateRange.this_quarter"),key:"This Quarter"},{label:c("dateRange.this_year"),key:"This Year"},{label:c("dateRange.previous_week"),key:"Previous Week"},{label:c("dateRange.previous_month"),key:"Previous Month"},{label:c("dateRange.previous_quarter"),key:"Previous Quarter"},{label:c("dateRange.previous_year"),key:"Previous Year"},{label:c("dateRange.custom"),key:"Custom"}]),s=g(["By Category","By Item"]),y=g("By Category"),B=g(k[2]);let R=g(new Date),o=g(null),O=g(null),a=g(null);const r=I({from_date:t().startOf("month").toString(),to_date:t().endOf("month").toString()}),m=T(()=>o.value),d=T(()=>D.selectedCompany),w=T(()=>`${O.value}?from_date=${t(r.from_date).format("YYYY-MM-DD")}&to_date=${t(r.to_date).format("YYYY-MM-DD")}`),C=T(()=>`${a.value}?from_date=${t(r.from_date).format("YYYY-MM-DD")}&to_date=${t(r.to_date).format("YYYY-MM-DD")}`);H(()=>{O.value=`/reports/expenses/categories/${d.value.unique_hash}`,a.value=`/reports/expenses/items/${d.value.unique_hash}`,l()}),N(()=>R,n=>{r.from_date=t(n).startOf("year").toString(),r.to_date=t(n).endOf("year").toString()});function _(n,u){return t()[n](u).format("YYYY-MM-DD")}function Y(n,u){return t().subtract(1,u)[n](u).format("YYYY-MM-DD")}function W(){switch(B.value.key){case"Today":r.from_date=t().format("YYYY-MM-DD"),r.to_date=t().format("YYYY-MM-DD");break;case"This Week":r.from_date=_("startOf","isoWeek"),r.to_date=_("endOf","isoWeek");break;case"This Month":r.from_date=_("startOf","month"),r.to_date=_("endOf","month");break;case"This Quarter":r.from_date=_("startOf","quarter"),r.to_date=_("endOf","quarter");break;case"This Year":r.from_date=_("startOf","year"),r.to_date=_("endOf","year");break;case"Previous Week":r.from_date=Y("startOf","isoWeek"),r.to_date=Y("endOf","isoWeek");break;case"Previous Month":r.from_date=Y("startOf","month"),r.to_date=Y("endOf","month");break;case"Previous Quarter":r.from_date=Y("startOf","quarter"),r.to_date=Y("endOf","quarter");break;case"Previous Year":r.from_date=Y("startOf","year"),r.to_date=Y("endOf","year");break}}async function l(){return y.value==="By Category"?(o.value=w.value,!0):(o.value=C.value,!0)}async function v(){let n=await P();return window.open(m.value,"_blank"),n}function P(){return y.value==="By Category"?(o.value=w.value,!0):(o.value=C.value,!0)}function V(){if(!P())return!1;window.open(m.value+"&download=true&pdf=true"),setTimeout(()=>{o.value=dateRangeUrl.value},200)}function S(){if(!P())return!1;window.open(m.value+"&download=true&csv=true"),setTimeout(()=>{o.value=dateRangeUrl.value},200)}return(n,u)=>{const M=f("BaseMultiselect"),U=f("BaseInputGroup"),Q=f("BaseDatePicker"),A=f("BaseButton"),K=f("BaseIcon");return F(),z("div",se,[p("div",de,[e(U,{label:n.$t("reports.sales.date_range"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(M,{modelValue:B.value,"onUpdate:modelValue":[u[0]||(u[0]=$=>B.value=$),W],options:b(k),"value-prop":"key","track-by":"key",label:"label",object:""},null,8,["modelValue","options"])]),_:1},8,["label"]),p("div",ue,[e(U,{label:n.$t("reports.expenses.from_date")},{default:i(()=>[e(Q,{modelValue:b(r).from_date,"onUpdate:modelValue":u[1]||(u[1]=$=>b(r).from_date=$)},null,8,["modelValue"])]),_:1},8,["label"]),ie,e(U,{label:n.$t("reports.expenses.to_date")},{default:i(()=>[e(Q,{modelValue:b(r).to_date,"onUpdate:modelValue":u[2]||(u[2]=$=>b(r).to_date=$)},null,8,["modelValue"])]),_:1},8,["label"])]),p("div",ce,[e(U,{label:n.$t("reports.sales.report_type"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(M,{modelValue:y.value,"onUpdate:modelValue":[u[3]||(u[3]=$=>y.value=$),l],options:s.value,placeholder:n.$t("reports.sales.report_type"),class:"mt-1"},null,8,["modelValue","options","placeholder"])]),_:1},8,["label"])]),e(A,{variant:"primary-outline",class:"content-center hidden mt-0 w-md md:flex md:mt-8",type:"submit",onClick:E(P,["prevent"])},{default:i(()=>[q(x(n.$t("reports.update_report")),1)]),_:1},8,["onClick"])]),p("div",me,[p("iframe",{src:b(m),class:"hidden w-full h-screen border-gray-100 border-solid rounded md:flex"},null,8,pe),p("a",{class:"flex items-center justify-center h-10 px-5 py-1 text-sm font-medium leading-none text-center text-white rounded whitespace-nowrap md:hidden bg-primary-500 cursor-pointer",onClick:v},[e(K,{name:"DocumentTextIcon",class:"h-5 mr-2"}),p("span",null,x(n.$t("reports.view_pdf")),1)])])])}}},_e={class:"grid gap-8 md:grid-cols-12 pt-10"},ve={class:"col-span-8 md:col-span-4"},ye={class:"flex flex-col mt-6 lg:space-x-3 lg:flex-row"},be=p("div",{class:"hidden w-5 h-0 mx-4 border border-gray-400 border-solid xl:block",style:{"margin-top":"2.5rem"}},null,-1),ke={class:"col-span-8"},he=["src"],ge={setup(j){const h=G(),D=J(),{t:c}=L();h.downloadReportPDF=Y,h.downloadReportCSV=W;const k=I([{label:c("dateRange.today"),key:"Today"},{label:c("dateRange.this_week"),key:"This Week"},{label:c("dateRange.this_month"),key:"This Month"},{label:c("dateRange.this_quarter"),key:"This Quarter"},{label:c("dateRange.this_year"),key:"This Year"},{label:c("dateRange.previous_week"),key:"Previous Week"},{label:c("dateRange.previous_month"),key:"Previous Month"},{label:c("dateRange.previous_quarter"),key:"Previous Quarter"},{label:c("dateRange.previous_year"),key:"Previous Year"},{label:c("dateRange.custom"),key:"Custom"}]),s=g(k[2]);let y=g(null),B=g(null),R=g(new Date);const o=I({from_date:t().startOf("month").toString(),to_date:t().endOf("month").toString()}),O=T(()=>y.value),a=T(()=>D.selectedCompany),r=T(()=>`${B.value}?from_date=${t(o.from_date).format("YYYY-MM-DD")}&to_date=${t(o.to_date).format("YYYY-MM-DD")}`);N(R,l=>{o.from_date=t(l).startOf("year").toString(),o.to_date=t(l).endOf("year").toString()}),H(()=>{B.value=`/reports/profit-loss/${a.value.unique_hash}`,y.value=r.value});function m(l,v){return t()[l](v).format("YYYY-MM-DD")}function d(l,v){return t().subtract(1,v)[l](v).format("YYYY-MM-DD")}function w(){switch(s.value.key){case"Today":o.from_date=t().format("YYYY-MM-DD"),o.to_date=t().format("YYYY-MM-DD");break;case"This Week":o.from_date=m("startOf","isoWeek"),o.to_date=m("endOf","isoWeek");break;case"This Month":o.from_date=m("startOf","month"),o.to_date=m("endOf","month");break;case"This Quarter":o.from_date=m("startOf","quarter"),o.to_date=m("endOf","quarter");break;case"This Year":o.from_date=m("startOf","year"),o.to_date=m("endOf","year");break;case"Previous Week":o.from_date=d("startOf","isoWeek"),o.to_date=d("endOf","isoWeek");break;case"Previous Month":o.from_date=d("startOf","month"),o.to_date=d("endOf","month");break;case"Previous Quarter":o.from_date=d("startOf","quarter"),o.to_date=d("endOf","quarter");break;case"Previous Year":o.from_date=d("startOf","year"),o.to_date=d("endOf","year");break}}async function C(){let l=await _();return window.open(O.value,"_blank"),l}function _(){return y.value=r.value,!0}function Y(){!_(),window.open(O.value+"&download=true"),setTimeout(()=>{y.value=r.value},200)}function W(){!_(),window.open(O.value+"&download=true&csv=true"),setTimeout(()=>{y.value=r.value},200)}return(l,v)=>{const P=f("BaseMultiselect"),V=f("BaseInputGroup"),S=f("BaseDatePicker"),n=f("BaseButton"),u=f("BaseIcon");return F(),z("div",_e,[p("div",ve,[e(V,{label:l.$t("reports.profit_loss.date_range"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(P,{modelValue:s.value,"onUpdate:modelValue":[v[0]||(v[0]=M=>s.value=M),w],options:b(k),"value-prop":"key","track-by":"key",label:"label",object:""},null,8,["modelValue","options"])]),_:1},8,["label"]),p("div",ye,[e(V,{label:l.$t("reports.profit_loss.from_date")},{default:i(()=>[e(S,{modelValue:b(o).from_date,"onUpdate:modelValue":v[1]||(v[1]=M=>b(o).from_date=M)},null,8,["modelValue"])]),_:1},8,["label"]),be,e(V,{label:l.$t("reports.profit_loss.to_date")},{default:i(()=>[e(S,{modelValue:b(o).to_date,"onUpdate:modelValue":v[2]||(v[2]=M=>b(o).to_date=M)},null,8,["modelValue"])]),_:1},8,["label"])]),e(n,{variant:"primary-outline",class:"content-center hidden mt-0 w-md md:flex md:mt-8",type:"submit",onClick:E(_,["prevent"])},{default:i(()=>[q(x(l.$t("reports.update_report")),1)]),_:1},8,["onClick"])]),p("div",ke,[p("iframe",{src:b(O),class:"hidden w-full h-screen border-gray-100 border-solid rounded md:flex"},null,8,he),p("a",{class:"flex items-center justify-center h-10 px-5 py-1 text-sm font-medium leading-none text-center text-white rounded whitespace-nowrap md:hidden bg-primary-500",onClick:C},[e(u,{name:"DocumentTextIcon",class:"h-5 mr-2"}),p("span",null,x(l.$t("reports.view_pdf")),1)])])])}}},Ye={class:"grid gap-8 md:grid-cols-12 pt-10"},De={class:"col-span-8 md:col-span-4"},we={class:"flex flex-col mt-6 lg:space-x-3 lg:flex-row"},Re=p("div",{class:"hidden w-5 h-0 mx-4 border border-gray-400 border-solid xl:block",style:{"margin-top":"2.5rem"}},null,-1),Me={class:"col-span-8"},Be=["src"],Oe={setup(j){const h=G();h.downloadReportPDF=Y,h.downloadReportCSV=W;const{t:D}=L(),c=I([{label:D("dateRange.today"),key:"Today"},{label:D("dateRange.this_week"),key:"This Week"},{label:D("dateRange.this_month"),key:"This Month"},{label:D("dateRange.this_quarter"),key:"This Quarter"},{label:D("dateRange.this_year"),key:"This Year"},{label:D("dateRange.previous_week"),key:"Previous Week"},{label:D("dateRange.previous_month"),key:"Previous Month"},{label:D("dateRange.previous_quarter"),key:"Previous Quarter"},{label:D("dateRange.previous_year"),key:"Previous Year"},{label:D("dateRange.custom"),key:"Custom"}]),k=g(c[2]),s=I({from_date:t().startOf("month").format("YYYY-MM-DD").toString(),to_date:t().endOf("month").format("YYYY-MM-DD").toString()});let y=g(null);const B=T(()=>y.value),R=J(),o=T(()=>R.selectedCompany);let O=g(null);H(()=>{O.value=`/reports/tax-summary/${o.value.unique_hash}`,y.value=a.value});const a=T(()=>`${O.value}?from_date=${t(s.from_date).format("YYYY-MM-DD")}&to_date=${t(s.to_date).format("YYYY-MM-DD")}`);let r=g(new Date);N(r.value,l=>{s.from_date=t(l).startOf("year").toString(),s.to_date=t(l).endOf("year").toString()});function m(l,v){return t()[l](v).format("YYYY-MM-DD")}function d(l,v){return t().subtract(1,v)[l](v).format("YYYY-MM-DD")}function w(){switch(k.value.key){case"Today":s.from_date=t().format("YYYY-MM-DD"),s.to_date=t().format("YYYY-MM-DD");break;case"This Week":s.from_date=m("startOf","isoWeek"),s.to_date=m("endOf","isoWeek");break;case"This Month":s.from_date=m("startOf","month"),s.to_date=m("endOf","month");break;case"This Quarter":s.from_date=m("startOf","quarter"),s.to_date=m("endOf","quarter");break;case"This Year":s.from_date=m("startOf","year"),s.to_date=m("endOf","year");break;case"Previous Week":s.from_date=d("startOf","isoWeek"),s.to_date=d("endOf","isoWeek");break;case"Previous Month":s.from_date=d("startOf","month"),s.to_date=d("endOf","month");break;case"Previous Quarter":s.from_date=d("startOf","quarter"),s.to_date=d("endOf","quarter");break;case"Previous Year":s.from_date=d("startOf","year"),s.to_date=d("endOf","year");break}}async function C(){let l=await _();return window.open(B.value,"_blank"),l}function _(){return y.value=a.value,!0}function Y(){!_(),window.open(B.value+"&download=true"),setTimeout(()=>{y.value=a.value},200)}function W(){!_(),window.open(B.value+"&download=true&csv=true"),setTimeout(()=>{y.value=a.value},200)}return(l,v)=>{const P=f("BaseMultiselect"),V=f("BaseInputGroup"),S=f("BaseDatePicker"),n=f("BaseButton"),u=f("BaseIcon");return F(),z("div",Ye,[p("div",De,[e(V,{label:l.$t("reports.taxes.date_range"),class:"col-span-12 md:col-span-8"},{default:i(()=>[e(P,{modelValue:k.value,"onUpdate:modelValue":[v[0]||(v[0]=M=>k.value=M),w],options:b(c),"value-prop":"key","track-by":"key",label:"label",object:""},null,8,["modelValue","options"])]),_:1},8,["label"]),p("div",we,[e(V,{label:l.$t("reports.taxes.from_date")},{default:i(()=>[e(S,{modelValue:b(s).from_date,"onUpdate:modelValue":v[1]||(v[1]=M=>b(s).from_date=M)},null,8,["modelValue"])]),_:1},8,["label"]),Re,e(V,{label:l.$t("reports.taxes.to_date")},{default:i(()=>[e(S,{modelValue:b(s).to_date,"onUpdate:modelValue":v[2]||(v[2]=M=>b(s).to_date=M)},null,8,["modelValue"])]),_:1},8,["label"])]),e(n,{variant:"primary-outline",class:"content-center hidden mt-0 w-md md:flex md:mt-8",type:"submit",onClick:E(_,["prevent"])},{default:i(()=>[q(x(l.$t("reports.update_report")),1)]),_:1},8,["onClick"])]),p("div",Me,[p("iframe",{src:b(B),class:"hidden w-full h-screen border-gray-100 border-solid rounded md:flex"},null,8,Be),p("a",{class:"flex items-center justify-center h-10 px-5 py-1 text-sm font-medium leading-none text-center text-white rounded whitespace-nowrap md:hidden bg-primary-500",onClick:C},[e(u,{name:"DocumentTextIcon",class:"h-5 mr-2"}),p("span",null,x(l.$t("reports.view_pdf")),1)])])])}}},Pe={setup(j){const h=G();function D(){h.downloadReportPDF()}function c(){h.downloadReportCSV()}return(k,s)=>{const y=f("BaseBreadcrumbItem"),B=f("BaseBreadcrumb"),R=f("BaseIcon"),o=f("BaseButton"),O=f("BasePageHeader"),a=f("BaseTab"),r=f("BaseTabGroup"),m=f("BasePage");return F(),Z(m,null,{default:i(()=>[e(O,{title:k.$tc("reports.report",2)},{actions:i(()=>[e(o,{variant:"primary",class:"ml-4",onClick:D},{left:i(d=>[e(R,{name:"DownloadIcon",class:X(d.class)},null,8,["class"])]),default:i(()=>[q(" "+x(k.$t("reports.download_pdf")),1)]),_:1}),e(o,{variant:"primary",class:"ml-4",onClick:c},{left:i(d=>[e(R,{name:"DownloadIcon",class:X(d.class)},null,8,["class"])]),default:i(()=>[q(" "+x(k.$t("reports.download_csv")),1)]),_:1})]),default:i(()=>[e(B,null,{default:i(()=>[e(y,{title:k.$t("general.home"),to:"/admin/dashboard"},null,8,["title"]),e(y,{title:k.$tc("reports.report",2),to:"/admin/reports",active:""},null,8,["title"])]),_:1})]),_:1},8,["title"]),e(r,{class:"p-2"},{default:i(()=>[e(a,{title:k.$t("reports.sales.sales"),"tab-panel-container":"px-0 py-0"},{default:i(()=>[e(le,{ref:(d,w)=>{w.report=d}},null,512)]),_:1},8,["title"]),e(a,{title:k.$t("reports.profit_loss.profit_loss"),"tab-panel-container":"px-0 py-0"},{default:i(()=>[e(ge,{ref:(d,w)=>{w.report=d}},null,512)]),_:1},8,["title"]),e(a,{title:k.$t("reports.expenses.expenses"),"tab-panel-container":"px-0 py-0"},{default:i(()=>[e(fe,{ref:(d,w)=>{w.report=d}},null,512)]),_:1},8,["title"]),e(a,{title:k.$t("reports.taxes.taxes"),"tab-panel-container":"px-0 py-0"},{default:i(()=>[e(Oe,{ref:(d,w)=>{w.report=d}},null,512)]),_:1},8,["title"])]),_:1})]),_:1})}}};export{Pe as default};