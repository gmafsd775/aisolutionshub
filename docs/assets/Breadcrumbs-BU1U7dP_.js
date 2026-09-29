import{c as r,j as e,L as n}from"./index-CIDoLSVc.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=r("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);function m({label:t,path:s}){const i={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://damha577.online/"},{"@type":"ListItem",position:2,name:t,item:`https://damha577.online${s}`}]};return e.jsxs("nav",{"aria-label":"Breadcrumb",className:"mb-6 text-sm text-muted-foreground",children:[e.jsxs("ol",{className:"flex items-center gap-1.5",children:[e.jsx("li",{children:e.jsx(n,{to:"/",className:"hover:text-foreground transition-colors",children:"Home"})}),e.jsx("li",{"aria-hidden":"true",children:e.jsx(a,{className:"h-3.5 w-3.5"})}),e.jsx("li",{"aria-current":"page",className:"text-foreground",children:t})]}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify(i)})]})}export{m as B};
