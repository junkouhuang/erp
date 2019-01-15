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
                            <label for="storeid">门店：</label>
                        </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="storeid" id="storeid">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name = "status" id = "status">
                                    <option ></option>
                                    <option value="0">新增</option>
                                    <option value="1">确认</option>
                                    <option value="2">配货</option>
                                    <option value="3">文件组审核</option>
                                    <option value="4">跟单审核</option>
                                    <option value="5">审核</option>
                                    <option value="6">发货</option>
                                    <option value="9">撤单</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="angle">视角：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="angle" name="angle" class="form-control">
                                    <option value="0">大众</option>
                                    <option value="1">跟单</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">建单时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">发货时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" id="fhTime">
                            </div>
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">发货单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control" type="text" placeholder="请填写发货单号" id="flfhcode">
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
                        <button class="btn btn-primary" onclick="addFlInfo()">新增</button>
                        <button class="btn btn-success" onclick="updFlInfo()">修改</button>
                        <button class="btn btn-warning" onclick="flfhorderConfirm();">确认</button>
                        <button onclick="exportFlPicking();" class="btn btn-danger">
                            <i class="glyphicon glyphicon-print" aria-hidden="true"></i>辅料订单打印
                        </button>
                        <button class="btn btn-primary" onclick="flfhorderPh();">配货</button>
                        <button class="btn btn-warning" onclick="whsAudit();">文件组审核</button>
                        <button class="btn btn-danger" onclick="flfhorderGdAudit();">跟单审核</button>
                        <button class="btn btn-primary" onclick="flfhorderAudit();">审核</button>
                        <button class="btn btn-warning" onclick="cancelFlfhorder();">撤单</button>
                        <button class="btn btn-danger" onclick="registeredLogisticsInfo();">发货</button>
                        <button onclick="printFlpicking();" class="btn btn-success">
                            <i class="glyphicon glyphicon-print" aria-hidden="true"></i>辅料拣货单打印
                        </button>
                        <button onclick="printFlfhorder();" class="btn btn-danger">
                            <i class="glyphicon glyphicon-print" aria-hidden="true"></i>辅料发货单打印
                        </button>
                        <button onclick="showFlfhorderInfo();" class="btn btn-success">
                            <i class="glyphicon glyphicon-th" aria-hidden="true"></i>显示明细
                        </button>
                        <button onclick="cwprintFlfhorder();" class="btn btn-warning">
                            <i class="glyphicon glyphicon-print" aria-hidden="true"></i>财务打印
                        </button>
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
<script src="${pageContext.request.contextPath}/js/flfhorder.js"></script>
</body>
</html>