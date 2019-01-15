<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发货单发货件数统计报表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <link href="${pageContext.request.contextPath}/css/cross.css" rel="stylesheet">
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>
<body onkeypress="if (event.keyCode == 13) _search()">
<div class="page-container">
    <div class="ibox ">
        <!-- Example Events -->
        <div class="ibox-title">
            <div class="accordion-group">
                <div id="collapseTwo" class="accordion-body">
                    <div class="accordion-inner">
                        <form class="form-horizontal m-t">
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="time" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">绑定时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="storeid">门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="storeid" id="storeid">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1group">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingFhordersList()"/>
                            </div>
                        </form>
                    </div>
                    <div class="ibox-content ">
                        <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                            <button class="btn btn-warning glyphicon glyphicon-share-alt" onclick="exportFhshipmentsExcel()">导出发货件数统计报表</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <table id="tbody" data-height="520" data-mobile-responsive="true"
                   class="table table-striped table-hover table-bordered"
                   style="word-break:break-all; word-wrap:break-all;">
            </table>
            <div>
                <i class="fa fa-square text-warning">待处理</i>
                <i class="fa fa-square text-success">打印分拣</i>
                <i class="fa fa-square text-navy">财务审核</i>
                <i class="fa fa-square text-gold">物流发货</i>
                <i class="fa fa-square text-info">门店收货</i>
                <i class="fa fa-square text-MediumPurple">总部撤单</i>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/fhshipments.js"></script>
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript" ></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
</body>
</html>