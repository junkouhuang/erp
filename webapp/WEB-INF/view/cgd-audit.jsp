<!DOCTYPE HTML>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>  
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<title>新增批次</title>
<jsp:include page="cssPage.jsp"></jsp:include>
<script type="text/javascript">
var pageContext="${pageContext.request.contextPath}";
</script>
</head>
<body style="overflow: hidden;">
<div class="page-container ml-10 mt-10 mb-10">
     	付款方式:  <select style="width:180px;height: 32px; position: relative;bottom: -2px; border: solid 1px #ddd;" id="fkfs"></select>
     	审批备注：   <input id="spbz" style="width:180px;height: 32px;" class="input-text" />
     	<a class="btn btn-primary radius" data-title="发布" onclick="checkAll('添加批次','batch-fb-pc-add.do','900','600')" href="javascript:;">全选</a>
		<a class="btn btn-primary radius" data-title="关联门店" onclick="noCheckAll('关联门店','batch-fb-store.do','900','600')"href="javascript:;">反选</a>
</div>
<div class="ibox-content">
        <table id="audittable" data-height="280" data-mobile-responsive="true" >
        </table>
</div>

    <!-- 全局js -->
    <jsp:include page="jsPage.jsp"></jsp:include>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgd-audit.js"></script>
</body>
</html>