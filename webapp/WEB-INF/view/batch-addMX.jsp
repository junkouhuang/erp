<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>明细操作</title>
    <link rel="shortcut icon" href="favicon.ico">

 	<jsp:include page="cssPage.jsp"></jsp:include>

     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>

    <style>
    	.tabs-container .panel-body {padding:0;}
    </style>
</head>

<body style="overflow:hidden;">
	<div class="easyui-tabs" style="width:99%;height:408px;margin-left:4px;">
		<div title="明细" style="padding:1px">
			<table id="dg" class="easyui-datagrid" data-options="onClickCell: onClickCell,onAfterEdit: onAfterEdit,width:550,height:373,singleSelect:true,">
				<thead>
					<tr>
						<th data-options="field:'id',width:90,align:'center',hidden:true">id</th>
						<th data-options="field:'ysid',width:90,align:'center',editor:'numberbox'">颜色序号</th>
						<th data-options="field:'ys',width:90,editor:'text',align:'center',align:'center'">颜色</th>
						<th data-options="field:'cmcode',width:90,align:'center',align:'center'">尺码</th>
						<th data-options="field:'cm',width:90,align:'center',align:'center'">尺码名称</th>
						<%--<th data-options="field:'jdsl',width:90,align:'center',editor:'numberbox',align:'center'">数量</th>--%>
						<th data-options="field:'jdsl',width:90,align:'center',align:'center'">数量</th>
						<th data-options="field:'cz',width:98,align:'center',editor:'',align:'center'">操作</th>
					</tr>
				</thead>
			</table>
			<a href="#" class="easyui-linkbutton" class="fa  fa-barcode" style="width:90px;height:35px;position:absolute;top:10px;right:10px;" onclick="selCm()">
			<i class=" fa  fa-barcode" style=" font-size: 20px; position: relative; top: 3px;right: 3px;"></i>选择尺码</a>
		</div>
	</div>

	<div class="button" style="margin: 10px 0px; margin-left: 280px;">
		<button type='button' class='btn btn-primary' onclick='closeWindows()'>取消</button>
		<button type='button' class='btn btn-success' onclick='saveMx()'>追加</button>
	</div>

	<div id="cm" style="width:500px;height:330px;padding-left:4px">
	<table id="mm" class="easyui-datagrid" style="width:500px;height:330px"
			data-options="toolbar: '#tb',url:' ${pageContext.request.contextPath}/sizeInfoController/selectSizeinfos',method:'post',selectOnCheck: true,rownumbers:'true'" >
	</table>
	<div id="tb" style="height:auto">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appendSizeinfo()">增加</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeSizeinfo()">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-print',plain:true" onclick="printSizeinfos()">打印</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="accept()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true" onclick="cancel()">退出</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true" ><label><input id="disabled" checked="checked"  type="checkbox" style="position: relative;top: 2px;"/>显示禁止</label></a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true" >
			<select style="width:120px;height:25px;" id="cmlxs"></select>
		</a>
	</div>
	</div>

<jsp:include page="jsPage.jsp"></jsp:include>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-addMX.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/utils/JSUtils.js"></script>
</body>
</html>