<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信订单列表</title>
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
                                <label for="ordercode" class="">订单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="ordercode"  id="ordercode" type="text" placeholder="订单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchcode" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode"  id="batchcode" type="text" placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7" >
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="store" id="store">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">订单状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name = "status" id = "status">
                                    <option ></option>
                                    <option value="3">待发货</option>
                                    <option value="4">已备货</option>
                                    <option value="5">已发货</option>
                                    <option value="9">撤单</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="fhordercode" class="">发货单号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="fhordercode"  id="fhordercode" type="text" placeholder="发货单号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="baudied">完工状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="baudied" id="baudied">
                                    <option></option>
                                    <option value="1">完工</option>
                                    <option value="0">缺货</option>
                                </select>
                            </div>
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
                                <label for="time">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                            </div>
                        </div>
                        <br/>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparetype">配货类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="preparetype" id="preparetype">
                                    <option></option>
                                    <option value="1">首次配货</option>
                                    <option value="2">补货配货</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="iscreateFhorder">合成发货单：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="iscreateFhorder" id="iscreateFhorder">
                                    <option></option>
                                    <option value="0">未合成</option>
                                    <option value="1">已合成</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparestatus">退款状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="refundstatus" id="refundstatus">
                                    <option></option>
                                    <option value="0">待结算</option>
                                    <option value="1">全额退款</option>
                                    <option value="2">部分退款</option>
                                    <option value="3">已结清</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchname" class="">批次名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchname"  id="batchname" type="text" placeholder="批次名称">
                            </div>
                        </div>
                        <br/>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">退款时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="refundtime">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">拣货打印时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="jhprinttime">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="ordertype">订单类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="ordertype" id="ordertype">
                                    <option></option>
                                    <option value="1">需付款</option>
                                    <option value="2">赠送</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="angle" class="">视角：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="angle" name="angle" class="form-control">
                                    <option value="0">大众</option>
                                    <option value="1">跟单</option>
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
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="fblx" class="">批次发布类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="fblx" name="fblx" class="form-control">
                                    <option></option>
                                    <option value='0'>默认</option>
                                    <option value='1'>订货会</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="replenish" class="">会补货：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="replenish" name="replenish" class="form-control">
                                    <option></option>
                                    <option value='true'>是</option>
                                    <option value='false'>否</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchlx" class="">批次类型：</label>
                            </div>
                            <div class="col-lg-1 col-md-1">
                                <select id="batchlx" name="batchlx" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">新货</option>
                                    <option value="1">老货</option>
                                    <option value="2">订货</option>
                                </select>
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
                        <button class="btn btn-success glyphicon glyphicon-tasks" onclick="details()">订单详情</button>
                        <button class="btn btn-info glyphicon glyphicon-remove" onclick="revokeWxOrder()">撤销订单</button>
                        <button class="btn btn-danger glyphicon glyphicon-fire" onclick="bhprepare();">补货配货</button>
                        <button class="btn btn-danger glyphicon glyphicon-print" onclick="printBhJhOrder();">补货配货打印</button>
                        <button class="btn btn-info glyphicon glyphicon-remove" onclick="refundWxOrder()">订单退款</button>
                        <button class="btn btn-primary glyphicon glyphicon-th" onclick="getJhDetail();">包装明细</button>
                        <button class="btn btn-warning glyphicon glyphicon-share-alt" onclick="exportNotFhinfo();">导出未发货数据</button>
                        <button class="btn btn-success glyphicon glyphicon-retweet" onclick="maxmaraIdentifier();">无货标识</button>
                        <button class="btn btn-info glyphicon glyphicon-transfer" onclick="restartpicking();">拣货重扫</button>
                        <button class="btn btn-MediumPurple glyphicon glyphicon-remove" onclick="refundWxOrderLast()">拣货撤单</button>
                        <button class="btn btn-primary glyphicon  glyphicon-repeat" onclick="restartPrePare()">订单重配</button>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/wxorderlist.js"></script>
</body>

</html>