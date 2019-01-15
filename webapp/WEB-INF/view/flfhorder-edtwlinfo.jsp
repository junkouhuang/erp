<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico">

   <jsp:include page="cssPage.jsp"></jsp:include>
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>
<body>
<div class="page-container">
<fieldset>
<form class="form-horizontal pt-20"   id="flwlform" method="post">
	<input type="hidden" value="${flfhorder.wlgs}" id="loadWlgs" />
	<table class="table">
		<tr>
		<td class="text-right pr-10">物流公司</td>
		<td style="width:100%; white-space: normal;">
	              <div name="wlgs" id="wlgs" style="width: 98%; height: 160px;float:left;border: 4px solid #ddd;"  class="p10"></div>
		  </td>
		  </tr>
		  <tr></tr>
		  <tr>
		    	<td width="100" class="text-right pr-10 posit3">物流单号</td>
		        <td><input type="text" name="wldh" value="${flfhorder.wldh}" class="form-control posit3" id="wldh"  placeholder="物流单号"></td>
		  </tr>
	  </table>
</form>
</fieldset>
</div>
</body>
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flfhorder-edtwlinfo.js" ></script>
</html>