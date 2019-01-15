<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/plugins/photoSwipe/photoswipe.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/plugins/photoSwipe/default-skin/default-skin.css" />
    <style>
        .my-gallery {
            width: 100%;
            float: left;
        }
        .my-gallery img {
            width: 100%;
            height: auto;
        }
        .my-gallery figure {
            display: block;
            float: left;
            margin: 0 5px 5px 0;
            width: 150px;
        }
        .my-gallery figcaption {
            display: none;
        }

        /* 自定义删除按钮的图片 */
        .pswp__button--delete {
            background-image:url(${pageContext.request.contextPath}/css/plugins/photoSwipe/default-skin/delete.png);
        }

    </style>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
    <h2>共有<span id="total">0</span>张图片</h2>

    <%-- 默认显示的小图片 --%>
    <div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">

    </div>

    <%-- 点击小图片后显示的幻灯片 --%>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <%-- 顶部按钮 --%>
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="关闭"></button>
                    <button class="pswp__button pswp__button--zoom" title="缩放"></button>
                    <button class="pswp__button pswp__button--delete" onclick="deletePic()" title="删除"></button>      <%-- 添加一个删除按钮 --%>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <%-- 左右箭头 --%>
                <button class="pswp__button pswp__button--arrow--left" title="上一张">
                </button>
                <button class="pswp__button pswp__button--arrow--right" title="下一张">
                </button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/photoSwipe/photoswipe.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/photoSwipe/photoswipe-ui-default.min.js"></script>
<script>
    var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {                                 // 这个参数el就是class="my-gallery"的DOM对象
            var thumbElements = el.childNodes,                                      // 这个thumbElements就是<figure>标签的数组
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for(var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i];                                        // 这个figureEl就是一个<figure>标签对象
                if(figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0];                                      // 这个linkEl就是<figure>标签里的<a>标签对象
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    imageID: linkEl.getAttribute('id')                              // 这里使用.getAttribute('id')是为了取出<a>标签里的id属性值，并添加到item对象里，稍后可以使用监听器取出这个imageID属性
                };
                if(figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML;
                }
                if(linkEl.children.length > 0) {
                    item.msrc = linkEl.children[0].getAttribute('src');
                }
                item.el = figureEl;
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if(!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) {
                    continue;
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};
            if(hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if(pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {       // 打开幻灯片时调用
            var pswpElement = document.querySelectorAll('.pswp')[0],
                options,
                gallery,
                items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }

            };
            if(fromURL) {
                if(options.galleryPIDs) {
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if( isNaN(options.index) ) {
                return;
            }
            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);           // 这里是初始PhotoSwipe实例
            gallery.init();
            photoListen(gallery);                                                                   // 这里添加一个监听PhotoSwipe实例的函数
        };
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    // 上面的代码都是模板代码，属于PhotoSwipe浏览图片JS插件的代码，使用initPhotoSwipeFromDOM('.my-gallery');来调用

    // 下面的代码是自定义代码，负责从后台获取图片并显示到页面

    var IMAGE_HTML = function (src, size, id) {
        return "<figure itemprop='associatedMedia' itemscope itemtype='http://schema.org/ImageObject'>" +
                    "<a href='" + src + "' itemprop='contentUrl' data-size='" + size + "' id='"+id+"'>" +       // 这个id用于标识图片
                        "<img src='" + src + "' itemprop='thumbnail' alt='Image description' />" +
                    "</a>" +
                "</figure>";
    };
    var buildCont = function (images, arr) {
        var cont = "";
        for (var i = 0; i < images.length; i ++ ){
            var image = images[i];
            var src = image.src;
            var size = image.width + "x" + image.height
            var id = arr[i].id;
            cont += IMAGE_HTML(src, size, id);
        }
        $(".my-gallery").html(cont);
    };
    
    var loadImages = function (sources){                                    // 这个方法是预加载多张图片
        var count = 0;
        var images = [];
        var imgNum = sources.length;
        for (var i = 0; i < imgNum; i ++ ){
            images[i] = new Image();
            images[i].onload = function(){
                count ++;
                if(imgNum <= count){                                        // 当所有图片都预加载完后，就会执行下面的代码
                    buildCont(images, sources);
                    initPhotoSwipeFromDOM('.my-gallery');                   // 初始化PhotoSwipe
                }
            };
            images[i].src = "http://119.23.48.31/" + sources[i].path;
        }
    };

    // 该方法是用于获取url上的参数
    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    var cgdetailid = getQueryVariable("cgdetailid");
    // 请求后台获取图片
    $.ajax({
        url: pageContext + "/cgdController/getPic/" + cgdetailid,
        type: "GET",
        async: false,
        dataType: "JSON",
        success: function(req){
            if (req.success){
                $("#total").html(req.obj.length);
                loadImages(req.obj);
            }else{
                console.info(req.msg);
            }
        }
    });

    var GlobalPhotoSwipe;
    var photoListen = function (photoSwipe){                                // PhotoSwipe幻灯片监听器
        photoSwipe.listen('imageLoadComplete', function(index, item) {      // 图片加载时触发，但图片不会重复加载
            var currID = item.imageID;                                      // 取出item对像里的imageID属性
        });

        photoSwipe.listen('close', function() {                             // 退出幻灯片时触发

        });

        GlobalPhotoSwipe = photoSwipe;                                      // 把photoSwipe实例变为全局
    };

    var deleteRequest = function(currId){
        $.ajax({
            url: pageContext + "/cgdController/deletaPic/" + currId,
            type: 'DELETE',
            async: false,
            dataType: "JSON",
            success: function(req) {
                if (req.success) {
                    var figureEl = document.getElementById(currId).parentNode;          // 获取figure标签
                    figureEl.parentNode.removeChild(figureEl);                          // 获取figure标签的父标签，再删除figure标签
                    GlobalPhotoSwipe.close();                                           // 退出幻灯片
                    var total = $("#total").html();                                     // 更新数量
                    $("#total").html((total == '' || total == null || total == undefined || isNaN(total)) ? 0 : total - 1);
                } else {
                    layer.msg(req.msg);
                }
            }
        });
    };
    
    var deletePic = function () {
        var currId = GlobalPhotoSwipe.currItem.imageID;                     // 通过全局变量获取当前幻灯片显示的图片的图片id
        layer.confirm('确定要删除该图片吗？', {
            btn: ['确定', '取消'],
            shade: false,
            btn1:function(index){
                deleteRequest(currId);                                      // 请求后台服务器删除图片
                layer.close(index);
            }
        });
    }
</script>

</html>
