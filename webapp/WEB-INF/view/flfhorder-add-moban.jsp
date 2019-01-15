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
    <div class="">
    <div class="row">
                  <div class="col-sm-12">
                  	<div class="">
	                  	<div class="ibox-content  mb-1">
		                  	<div class="">
			                    <form class="form-horizontal"  id="commentForm" >
			                      <table class="table mb-0" >
										<tr>
											<td><input type="text" name="mobanmc" id="mobanmc" class="form-control radius" placeholder="模板名称"></td>
											<td><input type="text" name="time" id="time" class="form-control radius layer-date" placeholder="创建日期"></td>
							      		
											<td><input type="text" name="addOrupdName" id="addOrupdName" class="form-control radius" placeholder="创建人、更新人"></td>
							      			<td><input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">  </td>
							      		</tr>
					      		</table>
					    	</form>
					    	</div>
		    	          <table id="flfhorder_table" data-height="270" data-mobile-responsive="true" >
                                
                          </table>
			    	</div>
		    	</div>
                </div>
           </div>
    </div>
   <!-- js公共模板 -->
   <jsp:include page="jsPage.jsp"></jsp:include>
	<script src="${pageContext.request.contextPath}/js/flfhorder-add-moban.js"></script>
</body>
</html>