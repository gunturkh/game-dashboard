import{R as p,j as t,F as C,H as D,r as k,c as l,C as M,J as h,I as i,D as q}from"./index.c3bfd613.js";import{a as z}from"./table-data.7e3f09c1.js";import{r as c}from"./index.8a249f4e.js";import{G as O}from"./GlobalFilter.3b78961d.js";const y=p.forwardRef(({indeterminate:n,...d},o)=>{const m=p.useRef(),r=o||m;return p.useEffect(()=>{r.current.indeterminate=n},[r,n]),t(C,{children:t("input",{type:"checkbox",ref:r,...d,className:"table-checkbox"})})}),W=()=>{const n=D(),d=[{name:"send",icon:"ph:paper-plane-right",doit:()=>{n("/invoice-add")}},{name:"view",icon:"heroicons-outline:eye",doit:()=>{n("/invoice-preview")}},{name:"edit",icon:"heroicons:pencil-square",doit:e=>{n("/invoice-edit")}},{name:"delete",icon:"heroicons-outline:trash",doit:e=>null}],o=[{Header:"Id",accessor:"id",Cell:e=>{var a;return t("span",{children:(a=e==null?void 0:e.cell)==null?void 0:a.value})}},{Header:"Order",accessor:"order",Cell:e=>{var a;return l("span",{children:["#",(a=e==null?void 0:e.cell)==null?void 0:a.value]})}},{Header:"customer",accessor:"customer",Cell:e=>{var a,s;return t("div",{children:l("span",{className:"inline-flex items-center",children:[t("span",{className:"w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600",children:t("img",{src:(a=e==null?void 0:e.cell)==null?void 0:a.value.image,alt:"",className:"object-cover w-full h-full rounded-full"})}),t("span",{className:"text-sm text-slate-600 dark:text-slate-300 capitalize",children:(s=e==null?void 0:e.cell)==null?void 0:s.value.name})]})})}},{Header:"date",accessor:"date",Cell:e=>{var a;return t("span",{children:(a=e==null?void 0:e.cell)==null?void 0:a.value})}},{Header:"quantity",accessor:"quantity",Cell:e=>{var a;return t("span",{children:(a=e==null?void 0:e.cell)==null?void 0:a.value})}},{Header:"amount",accessor:"amount",Cell:e=>{var a;return t("span",{children:(a=e==null?void 0:e.cell)==null?void 0:a.value})}},{Header:"status",accessor:"status",Cell:e=>{var a,s,f,N;return t("span",{className:"block w-full",children:t("span",{className:` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${((a=e==null?void 0:e.cell)==null?void 0:a.value)==="paid"?"text-success-500 bg-success-500":""} 
            ${((s=e==null?void 0:e.cell)==null?void 0:s.value)==="due"?"text-warning-500 bg-warning-500":""}
            ${((f=e==null?void 0:e.cell)==null?void 0:f.value)==="cancled"?"text-danger-500 bg-danger-500":""}
            
             `,children:(N=e==null?void 0:e.cell)==null?void 0:N.value})})}},{Header:"action",accessor:"action",Cell:e=>t("div",{children:t(q,{classMenuItems:"right-0 w-[140px] top-[110%] ",label:t("span",{className:"text-xl text-center block w-full",children:t(i,{icon:"heroicons-outline:dots-vertical"})}),children:t("div",{className:"divide-y divide-slate-100 dark:divide-slate-800",children:d.map((a,s)=>l("div",{onClick:()=>a.doit(),className:`
                
                  ${a.name==="delete"?"bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white":"hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"}
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `,children:[t("span",{className:"text-base",children:t(i,{icon:a.icon})}),t("span",{children:a.name})]},s))})})})}],m=k.exports.useMemo(()=>o,[]),r=k.exports.useMemo(()=>z,[]),P=c.exports.useTable({columns:m,data:r},c.exports.useGlobalFilter,c.exports.useSortBy,c.exports.usePagination,c.exports.useRowSelect,e=>{e.visibleColumns.push(a=>[{id:"selection",Header:({getToggleAllRowsSelectedProps:s})=>t("div",{children:t(y,{...s()})}),Cell:({row:s})=>t("div",{children:t(y,{...s.getToggleRowSelectedProps()})})},...a])}),{getTableProps:H,getTableBodyProps:R,headerGroups:F,footerGroups:A,page:S,nextPage:G,previousPage:I,canNextPage:x,canPreviousPage:b,pageOptions:g,state:T,gotoPage:v,pageCount:E,setPageSize:J,setGlobalFilter:$,prepareRow:j}=P,{globalFilter:B,pageIndex:u,pageSize:L}=T;return t(C,{children:l(M,{noborder:!0,children:[l("div",{className:"md:flex pb-6 items-center",children:[t("h6",{className:"flex-1 md:mb-0 mb-3",children:"Invoice"}),l("div",{className:"md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse",children:[t(O,{filter:B,setFilter:$}),t(h,{icon:"heroicons-outline:calendar",text:"Select date",className:" btn-outline-secondary dark:border-slate-700  text-slate-600 btn-sm font-normal dark:text-slate-300 ",iconClass:"text-lg"}),t(h,{icon:"heroicons-outline:filter",text:"Filter",className:" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm ",iconClass:"text-lg"}),t(h,{icon:"heroicons-outline:plus-sm",text:"Add Record",className:" btn-dark font-normal btn-sm ",iconClass:"text-lg",onClick:()=>{n("/invoice-add")}})]})]}),t("div",{className:"overflow-x-auto -mx-6",children:t("div",{className:"inline-block min-w-full align-middle",children:t("div",{className:"overflow-hidden ",children:l("table",{className:"min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700",...H,children:[t("thead",{className:" border-t border-slate-100 dark:border-slate-800",children:F.map(e=>t("tr",{...e.getHeaderGroupProps(),children:e.headers.map(a=>l("th",{...a.getHeaderProps(a.getSortByToggleProps()),scope:"col",className:" table-th ",children:[a.render("Header"),t("span",{children:a.isSorted?a.isSortedDesc?" \u{1F53D}":" \u{1F53C}":""})]}))}))}),t("tbody",{className:"bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700",...R,children:S.map(e=>(j(e),t("tr",{...e.getRowProps(),children:e.cells.map(a=>t("td",{...a.getCellProps(),className:"table-td",children:a.render("Cell")}))})))})]})})})}),l("div",{className:"md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center",children:[l("div",{className:" flex items-center space-x-3 rtl:space-x-reverse",children:[l("span",{className:" flex space-x-2  rtl:space-x-reverse items-center",children:[t("span",{className:" text-sm font-medium text-slate-600 dark:text-slate-300",children:"Go"}),t("span",{children:t("input",{type:"number",className:" form-control py-2",defaultValue:u+1,onChange:e=>{const a=e.target.value?Number(e.target.value)-1:0;v(a)},style:{width:"50px"}})})]}),l("span",{className:"text-sm font-medium text-slate-600 dark:text-slate-300",children:["Page"," ",l("span",{children:[u+1," of ",g.length]})]})]}),l("ul",{className:"flex items-center  space-x-3  rtl:space-x-reverse",children:[t("li",{className:"text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180",children:t("button",{className:` ${b?"":"opacity-50 cursor-not-allowed"}`,onClick:()=>I(),disabled:!b,children:t(i,{icon:"heroicons-outline:chevron-left"})})}),g.map((e,a)=>t("li",{children:t("button",{href:"#","aria-current":"page",className:` ${a===u?"bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium ":"bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "}    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`,onClick:()=>v(a),children:e+1})},a)),t("li",{className:"text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180",children:t("button",{className:` ${x?"":"opacity-50 cursor-not-allowed"}`,onClick:()=>G(),disabled:!x,children:t(i,{icon:"heroicons-outline:chevron-right"})})})]})]})]})})};export{W as default};
