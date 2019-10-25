YUI.add("aui-image-viewer-multiple",function(e,t){e.ImageViewerMultiple=e.Base.create("image-viewer-multiple",e.ImageViewerBase,[],{VISIBLE_THRESHOLD:5,initializer:function(){this._eventHandles.push(this.after({currentIndexChange:this._afterMultipleCurrentIndexChange,responsive:this._afterMultipleResponsive}),e.after(this._afterMultipleBindUI,this,"bindUI"),e.after(this._afterMultipleRenderUI,this,"renderUI")),this.publish({imageClicked:{defaultFn:this._defImageClicked},makeImageVisible:{defaultFn:this._defMakeImageVisible}})},_afterMultipleBindUI:function(){this._bindClickImages()},_afterMultipleRenderUI:function(){this._loadVisibleImages()},_afterMultipleCurrentIndexChange:function(){this.fire("makeImageVisible",{index:this.get("currentIndex")})},_afterMultipleResponsive:function(){this._loadVisibleImages()},_bindClickImages:function(){this._eventHandles.push(this.get("contentBox").delegate("click",this._onClickImage,".image-viewer-base-image-container",this))},_defImageClicked:function(e){this.set("currentIndex",e.index)},_defMakeImageVisible:function(e){var t=this._getImageContainerAtIndex(e.index).get("region"),n=this.get("contentBox").one(".image-viewer-base-image-list"),r=n.get("region");t.left<r.left?n.set("scrollLeft",n.get("scrollLeft")-(r.left-t.left)):t.right>r.right&&n.set("scrollLeft",n.get("scrollLeft")+t.right-r.right),this._loadVisibleImages()},_isImageVisible:function(e){var t=e.get("region"),n=this.get("contentBox").one(".image-viewer-base-image-list").get("region");return t.left>=n.left&&t.left+this.VISIBLE_THRESHOLD<=n.right||t.right<=n.right&&t.right-this.VISIBLE_THRESHOLD>=n.left},_loadVisibleImages:function(){var e=this.get("contentBox").all(".image-viewer-base-image-container");for(var t=0;t<e.size();t++)this._isImageVisible(e.item(t))&&this._loadImage(t)},_onClickImage:function(e){var t=e.currentTarget.get("parentNode").get("children").indexOf(e.currentTarget);this.fire("imageClicked",{index:t})}},{ATTRS:{height:100},CSS_PREFIX:e.getClassName("image-viewer-multiple")})},"3.1.0-deprecated.70",{requires:["base-build","node-base","aui-classnamemanager","aui-image-viewer-base"],skinnable:!0});
