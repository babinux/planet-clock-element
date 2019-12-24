!function(t){var e={};function s(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const r=new WeakMap,n=t=>"function"==typeof t&&r.has(t),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},a={},c={},l=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${h}`),u="$lit$";class p{constructor(t,e){this.parts=[],this.element=e;const s=[],r=[],n=document.createTreeWalker(e.content,133,null,!1);let i=0,o=-1,a=0;const{strings:c,values:{length:h}}=t;for(;a<h;){const t=n.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let r=0;for(let t=0;t<s;t++)m(e[t].name,u)&&r++;for(;r-- >0;){const e=c[a],s=g.exec(e)[2],r=s.toLowerCase()+u,n=t.getAttribute(r);t.removeAttribute(r);const i=n.split(d);this.parts.push({type:"attribute",index:o,name:s,strings:i}),a+=i.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const r=t.parentNode,n=e.split(d),i=n.length-1;for(let e=0;e<i;e++){let s,i=n[e];if(""===i)s=y();else{const t=g.exec(i);null!==t&&m(t[2],u)&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-u.length)+t[3]),s=document.createTextNode(i)}r.insertBefore(s,t),this.parts.push({type:"node",index:++o})}""===n[i]?(r.insertBefore(y(),t),s.push(t)):t.data=n[i],a+=i}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&o!==i||(o++,e.insertBefore(y(),t)),i=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(s.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=r.pop()}for(const t of s)t.parentNode.removeChild(t)}}const m=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},f=t=>-1!==t.index,y=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class _{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,c=r.nextNode();for(;o<s.length;)if(n=s[o],f(n)){for(;a<n.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=e.pop(),c=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${l} `;class S{constructor(t,e,s,r){this.strings=t,this.values=e,this.type=s,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let r=0;r<t;r++){const t=this.strings[r],n=t.lastIndexOf("\x3c!--");s=(n>-1||s)&&-1===t.indexOf("--\x3e",n+1);const i=g.exec(t);e+=null===i?t+(s?v:h):t.substr(0,i.index)+i[1]+i[2]+u+i[3]+l}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const w=t=>null===t||!("object"==typeof t||"function"==typeof t),b=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let r=0;r<e;r++){s+=t[r];const e=this.parts[r];if(void 0!==e){const t=e.value;if(w(t)||!b(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||w(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(y()),this.endNode=t.appendChild(y())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=y()),t.__insert(this.endNode=y())}insertAfterPart(t){t.__insert(this.startNode=y()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}const t=this.__pendingValue;t!==a&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof S?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):b(t)?this.__commitIterable(t):t===c?(this.value=c,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const s=new _(e,t.processor,this.options),r=s._clone();s.update(t.values),this.__commitNode(r),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,r=0;for(const n of t)s=e[r],void 0===s&&(s=new C(this.options),e.push(s),0===r?s.appendIntoPart(this):s.insertAfterPart(e[r-1])),s.setValue(n),s.commit(),r++;r<e.length&&(e.length=r,this.clear(s&&s.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class T{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=a}}class N extends x{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends P{}let k=!1;try{const t={get capture(){return k=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class M{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(k?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new class{handleAttributeExpressions(t,e,s,r){const n=e[0];if("."===n){return new N(t,e.slice(1),s).parts}return"@"===n?[new M(t,e.slice(1),r.eventContext)]:"?"===n?[new T(t,e.slice(1),s)]:new x(t,e,s).parts}handleTextExpression(t){return new C(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function O(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const r=t.strings.join(l);return s=e.keyString.get(r),void 0===s&&(s=new p(t,t.getTemplateElement()),e.keyString.set(r,s)),e.stringsArray.set(t.strings,s),s}const V=new Map,j=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const I=(t,...e)=>new S(t,e,"html",E),U=133;function L(t,e){const{element:{content:s},parts:r}=t,n=document.createTreeWalker(s,U,null,!1);let i=D(r),o=r[i],a=-1,c=0;const l=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&c++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-c,i=D(r,i),o=r[i]}l.forEach(t=>t.parentNode.removeChild(t))}const q=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,U,null,!1);for(;s.nextNode();)e++;return e},D=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(f(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const F=(t,e)=>`${t}--${e}`;let $=!0;void 0===window.ShadyCSS?$=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),$=!1);const B=t=>e=>{const s=F(e.type,t);let r=V.get(s);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},V.set(s,r));let n=r.stringsArray.get(e.strings);if(void 0!==n)return n;const i=e.strings.join(l);if(n=r.keyString.get(i),void 0===n){const s=e.getTemplateElement();$&&window.ShadyCSS.prepareTemplateDom(s,t),n=new p(e,s),r.keyString.set(i,n)}return r.stringsArray.set(e.strings,n),n},z=["html","svg"],J=new Set,H=(t,e,s)=>{J.add(t);const r=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:i}=n;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(r,t);const o=document.createElement("style");for(let t=0;t<i;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach(e=>{const s=V.get(F(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),L(t,s)})})})(t);const a=r.content;s?function(t,e,s=null){const{element:{content:r},parts:n}=t;if(null==s)return void r.appendChild(e);const i=document.createTreeWalker(r,U,null,!1);let o=D(n),a=0,c=-1;for(;i.nextNode();){for(c++,i.currentNode===s&&(a=q(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===c;){if(a>0){for(;-1!==o;)n[o].index+=a,o=D(n,o);return}o=D(n,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),L(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const Y={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:W},X=Promise.resolve(!0),K=1,Q=4,Z=8,tt=16,et=32,st="finalized";class rt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=X,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const r=this._attributeNameForProperty(s,e);void 0!==r&&(this._attributeToPropertyMap.set(r,s),t.push(r))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const r=this[t];this[s]=e,this._requestUpdate(t,r)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(st)||t.finalize(),this[st]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=W){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,r=e.converter||Y,n="function"==typeof r?r:r.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,r=e.converter;return(r&&r.toAttribute||Y.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|et,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=G){const r=this.constructor,n=r._attributeNameForProperty(t,s);if(void 0!==n){const t=r._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Z,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~Z}}_attributeToProperty(t,e){if(this._updateState&Z)return;const s=this.constructor,r=s._attributeToPropertyMap.get(t);if(void 0!==r){const t=s._classProperties.get(r)||G;this._updateState=this._updateState|tt,this[r]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~tt}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const r=this.constructor,n=r._classProperties.get(t)||G;r._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&tt||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Q;const s=this._updatePromise;this._updatePromise=new Promise((s,r)=>{t=s,e=r});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&et}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&K}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&K||(this._updateState=this._updateState|K,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}rt[st]=!0;const nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol();class ot{constructor(t,e){if(e!==it)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const at=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let r=0,n=e.length;r<n;r++){const n=e[r];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class ct extends rt{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){at(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof S&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ct.finalized=!0,ct.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const r=s.scopeName,n=j.has(e),i=$&&11===e.nodeType&&!!e.host,a=i&&!J.has(r),c=a?document.createDocumentFragment():e;if(((t,e,s)=>{let r=j.get(e);void 0===r&&(o(e,e.firstChild),j.set(e,r=new C(Object.assign({templateFactory:O},s))),r.appendInto(e)),r.setValue(t),r.commit()})(t,c,Object.assign({templateFactory:B(r)},s)),a){const t=j.get(c);j.delete(c);const s=t.value instanceof _?t.value.template:void 0;H(r,c,s),o(e,e.firstChild),e.appendChild(c),j.set(e,t)}!n&&i&&window.ShadyCSS.styleElement(e.host)};var lt=((t,...e)=>{const s=e.reduce((e,s,r)=>e+(t=>{if(t instanceof ot)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[r+1],t[0]);return new ot(s,it)})`#myastro{--orbit-color:rgb(0, 0, 0);width:100%;height:100%;fill:none;stroke:var(--orbit-color,green);stroke-width:1;stroke-linecap:round;transform:rotate(-90deg)}:root{background:#dedede}line{stroke-width:.2}.planet{stroke-width:.4;stroke:var(--orbit-color,red);animation-play-state:paused!important;transform-origin:calc(calc(100/ 2) * 1px) calc(calc(100/ 2) * 1px)}.planet.play{animation-play-state:running!important}.orbit{stroke-width:.5;fill:transparent;stroke:var(--orbit-color,red);transform-origin:calc(calc(100/ 2) * 1px) calc(calc(100/ 2) * 1px)}#myastro .sun{transform:rotate(calc(0 * 1deg));animation:none;fill:#ff0;transform:none;stroke:var(--orbit-color,red);stroke-width:.4}@keyframes sunRotate{from{transform:rotate(calc(0 * 1deg))}to{transform:rotate(calc(0 * 1deg + 360deg))}}#myastro .mercury{transform:rotate(calc(var(--start-mercury) * 1deg));animation:none;fill:gray}#myastro .mercury.play{animation:mercuryRotate calc((360 / ((360 / 88) * 365)) * 60 * 1s) steps(365) infinite}@keyframes mercuryRotate{from{transform:rotate(calc(var(--start-mercury) * 1deg))}to{transform:rotate(calc(var(--start-mercury) * 1deg + 360deg))}}#myastro .venus{transform:rotate(calc(var(--start-venus) * 1deg));animation:none;fill:#ff73d7}#myastro .venus.play{animation:venusRotate calc((360 / ((360 / 225) * 365)) * 60 * 1s) steps(365) infinite}@keyframes venusRotate{from{transform:rotate(calc(var(--start-venus) * 1deg))}to{transform:rotate(calc(var(--start-venus) * 1deg + 360deg))}}#myastro .earth{transform:rotate(calc(var(--start-earth) * 1deg));animation:none;fill:#5eb1ff}#myastro .earth.play{animation:earthRotate calc((360 / ((360 / 365) * 365)) * 60 * 1s) steps(365) infinite}@keyframes earthRotate{from{transform:rotate(calc(var(--start-earth) * 1deg))}to{transform:rotate(calc(var(--start-earth) * 1deg + 360deg))}}#myastro .mars{transform:rotate(calc(var(--start-mars) * 1deg));animation:none;fill:#ff5527}#myastro .mars.play{animation:marsRotate calc((360 / ((360 / 687) * 365)) * 60 * 1s) steps(365) infinite}@keyframes marsRotate{from{transform:rotate(calc(var(--start-mars) * 1deg))}to{transform:rotate(calc(var(--start-mars) * 1deg + 360deg))}}#myastro .jupiter{transform:rotate(calc(var(--start-jupiter) * 1deg));animation:none;fill:#f8840b}#myastro .jupiter.play{animation:jupiterRotate calc((360 / ((360 / 4331) * 365)) * 60 * 1s) steps(365) infinite}@keyframes jupiterRotate{from{transform:rotate(calc(var(--start-jupiter) * 1deg))}to{transform:rotate(calc(var(--start-jupiter) * 1deg + 360deg))}}#myastro .saturn{transform:rotate(calc(var(--start-saturn) * 1deg));animation:none;fill:#f8ca14}#myastro .saturn.play{animation:saturnRotate calc((360 / ((360 / 10747) * 365)) * 60 * 1s) steps(365) infinite}@keyframes saturnRotate{from{transform:rotate(calc(var(--start-saturn) * 1deg))}to{transform:rotate(calc(var(--start-saturn) * 1deg + 360deg))}}#myastro .uranus{transform:rotate(calc(var(--start-uranus) * 1deg));animation:none;fill:#3adfff}#myastro .uranus.play{animation:uranusRotate calc((360 / ((360 / 30589) * 365)) * 60 * 1s) steps(365) infinite}@keyframes uranusRotate{from{transform:rotate(calc(var(--start-uranus) * 1deg))}to{transform:rotate(calc(var(--start-uranus) * 1deg + 360deg))}}#myastro .neptune{transform:rotate(calc(var(--start-neptune) * 1deg));animation:none;fill:#9755ff}#myastro .neptune.play{animation:neptuneRotate calc((360 / ((360 / 59800) * 365)) * 60 * 1s) steps(365) infinite}@keyframes neptuneRotate{from{transform:rotate(calc(var(--start-neptune) * 1deg))}to{transform:rotate(calc(var(--start-neptune) * 1deg + 360deg))}}`;class ht extends ct{static get styles(){return[lt]}static get properties(){return{posterDate:{type:String,reflect:!0},daysThisYear:{type:Number,reflect:!0},color:{type:String,reflect:!0}}}firstUpdated(t){console.log("firstUpdated(changedProperties):  "+t),this.componentContainer=this.shadowRoot.querySelector("#myastro"),console.log(this.shadowRoot),console.log(this.componentContainer),this.sun=this.shadowRoot.querySelector("#sun"),this.planets=this.shadowRoot.querySelectorAll(".planet"),this.orbits=this.shadowRoot.querySelectorAll(".orbit"),this.loaded=!0,this.checkBrowser(),this.updatePlanetMap()}constructor(){super(),this.loaded=!1,this.posterDate=new Date("Thu Aug 22 2019 20:36:10 GMT-0800 (Pacific Standard Time)");const t=new Date(2e3,0,1,12,0,0);this.refDate=new Date(t.getTime()-60*t.getTimezoneOffset()*1e3),this.constructClock()}attributeChangedCallback(t,e,s){console.log("attribute change: ",t,s),"date"===t&&this.loaded&&(s=new Date(s)),super.attributeChangedCallback(t,e,s),this.updatePlanetMap()}togglePlanetAnimation(t){console.log("Toggling planet animation"),this.planets.forEach(t=>{t.classList.toggle("play")})}updatePlanetMap(){this.computeReferenceAngles(),void 0!==this.componentContainer&&this.componentContainer.style.setProperty("--days-this-year",parseInt(this.daysThisYear())),this.setPlanetsOrbits()}daysThisYear(){return this.isLeapYear()?366:365}isLeapYear(){const t=this.posterDate.getYear();return t%400==0||t%100!=0&&t%4==0}render(){let t;return t=this.color?I`<style>#myastro { --orbit-color: ${this.color} !important; background-color: lightcyan; } </style>`:"blabla",I`
    ${t}
<!-- <style>
  #myastro { --orbit-color: ${this.color} !important; background-color: lightcyan; } 
  </style> -->

    <h3> ${this.color} </h3>
    
    <svg @click="${this.togglePlanetAnimation}" class="myastro-render frag" id="myastro" viewBox="0 0 100 100" baseProfile="full" width="100px" height="100px" xmlns="http://www.w3.org/2000/svg">

      <line x1="0" y1="50" x2="100" y2="50" class="" />
      <line x1="50" y1="0" x2="50" y2="100" class="" />

      <circle cx="0" cy="0" r="0.7" id="sun" class="sun" />

      <circle cx="0" cy="0" r="0.1" class="orbit mercury-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet mercury" />

      <circle cx="0" cy="0" r="0.1" class="orbit venus-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet venus" />

      <circle cx="0" cy="0" r="0.1" class="orbit earth-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet earth" />

      <circle cx="0" cy="0" r="0.1" class="orbit mars-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet mars" />

      <circle cx="0" cy="0" r="0.1" class="orbit asteroid-belt-orbit" stroke-dasharray="0.25 1.7" />
      <circle cx="0" cy="0" r="0" class="planet" />

      <circle cx="0" cy="0" r="0.1" class="orbit jupiter-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet jupiter" />

      <circle cx="0" cy="0" r="0.1" class="orbit saturn-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet saturn" />

      <circle cx="0" cy="0" r="0.1" class="orbit uranus-orbit" />
      <circle cx="0" cy="0" r="0.1" id="planet-uranus" class="planet uranus" />

      <circle cx="0" cy="0" r="0.1" class="orbit neptune-orbit" />
      <circle cx="0" cy="0" r="0.1" id="planet-neptune" class="planet neptune" />

    </svg>
    `}computeReferenceAngles(){for(var t=(this.posterDate.getTime()-this.refDate.getTime())/315576e7,e=(this.TimeSinceFirstJanOfThisYear.getTime()-this.refDate.getTime())/315576e7,s=0;s<this.RefAngle.length;s++)this.displayOffset?this.RefAngle[s]=this.JPL(t,s)+Math.PI-this.JPL(e,2):this.RefAngle[s]=this.JPL(t,s)+Math.PI}JPL(t,e){for(var s=this.a_0[e]+t*this.a_dot[e],r=this.e_0[e]+t*this.e_dot[e],n=this.I_0[e]+t*this.I_dot[e],i=this.L_0[e]+t*this.L_dot[e],o=this.wbar_0[e]+t*this.wbar_dot[e],a=this.omega_0[e]+t*this.omega_dot[e],c=o-a,l=i-o;l<180;)l+=360;for(;l>180;)l-=360;var h=Math.PI/180*l,d=this.kepler_iterate(h,r),u=s*(Math.cos(d)-r),p=s*Math.sqrt(1-r*r)*Math.sin(d),m=Math.PI/180*c,f=Math.PI/180*a,y=Math.PI/180*n,g=Math.cos(m)*Math.cos(f),_=Math.cos(m)*Math.sin(f),v=Math.sin(m)*Math.cos(f),S=Math.sin(m)*Math.sin(f),w=S*Math.cos(y),b=v*Math.cos(y),x=(g-w)*u+(-v-_*Math.cos(y))*p,P=(_+b)*u+(-S+g*Math.cos(y))*p,C=Math.atan2(P,x);return C*=-1}kepler_iterate(t,e){for(var s,r,n=t,i=0;i++<100;){if(s=(r=t+e*Math.sin(n))-n,Math.abs(s)<1e-4)return r;n=r}return alert("kepler_iterate: No convergence"),0}setPlanetsOrbits(){let t=[];for(let e=0;e<8;e++)t[e]=-1*this.RefAngle[e]*180/Math.PI+180;void 0!==this.componentContainer&&(this.componentContainer.style.setProperty("--start-mercury",t[0]),this.componentContainer.style.setProperty("--start-venus",t[1]),this.componentContainer.style.setProperty("--start-earth",t[2]),this.componentContainer.style.setProperty("--start-mars",t[3]),this.componentContainer.style.setProperty("--start-jupiter",t[4]),this.componentContainer.style.setProperty("--start-saturn",t[5]),this.componentContainer.style.setProperty("--start-uranus",t[6]),this.componentContainer.style.setProperty("--start-neptune",t[7]))}setLayout(){const t=[.8,1.6,2,1.4,0,3,2.5,1.8,1.6],e=[1.04,1.111,1.2,1.29,1.35,1.44,1.57,1.68,1.78],s=this.planets,r=this.orbits,n=this.sun;n.setAttribute("r",1),n.setAttribute("cx",50),n.setAttribute("cy",50);for(let n=0;n<9;n++){let i=1.03*e[n]*50-50;r[n].setAttribute("r",i),r[n].setAttribute("cx",50),r[n].setAttribute("cy",50),s[n].setAttribute("r",t[n]),s[n].setAttribute("cx",50+i),s[n].setAttribute("cy",50)}}checkBrowser(){var t=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,e="undefined"!=typeof InstallTrigger;console.log("Browser is FIREFOX switching to 'Layout JS' function "),this.setLayout();var s=/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString(),r=!!document.documentMode,n=!r&&!!window.StyleMedia,i=!(!window.chrome||!window.chrome.webstore&&!window.chrome.runtime);(i||t)&&window.CSS}constructClock(){this.RefAngle=[0,0,0,0,0,0,0,0],this.displayOffset=!0;let t=new Date(this.posterDate.getFullYear(),0,1,12,0,0);this.TimeSinceFirstJanOfThisYear=new Date(t.getTime()-60*t.getTimezoneOffset()*1e3);Math.PI,parseInt(this.daysThisYear());this.a_0=[.38709927,.72333566,1.00000261,1.52371034,5.202887,9.53667594,19.18916464,30.06992276],this.a_dot=[37e-8,39e-7,562e-8,1847e-8,-11607e-8,-.0012506,-.00196176,26291e-8],this.e_0=[.20563593,.00677672,.01671123,.0933941,.04838624,.05386179,.04725744,.00859048],this.e_dot=[1906e-8,-4107e-8,-4392e-8,7882e-8,-13253e-8,-50991e-8,-4397e-8,5105e-8],this.I_0=[7.00497902,3.39467605,-1531e-8,1.84969142,1.30439695,2.48599187,.77263783,1.77004347],this.I_dot=[-.00594749,-7889e-7,-.01294668,-.00813131,-.00183714,.00193609,-.00242939,35372e-8],this.L_0=[252.2503235,181.9790995,100.46457166,-4.55343205,34.39644051,49.95424423,313.23810451,-55.12002969],this.L_dot=[149472.67411175,58517.81538729,35999.37244981,19140.30268499,3034.74612775,1222.49362201,428.48202785,218.45945325],this.wbar_0=[77.45779628,131.60246718,102.93768193,-23.94362959,14.72847983,92.59887831,170.9542763,44.96476227],this.wbar_dot=[.16047689,.00268329,.32327364,.44441088,.21252668,-.41897216,.40805281,-.32241464],this.omega_0=[48.33076593,76.67984255,0,49.55953891,100.47390909,113.66242448,74.01692503,131.78422574],this.omega_dot=[-.12534081,-.27769418,0,-.29257343,.20469106,-.28867794,.04240589,-.00508664];this.daysThisYear()}}window.customElements.define("planet-clock-element",ht),s.d(e,"PlanetClockElement",(function(){return ht}))}]);