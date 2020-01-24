YUI.add("aui-datatable-selection",function(e,t){var n=e.Lang,r=n.isArray,i=n.isString,s=n.isObject,o=function(e,t,n){return Math.min(Math.max(e,t),n)},u=function(){};u.ATTRS={activeCell:{getter:"_getActiveCell"},activeCoord:{value:[-1,-1]},activeRow:{getter:"_getActiveRow"},selection:{setter:"_setSelection"},tabIndex:{value:0}},e.mix(u.prototype,{_capturing:!1,_selectionEnd:null,_selectionSeed:null,_selectionStart:null,initializer:function(){var e=this,t=e.get("boundingBox");e.CLASS_NAMES_SELECTION={cell:e.getClassName("cell"),selection:e.getClassName("selection")},e._bindSelectionUI(),t.addClass(e.CLASS_NAMES_SELECTION.selection)},destroy:function(){var e=this;e._selectionKeyHandler.detach()},captureSelection:function(t){var n=this,r=[],i=[],s=[],o=[],u;for(u=0;u<t.length;u++){var a=t[u],f=n.getCell(a);o.push(a[0]),r.push(f),i.push(n.getColumn(f))}o=e.Array.unique(o),i=e.Array.unique(i);for(u=0;u<o.length;u++)o[u]=n.getRow(o[u]),s[u]=n.getRecord(o[u]);return{cells:r,cols:i,coords:t,records:s,rows:o}},getActiveColumn:function(){var e=this;return e.getColumn(e.get("activeCell"))},getActiveRecord:function(){var e=this;return e.getRecord(e.get("activeRow"))},getCoord:function(e){var t=this,n=t.getCell(e),r=t.body.tbodyNode,i=r.get("firstChild.rowIndex");return[n.get("parentNode.rowIndex")-i,n.get("cellIndex")]},_afterActiveCoordChange:function(e){var t=this,n=t.getCell(e.newVal);n&&n.setAttribute("tabindex",0).focus()},_bindSelectionUI:function(){var t=this,n=t.CLASS_NAMES_SELECTION;t._selectionKeyHandler=e.getDoc().on("key",e.bind(t._onSelectionKey,t),"down:enter,37,38,39,40"),t.after("activeCoordChange",t._afterActiveCoordChange),t.delegate("mouseup",e.bind(t._onSelectionMouseUp,t),"."+n.cell),t.delegate("mousedown",e.bind(t._onSelectionMouseDown,t),"."+n.cell),t.delegate("mouseenter",e.bind(t._onSelectionMouseEnter,t),"."+n.cell)},_getActiveCell:function(){var e=this,t=e.get("activeCoord"),n=t[0],r=t[1];return n>-1&&r>-1?e.getCell([n,r]):null},_getActiveRow:function(){var e=this,t=e.get("activeCoord"),n=t[0];return n>-1?e.getRow(n):null},_onSelectionMouseDown:function(e){var t=this,n=e.currentTarget,r=t.get("boundingBox"),i=t.getCoord(n);r.unselectable(),t._capturing=!0,t._selectionSeed=n,t._selectionStart=t._selectionEnd=t.getCoord(n),t.set("activeCoord",i)},_onSelectionMouseEnter:function(e){var t=this,n=e.currentTarget;if(!t._capturing)return;t._selectionSeed=n,t._selectionEnd=t.getCoord(n),t.set("selection",{start:t._selectionStart,end:t._selectionEnd})},_onSelectionMouseUp:function(){var e=this,t=e.get("boundingBox");e.get("focused")&&(e._selectionEnd=e.getCoord(e._selectionSeed),e.set("selection",{start:e._selectionStart,end:e._selectionEnd})),t.selectable(),e._capturing=!1},_onSelectionKey:function(e){var t=this,n=t.body,r=n.tbodyNode,i=e.keyCode,s=t.get("activeCell"),u,a=r.get("children").size(),f=n.get("columns").length,l,c;s&&t.get("focused")&&(u=t.getCoord(s),l=u[0],c=u[1],i===37?c--:i===38?l--:i===39?c++:i===40&&l++,l=o(l,0,a-1),c=o(c,0,f-1),t.set("activeCoord",[l,c]),t.set("selection",[l,c]),e.preventDefault())},_parseRange:function(e){var t=e[0],n=e[1],r=[],i,s;for(i=Math.min(t[0],n[0]);i<=Math.max(t[0],n[0]);i++)for(s=Math.min(t[1],n[1]);s<=Math.max(t[1],n[1]);s++)r.push([i,s]);return r},_setSelection:function(t){var n=this;return r(t)?r(t[0])||(t=[t]):s(t)?t=n._parseRange([t.start,t.end]):e.instanceOf(t,e.Node)&&(t=[n.getCoord(t)]),n.captureSelection(t)}}),e.DataTable.Selection=u,e.Base.mix(e.DataTable,[u]),e.DataTable.prototype.getColumn=function(t){return function(n){var r;return e.instanceOf(n,e.Node)&&(r=this.getCell(n),n=r&&(r.get("className").match(new RegExp(this.getClassName("col","(\\w+)")))||[])[1]),t.call(this,n)}}(e.DataTable.prototype.getColumn),e.DataTable.prototype.getRow=function(t){return function(n){var r=this,i=r.body.tbodyNode,s;return e.instanceOf(n,e.Node)?(s=n.ancestor(function(e){return e.get("parentNode").compareTo(i)},!0),s):t.call(this,n)}}(e.DataTable.prototype.getRow),e.DataTable.prototype._setColumns=function(t){function f(e){var t={},n,i,l;r.push(e),o.push(t);for(n in e)e.hasOwnProperty(n)&&(i=e[n],a(i)?t[n]=i.slice():s(i,!0)&&i.constructor===t.constructor?(l=u(i,r),t[n]=l===-1?f(i):o[l]):t[n]=e[n]);return t}function l(e){return e=e.replace(/\s+/,"-"),n[e]?e+=n[e]++:n[e]=1,e}function c(t,n){var r=[],s,o,u,h;for(s=0,o=t.length;s<o;++s)r[s]=u=i(t[s])?{key:t[s]}:f(t[s]),h=e.stamp(u),u.id||(u.id=h),u.field&&(u.name=u.field),n?u._parent=n:delete u._parent,u._id=l(u.name||u.key||u.id),a(u.children)&&(u.children=c(u.children,u));return r}var n={},r=[],o=[],u=e.Array.indexOf,a=e.Lang.isArray;return t&&c(t)}},"3.1.0-deprecated.74",{requires:["aui-datatable-core"],skinnable:!0});
