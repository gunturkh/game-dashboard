import{H as g,r as o,j as e,F as N,c as t,ba as b,G as f,bh as k,C as P}from"./index.c3bfd613.js";import{d as m}from"./dayjs.min.68b8090d.js";import{r}from"./index.8a249f4e.js";import{e as D}from"./imageApiSlice.1ba03d6d.js";import{A as H}from"./AddCard.65c4e3a3.js";import"./index.esm.a72616c3.js";import"./object.a233b247.js";import"./upperFirst.93ed485a.js";const S=({cardData:i})=>{g();const a=[{Header:"level",accessor:"level",Cell:s=>{var l;return e("span",{className:"flex items-center min-w-[150px]",children:e("span",{className:"text-sm text-slate-600 dark:text-slate-300 capitalize",children:(l=s==null?void 0:s.cell)==null?void 0:l.value})})}},{Header:"upgrade price",accessor:"upgrade_price",Cell:s=>{var l;return e("span",{className:"flex items-center min-w-[150px]",children:e("span",{className:"text-sm text-slate-600 dark:text-slate-300 capitalize",children:(l=s==null?void 0:s.cell)==null?void 0:l.value})})}},{Header:"profit per hour",accessor:"profit_per_hour",Cell:s=>{var l;return e("span",{className:"flex items-center min-w-[150px]",children:e("span",{className:"text-sm text-slate-600 dark:text-slate-300 capitalize",children:(l=s==null?void 0:s.cell)==null?void 0:l.value})})}}],n=o.exports.useMemo(()=>a,[]),c=o.exports.useMemo(()=>i,[]),x=r.exports.useTable({columns:n,data:c,initialState:{pageSize:c.length}},r.exports.useGlobalFilter,r.exports.useSortBy,r.exports.usePagination,r.exports.useRowSelect),{getTableProps:h,getTableBodyProps:u,headerGroups:d,footerGroups:M,page:p,nextPage:Y,previousPage:_,canNextPage:F,canPreviousPage:j,pageOptions:A,state:T,gotoPage:z,pageCount:G,setPageSize:O,setGlobalFilter:R,prepareRow:v}=x;return e(N,{children:e("div",{className:"p-2",children:e("div",{className:"overflow-x-auto -mx-6",children:e("div",{className:"inline-block min-w-full align-middle",children:e("div",{className:"overflow-hidden ",children:t("table",{className:"min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700",...h,children:[e("thead",{className:" bg-slate-100 dark:bg-slate-700",children:d==null?void 0:d.map(s=>e("tr",{...s.getHeaderGroupProps(),children:s.headers.map(l=>t("th",{...l.getHeaderProps(l.getSortByToggleProps()),scope:"col",className:" table-th ",children:[l.render("Header"),e("span",{children:l.isSorted?l.isSortedDesc?" \u{1F53D}":" \u{1F53C}":""})]}))}))}),e("tbody",{className:"bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700",...u,children:p==null?void 0:p.map(s=>(v(s),e("tr",{...s.getRowProps(),children:s.cells.map(l=>e("td",{...l.getCellProps(),className:"table-td py-2",children:l.render("Cell")}))})))})]})})})})})})},J=()=>{const{id:i}=b();f(),console.log("card id",i);const{data:a,isLoading:n,isFetching:c}=D(i,{skipPollingIfUnfocused:!0,refetchOnMountOrArgChange:!0,skip:!1});return console.log("card by id query",a),t("div",{className:" space-y-5",children:[e("div",{className:"grid grid-cols-12 gap-5"}),n||c?e(k,{}):e("div",{className:"grid grid-cols-12 gap-5",children:e("div",{className:"xl:col-span-12 lg:col-span-12 col-span-12",children:t(P,{title:"Card Detail",noborder:!0,children:[t("header",{className:"flex justify-between items-center",children:[t("div",{className:"flex space-x-4 items-center rtl:space-x-reverse",children:[e("div",{className:"flex-none",children:e("img",{src:a==null?void 0:a.icon_url,alt:a==null?void 0:a.name,className:"object-cover w-full h-full rounded-full"})}),e("div",{className:"font-medium text-base leading-6",children:e("div",{className:"dark:text-slate-200 text-slate-900 max-w-[160px] truncate",children:a==null?void 0:a.name})})]}),e("span",{className:"block min-w-[140px] text-left",children:t("span",{className:"inline-block text-center mx-auto py-1",children:[(a==null?void 0:a.is_active)===!1&&t("span",{className:"flex items-center space-x-3 rtl:space-x-reverse",children:[e("span",{className:"h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"}),e("span",{children:"Inactive"})]}),(a==null?void 0:a.is_active)==!0&&t("span",{className:"flex items-center space-x-3 rtl:space-x-reverse",children:[e("span",{className:"h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"}),e("span",{children:"Active"})]})]})})]}),t("div",{className:"text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8",children:["Requirements: ",(a==null?void 0:a.requirements)||"null"]}),t("div",{className:"flex space-x-4 rtl:space-x-reverse",children:[t("div",{children:[e("span",{className:"block date-label",children:"Created At"}),e("span",{className:"block date-text",children:m(a==null?void 0:a.created_at).format("DD/MM/YYYY HH:mm:ss")})]}),t("div",{children:[e("span",{className:"block date-label",children:"Updated At"}),e("span",{className:"block date-text",children:m(a==null?void 0:a.updated_at).format("DD/MM/YYYY HH:mm:ss")})]})]}),e(S,{cardData:a.levels})]})})}),e(H,{})]})};export{J as default};
