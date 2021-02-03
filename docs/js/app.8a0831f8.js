(function(t){function e(e){for(var i,o,r=e[0],c=e[1],l=e[2],m=0,d=[];m<r.length;m++)o=r[m],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&d.push(n[o][0]),n[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,r=1;r<a.length;r++){var c=a[r];0!==n[c]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={app:0},s=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/movie_factory/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"01d9":function(t,e,a){},"034f":function(t,e,a){"use strict";a("85ec")},"05c3":function(t,e,a){},"0e4a":function(t,e,a){"use strict";a("2251")},"1a97":function(t,e,a){"use strict";a("d650")},2251:function(t,e,a){},2967:function(t,e,a){"use strict";a("fec7")},4360:function(t,e,a){"use strict";(function(t){a("fb6a"),a("a434"),a("d3b7"),a("ac1f"),a("25f0"),a("1276");var i=a("5530"),n=(a("96cf"),a("1da1")),s=a("2b0e"),o=a("2f62"),r=a("bc3a"),c=a.n(r);s["default"].use(o["a"]),e["a"]=new o["a"].Store({state:{apiBaseURL:"https://localhost/api/movie",cast:[],selectedFilm:{},isFavoriteFilm:!1,isSeenFilm:!1,getAllUser:[],seenDuration:0,selectedActor:{},videoPath:"",filmSpec:{},login:{getLoginURL:"http://localhost:3050/user/login",getLoggedUser:{},getFavorite:[],getSeen:[]},popularFilm:[],categories:[]},mutations:{selectUser:function(t,e){t.login.getLoggedUser=e.data,t.login.getFavorite=e.data.favorite,t.login.getSeen=e.data.seen},toggleFavorite:function(t,e){t.isFavoriteFilm=!t.isFavoriteFilm},toggleSeenFilm:function(t,e){t.isSeenFilm=!t.isSeenFilm},fetchAllUser:function(t,e){t.getAllUser=e},addPopularFilm:function(t,e){t.popularFilm=e},addCategories:function(t,e){t.categories=e},addOneFilm:function(t,e){t.selectedFilm=e},addCast:function(t,e){t.cast=e},addPath:function(t,e){t.videoPath=e},addFilmSpec:function(t,e){t.filmSpec=e},addToFavorite:function(t,e){t.login.getFavorite.push(e)},removeFavorite:function(t,e){for(var a=e.id,i=0;i<t.login.getFavorite.length;i++)t.login.getFavorite[i].id==a&&t.login.getFavorite.splice(i,1)},addToSeen:function(t,e){t.login.getSeen.push(e)},removeSeen:function(t,e){for(var a=e.id,i=0;i<t.login.getSeen.length;i++)t.login.getSeen[i].id==a&&t.login.getSeen.splice(i,1)}},actions:{fetchUser:function(e,a){var i,s=a.email,o=a.password,r=a.router;c.a.post(this.state.login.getLoginURL,{email:s,password:o}).then(function(){var a=Object(n["a"])(regeneratorRuntime.mark((function a(n){var s,o,c,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,n.data;case 2:s=a.sent,o=s.token,c=o.split(".")[1],l=t.from(c,"base64"),i=JSON.parse(l.toString()),e.commit("selectUser",i),r.push("/home");case 9:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()).catch()},fetchPopularFilm:function(t,e){t.commit("addPopularFilm",e)},fetchCategories:function(t,e){t.commit("addCategories",e)},addFilm:function(t,e){c.a.get("http://localhost:3050/api/movie/spec/".concat(e.id)).then(function(){var a=Object(n["a"])(regeneratorRuntime.mark((function a(s){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:c.a.get("http://localhost:3050/api/movie/credits/".concat(e.id)).then(function(){var a=Object(n["a"])(regeneratorRuntime.mark((function a(o){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:o.data.cast=o.data.cast.slice(0,5),c.a.get("http://localhost:3050/api/movie/video/".concat(e.id)).then(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(a){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data.results[0].key;case 2:if(e.t0=e.sent,"https://www.youtube.com/embed/"+e.t0,"YouTube"!=a.data.results[0].site){e.next=10;break}return n=Object(i["a"])(Object(i["a"])(Object(i["a"])({},s.data),o.data),a.data),e.next=8,t.commit("addOneFilm",n);case 8:e.next=13;break;case 10:return r=Object(i["a"])(Object(i["a"])({},s.data),o.data),e.next=13,t.commit("addOneFilm",r);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()).catch((function(t){return t}))},fetchCast:function(t,e){t.commit("addCast",e)},fetchVideoPath:function(t,e){t.commit("addPath",e)},fetchFilmSpec:function(t,e){t.commit("addFilmSpec",e)}},modules:{},getter:{}})}).call(this,a("b639").Buffer)},5033:function(t,e,a){"use strict";a("01d9")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"app"}},[a("router-view")],1)},s=[],o={name:"App",components:{}},r=o,c=(a("034f"),a("2877")),l=Object(c["a"])(r,n,s,!1,null,null,null),u=l.exports,m=a("8c4f"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("Navbar"),a("div",{staticClass:"row contentPage"},[a("Menu",{staticClass:"col-2"}),a("Main",{staticClass:"col-10"})],1)],1)},p=[],h=(a("96cf"),a("1da1")),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"leftMenu",attrs:{id:"sidebar"}},[t._m(0),a("button",{staticClass:"dropdown-toggle leftFilter bg-secondary text-light",attrs:{href:"#catFilm","data-toggle":"collapse","aria-expanded":"false"}},[t._v(" Categories ")]),a("ul",{staticClass:"collapse list-unstyled",attrs:{id:"catFilm"}},t._l(t.categories.genres,(function(t,e){return a("menu-link",{key:e,staticClass:"catMenu genres",attrs:{name:t.name,id:t.id}})})),1),a("button",{staticClass:"dropdown-toggle leftFilter bg-secondary text-light",attrs:{href:"#yearFilm","data-toggle":"collapse","aria-expanded":"false"}},[t._v(" Year ")]),a("ul",{staticClass:"collapse list-unstyled",attrs:{id:"yearFilm"}},[a("menu-link",{attrs:{name:"2021"}}),a("menu-link",{attrs:{name:"2020"}}),a("menu-link",{attrs:{name:"2019"}}),a("menu-link",{attrs:{name:"2018"}}),a("menu-link",{attrs:{name:"2017"}})],1)])},g=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar-header"},[a("h3",[t._v("Filter:")])])}],v=a("5530"),b=a("2f62"),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"col-12 mb-2 cat",on:{click:function(e){return t.handleClick()}}},[t._v(t._s(t.name))])},C=[],w=(a("b0c0"),a("bc3a")),F=a.n(w),y={name:"MenuLink",computed:Object(v["a"])({},Object(b["b"])(["login","categories"])),props:["name","id"],methods:{handleClick:function(){var t=this;parseInt(this.name,10)>=2017&&parseInt(this.name,10)<=2021?F.a.get("http://localhost:3050/api/movie/year/".concat(parseInt(this.name,10))).then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchPopularFilm",i);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)})):F.a.get("http://localhost:3050/api/movie/genre/".concat(this.id)).then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchPopularFilm",i);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))}}},k=y,E=(a("9c82"),Object(c["a"])(k,_,C,!1,null,"a5190530",null)),x=E.exports,P={components:{MenuLink:x},name:"Menu",computed:Object(v["a"])({},Object(b["b"])(["login","categories"]))},O=P,j=(a("f6a1"),Object(c["a"])(O,f,g,!1,null,"02058b47",null)),$=j.exports,S=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{staticClass:"navMenu container sticky-top"},[i("div",{staticClass:"headerTitle"},[i("img",{attrs:{src:a("89fd"),alt:"logo",id:"logo"}}),i("h1",[t._v("The Movie Factory")]),"home"==this.$route.name?i("search-bar"):t._e()],1),i("ul",{staticClass:"mainMenu bg-dark"},[i("li",{on:{click:function(e){return t.getPopular()}}},[t._v("home")]),i("li",{on:{click:function(e){return t.getCommunityPage()}}},[t._v("Community")]),i("li",{on:{click:function(e){return t.getProfilPage()}}},[t._v(" "+t._s(t.login.getLoggedUser.username)+" ")])])])},R=[],L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"searchBar"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchValue,expression:"searchValue"}],staticClass:"search",attrs:{type:"text",placeholder:"search..."},domProps:{value:t.searchValue},on:{input:function(e){e.target.composing||(t.searchValue=e.target.value)}}}),a("button",{on:{click:function(e){return t.handleFind()}}},[t._v("Find")]),a("button",{staticClass:"btn-danger",on:{click:function(e){return t.handleLogout()}}},[t._v("log out")])])},U=[],M={name:"SearchBar",data:function(){return{searchValue:""}},computed:Object(v["a"])({},Object(b["b"])(["login","categories"])),methods:{handleLogout:function(){this.$store.dispatch("fetchUser",{}),this.$router.push("/")},handleFind:function(){var t=this;F.a.get("http://localhost:3050/api/movie/title/".concat(this.searchValue)).then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchPopularFilm",i),"home"!=t.$route.name&&t.$router.push("/home");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))}}},I=M,V=(a("ad64"),Object(c["a"])(I,L,U,!1,null,"0dbd5fca",null)),A=V.exports,T={components:{SearchBar:A},data:function(){return{notLogged:"not logged"}},name:"NavBar",computed:Object(v["a"])({},Object(b["b"])(["login"])),methods:{getPopular:function(){var t=this;F.a.get("http://localhost:3050/api/movie/").then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchPopularFilm",i),"home"!=t.$route.name&&t.$router.push("/home");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))},getProfilPage:function(){"profil"!=this.$route.name&&this.$router.push("/profil")},getCommunityPage:function(){var t=this;F.a.get("http://localhost:3050/user/alluser").then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.commit("fetchAllUser",i),"community"!=t.$route.name&&t.$router.push("/community");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return t}))}}},N=T,B=(a("631c"),Object(c["a"])(N,S,R,!1,null,"ae6561c8",null)),D=B.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mainContent row"},t._l(t.popularFilm.results,(function(t,e){return a("movie-card",{key:e,staticClass:"homeFilmCard col-6 p-0 m-0",attrs:{title:t.title,film:t,description:t.overview,vote:t.vote_average,path:t.poster_path,compPath:"/home"}})})),1)},q=[],H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row p-1 m-0 movieCard",on:{click:function(e){return t.selectFilm(t.film)}}},[a("div",{staticClass:"col-4 p-0"},[t.path?a("img",{staticClass:"moviePict",attrs:{src:"https://image.tmdb.org/t/p/w200/"+t.path,alt:"picture"}}):t._e()]),a("div",{staticClass:"col-8"},[a("div",{staticClass:"card-body p-2 cardBody"},[a("h5",{staticClass:"card-title"},[t._v(" "+t._s(t.title.slice(0,20)+(t.title.length>=20?"...":""))+" ")]),a("p",{staticClass:"card-text describe"},[t._v(" "+t._s(t.description.slice(0,100)+(t.description.length>=100?"...":""))+" ")]),a("p",{staticClass:"card-text"},[a("small",{staticClass:"text-muted vote"},[t._v("vote average: "+t._s(t.vote))])])])])])},J=[],Z={name:"MovieCard",components:{},methods:{selectFilm:function(t){var e=this;return Object(h["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!t){a.next=4;break}return a.next=3,e.$store.dispatch("addFilm",t);case 3:"/film"!==e.$route.path&&e.$router.push("/film");case 4:case"end":return a.stop()}}),a)})))()}},props:["title","description","vote","path","film","isActive"]},W=Z,Y=(a("2967"),Object(c["a"])(W,H,J,!1,null,"38ab0b1a",null)),G=Y.exports,K={components:{MovieCard:G},name:"Main",computed:Object(v["a"])({},Object(b["b"])(["popularFilm"])),methods:{}},Q=K,X=(a("1a97"),Object(c["a"])(Q,z,q,!1,null,"2b6d9a4c",null)),tt=X.exports,et={name:"Home",beforeMount:function(){var t=this;F.a.get("http://localhost:3050/api/movie/categories").then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchCategories",i);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)})),F.a.get("http://localhost:3050/api/movie/").then(function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(a){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.data;case 2:i=e.sent,t.$store.dispatch("fetchPopularFilm",i);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))},components:{Navbar:D,Menu:$,Main:tt}},at=et,it=(a("bc64"),Object(c["a"])(at,d,p,!1,null,"39795028",null)),nt=it.exports,st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("LoginForm")],1)},ot=[],rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"LoginForm login-box"},[t._m(0),a("div",{staticClass:"login"},[a("form",{attrs:{action:""}},[a("div",{staticClass:"form-group log"},[a("label",{staticClass:"form-control-label",style:{color:t.emailColor}},[t._v(t._s(t.labelEmail))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t.forgot?t._e():a("div",{staticClass:"form-group log"},[a("label",{staticClass:"form-control-label",style:{color:t.passwordColor}},[t._v(t._s(t.labelPassword))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t.signup?a("div",{staticClass:"form-group log"},[a("label",{staticClass:"form-control-label",style:{color:t.passwordColor}},[t._v("username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]):t._e(),!t.forgot&t.reset?a("div",{staticClass:"form-group log"},[a("label",{staticClass:"form-control-label",style:{color:t.passwordColor}},[t._v("new "+t._s(t.labelPassword))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newPassword,expression:"newPassword"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.newPassword},on:{input:function(e){e.target.composing||(t.newPassword=e.target.value)}}})]):t._e(),a("div",{staticClass:"reset d-flex justify-content-center"},[a("span",{staticClass:"btn",on:{click:function(e){return t.handleSignup()}}},[t._v(" New account")]),a("button",{staticClass:"btn",attrs:{type:"button","data-toggle":"modal","data-target":"#staticBackdrop"}},[t._v(" Forgot password ")])]),a("div",{staticClass:"boutons"},[t.reset||t.signup||t.forgot?t._e():a("button",{staticClass:"btn btn-outline-danger",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.handleClick()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleClick()}}},[t._v(" Login ")]),t.forgot|t.signup|t.reset?a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.handleCancel()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleCancel()}}},[t._v(" Cancel ")]):t._e(),t.signup?a("button",{staticClass:"btn btn-outline-success",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.signups()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.signups()}}},[t._v(" Sign Up ")]):t._e()])])]),a("div",{staticClass:"loginFooter"},[a("div",{staticClass:"testimonial-quote right"},[a("div",{staticClass:"quote-container"},[a("div",[a("blockquote",[t.forgot||t.reset||t.signup?t._e():a("p",[t._v("Le bouton rouge Régis")]),t.forgot?a("p",[t._v("Le bouton bleu Régis")]):t._e(),t.reset?a("p",[t._v("Le bouton jaune Régis")]):t._e(),t.signup?a("p",[t._v("Le bouton vert Régis")]):t._e()]),t._m(1)])])])])]),a("div",{staticClass:"modal fade",attrs:{id:"staticBackdrop","data-backdrop":"static",tabindex:"-1",role:"dialog","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(2),a("div",{staticClass:"modal-body d-flex justify-content-center pb-0"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.forgotInput,expression:"forgotInput"}],staticClass:"pb-0 mb-0",attrs:{type:"text",placeholder:"regis@mail.fr",required:""},domProps:{value:t.forgotInput},on:{input:function(e){e.target.composing||(t.forgotInput=e.target.value)}}})]),t.isForgot?a("div",[a("mailer-component",{attrs:{recipientEmail:this.recipientEmail}})],1):t._e(),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" Cancel ")]),a("button",{staticClass:"btn btn-outline-danger",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.handleForgot()},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleForgot()}}},[t._v(" Send reset email ")])])])])])])},ct=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"loginHeader"},[i("img",{staticClass:"logo",attrs:{src:a("886c"),alt:"logo"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("cite",[a("span",[t._v("-La cité de la peur-")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"staticBackdropLabel"}},[t._v(" Forgot password ")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],lt=(a("4d63"),a("ac1f"),a("25f0"),a("498a"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t._v(" "+t._s(t.recipientEmail)+" ")]),t.sent?a("span",{staticClass:"text-success"},[t._v("Message sent to "+t._s(t.recipientEmail)+" ! Please check your inbox")]):a("span",{staticClass:"text-danger"},[t._v("An error occured")])])}),ut=[],mt={name:"MailerComponent",props:["recipientEmail"],data:function(){return{sent:!1}},methods:{emailToReset:function(){var t=this;F.a.post("http://localhost:3050/user/forgot",{recipientEmail:this.recipientEmail}).then((function(e){e.data&&(t.sent=!0),console.log("Front: Réponse recue: "+e.data)})).catch((function(t){return console.log("Front: Catch: "+t)}))}},created:function(){this.emailToReset()}},dt=mt,pt=Object(c["a"])(dt,lt,ut,!1,null,null,null),ht=pt.exports,ft="";ft="production"==Object({NODE_ENV:"production",BASE_URL:"/movie_factory/"})?"https://git.heroku.com/the-movie-factory-api.git":"http://localhost:3050",console.log(ft);var gt={components:{MailerComponent:ht},name:"LoginForm",props:{},data:function(){return{isEmailEmpty:!0,isEmailValid:!1,isPasswordEmpty:!0,forgot:!1,reset:!1,signup:!1,username:"",email:"",isForgot:!1,forgotInput:"",recipientEmail:"",newPassword:"",password:"",serveurMessage:"",labelEmail:"Email",emailColor:"#6c6c6c",labelPassword:"Password",passwordColor:"#6c6c6C"}},computed:Object(v["a"])({},Object(b["b"])(["login"])),methods:{handleForgot:function(){this.isForgot=!0,this.recipientEmail=this.forgotInput,this.forgotInput=""},handleClick:function(){this.login.getLoginURL;this.checkIsEmailEmpty(this.email),this.isEmailEmpty||(this.checkIsEmailValid(this.email),this.isEmailValid&&(this.checkIsPasswordEmpty(this.password),this.isPasswordEmpty||this.$store.dispatch("fetchUser",{email:this.email,password:this.password,router:this.$router})))},resetPassword:function(){this.reset=!0,this.forgot=!1,this.signup=!1,this.checkIsEmailEmpty(this.email),this.isEmailEmpty||(this.checkIsEmailValid(this.email),this.isEmailValid)},forgotPassword:function(){this.forgot=!0,this.signup=!1,this.reset=!1,this.checkIsEmailEmpty(this.email),this.isEmailEmpty||(this.checkIsEmailValid(this.email),this.isEmailValid)},handleSignup:function(){this.signup=!0,this.reset=!1,this.forgot=!1},signups:function(){var t=this;this.checkIsEmailEmpty(this.email),this.isEmailEmpty||(this.checkIsEmailValid(this.email),this.isEmailValid&&(this.checkIsPasswordEmpty(this.password),this.isPasswordEmpty||F.a.post("".concat(ft,"/user/signup"),{email:this.email,password:this.password,username:this.username}).then((function(e){"email déja utilisé"==e.data&&(t.username=e.data+" Régis",setTimeout((function(){return t.username=""}),2e3))})).catch((function(t){return console.log(t)}))))},sendMail:function(){var t=this;this.checkIsEmailEmpty(this.email),this.isEmailEmpty||(this.checkIsEmailValid(this.email),this.isEmailValid&&(this.serveurMessage="Un email de réinitialisation vient d'être envoyé",setTimeout((function(){t.serveurMessage="",t.signup=!1,t.reset=!1,t.forgot=!1}),2e3)))},handleCancel:function(){this.signup=!1,this.reset=!1,this.forgot=!1},declinePassword:function(){var t=this;this.passwordColor="red",this.labelPassword="Mot de passe incorrect",setTimeout((function(){t.labelPassword="Password",t.passwordColor="#6c6c6c",t.password=""}),2500)},checkIsEmailEmpty:function(t){var e=this;""===t.trim()?(this.emailColor="red",this.labelEmail="Veuillez renseigner une adresse email svp",setTimeout((function(){e.labelEmail="Email",e.emailColor="#6c6c6c",e.email=""}),2500)):this.isEmailEmpty=!1},checkIsEmailValid:function(t){var e=this,a=new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$");a.test(t)?this.isEmailValid=!0:(this.emailColor="red",this.labelEmail="Veuillez renseigner une adresse email valide",setTimeout((function(){e.labelEmail="Email",e.emailColor="#6c6c6c",e.email=""}),2500))},checkIsPasswordEmpty:function(t){var e=this;""===t.trim()?(this.passwordColor="red",this.labelPassword="Veuillez renseigner un mot de passe",setTimeout((function(){e.labelPassword="Password",e.passwordColor="#6c6c6c",t=""}),2500)):this.isPasswordEmpty=!1}}},vt=gt,bt=(a("0e4a"),Object(c["a"])(vt,rt,ct,!1,null,"42f5439e",null)),_t=bt.exports,Ct={components:{LoginForm:_t}},wt=Ct,Ft=Object(c["a"])(wt,st,ot,!1,null,"10b09631",null),yt=Ft.exports,kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("navbar"),a("div",{staticClass:"selectedFilm"},[a("div",{attrs:{id:"filmHeader"}},[a("h2",[t._v(t._s(t.selectedFilm.title))])]),a("div",{attrs:{id:"selectedFilm"}},[a("div",{staticClass:"selectedFilmPicture"},[a("img",{staticClass:"moviePict",attrs:{src:"https://image.tmdb.org/t/p/w400/"+t.selectedFilm.poster_path,alt:"picture"}})]),a("div",{staticClass:"selectedFilmDescribe"},[t.selectedFilm.results&&t.selectedFilm.results[0].key?a("iframe",{attrs:{width:"480",height:"320",src:t.$data.youtubePath+t.selectedFilm.results[0].key,frameborder:"0",allowfullscreen:""}}):t._e(),a("p",[t._v(t._s(t.selectedFilm.overview)+" $")])])]),a("div",{attrs:{id:"filmFooter"}},[a("p",[a("span",[t._v(" Favorite ")]),t.isFavoriteFilm?t._e():a("span",{staticClass:"badge badge-success badges",on:{click:function(e){return t.addFavorite(t.selectedFilm)}}},[t._v("Add")]),t.isFavoriteFilm?a("span",{staticClass:"badge badge-danger badges",on:{click:function(e){return t.addFavorite(t.selectedFilm)}}},[t._v("Remove")]):t._e(),a("span",[t._v(" Seen")]),t.isSeenFilm?t._e():a("span",{staticClass:"badge badge-success",on:{click:function(e){return t.addToSeen(t.selectedFilm)}}},[t._v("Add")]),t.isSeenFilm?a("span",{staticClass:"badge badge-danger",on:{click:function(e){return t.addToSeen(t.selectedFilm)}}},[t._v("Remove")]):t._e()]),a("p",[t._v(" Gain: "),a("span",{staticClass:"badge badge-info"},[t._v(" "+t._s(new Intl.NumberFormat("de-DE",{style:"currency",currency:"USD",maximumSignificantDigits:1}).format(t.selectedFilm.revenue-t.selectedFilm.budget))+" ")]),t._v(" Runtime:"),a("span",{staticClass:"badge badge-info"},[t._v(" "+t._s(t.selectedFilm.runtime))]),t._v("mn ")]),a("p",t._l(t.selectedFilm.genres,(function(e,i){return a("span",{key:i},[t._v(" -"+t._s(e.name)+"- ")])})),0),t.selectedFilm.homepage?a("p",[a("a",{attrs:{href:t.selectedFilm.homepage}},[t._v("Official Home Page")])]):t._e(),a("p",[t._v(" popularity:"),a("span",{staticClass:"badge badge-warning"},[t._v(" "+t._s(t.selectedFilm.popularity))]),t._v(" release: "),a("span",{staticClass:"badge badge-warning"},[t._v(t._s(t.selectedFilm.release_date)+" ")]),t._v(" vote average: "),a("span",{staticClass:"badge badge-warning"},[t._v(t._s(t.selectedFilm.vote_average))]),t._v(" vote count: "),a("span",{staticClass:"badge badge-warning"},[t._v(t._s(t.selectedFilm.vote_count))])])]),a("div",{staticClass:"actorList"},t._l(t.selectedFilm.cast,(function(e,i){return a("div",{key:i,on:{click:function(a){return t.handleActor(e.id)}}},[a("img",{staticClass:"photoActor",attrs:{src:"https://image.tmdb.org/t/p/w200/"+e.profile_path,alt:"photo"}}),a("h4",[t._v(t._s(e.name))]),a("p",[t._v("popularity: "+t._s(e.popularity))])])})),0),t.actorsFilm.length?a("splide",{staticClass:"filmList",attrs:{options:t.options}},t._l(t.actorsFilm,(function(e,i){return a("splide-slide",{key:i,staticClass:"filmCard"},[e.poster_path?a("img",{staticClass:"photoFilm",attrs:{src:"https://image.tmdb.org/t/p/w200/"+e.poster_path,alt:"photo"},on:{click:function(a){return t.handleActorsFilm(e)}}}):t._e(),a("div",{staticClass:"cardDescription"},[a("h5",[t._v(t._s(e.title))]),a("p",[t._v(t._s(e.overview.slice(0,100)))]),a("span",[t._v("Runtime "+t._s(t.selectedFilm.runtime)+" mn")]),a("span",[t._v("popularity: "+t._s(e.popularity))]),a("span",[t._v("vote average: "+t._s(e.vote_average))]),a("span",[t._v("vote count: "+t._s(e.vote_count))])])])})),1):t._e()],1)],1)},Et=[],xt=(a("fb6a"),a("5e2b")),Pt=(a("e50d"),{components:{Navbar:D,Splide:xt["a"],SplideSlide:xt["b"]},name:"Film",data:function(){return{actorsFilm:[],options:{rewind:!0,width:800,gap:"1rem"},youtubePath:"https://www.youtube.com/embed/"}},computed:Object(v["a"])({},Object(b["b"])(["selectedFilm","login","isFavoriteFilm","isSeenFilm"])),methods:{handleActor:function(t){var e=this;F.a.get("http://localhost:3050/api/movie/person/".concat(t)).then(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(a){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.data.results.slice(0,6);case 2:i=t.sent,e.actorsFilm=i;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))},addFavorite:function(t){for(var e=this.$store.state.login.getFavorite,a=!1,i=0;i<e.length;i++){var n=e[i];n.id==t.id&&(a=!0)}a||(this.$store.commit("addToFavorite",t),F.a.put("http://localhost:3050/user/addfavorite",{email:this.login.getLoggedUser.email,filmId:t})),a&&(this.$store.commit("removeFavorite",t),F.a.put("http://localhost:3050/user/removefavorite",{email:this.login.getLoggedUser.email,filmId:t})),this.$store.commit("toggleFavorite")},addToSeen:function(t){for(var e=this.$store.state.login.getSeen,a=!1,i=0;i<e.length;i++){var n=e[i];n.id==t.id&&(a=!0)}a||(this.$store.commit("addToSeen",t),F.a.put("http://localhost:3050/user/seen",{email:this.login.getLoggedUser.email,filmId:t})),a&&(this.$store.commit("removeSeen",t),F.a.put("http://localhost:3050/user/removeseen",{email:this.login.getLoggedUser.email,filmId:t})),this.$store.commit("toggleSeenFilm")},handleActorsFilm:function(t){var e=this;F.a.get("http://localhost:3050/api/movie/".concat(t.id)).then(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(a){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.data;case 2:i=t.sent,e.$store.dispatch("addFilm",i),e.actorsFilm=[];case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){return console.log(t)}))}},mounted:function(){for(var t=this.login.getFavorite,e=this.login.getSeen,a=-1,i=0;i<t.length;i++)t[i].id==this.selectedFilm.id&&(a=i);-1==a&&this.isFavoriteFilm&&this.$store.commit("toggleFavorite"),-1!=a&&this.isFavoriteFilm&&this.$store.commit("toggleFavorite"),a=-1;for(var n=0;n<e.length;n++)e[n].id==this.selectedFilm.id&&(a=n);-1==a&&this.isSeenFilm&&this.$store.commit("toggleSeenFilm"),-1!=a&&this.isSeenFilm&&this.$store.commit("toggleFavorite")}}),Ot=Pt,jt=(a("ecba"),Object(c["a"])(Ot,kt,Et,!1,null,"8fb735d4",null)),$t=jt.exports,St=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("navbar"),a("h2",[t._v(" Welcome "+t._s(t.login.getLoggedUser.username.toUpperCase())+" on your Profil Page ")]),a("div",{staticClass:"profilMain row m-0"},[a("profil-component",{staticClass:"col-2",attrs:{name:t.login.getLoggedUser.username,favoriteCount:t.login.getLoggedUser.favorite,seen:t.login.getLoggedUser.seen}}),a("div",{staticClass:"col-10"},[a("h3",{staticClass:"col-12 bg-dark"},[t._v("Favorites Film")]),a("div",{staticClass:"favoriteFilm row"},t._l(t.login.getFavorite,(function(t,e){return a("movie-card",{key:e,staticClass:"homeFilmCard col-6",attrs:{film:t,title:t.title,path:t.poster_path,description:t.overview,vote:t.vote_average}})})),1),a("h3",{staticClass:"col-12 bg-dark"},[t._v("Seen Film")]),a("div",{staticClass:"seenFilm row"},t._l(t.login.getSeen,(function(t,e){return a("movie-card",{key:e,staticClass:"homeFilmCard col-6",attrs:{film:t,title:t.title,path:t.poster_path,description:t.overview,vote:t.vote_average}})})),1)])],1)],1)},Rt=[],Lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"profilComponent"},[a("h5",[t._v(t._s(this.name))]),a("p",[t._v("favorite: "+t._s(this.favoriteCount.length))]),a("p",[t._v("seen: "+t._s(this.seen.length))])])},Ut=[],Mt={data:function(){return{isFavoriteSelected:!0}},name:"profilComponent",props:["name","favoriteCount","seen"]},It=Mt,Vt=(a("5033"),Object(c["a"])(It,Lt,Ut,!1,null,"7bd2531e",null)),At=Vt.exports,Tt={name:"ProfilPage",components:{Navbar:D,ProfilComponent:At,MovieCard:G},MovieCardata:function(){return{isFavoriteSelected:!0}},computed:Object(v["a"])({},Object(b["b"])(["login"]))},Nt=Tt,Bt=(a("e56c"),Object(c["a"])(Nt,St,Rt,!1,null,"629e83a6",null)),Dt=Bt.exports,zt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main row"},[a("navbar"),a("h2",{staticClass:"col-12"},[t._v(" Welcome "+t._s(t.login.getLoggedUser.username.toUpperCase())+" inside the Community ")]),a("div",{staticClass:"row m-0"},t._l(t.getAllUser,(function(e,i){return a("profil-component",{key:i,staticClass:"users m-4",attrs:{name:e.username,favoriteCount:e.favorite,seen:e.seen},on:{click:function(e){return t.handleUserProfil()}}})})),1)],1)},qt=[],Ht={name:"CommunityPage",components:{Navbar:D,ProfilComponent:At},computed:Object(v["a"])({},Object(b["b"])(["login","getAllUser"])),methods:{handleUserProfil:function(){}}},Jt=Ht,Zt=(a("8bdc"),Object(c["a"])(Jt,zt,qt,!1,null,"5bc688ad",null)),Wt=Zt.exports;i["default"].use(m["a"]);var Yt=[{path:"/",name:"Login",component:yt},{path:"/home",name:"home",component:nt},{path:"/film",name:"Film",component:$t},{path:"/profil",name:"profil",component:Dt},{path:"/community",name:"community",component:Wt},{path:"/*",redirect:"/"}],Gt=new m["a"]({mode:"history",base:"/movie_factory/",routes:Yt}),Kt=Gt,Qt=a("4360"),Xt=a("5f5b"),te=a("b1e0");a("f9e3"),a("2dd8");a("ed18").config(),i["default"].use(xt["c"]),i["default"].use(Xt["a"]),i["default"].use(te["a"]),i["default"].config.productionTip=!1,new i["default"]({router:Kt,store:Qt["a"],render:function(t){return t(u)}}).$mount("#app")},"5d97":function(t,e,a){},6245:function(t,e,a){},"62ab":function(t,e,a){},"631c":function(t,e,a){"use strict";a("caf6")},"6d1b":function(t,e,a){},"85ec":function(t,e,a){},"886c":function(t,e,a){t.exports=a.p+"img/the-movie-factory.f7abe17b.png"},"89fd":function(t,e,a){t.exports=a.p+"img/homeLogo.9ae6945c.png"},"8bdc":function(t,e,a){"use strict";a("05c3")},"9c82":function(t,e,a){"use strict";a("dc1e")},ad64:function(t,e,a){"use strict";a("62ab")},bc64:function(t,e,a){"use strict";a("6d1b")},caf6:function(t,e,a){},d650:function(t,e,a){},dc1e:function(t,e,a){},e56c:function(t,e,a){"use strict";a("5d97")},ecba:function(t,e,a){"use strict";a("f3e3")},f3e3:function(t,e,a){},f6a1:function(t,e,a){"use strict";a("6245")},fec7:function(t,e,a){}});
//# sourceMappingURL=app.8a0831f8.js.map