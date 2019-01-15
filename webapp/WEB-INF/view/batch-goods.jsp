<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关联商品</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/batch-goods.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>

    <base target="_blank">
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
    <div class="content">
        <div class="top">
            <div class="top-title">
                <input id="batchid" type="hidden"/>
                <input id="opno" type="hidden"/>
                <h3>当前批次号：</h3>
            </div>

            <div class="label label-primary left-title">
                <h4>已关联</h4>
            </div>
            <div class="label label-danger right-title">
                <h4>未关联</h4>
            </div>
        </div>

        <div id="left" class="left">

            <div class="l-Table">
                <table id="l-table" style="width: 370px; height: 390px;">
                </table>
            </div>

            <div class="left-Foot">
                <div>
                    <button class="btn btn-danger btn-sm" onclick="remove()">点击移除</button>
                </div>
            </div>
        </div>

        <div class="middle">
            <%--<button class="button">点击</button>--%>
        </div>

        <div id="right" class="right">
            <div>
                <div class="searchCont">
                    <input class="form-control" id="spcode" type="text" placeholder="商品编码">
                </div>
                <div class="searchCont">
                    <input class="form-control" id="spmc" type="text" placeholder="商品名称">
                </div>
                <div class="searchBtn">
                    <input class="btn btn-primary layer-date" type="button" value="搜索未关联" onclick="search()"/>
                </div>
            </div>

            <div class="r-Table">
                <table id="r-table"  style="width: 370px; height: 390px;">
                </table>
            </div>

            <div class="right-Foot">
                <div>
                    <button class="btn btn-success btn-sm" onclick="relevance()">点击关联</button>
                </div>
            </div>
        </div>

        <div class="foot">
            <button class="btn btn-primary" onclick="save()">确认批次关联商品无误后点击保存</button>
        </div>
    </div>
</body>
<!-- End Panel Other -->
<!-- 全局js -->
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-goods.js" ></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js" ></script>

</html>