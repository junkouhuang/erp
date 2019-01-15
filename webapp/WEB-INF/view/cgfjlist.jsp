<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购分拣界面</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="m-t" id="cgfjForm">
                        <div class="row form-horizontal" >
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >分拣单号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="ordercode" name="ordercode" type="text" placeholder="分拣单号" >
                            </div>
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >产品名称：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cpmc" name="cpmc" type="text" placeholder="产品名称" >
                            </div>
                            <label for="inputEmail3"  class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >开单日期：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="time"  id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparetype">分拣状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="status" id="status">
                                    <option></option>
                                    <option value="0">分拣中</option>
                                    <option value="1">分拣完成</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row form-horizontal">
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >明细号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="itemno" name="itemno" type="text" placeholder="明细号" >
                            </div>
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >到货单号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="recvOrderCode" name="recvOrderCode" type="text" placeholder="到货单号" >
                            </div>
                            <label for="inputEmail3" class="pl-0 pr-0  col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >采购单号：</label>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <input class="form-control layer-date" id="cgOrderCode" name="cgOrderCode" type="text" placeholder="采购单号" >
                            </div>
                            <div class="col-lg-3 col-md-3  col-sm-3 col-xs-3">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-success glyphicon glyphicon-plus" onclick="addCgfjWork()">新增分拣工程单</button>
                        <button class="btn btn-warning glyphicon glyphicon-plus" onclick="addCgfjinfo()">添加分拣结果</button>
                        <button class="btn btn-primary glyphicon glyphicon-print" onclick="printFjWork()">打印分拣工单</button>
                        <button class="btn btn-danger glyphicon  glyphicon-saved" onclick="confirmFjComplete()">确认分拣完成</button>
                    </div>
                    <table  class="tab_css_1" id="cgfjlist_table" data-height="510" data-mobile-responsive="true" >
                    </table>
                    <div>
                        <i class="fa fa-square text-danger">确认分拣完成</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgfjlist.js" ></script>
</body>

</html>