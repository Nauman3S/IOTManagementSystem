(this["webpackJsonpsmart-iot-management-system"]=this["webpackJsonpsmart-iot-management-system"]||[]).push([[14],{342:function(e,t,n){"use strict";n.d(t,"n",(function(){return s})),n.d(t,"m",(function(){return l})),n.d(t,"g",(function(){return i})),n.d(t,"a",(function(){return u})),n.d(t,"l",(function(){return d})),n.d(t,"q",(function(){return b})),n.d(t,"d",(function(){return m})),n.d(t,"i",(function(){return f})),n.d(t,"t",(function(){return p})),n.d(t,"r",(function(){return j})),n.d(t,"j",(function(){return h})),n.d(t,"o",(function(){return O})),n.d(t,"s",(function(){return y})),n.d(t,"k",(function(){return v})),n.d(t,"e",(function(){return g})),n.d(t,"p",(function(){return x})),n.d(t,"c",(function(){return S})),n.d(t,"b",(function(){return A})),n.d(t,"f",(function(){return w})),n.d(t,"h",(function(){return k}));var r=n(11),a=n(20),c=n(109),o=n(61),s=function(){return c.a.get("/admin/count",{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},l=function(){return c.a.get("/admin//all-users",{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},i=function(e){return c.a.patch("/admin/delete-user",{id:e},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},u=function(e){return c.a.patch("/macAddress/add",{macAddress:e},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},d=function(){return c.a.get("/macAddress/all",{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},b=function(e,t){return c.a.patch("/macAddress/remove",{macAddress:e,userId:t},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},m=function(){return c.a.get("/count/",{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},f=function(e){return c.a.post("/auth/forgot",{email:e})},p=function(e,t){return c.a.post("/auth/verify",{email:e,code:t})},j=function(e,t){return c.a.post("/auth/reset",{email:e,password:t})},h=function(){return c.a.get("/admin/all-macAddress",{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},O=function(e){return c.a.post("/mqtt/data",e)},y=function(e){return c.a.post("/mqtt/file/upload",e,{headers:{"x-access-token":Object(o.b)()}})},v=function(e){return c.a.post("/mqtt/files",e,{headers:{"x-access-token":Object(o.b)()}})},g=function(){var e=Object(a.a)(Object(r.a)().mark((function e(t){return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.delete("/mqtt/file/delete/".concat(t),{headers:{Authorization:"Bearer ".concat(Object(o.b)())}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(e){return c.a.post("/mqtt/publish",e,{headers:{"x-access-token":Object(o.b)()}})},S=function(e){return c.a.post("/program/all",{macAddress:e},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},A=function(e){return c.a.post("/program/post",e,{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},w=function(e){return c.a.patch("/program/delete",{id:e},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})},k=function(e,t){return c.a.patch("/program/edit",{id:t,programName:e.programName,command:e.command},{headers:{Authorization:"Bearer ".concat(Object(o.b)())}})}},352:function(e,t,n){"use strict";var r=n(4),a=n(0),c=n(386),o=n(92),s=n(342),l=n(39),i=n(3);t.a=function(e){var t,n=e.setSelectedMacaddress,u=(e.page,Object(a.useState)()),d=Object(r.a)(u,2),b=d[0],m=d[1],f=Object(l.c)((function(e){return e.auth})),p=Object(o.useQuery)("client"===f.role?"getAllMacAddress":"getAdminUserAllMacAddress","client"===f.role?s.l:s.j),j=p.data,h=p.loading;Object(a.useEffect)((function(){var e,t;h||m(null===j||void 0===j||null===(e=j.data)||void 0===e||null===(t=e.macAddressess)||void 0===t?void 0:t.macAddress)}),[h,null===j||void 0===j||null===(t=j.data)||void 0===t?void 0:t.macAddressess]);var O=c.a.Option,y=null===b||void 0===b?void 0:b.map((function(e,t){return Object(i.jsx)(O,{value:e.macAddress,children:e.macAddress},"".concat(e._id+t))}));return null===y||void 0===y||y.unshift(Object(i.jsx)(O,{value:"All",children:"All"},"all")),Object(i.jsx)(c.a,{defaultValue:"Select MacAddress",style:{width:"15%",height:"25%",border:"1px solid black"},onChange:function(e){n(e)},children:"client"===f.role&&!h&&y})}},362:function(e,t,n){"use strict";var r=n(4),a=n(0),c=n(382),o=n(3),s=c.a.TextArea;t.a=function(e){var t=e.socket,n=e.selectedMacaddress,c=Object(a.useState)("Logs"),l=Object(r.a)(c,2),i=l[0],u=l[1],d=Object(a.useState)(!1),b=Object(r.a)(d,2),m=b[0],f=b[1];return t.on("send_message",(function(e){var t=JSON.parse(e);t&&u(t)})),Object(a.useEffect)((function(){return f(!0),function(){f(!1),t.off("send_message")}}),[t]),m?Object(o.jsx)("div",{style:{marginBotton:50,textAlign:"center"},children:Object(o.jsx)(s,{rows:4,placeholder:"Logs",disabled:!0,value:n===i.macAddress?JSON.stringify(i):"Logs",style:{color:"red",width:"80%"}})}):null}},384:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var r=n(5),a=n(4),c=n(16),o=n(6),s=n.n(o),l=n(50),i=n(0),u=n(57),d=n(26),b=n(95),m=function(e){return e.children},f=n(1);function p(e){return void 0!==e&&null!==e}var j=function(e){var t,n=e.itemPrefixCls,a=e.component,c=e.span,o=e.className,l=e.style,u=e.labelStyle,d=e.contentStyle,b=e.bordered,m=e.label,f=e.content,j=e.colon,h=a;return b?i.createElement(h,{className:s()((t={},Object(r.a)(t,"".concat(n,"-item-label"),p(m)),Object(r.a)(t,"".concat(n,"-item-content"),p(f)),t),o),style:l,colSpan:c},p(m)&&i.createElement("span",{style:u},m),p(f)&&i.createElement("span",{style:d},f)):i.createElement(h,{className:s()("".concat(n,"-item"),o),style:l,colSpan:c},i.createElement("div",{className:"".concat(n,"-item-container")},(m||0===m)&&i.createElement("span",{className:s()("".concat(n,"-item-label"),Object(r.a)({},"".concat(n,"-item-no-colon"),!j)),style:u},m),(f||0===f)&&i.createElement("span",{className:s()("".concat(n,"-item-content")),style:d},f)))};function h(e,t,n){var r=t.colon,a=t.prefixCls,c=t.bordered,o=n.component,s=n.type,l=n.showLabel,u=n.showContent,d=n.labelStyle,b=n.contentStyle;return e.map((function(e,t){var n=e.props,m=n.label,p=n.children,h=n.prefixCls,O=void 0===h?a:h,y=n.className,v=n.style,g=n.labelStyle,x=n.contentStyle,S=n.span,A=void 0===S?1:S,w=e.key;return"string"===typeof o?i.createElement(j,{key:"".concat(s,"-").concat(w||t),className:y,style:v,labelStyle:Object(f.a)(Object(f.a)({},d),g),contentStyle:Object(f.a)(Object(f.a)({},b),x),span:A,colon:r,component:o,itemPrefixCls:O,bordered:c,label:l?m:null,content:u?p:null}):[i.createElement(j,{key:"label-".concat(w||t),className:y,style:Object(f.a)(Object(f.a)(Object(f.a)({},d),v),g),span:1,colon:r,component:o[0],itemPrefixCls:O,bordered:c,label:m}),i.createElement(j,{key:"content-".concat(w||t),className:y,style:Object(f.a)(Object(f.a)(Object(f.a)({},b),v),x),span:2*A-1,component:o[1],itemPrefixCls:O,bordered:c,content:p})]}))}var O=function(e){var t=i.useContext(y),n=e.prefixCls,r=e.vertical,a=e.row,c=e.index,o=e.bordered;return r?i.createElement(i.Fragment,null,i.createElement("tr",{key:"label-".concat(c),className:"".concat(n,"-row")},h(a,e,Object(f.a)({component:"th",type:"label",showLabel:!0},t))),i.createElement("tr",{key:"content-".concat(c),className:"".concat(n,"-row")},h(a,e,Object(f.a)({component:"td",type:"content",showContent:!0},t)))):i.createElement("tr",{key:c,className:"".concat(n,"-row")},h(a,e,Object(f.a)({component:o?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))},y=i.createContext({}),v={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function g(e,t,n){var r=e;return(void 0===t||t>n)&&(r=Object(d.a)(e,{span:n})),r}function x(e){var t,n=e.prefixCls,o=e.title,d=e.extra,m=e.column,f=void 0===m?v:m,p=e.colon,j=void 0===p||p,h=e.bordered,x=e.layout,S=e.children,A=e.className,w=e.style,k=e.size,C=e.labelStyle,N=e.contentStyle,E=i.useContext(u.b),P=E.getPrefixCls,z=E.direction,B=P("descriptions",n),I=i.useState({}),M=Object(a.a)(I,2),F=M[0],q=M[1],L=function(e,t){if("number"===typeof e)return e;if("object"===Object(c.a)(e))for(var n=0;n<b.b.length;n++){var r=b.b[n];if(t[r]&&void 0!==e[r])return e[r]||v[r]}return 3}(f,F);i.useEffect((function(){var e=b.a.subscribe((function(e){"object"===Object(c.a)(f)&&q(e)}));return function(){b.a.unsubscribe(e)}}),[]);var U=function(e,t){var n=Object(l.a)(e).filter((function(e){return e})),r=[],a=[],c=t;return n.forEach((function(e,o){var s,l=null===(s=e.props)||void 0===s?void 0:s.span,i=l||1;if(o===n.length-1)return a.push(g(e,l,c)),void r.push(a);i<c?(c-=i,a.push(e)):(a.push(g(e,i,c)),r.push(a),c=t,a=[])})),r}(S,L),D=i.useMemo((function(){return{labelStyle:C,contentStyle:N}}),[C,N]);return i.createElement(y.Provider,{value:D},i.createElement("div",{className:s()(B,(t={},Object(r.a)(t,"".concat(B,"-").concat(k),k&&"default"!==k),Object(r.a)(t,"".concat(B,"-bordered"),!!h),Object(r.a)(t,"".concat(B,"-rtl"),"rtl"===z),t),A),style:w},(o||d)&&i.createElement("div",{className:"".concat(B,"-header")},o&&i.createElement("div",{className:"".concat(B,"-title")},o),d&&i.createElement("div",{className:"".concat(B,"-extra")},d)),i.createElement("div",{className:"".concat(B,"-view")},i.createElement("table",null,i.createElement("tbody",null,U.map((function(e,t){return i.createElement(O,{key:t,index:t,colon:j,prefixCls:B,vertical:"vertical"===x,bordered:h,row:e})})))))))}x.Item=m;t.b=x},392:function(e,t,n){"use strict";n.r(t);var r=n(11),a=n(20),c=n(4),o=n(0),s=n(386),l=n(216),i=n(333),u=n(334),d=n(396),b=n(384),m=n(106),f=n(352),p=n(362),j=n(342),h=n(3);t.default=function(e){var t=e.socket,n=s.a.Option,O=Object(o.useState)(),y=Object(c.a)(O,2),v=y[0],g=y[1],x=Object(o.useState)(),S=Object(c.a)(x,2),A=S[0],w=S[1],k=["command;[bash command]","logs=stdout","logs=stdout-user-script","logs=stderr","logs=stderr-user-script","logs=update-status"],C=function(){var e=Object(a.a)(Object(r.a)().mark((function e(){var t,n;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(v){e.next=3;break}return l.b.error("Please Select Macaddress First!"),e.abrupt("return");case 3:if(A){e.next=6;break}return l.b.error("Please Select a Config to Publish!"),e.abrupt("return");case 6:return e.prev=6,t="config/".concat("All"===v?"all":v),(n=new FormData).append("message",A),n.append("endPoint",t),e.next=13,Object(j.p)(n);case 13:200===e.sent.status&&l.b.success("Published Successfully!"),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(6),l.b.error("Something went wrong, please check your internet connection!");case 20:case"end":return e.stop()}}),e,null,[[6,17]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(a.a)(Object(r.a)().mark((function e(t){var n,a;return Object(r.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(v){e.next=3;break}return l.b.error("Please Select Macaddress First!"),e.abrupt("return");case 3:return e.prev=3,n="".concat(t,"/").concat("All"===v?"all":v),(a=new FormData).append("message",t),a.append("endPoint",n),e.next=10,Object(j.p)(a);case 10:200===e.sent.status&&l.b.success("Published to ".concat(v," is Successfull!")),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),l.b.error("Something went wrong, please check your internet connection!");case 17:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(i.a,{gutter:[24,0],style:{justifyContent:"center"},children:Object(h.jsx)(u.a,{span:24,md:24,className:"mb-24",children:Object(h.jsxs)(d.a,{bordered:!1,title:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h6",{className:"font-semibold m-0",children:"Controls"}),Object(h.jsx)(f.a,{setSelectedMacaddress:g})]}),className:"header-solid h-full card-profile-information",bodyStyle:{paddingTop:0,paddingBottom:0},children:[Object(h.jsx)("hr",{}),Object(h.jsxs)(b.b,{style:{alignItems:"center",justifyContent:"center"},children:[Object(h.jsx)(b.b.Item,{style:{position:"absolute",width:"80%"},children:Object(h.jsx)(s.a,{defaultValue:"Select Config",style:{width:"24%"},onChange:function(e){w(e)},children:null===k||void 0===k?void 0:k.map((function(e){return Object(h.jsx)(n,{value:e,children:e},e)}))})}),Object(h.jsx)(b.b.Item,{label:"Publish Config",labelStyle:{alignItems:"center",color:"#000",fontSize:"15px",fontWeight:"900"},children:Object(h.jsx)(m.a,{type:"primary",className:"tag-primary",onClick:C,children:"Publish"})})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)(b.b,{style:{alignItems:"center",justifyContent:"center"},children:[Object(h.jsx)(b.b.Item,{label:"Publish Upgrade",labelStyle:{alignItems:"center",color:"#000",fontSize:"15px",fontWeight:"900"},style:{position:"absolute",width:"80%"},children:Object(h.jsx)(m.a,{type:"primary",className:"tag-primary",onClick:function(){return N("upgrade")},children:"Upgrade"})}),Object(h.jsx)(b.b.Item,{label:"Publish OSUG",labelStyle:{alignItems:"center",color:"#000",fontSize:"15px",fontWeight:"900"},children:Object(h.jsx)(m.a,{type:"primary",className:"tag-primary",onClick:function(){return N("osug")},children:"OSUG"})})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",marginTop:30},children:[Object(h.jsx)(p.a,{socket:t,selectedMacaddress:v}),Object(h.jsx)(m.a,{type:"primary",className:"tag-primary",style:{width:"50%",alignSelf:"center",marginTop:10,marginBottom:10},onClick:function(){return N("info")},children:"Get Device Info"})]})]})})})})}}}]);
//# sourceMappingURL=14.607407bc.chunk.js.map