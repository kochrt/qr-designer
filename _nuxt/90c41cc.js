(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{524:function(t,e,n){"use strict";n.r(e);var r=n(12),o=(n(66),n(39),n(57),n(433),n(16),n(434),n(435),n(436),n(437),n(438),n(439),n(440),n(441),n(442),n(443),n(444),n(445),n(446),n(447),n(448),n(449),n(450),n(451),n(452),n(453),n(454),n(455),n(456),n(457),n(63),n(2).default.extend({props:["stage"],data:function(){return{loading:!1,copiedImageLink:"",tempButtonText:""}},computed:{buttonText:function(){return this.tempButtonText?this.tempButtonText:this.loading?"Getting link...":"Copy image link"}},methods:{stageImageAsBlob:function(){for(var t=this.stage.toDataURL({pixelRatio:3}).split(","),e=t[0].indexOf("base64")>=0?atob(t[1]):decodeURI(t[1]),n=t[0].split(":")[1].split(";")[0],r=new Uint8Array(e.length),i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return new Blob([r],{type:n})},share:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var link,textarea;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,(new FormData).append("file",t.stageImageAsBlob()),link="HTTPS://GITHUB.COM/KOCHRT",!navigator||!navigator.clipboard){e.next=10;break}return e.next=7,navigator.clipboard.writeText(link);case 7:t.copiedImageLink=link,e.next=28;break;case 10:if(!document.queryCommandSupported||!document.queryCommandSupported("copy")){e.next=28;break}(textarea=document.createElement("textarea")).textContent=link,textarea.style.position="fixed",document.body.appendChild(textarea),textarea.select(),e.prev=16,document.execCommand("copy"),t.copiedImageLink=link,e.next=25;break;case 21:return e.prev=21,e.t0=e.catch(16),console.warn("Copy to clipboard failed.",e.t0),e.abrupt("return",!1);case 25:return e.prev=25,document.body.removeChild(textarea),e.finish(25);case 28:t.tempButtonText="Copied to clipboard",setTimeout((function(){t.tempButtonText=""}),1e4),t.loading=!1;case 31:case"end":return e.stop()}}),e,null,[[16,21,25,28]])})))()}}})),l=n(75),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"\n    transition\n    py-1\n    px-2\n    flex flex-row\n    items-center\n    text-purple-800\n    bg-purple-50\n    border border-purple-800\n    hover:bg-purple-800 hover:text-white\n    disabled:bg-purple-50 disabled:text-purple-400\n  ",attrs:{disabled:t.loading||!!t.tempButtonText},on:{click:t.share}},[n("svg",{staticClass:"h-4 w-4 mr-1 md:hidden",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z","clip-rule":"evenodd"}})]),t._v(" "),t.loading?n("svg",{staticClass:"animate-spin md:mr-1 h-3 w-3 mb-px",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"}},[n("circle",{staticClass:"opacity-25",attrs:{cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}}),t._v(" "),n("path",{staticClass:"opacity-75",attrs:{fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}})]):n("svg",{staticClass:"w-4 h-4 md:mr-1",attrs:{focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",fill:"currentColor"}},[n("path",{attrs:{d:"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"}})]),t._v(" "),n("span",{staticClass:"hidden md:block"},[t._v(t._s(t.buttonText))])])}),[],!1,null,null,null);e.default=component.exports}}]);