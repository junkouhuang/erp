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

<body>
<div class="page-container">
	<fieldset>
		<form action="" >
			<table class="table mb-0">
				<tr>
				<td width="110">模板名称：</td><td><input type="text" name="mobanmc" id="mobanmc" class="form-control radius"></td>
				</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<div style="width:690px;height:280px;" class="ml-5">
	<table id="dg" class="easyui-datagrid" style="width:690px;height:280px"
			data-options="
				iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tb',
				method: 'get',
				rownumbers:true,
				onClickRow: onClickRow
			">
		<thead>
			<tr>
			    <th data-options="field:'flid',width:280,align:'center',hidden:'true'">flid</th>
				<th data-options="field:'categroymc',width:280,align:'center'">辅料</th>
				<th data-options="field:'flcode',width:80,align:'center'">编码</th>
				<th data-options="field:'gunge',width:80,align:'center'">规格</th>
				<th data-options="field:'dw',width:80,align:'center'">单位</th>
			</tr>
		</thead>
	</table>
 </div>
<div id="tb" style="height:auto">
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="addflmobaninfoselect();">新增</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
</div>

</body>

<jsp:include page="jsPage.jsp"></jsp:include>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/flmobaninfo-add.js" ></script>
</html>
