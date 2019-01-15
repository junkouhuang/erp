<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会员管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/cross.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/plugins/bootstrap-combobox/bootstrap-combobox.css" rel="stylesheet">
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
<body onkeypress="if (event.keyCode == 13) _search()">
<div class="page-container">
<div class="ibox ">
       <!-- Example Events -->
       <div class="ibox-title">
         <form class="form-horizontal m-t" id="vipsearchform">
	       	  <div class="form-group form-group-sm" >  
				  <div class="col-lg-1 col-md-1  text-right pt-7" >
				    	<label for="starttime" >开卡开始：</label>
				  </div>
			      <div class="col-lg-2 col-md-2 ">  
			        <input class="form-control layer-date" type="text" placeholder="请选择起始时间"  name="starttime" id="starttime">
			      </div>  
			      <div class="col-lg-1 col-md-1  text-right pt-7" >
				    	<label for="endtime" >开卡截止：</label>
				  </div>
			      <div class="col-lg-2 col-md-2 ">  
			        <input class="form-control layer-date" type="text" placeholder="请选择截止时间"  name="endtime" id="endtime">
			      </div>
			      <div class="col-lg-1 col-md-1  text-right pt-7" >
				    	<label for="vipcard" class="">会员卡号：</label>
				  </div>
			      <div class="col-lg-2 col-md-2">  
			        <input class="form-control"  type="text" placeholder="会员卡号" name="vipcard" id="vipcard"  >
			      </div>
			      <div class="col-lg-1  col-md-1  text-right pt-7" >  
			          	<label for="lxdh" class="">会员手机：</label>
			      </div>
		   	      <div class="col-lg-2 col-md-2" >  
			          	<input class="form-control "  type="text" placeholder="手机号" name="lxdh" id="lxdh">
			      </div>
			</div>
			<!-- 第二行 -->
			<div class="form-group form-group-sm" >  
				  <div class="col-lg-1 col-md-1  text-right pt-7" >
				    	<label for="storeid" >开卡门店：</label>
				  </div>
			      <div class="col-lg-2 col-md-2 ">
					  <select class="combobox form-control" name="storeid" id="storeid">
					  </select>
			      </div>  
			      <div class="col-lg-1 col-md-1  text-right pt-7" >
				    	<label for="xm" >会员姓名：</label>
				  </div>
			      <div class="col-lg-2 col-md-2 ">  
			        <input class="form-control" type="text" placeholder="会员姓名(模糊)"  name="xm" id="xm">
			      </div>
			      <div class="col-lg-1  col-md-1  text-right pt-7" >  
			          	<label for="passport" class="">会员证件：</label>
			      </div>
		   	      <div class="col-lg-2 col-md-2" >
					  <input class="form-control" type="text" placeholder="会员证件(模糊)"  name="passport" id="passport">
			      </div>
		   	      <div class="col-lg-1 col-md-1  text-right pt-7" >  
			          	<label for="status" class="">状态：</label>
			      </div>
		   	      <div class="col-lg-1 col-md-1 " >
					  <select  class="form-control" name="status" id="status">
						  <option value ="">全部</option>
						  <option value ="1">正常</option>
						  <option value ="2">注销</option>
						  <option value ="3">锁定</option>
					  </select>
			      </div>
			      <div class="col-lg-1 col-md-1">  
			       	 <input class="btn btn-primary  layer-date" type="button" value="搜索"  onclick="loadingViphyList()" />
			      </div>  
			</div>
		</form>
   </div>
	 <div class="ibox-content">
			 <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
				  <button type="button"  onclick="createPaycode();" class="btn btn-info">
					 <i class="glyphicon glyphicon-heart" aria-hidden="true">生成支付码</i>
				  </button>
			 </div>
			 <table id="tbody" data-height="510" data-mobile-responsive="true">
			 </table>
	 </div>
	 <!-- End Example Events -->
	 <div class="deta il-toolbar"></div>
    </div>
</div>
<!-- End Panel Other -->
    <!-- 全局js -->
    <script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

    <!-- 自定义js -->
	<script src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js" ></script>
    <script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
    <script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
    <script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/viphyadmin.js"></script>
</body>
</html>