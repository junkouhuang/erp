<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次购发销</title>
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
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                        <form class="form-horizontal m-t"  id="commentForm" >
							<div class="page-header">
								<h1>批次购发报销表</h1>
								<label for="inputEmail3" class=" control-label  pt-10 singleBathc" style=" padding-top: 8px;">批次号：</label>
							</div>
                        	<div class="row inputFrameParent">
							      <div class="col-lg-2 col-md-3">
							        <input class="form-control" type="text"> 
							      </div>
							</div>
                            <br/>
                            <br/>
                            <div class="page-header">
                                <label for="inputEmail3" class=" control-label  pt-10" style=" padding-top: 8px;">批量输入批次号：</label>
                            </div>
                            <div class="row multiBatchCode">
                                <div class="col-lg-2 col-md-3">
                                    <textarea type="text" placeholder="批量输入批次号（以空格或回车间隔每一个批次号）" class="form-control" style="min-width: 500px ; min-height: 200px; margin-bottom: 10px;font-family: Monaco, Fixed"></textarea>
                                </div>
                            </div>
                        </form>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                    <button type="button" class="btn btn-outline btn-default" id="excelexport">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <table id="dhtable" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                        <!-- End Example Events -->
                        <div class="detail-content">
                        	 <table id="detailtable" data-height="510" data-mobile-responsive="true">
                                </table>
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
	<script src="${pageContext.request.contextPath}/js/batchgfxreport.js"></script>
</body>
</html>