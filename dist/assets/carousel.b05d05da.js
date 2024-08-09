import{$ as T,X as G,Y as j,Z as _,j as l,S as R,_ as V,c as M,C as z,z as h}from"./index.c3bfd613.js";import{e as X,a as Y,b as U,E as W}from"./effect-cards.min.a0610cd7.js";function O(a=""){return`.${a.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function Z({swiper:a,extendParams:N,on:d,emit:c}){const s="swiper-pagination";N({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${s}-bullet`,bulletActiveClass:`${s}-bullet-active`,modifierClass:`${s}-`,currentClass:`${s}-current`,totalClass:`${s}-total`,hiddenClass:`${s}-hidden`,progressbarFillClass:`${s}-progressbar-fill`,progressbarOppositeClass:`${s}-progressbar-opposite`,clickableClass:`${s}-clickable`,lockClass:`${s}-lock`,horizontalClass:`${s}-horizontal`,verticalClass:`${s}-vertical`,paginationDisabledClass:`${s}-disabled`}}),a.pagination={el:null,$el:null,bullets:[]};let r,f=0;function u(){return!a.params.pagination.el||!a.pagination.el||!a.pagination.$el||a.pagination.$el.length===0}function g(e,t){const{bulletActiveClass:n}=a.params.pagination;e[t]().addClass(`${n}-${t}`)[t]().addClass(`${n}-${t}-${t}`)}function p(){const e=a.rtl,t=a.params.pagination;if(u())return;const n=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,i=a.pagination.$el;let o;const y=a.params.loop?Math.ceil((n-a.loopedSlides*2)/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(o=Math.ceil((a.activeIndex-a.loopedSlides)/a.params.slidesPerGroup),o>n-1-a.loopedSlides*2&&(o-=n-a.loopedSlides*2),o>y-1&&(o-=y),o<0&&a.params.paginationType!=="bullets"&&(o=y+o)):typeof a.snapIndex<"u"?o=a.snapIndex:o=a.activeIndex||0,t.type==="bullets"&&a.pagination.bullets&&a.pagination.bullets.length>0){const m=a.pagination.bullets;let v,$,S;if(t.dynamicBullets&&(r=m.eq(0)[a.isHorizontal()?"outerWidth":"outerHeight"](!0),i.css(a.isHorizontal()?"width":"height",`${r*(t.dynamicMainBullets+4)}px`),t.dynamicMainBullets>1&&a.previousIndex!==void 0&&(f+=o-(a.previousIndex-a.loopedSlides||0),f>t.dynamicMainBullets-1?f=t.dynamicMainBullets-1:f<0&&(f=0)),v=Math.max(o-f,0),$=v+(Math.min(m.length,t.dynamicMainBullets)-1),S=($+v)/2),m.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map(k=>`${t.bulletActiveClass}${k}`).join(" ")),i.length>1)m.each(k=>{const E=T(k),C=E.index();C===o&&E.addClass(t.bulletActiveClass),t.dynamicBullets&&(C>=v&&C<=$&&E.addClass(`${t.bulletActiveClass}-main`),C===v&&g(E,"prev"),C===$&&g(E,"next"))});else{const k=m.eq(o),E=k.index();if(k.addClass(t.bulletActiveClass),t.dynamicBullets){const C=m.eq(v),q=m.eq($);for(let B=v;B<=$;B+=1)m.eq(B).addClass(`${t.bulletActiveClass}-main`);if(a.params.loop)if(E>=m.length){for(let B=t.dynamicMainBullets;B>=0;B-=1)m.eq(m.length-B).addClass(`${t.bulletActiveClass}-main`);m.eq(m.length-t.dynamicMainBullets-1).addClass(`${t.bulletActiveClass}-prev`)}else g(C,"prev"),g(q,"next");else g(C,"prev"),g(q,"next")}}if(t.dynamicBullets){const k=Math.min(m.length,t.dynamicMainBullets+4),E=(r*k-r)/2-S*r,C=e?"right":"left";m.css(a.isHorizontal()?C:"top",`${E}px`)}}if(t.type==="fraction"&&(i.find(O(t.currentClass)).text(t.formatFractionCurrent(o+1)),i.find(O(t.totalClass)).text(t.formatFractionTotal(y))),t.type==="progressbar"){let m;t.progressbarOpposite?m=a.isHorizontal()?"vertical":"horizontal":m=a.isHorizontal()?"horizontal":"vertical";const v=(o+1)/y;let $=1,S=1;m==="horizontal"?$=v:S=v,i.find(O(t.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${$}) scaleY(${S})`).transition(a.params.speed)}t.type==="custom"&&t.renderCustom?(i.html(t.renderCustom(a,o+1,y)),c("paginationRender",i[0])):c("paginationUpdate",i[0]),a.params.watchOverflow&&a.enabled&&i[a.isLocked?"addClass":"removeClass"](t.lockClass)}function b(){const e=a.params.pagination;if(u())return;const t=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,n=a.pagination.$el;let i="";if(e.type==="bullets"){let o=a.params.loop?Math.ceil((t-a.loopedSlides*2)/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&!a.params.loop&&o>t&&(o=t);for(let y=0;y<o;y+=1)e.renderBullet?i+=e.renderBullet.call(a,y,e.bulletClass):i+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;n.html(i),a.pagination.bullets=n.find(O(e.bulletClass))}e.type==="fraction"&&(e.renderFraction?i=e.renderFraction.call(a,e.currentClass,e.totalClass):i=`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,n.html(i)),e.type==="progressbar"&&(e.renderProgressbar?i=e.renderProgressbar.call(a,e.progressbarFillClass):i=`<span class="${e.progressbarFillClass}"></span>`,n.html(i)),e.type!=="custom"&&c("paginationRender",a.pagination.$el[0])}function x(){a.params.pagination=G(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const e=a.params.pagination;if(!e.el)return;let t=T(e.el);t.length!==0&&(a.params.uniqueNavElements&&typeof e.el=="string"&&t.length>1&&(t=a.$el.find(e.el),t.length>1&&(t=t.filter(n=>T(n).parents(".swiper")[0]===a.el))),e.type==="bullets"&&e.clickable&&t.addClass(e.clickableClass),t.addClass(e.modifierClass+e.type),t.addClass(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.type==="bullets"&&e.dynamicBullets&&(t.addClass(`${e.modifierClass}${e.type}-dynamic`),f=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),e.type==="progressbar"&&e.progressbarOpposite&&t.addClass(e.progressbarOppositeClass),e.clickable&&t.on("click",O(e.bulletClass),function(i){i.preventDefault();let o=T(this).index()*a.params.slidesPerGroup;a.params.loop&&(o+=a.loopedSlides),a.slideTo(o)}),Object.assign(a.pagination,{$el:t,el:t[0]}),a.enabled||t.addClass(e.lockClass))}function I(){const e=a.params.pagination;if(u())return;const t=a.pagination.$el;t.removeClass(e.hiddenClass),t.removeClass(e.modifierClass+e.type),t.removeClass(a.isHorizontal()?e.horizontalClass:e.verticalClass),a.pagination.bullets&&a.pagination.bullets.removeClass&&a.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&t.off("click",O(e.bulletClass))}d("init",()=>{a.params.pagination.enabled===!1?F():(x(),b(),p())}),d("activeIndexChange",()=>{(a.params.loop||typeof a.snapIndex>"u")&&p()}),d("snapIndexChange",()=>{a.params.loop||p()}),d("slidesLengthChange",()=>{a.params.loop&&(b(),p())}),d("snapGridLengthChange",()=>{a.params.loop||(b(),p())}),d("destroy",()=>{I()}),d("enable disable",()=>{const{$el:e}=a.pagination;e&&e[a.enabled?"removeClass":"addClass"](a.params.pagination.lockClass)}),d("lock unlock",()=>{p()}),d("click",(e,t)=>{const n=t.target,{$el:i}=a.pagination;if(a.params.pagination.el&&a.params.pagination.hideOnClick&&i&&i.length>0&&!T(n).hasClass(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&n===a.navigation.nextEl||a.navigation.prevEl&&n===a.navigation.prevEl))return;const o=i.hasClass(a.params.pagination.hiddenClass);c(o===!0?"paginationShow":"paginationHide"),i.toggleClass(a.params.pagination.hiddenClass)}});const L=()=>{a.$el.removeClass(a.params.pagination.paginationDisabledClass),a.pagination.$el&&a.pagination.$el.removeClass(a.params.pagination.paginationDisabledClass),x(),b(),p()},F=()=>{a.$el.addClass(a.params.pagination.paginationDisabledClass),a.pagination.$el&&a.pagination.$el.addClass(a.params.pagination.paginationDisabledClass),I()};Object.assign(a.pagination,{enable:L,disable:F,render:b,update:p,init:x,destroy:I})}function J({swiper:a,extendParams:N,on:d,emit:c}){let s;a.autoplay={running:!1,paused:!1},N({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});function r(){if(!a.size){a.autoplay.running=!1,a.autoplay.paused=!1;return}const e=a.slides.eq(a.activeIndex);let t=a.params.autoplay.delay;e.attr("data-swiper-autoplay")&&(t=e.attr("data-swiper-autoplay")||a.params.autoplay.delay),clearTimeout(s),s=_(()=>{let n;a.params.autoplay.reverseDirection?a.params.loop?(a.loopFix(),n=a.slidePrev(a.params.speed,!0,!0),c("autoplay")):a.isBeginning?a.params.autoplay.stopOnLastSlide?u():(n=a.slideTo(a.slides.length-1,a.params.speed,!0,!0),c("autoplay")):(n=a.slidePrev(a.params.speed,!0,!0),c("autoplay")):a.params.loop?(a.loopFix(),n=a.slideNext(a.params.speed,!0,!0),c("autoplay")):a.isEnd?a.params.autoplay.stopOnLastSlide?u():(n=a.slideTo(0,a.params.speed,!0,!0),c("autoplay")):(n=a.slideNext(a.params.speed,!0,!0),c("autoplay")),(a.params.cssMode&&a.autoplay.running||n===!1)&&r()},t)}function f(){return typeof s<"u"||a.autoplay.running?!1:(a.autoplay.running=!0,c("autoplayStart"),r(),!0)}function u(){return!a.autoplay.running||typeof s>"u"?!1:(s&&(clearTimeout(s),s=void 0),a.autoplay.running=!1,c("autoplayStop"),!0)}function g(e){!a.autoplay.running||a.autoplay.paused||(s&&clearTimeout(s),a.autoplay.paused=!0,e===0||!a.params.autoplay.waitForTransition?(a.autoplay.paused=!1,r()):["transitionend","webkitTransitionEnd"].forEach(t=>{a.$wrapperEl[0].addEventListener(t,b)}))}function p(){const e=j();e.visibilityState==="hidden"&&a.autoplay.running&&g(),e.visibilityState==="visible"&&a.autoplay.paused&&(r(),a.autoplay.paused=!1)}function b(e){!a||a.destroyed||!a.$wrapperEl||e.target===a.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach(t=>{a.$wrapperEl[0].removeEventListener(t,b)}),a.autoplay.paused=!1,a.autoplay.running?r():u())}function x(){a.params.autoplay.disableOnInteraction?u():(c("autoplayPause"),g()),["transitionend","webkitTransitionEnd"].forEach(e=>{a.$wrapperEl[0].removeEventListener(e,b)})}function I(){a.params.autoplay.disableOnInteraction||(a.autoplay.paused=!1,c("autoplayResume"),r())}function L(){a.params.autoplay.pauseOnMouseEnter&&(a.$el.on("mouseenter",x),a.$el.on("mouseleave",I))}function F(){a.$el.off("mouseenter",x),a.$el.off("mouseleave",I)}d("init",()=>{a.params.autoplay.enabled&&(f(),j().addEventListener("visibilitychange",p),L())}),d("beforeTransitionStart",(e,t,n)=>{a.autoplay.running&&(n||!a.params.autoplay.disableOnInteraction?a.autoplay.pause(t):u())}),d("sliderFirstMove",()=>{a.autoplay.running&&(a.params.autoplay.disableOnInteraction?u():g())}),d("touchEnd",()=>{a.params.cssMode&&a.autoplay.paused&&!a.params.autoplay.disableOnInteraction&&r()}),d("destroy",()=>{F(),a.autoplay.running&&u(),j().removeEventListener("visibilitychange",p)}),Object.assign(a.autoplay,{pause:g,run:r,start:f,stop:u})}function K({swiper:a,extendParams:N,on:d}){N({fadeEffect:{crossFade:!1,transformEl:null}}),X({effect:"fade",swiper:a,on:d,setTranslate:()=>{const{slides:r}=a,f=a.params.fadeEffect;for(let u=0;u<r.length;u+=1){const g=a.slides.eq(u);let b=-g[0].swiperSlideOffset;a.params.virtualTranslate||(b-=a.translate);let x=0;a.isHorizontal()||(x=b,b=0);const I=a.params.fadeEffect.crossFade?Math.max(1-Math.abs(g[0].progress),0):1+Math.min(Math.max(g[0].progress,-1),0);Y(f,g).css({opacity:I}).transform(`translate3d(${b}px, ${x}px, 0px)`)}},setTransition:r=>{const{transformEl:f}=a.params.fadeEffect;(f?a.slides.find(f):a.slides).transition(r),U({swiper:a,duration:r,transformEl:f,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!a.params.cssMode})})}const P=({spaceBetween:a=20,slidesPerView:N=1,onSlideChange:d=()=>{},onSwiper:c,children:s,pagination:r,className:f="main-caro",navigation:u,autoplay:g,effect:p})=>l("div",{children:l(R,{spaceBetween:a,slidesPerView:N,onSlideChange:d,onSwiper:c,modules:[Z,V,J,K,W],pagination:r,navigation:u,className:f,autoplay:g,effect:p,children:s})}),D="/assets/c1.e1ae159b.png",H="/assets/c2.042737a0.png",A="/assets/c3.7e31ec53.png",aa=()=>M("div",{className:"grid xl:grid-cols-2 grid-cols-1 gap-5",children:[l(z,{title:"Basic Example",children:M(P,{pagination:!0,navigation:!0,className:"main-caro",children:[l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${D})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${H})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${A})`}})})]})}),l(z,{title:"Basic Example",children:M(P,{pagination:!0,navigation:!0,children:[l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${D})`},children:l("div",{className:"pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white",children:M("div",{className:"max-w-sm",children:[l("h2",{className:"text-xl font-medium text-white",children:"Lorem ipsum"}),l("p",{className:"text-sm",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur.."})]})})})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${H})`},children:l("div",{className:"pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white",children:M("div",{className:"max-w-sm",children:[l("h2",{className:"text-xl font-medium text-white",children:"Lorem ipsum"}),l("p",{className:"text-sm",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur.."})]})})})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${A})`},children:l("div",{className:"pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white",children:M("div",{className:"max-w-sm",children:[l("h2",{className:"text-xl font-medium text-white",children:"Lorem ipsum"}),l("p",{className:"text-sm",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur.."})]})})})})]})}),l(z,{title:"Carousel Interval",children:M(P,{pagination:!0,navigation:!0,className:"main-caro",autoplay:{delay:2500,disableOnInteraction:!1},children:[l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${D})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${H})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${A})`}})})]})}),l(z,{title:"Crossfade",children:M(P,{pagination:!0,navigation:!0,className:"main-caro",effect:"fade",children:[l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${D})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${H})`}})}),l(h,{children:l("div",{className:"single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] ",style:{backgroundImage:`url(${A})`}})})]})})]});export{aa as default};