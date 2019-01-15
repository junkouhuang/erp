<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>门店状态修改界面</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/cross.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/animate.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <base target="_blank">
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>
<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="form-horizontal m-t" id="commentForm">
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="status" id="status">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="mdlx" id="mdlx">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="salelx" id="salelx">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" id="wholerate" name="wholerate" type="text" placeholder="请填写批发折扣">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" id="bz" name="bz" type="text" placeholder="请填写修改原因">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js" ></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript">
    $(function () {
        var store = window.parent.getSelectionStore();
        $("#wholerate").val(store.wholerate);
        loadMdlx(store.mdlx);
        loadMdStatus(store.status);
        loadMdSalelx(store.salelx);
    });

    function loadMdlx(mdlx) {
        var mdlxContent = '<option value="">请选择门店类型</option>';
        if (mdlx == 0) mdlxContent += "<option selected value='" + 0 + "'>加盟店</option>";
        else mdlxContent += "<option value='" + 0 + "'>加盟店</option>";
        if (mdlx == 3) mdlxContent += "<option selected value='" + 3 + "'>直营店</option>";
        else mdlxContent += "<option value='" + 3 + "'>直营店</option>";
        $('#mdlx').append(mdlxContent);
        $('#mdlx').combobox();
    }
    function loadMdStatus(status) {
        var mdStatusContent = '<option value="">请选择门店状态</option>';
        if (status == 0) mdStatusContent += "<option selected value='" + 0 + "'>未开业</option>";
        else mdStatusContent += "<option value='" + 0 + "'>未开业</option>";
        if (status == 1) mdStatusContent += "<option selected value='" + 1 + "'>营业中</option>";
        else mdStatusContent += "<option value='" + 1 + "'>营业中</option>";
        if (status == 4) mdStatusContent += "<option selected value='" + 4 + "'>已停业</option>";
        else mdStatusContent += "<option value='" + 4 + "'>已停业</option>";
        if (status == 9) mdStatusContent += "<option selected value='" + 9 + "'>已结业</option>";
        else mdStatusContent += "<option value='" + 9 + "'>已结业</option>";
        $('#status').append(mdStatusContent);
        $('#status').combobox();
    }
    function loadMdSalelx(salelx) {
        var saleContent = '<option value="">请选择销售类型</option>';
        if (salelx == 0) saleContent += "<option selected value='" + 0 + "'>正常</option>";
        else saleContent += "<option value='" + 0 + "'>正常</option>";
        if (salelx == 1) saleContent += "<option selected value='" + 1 + "'>星级</option>";
        else saleContent += "<option value='" + 1 + "'>星级</option>";
        if (salelx == 2) saleContent += "<option selected value='" + 2 + "'>五折</option>";
        else saleContent += "<option value='" + 2 + "'>五折</option>";
        $('#salelx').append(saleContent);
        $('#salelx').combobox();
    }

    function formData() {
        return $("#commentForm").serializeJSON();
    }
</script>
</body>
</html>