import{r as o,j as e,c as r,I as p}from"./index.c3bfd613.js";const x=({items:n,className:d="space-y-5"})=>{const[a,l]=o.exports.useState(null),[c,i]=o.exports.useState(!1),m=s=>{l(s),i(!c)};return e("div",{className:d,children:n.map((s,t)=>r("div",{className:"accordion shadow-base dark:shadow-none rounded-md",children:[r("div",{className:`flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 ${a===t?"bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md ":"bg-white dark:bg-slate-700  rounded-md"}`,onClick:()=>m(t),children:[r("span",{children:[s.title," "]}),e("span",{className:`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5 ${a===t?"rotate-180 transform":""}`,children:e(p,{icon:"heroicons-outline:chevron-down"})})]}),a===t&&e("div",{className:`${t===a?"dark:border dark:border-slate-700 dark:border-t-0":"l"} text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md`,children:e("div",{className:"px-8 py-4",dangerouslySetInnerHTML:{__html:s.content}})})]},t))})};export{x as A};