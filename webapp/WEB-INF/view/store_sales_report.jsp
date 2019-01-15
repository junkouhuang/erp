<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购单管理</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/cross.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <base target="_blank">
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="form-horizontal m-t">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3">日期范围：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="storeid" id="storeid">
                                </select>
                            </div>
                            <div class="col-lg-4 col-md-3 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListRealItems()">
                            </div>
                        </div>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button onclick="show_merchandise_sales_report();" class="btn btn-outline btn-default">
                            <i class="glyphicon glyphicon-share" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-outline btn-default">
                            <i class="glyphicon glyphicon-heart" aria-hidden="true"></i>
                        </button>
                    </div>
                    <table class="tab_css_1" id="sales_report" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
                <div class="detail-toolbar"></div>
            </div>
        </div>
    </div>
</div>
<!-- End Panel Other -->
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/store_sales_report.js"></script>
</body>

</html>