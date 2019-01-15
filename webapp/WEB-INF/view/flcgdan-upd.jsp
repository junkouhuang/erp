<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购单管理-修改</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    <jsp:include page="cssPage.jsp"></jsp:include>
    <base target="_blank">
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
<div class="page-container">
	<fieldset>
		<form action="">
			<table class="table" >
				<tr>
					<td width="120">采购单号：</td><td><input type="text" name="flcgdancode" id="flcgdancode" class="form-control radius" disabled="disabled"></td>
					<td width="90">供应商：</td><td><select style="min-width:200px;height: 34px;" id='flgys'></select></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<div class="ml-5" style="width:99%;margin-left:5px;">
	<table id="dg" class="easyui-datagrid"  style="width:100%;height:280px;"
			data-options="
				iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tb',
				url: 'datagrid_data1.json',
				method: 'get',
				rownumbers:true,
				onClickCell: onClickCell
			">
	</table>
</div> 
<div id="tb" style="height:auto">
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="openFlbomb();">选择辅料</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">移除</a>
</div>
</body>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flcgdan-upd.js" ></script>
</html>