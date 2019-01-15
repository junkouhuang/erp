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
		<form class="form-horizontal" id="shform">
		<fieldset>
		<legend>收货信息</legend>
		  <div class="form-group">
		    <label for="mdmc" class="col-xs-3 control-label">门店名称</label>
		    <div class="col-xs-9">
		      <input type="text" name="mdmc" value="${store.mdmc}" class="form-control" id="mdmc" placeholder="门店名称">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="shrr" class="col-xs-3 control-label">收货人</label>
		    <div class="col-xs-9">
		      <input type="text" name="shrr" value="${store.shrname}" class="form-control" id="shrr" placeholder="收货人">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="lxdh" class="col-xs-3 control-label">联系电话</label>
		    <div class="col-xs-9">
		      <input type="text" name="lxdh" value="${store.lxdh}" class="form-control" id="lxdh" placeholder="联系电话">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="shdz" class="col-xs-3 control-label">收货地址</label>
		    <div class="col-xs-9">
		      <input type="text" name="shdz" value="${store.shdz}" class="form-control" id="shdz" placeholder="收货地址">
		    </div>
		  </div>
		  </fieldset>
		</form>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script> 
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/fhorder-edtshinfo.js"></script> 
</html>