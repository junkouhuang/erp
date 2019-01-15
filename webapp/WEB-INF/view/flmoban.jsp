<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料模板信息表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
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
								  <div class="col-lg-1 col-md-1 text-right">
								    	<label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">编码：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control" type="text"  id="flcode">  
							      </div>  
							       <div class="col-lg-1 col-md-1 text-right">
								    	<label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">辅料名：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							        <input class="form-control" type="text"  id="categroymc">  
							      </div>  
							       <div class="col-lg-1 col-md-2  text-right">
								    	<label for="inputEmail3" class=" control-label "  style=" padding-top: 8px;">价格段：</label>  
								  </div>
							      <div class="col-lg-2 col-md-1"> 
							      	<input class="form-control  dsp"  type="text"  id="minSellprice"> - <input class="form-control dsp" type="text"  id="maxSellprice">  
							      </div>
							      <div class="col-lg-3 col-md-2 ">  
							        <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">  
							      </div>
							</div>
							</form>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                    <button type="button" class="btn btn-outline btn-default">
                                        <i class="glyphicon glyphicon-heart" aria-hidden="true"></i>
                                    </button>
                                    <button class="btn btn-outline btn-default" onclick="deleteFlInfo()">删除</button>
                                    <button class="btn btn-outline btn-default" onclick="add()">新增</button>
                                    <button class="btn btn-outline btn-default" onclick="updFlInfo()">修改</button>
                                    <button class="btn btn-outline btn-default" onclick="uploadImg()">上传图片</button>
                                </div>
                                <table id="flinfo_table" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                        <!-- End Example Events -->
                        <div class="detail-content">
                        	 <table id="flmobantable" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                    </div>
        </div>
    </div>
    </div>
    <!-- 公共模板 -->
	<jsp:include page="jsPage.jsp"></jsp:include>:
	<script src="${pageContext.request.contextPath}/js/flmoban.js"></script>
</body>
</html>