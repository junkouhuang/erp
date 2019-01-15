<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<script type="text/javascript">
    var pageContext="${pageContext.request.contextPath}";
</script>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>调货单管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">

    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <base target="_blank">

</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                          <div class="row">
                        	<div class="row" >
                        		 <div class="col-lg-1 col-md-1  text-right pt-7" >
								     <label for="inputEmail3" >创建日期：</label>
								  </div>
							      <div class="col-lg-2 col-md-2 ">
							         <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="time">
							      </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="storeid">门店：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <select class="combobox form-control" name="storeid" id="storeid">
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <label><input name="storelx" type="checkbox" value="3" />直营店</label>
                                    <label><input name="storelx" type="checkbox" value="0" />加盟店</label>
                                </div>
							      <div class="col-xs-2">
							        <button type="button" class="btn btn-primary  layer-date" onclick="LoadingDataListOrderRealItems();">调货单查询</button>
							      </div>
							</div>
							</div>
                        </div>
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                    <button type="button" onclick="printStoreReport();" class="btn btn-outline btn-default">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                                    </button>
                                     <button type="button" class="btn btn-outline btn-default" onclick="addDL()">
                                       新增
                                    </button>

                                    <button class="btn btn-outline btn-default" onclick="createAudit()">
                                        客服审核
                                    </button>

                                    <button class="btn btn-outline btn-default" onclick="financeAudit()">
                                        财务审核
                                    </button>

                                    <button class="btn btn-outline btn-default" onclick="exportExcel()">
                                        导出Excel表格
                                    </button>

                                </div>

                                <table class="tab_css_1" id="dhtable" data-height="510" data-mobile-responsive="true">
                                </table>
                        </div>
                        <!-- End Example Events -->
                    </div>
        </div>
    </div>
        </div>
    <!-- End Panel Other -->
    <!-- 全局js -->
    <jsp:include page="jsPage.jsp"></jsp:include>
    <script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/storedhlist.js"></script>
</body>

</html>