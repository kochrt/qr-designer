(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{376:function(t,n,e){"use strict";var r=e(4),o=e(84).findIndex,f=e(100),c=e(68),h="findIndex",l=!0,d=c(h);h in[]&&Array(1).findIndex((function(){l=!1})),r({target:"Array",proto:!0,forced:l||!d},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),f(h)},475:function(t,n,e){"use strict";e.r(n),e.d(n,"Segments",(function(){return d})),e.d(n,"ColorDot",(function(){return m}));var r=e(48),o=e(3),f=e(5);e(30),e(376),e(20),e(25),e(16),e(21),e(44),e(22),e(35),e(43),e(46),e(28);function c(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return h(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return h(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,f=!0,c=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return f=t.done,t},e:function(t){c=!0,o=t},f:function(){try{f||null==e.return||e.return()}finally{if(c)throw o}}}}function h(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,e=new Array(n);i<n;i++)e[i]=t[i];return e}var l=function(){function t(n){var e=this;Object(o.a)(this,t),this.coordinates=n,this.colors=this.coordinates.map((function(t){return e.isDefaultBlack(t)}))}return Object(f.a)(t,[{key:"last",value:function(){return this.coordinates[this.coordinates.length-1]}},{key:"isDefaultBlack",value:function(t){var n=t[0],e=t[1];return this.defaultMasked(n,e)?1:0}},{key:"defaultMasked",value:function(t,n){return(t+n)%2==0}},{key:"colorDot",value:function(t){var n=this.indexOf(t);this.colors[n]=this.isDefaultBlack(t)?0:1}},{key:"indexOf",value:function(t){return this.coordinates.findIndex((function(n){return t[0]===n[0]&&t[1]===n[1]}))}},{key:"numberRepresentation",value:function(){var t=parseInt(this.colors.map((function(t){return t?"1":"0"})).reduce((function(t,n){return t+n})),2);if(t>999)throw new Error("Number is too big: "+t);return t}},{key:"byteRepresentation",value:function(){var s=this.colors.map((function(t){return"".concat(t)})).reduce((function(t,n){return t+n}));return parseInt(s,2)}}],[{key:"generateSegment",value:function(n,e){for(var r=[],o=n;e>0;)r.push(o),o=y.next(o),e--;return new t(r)}}]),t}(),d=function(){function t(n){Object(o.a)(this,t),this.coordinateSegmentMap=new v(n),this.pixels={};for(var i=0;i<41;i++)this.pixels[i]={}}return Object(f.a)(t,[{key:"colorDots",value:function(t){var n=this;if(t)try{t.forEach((function(t){n.coordinateSegmentMap.segmentForCoordinate(t).colorDot(t)}))}catch(t){if(t instanceof TypeError)throw new RangeError("String is too long")}}},{key:"stringRepresentation",value:function(){return this.coordinateSegmentMap.stringRepresentation()}}],[{key:"defaultSegmentGenerationParams",value:function(t){return{startingCoordinate:t,segmentLength:8,numSegments:49,offset:8}}},{key:"defaultBlank",value:function(n){var e=this.defaultSegmentGenerationParams([4,29]),o=new t(this.generate(e)),f=o.coordinateSegmentMap.segments;f.push.apply(f,Object(r.a)(new Array(n-2*o.coordinateSegmentMap.segments.length)));var c=this.defaultSegmentGenerationParams([0,29]),h=new t(this.generate(c));return f.push.apply(f,Object(r.a)(h.coordinateSegmentMap.segments)),new t(f)}},{key:"generate",value:function(t){for(var n=[],e=t.startingCoordinate,r=!1;t.numSegments>0;){if(t.offset>0&&r){var o=l.generateSegment(e,t.offset);e=y.next(o.last())}else{var f=l.generateSegment(e,t.segmentLength);n.push(f),e=y.next(f.last()),t.numSegments--}r=!r}return n}},{key:"last",value:function(t){return t[t.length-1]}}]),t}(),v=function(){function t(n){Object(o.a)(this,t),this.segments=n}return Object(f.a)(t,[{key:"segmentForCoordinate",value:function(t){var n,e=c(this.segments);try{for(e.s();!(n=e.n()).done;){var r=n.value;if(r&&r.indexOf(t)>=0)return r}}catch(t){e.e(t)}finally{e.f()}return new l([])}},{key:"stringRepresentation",value:function(){var t,n="",e=c(this.segments);try{for(e.s();!(t=e.n()).done;){for(var r=""+t.value.numberRepresentation();r.length<3;)r="0"+r;n+=r}}catch(t){e.e(t)}finally{e.f()}return n}}]),t}(),y=function(){function t(){Object(o.a)(this,t)}return Object(f.a)(t,null,[{key:"upAndRight",value:function(t){return[t[0]-1,t[1]+1]}},{key:"downAndRight",value:function(t){return[t[0]+1,t[1]+1]}},{key:"left",value:function(t){return[t[0],t[1]-1]}},{key:"downTwoAndRight",value:function(t){return[t[0]+2,t[1]+1]}},{key:"upTwoAndRight",value:function(t){return[t[0]-2,t[1]+1]}},{key:"next",value:function(t){return this.next6(t)}},{key:"next6",value:function(t){if(t[0]<0||t[1]<0)throw new Error("Out of bounds");return t[1]%2==0?this.left(t):33===t[1]?31===t[0]?[37,34]:40===t[0]?this.left(t):this.downAndRight(t):31===t[1]?t[0]>=33&&t[0]<=37?[t[0]-1,31]:7===t[0]?this.upTwoAndRight(t):0===t[0]?this.left(t):this.upAndRight(t):Math.ceil(t[1]/2)%2==0?7===t[0]?this.upTwoAndRight(t):0===t[0]?this.left(t):this.upAndRight(t):5===t[0]?this.downTwoAndRight(t):40===t[0]?this.left(t):this.downAndRight(t)}},{key:"next4",value:function(t){if(t[0]<0||t[1]<0)throw new Error("Out of bounds");return t[1]%2==0?this.left(t):31===t[1]?9===t[0]?this.left(t):this.upAndRight(t):29===t[1]?32===t[0]?this.left(t):this.downAndRight(t):27===t[1]?29===t[0]?[23,28]:9===t[0]?[9,26]:this.upAndRight(t):25===t[1]?23===t[0]?[29,26]:32===t[0]?this.left(t):this.downAndRight(t):23===t[1]?t[0]>=25&&t[0]<=29?[t[0]-1,23]:7===t[0]?[5,24]:0===t[0]?[0,22]:this.upAndRight(t):Math.ceil(t[1]/2)%2==0?7===t[0]?this.upTwoAndRight(t):0===t[0]?this.left(t):this.upAndRight(t):5===t[0]?this.downTwoAndRight(t):32===t[0]?this.left(t):this.downAndRight(t)}}]),t}(),m=function(){function t(n,e){Object(o.a)(this,t),this.coordinate=n,this.pixel=e}return Object(f.a)(t,null,[{key:"create",value:function(n,e,r){return new t([n,e],r)}},{key:"dark",value:function(n,e){return new t([n,e],1)}}]),t}()}}]);