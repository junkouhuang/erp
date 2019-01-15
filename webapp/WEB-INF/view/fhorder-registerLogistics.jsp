<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> 
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>
    <base target="_blank">
	<script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>
<body>
<div class="container">

	<div style="height:42px; padding:0px 0 0 165px;">
		<P style="color: red; font-size: 20px;" id="fhCode" readonly = "true" ></P>
	</div>

	<fieldset id="logistics" style="min-width: 670px; height: 160px; float:left; border: 1px solid #ddd;">
		<h4 style="color: RED;">请选择物流公司进行登记：</h4>
	</fieldset>
	<fieldset style="min-width:670px; height:100px; float:left; border: 1px solid #ddd; margin-top:10px;">
		<h4 style="color: RED;">请输入该物流公司的物流单号：</h4>
		<div class="" style="width:600px; margin-left: 35px;">
			<input class="form-control " id="code" type="text" placeholder="物流单号" >
		</div>
	</fieldset>

	<fieldset style="padding: 20px 0px 0px 307px; clear: both">
		<input class="btn btn-danger" type="button" value="登记" onclick="register()" />
	</fieldset>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script> 
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/fhorder-registerLogistics.js"></script>
</html>