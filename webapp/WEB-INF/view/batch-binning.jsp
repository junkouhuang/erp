<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>分箱&单件包装</title>
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
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
    <link href="${pageContext.request.contextPath}/css/batch-binning.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/color-styleX.css" rel="stylesheet">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>

    <base target="_blank">
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
	<input id="batchid" type="hidden" />
	<input id="opno" type="hidden" />

	<div class="content">

		<div class="top">

			<div class="tilte">
				<div style="height: 0px; font-size: 10px; font-weight:bold; float: right; margin-right: 170px;">
					<span>必填</span>
					<span class="color-red" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

					<span>已填</span>
					<span class="color-green" style="display:inline-block; height: 10px; width: 10px;"></span> &emsp;&emsp;

					<span>已分箱</span>
					<span class="color-yellow" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;
				</div>
			</div>

			<div class=".label label-success version">
				<h3>当前版本：</h3>
			</div>

			<div class=".label label-warning code">
				<h3>当前批次：</h3>
			</div>

		</div>


		<div class="left">
			<table id="left-table" style="width: 490px; height: 450px;"></table>
<%--
			<canvas id="canvas" width="300" height="300">画布</canvas>--%>
		</div>


		<div class="right">
			<table id="right-table" style="width: 378px; height: 450px;"></table>
		</div>

		<div class="button">
			<div class="top-button">
				<span class="binning">
					<button class="btn btn-warning" onclick="binning()">分箱</button>
				</span>
				<span class="single">
					<button class="btn btn-primary" onclick="single()">单件包装</button>
				</span>
			</div>
		</div>


	</div>

</body>
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
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-binning.js" ></script>

</html>