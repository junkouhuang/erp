<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网络订单拣货明细</title>
    <link rel="shortcut icon" href="favicon.ico">

    <jsp:include page="cssPage.jsp"></jsp:include>

    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="pt-5">
<div style="float:left;" class="ml-10">
    <table id="packageMap" class="easyui-datagrid" title="小包" style="width:350px;height: 450px;float:left;"
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
            <th data-options="field:'packageid',hidden:true"></th>
            <th data-options="field:'packagecode',width:150,align:'center',editor:'textbox'">包号</th>
            <th data-options="field:'len',width:130,align:'center',editor:'textbox'">数量</th>
        </tr>
        </thead>
    </table>
</div>
<div style="float:left;" class="ml-10">
    <table id="spxxMap" class="easyui-datagrid" title="物料" style="width:520px;height: 450px" data-options="
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
            <th data-options="field:'je',width:60,align:'center',editor:'textbox'">金额(折后)</th>
            <th data-options="field:'sl',width:50,align:'center',editor:'textbox'">数量</th>
        </tr>
        </thead>
    </table>
    <div style="display: none;">
        <table border="1" class="exceltable" style="border-collapse: collapse;border:0px;"></table>
    </div>
</div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/jquery-excel/jquery.table2excel.js"></script>
<script src="${pageContext.request.contextPath}/js/wxorder-jhdetail.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/jspdf.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/jquery.base64.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/tableExport/tableExport.js"></script>
</html>