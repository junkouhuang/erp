<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料发货单</title>
    <link rel="shortcut icon" href="favicon.ico">
   
   <jsp:include page="cssPage.jsp"></jsp:include>
   
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
                        <form class="form-horizontal m-t"  id="commentForm" >
                        	<div class="row" >  
                        		  <div class="col-lg-1 col-md-1  text-right pt-7" >
								    	<label for="inputEmail3" >创建日期：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="time">  
							      </div>  
								  <div class="col-lg-1 col-md-1 text-right">
								    	<label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">采购单号：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control" type="text" placeholder="请填写发货单号"   id="flcgdancode">  
							      </div>  
							      <div class="col-lg-3 col-md-2 ">  
							        <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">  
							      </div>
							</div>
							</form>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                	 <button onclick="printFlcgdan();" class="btn btn-danger">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                                     </button>
                                    <button class="btn btn-primary" onclick="addFlcgdan()">新增</button>
                                    <button class="btn btn-success" onclick="updFlcgdan()">修改</button>
                                    <button class="btn btn-warning" onclick="confirmFlcgdan()">确认</button>
                                    <button class="btn btn-info" onclick="auditFlcgdan()">审核</button>
                                    <button class="btn btn-danger" onclick="rkFlcgdan()">入库</button>
                                </div>
                                <table id="flcgdan_table" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                    </div>
        </div>
    </div>
    </div>

	<jsp:include page="jsPage.jsp"></jsp:include>
	
	<script src="${pageContext.request.contextPath}/js/flcgdan.js"></script>
</body>
</html>