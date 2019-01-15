<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发货单管理</title>
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
                <div class="accordion-heading">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                        查询条件(一击展开，再击折叠)
                    </a>
                </div>
                <div id="collapseTwo" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <form class="form-horizontal m-t">
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="zdstatrtTime">制单开始：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="zdstatrtTime">
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="zdendTime">制单截止：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="zdendTime">
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="ordercode" class="">发货单号：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control layer-date" id="ordercode" type="text"
                                           placeholder="发货单号">
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="mdmc" class="">门店名称：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control " id="mdmc" type="text" placeholder="门店名称">
                                </div>
                            </div>
                            <!-- 第二行 -->
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="auditstartTime">审核开始：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="auditstartTime">
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="auditendTime">审核截止：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="auditendTime">
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="status" class="">单据状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="status" class="form-control">
                                        <option value="">全部</option>
                                        <option value="0">待处理</option>
                                        <option value="1">拣货单</option>
                                        <option value="2">财务审核</option>
                                        <option value="3">物流发货</option>
                                        <option value="4">门店收货</option>
                                        <option value="5">总部撤单</option>
                                    </select>
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="hasgoods" class="">拣货状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="hasgoods" class="form-control">
                                        <option value="">全部</option>
                                        <option value="0">待拣货</option>
                                        <option value="1">已拣货</option>
                                    </select>
                                </div>
                            </div>
                            <!-- 第三行 -->
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="fhbatchno" class="">发货批号：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control layer-date" id="fhbatchno" name="fhbatchno" type="text"
                                           placeholder="发货批号">
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="docaudit" class="">文件审核状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="docaudit" class="form-control">
                                        <option value="">全部</option>
                                        <option value="false">未审核</option>
                                        <option value="true">已审核</option>
                                    </select>
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="cusaudit" class="">客服审核状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="cusaudit" class="form-control">
                                        <option value="">全部</option>
                                        <option value="false">未审核</option>
                                        <option value="true">已审核</option>
                                    </select>
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="cusbind" class="">绑定审核状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="cusbind" class="form-control">
                                        <option value="">全部</option>
                                        <option value="0">未审核</option>
                                        <option value="1">已审核</option>
                                    </select>
                                </div>
                            </div>
                            <!-- 第四行 -->
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="printstartTime">打印开始：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="printstartTime">
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="printendTime">打印截止：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"
                                           id="printendTime">
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="printstatus" class="">打印状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="printstatus" class="form-control">
                                        <option value="">全部</option>
                                        <option value="0">未打印</option>
                                        <option value="1">打印</option>
                                    </select>
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="mdcode" class="">门店号：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control " id="mdcode" type="text" placeholder="门店号">
                                </div>
                            </div>
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="sourcetype" class="">发货单类型：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="sourcetype" class="form-control">
                                        <option value="">全部发货单类型</option>
                                        <option value="0">正常发货单</option>
                                        <option value="2">网络发货单</option>
                                        <option value="3">退货</option>
                                        <option value="4">新品未上架</option>
                                        <option value="5">新品可挑上架</option>
                                        <option value="6">特殊类型</option>
                                    </select>
                                </div>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="wxjhprint" class="">拣货打印状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="wxjhprint" class="form-control">
                                        <option value="">全部打印状态</option>
                                        <option value="true">已打印</option>
                                        <option value="false">未打印</option>
                                    </select>
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="batchcode" class="">批次号：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control layer-date" id="batchcode" type="text"
                                           placeholder="批次号">
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="batchcode" class="">备注：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control layer-date" id="bz" type="text"
                                           placeholder="备注">
                                </div>
                            </div>
                            <div class="form-group form-group-sm">
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="whsid" class="">仓库：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="whsid" class="form-control">
                                        <option value="">所有仓库</option>
                                        <option value="1">石岩</option>
                                        <option value="2">蛇口</option>
                                        <option value="3">凤岗</option>
                                        <option value="4">福建分仓</option>
                                        <option value="5">浙江分仓</option>
                                        <option value="6">成都分仓</option>
                                        <option value="7">福州分仓</option>
                                    </select>
                                </div>
                                <div class="col-lg-1 col-md-1  text-right pt-7">
                                    <label for="traderid">品牌商：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select class="combobox form-control" name="traderid" id="traderid">
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
                                <div class="col-lg-1 col-md-1">
                                    <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                           onclick="LoadingFhordersList()"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="ibox-content" STYLE="padding: 5px 20px 20px 20px">
            <div class="btn-group" id="exampleTableEventsToolbar" role="group">
                <button type="button" onclick="printPicking()" class="btn btn-primary">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">拣货单打印</i>
                </button>
                <button type="button" onclick="docAudit();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-hdd" aria-hidden="true">文件审核</i>
                </button>
                <button type="button" onclick="cusAudit();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-hdd" aria-hidden="true">催款确认</i>
                </button>
                <button type="button" onclick="fhbatchBind();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-hdd" aria-hidden="true">批号绑定</i>
                </button>
                <button type="button" onclick="reviewfh();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-hdd" aria-hidden="true">财务审核</i>
                </button>
                <%--<button type="button" onclick="printFhOrderReportBase()" class="btn btn-warning">--%>
                <%--<i class="glyphicon glyphicon-print" aria-hidden="true">发货单打印</i>--%>
                <%--</button>--%>
                <%--<button type="button" onclick="printConfirm();" class="btn btn-warning">--%>
                <%--<i class="glyphicon glyphicon-bullhorn" aria-hidden="true">打印确认</i>--%>
                <%--</button>--%>
                <button type="button" onclick="selectLogistics();" class="btn btn-warning">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">物流单打印</i>
                </button>
                <button type="button" onclick="registerLogistics();" class="btn btn-warning">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">登记物流</i>
                </button>
                <button type="button" onclick="stockOut();" class="btn btn-warning">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">不贵出库</i>
                </button>
                <%-- <button type="button" onclick="wxdocAudits();" class="btn btn-success">
                    <i class="glyphicon glyphicon-check" aria-hidden="true">批量网络文件组审核</i>
                </button>
                <button type="button" onclick="printWxorders();" class="btn btn-success">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">批量网络拣货打印</i>
                </button>--%>
                <button type="button" onclick="fhconvertReturn();" class="btn btn-primary">
                    <i class="glyphicon glyphicon-repeat" aria-hidden="true">发货转退货</i>
                </button>
                <button type="button" onclick="fhorderTransfer();" class="btn btn-info">
                    <i class="glyphicon glyphicon-refresh" aria-hidden="true">发货单转让</i>
                </button>
                <button type="button" onclick="createForwardFhOrderByfhid();" class="btn btn-info">
                    <i class="glyphicon glyphicon-plus" aria-hidden="true">转为退货无订单</i>
                </button>
            </div>
            <div class="btn-group btn-group-sm" id="1111" role="group">
                <button type="button" onclick="openAddNoOrderFhorder();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-plus icon-plus" aria-hidden="true">无订单</i>
                </button>
                <%-- <button type="button" onclick="printFhOrderReport()" class="btn btn-danger">
                     <i class="glyphicon glyphicon-leaf" aria-hidden="true">首批打印</i>
                 </button>--%>
                <button type="button" onclick="printFhOrderListReport()" class="btn btn-danger">
                    <i class="glyphicon glyphicon-leaf" aria-hidden="true">发货单打印</i>
                </button>
                <button type="button" onclick="packingDetail();" class="btn btn-success">
                    <i class="glyphicon glyphicon-th" aria-hidden="true">包装明细</i>
                </button>
                <button type="button" onclick="edtfhinfo();" class="btn btn-info">
                    <i class="glyphicon glyphicon-heart" aria-hidden="true">修改收货信息</i>
                </button>
                <button type="button" onclick="selectSppackage();" class="btn btn-success">
                    <i class="glyphicon glyphicon-th" aria-hidden="true">查询包号去向</i>
                </button>
                <button type="button" onclick="selectFhmxOddByBigpackagecode();" class="btn btn-success">
                    <i class="glyphicon glyphicon-th" aria-hidden="true">查询大包明细</i>
                </button>
                <button type="button" onclick="cusLogistice();" class="btn btn-success">
                    <i class="glyphicon glyphicon-th" aria-hidden="true">客服填写物流</i>
                </button>
                <button type="button" onclick="selectFhInfoBySelective();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-th" aria-hidden="true">商品发货明细</i>
                </button>
                <button type="button" onclick="fhdetailSpAppend();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-edit" aria-hidden="true">商品追加</i>
                </button>
                <button type="button" onclick="appendNotScanWxOrders();" class="btn btn-danger">
                    <i class="glyphicon glyphicon-edit" aria-hidden="true">扫描订单追加</i>
                </button>
                <button class="btn btn-warning glyphicon glyphicon-share-alt" onclick="exportFhdetailInfos();">导出发货单明细数据</button>
            </div>
            <%--
            <div class="btn-group btn-group-sm" id="2222" role="group">
                <button type="button" onclick="wxcusAudit();" class="btn btn-success">
                    <i class="glyphicon glyphicon-check" aria-hidden="true">网络客服审核</i>
                </button>
                <button type="button" onclick="wxfinancial();" class="btn btn-success">
                    <i class="glyphicon glyphicon-check" aria-hidden="true">网络财务审核</i>
                </button>
                <button type="button" onclick="openPrintWxorders();" class="btn btn-success">
                    <i class="glyphicon glyphicon-print" aria-hidden="true">网络拣货打印</i>
                </button>
                <button type="button" onclick="wxdocAudit();" class="btn btn-success">
                    <i class="glyphicon glyphicon-check" aria-hidden="true">网络文件组审核</i>
                </button>
                <button type="button" onclick="exportContrastExcel();" class="btn btn-success">
                    <i class="glyphicon glyphicon-share-alt" aria-hidden="true">导出对比文件</i>
                </button>
                <button class="btn btn-info" onclick="refundFhorder()">
                    <i class=" glyphicon glyphicon-remove" aria-hidden="true">发货单退款</i>
                </button>
                <button type="button" onclick="printFhOrderListReport()" class="btn btn-danger">
                    <i class="glyphicon glyphicon-leaf" aria-hidden="true">首批批次打印</i>
                </button>
            </div>
            --%>
            <table id="tbody" data-height="520" data-mobile-responsive="true"
                   class="table table-striped table-hover table-bordered"
                   style="word-break:break-all; word-wrap:break-all;">
            </table>
            <div>
                <i class="fa fa-square text-warning">待处理</i>
                <i class="fa fa-square text-success">打印分拣</i>
                <i class="fa fa-square text-navy">财务审核</i>
                <i class="fa fa-square text-danger">物流发货</i>
                <i class="fa fa-square text-info">门店收货</i>
                <i class="fa fa-square text-MediumPurple">总部撤单</i>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/createShipment.js"></script>
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
</body>
</html>