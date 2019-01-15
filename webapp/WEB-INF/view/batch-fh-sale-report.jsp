<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次发货-销售报表统计</title>
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
                    <form class="form-horizontal m-t" id="interimkwinfoForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchcode" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode" id="batchcode" type="text"
                                       placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchname" class="">批次名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchname" id="batchname" type="text"
                                       placeholder="批次名称">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="imports" class="">导入小程序：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="imports" name="imports" class="form-control">
                                    <option value="">全部</option>
                                    <option value="1">导入</option>
                                    <option value="0">未导入</option>
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
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchlx" class="">批次类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="batchlx" name="batchlx" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">新货</option>
                                    <option value="1">老货</option>
                                    <option value="2">订货</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="pkgtype" class="">打包类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="pkgtype" name="pkgtype" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">打包</option>
                                    <option value="1">单件</option>
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
                                <label for="baudied" class="">在库状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="baudied" name="baudied" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">默认</option>
                                    <option value="1">入库验收</option>
                                    <option value="2">取消</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="time" type="text"
                                       placeholder="请选择时间段"
                                       id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchfbtimeStr">批次发布时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchfbtimeStr" type="text"
                                       placeholder="请选择时间段"
                                       id="batchfbtimeStr">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-danger glyphicon glyphicon-share-alt" onclick="exportBatchFhSaleReportInfos()">导出Excel
                        </button>
                    </div>
                    <table class="table" id="table" data-height="528" data-mobile-responsive="true">

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-fh-sale-report.js"></script>
</body>

</html>