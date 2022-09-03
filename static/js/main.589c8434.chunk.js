(this["webpackJsonpkatsudon-client"]=this["webpackJsonpkatsudon-client"]||[]).push([[0],{171:function(e,t,n){},173:function(e,t,n){},175:function(e,t,n){},212:function(e,t){},214:function(e,t,n){},501:function(e,t,n){},502:function(e,t,n){},503:function(e,t,n){},504:function(e,t,n){},505:function(e,t,n){},512:function(e,t,n){},513:function(e,t,n){},514:function(e,t,n){},515:function(e,t,n){"use strict";n.r(t);var c=n(135),s=n.n(c),r=(n(171),n(5)),o=n(14),a=n(40),i=n(16),l=n(576),d=n(563),j=n(568),u=n(148),b=n.n(u),h=n(0),O=n.p+"static/media/Leetcode.090d606e.png",p=(n(173),n(1));function m(e){return Object(p.jsxs)("div",{className:"content-container",style:{backgroundColor:e.backgroundColor},children:[Object(p.jsxs)("div",{className:"landingpage-heading",style:{color:"white"},children:[Object(p.jsxs)("div",{className:"landingpage-title",children:[Object(p.jsx)("div",{children:"Katsudon "}),Object(p.jsx)("img",{src:O,alt:"leetcode",className:"leetcode-logo"}),Object(p.jsx)("div",{children:"Leaderboard"})]}),Object(p.jsxs)("div",{className:"landingpage-details",children:[Object(p.jsx)("div",{className:"landingpage-user-count",children:" 10 Registered Users"}),Object(p.jsx)("button",{className:"landingpage-get-started",children:" Get Started"})]})]}),Object(p.jsxs)("div",{className:"content-block",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"section-title",style:{color:e.color},children:"How it works"}),Object(p.jsxs)("div",{className:"section",children:["This website is dependent on the"," ",Object(p.jsx)("span",{style:{color:e.color},children:"\u30ab\u30c4\u30c9\u30f3 (Katsudon)"})," ","chrome extension.",Object(p.jsx)("br",{}),"When you successfully submit a Leetcode problem,"," ",Object(p.jsx)("span",{style:{color:e.color},children:"Katsudon"})," scrapes the details of the page's HTML and sends the needed information to the database"]})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"section-title",style:{color:e.color},children:"Tech Stack"}),Object(p.jsxs)("div",{className:"section",children:["Backend server implemented using Node.js and TypeScript.",Object(p.jsx)("br",{}),"Using MongoDB as the noSQL database.",Object(p.jsx)("br",{}),Object(p.jsx)("span",{style:{color:e.color},children:"Katsudon"})," chrome extension built with JavaScript and small hints of HTML",Object(p.jsx)("br",{}),"Frontend built with ReactJS and CSS"]})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"section-title",style:{color:e.color},children:"Credits"}),Object(p.jsxs)("div",{className:"section",children:[Object(p.jsx)("span",{style:{color:e.color},children:"Qasim Wani"}),Object(p.jsx)("br",{}),"This project was greatly motivated by QasimWani's LeetHub chrome extension, which auto commits your leetcode solutions to a github repository.",Object(p.jsx)("br",{}),"Originally, the plan was to scrape user's github repos using LeetHub. However, I was getting rate limited and anticipated that 5,000 requests per hour definity won't be enough, since it costs 1 per file read. ",Object(p.jsx)("br",{}),"I decided to make my own Leetcode scraping extension to send the solution to my database to get around this rate limit."]}),Object(p.jsx)("div",{style:{height:"1rem"}}),Object(p.jsxs)("div",{className:"section",children:[Object(p.jsx)("span",{style:{color:e.color},children:"Kevin Chen"}),Object(p.jsx)("br",{}),"Kevin:",Object(p.jsx)("li",{children:'"Hey guys should we buy a leetcode premium and share it?"'}),"Me:",Object(p.jsx)("li",{children:"Sharing an account? It would be kind of weird seeing that a problem was solved if I've never even seen it."}),Object(p.jsx)("li",{children:"...Though that would be a subtle way to tell that someone using the account was putting in good work."}),Object(p.jsx)("li",{children:"...Is there a way to tell which problems our friends have solved? It doesn't seem like leetcode has a social platform outside of the discuss section."}),Object(p.jsx)("li",{children:" ...Guess I'll try to make it myself"})]}),Object(p.jsxs)("div",{className:"section",children:[Object(p.jsx)("span",{style:{color:e.color},children:"SQL Professor"}),Object(p.jsx)("br",{}),"Me: Hey professor, is there a way for me to create a schema to represent a graph of connections without having an having a garbage time complexity?",Object(p.jsx)("br",{}),"Professor:"," ",Object(p.jsx)("span",{style:{fontSize:"0.75rem"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid..."}),"TLDR: There's gonna be tradebacks left and right, so choose your database wisely.",Object(p.jsx)("br",{}),"Me: I don't expect this webpage to blow up, so I guess I'll try MongoDB",Object(p.jsx)("br",{})]})]})]})]})}var f=n(18),x=n(33),g=n(30),v=n(562),y=n(570),w=(n(175),function(e,t,n){var c,s=n[0].toUpperCase()+n.slice(1);return!!e&&Object(p.jsx)(v.a,{title:Object(p.jsxs)("div",{style:{fontSize:"1rem"},children:[s,": ",e]}),children:Object(p.jsx)("div",{className:"profile-solved-".concat(n),style:{width:(c=t?e/t:0,"".concat(100*c,"%"))}})})});function k(e){var t,n=e.userInfo,c=n.username,s=n.biography,r=n.followers,o=n.following,a=n.profile_picture_url,l=n.solved,d=Object(i.reduce)(l,(function(e,t){return e[Object(i.get)(t,"difficulty")]+=1,e}),{Easy:0,Medium:0,Hard:0}),j=d.Easy,u=d.Medium,b=d.Hard,h=j+u+b;return Object(p.jsxs)("div",{className:"profile-container",style:{border:"2px solid ".concat(null!==(t=e.borderColor)&&void 0!==t?t:"white")},children:[Object(p.jsxs)("div",{className:"profile-user-info",children:[Object(p.jsxs)("div",{className:"profile-top-wrapper",children:[Object(p.jsxs)("div",{className:"follow-stat",children:[Object(p.jsx)("div",{className:"follow-value",children:r.length}),Object(p.jsx)("div",{className:"follow-text",children:" Followers"})]}),Object(p.jsx)("div",{className:"profile-picture",children:Object(p.jsx)(y.a,{src:a,style:{width:"100%",height:"100%",border:"2px solid white"}})}),Object(p.jsxs)("div",{className:"follow-stat",children:[Object(p.jsx)("div",{className:"follow-value",children:o.length}),Object(p.jsx)("div",{className:"follow-text",children:" Following"})]})]}),Object(p.jsx)("div",{className:"profile-username",children:c}),Object(p.jsx)("div",{className:"profile-biography",children:null!==s&&void 0!==s?s:""})]}),Object(p.jsxs)("div",{className:"profile-solved-section",children:[Object(p.jsxs)("div",{className:"profile-solved-count",children:["Solved: ",h]}),Object(p.jsxs)("div",{className:"profile-solved-distribution",children:[w(j,h,"easy"),w(u,h,"medium"),w(b,h,"hard")]})]})]})}var S=n(578);var N=n(142),C=n.n(N);function I(e){return L.apply(this,arguments)}function L(){return(L=Object(g.a)(Object(f.a)().mark((function e(t){var n,c,s,r,o;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.method,c=t.endpoint,s=t.params,r=t.headers,o={method:n,url:"".concat("https://katsudon-server-v2.herokuapp.com/").concat(c),params:s,headers:r},e.abrupt("return",C()(o).then((function(e){return e.data})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(143).config();var _=n(103),F=n.n(_);function T(){return(T=Object(g.a)(Object(f.a)().mark((function e(){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",I({method:"get",endpoint:"api/user/all",params:{},headers:{}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(){return(A=Object(g.a)(Object(f.a)().mark((function e(t){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",I({method:"get",endpoint:"api/solution/all?".concat(F.a.stringify(t)),params:{},headers:{}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=Object(g.a)(Object(f.a)().mark((function e(t){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",I({method:"get",endpoint:"api/user/profile?".concat(F.a.stringify(t)),params:{},headers:{}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D={getAllUsers:function(){return T.apply(this,arguments)},getUserSolutions:function(e){return A.apply(this,arguments)},getUserProfile:function(e){return B.apply(this,arguments)}},E=D,U=n(572),P=n(573),H=n(574),M=n(575),z=n(577),J=n(106),R=n.n(J),q=n(105),K=n.n(q),G=n(104),Q=n.n(G),W=n(144),V=n.n(W),Y={Orange:{color:"#FFAA7A",background:"#2A2522"},Blue:{color:"#25B2FF",background:"#22242A"},Green:{color:"#7AFF87",background:"#7AFF87"},LightBlue:{color:"#7AFFEF",background:"#22292A"},Purple:{color:"#AC39AC",background:"#2A2229",header:"#2E1F2C",section:"#382E37"}},X={Easy:"#7AFF87",Medium:"#FFAC7D",Hard:"#FF7A7A"},Z=n.p+"static/media/C.cac16519.svg",$=n.p+"static/media/CSharp.885a32ed.svg",ee=n.p+"static/media/C++.157c521f.svg",te=n.p+"static/media/Java.1a020d6d.svg",ne=n.p+"static/media/JavaScript.f719efab.svg",ce=n.p+"static/media/Python.2abc268f.svg",se={C:Z,"C#":$,"C++":ee,JavaScript:ne,Java:te,Python:ce,Python3:ce,TypeScript:n.p+"static/media/TypeScript.65d28611.svg"},re={C:"c","C#":"csharp","C++":"cpp",JavaScript:"javascript",Java:"java",Python:"python",Python3:"python",TypeScript:"typescript"};n(214);function oe(e){var t={tableHeader:{color:e.headerColor,fontSize:"1.4rem"},tableCell:{textAlign:"left",fontSize:"1.15rem",color:"white",margin:0,padding:0,paddingInline:"1rem"},fileOpen:{fontSize:"2rem",color:"white"},languageLogo:{width:"2.5rem"},link:{textDecoration:"none"},iconButton:{color:"white",padding:0},arrowIcon:{color:"white",fontSize:"2rem"}},n=function(t){return e.sortBy===t&&0!==e.sortDir};return Object(p.jsx)("div",{style:{overflow:"auto",width:"min(800px, 100vw)"},children:Object(p.jsxs)(U.a,{className:"solution-table",children:[Object(p.jsx)(P.a,{children:Object(p.jsxs)(H.a,{className:"header",children:[Object(p.jsxs)(M.a,{style:t.tableHeader,colSpan:3,children:["Problem",Object(p.jsxs)(l.a,{style:t.iconButton,onClick:function(){e.handleSortDirChange("problem_id")},children:[n("problem_id")&&1===e.sortDir&&Object(p.jsx)(Q.a,{style:t.arrowIcon}),n("problem_id")&&2===e.sortDir&&Object(p.jsx)(K.a,{style:t.arrowIcon}),!n("problem_id")&&Object(p.jsx)(R.a,{style:t.arrowIcon})]})]}),Object(p.jsx)(M.a,{style:t.tableHeader,children:"Language"}),Object(p.jsx)(M.a,{style:t.tableHeader,children:"Solution"}),Object(p.jsxs)(M.a,{style:t.tableHeader,children:["Solved At",Object(p.jsxs)(l.a,{style:t.iconButton,onClick:function(){e.handleSortDirChange("last_solved_at")},children:[n("last_solved_at")&&1===e.sortDir&&Object(p.jsx)(Q.a,{style:t.arrowIcon}),n("last_solved_at")&&2===e.sortDir&&Object(p.jsx)(K.a,{style:t.arrowIcon}),!n("last_solved_at")&&Object(p.jsx)(R.a,{style:t.arrowIcon})]})]})]})}),!e.loading&&Object(p.jsx)(z.a,{className:"solution-table-body",style:{backgroundColor:e.backgroundColor},children:Object(i.map)(e.solutions,(function(n,c){return Object(p.jsxs)(H.a,{children:[Object(p.jsx)(M.a,{style:Object(x.a)({},t.tableCell),colSpan:3,children:Object(p.jsxs)("a",{href:n.problem.url,target:"_blank",rel:"noreferrer",style:Object(x.a)({color:X[n.problem.difficulty]},t.link),children:[n.problem.id,". ",n.problem.title]})}),Object(p.jsx)(M.a,{style:t.tableCell,children:Object(p.jsx)("div",{style:{display:"flex",justifyContent:"flex-start",alignItems:"center"},children:Object(i.map)(Object(i.keys)(n.solutions),(function(e,n){return Object(p.jsx)("img",{src:se[e],alt:e,style:t.languageLogo},n)}))})}),Object(p.jsx)(M.a,{style:t.tableCell,children:Object(p.jsx)(l.a,{onClick:function(){e.handleOpenSolutionModel(n.problem,n.solutions)},children:Object(p.jsx)(V.a,{style:t.fileOpen})})}),Object(p.jsx)(M.a,{style:t.tableCell,children:n.last_solved_at.substring(0,10)})]},c)}))}),e.loading&&Object(p.jsxs)(z.a,{children:[Object(p.jsx)(H.a,{}),Object(p.jsx)(H.a,{children:Object(p.jsx)(M.a,{colSpan:6,children:Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"},children:Object(p.jsx)(S.a,{style:{color:"white",width:"3rem",height:"3rem"}})})})})]})]})})}var ae=n(566),ie=n(152),le=n(567),de=n(560);function je(e){return Object(p.jsx)(le.a,{language:e.language,style:de.a,showLineNumbers:!0,lineNumberStyle:{minWidth:0},showInlineLineNumbers:!0,children:e.code})}var ue=n(564),be=n(579);function he(e){var t,n=Object(h.useState)(0),c=Object(r.a)(n,2),s=c[0],o=c[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(ue.a,{variant:"scrollable",value:s,onChange:function(e,t){o(t)},TabIndicatorProps:{style:{backgroundColor:null!==(t=e.color)&&void 0!==t?t:"white"}},children:e.tabs.map((function(t,n){var c;return Object(p.jsx)(be.a,{label:Object(p.jsx)("div",{style:{fontSize:"1.5rem",textTransform:"none"},children:t.label}),style:{color:null!==(c=e.color)&&void 0!==c?c:"white",paddingTop:0,paddingBottom:0,marginLeft:0,backgroundColor:"rgba(0,0,0,0.1)"}},n)}))}),Object(p.jsx)("div",{children:e.tabs[s].content})]})}n(501);function Oe(e){var t=e.problem,n=e.solutions,c=Object(i.without)(Object(i.keys)(n),"recent").map((function(e){var t=Object(i.get)(n,e),c=Object(i.get)(t,"runtime_ms"),s=Object(i.get)(t,"memory_usage_mb");return{label:e,content:Object(p.jsxs)("div",{className:"solution-code",children:[Object(p.jsxs)("div",{style:{padding:"1rem"},children:["Runtime: ",c," ms ",Object(p.jsx)("br",{}),"Memory Usage: ",s," MB"]}),Object(p.jsx)(je,{code:Object(i.get)(n,"".concat(e,".solution_code")),language:re[e]})]})}}));return Object(p.jsx)(ae.a,{open:e.open,onClose:e.handleClose,style:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(p.jsxs)("div",{className:"solution-container",children:[Object(p.jsx)("div",{className:"problem-block",children:Object(p.jsxs)("div",{className:"modal-content",children:[Object(p.jsxs)("a",{href:t.url,target:"_blank",rel:"noreferrer",className:"leetcode-title",style:{color:X[t.difficulty]},children:[t.id,". ",t.title]}),Object(p.jsx)(ie.a,{markup:t.description})]})}),Object(p.jsx)("div",{className:"solution-block",children:Object(p.jsx)("div",{className:"modal-content",children:Object(p.jsx)(he,{tabs:c,color:X[t.difficulty]})})})]})})}n(502),n(503),n(504);function pe(e){var t,n=Object(i.orderBy)(Object(i.map)(Object(i.reduce)(e.solved,(function(e,t){return Object(i.get)(t,"tags").forEach((function(t){e[t]=1+(e[t]||0)})),e}),{}),(function(e,t){return{tag:t,frequency:e}})),["frequency","tag"],["desc","asc"]);return Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"user-page-section-header",children:" Skills"}),Object(p.jsx)("div",{className:"user-page-section-content",style:{backgroundColor:null!==(t=e.backgroundColor)&&void 0!==t?t:"#382E37"},children:Object(p.jsx)("div",{className:"skill-tag-container",children:Object(i.map)(n,(function(e,t){return Object(p.jsxs)("div",{className:"skill-tag",children:[e.tag,": ",e.frequency]},t)}))})})]})}function me(e){var t=Object(o.e)(),n=Object(h.useState)(function(e){var t=Object(i.get)(e,"search").substring(1);return Object(i.reduce)(t.split("&"),(function(e,t){if(!t)return e;var n=t.split("="),c=Object(r.a)(n,2),s=c[0],o=c[1];return e[s]=o,e}),{})}(t)),c=Object(r.a)(n,2),s=c[0],a=c[1],l=Object(h.useState)(null),d=Object(r.a)(l,2),j=d[0],u=d[1],b=Object(h.useState)({}),O=Object(r.a)(b,2),m=O[0],v=O[1],y=Object(h.useState)(!0),w=Object(r.a)(y,2),N=w[0],C=w[1],I=Object(h.useState)(!0),L=Object(r.a)(I,2),_=L[0],F=L[1],T=Object(h.useState)(!1),A=Object(r.a)(T,2),B=A[0],D=A[1],U=Object(h.useState)({}),P=Object(r.a)(U,2),H=P[0],M=P[1],z=Object(h.useState)({}),J=Object(r.a)(z,2),R=J[0],q=J[1],K=Object(h.useState)("problem_id"),G=Object(r.a)(K,2),Q=G[0],W=G[1],V=Object(h.useState)(0),Y=Object(r.a)(V,2),X=Y[0],Z=Y[1];function $(){return($=Object(g.a)(Object(f.a)().mark((function e(){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(!0),e.next=3,E.getUserProfile(s).then((function(e){u(e.user)})).catch((function(){setTimeout((function(){C(!1)}),200)}));case 3:setTimeout((function(){C(!1)}),500);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ee(){return(ee=Object(g.a)(Object(f.a)().mark((function e(){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return F(!0),e.next=3,E.getUserSolutions(s).then((function(e){v(e)}));case 3:setTimeout((function(){F(!1)}),500);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var te={0:null,1:"desc",2:"asc"};return Object(h.useEffect)((function(){!function(){$.apply(this,arguments)}()}),[]),Object(h.useEffect)((function(){!function(){ee.apply(this,arguments)}()}),[s]),Object(p.jsxs)("div",{className:"content-container",style:{backgroundColor:e.backgroundColor},children:[N&&Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"},children:Object(p.jsx)(S.a,{style:{color:e.color,width:"8rem",height:"8rem"}})}),j&&!N&&Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"profile-page-container",children:[Object(p.jsxs)("div",{className:"user-profile-wrapper",children:[Object(p.jsx)(k,{userInfo:j,borderColor:"#FF66EB"}),Object(p.jsx)(pe,{solved:j.solved})]}),Object(p.jsx)("div",{children:Object(p.jsx)(oe,{solutions:m.rows,handleOpenSolutionModel:function(e,t){M(e),q(t),D(!0)},headerColor:e.color,backgroundColor:"#382E37",handleSortDirChange:function(e){var t,n=(X+1)%3;t={sortBy:e,sortDir:te[n]},a(Object(x.a)(Object(x.a)({},s),t)),W(e),Z(n)},loading:_,sortBy:Q,sortDir:X})}),Object(p.jsx)(Oe,{open:B,handleClose:function(){M({}),q({}),D(!1)},problem:H,solutions:R})]})}),!j&&Object(p.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",fontSize:"2rem",color:"white"},children:['"',"sdfsf",'" is not a valid user']})]})}var fe=n(147),xe=n.n(fe),ge=n(151),ve=(n(505),{container:function(e,t){return{padding:0,width:"200px",flexGrow:1}},control:function(e,t){return{borderRadius:0,backgroundColor:"#3d3d3d"}},dropdownIndicator:function(e,t){return{display:"none"}},indicatorsContainer:function(e,t){return{padding:0}},menu:function(e,t){return{borderRadius:0}},option:function(e,t){return Object(x.a)(Object(x.a)({},e),{},{color:"white",fontSize:"1.25rem",backgroundColor:t.isFocused?"#444444":"#000000"})},placeholder:function(e,t){return Object(x.a)(Object(x.a)({},e),{},{fontSize:"1.25rem",color:"white"})}}),ye={searchIcon:{marginTop:"1px",color:"white",fontSize:"2.25rem"},nameLabel:{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"1rem",color:"white"},avatarIcon:{width:"2.5rem",height:"2.5rem"}};function we(e){return Object(p.jsxs)("div",{className:"user-filter-section",children:[Object(p.jsx)(xe.a,{style:ye.searchIcon}),Object(p.jsx)(ge.a,{clearIndicator:!0,styles:ve,value:e.selectedUser,onChange:e.setSelectedUser,options:e.allUsers,formatOptionLabel:function(e){return Object(p.jsxs)("div",{style:ye.nameLabel,children:[Object(p.jsx)(y.a,{style:ye.avatarIcon,src:e.profile_picture_url}),e.username]})},placeholder:"Search for a User..."})]})}n(512);var ke=n(571);function Se(e){var t=Object(h.useState)([]),n=Object(r.a)(t,2),c=n[0],s=n[1],o=Object(h.useState)(null),l=Object(r.a)(o,2),d=l[0],j=l[1],u=Object(h.useState)(null),b=Object(r.a)(u,2),O=b[0],m=b[1],x=Object(h.useState)(!0),v=Object(r.a)(x,2),y=v[0],w=v[1],N=Object(h.useState)(!1),C=Object(r.a)(N,2),I=C[0],L=C[1];function _(){return(_=Object(g.a)(Object(f.a)().mark((function e(){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.getAllUsers().then((function(e){var t=e.users.map((function(e){return Object(i.pick)(e,["_id","username","profile_picture_url"])}));s(t)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return(F=Object(g.a)(Object(f.a)().mark((function e(t){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.getUserProfile(t).then((function(e){m(e.user)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(h.useEffect)((function(){w(!0),function(){_.apply(this,arguments)}(),setTimeout((function(){w(!1)}),500)}),[]),Object(h.useEffect)((function(){L(!0),d&&function(e){F.apply(this,arguments)}(d),setTimeout((function(){L(!1)}),500)}),[d]),Object(p.jsxs)("div",{className:"content-container",style:{backgroundColor:e.backgroundColor},children:[y&&Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"},children:Object(p.jsx)(S.a,{style:{color:e.color,width:"8rem",height:"8rem"}})}),Object(p.jsxs)("div",{className:"user-page-content-container",children:[Object(p.jsx)("div",{className:"user-page-search-container",children:!y&&Object(p.jsx)(we,{allUsers:c,selectedUser:d,setSelectedUser:j})}),Object(p.jsxs)("div",{className:"user-page-user-profile-container",children:[I&&Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"},children:Object(p.jsx)(S.a,{style:{color:e.color,width:"4rem",height:"4rem"}})}),!I&&O&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(k,{userInfo:O}),Object(p.jsx)(a.b,{to:"/profile?user_id=".concat(Object(i.get)(d,"_id")),style:{textDecoration:"none"},children:Object(p.jsx)(ke.a,{style:{color:"white",fontSize:"1.25rem"},children:"View Profile"})})]})]})]})]})}function Ne(e){return Object(p.jsx)("div",{className:"content-container",style:{backgroundColor:e.backgroundColor},children:"Leetcode Problems"})}var Ce=[{path:"/welcome",element:Object(p.jsx)(m,{})},{path:"/profile",element:Object(p.jsx)(me,{})},{path:"/users",element:Object(p.jsx)(Se,{})},{path:"/problems",element:Object(p.jsx)(Ne,{})}],Ie={"/welcome":Y.Blue,"/profile":Y.Purple,"/users":Y.LightBlue,"/problems":Y.Orange},Le={"Sign In":"/profile",Leaderboard:"/welcome",Users:"/users",Problems:"/problems"};n(513);function _e(e){var t=Object(o.e)(),n=Object(h.useState)(null),c=Object(r.a)(n,2),s=c[0],u=c[1],O=Object(h.useState)(null),m=Object(r.a)(O,2),f=m[0],x=m[1],g={MenuItem:{fontSize:"1.5rem","&:hover":{color:null!==s&&void 0!==s?s:"white"}},link:{textDecoration:"none",color:"white"}};return Object(h.useEffect)((function(){var n=t.pathname;u(Object(i.get)(Ie,"".concat(n,".color"))),e.changeTheme(Object(i.get)(Ie,n))}),[t,e]),document.onreadystatechange=function(){var e=document.querySelector(".navbar-container"),t=document.querySelector(".katsudon-logo");window.addEventListener("scroll",(function(n){window.scrollY>=20?(e.classList.add("navbar-container-condensed"),t.classList.add("katsudon-logo-condensed")):(e.classList.remove("navbar-container-condensed"),t.classList.remove("katsudon-logo-condensed"))}))},Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("div",{className:"navbar-container",children:[Object(p.jsxs)("div",{className:"navbar-menu",children:[Object(p.jsx)(l.a,{onClick:function(e){x(e.currentTarget)},children:Object(p.jsx)(b.a,{style:{color:"white",fontSize:"4rem"}})}),Object(p.jsx)(d.a,{style:{marginLeft:"-1.5rem"},anchorEl:f,open:!!f,onClose:function(){return x(null)},children:Object(i.map)(Le,(function(e,t){return Object(p.jsx)(a.b,{to:e,style:g.link,children:Object(p.jsx)(j.a,{sx:g.MenuItem,children:t})},t)}))})]}),Object(p.jsxs)("div",{className:"navbar-redirect-section",children:[Object(p.jsxs)("div",{className:"navbar-link-wrapper",children:[Object(p.jsx)("div",{className:"katsudon-logo",style:{color:s},children:"\u30ab\u30c4\u30c9\u30f3"}),Object(i.map)(Object(i.omit)(Le,"Sign In"),(function(e,t){return Object(p.jsx)("div",{className:"redirect-links",children:Object(p.jsx)(a.b,{to:e,className:"navbar-redirect-link",style:{textDecoration:"none"},children:t})},t)}))]}),Object(p.jsx)(a.b,{to:"/profile",className:"navbar-redirect-link",style:{textDecoration:"none"},children:"Sign In"})]})]}),Object(p.jsx)("div",{className:"navbar-bottom-padding"})]})}var Fe=n(149),Te=n.n(Fe),Ae=n(150),Be=n.n(Ae),De=(n(514),{icon:{fontSize:"3rem",color:"white"}});function Ee(){return Object(p.jsxs)("div",{className:"footer-container",children:[Object(p.jsxs)("div",{className:"footer-content",children:[Object(p.jsx)(l.a,{children:Object(p.jsx)(Te.a,{style:De.icon})}),Object(p.jsx)(l.a,{children:Object(p.jsx)(Be.a,{style:De.icon})})]}),"please hire me"]})}var Ue=function(){var e=Object(h.useState)(null),t=Object(r.a)(e,2),n=t[0],c=t[1],s=Ce.map((function(e,t){var c=Object(h.cloneElement)(e.element,{color:Object(i.get)(n,"color"),backgroundColor:Object(i.get)(n,"background")});return Object(p.jsx)(o.a,{path:e.path,element:c},t)}));return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)(a.a,{children:[Object(p.jsx)(_e,{changeTheme:c}),Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center",paddingBottom:"75px"},children:Object(p.jsx)(o.c,{children:s})}),Object(p.jsx)(Ee,{})]})})};s.a.createRoot(document.getElementById("root")).render(Object(p.jsx)(Ue,{}))}},[[515,1,2]]]);
//# sourceMappingURL=main.589c8434.chunk.js.map