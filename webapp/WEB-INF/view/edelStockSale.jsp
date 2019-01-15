<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<script type="text/javascript">
    var pageContext = "${pageContext.request.contextPath}";
</script>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>不贵销售报表</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">

    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>

</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="tempspstocks_table" id="tempspstocksForm">
                        <div class="row">

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="spcode" class="">款号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control " id="spcode" name="spcode"  type="text">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="mxcode" class="">吊牌条码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control " id="mxcode" name="mxcode" type="text">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="spmc" class="">商品名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control " id="spmc" name="spmc" type="text">
                            </div>

                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="cpmc" class="">供货编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control " id="cpmc" name="cpmc" type="text">
                            </div>

                            <div class="col-lg-1 col-md-1">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button type="button" onclick="printStoreReport();" class="btn btn-outline btn-default">
                            <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                        </button>
                        <%--<button type="button" class="btn btn-outline btn-default">
                            <i class="glyphicon glyphicon-heart" aria-hidden="true"></i>
                        </button>--%>
                    </div>
                    <table class="tab_css_1" id="tempspstocks_table" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
            </div>
        </div>
    </div>
</div>
<!-- 自定义js -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/edelStockSale.js"></script>
</body>

</html>