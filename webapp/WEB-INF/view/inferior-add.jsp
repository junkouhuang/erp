<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>次品条目新增界面</title>
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
                                <select onchange="showDiv();" class="combobox form-control" type="text" name="opttype" id="opttype"></select>
                            </div>
                        </div>
                        <br/>
                        <div id="mxcodeDiv" class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" name="mxcode" id="mxcode" type="text" placeholder="请输入条码">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" name="sl" id="sl" type="text" placeholder="请填写数量">
                            </div>
                        </div>
                        <br/>
                        <div id="kwcodeDiv" style="display: none;" class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" name="kwcode" id="kwcode" type="text" placeholder="请输入库位">
                            </div>
                            <br/>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="whsid" id="whsid"></select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="tradeid" id="tradeid"></select>
                            </div>
                        </div>
                        <br/>
                        <div id="storeidDiv" style="display: none;" class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="storeid" id="storeid"></select>
                            </div>
                            <br/>
                        </div>
                        <div id="historycodeDiv" style="display: none;" class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" name="historycode" id="historycode" type="text" placeholder="请填写历史采购编码">
                            </div>
                            <br/>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control layer-date" name="bz" id="bz" type="text" placeholder="请输入备注(可不填)">
                            </div>
                        </div>
                        <br/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript">
    var pageContext = "${pageContext.request.contextPath}";
    function showDiv() {
        var opttype = $("#opttype").val();
        if(opttype == 7){
            $("#historycodeDiv").show();
            $("#mxcodeDiv").hide();
        }else{
            $("#historycodeDiv").hide();
            $("#mxcodeDiv").show();
        }
        if(opttype == 3){
            $("#storeidDiv").show();
        }else{
            $("#storeidDiv").hide();
        }
        if(opttype == 1){
            $("#kwcodeDiv").show();
        }else{
            $("#kwcodeDiv").hide();
        }
    }
    $(function () {
        loadStore();
        loadWhsinfo();
        loadTradeinfo();
        loadInferiorOptTypeMap();
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
    function loadTradeinfo() {
        $.ajax({
            url: pageContext + "/tradeinfoController/getTradeinfoPageList",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var tradeContent = '<option value="" selected="selected">请选择品牌商</option>';
                for (var i = 0; i < data.length; i++) {
                    tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }
                $('#tradeid').append(tradeContent);
            }
        });
        $('#tradeid').combobox();
    }
    function loadInferiorOptTypeMap() {
        $.ajax({
            url: pageContext + "/inferiorController/getInferiorOptTypeMap",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var opttypeContent = '<option value="" selected="selected">请选择操作类型</option>';
                for(var key in data){
                    opttypeContent += "<option value='" + key+ "'>" +data[key] + "</option>";
                }
                $('#opttype').append(opttypeContent);
            }
        });
        $('#opttype').combobox();
    }
    function formData() {
        return $('#commentForm').serializeJSON();
    }
</script>
</body>
</html>