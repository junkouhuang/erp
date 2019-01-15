<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购单管理-新增</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    <jsp:include page="cssPage.jsp"></jsp:include>	
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
						<td width="120">采购单号：</td><td><input type="text" name="flcgdancode" id="flcgdancode" class="form-control radius"  readonly="readonly"></td>
						<td width="90">供应商：</td><td><select style="height: 34px;" id='flgys' class="form-control"></select></td>
		      		</tr>
		      	</table>
			</form>
		</fieldset>
	</div>
	<div class="ml-5" style="width:99%;margin-left:5px;">
		<table id="dg" class="easyui-datagrid" style="width:100%;height:280px;"
				data-options="
					iconCls: 'icon-edit',
					singleSelect: true,
					url: 'datagrid_data1.json',
					method:'get',
					toolbar: '#tb',
					rownumbers:true,
					onClickCell: onClickCell
				">
			<thead>
				<tr>
					<th data-options="field:'flid',width:80,align:'center',hidden:'true'"></th>
					<th data-options="field:'flcode',width:120,align:'center'">辅料编码</th>
					<th data-options="field:'categroymc',width:200,align:'center'">辅料</th>
					<th data-options="field:'number',width:80,align:'center',editor:'numberbox'">数量</th>
					<th data-options="field:'sellprice',width:80,align:'center',editor:{type:'numberbox',options:{precision:1}}">价格</th>
				</tr>
			</thead>
		</table>
	</div>
    <div id="tb" style="height:auto">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="openFl();">选择辅料</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">移除</a>
	</div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/flcgdan-add.js" ></script>
</html>