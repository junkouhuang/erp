<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料信息表</title>
       <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <base target="_blank">
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
    <style>
    .fixed-table-toolbar{display:none;}
    </style>
</head>

<body class="gray-bg">
    <div class="">
    <div class="row">
            <div class="col-sm-12">
                <div class=" ">
                        <div class="ibox-content">
                           		<div class="">
						            <form class="form-horizontal "  id="commentForm" >
										<table class="table" >
											<tr>
												<td width="90">编码：</td><td><input type="text" name="flcode" id="flcode" class="form-control radius"></td>
												<td width="90">辅料名：</td><td><input type="text" name="flmc" id="flmc" class="form-control radius"></td>
								      		</tr>
								      		<tr>
								      			<td>价格段：</td>
								      			<td><input type="text" name="categroymc"    id="categroymc"  class="form-control radius"></td>
								      			<td><span class="glyphicon glyphicon-resize-horizontal"></span></td>
								      			<td><input type="text" name="maxSellprice"  id="maxSellprice" class="form-control "></td>
								      			<td><input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()"></td>
								      		</tr>
							      	</table>
									</form>
						        </div>
                                <table id="flinfo_table" data-height="350" data-mobile-responsive="true">
                                </table>
                        </div>
                        
                        <!-- End Example Events -->
                        <div class="detail-content">
                        	 <table id="detailtable" data-height="400" data-mobile-responsive="true">
                                </table>
                        </div>
                        <div class="ml-10">
						<a class="btn btn-primary radius" data-title="保存" onclick="save();" href="javascript:;" style="margin: 4px 0;" id="saveDara">保存</a>
						<a class="btn btn-white" data-title="取消" onclick="offThisWindows()" href="javascript:;" style="margin: 4px 0;">取消</a>
						</div>
                    </div>
        </div>
    </div>
    </div>
    <!-- End Panel Other -->
    <!-- 全局js -->
    <script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
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
	<script src="${pageContext.request.contextPath}/js/flbomb.js"></script>
</body>
</html>