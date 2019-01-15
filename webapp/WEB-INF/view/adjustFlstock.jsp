<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包装调整界面</title>
    <link rel="shortcut icon" href="favicon.ico"> 
 
 	<jsp:include page="cssPage.jsp"></jsp:include>
 	
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
    <style>
    	.fixed-table-toolbar{display:none;}
    </style>
</head>

<body class="gray-bg">
    <div class="row">
            <div class="col-sm-12">
                <div class=" ">
                        <!-- End Example Events -->
                        <div style="width:99%;margin-left:3px;">
							<table id="dg" class="easyui-datagrid"  style="width:100%;height:auto"
									data-options="
										iconCls: 'icon-tip',
										singleSelect: true,
										toolbar: '#tb',
										method: 'get',
										rownumbers: true,
										showFooter:true,  
										onClickRow: onClickRow
									">
							</table>
						 
                        </div>
                   		<div id="tb" style="height:auto">
								<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">新增</a>
						</div>
                </div>
        </div>
    </div>
    
    <jsp:include page="jsPage.jsp"></jsp:include>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/adjustFlstock.js"></script>
    
</body>
</html>