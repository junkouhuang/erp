<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购单管理</title>
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
                    <form class="m-t">
                        <div class="row form-horizontal">
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control layer-date" type="text" placeholder="开单日期检索" id="time">
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cgrOrgys" type="text" placeholder="采购人/供应商">
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="ordercode" type="text" placeholder="采购单号">
                            </div>
                            <div class="pl-0  pr-0 col-lg-3  col-md-3 col-sm-3 col-xs-3 pt-5">
                                <div class="icheckbox_square-green checked" style="position: relative;"
                                     onclick="isRadio(this)">
                                    <input type="checkbox" id="radio-3" class="i-checks"
                                           style="position: absolute; opacity: 0;" value="-1">
                                    <ins class="iCheck-helper"
                                         style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="radio-3" class="">所有</label>
                                <div class="icheckbox_square-green" style="position: relative;" onclick="isRadio(this)">
                                    <input type="checkbox" id="radio-4" class="i-checks"
                                           style="position: absolute; opacity: 0;" value="0">
                                    <ins class="iCheck-helper"
                                         style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="radio-4" class="">待发货</label>
                                <div class="icheckbox_square-green" style="position: relative;" onclick="isRadio(this)">
                                    <input type="checkbox" id="radio-5" class="i-checks"
                                           style="position: absolute; opacity: 0;" value="1">
                                    <ins class="iCheck-helper"
                                         style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="radio-5" class="">部分发货</label>
                                <div class="icheckbox_square-green" style="position: relative;" onclick="isRadio(this)">
                                    <input type="checkbox" id="radio-6" class="i-checks"
                                           style="position: absolute; opacity: 0;" value="2">
                                    <ins class="iCheck-helper"
                                         style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="radio-6" class="">全单发货</label>
                            </div>
                            <div class="col-lg-3 col-md-3  col-sm-3 col-xs-3">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <shiro:hasPermission  name="cgdan:del">
                            <button class="btn btn-danger" onclick="deleteCgd()">删除</button>
                        </shiro:hasPermission >
                        <shiro:hasPermission  name="cgdan:add">
                            <button class="btn btn-success" onclick="addCgd()">新增</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission  name="cgdan:edit">
                            <button class="btn btn-primary" onclick="updCgd()">修改</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="cgdan:audit">
                            <button class="btn btn-info" onclick="cgdAudit()">财务处理</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="cgdan:addSpxx">
                            <button class="btn btn-success" onclick="commodityRecord()">商品部建档</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="cgdan:printCgd">
                            <button onclick="printCgd()" class="btn btn-warning">
                                <i class="glyphicon glyphicon-print" aria-hidden="true"></i>打印采购单信息
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="cgdan:exportCgd">
                            <button class="btn btn-danger glyphicon glyphicon-share-alt" onclick="exportCgdanInfos()">导出Excel</button>
                        </shiro:hasPermission>
                    </div>
                    <table class="tab_css_1" id="dhtable" data-height="520" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
                <div class="detail-toolbar"></div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgdlist.js"></script>
</body>

</html>