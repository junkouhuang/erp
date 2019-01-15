<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购单管理</title>
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
					<td width="90">采购单号：</td><td ><input type="text" name="flcgdancode" id="flcgdancode" class="form-control radius" disabled="disabled"></td>
					<td width="80">供应商：</td><td><select style="height: 34px;" id='flgys' disabled="disabled"></select></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<!-- ----采购明细------- -->
<div style="float:left;width:365px;margin-left: 5px;">
    <table id="cgmx" class="easyui-datagrid" title="采购明细" style="width:365px;height:280px"
			data-options="
				iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tb',
				url: 'datagrid_data1.json',
				method: 'get',
				onClickRow: onClickRow
			">
		<thead>
			<tr>
			    <th data-options="field:'jhid',width:200,align:'center',editor:'textbox',hidden:'true' ">jhid</th>
		    	<th data-options="field:'flid',width:200,align:'center',editor:'textbox',hidden:'true' ">flid</th>
				<th data-options="field:'categroymc',width:200,align:'center',editor:'textbox'">辅料</th>
				<th data-options="field:'number',width:80,align:'center',editor:{type:'numberbox',options:{precision:1}}">数量</th>
				<th data-options="field:'sellprice',width:80,align:'center',editor:'numberbox'">价格</th>
			</tr>
		</thead>
	</table>
 	<div id="tb" style="height:auto">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true" onclick="add();"></a>
	</div> 
	</div>
	<!-- ----入库信息------- -->
<div style="float:left;width:318px;margin-left:5px;margin-left: 5px;">
    <table id="dg" class="easyui-datagrid" title="库位信息" style="width:318px;height:280px"
			data-options="
				iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tbrk',
				url: 'datagrid_data1.json',
				method: 'get',
				onClickRow: onClickCell
			">
		<thead>
			<tr>
				<th data-options="field:'id',width:120,align:'center',editor:'numberbox',hidden:'true'">id</th>
				<th data-options="field:'number',width:120,align:'center',editor:'numberbox'">数量</th>
				<th data-options="field:'kw',width:120,align:'center',editor:'text'">库位</th>
			</tr>
		</thead>
	</table>
 	<div id="tbrk" style="height:auto">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append();">新增</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="saveKwXx()">保存</a>
	</div> 
	</div>

</body>

<!-- End Panel Other -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flcgdan-inport.js" ></script>
</html>