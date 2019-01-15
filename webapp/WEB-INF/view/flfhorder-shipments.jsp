<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料发货件数统计报表</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/cross.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/animate.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
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
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">文件组审核时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">发货单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control" type="text" placeholder="请填写发货单号" id="flfhcode">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="storeid">门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="storeid" id="storeid">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content ">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-warning glyphicon glyphicon-share-alt" onclick="exportFlFhshipmentsExcel()">导出辅料发货件数统计报表</button>
                    </div>
                    <table id="flfhorder_table" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/flfhorder-shipments.js"></script>
</body>
</html>