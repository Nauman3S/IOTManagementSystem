(this["webpackJsonpsmart-iot-management-system"]=this["webpackJsonpsmart-iot-management-system"]||[]).push([[13],{345:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e){return e?"function"===typeof e?e():e:null}},347:function(e,t,n){"use strict";var a=n(1),c=n(0),r=n(57),l=n(156),o=n(345),s=n(68),i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},u=c.forwardRef((function(e,t){var n=e.prefixCls,u=e.title,m=e.content,b=e._overlay,f=i(e,["prefixCls","title","content","_overlay"]),d=c.useContext(r.b).getPrefixCls,p=d("popover",n),j=d();return c.createElement(l.a,Object(a.a)({},f,{prefixCls:p,ref:t,overlay:b||function(e){if(u||m)return c.createElement(c.Fragment,null,u&&c.createElement("div",{className:"".concat(e,"-title")},Object(o.a)(u)),c.createElement("div",{className:"".concat(e,"-inner-content")},Object(o.a)(m)))}(p),transitionName:Object(s.c)(j,"zoom-big",f.transitionName)}))}));u.defaultProps={placement:"top",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}},t.a=u},350:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(4),c=n(0);function r(){var e=c.useReducer((function(e){return e+1}),0);return Object(a.a)(e,2)[1]}},356:function(e,t,n){"use strict";var a=n(0),c=n(350),r=n(95);t.a=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=Object(a.useRef)({}),n=Object(c.a)();return Object(a.useEffect)((function(){var a=r.a.subscribe((function(a){t.current=a,e&&n()}));return function(){return r.a.unsubscribe(a)}}),[]),t.current}},384:function(e,t,n){"use strict";n.d(t,"a",(function(){return O}));var a=n(5),c=n(4),r=n(16),l=n(6),o=n.n(l),s=n(50),i=n(0),u=n(57),m=n(26),b=n(95),f=function(e){return e.children},d=n(1);function p(e){return void 0!==e&&null!==e}var j=function(e){var t,n=e.itemPrefixCls,c=e.component,r=e.span,l=e.className,s=e.style,u=e.labelStyle,m=e.contentStyle,b=e.bordered,f=e.label,d=e.content,j=e.colon,v=c;return b?i.createElement(v,{className:o()((t={},Object(a.a)(t,"".concat(n,"-item-label"),p(f)),Object(a.a)(t,"".concat(n,"-item-content"),p(d)),t),l),style:s,colSpan:r},p(f)&&i.createElement("span",{style:u},f),p(d)&&i.createElement("span",{style:m},d)):i.createElement(v,{className:o()("".concat(n,"-item"),l),style:s,colSpan:r},i.createElement("div",{className:"".concat(n,"-item-container")},(f||0===f)&&i.createElement("span",{className:o()("".concat(n,"-item-label"),Object(a.a)({},"".concat(n,"-item-no-colon"),!j)),style:u},f),(d||0===d)&&i.createElement("span",{className:o()("".concat(n,"-item-content")),style:m},d)))};function v(e,t,n){var a=t.colon,c=t.prefixCls,r=t.bordered,l=n.component,o=n.type,s=n.showLabel,u=n.showContent,m=n.labelStyle,b=n.contentStyle;return e.map((function(e,t){var n=e.props,f=n.label,p=n.children,v=n.prefixCls,y=void 0===v?c:v,O=n.className,h=n.style,x=n.labelStyle,g=n.contentStyle,E=n.span,N=void 0===E?1:E,C=e.key;return"string"===typeof l?i.createElement(j,{key:"".concat(o,"-").concat(C||t),className:O,style:h,labelStyle:Object(d.a)(Object(d.a)({},m),x),contentStyle:Object(d.a)(Object(d.a)({},b),g),span:N,colon:a,component:l,itemPrefixCls:y,bordered:r,label:s?f:null,content:u?p:null}):[i.createElement(j,{key:"label-".concat(C||t),className:O,style:Object(d.a)(Object(d.a)(Object(d.a)({},m),h),x),span:1,colon:a,component:l[0],itemPrefixCls:y,bordered:r,label:f}),i.createElement(j,{key:"content-".concat(C||t),className:O,style:Object(d.a)(Object(d.a)(Object(d.a)({},b),h),g),span:2*N-1,component:l[1],itemPrefixCls:y,bordered:r,content:p})]}))}var y=function(e){var t=i.useContext(O),n=e.prefixCls,a=e.vertical,c=e.row,r=e.index,l=e.bordered;return a?i.createElement(i.Fragment,null,i.createElement("tr",{key:"label-".concat(r),className:"".concat(n,"-row")},v(c,e,Object(d.a)({component:"th",type:"label",showLabel:!0},t))),i.createElement("tr",{key:"content-".concat(r),className:"".concat(n,"-row")},v(c,e,Object(d.a)({component:"td",type:"content",showContent:!0},t)))):i.createElement("tr",{key:r,className:"".concat(n,"-row")},v(c,e,Object(d.a)({component:l?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))},O=i.createContext({}),h={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function x(e,t,n){var a=e;return(void 0===t||t>n)&&(a=Object(m.a)(e,{span:n})),a}function g(e){var t,n=e.prefixCls,l=e.title,m=e.extra,f=e.column,d=void 0===f?h:f,p=e.colon,j=void 0===p||p,v=e.bordered,g=e.layout,E=e.children,N=e.className,C=e.style,S=e.size,w=e.labelStyle,P=e.contentStyle,k=i.useContext(u.b),z=k.getPrefixCls,I=k.direction,R=z("descriptions",n),F=i.useState({}),L=Object(c.a)(F,2),T=L[0],H=L[1],W=function(e,t){if("number"===typeof e)return e;if("object"===Object(r.a)(e))for(var n=0;n<b.b.length;n++){var a=b.b[n];if(t[a]&&void 0!==e[a])return e[a]||h[a]}return 3}(d,T);i.useEffect((function(){var e=b.a.subscribe((function(e){"object"===Object(r.a)(d)&&H(e)}));return function(){b.a.unsubscribe(e)}}),[]);var D=function(e,t){var n=Object(s.a)(e).filter((function(e){return e})),a=[],c=[],r=t;return n.forEach((function(e,l){var o,s=null===(o=e.props)||void 0===o?void 0:o.span,i=s||1;if(l===n.length-1)return c.push(x(e,s,r)),void a.push(c);i<r?(r-=i,c.push(e)):(c.push(x(e,i,r)),a.push(c),r=t,c=[])})),a}(E,W),G=i.useMemo((function(){return{labelStyle:w,contentStyle:P}}),[w,P]);return i.createElement(O.Provider,{value:G},i.createElement("div",{className:o()(R,(t={},Object(a.a)(t,"".concat(R,"-").concat(S),S&&"default"!==S),Object(a.a)(t,"".concat(R,"-bordered"),!!v),Object(a.a)(t,"".concat(R,"-rtl"),"rtl"===I),t),N),style:C},(l||m)&&i.createElement("div",{className:"".concat(R,"-header")},l&&i.createElement("div",{className:"".concat(R,"-title")},l),m&&i.createElement("div",{className:"".concat(R,"-extra")},m)),i.createElement("div",{className:"".concat(R,"-view")},i.createElement("table",null,i.createElement("tbody",null,D.map((function(e,t){return i.createElement(y,{key:t,index:t,colon:j,prefixCls:R,vertical:"vertical"===g,bordered:v,row:e})})))))))}g.Item=f;t.b=g},395:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(394),r=n(333),l=n(334),o=n(1),s=n(5),i=n(16),u=n(4),m=n(6),b=n.n(m),f=n(70),d=n(38),p=n(57),j=n(356),v=n(95),y=a.createContext("default"),O=function(e){var t=e.children,n=e.size;return a.createElement(y.Consumer,null,(function(e){return a.createElement(y.Provider,{value:n||e},t)}))},h=y,x=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},g=function(e,t){var n,c,r=a.useContext(h),l=a.useState(1),m=Object(u.a)(l,2),y=m[0],O=m[1],g=a.useState(!1),E=Object(u.a)(g,2),N=E[0],C=E[1],S=a.useState(!0),w=Object(u.a)(S,2),P=w[0],k=w[1],z=a.useRef(),I=a.useRef(),R=Object(d.a)(t,z),F=a.useContext(p.b).getPrefixCls,L=function(){if(I.current&&z.current){var t=I.current.offsetWidth,n=z.current.offsetWidth;if(0!==t&&0!==n){var a=e.gap,c=void 0===a?4:a;2*c<n&&O(n-2*c<t?(n-2*c)/t:1)}}};a.useEffect((function(){C(!0)}),[]),a.useEffect((function(){k(!0),O(1)}),[e.src]),a.useEffect((function(){L()}),[e.gap]);var T,H=e.prefixCls,W=e.shape,D=e.size,G=e.src,J=e.srcSet,M=e.icon,_=e.className,q=e.alt,B=e.draggable,V=e.children,X=e.crossOrigin,A=x(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children","crossOrigin"]),K="default"===D?r:D,Q=Object.keys("object"===Object(i.a)(K)&&K||{}).some((function(e){return["xs","sm","md","lg","xl","xxl"].includes(e)})),U=Object(j.a)(Q),Y=a.useMemo((function(){if("object"!==Object(i.a)(K))return{};var e=v.b.find((function(e){return U[e]})),t=K[e];return t?{width:t,height:t,lineHeight:"".concat(t,"px"),fontSize:M?t/2:18}:{}}),[U,K]),Z=F("avatar",H),$=b()((n={},Object(s.a)(n,"".concat(Z,"-lg"),"large"===K),Object(s.a)(n,"".concat(Z,"-sm"),"small"===K),n)),ee=a.isValidElement(G),te=b()(Z,$,(c={},Object(s.a)(c,"".concat(Z,"-").concat(W),!!W),Object(s.a)(c,"".concat(Z,"-image"),ee||G&&P),Object(s.a)(c,"".concat(Z,"-icon"),!!M),c),_),ne="number"===typeof K?{width:K,height:K,lineHeight:"".concat(K,"px"),fontSize:M?K/2:18}:{};if("string"===typeof G&&P)T=a.createElement("img",{src:G,draggable:B,srcSet:J,onError:function(){var t=e.onError;!1!==(t?t():void 0)&&k(!1)},alt:q,crossOrigin:X});else if(ee)T=G;else if(M)T=M;else if(N||1!==y){var ae="scale(".concat(y,") translateX(-50%)"),ce={msTransform:ae,WebkitTransform:ae,transform:ae},re="number"===typeof K?{lineHeight:"".concat(K,"px")}:{};T=a.createElement(f.a,{onResize:L},a.createElement("span",{className:"".concat(Z,"-string"),ref:function(e){I.current=e},style:Object(o.a)(Object(o.a)({},re),ce)},V))}else T=a.createElement("span",{className:"".concat(Z,"-string"),style:{opacity:0},ref:function(e){I.current=e}},V);return delete A.onError,delete A.gap,a.createElement("span",Object(o.a)({},A,{style:Object(o.a)(Object(o.a)(Object(o.a)({},ne),Y),A.style),className:te,ref:R}),T)},E=a.forwardRef(g);E.defaultProps={shape:"circle",size:"default"};var N=E,C=n(50),S=n(347),w=n(26),P=function(e){var t=a.useContext(p.b),n=t.getPrefixCls,c=t.direction,r=e.prefixCls,l=e.className,o=void 0===l?"":l,i=e.maxCount,u=e.maxStyle,m=e.size,f=n("avatar-group",r),d=b()(f,Object(s.a)({},"".concat(f,"-rtl"),"rtl"===c),o),j=e.children,v=e.maxPopoverPlacement,y=void 0===v?"top":v,h=e.maxPopoverTrigger,x=void 0===h?"hover":h,g=Object(C.a)(j).map((function(e,t){return Object(w.a)(e,{key:"avatar-key-".concat(t)})})),E=g.length;if(i&&i<E){var P=g.slice(0,i),k=g.slice(i,E);return P.push(a.createElement(S.a,{key:"avatar-popover-key",content:k,trigger:x,placement:y,overlayClassName:"".concat(f,"-popover")},a.createElement(N,{style:u},"+".concat(E-i)))),a.createElement(O,{size:m},a.createElement("div",{className:d,style:e.style},P))}return a.createElement(O,{size:m},a.createElement("div",{className:d,style:e.style},g))},k=N;k.Group=P;var z=k,I=n(384),R=n(39),F=n.p+"static/media/bg-profile.9c36abe7.jpg",L=n.p+"static/media/user.402e33f3.png",T=n(3);t.default=function(){var e=Object(R.c)((function(e){return e.auth}));return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)("div",{className:"profile-nav-bg",style:{backgroundImage:"url("+F+")"}}),Object(T.jsx)(c.a,{className:"card-profile-head",bodyStyle:{display:"none"},title:Object(T.jsx)(r.a,{justify:"space-between",align:"middle",gutter:[24,0],children:Object(T.jsx)(l.a,{span:24,md:12,className:"col-info",children:Object(T.jsxs)(z.Group,{children:[Object(T.jsx)(z,{size:74,shape:"square",src:L}),Object(T.jsxs)("div",{className:"avatar-info",children:[Object(T.jsx)("h4",{className:"font-semibold m-0",children:e.fullName}),Object(T.jsx)("p",{children:e.email})]})]})})})}),Object(T.jsx)(r.a,{gutter:[24,0],style:{justifyContent:"center"},children:Object(T.jsx)(l.a,{span:24,md:8,className:"mb-24",children:Object(T.jsxs)(c.a,{bordered:!1,title:Object(T.jsx)("h6",{className:"font-semibold m-0",children:"Profile Information"}),className:"header-solid h-full card-profile-information",bodyStyle:{paddingTop:0,paddingBottom:0},children:[Object(T.jsx)("hr",{}),Object(T.jsxs)(I.b,{children:[Object(T.jsx)(I.b.Item,{label:"Full Name",span:3,children:e.fullName}),Object(T.jsx)(I.b.Item,{label:"Email",span:3,children:e.email}),Object(T.jsx)(I.b.Item,{label:"Role",span:3,children:e.role})]})]})})})]})}}}]);
//# sourceMappingURL=13.31223450.chunk.js.map