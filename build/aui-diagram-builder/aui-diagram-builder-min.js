YUI.add("aui-diagram-builder",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isObject,s=n.isString,o=e.Array,u=e.getClassName,a=u("property","builder","field"),f=u("diagram","node"),l=u("diagram","node","content"),c=u("diagram","node","editing"),h=u("diagram","node","suggest","connector"),p=function(t){return e.instanceOf(t,e.Connector)},d=function(t){return e.instanceOf(t,e.DiagramNode)},v=e.Component.create({NAME:"diagram-builder",ATTRS:{connector:{setter:"_setConnector",value:null},fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:i},graphic:{valueFn:function(){return new e.Graphic},validator:i},highlightDropZones:{validator:r,value:!0},strings:{value:{addNode:"Add node",cancel:"Cancel",close:"Close",deleteConnectorsMessage:"Are you sure you want to delete the selected connector(s)?",deleteNodesMessage:"Are you sure you want to delete the selected node(s)?",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},showSuggestConnector:{validator:r,value:!0},suggestConnectorOverlay:{value:null,setter:"_setSuggestConnectorOverlay"},useARIA:{validator:r,value:!0,writeOnce:"initOnly"}},AUGMENTS:[e.PropertyBuilderSettings],EXTENDS:e.PropertyBuilder,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{editingConnector:null,editingNode:null,publishedSource:null,publishedTarget:null,selectedConnector:null,selectedNode:null,initializer:function(){var t=this,n=t.get("canvas");t.on({cancel:t._onCancel,"drag:drag":t._onDrag,"drag:end":t._onDragEnd,"drop:hit":t._onDropHit,save:t._onSave}),e.DiagramNodeManager.on({publishedSource:function(e){t.publishedTarget=null,t.publishedSource=e.publishedSource}}),n.on("mousedown",e.bind(t._onCanvasMouseDown,t)),n.on("mouseenter",e.bind(t._onCanvasMouseEnter,t)),t.handlerKeyDown=e.getDoc().on("keydown",e.bind(t._afterKeyEvent,t)),t.dropContainer.delegate("click",e.bind(t._onNodeClick,t),"."+f),t.dropContainer.delegate("mousedown",e.bind(t._onCloseButtonMouseDown,t),".diagram-builder-controls button"),t.dropContainer.delegate("mouseenter",e.bind(t._onNodeMouseEnter,t),"."+f),t.dropContainer.delegate("mouseleave",e.bind(t._onNodeMouseLeave,t),"."+f)},renderUI:function(){var t=this;e.DiagramBuilder.superclass.renderUI.apply(this,arguments),t._setupFieldsDrag(),t._renderGraphic()},syncUI:function(){var t=this;e.DiagramBuilder.superclass.syncUI.apply(this,arguments),t.syncConnectionsUI(),t.connector=t.get("connector"),t.get("useARIA")&&t.plug(e.Plugin.Aria)},syncConnectionsUI:function(){var e=this;e.get("fields").each(function(e){e.syncConnectionsUI()})},clearFields:function(){var e=this,t=[];e.get("fields").each(function(e){t.push(e)}),o.each(t,function(e){e.destroy()}),t=e.editingConnector=e.editingNode=e.selectedNode=null},closeEditProperties:function(){var t=this,n=t.editingNode,r=t.tabView;r.selectChild(e.DiagramBuilder.FIELDS_TAB),r.disableTab(e.DiagramBuilder.SETTINGS_TAB),n&&n.get("boundingBox").removeClass(c),t.editingConnector=t.editingNode=null},connect:function(t,n,r){var i=this;return s(t)&&(t=e.DiagramNode.getNodeByName(t)),s(n)&&(n=e.DiagramNode.getNodeByName(n)),t&&n&&t.connect(n.get("name"),r),i},connectAll:function(e){var t=this;return o.each(e,function(e){e.hasOwnProperty("source")&&e.hasOwnProperty("target")&&t.connect(e.source,e.target,e.connector)}),t},createField:function(e){var t=this;return d(e)||(e.builder=t,e.bubbleTargets=t,e=new(t.getFieldClass(e.type||"node"))(e)),e},deleteSelectedConnectors:function(){var t=this,n=t.getStrings(),r=t.getSelectedConnectors();r.length&&window.confirm(n.deleteConnectorsMessage)&&(o.each(r,function(t){var n=t.get("transition");e.DiagramNode.getNodeByName(n.source).disconnect(n)}),t.stopEditing())},deleteSelectedNode:function(){var e=this,t=e.getStrings(),n=e.selectedNode;n&&!n.get("required")&&window.confirm(t.deleteNodesMessage)&&(n.close(),e.editingNode=e.selectedNode=null,e.stopEditing())},destructor:function(){var e=this;e.get("suggestConnectorOverlay").destroy()},eachConnector:function(e){var t=this;t.get("fields").each(function(n){var r=n.get("transitions");o.each(r.values(),function(r){e.call(t,n.getConnector(r),r,n)})})},editConnector:function(t){var n=this;if(t){var r=n.tabView;n.closeEditProperties(),r.enableTab(e.DiagramBuilder.SETTINGS_TAB),r.selectChild(e.DiagramBuilder.SETTINGS_TAB),n.propertyList.set("data",t.getProperties()),n.editingConnector=n.selectedConnector=t}},editNode:function(t){var n=this;if(t){var r=n.tabView;n.closeEditProperties(),r.enableTab(e.DiagramBuilder.SETTINGS_TAB),r.selectChild(e.DiagramBuilder.SETTINGS_TAB),n.propertyList.set("data",t.getProperties()),t.get("boundingBox").addClass(c),n.editingNode=n.selectedNode=t}},getFieldClass:function(t){var n=e.DiagramBuilder.types[t];return n?n:(e.log("The field type: ["+t+"] couldn't be found."),null)},getNodesByTransitionProperty:function(e,t){var n=this,r=[],i;return n.get("fields").each(function(n){i=n.get("transitions"),o.each(i.values(),function(i){if(i[e]===t)return r.push(n),!1})}),r},getSelectedConnectors:function(){var e=this,t=[];return e.eachConnector(function(e){e.get("selected")&&t.push(e)}),t},getSourceNodes:function(e){var t=this;return t.getNodesByTransitionProperty("target",e.get("name"))},hideSuggestConnectorOverlay:function(){var e=this;e.connector.hide(),e.get("suggestConnectorOverlay").hide();try{e.fieldsDrag.dd.set("lock",!1)}catch(t){}},isAbleToConnect:function(){var e=this;return!!e.publishedSource&&!!e.publishedTarget},isFieldsDrag:function(e){var t=this;return e===t.fieldsDrag.dd},plotField:function(e){var t=this;e.get("rendered")||e.render(t.dropContainer)},select:function(e){var t=this;t.unselectNodes(),t.selectedNode=e.set("selected",!0).focus()},showSuggestConnectorOverlay:function(e){var t=this,n=t.get("suggestConnectorOverlay");n.get("boundingBox").addClass(h),n.set("xy",e||t.connector.get("p2")).show();try{t.fieldsDrag.dd.set("lock",!0)}catch(r){}},stopEditing:function(){var e=this;e.unselectConnectors(),e.unselectNodes(),e.closeEditProperties()},toJSON:function(){var e=this
,t={nodes:[]};return e.get("fields").each(function(e){var n={transitions:[]},r=e.get("transitions");o.each(e.SERIALIZABLE_ATTRS,function(t){n[t]=e.get(t)}),o.each(r.values(),function(t){var r=e.getConnector(t);t.connector=r.toJSON(),n.transitions.push(t)}),t.nodes.push(n)}),t},unselectConnectors:function(){var e=this;o.each(e.getSelectedConnectors(),function(e){e.set("selected",!1)})},unselectNodes:function(){var e=this,t=e.selectedNode;t&&t.set("selected",!1),e.selectedNode=null},_afterKeyEvent:function(t){var n=this;if(t.hasModifier()||e.getDoc().get("activeElement").test(":input,td"))return;t.isKey("esc")?n._onEscKey(t):(t.isKey("backspace")||t.isKey("delete"))&&n._onDeleteKey(t)},_deleteSelectedNode:function(e){var t=this;t.deleteSelectedConnectors(),t.deleteSelectedNode(),e.halt()},_onCancel:function(){var e=this;e.closeEditProperties()},_onCanvasMouseEnter:function(){var e=this;e.syncUI()},_onCloseButtonMouseDown:function(t){var n=this,r=t.currentTarget.ancestor(".diagram-node");d(e.Widget.getByNode(r))&&n._deleteSelectedNode(t)},_onDeleteKey:function(t){var n=this,r=n.getSelectedConnectors();d(e.Widget.getByNode(t.target))?n._deleteSelectedNode(t):r.length>0&&(n.deleteSelectedConnectors(),t.halt())},_onDrag:function(t){var n=this,r=t.target;if(n.isFieldsDrag(r)){var i=e.Widget.getByNode(r.get("dragNode"));i&&(i.alignTransitions(),o.each(n.getSourceNodes(i),function(e){e.alignTransitions()}),n.get("useARIA")&&n.aria.setAttributes([{name:"grabbed",node:i.get("boundingBox"),value:"true"},{name:"dropeffect",node:n.get("canvas"),value:"move"}]))}},_onDragEnd:function(t){var n=this,r=t.target,i=e.Widget.getByNode(r.get("dragNode"));i&&n.isFieldsDrag(r)&&(i.set("xy",i.getNodeCoordinates()),n.get("useARIA")&&n.aria.setAttributes([{name:"grabbed",node:i.get("boundingBox"),value:"false"},{name:"dropeffect",node:n.get("canvas"),value:"none"}]))},_onDropHit:function(t){var n=this,r=t.drag;if(n.isAvailableFieldsDrag(r)){var i=r.get("node").getData("availableField"),s=n.addField({xy:e.DiagramNode.getNodeCoordinates(r.lastXY,n.dropContainer),type:i.get("type")});n.select(s)}},_onEscKey:function(e){var t=this;t.hideSuggestConnectorOverlay(),t.stopEditing(),e.halt()},_onCanvasMouseDown:function(){var e=this;e.stopEditing(),e.hideSuggestConnectorOverlay()},_onNodeClick:function(t){var n=this,r=e.Widget.getByNode(t.currentTarget);n.select(r),n._onNodeEdit(t),t.stopPropagation()},_onNodeEdit:function(t){var n=this;if(!t.target.ancestor("."+l,!0))return;var r=e.Widget.getByNode(t.currentTarget);r&&n.editNode(r)},_onNodeMouseEnter:function(t){var n=e.Widget.getByNode(t.currentTarget);n.set("highlighted",!0)},_onNodeMouseLeave:function(t){var n=this,r=n.publishedSource,i=e.Widget.getByNode(t.currentTarget);(!r||!r.boundaryDragDelegate.dd.get("dragging"))&&i.set("highlighted",!1)},_onSave:function(){var e=this,t=e.editingNode,n=e.editingConnector,r=e.propertyList.get("data");t?r.each(function(e){t.set(e.get("attributeName"),e.get("value"))}):n&&r.each(function(e){n.set(e.get("attributeName"),e.get("value"))})},_onSuggestConnectorNodeClick:function(e){var t=this,n=e.currentTarget.getData("availableField"),r=t.connector,i=t.addField({type:n.get("type"),xy:r.toCoordinate(r.get("p2"))});t.hideSuggestConnectorOverlay(),t.publishedSource.connectNode(i)},_renderGraphic:function(){var e=this;e.get("graphic").render(e.dropContainer)},_setConnector:function(t){var n=this;if(!p(t)){var r=n.get("canvas").getXY();t=new e.Connector(e.merge({builder:n,graphic:n.get("graphic"),lazyDraw:!0,p1:r,p2:r,shapeHover:null,showName:!1},t))}return t},_setFieldsDragConfig:function(t){var n=this,r=n.dropContainer;return e.merge({bubbleTargets:n,container:r,dragConfig:{plugins:[{cfg:{constrain:r},fn:e.Plugin.DDConstrained},{cfg:{scrollDelay:150,node:r},fn:e.Plugin.DDNodeScroll}]},nodes:"."+f},t||{})},_setSuggestConnectorOverlay:function(t){var n=this;if(!t){var r=e.getDoc().invoke("createDocumentFragment"),i,s;o.each(n.get("availableFields"),function(e){var t=e.get("node");r.appendChild(t.clone().setData("availableField",t.getData("availableField")))}),t=new e.Overlay({bodyContent:r,render:!0,visible:!1,width:280,zIndex:1e4}),i=t.get("boundingBox"),s=t.get("contentBox"),s.addClass("popover-content"),i.addClass("popover"),i.delegate("click",e.bind(n._onSuggestConnectorNodeClick,n),"."+a)}return t},_setupFieldsDrag:function(){var t=this,n=t.get("fields"),r=t.get("fieldsDragConfig"),i=t.get("useARIA");t.fieldsDrag=new e.DD.Delegate(r),i&&n.each(function(e){var t=e.get("boundingBox");t.attr("draggable",!0)})}}});e.DiagramBuilder=v,e.namespace("DiagramBuilder.types").node=e.DiagramNode,e.namespace("DiagramBuilder.types").state=e.DiagramNodeState,e.namespace("DiagramBuilder.types").condition=e.DiagramNodeCondition,e.namespace("DiagramBuilder.types").start=e.DiagramNodeStart,e.namespace("DiagramBuilder.types").end=e.DiagramNodeEnd,e.namespace("DiagramBuilder.types").join=e.DiagramNodeJoin,e.namespace("DiagramBuilder.types").fork=e.DiagramNodeFork,e.namespace("DiagramBuilder.types").task=e.DiagramNodeTask},"3.1.0-deprecated.76",{requires:["aui-aria","aui-map","aui-property-builder","aui-diagram-builder-connector","aui-property-builder-settings","aui-diagram-node-condition","aui-diagram-node-end","aui-diagram-node-fork","aui-diagram-node-join","aui-diagram-node-start","aui-diagram-node-state","aui-diagram-node-task","overlay"],skinnable:!0});
