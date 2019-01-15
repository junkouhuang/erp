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
	<fieldset id="logistics" style="width: 670px; height: 160px;float:left;border: 1px solid #ddd;">

	</fieldset>

	<div id="modifyLogistics" style="float:left; padding:7px 0 0 124px;">
		<a style="color: #FF0000" href="javascript:;" onclick="deleteLogistics()"><i class="glyphicon glyphicon-remove"></i></a>
		<a href="javascript:;" onclick="recoverModify()"><i class="glyphicon glyphicon-refresh"></i></a>
		<input id="logisticsID" type="hidden" readonly = "true">
		<input id="logisticsName" type="text"> -
		<input id="logisticsTel" type="text"> -
		<input style="width:50px;" id="logisticsCode" type="text">
	</div>

	<div style="width:0px; height:42px; float:left; padding:3px 0 0 5px;" class="col-lg-1 col-md-1">
		<input class="btn btn-danger" type="button" value="保存修改" onclick="modifyLogistics()" />
	</div>

	<fieldset style="width:670px; height:183px; float:left;border: 1px solid #ddd;">
		<h4>新增物流</h4>
		<div class="" style="width:600px; margin-left: 35px;">
			<input class="form-control " id="addLogisticsName" type="text" placeholder="物流名称" >
			<input class="form-control " id="addLogisticsTel" type="text" placeholder="联系电话（*可选项）" >
			<input class="form-control " id="addLogisticsCode" type="text" placeholder="物流编码（推荐使用物流名称首字母）" >
		</div>
		<div style="width:670px; height:50px; float:left; padding:3px 0 0 307px;" class="col-lg-1 col-md-1">
			<input class="btn btn-primary  layer-date" type="button" value="新增" onclick="addLogistics()" />
		</div>
	</fieldset>

	<fieldset style="width:670px; height:80px; float:left; margin-top:10px; border: 1px solid #ddd;">
		<h4>打印物流</h4>
		<div style="width:670px; height:0px; float:left; padding:0 0 0 300px;" class="col-lg-2 col-md-1">
			<button type="button" onclick="printLogistics()" class="btn btn-primary">
				<i class="glyphicon glyphicon-print" aria-hidden="true">打印</i>
			</button>
		</div>
	</fieldset>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script> 
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/fhorder-logistics.js"></script>
</html>