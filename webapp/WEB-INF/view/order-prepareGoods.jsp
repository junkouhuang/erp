<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>备货统计</title>
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
                    <form class="form-horizontal m-t" id="orderlistForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="storeid">门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" name="storeid" id="storeid">
                                </select>
                            </div>
                            <div class="order" style="width: 100px; float: left">
                                <input type="radio" value="1" name="order" checked="checked">降序
                                <input type="radio" value="0" name="order">升序
                            </div>


                            <div class="col-lg-2 col-md-3 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="search()">
                            </div>

                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <button class="btn btn-outline btn-default" onclick="exportExcel()">
                        导出Excel报表
                    </button>
                    <table class="table" id="table" data-height="510" data-mobile-responsive="true">

                    </table>
                </div>
                <!-- 工具条-->
                <div class="detail-toolbar">

                </div>
            </div>
        </div>
    </div>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<!--请在下方写此页面业务相关的脚本-->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/order-prepareGoods.js"></script>
</html>
