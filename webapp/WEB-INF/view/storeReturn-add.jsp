<%--
  Created by IntelliJ IDEA.
  User: zz
  Date: 2017-11-17
  Time: 11:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>新增门店</title>
	<link rel="shortcut icon" href="favicon.ico"> <link href="css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/plugins/bootstrap-combobox/bootstrap-combobox.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/animate.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
	<style type="text/css">
		table tr td{
			font-size: smaller;
		}
	</style>
	<script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
	</script>
</head>
<body>
<div  class="page-container">
	<form id="addStoreReturnFrom">
		<div class="form-group">
			<label for="mdcode" class="col-xs-3 control-label ">选择门店:</label>
			<div class="col-xs-9">
				<select class="combobox form-control" name="mdcode" id="mdcode"></select>
			</div>
		</div>
	</form>

	</div>
</div>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/storeReturn-add.js" ></script>
</body>
</html>