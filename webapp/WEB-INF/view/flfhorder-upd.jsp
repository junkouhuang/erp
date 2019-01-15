<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>喜乐库ERP-采购单管理新增界面-</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    
    <jsp:include page="cssPage.jsp"></jsp:include>
    
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
    
</head>

<body onload="Init()">
<div class="page-container" >
	<fieldset>
		<form action="" name="frm" > 
			<table class="table mb-0" >
				<tr>
					<td width="50">门店:</td>
					<td style="position:relative;">
						<!-- <input  name="txt" onkeyup="SelectTip(0)" onclick="clickTip()" class="form-control radius" onkeydown="keydownTip()" placeholder="" id="store1"/>
						<span style="display:none; position: fixed; z-index: 9999;" id="slectTip" >
							 <span id="demo" >
								 <select  id="store" name="demo" style="width:186px" size=10  onchange="txt.value=options[selectedIndex].text;"  onclick="stroreTip(event)" class="form-control radius" >
								 </select>
							 </span>
						 </span> -->
						  <select class="combobox form-control" name="store" id="store"   onchange="selectOnchang(this)">
						 </select>
					</td> 
					<td  width="100">辅料发货单号:</td>
					<td><input type="text" name="flfhcode" id="flfhcode" class="form-control radius" onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')"  readonly="readonly" placeholder=""></td>
	      			<td  width="50">备注:</td>
	      			<td  width="100"><input type="text" name="" id="bz" class="form-control radius" placeholder=""></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<div style="width:99%;" class="ml-5 mr-5">
		<table id="dg" class="easyui-datagrid"  style="width:100%;min-height:300px;"
				data-options="
					iconCls: 'icon-edit',
					singleSelect: true,
					method:'get',
					rownumbers:true,
					toolbar: '#tb',
					onClickCell: onClickCell
				">
			<thead>
				<tr>
					<th data-options="field:'id',width:80,align:'center',editor:'textbox',hidden:'true'">id</th>
					<th data-options="field:'flid',width:80,align:'center',editor:'textbox',hidden:'true'">flid</th>
					<th data-options="field:'flcode',width:80,align:'center'">辅料编号</th>
					<th data-options="field:'categroymc',width:120,align:'center'">辅料</th>
					<th data-options="field:'number',width:80,align:'center',editor:'numberbox'">数量</th>
					<th data-options="field:'sellprice',width:80,align:'center'">价格</th>
					<th data-options="field:'sellrate',width:80,align:'center',editor:'numberbox'">折扣</th>
				</tr>
			</thead>
		</table>
 </div>
<div id="tb" style="height:auto;z-index:-1;">
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="openFlbomb();">选择辅料</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="openFlmoban();">选择辅料模板</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
</div>

</body>

<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flfhorder-upd.js" ></script>
</html>