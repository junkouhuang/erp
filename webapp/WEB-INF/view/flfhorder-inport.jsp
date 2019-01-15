<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料发货</title>
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
			<table class="table mb-0">
				<tbody>
				<tr>
					<td width="120">辅料发货单号：</td><td><input type="text" name="flfhcode" id="flfhcode" class="form-control radius" readonly="readonly"></td>
					<td width="60">门店：</td>
					<td style="position:relative;">
						<!-- <input  name="txt" onkeyup="SelectTip(0)" onclick="clickTip()" class="form-control radius" onkeydown="keydownTip()" placeholder="" id="store1" readonly="readonly"/>
						<span style="display:none; position: fixed; z-index: 9999;" id="slectTip" >
							 <span id="demo" >
								 <select  id="store" name="demo" style="width:186px" size=10  onchange="txt.value=options[selectedIndex].text;"  onclick="stroreTip(event)" class="form-control radius" >
								 </select>
							 </span>
						 </span> -->
						 <select  id="store" class="form-control radius"  disabled="disabled"></select>
					</td> 
	      		</tr>
	      		<tr>
	      		<td width="60">备注：</td><td><input type="text" name="" id="bz" class="form-control radius" readonly="readonly"></td>
	      		</tr>
	      	</tbody></table>
	</form>
	</fieldset>
</div>
<!-- ----辅料发货明细------- -->
<div style="width:99%;margin-left:3px;">
<div style="float:left;width:400px;margin-left: 2px;">
    <table id="flfhmx" class="easyui-datagrid" title="发货明细" style="width:100%;height:250px"
			data-options="
				iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tb',
				url: 'datagrid_data1.json',
				method: 'get',
				<!-- rownumbers: true, -->
				onClickRow: onClickRow
			">
		<thead>
			<tr>
				<th data-options="field:'flcode',width:90,align:'center'">辅料编号</th>
				<th data-options="field:'categroymc',width:110,editor:'text',align:'center'">辅料</th>
				<th data-options="field:'number',width:50,align:'center',editor:'text',align:'center'">数量</th>
				<th data-options="field:'sellprice',width:50,align:'center',editor:'text',align:'center'">价格</th>
				<th data-options="field:'sellrate',width:40,align:'center',editor:'text',align:'center'">折扣</th>
				<th data-options="field:'actualnumber',width:50,align:'center',editor:'textbox'">实配</th>
			</tr>
		</thead>
	</table>
 	<div id="tb" style="height:auto">
			<%--<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="autoPh()">自动配货</a>--%>
	<!-- 		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cut',plain:true" onclick="autoPh()">实配数量</a> -->
	</div>
	</div>
	<!-- ----库位信息------- -->
<div style="float:left;width:278px;margin-left:6px;">
    <table id="kwmx" class="easyui-datagrid" title="库位信息" style="width:100%;height:250px"
			data-options="
				iconCls: 'icon-edit',
				toolbar: '#tbrk',
				fitColumns: true,
				<!-- rownumbers: true, -->
			   checkOnSelect:true,
		       selectOnCheck:true,
			   showFooter: true
			">
	</table>
 	<div id="tbrk" style="height:auto">
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="saveKwXx()">保存</a>
	</div> 
	</div>
	</div>

</body>

 <jsp:include page="jsPage.jsp"></jsp:include>
 <script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flfhorder-inport.js" ></script>
</html>