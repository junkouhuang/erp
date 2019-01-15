<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新增采购单</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script> 
</head>

<body>
<div class="page-container">
	<fieldset>
		<form action="" id="frm">
			<table class="table mb-0" >
				<tr>
				<td width="80" class="glyphicon-asterisk">单据号：</td><td><input type="text" name="ordercode" id="ordercode" readonly="true" class="form-control radius" onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')"></td>
				<td  width="80"  class="glyphicon-asterisk">采购时间：</td><td><input type="text" name="cgsj" id="cgsj"  class="time1 form-control  radius"  ></td>
				<td  width="100"  class="glyphicon-asterisk">供应商： </td><td> <select  id="gysmc" class=" radius form-control"  name="gysmc"></select></td>
				</tr>
				<tr>
				<td  class="glyphicon-asterisk">采购人：</td><td>  <input type="text" name="jbrmc"  id="jbrmc"  class="form-control radius" ></td>
	      		<td  class="glyphicon-asterisk">预计到货时间：</td><td><input type="text" name="yjdhsj" id="yjdhsj"  class="time3 form-control  radius"  ></td>
				<td  class="glyphicon-asterisk">预计发货时间：</td><td><input type="text" name="yjfhsj" id="yjfhsj" class="time2 form-control  radius"  ></td>
				</tr>
	      		<tr>
	      		<td>备注：</td><td><input type="text" name="bz" id="bz"  class="form-control radius"></td>
				<td  width="100"  class="glyphicon-asterisk">品牌商： </td><td> <select  id="cgtradeid" class=" radius form-control"  name="cgtradeid"></select></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<div style="min-width:694px;margin-left:3px;">
	<table id="dg" style="width:99%;height:150px" iconCls="icon-edit" singleSelect="true" idField="itemid"  method="get" toolbar="#tb">
		<thead>
			<tr>
				<th data-options="field:'pid',width:160,align:'center',hidden:'true'">pid</th>
				<th data-options="field:'cpmc',width:160,align:'center',editor:'text'">产品名称</th>
				<th data-options="field:'cpsl',width:80,align:'center',editor:'numberbox'">数量</th>
				<th data-options="field:'dj',width:80,align:'center',editor:'numberbox'">单价</th>
				<th data-options="field:'je',width:80,align:'center',editor:'numberbox'">金额</th>
				<th data-options="field:'lb',width:120,align:'center'">物料类别</th>
				<th data-options="field:'add',width:120,align:'center'"></th>
				<th data-options="field:'cgitemno',width:120,align:'center'">采购编号</th>
				<th data-options="field:'historyitemno',width:120,align:'center',editor:'text'">原始采购编号</th>
			</tr>
		</thead>
	</table>	
</div>
<div id="tb" style="height:auto">
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">新增</a>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
</div>
</body>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgd-add.js" ></script> 
</html>