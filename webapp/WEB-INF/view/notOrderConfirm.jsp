<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>无订单信息完善界面</title>
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
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" id="notorder_bz" type="text" placeholder="请填写备注">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="sourcetype" id="sourcetype"></select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="whsid" id="whsid"></select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="storeid" id="storeid"></select>
                            </div>
                        </div>
                        <%--<br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="owntraderid" id="owntraderid"></select>
                            </div>
                        </div>--%>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript">
    var pageContext = "${pageContext.request.contextPath}";
    $(function () {
        loadSourcetype();
        loadWhsinfo();
        loadStore();
        loadTradeinfo();
    })
    function loadWhsinfo() {
        $.ajax({
            url: pageContext + "/whsController/getWhsinfoList",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var whsContent = '<option value="" selected="selected">请选择仓库</option>';
                for (var i = 0; i < data.length; i++) {
                    whsContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
                }
                $('#whsid').append(whsContent);
                $('#whsid').combobox();
                console.log(whsContent);
            }
        });
    }
    function loadStore() {
        $.ajax({
            url: pageContext + "/storeController/getStoreList",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var mdContent = '<option value="" selected="selected">请选择门店</option>';
                for (var i = 0; i < data.length; i++) {
                    mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
                }
                $('#storeid').append(mdContent);
                $('#storeid').combobox();
            }
        });
    }
    /*function loadTradeinfo() {
        $.ajax({
            url: pageContext + "/tradeinfoController/getTradeinfoPageList",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var tradeContent = '<option value="" selected="selected">请选择货主</option>';
                for (var i = 0; i < data.length; i++) {
                    tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }
                $('#owntraderid').append(tradeContent);
            }
        });
        $('#owntraderid').combobox();
    }*/
    function loadSourcetype() {
        $.ajax({
            url: pageContext + "/fhOrdersController/getFhorderSourcetypeMap",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                console.log(data);
                var sourcetypeContent = '<option value="" selected="selected">请选择无订单类型</option>';
                for(var key in data){
                    sourcetypeContent += "<option value='" + key+ "'>" +data[key] + "</option>";
                }
                $("#sourcetype").append(sourcetypeContent);
                $('#sourcetype').combobox();
            }
        });
    }
    function formData() {
        var storeid = $("#storeid").val();
        var whsid = $("#whsid").val();
        var bz = $("#notorder_bz").val();
        var sourcetype = $("#sourcetype").val();
        var owntraderid = $("#owntraderid").val();
        return {"bz": bz, "whsid": whsid,"storeid":storeid,"sourcetype":sourcetype,"owntraderid":owntraderid};
    }
</script>
</body>
</html>