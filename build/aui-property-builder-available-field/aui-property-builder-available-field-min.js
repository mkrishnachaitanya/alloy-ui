YUI.add("aui-property-builder-available-field",function(e,t){var n,r=e.getClassName("property","builder","field"),i=e.getClassName("property","builder","field","draggable"),s=e.getClassName("property","builder","field","icon"),o=e.getClassName("property","builder","field","label"),u=e.getClassName("icon");n=e.Component.create({NAME:"availableField",ATTRS:{draggable:{value:!0,validator:e.Lang.isBoolean},label:{validator:e.Lang.isString},iconClass:{validator:e.Lang.isString},id:{value:e.guid(),setter:"_setId",validator:e.Lang.isString},node:{valueFn:function(t){var n=this;return e.Lang.isNode(t)||(t=e.Node.create(e.Lang.sub(n.FIELD_ITEM_TEMPLATE,{iconClass:n.get("iconClass")})),t.setData("availableField",n)),t},validator:e.Lang.isNode,writeOnce:!0},type:{value:"node",validator:e.Lang.isString}},EXTENDS:e.Base,buildNodeId:function(e){return"availableFields_field_"+e},getAvailableFieldById:function(t){return e.PropertyBuilderAvailableField.getAvailableFieldByNode("#"+e.PropertyBuilderAvailableField.buildNodeId(t))},getAvailableFieldByNode:function(t){return t=e.one(t),e.Lang.isNode(t)?t.getData("availableField"):null},prototype:{FIELD_ITEM_TEMPLATE:'<li class="'+r+'">'+'<span class="'+[u,s].join(" ")+' {iconClass}"></span>'+'<div class="'+o+'"></div>'+"</li>",initializer:function(){var e=this,t=e.get("node");e.after({draggableChange:e._afterDraggableChange,idChange:e._afterIdChange,labelChange:e._afterLabelChange}),e.labelNode=t.one("."+o),e._uiSetDraggable(e.get("draggable")),e._uiSetId(e.get("id")),e._uiSetLabel(e.get("label"))},_afterDraggableChange:function(e){var t=this;t._uiSetDraggable(e.newVal)},_afterIdChange:function(e){var t=this;t._uiSetId(e.newVal)},_afterLabelChange:function(e){var t=this;t._uiSetLabel(e.newVal)},_setId:function(t){return e.PropertyBuilderAvailableField.buildNodeId(t)},_uiSetDraggable:function(e){var t=this;t.get("node").toggleClass(i,e)},_uiSetId:function(e){var t=this;t.get("node").set("id",e)},_uiSetLabel:function(t){var n=this;n.get("node").attr("title",t),n.labelNode.setContent(e.Escape.html(t))}}}),e.PropertyBuilderAvailableField=n},"3.1.0-deprecated.75",{requires:["base","aui-component","aui-node"]});
