<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购退货单新增界面</title>
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
                                <input disabled="disabled" class="form-control layer-date" name="ordercode" id="ordercode" type="text" >
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 ">
                                <select placeholder="请选择供应商" id="gysmc" class=" radius form-control"  name="gysmc"></select>
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
                                <select class="combobox form-control" type="text" name="tradeid" id="tradeid"></select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-2 col-md-2">
                                <input placeholder="请填写备注" class="form-control layer-date" name="bz" id="bz" type="text" >
                            </div>
                        </div>
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
        lodOrderCode();
        loadGysList();
        loadWhsinfo();
        loadTradeinfo();
    })
    function loadGysList() {
        $.ajax({
            url: pageContext + "/gysxxController/getGysxxList",
            dataType: "json",
            async: true,
            type: "POST",   //请求方式
            success: function (data) {
                var content = "";
                content += "<option value=\"\" selected=\"selected\">请选择供应商</option>";
                for (var i = 0; i < data.length; i++) {
                    content += "<option value=" + data[i].id + ">" + data[i].gysmc + "</option>";
                }
                $("#gysmc").append(content);
                $('#gysmc').combobox();
            }, error: function () {
            }
        });
    }
    function lodOrderCode() {
        $.ajax({
            url: pageContext + "/cgReturnOrderController/getCgReturnOrderCode",
            dataType: "json",
            async: true,
            type: "POST",   //请求方式
            success: function (data) {
                if(data.success){
                    $("#ordercode").val(data.obj);
                }else{
                    layer.msg(data.msg,function(){});
                }
            }, error: function () {
            }
        });
    }
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
    function formData() {
        var gysmc = $("#gysmc").find("option:selected").text();
        var gysid = $("#gysmc").find("option:selected").val();
        var whsid = $("#whsid").val();
        var tradeid = $("#tradeid").val();
        var bz = $("#bz").val();
        var ordercode = $("#ordercode").val();
        return {"gysmc":gysmc,"gysid":gysid,"whsid":whsid,"tradeid":tradeid,"bz":bz,"ordercode":ordercode};
    }
</script>
</body>
</html>