!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){$docsify.plugins=[].concat($docsify.plugins,(function(e,t){let r=n(1).render,o={};var i;function a(e){"string"==typeof e?s(e):"object"==typeof e&&(Array.isArray(e)?e.forEach(a):c(t.mustache,e))}function s(e,n){function r(){delete o[e],0==Object.keys(o).length&&i&&(i(),i=void 0)}o[e]=!0,Docsify.get(e,!0).then(e=>{let o=function(e){if(!e.startsWith("<"))return JSON.parse(e);return function e(t,n){let r={};for(var o=n.firstChild;null!==o;o=o.nextSibling)o.nodeType==Node.ELEMENT_NODE&&e(r,o);return t[n.tagName]=0!=Object.keys(r).length?r:n.textContent,t}({},(new DOMParser).parseFromString(e,"text/xml").documentElement)}(e);n?t.mustache[n]=o:c(t.mustache,o),r()},e=>{console.log(e),r()})}function c(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];if(null!=n)for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}e.init((function(){t.mustache=t.mustache||{};var e=window.$docsify.mustache||{};e.noPackage||s("package.json","package"),e.data&&a(e.data)})),e.beforeEach((function(e,n){var a=function(){var o={};c(o,t.mustache),t.frontmatter&&c(o,t.frontmatter),n(r(e,o))};0==Object.keys(o).length?a():i=a}))}))},function(e,t,n){e.exports=function(){"use strict";
/*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */var e=Object.prototype.toString,t=Array.isArray||function(t){return"[object Array]"===e.call(t)};function n(e){return"function"==typeof e}function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return null!=e&&"object"==typeof e&&t in e}var i=RegExp.prototype.test,a=/\S/;function s(e){return!function(e,t){return i.call(e,t)}(a,e)}var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},u=/\s*/,l=/\s+/,p=/\s*=/,f=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function d(e){this.string=e,this.tail=e,this.pos=0}function g(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function v(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}d.prototype.eos=function(){return""===this.tail},d.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},d.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},g.prototype.push=function(e){return new g(e,this)},g.prototype.lookup=function(e){var t,r,i,a=this.cache;if(a.hasOwnProperty(e))t=a[e];else{for(var s,c,u,l=this,p=!1;l;){if(e.indexOf(".")>0)for(s=l.view,c=e.split("."),u=0;null!=s&&u<c.length;)u===c.length-1&&(p=o(s,c[u])||(r=s,i=c[u],null!=r&&"object"!=typeof r&&r.hasOwnProperty&&r.hasOwnProperty(i))),s=s[c[u++]];else s=l.view[e],p=o(l.view,e);if(p){t=s;break}l=l.parent}a[e]=t}return n(t)&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},v.prototype.parse=function(e,n){var o=this.templateCache,i=e+":"+(n||y.tags).join(":"),a=void 0!==o,c=a?o.get(i):void 0;return null==c&&(c=function(e,n){if(!e)return[];var o,i,a,c=!1,g=[],v=[],w=[],m=!1,b=!1,x="",k=0;function j(){if(m&&!b)for(;w.length;)delete v[w.pop()];else w=[];m=!1,b=!1}function O(e){if("string"==typeof e&&(e=e.split(l,2)),!t(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(r(e[0])+"\\s*"),i=new RegExp("\\s*"+r(e[1])),a=new RegExp("\\s*"+r("}"+e[1]))}O(n||y.tags);for(var E,C,P,S,T,U,_=new d(e);!_.eos();){if(E=_.pos,P=_.scanUntil(o))for(var A=0,M=P.length;A<M;++A)s(S=P.charAt(A))?(w.push(v.length),x+=S):(b=!0,c=!0,x+=" "),v.push(["text",S,E,E+1]),E+=1,"\n"===S&&(j(),x="",k=0,c=!1);if(!_.scan(o))break;if(m=!0,C=_.scan(h)||"name",_.scan(u),"="===C?(P=_.scanUntil(p),_.scan(p),_.scanUntil(i)):"{"===C?(P=_.scanUntil(a),_.scan(f),_.scanUntil(i),C="&"):P=_.scanUntil(i),!_.scan(i))throw new Error("Unclosed tag at "+_.pos);if(T=">"==C?[C,P,E,_.pos,x,k,c]:[C,P,E,_.pos],k++,v.push(T),"#"===C||"^"===C)g.push(T);else if("/"===C){if(!(U=g.pop()))throw new Error('Unopened section "'+P+'" at '+E);if(U[1]!==P)throw new Error('Unclosed section "'+U[1]+'" at '+E)}else"name"===C||"{"===C||"&"===C?b=!0:"="===C&&O(P)}if(j(),U=g.pop())throw new Error('Unclosed section "'+U[1]+'" at '+_.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,a=e.length;i<a;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(v))}(e,n),a&&o.set(i,c)),c},v.prototype.render=function(e,t,n,r){var o=this.parse(e,r),i=t instanceof g?t:new g(t,void 0);return this.renderTokens(o,i,n,e,r)},v.prototype.renderTokens=function(e,t,n,r,o){for(var i,a,s,c="",u=0,l=e.length;u<l;++u)s=void 0,"#"===(a=(i=e[u])[0])?s=this.renderSection(i,t,n,r):"^"===a?s=this.renderInverted(i,t,n,r):">"===a?s=this.renderPartial(i,t,n,o):"&"===a?s=this.unescapedValue(i,t):"name"===a?s=this.escapedValue(i,t):"text"===a&&(s=this.rawValue(i)),void 0!==s&&(c+=s);return c},v.prototype.renderSection=function(e,r,o,i){var a=this,s="",c=r.lookup(e[1]);if(c){if(t(c))for(var u=0,l=c.length;u<l;++u)s+=this.renderTokens(e[4],r.push(c[u]),o,i);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)s+=this.renderTokens(e[4],r.push(c),o,i);else if(n(c)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(r.view,i.slice(e[3],e[5]),(function(e){return a.render(e,r,o)})))&&(s+=c)}else s+=this.renderTokens(e[4],r,o,i);return s}},v.prototype.renderInverted=function(e,n,r,o){var i=n.lookup(e[1]);if(!i||t(i)&&0===i.length)return this.renderTokens(e[4],n,r,o)},v.prototype.indentPartial=function(e,t,n){for(var r=t.replace(/[^ \t]/g,""),o=e.split("\n"),i=0;i<o.length;i++)o[i].length&&(i>0||!n)&&(o[i]=r+o[i]);return o.join("\n")},v.prototype.renderPartial=function(e,t,r,o){if(r){var i=n(r)?r(e[1]):r[e[1]];if(null!=i){var a=e[6],s=e[5],c=e[4],u=i;return 0==s&&c&&(u=this.indentPartial(i,c,a)),this.renderTokens(this.parse(u,o),t,r,u)}}},v.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},v.prototype.escapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return y.escape(n)},v.prototype.rawValue=function(e){return e[1]};var y={name:"mustache.js",version:"4.0.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){w.templateCache=e},get templateCache(){return w.templateCache}},w=new v;return y.clearCache=function(){return w.clearCache()},y.parse=function(e,t){return w.parse(e,t)},y.render=function(e,n,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(t(i=e)?"array":typeof i)+'" was given as the first argument for mustache#render(template, view, partials)');var i;return w.render(e,n,r,o)},y.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return c[e]}))},y.Scanner=d,y.Context=g,y.Writer=v,y}()}]);