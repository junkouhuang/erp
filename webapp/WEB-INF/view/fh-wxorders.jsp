<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料发货单</title>
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
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">订单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="ordercode"  id="ordercode" type="text" placeholder="订单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7" >
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="store" id="store">
                                </select>
                            </div>
                            <div class="col-lg-2  col-md-2  text-right pt-7">
                                <label for="jhprint" class="">拣货单打印状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="jhprint" class="form-control">
                                    <option value=""></option>
                                    <option value="true">打印</option>
                                    <option value="false">未打印</option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content ">
                    <table id="table" data-height="510" data-mobile-responsive="true">
                    </table>
                    <div>
                        <i class="fa fa-square text-warning">待处理</i>
                        <i class="fa fa-square text-success">打印分拣</i>
                        <i class="fa fa-square text-navy">财务审核</i>
                        <i class="fa fa-square text-gold">物流发货</i>
                        <i class="fa fa-square text-info">门店收货</i>
                        <i class="fa fa-square text-MediumPurple">总部撤单</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/fh-wxorder.js"></script>
</body>
</html>