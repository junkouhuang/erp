<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>催款单列表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">

        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="form-horizontal m-t" id="orderlistForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">绑定号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="wxamountcode" id="wxamountcode" type="text"
                                       placeholder="绑定号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="store" id="store">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="status" id="status">
                                    <option></option>
                                    <option value="0">待处理</option>
                                    <option value="1">客服审核</option>
                                    <option value="3">财务审核</option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-3 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="search()">
                            </div>

                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-primary glyphicon glyphicon-check" onclick="cusAuditWxAmount()">客服审核</button>
                        <button class="btn btn-danger glyphicon glyphicon-check" onclick="cwAuditWxAmount()">
                            财务审核
                        </button>
                        <button type="button" onclick="exportContrastExcel();" class="btn btn-success">
                            <i class="glyphicon glyphicon-share-alt" aria-hidden="true">导出下单明细</i>
                        </button>
                    </div>
                    <table class="table" id="table" data-height="510" data-mobile-responsive="true">

                    </table>
                    <div>
                        <i class="fa fa-square text-success">待发货</i>
                        <i class="fa fa-square text-navy">客服审核</i>
                        <i class="fa fa-square text-danger">财务审核</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/wxamountlist.js"></script>
</body>

</html>