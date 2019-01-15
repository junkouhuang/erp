<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登记物流信息</title>
    <link rel="shortcut icon" href="favicon.ico">
	<jsp:include page="cssPage.jsp"></jsp:include>
	<script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>
<body>
<div class="container">
		<form class="form-horizontal" id="registeredLogisticsInfo">
		      <div class="ibox-content">
					  <div class="form-group">
					    <label for="wlgs" class="col-xs-3 control-label">物流公司</label>
					    <div class="col-xs-9">
					      <input type="text" name="wlgs"  class="form-control" id="wlgs" placeholder="物流公司">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lxdh" class="col-xs-3 control-label">联系电话</label>
					    <div class="col-xs-9">
					      <input type="text" name="lxdh"  class="form-control" id="lxdh" placeholder="联系电话">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="wldh" class="col-xs-3 control-label">物流单号</label>
					    <div class="col-xs-9">
					      <input type="text" name="wldh"  class="form-control" id="wldh" placeholder="物流单号">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="shrr" class="col-xs-3 control-label">收货人</label>
					    <div class="col-xs-9">
					      <input type="text" name="shrr" class="form-control" id="shrr" placeholder="收货人">
					    </div>
					  </div>
					   <div class="form-group">
				    <label for="shdz" class="col-xs-3 control-label">收货地址</label>
				    <div class="col-xs-9">
				      <input type="text" name="shdz" class="form-control" id="shdz" placeholder="收货地址">
				    </div>
			  </div>
			  </div>
		</form>
</div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>

<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/registeredLogisticsInfo.js"></script> 
</html>