<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>小程序订单配货信息列表</title>
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
                    <form class="form-horizontal m-t" id="orderhandlelogForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">订单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="ordercode"  id="ordercode" type="text" placeholder="订单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode"  id="batchcode" type="text" placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">发货单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="fhordercode"  id="fhordercode" type="text" placeholder="发货单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7" >
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="storeid" id="storeid">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparestatus">配货状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="preparestatus" id="preparestatus">
                                    <option></option>
                                    <option value="0">默认</option>
                                    <option value="1">拣货开始</option>
                                    <option value="2">拣货中</option>
                                    <option value="3">拣货完成</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">订单状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name = "orderstatus" id = "orderstatus">
                                    <option ></option>
                                    <option value="3">待发货</option>
                                    <option value="4">已备货</option>
                                    <option value="5">已发货</option>
                                    <option value="9">撤单</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="iscreateFhorder">合成发货单：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="isCreateFhorder" id="isCreateFhorder">
                                    <option></option>
                                    <option value="0">未合成</option>
                                    <option value="1">已合成</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="handlelx">处理类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="handlelx" id="handlelx">
                                    <option></option>
                                    <option value="0">待处理</option>
                                    <option value="5">入仓</option>
                                    <option value="9">无货</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchtype" class="">产品类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="batchtype" name="batchtype" class="form-control">
                                    <option></option>
                                    <option value='1'>服装</option>
                                    <option value='2'>童装</option>
                                    <option value='3'>鞋子</option>
                                    <option value='4'>辅料</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="ordertype">订单类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="ordertype" id="ordertype">
                                    <option></option>
                                    <option value="1">正常</option>
                                    <option value="2">赠送</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparelx">配货类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="preparelx" id="preparelx">
                                    <option></option>
                                    <option value="1">首次配货</option>
                                    <option value="2">补货配货</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="ordercreatetime">订单创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="ordercreatetime" id="ordercreatetime">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="handletime">拣货处理时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="handletime" id="handletime">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="jhprinttime">拣货打印时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="jhprinttime" id="jhprinttime">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                    </div>
                    <table class="table" id="table" data-height="528" data-mobile-responsive="true">

                    </table>
                    <div>
                        <i class="fa fa-square text-warning">待发货</i>
                        <i class="fa fa-square text-success">已备货</i>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/orderhandlelog.js"></script>
</body>

</html>