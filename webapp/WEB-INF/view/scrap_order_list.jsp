<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>调货单管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
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
                            <div class="col-md-1">
                                <label for="inputEmail3" class="">报废单创建时间：</label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-control layer-date" id="createOrderTime" type="text"
                                       placeholder="请选择时间段">
                            </div>
                            <div class="col-md-1">
                                <label for="inputEmail3" class="">报废单号：</label>
                            </div>
                            <div class="col-md-2">
                                <input class="form-control" id="scrapOrderCode" type="text" placeholder="报废单号">
                            </div>

                            <div class="col-md-6">
                                <input type="button" class="btn btn-primary" onclick="searchBtn()" value="搜索"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-outline btn-default" id="dhprint" onclick="printSpBfDan();">
                            <i class="glyphicon glyphicon-print" aria-hidden="true">报废单打印</i>
                        </button>
                        <div class="col-md-6" id="remarkRegion" style="display:none;">
                            <input class="form-control" id="remarkInfo" type="text" placeholder="备注信息">
                        </div>
                        <button class="btn btn-outline btn-default" id="shwoBtn" onclick="shwoAdd()">
                            新增
                        </button>
                        <button class="btn btn-danger" id="saveBtn" onclick="saveSPBFDan()" style="display:none;">
                            保存
                        </button>
                        <button class="btn btn-outline btn-default" onclick="confirmSPBFDan()">
                            确认
                        </button>
                        <button class="btn btn-outline btn-default" onclick="stockOut()">
                            不贵出库
                        </button>
                        <button class="btn btn-outline btn-default" onclick="printSpBfDanInfos()">
                            打印
                        </button>
                    </div>
                    <table id="scrapOrderTable" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
            </div>
        </div>
    </div>
</div>
<!-- End Panel Other -->
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/scrap_order_list.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/constant.js"></script>
</body>

</html>