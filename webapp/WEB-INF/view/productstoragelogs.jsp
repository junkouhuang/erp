<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品生产入库记录</title>
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
                                <label for="time">生产入库时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name ="time" type="text" placeholder="请选择时间段" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="spcode" class="">款号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="spcode"  id="spcode" type="text" placeholder="款号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="spmc" class="">品名：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="spmc"  id="spmc" type="text" placeholder="款号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="optuname" class="">操作员：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="optuname"  id="optuname" type="text" placeholder="操作员">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="whsid" class="">仓库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="whsid" name="whsid" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="kwtraderid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select name="kwtraderid" class="combobox form-control" name="kwtraderid" id="kwtraderid">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="cgOrderCode" class="">采购单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="cgOrderCode"  id="cgOrderCode" type="text" placeholder="采购单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="cgitemno" class="">采购编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="cgitemno"  id="cgitemno" type="text" placeholder="采购编码">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="splx" class="">货品类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="splx" name="splx" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">大货</option>
                                    <option value="1">样板</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="fjworkcode" class="">采购分拣单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="fjworkcode"  id="fjworkcode" type="text" placeholder="采购分拣单号">
                            </div>
                            <div class="col-lg-2 col-md-3 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-primary glyphicon glyphicon-share-alt" onclick="exportProductionStorageLogsToExcel()">导出记录 </button>
                        <button class="btn btn-danger glyphicon glyphicon-trash" onclick="deleteProductionStorageLogs()">删除入库记录 </button>
                    </div>
                    <table class="productstoragelog_table" id="productstoragelog_table" data-height="510" data-mobile-responsive="true">

                    </table>
                </div>
                <!-- 工具条-->
                <div class="detail-toolbar">

                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/productstoragelogs.js"></script>
</body>

</html>