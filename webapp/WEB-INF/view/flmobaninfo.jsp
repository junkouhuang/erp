<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料模板信息</title>
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
                                    <button class="btn btn-danger" onclick="deleteFlmoban();">删除</button>
                                    <button class="btn btn-primary" onclick="addFlmoban();">新增</button>
                                    <button class="btn btn-success" onclick="updFlmoban();">修改</button>
                                </div>
                                <table id="flfhorder_table" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                    </div>
        </div>
    </div>
    </div>
    
    <jsp:include page="jsPage.jsp"></jsp:include>
    
	<script src="${pageContext.request.contextPath}/js/flmobaninfo.js"></script>
</body>
</html>