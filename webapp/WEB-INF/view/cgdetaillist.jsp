<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购明细界面</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="m-t" id="cgdetaillistFrom">
                        <div class="row form-horizontal" >
                            <label for="inputEmail3"   class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >采购日期：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="time"  id="time">
                            </div>
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >采购单号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cgOrderCode" name="cgOrderCode" type="text" placeholder="采购单号" >
                            </div>
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >产品名称：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cpmc" name="cpmc" type="text" placeholder="产品名称" >
                            </div>
                            <label for="inputEmail3" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >采购编码：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cgitemno" name="cgitemno" type="text" placeholder="采购编码" >
                            </div>
                        </div>
                        <br/>
                        <div class="row form-horizontal" >
                            <label for="inputEmail3" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >原始采购编号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="historyitemno" name="historyitemno" type="text" placeholder="原始采购编号" >
                            </div>
                            <label for="inputEmail3" class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >供应商：</label>
                            <div class="col-lg-2 col-md-2 ">
                                <select placeholder="请选择供应商" id="gysid" class=" radius form-control"  name="gysid"></select>
                            </div>
                            <div class="col-lg-3 col-md-3  col-sm-3 col-xs-3">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-success" onclick="openReceipt();" >收货清点</button>
                    </div>
                    <table  class="tab_css_1" id="cgdetaillist_table" data-height="520" data-mobile-responsive="true" >
                    </table>
                    <div>
                        <i class="fa fa-square text-navy">收货清点</i>
                    </div>
                </div>
                <!-- End Example Events -->
                <div class="detail-toolbar"></div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgdetaillist.js" ></script>
</body>

</html>