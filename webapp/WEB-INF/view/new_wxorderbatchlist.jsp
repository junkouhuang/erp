<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信订单批次关联列表</title>
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
                                <label for="inputEmail3" class="">订单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="ordercode" id="ordercode" type="text"
                                       placeholder="订单号">
                            </div>

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">发布号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="fbcode" id="fbcode" type="text"
                                       placeholder="发布号">
                            </div>

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode" id="batchcode" type="text"
                                       placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="isCreateFhorder">合成发货单：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="isCreateFhorder" id="isCreateFhorder">
                                    <option></option>
                                    <option value="0">已合成</option>
                                    <option value="1">未合成</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="status" id="status">
                                    <option></option>
                                    <option value="3">待发货</option>
                                    <option value="5">已发货</option>
                                    <option value="9">已撤单</option>
                                </select>
                            </div>

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="store" id="store">
                                </select>
                            </div>

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="baudied">是否完成：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="baudied" id="baudied">
                                    <option></option>
                                    <option value="1">完成</option>
                                    <option value="0">缺货</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="isPcCreateFhOrder">生成方式：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="isPcCreateFhOrder" id="isPcCreateFhOrder">
                                    <option></option>
                                    <option value="0">单独生成发货单</option>
                                    <option value="1">按批次统一生成发货单</option>
                                </select>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="search()">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                       <%-- <button class="btn btn-danger glyphicon glyphicon-plus" onclick="addWxNoOrderFhorder()">合成发货单
                        </button>--%>
                        <button class="btn btn-info glyphicon glyphicon-remove" onclick="revokeWxOrderBatch()">撤销订单批次
                        </button>
                      <%--  <button class="btn btn-danger glyphicon glyphicon-plus" onclick="addWxNoOrderFhorders()">
                            完貨批次統一合成发货单
                        </button>--%>
                        <button type="button" onclick="exportWxorderBatchInfo();" class="btn btn-success">
                            <i class="glyphicon glyphicon-share-alt" aria-hidden="true">导出批次下单信息</i>
                        </button>
                    </div>
                    <table class="table" id="table" data-height="510" data-mobile-responsive="true">

                    </table>
                    <div>
                        <i class="fa fa-square text-success">待发货</i>
                        <i class="fa fa-square text-danger">已发货</i>
                        <i class="fa fa-square text-info">已撤单</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/new_wxorderbatchlist.js"></script>
</body>

</html>