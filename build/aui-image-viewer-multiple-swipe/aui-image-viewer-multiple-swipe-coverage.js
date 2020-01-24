if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/aui-image-viewer-multiple-swipe/aui-image-viewer-multiple-swipe.js']) {
   __coverage__['build/aui-image-viewer-multiple-swipe/aui-image-viewer-multiple-swipe.js'] = {"path":"build/aui-image-viewer-multiple-swipe/aui-image-viewer-multiple-swipe.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":43},"end":{"line":1,"column":62}}},"2":{"name":"ImageViewerMultipleSwipe","line":11,"loc":{"start":{"line":11,"column":0},"end":{"line":11,"column":36}}},"3":{"name":"(anonymous_3)","line":20,"loc":{"start":{"line":20,"column":17},"end":{"line":20,"column":28}}},"4":{"name":"(anonymous_4)","line":32,"loc":{"start":{"line":32,"column":29},"end":{"line":32,"column":40}}},"5":{"name":"(anonymous_5)","line":49,"loc":{"start":{"line":49,"column":25},"end":{"line":49,"column":36}}},"6":{"name":"(anonymous_6)","line":61,"loc":{"start":{"line":61,"column":21},"end":{"line":61,"column":37}}},"7":{"name":"(anonymous_7)","line":75,"loc":{"start":{"line":75,"column":25},"end":{"line":75,"column":41}}},"8":{"name":"(anonymous_8)","line":100,"loc":{"start":{"line":100,"column":18},"end":{"line":100,"column":29}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":121,"column":97}},"2":{"start":{"line":11,"column":0},"end":{"line":11,"column":38}},"3":{"start":{"line":13,"column":0},"end":{"line":103,"column":2}},"4":{"start":{"line":21,"column":8},"end":{"line":23,"column":10}},"5":{"start":{"line":33,"column":8},"end":{"line":40,"column":10}},"6":{"start":{"line":50,"column":8},"end":{"line":50,"column":34}},"7":{"start":{"line":62,"column":8},"end":{"line":64,"column":9}},"8":{"start":{"line":63,"column":12},"end":{"line":63,"column":35}},"9":{"start":{"line":76,"column":8},"end":{"line":79,"column":54}},"10":{"start":{"line":81,"column":8},"end":{"line":86,"column":9}},"11":{"start":{"line":82,"column":12},"end":{"line":82,"column":92}},"12":{"start":{"line":84,"column":13},"end":{"line":86,"column":9}},"13":{"start":{"line":85,"column":12},"end":{"line":85,"column":92}},"14":{"start":{"line":88,"column":8},"end":{"line":88,"column":34}},"15":{"start":{"line":90,"column":8},"end":{"line":90,"column":31}},"16":{"start":{"line":101,"column":8},"end":{"line":101,"column":70}},"17":{"start":{"line":105,"column":0},"end":{"line":116,"column":2}},"18":{"start":{"line":118,"column":0},"end":{"line":118,"column":62}}},"branchMap":{"1":{"line":62,"type":"if","locations":[{"start":{"line":62,"column":8},"end":{"line":62,"column":8}},{"start":{"line":62,"column":8},"end":{"line":62,"column":8}}]},"2":{"line":81,"type":"if","locations":[{"start":{"line":81,"column":8},"end":{"line":81,"column":8}},{"start":{"line":81,"column":8},"end":{"line":81,"column":8}}]},"3":{"line":84,"type":"if","locations":[{"start":{"line":84,"column":13},"end":{"line":84,"column":13}},{"start":{"line":84,"column":13},"end":{"line":84,"column":13}}]}},"code":["(function () { YUI.add('aui-image-viewer-multiple-swipe', function (A, NAME) {","","/**"," * This adds the functionality of swiping to go to the previous/ image in the"," * viewer for multiple images. Will be mixed into ImageViewerMultiple automatically"," * when loaded."," *"," * @module aui-image-viewer-multiple-swipe"," */","","function ImageViewerMultipleSwipe() {}","","ImageViewerMultipleSwipe.prototype = {","    /**","     * Constructor for the `A.ImageViewerMultipleSwipe`. Lifecycle.","     *","     * @method initializer","     * @protected","     */","    initializer: function() {","        this._eventHandles.push(","            A.after(this._afterAttachSwipeEvents, this, '_attachSwipeEvents')","        );","    },","","    /**","     * Attaches swipe events for the viewer's thumbnails.","     *","     * @method _afterAttachSwipeEvents","     * @protected","     */","    _afterAttachSwipeEvents: function() {","        this._swipeEventHandles.push(","            this._scrollView.after('scrollXChange', A.bind(this._afterScrollXChange, this)),","            this.get('contentBox').on('mousedown', A.bind(this._onMousedown, this)),","            this.on({","                imageClicked: this._onImageClicked,","                makeImageVisible: this._onMakeImageVisible","            })","        );","    },","","    /**","     * Fired after the scroll view's `scrollX` attribute changes.","     *","     * @method _afterScrollXChange","     * @protected","     */","    _afterScrollXChange: function() {","        this._loadVisibleImages();","    },","","    /**","     * Fired on the `imageClicked` event. Prevents its default behavior when","     * the widget was scrolled, as the image shouldn't change when dragging.","     *","     * @method _onImageClicked","     * @param {EventFacade} event","     * @protected","     */","    _onImageClicked: function(event) {","        if (this._lastThumbnailsScrollX !== this._scrollView.get('scrollX')) {","            event.preventDefault();","        }","    },","","    /**","     * Fired on the `makeImageVisible` event. It replaces the original logic for","     * making the image visible through scrolling, using the scroll view for this","     * instead.","     *","     * @method _onMakeImageVisible","     * @protected","     */","    _onMakeImageVisible: function(event) {","        var imageRegion = this._getImageContainerAtIndex(event.index).get('region'),","            list = this.get('contentBox').one('.image-viewer-base-image-list'),","            listRegion = list.get('region'),","            scrollX = this._scrollView.get('scrollX');","","        if (imageRegion.left < listRegion.left) {","            this._scrollView.set('scrollX', scrollX - (listRegion.left - imageRegion.left));","        }","        else if (imageRegion.right > listRegion.right) {","            this._scrollView.set('scrollX', scrollX + imageRegion.right - listRegion.right);","        }","","        this._loadVisibleImages();","","        event.preventDefault();","    },","","    /**","     * Fired when the `mousedown` event is triggered on the widget. Stores","     * the value of `scrollX` at the moment the mousedown happened.","     *","     * @method _onMousedown","     * @protected","     */","    _onMousedown: function() {","        this._lastThumbnailsScrollX = this._scrollView.get('scrollX');","    }","};","","ImageViewerMultipleSwipe.ATTRS = {","    /**","     * Flag indicating if ScrollViewPaginator should be plugged.","     *","     * @attribute useScrollViewPaginator","     * @default false","     * @type {Boolean}","     */","    useScrollViewPaginator: {","        value: false","    }","};","","A.Base.mix(A.ImageViewerMultiple, [ImageViewerMultipleSwipe]);","","","}, '3.1.0-deprecated.74', {\"requires\": [\"aui-image-viewer-multiple\", \"aui-image-viewer-swipe\"]});","","}());"]};
}
var __cov_Uc4Y_atoffKrIJD0i$braA = __coverage__['build/aui-image-viewer-multiple-swipe/aui-image-viewer-multiple-swipe.js'];
__cov_Uc4Y_atoffKrIJD0i$braA.s['1']++;YUI.add('aui-image-viewer-multiple-swipe',function(A,NAME){__cov_Uc4Y_atoffKrIJD0i$braA.f['1']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['2']++;function ImageViewerMultipleSwipe(){__cov_Uc4Y_atoffKrIJD0i$braA.f['2']++;}__cov_Uc4Y_atoffKrIJD0i$braA.s['3']++;ImageViewerMultipleSwipe.prototype={initializer:function(){__cov_Uc4Y_atoffKrIJD0i$braA.f['3']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['4']++;this._eventHandles.push(A.after(this._afterAttachSwipeEvents,this,'_attachSwipeEvents'));},_afterAttachSwipeEvents:function(){__cov_Uc4Y_atoffKrIJD0i$braA.f['4']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['5']++;this._swipeEventHandles.push(this._scrollView.after('scrollXChange',A.bind(this._afterScrollXChange,this)),this.get('contentBox').on('mousedown',A.bind(this._onMousedown,this)),this.on({imageClicked:this._onImageClicked,makeImageVisible:this._onMakeImageVisible}));},_afterScrollXChange:function(){__cov_Uc4Y_atoffKrIJD0i$braA.f['5']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['6']++;this._loadVisibleImages();},_onImageClicked:function(event){__cov_Uc4Y_atoffKrIJD0i$braA.f['6']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['7']++;if(this._lastThumbnailsScrollX!==this._scrollView.get('scrollX')){__cov_Uc4Y_atoffKrIJD0i$braA.b['1'][0]++;__cov_Uc4Y_atoffKrIJD0i$braA.s['8']++;event.preventDefault();}else{__cov_Uc4Y_atoffKrIJD0i$braA.b['1'][1]++;}},_onMakeImageVisible:function(event){__cov_Uc4Y_atoffKrIJD0i$braA.f['7']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['9']++;var imageRegion=this._getImageContainerAtIndex(event.index).get('region'),list=this.get('contentBox').one('.image-viewer-base-image-list'),listRegion=list.get('region'),scrollX=this._scrollView.get('scrollX');__cov_Uc4Y_atoffKrIJD0i$braA.s['10']++;if(imageRegion.left<listRegion.left){__cov_Uc4Y_atoffKrIJD0i$braA.b['2'][0]++;__cov_Uc4Y_atoffKrIJD0i$braA.s['11']++;this._scrollView.set('scrollX',scrollX-(listRegion.left-imageRegion.left));}else{__cov_Uc4Y_atoffKrIJD0i$braA.b['2'][1]++;__cov_Uc4Y_atoffKrIJD0i$braA.s['12']++;if(imageRegion.right>listRegion.right){__cov_Uc4Y_atoffKrIJD0i$braA.b['3'][0]++;__cov_Uc4Y_atoffKrIJD0i$braA.s['13']++;this._scrollView.set('scrollX',scrollX+imageRegion.right-listRegion.right);}else{__cov_Uc4Y_atoffKrIJD0i$braA.b['3'][1]++;}}__cov_Uc4Y_atoffKrIJD0i$braA.s['14']++;this._loadVisibleImages();__cov_Uc4Y_atoffKrIJD0i$braA.s['15']++;event.preventDefault();},_onMousedown:function(){__cov_Uc4Y_atoffKrIJD0i$braA.f['8']++;__cov_Uc4Y_atoffKrIJD0i$braA.s['16']++;this._lastThumbnailsScrollX=this._scrollView.get('scrollX');}};__cov_Uc4Y_atoffKrIJD0i$braA.s['17']++;ImageViewerMultipleSwipe.ATTRS={useScrollViewPaginator:{value:false}};__cov_Uc4Y_atoffKrIJD0i$braA.s['18']++;A.Base.mix(A.ImageViewerMultiple,[ImageViewerMultipleSwipe]);},'3.1.0-deprecated.74',{'requires':['aui-image-viewer-multiple','aui-image-viewer-swipe']});
