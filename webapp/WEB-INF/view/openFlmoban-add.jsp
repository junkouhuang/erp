<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料模板信息</title>
       <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <base target="_blank">
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                        <form class="form-horizontal m-t"  id="commentForm" >
                        	<div class="row" >  
                        		  <div class="col-lg-1 col-md-1  text-right pt-7" >
								    	<label for="inputEmail3" >创建日期：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="time">  
							      </div>  
							      <div class="col-lg-1 col-md-1 text-right">
								    	<label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">模板名称：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control" type="text" placeholder="模板名称"   id="mobanmc">  
							      </div>  
								  <div class="col-lg-1 col-md-1 text-right">
								    	<label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">创建人、更新人：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control" type="text" placeholder="创建人、更新人"   id="addOrupdName">  
							      </div>  
							      <div class="col-lg-3 col-md-2 ">  
							        <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">  
							      </div>
							</div>
							</form>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                	 <button onclick="printFlfhorder();" class="btn btn-outline btn-default">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                                     </button>
                                    <button type="button" class="btn btn-outline btn-default">
                                        <i class="glyphicon glyphicon-heart" aria-hidden="true"></i>
                                    </button>
                                    <button class="btn btn-outline btn-default" onclick="deleteFlInfo()">删除</button>
                                    <button class="btn btn-outline btn-default" onclick="addFlInfo()">新增</button>
                                    <button class="btn btn-outline btn-default" onclick="updFlInfo()">修改</button>
                                </div>
                                <table id="flfhorder_table" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
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
	<script src="${pageContext.request.contextPath}/js/openFlmoban-add.js"></script>
</body>
</html>