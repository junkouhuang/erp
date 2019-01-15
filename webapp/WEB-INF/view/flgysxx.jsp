<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<script type="text/javascript">
    var pageContext="${pageContext.request.contextPath}";
</script>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料供应商管理</title>

    <link rel="shortcut icon" href="favicon.ico"> 
    
    <jsp:include page="cssPage.jsp"></jsp:include>
    
    <script type="text/javascript">
    	var pageContext = "${pageContext.request.contextPath}";
    </script>

</head>

<body class="gray-bg">
    <div class="animated fadeInRight">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                          <div class="row">
                        	<div class="row" >  
                        		 <div class="col-lg-1 col-md-1  text-right pt-7" >
								     <label for="inputEmail3" >供应商名称：</label>  
								  </div>
							      <div class="col-lg-2 col-md-2 ">  
							         <input class="form-control layer-date" type="text" placeholder="名称"  id="flgysmc_search">  
							      </div>  
								   <div class="col-lg-1 col-md-1  text-right pt-7" >
								    	<label for="inputEmail3">供应商编码：</label>  
								  </div>
							      <div class="col-xs-2">  
							        <input class="form-control layer-date" id="flgyscode_search" type="text" >  
							      </div>  
							
							      <div class="col-xs-2">  
							        <button type="button" class="btn btn-primary  layer-date" onclick="LoadingDataListOrderRealItems();">辅料供应商查询</button>
							      </div>  
							</div>
							</div>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                    <!-- <button type="button" onclick="printStoreReport();" class="btn btn-danger">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>打印
                                    </button> -->
                                    <button onclick="addflgys()" class="btn btn-primary" >
                                        <i class="glyphicon" aria-hidden="true">新增</i>
                                    </button>
                                    <button onclick="editflgys()" class="btn btn-success" >
                                        <i class="glyphicon" aria-hidden="true">修改</i>
                                    </button>
                                    <button onclick="relevancefl()" class="btn btn-warning" >
                                        <i class="glyphicon" aria-hidden="true">关联辅料</i>
                                    </button>
                                    
                                </div>
								  
                                <table class="tab_css_1" id="flgystable" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                        <!-- End Example Events -->
                    </div>
        </div>
    </div>
    </div>
    
    <jsp:include page="jsPage.jsp"></jsp:include>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/flgysxx.js"></script>

</body>

</html>