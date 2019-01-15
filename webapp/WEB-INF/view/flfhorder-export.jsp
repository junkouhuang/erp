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
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body>
<div class="page-container">
    <fieldset>
        <form action="">
            <table class="table mb-0">
                <tbody>
	                <tr>
	                    <td width="110">辅料发货单号：</td>
	                    <td><input type="text" name="flfhcode" id="flfhcode" class="form-control radius"
	                               disabled="disabled"></td>
	                    <td width="55">门店：</td>
	                    <td><select id="store" disabled="disabled" class="form-control"></select></td>
	                    <td width="55">备注：</td>
	                    <td width="100"><input type="text" name="" id="bz" class="form-control radius" disabled="disabled">
	                    </td>
	                </tr>
	                <tr id="wlgsxx">
	                    <td width="110"> 物流公司：</td>
	                    <td><input type="text"  id="wlgs" name="wlgs" class="form-control radius" placeholder="请填写物流公司"></td>
	                </tr>
                </tbody>
            </table>
        </form>
    </fieldset>
</div>
<!-- ----辅料发货明细------- -->
<div style="float:left;width:99%;margin-left: 4px;" id="flfhmx">
    <table id="allot" class="easyui-datagrid"style="width:100%;height:250px"
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
            <th data-options="field:'flcode',width:100,align:'center',editor:'textbox'">辅料编号</th>
            <th data-options="field:'categroymc',width:150,align:'center',editor:'textbox'">辅料</th>
            <th data-options="field:'number',width:80,align:'center',editor:{type:'numberbox',options:{precision:1}}">
                数量
            </th>
            <th data-options="field:'sellprice',width:80,align:'center',editor:'numberbox'">价格</th>
            <th data-options="field:'sellrate',width:100,align:'center',editor:'numberbox'">折扣</th>
            <th data-options="field:'actualnumber',width:80,align:'center',editor:'numberbox'">实配</th>
            <th data-options="field:'price',width:100,align:'center',editor:'numberbox'">金额</th>
        </tr>
        </thead>
    </table>
    <div id="tb" style="height:auto;">
        <a onclick="exportExcelFhMx();"><i class="glyphicon glyphicon-export"></i>导出发货明细(.excel)</a>
    </div>
</div>
</body>
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/flfhorder-export.js"></script>
</html>