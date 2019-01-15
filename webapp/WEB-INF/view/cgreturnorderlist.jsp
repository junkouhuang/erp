<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购退货单列表</title>
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
                    <form class="form-horizontal m-t" id="cgreturnorderForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">退货单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="ordercode" id="ordercode" type="text" placeholder="采购退货单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">新增者：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="adduname" id="adduname" type="text" placeholder="新增者">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="time" id="time">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="gysid" class="">供应商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="gysid" name="gysid" class="form-control">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="traderid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="tradeid" id="tradeid">
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="whsid" class="">仓库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="whsid" name="whsid" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-success glyphicon glyphicon-plus" onclick="addCgReturnOrder()">新增</button>
                    </div>
                    <table class="table" id="table" data-height="528" data-mobile-responsive="true">
                    </table>
                    <div>
                        <i class="fa fa-square text-warning">默认</i>
                        <i class="fa fa-square text-success">已扫描</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgreturnorderlist.js"></script>
</body>

</html>