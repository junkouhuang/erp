<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料供应商关联界面</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    
    <jsp:include page="cssPage.jsp"></jsp:include>
    
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
    <style>
     .fixed-table-toolbar{display:none;}
    </style>
  </head>
  
  <body>
  	  <div class="ml-20 mr-20 ">
  	  <button class="btn btn-primary"  onclick="addFlCgdan()">新增辅料采购单</button>
     <table id="flfhmx_table" data-height="510" data-mobile-responsive="true">
     
     </table>
     </div>
  
  <jsp:include page="jsPage.jsp"></jsp:include>
   
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flgys-select.js"></script> 
</body>
</html>
