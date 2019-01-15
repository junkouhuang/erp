<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> 
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js"></script>
    <base target="_blank">
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
<!-- <div class="cl pd-5 bg-1 bk-gray "  style="min-width:371px; height:519px;" id="trademark"> 
		<span class="">
	        <a class="btn btn-success radius" data-title="增加" onclick="brandAdd()" href="javascript:;"> 增加</a>
		</span>
		<span class="">
	        <a class="btn btn-danger radius" data-title="删除" onclick="brandDelete('删除','brand-delete.do','1000','647')" href="javascript:;">删除</a>
		</span>
		<span class="">
	        <a class="btn btn-primary  radius" data-title="确定" onclick="brandConfirm('确定','brand-confirm.do','1000','647')" href="javascript:;"> 确定</a>
		</span>
		
		<div class="mt-10">
			<table  class=" table-border table-bordered table-striped table-hover text-c">
				<thead>
					<tr>
						<td style="    width: 10px;"></td>
						<td>序号</td>
						<td>品牌</td>
					</tr>
				</thead>
				<tbody class="brandContent" style="overflow-y:scroll;" id="brandContent">
					
				</tbody>
			</table>
		</div>
</div> -->
<table id="dg" class="easyui-datagrid" title="Row Editing in DataGrid" style="width:298px;height: 336px;"data-options="
		iconCls: 'icon-edit',
				singleSelect: true,
				toolbar: '#tb',
				url: 'datagrid_data1.json',
				method: 'get',
				onClickRow: onClickRow
			">
		<thead>
			<tr>
				<th data-options="field:'id',width:40,editor:'textbox'">序号</th>
				<th data-options="field:'itemid',width:220,align:'center',editor:'textbox'">品牌</th>
			</tr>
		</thead>
	</table>
 
	<div id="tb" style="height:auto">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">增加</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除</a>
	    <!-- <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="removeit()">确定</a> -->
	</div>	
	<div class="ml-10 mt-20">
	<a class="btn btn-primary radius" data-title="保存" onclick="saveCgd();" href="javascript:;" style="margin: 4px 0;">保存</a>
	<a class="btn btn-white" data-title="取消" onclick="offWindows()" href="javascript:;" style="margin: 4px 0;">取消</a>
	</div>

</body>
<!-- End Panel Other -->
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-brand.js" ></script>
</html>