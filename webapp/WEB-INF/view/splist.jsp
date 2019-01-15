<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品列表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <div class="m-t">
                        <div class="row form-horizontal">
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">商品名称：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="商品名称" id="spmc">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">历史采购编码：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="历史采购编码" id="historyitemno">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">请选择时间段：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                            </div>
                            <label class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">商品类型：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <select class="form-control" id="goodsType" onchange="switchGoodsType()">
                                    <option disabled selected value="">商品类型</option>
                                    <option value="0">可售商品</option>
                                    <option value="1">物料</option>
                                    <option value="2">赠品</option>
                                    <option value="3">现金购换</option>
                                    <option value="4">积分购换</option>
                                    <option value="5">折扣商品</option>
                                    <option value="6">可售商品A</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row form-horizontal">
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">采购单号：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="采购单号" id="cgOrderCode">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">采购编码：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="采购编码" id="cgitemno">
                            </div>
                            <label class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">商品状态：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <select class="form-control" id="spStatus" onchange="switchStatus()">
                                    <option value="">所有</option>
                                    <option value="0">待挂吊牌</option>
                                    <option value="1">已分箱</option>
                                    <option value="2">待分批次</option>
                                    <option value="3">已分批次</option>
                                    <option value="4">已上架</option>
                                </select>
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">条目号：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="条目号" id="itemno">
                            </div>
                        </div>
                        <br/>
                        <div class="row form-horizontal">
                            <div class="col-lg-1 col-md-1  col-sm-1 text-right">
                                <label class=" control-label " style=" padding-top: 8px;">价格段：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2">
                                <input class="form-control dsp" placeholder="最低价" type="text" id="minPrice"> - <input
                                    class="form-control dsp" placeholder="最高价" type="text" id="maxPrice">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">批次号：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="批次号" id="batchcode">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">条码：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control " type="text" placeholder="条码" id="mxcode">
                            </div>
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">款号：</label>
                            <div class="col-lg-2 col-md-2  col-sm-1 col-xs-1">
                                <input class="form-control " type="text" placeholder="款号" id="spcode">
                            </div>
                        </div>
                        <br/>
                        <div class="row form-horizontal">
                            <label class="pl-0 pr-0 col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label">采购分拣单号：</label>
                            <div class="col-lg-2 col-md-2  col-sm-1 col-xs-1">
                                <input class="form-control " type="text" placeholder="采购分拣单号" id="fjworkcode">
                            </div>
                            <div class="col-lg-1 col-md-1  col-sm-1 col-xs-1">
                                <input type="submit" class="btn btn-primary" onclick="querySearch()" value="搜索"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <shiro:hasPermission name="spxx:upImage">
                            <button class="btn btn-primary" onclick="imageUpload()">上传图片</button>
                        </shiro:hasPermission>
                        <button onclick="checkBatch();" class="btn btn-success">
                            <i class="glyphicon glyphicon-th" aria-hidden="true"></i>查看批次
                        </button>
                      <%--  <button class="btn btn-danger" onclick="stockIn()">不贵入库</button>--%>
                    <%--    <button class="btn btn-warning" onclick="spbStorageOpt()">商品部入库</button>--%>
                        <shiro:hasPermission name="spxx:productionStorage">
                            <button class="btn btn-danger" onclick="productionStorage()">
                                <i class="glyphicon glyphicon-saved" aria-hidden="true"></i>生产入库
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spxx:update">
                            <button class="btn btn-primary" onclick="updateSpxx()">
                                <i class="glyphicon glyphicon-pencil" aria-hidden="true"></i>修改商品信息
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spxx:cancel">
                            <button class="btn btn-danger" onclick="cancelProductById()">
                                <i class="glyphicon glyphicon-trash" aria-hidden="true"></i>作废商品
                            </button>
                        </shiro:hasPermission>
                    </div>
                    <table id="sptable" data-height="520" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/splist.js"></script>
</body>

</html>