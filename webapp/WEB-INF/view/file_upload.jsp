<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/plugins/filepond/filepond.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/plugins/filepond/filepond-plugin-image-preview.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/plugins/filepond/button.css" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
    <div style="width: 700px; height: 50px; margin: 0 auto;">
        <a href="javascript:void(0);" class="button" onclick="upload()">开始上传</a>
    </div>

    <input type="file"
       class="filepond"
       name="file"
       accept="image/png, image/jpeg, image/gif"
       multiple
       data-max-file-size="100MB"
       data-max-files="5"/>

</body>

<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-file-encode.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-file-validate-size.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-file-validate-type.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-image-crop.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-image-exif-orientation.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-image-preview.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-image-resize.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/filepond/filepond-plugin-image-transform.min.js"></script>

<script>
    FilePond.registerPlugin(                    // 插件
        FilePondPluginFileEncode,
        FilePondPluginFileValidateType,
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageCrop,
        FilePondPluginImageResize,             // 文件压缩
        FilePondPluginImageTransform
    );

    var filePond = FilePond.create(document.querySelector("input"), {                   // 创建一个实例
        labelIdle: '点击选择 <span class="filepond--label-action">上传图片</span>',
        imagePreviewHeight: 500,                // 图片预览时的显示大小
        allowImageResize: false,                // 是否启用文件压缩
        imageResizeTargetWidth: 100,
        imageResizeTargetHeight: 100,
    });

    var cgdetailid = getQueryVariable("cgdetailid");
    filePond.setOptions({
        allowDrop: false,               // 是否允许拖拽
        instantUpload: false,           // 是否自动提交
        server: {
            url: pageContext + '/cgdController/uploadPic/' + cgdetailid, // 上传文件到后台的url
            process: {
                url: '/',
                method: 'POST'
            }
        }
    });

    var upload = function () {
        var files = filePond.getFiles();
        if (files == null || files == undefined || files.length == 0){
            layer.msg("没有图片");
            return false;
        }
        for (var i = 0; i < files.length; i ++){                            // 上传状态为2的文件
            var status = files[i].status;
            if (status == 2){
                filePond.processFile(files[i]);                             // 单独上传每一个文件
            }
        }
    }

    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

</script>

</html>
