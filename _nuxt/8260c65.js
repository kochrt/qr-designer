(window.webpackJsonp=window.webpackJsonp||[]).push([[66,55],{400:function(t,e,n){"use strict";n.r(e);var r=n(2).default.extend({computed:{type:{get:function(){return this.$store.state.swink.swink.tag.redirect?"link":"data"},set:function(t){this.$store.dispatch("swink/setIsRedirect","link"===t)}}}}),l=n(75),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return"data"!==t.type?n("div",[n("div",{staticClass:"\n      px-4\n      bg-indigo-50\n      py-2\n      mb-2\n      bg-gray-50\n      text-sm text-indigo-500\n      rounded\n    "},[n("div",{staticClass:"mb-4"},[n("div",{staticClass:"flex items-center justify-center my-1"},[n("svg",{staticClass:"w-5 h-5",attrs:{focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",fill:"currentColor"}},[n("path",{attrs:{d:"M7 2v11h3v9l7-12h-4l4-8z"}})])]),t._v(" "),n("p",[t._v("You currently have a Link Swink, which goes to a website.")]),t._v(" "),n("br"),t._v(" "),n("p",[t._v("\n        If you want your QR code to have images, text, and apps, change your\n        swink type to Data Swink.\n      ")])]),t._v(" "),n("div",{staticClass:"\n        flex flex-row\n        leading-tight\n        py-1\n        px-2\n        mb-2\n        bg-indigo-500\n        hover:bg-indigo-600 hover:shadow\n        shadow-sm\n        transition\n        rounded\n        text-gray-50\n      "},[n("div",{staticClass:"flex items-center mr-1"},[t._v("\n        ​\n        "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],staticClass:"mr-2 rounded text-indigo-600 hidden",attrs:{type:"radio",id:"dataSwink",value:"data"},domProps:{checked:t._q(t.type,"data")},on:{change:function(e){t.type="data"}}}),t._v(" "),n("label",{staticClass:"\n            cursor-pointer\n            rounded\n            p-px\n            border\n            bg-white\n            border-gray-800\n            text-gray-900\n          ",attrs:{for:"dataSwink"}},[n("svg",{staticClass:"w-4 h-4",attrs:{focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",fill:"currentColor"}},[n("path",{attrs:{d:"M7 2v11h3v9l7-12h-4l4-8z"}})])])]),t._v(" "),t._m(0)])])]):t._e()}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("label",{staticClass:"\n            cursor-pointer\n            ml-1\n            flex flex-row\n            font-medium\n            underline\n            text-sm\n          ",attrs:{for:"dataSwink"}},[t._v("Change to Data Swink")]),t._v(" "),n("label",{staticClass:"cursor-pointer ml-1 flex flex-row text-sm",attrs:{for:"dataSwink"}},[t._v("A Data Swink has images, text, and apps.")])])}],!1,null,null,null);e.default=component.exports},528:function(t,e,n){"use strict";n.r(e);var r=n(2),l=n(381),o=n(400),d=r.default.extend({components:{ChangeToDataSwink:o.default,AppPicker:l.default}}),c=n(75),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-px"},[t.$store.state.swink.swink.tag.redirect?n("div",{staticClass:"pt-2"},[n("change-to-data-swink")],1):t._e(),t._v(" "),n("div",[n("app-picker")],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AppPicker:n(381).default})}}]);