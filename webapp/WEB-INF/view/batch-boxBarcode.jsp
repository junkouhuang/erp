<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js"></script>
	 <link rel="stylesheet" href="${pageContext.request.contextPath}/js/jquery-ui-1.12.1/jquery-ui.css">
 
  <style>
  #feedback { font-size: 1.4em; }
  #selectable .ui-selecting { background: #FECA40; }
  #selectable .ui-selected { background: #F39814; color: white; }
  #selectable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
  #selectable li { margin: 3px; padding: 0.4em; }
  </style>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <base target="_blank">
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
	<div>
		<a href="javascript:void(0)" class="easyui-linkbutton ml-5 mt-5 mb-5" onclick="addBoxNumber()">增加箱数</a>
		<a href="javascript:void(0)" class="easyui-linkbutton ml-5 mt-5 mb-5" onclick="printBoxBracode()">打印</a>
		<a href="javascript:void(0)" class="easyui-linkbutton ml-5 mt-5 mb-5" onclick="offWindows()">取消</a>
        <input  id="packagecode" name="packagecode" style="margin: 0px;padding-top: 0px;padding-bottom: 0px;height: 25px;line-height: 25px;width: 152px;border-radius: 5px;"  data-options="validType:'text',prompt:'包号搜索',width:154" ></input>
        <span id="total" style="font-weight: bold" disabled></span>
	</div>

	<div class="easyui-panel" style="height:470px;padding:5px;">
            <table id="package-tb" class="easyui-datagrid" style="width:400px;height:450px"
                   data-options="singleSelect: false,ctrlSelect:'true',rownumbers:'true',idField:'id'">
                <thead>
                <tr>
                    <th data-options="field:'id',hidden:'true'">主键</th>
                    <th data-options="field:'packagecode',width:200">包号</th>
                </tr>
                </thead>
            </table>
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
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-boxBarcode.js" ></script>
  <script>

  </script>

</html>