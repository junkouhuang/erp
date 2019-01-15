<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料信息表</title>
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
                    <form class="form-horizontal m-t" id="commentForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1 col-sm-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2">
                                <input class="form-control" type="text" id="flcode">
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">辅料名：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2">
                                <input class="form-control" type="text" id="categroymc">
                            </div>
                            <div class="col-lg-1 col-md-1  col-sm-1 text-right">
                                <label for="inputEmail3" class=" control-label " style=" padding-top: 8px;">价格段：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2">
                                <input class="form-control  dsp" type="text" id="minSellprice"> - <input
                                    class="form-control dsp" type="text" id="maxSellprice">
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 pt-5">
                                <div class="icheckbox_square-green " style="position: relative;" onclick="onewarnFun(this)">
                                    <input type="checkbox" id="onewarn" class="i-checks"  style="position: absolute; opacity: 0;" >
                                    <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="onewarn" class="">一级</label>
                                <div class="icheckbox_square-green" style="position: relative;" onclick="twowarnFun(this)">
                                    <input type="checkbox" id="twowarn" class="i-checks" style="position: absolute; opacity: 0;" >
                                    <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                </div>
                                <label for="twowarn" class="">二级</label>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-1">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <%--<button class="btn btn-outline btn-default" onclick="deleteFlInfo()">删除</button>
                        --%>
                        <button class="btn btn-primary" onclick="addFlInfo()">新增</button>
                        <button class="btn btn-success" onclick="updFlInfo()">修改</button>
                        <button class="btn btn-warning" onclick="uploadImg()">上传图片</button>
                        <%--  <button class="btn btn-outline btn-default" onclick="registerStock()">登记起始库存</button>--%>
                        <button class="btn btn-danger" onclick="adjustFlstock()">调整辅料库存</button>
                        <button class="btn btn-info" onclick="exportFlStock()">导出辅料库存</button>
                        <button class="btn btn-danger" onclick="exportFlinventoryInfo()">打印盘点信息</button>
                    </div>
                    <table id="flinfo_table" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
                <div class="detail-content">
                    <table id="detailtable" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/flinfolist.js"></script>
</body>
</html>