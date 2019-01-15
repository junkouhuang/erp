<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包装明细</title>
    <link rel="shortcut icon" href="favicon.ico">

    <jsp:include page="cssPage.jsp"></jsp:include>

    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="pt-5">
<div align="center" class="ml-10">
<div style="float:left;" class="ml-10">
    <table id="bigPackageList" class="easyui-datagrid" title="麻袋" style="width:200px;height: 450px;float:left;"
           data-options="
				iconCls: 'icon-tip',
						singleSelect: true,
						toolbar: '#tb1',
						method: 'get',
						rownumbers: true,
					   checkOnSelect:true,
					  selectOnCheck:true
					">
        <thead>
        <tr>
            <th data-options="field:'orderId',width:160,align:'center',editor:'textbox'">袋号</th>
        </tr>
        </thead>
    </table>
</div>
<div style="float:left;" class="ml-10">
    <table id="packageMap" class="easyui-datagrid" title="小包" style="width:400px;height: 450px;float:left;"
           data-options="
			         iconCls: 'icon-tip',
					singleSelect: true,
					toolbar: '#tb2',
					method: 'get',
					rownumbers: true,
				   checkOnSelect:true,
				   showFooter:true,  
				  selectOnCheck:true
				">
        <thead>
        <tr>
            <th data-options="field:'mc',width:120,align:'center',editor:'textbox'">名称</th>
            <th data-options="field:'batchcode',width:150,align:'center',editor:'textbox'">批次号</th>
            <th data-options="field:'len',width:90,align:'center',editor:'textbox'">数量</th>
        </tr>
        </thead>
    </table>
</div>
<div style="float:left;" class="ml-10">
    <table id="spxxMap" class="easyui-datagrid" title="拣货明细" style="width:500px;height: 450px" data-options="
			        	iconCls: 'icon-tip',
						singleSelect: true,
						toolbar: '#tb3',
						rownumbers: true,
						method: 'get'
					">
        <thead>
        <tr>
            <th data-options="field:'spmc',width:120,align:'center',editor:'textbox'">物料名称</th>
            <th data-options="field:'spcode',width:60,align:'center',editor:'textbox'">商品编码</th>
            <th data-options="field:'ys',width:50,align:'center',editor:'textbox'">颜色</th>
            <th data-options="field:'cm',width:60,align:'center',editor:'textbox'">尺码</th>
            <th data-options="field:'price',width:60,align:'center',editor:'textbox'">价格</th>
            <th data-options="field:'je',width:60,align:'center',editor:'textbox'">金额</th>
            <th data-options="field:'sl',width:50,align:'center',editor:'textbox'">数量</th>
        </tr>
        </thead>
    </table>
    <div style="display: none;">
        <table border="1" class="exceltable" style="border-collapse: collapse;border:0px;"></table>
    </div>
</div>
</div>
<div style="float:left;" class="ml-10">
    <table id="orderdetails" class="easyui-datagrid" title="下单信息" style="width:480px;height: 450px" data-options="
			        	iconCls: 'icon-tip',
						singleSelect: true,
						toolbar: '#tb3',
						rownumbers: true,
						method: 'get'
					">
        <thead>
        <tr>
            <th data-options="field:'spmc',width:120,align:'center',editor:'textbox'">物料名称</th>
            <th data-options="field:'batchcode',width:80,align:'center',editor:'textbox'">批次号</th>
            <th data-options="field:'ys',width:50,align:'center',editor:'textbox'">颜色</th>
            <th data-options="field:'cm',width:50,align:'center',editor:'textbox'">尺码</th>
            <th data-options="field:'price',width:50,align:'center',editor:'textbox'">价格</th>
            <th data-options="field:'je',width:50,align:'center',editor:'textbox'">金额</th>
            <th data-options="field:'sl',width:40,align:'center',editor:'textbox'">数量</th>
        </tr>
        </thead>
    </table>
    <div style="display: none;">
        <table border="1" class="exceltable" style="border-collapse: collapse;border:0px;"></table>
    </div>
</div>
<div style="clear:both;display:none;" id="htmlExportFhMx" class="ml-10"><a onclick="htmlExportFhMx();"><i
        class="glyphicon glyphicon-export"></i>导出发货明细(.xlsx)</a></div>
<div style="clear:both;display:none;" id="exportFhMx" class="ml-10"><a onclick="exportFhMx();"><i
        class="glyphicon glyphicon-export"></i>导出发货明细(.txt)</a></div>
<div style="clear:both;display:none;" id="exportExcelFhMx" class="ml-10"><a onclick="exportExcelFhMx();"><i
        class="glyphicon glyphicon-export"></i>导出发货明细(.xlsx)</a></div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/js/plugins/jquery-excel/jquery.table2excel.js"></script>
<script src="${pageContext.request.contextPath}/js/packingDetail.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/jspdf.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/jquery.base64.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/tableExport.js"></script>
</html>