"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var defaultOptions={className:"",maxVisibleOptions:10},multiSelect=function(){function a(e,t){var n=this;_classCallCheck(this,a),this.options=Object.assign({},defaultOptions,t),this.element=document.createElement("div");var t=document.createElement("div"),i=document.createElement("div");e.classList.add("multi-select-element"),e.multiple=!0,this.element.classList.add("multi-select"),e.parentElement.insertBefore(this.element,e),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(i);function l(){n.overlay&&(n.element.classList.remove("multi-select-open"),n.element.appendChild(i),n.overlay.remove(),delete n.overlay,n._updateDisplay(),window.removeEventListener("scroll",o))}function s(e){n._isOptionsPanel(e.target)||(l(),window.removeEventListener("click",s))}var o=function(){return n._moveOptions()};t.classList.add("multi-select-display"),t.addEventListener("click",function(){var e,t=n.overlay;t?l():(e=n.element.getBoundingClientRect(),n.element.classList.add("multi-select-open"),(t=document.createElement("div")).classList.add("multi-select-options-overlay","overlay-".concat(Number(new Date))),t.appendChild(i),document.body.appendChild(t),n.overlay=t,i.style.width="".concat(e.width,"px"),n._setOptionsSize(),n._moveOptions(),window.addEventListener("scroll",o),setTimeout(function(){window.addEventListener("click",s)},1))}),this._updateDisplay(),i.classList.add("multi-select-options"),this.reload(),this.element.multiSelect=this}return _createClass(a,[{key:"setConfig",value:function(e){this.options=Object.assign({},defaultOptions,e),this.element.className="multi-select",this.options.className&&this.element.classList.add(this.options.className.split(" ")),this.overlay&&this._setOptionsSize()}},{key:"reload",value:function(){var l=this.element.querySelector(".multi-select-options"),e=this.element.querySelector(".multi-select-element");l.innerHTML="",e.querySelectorAll("option").forEach(function(e){var t=document.createElement("div"),n=document.createElement("input"),i=document.createElement("label");t.classList.add("option"),t.appendChild(i),n.type="checkbox",n.value=e.value,n.checked=e.selected,n._multiSelectOption=e,n.addEventListener("change",function(){e.selected=n.checked},!1),i.appendChild(n),i.appendChild(document.createTextNode(e.textContent)),l.appendChild(t)})}},{key:"_updateDisplay",value:function(){var e=this.element.querySelector(".multi-select-display"),t=this.element.querySelectorAll(".multi-select-element option"),n=[];t.forEach(function(e){e.selected&&n.push(e.textContent)}),e.textContent=n.join(", ")}},{key:"_setOptionsSize",value:function(){var e,t,n=this.overlay.querySelector(".multi-select-options");n.children.length&&(e=Math.min(this.options.maxVisibleOptions||n.children.length,n.children.length),t=n.children[0].getBoundingClientRect().height,n.style.maxHeight="".concat(Math.min(t*e,window.innerHeight),"px"))}},{key:"_isOptionsPanel",value:function(e){var t=e;do{if(t===this.overlay)return!0}while(t=t.parentElement);return!1}},{key:"_moveOptions",value:function(){var e=this.element.getBoundingClientRect(),t=this.overlay.querySelector(".multi-select-options"),n=t.getBoundingClientRect(),i=e.top+e.height,e=e.left+window.scrollX,i=(i+n.height<window.innerHeight?i:window.innerHeight-n.height)+window.scrollY;t.style.top="".concat(i,"px"),t.style.left="".concat(e,"px")}}]),a}();exports.default=multiSelect;