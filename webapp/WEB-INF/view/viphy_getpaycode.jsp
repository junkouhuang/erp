<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-combobox/bootstrap-combobox.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>
<body>
<div class="page-container">
    <div class="ibox">
        <div class="ibox-title">请指定门店</div>
        <div class="ibox-content">
            <form class="form-horizontal" id="paycodeform">
                <div class="form-group">
                    <label for="mdcode" class="col-xs-3 control-label">店号</label>
                    <div class="col-xs-9">
                        <select class="combobox form-control" name="mdcode" id="mdcode">
                            <option value="" selected="selected"></option>
                            <c:forEach items="${storelist}" var="store">
                                <option value="${store.mdcode}">${store.mdcode}_${store.mdmc}</option>
                            </c:forEach>

                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="type" class="col-xs-3 control-label">支付方式</label>
                    <div class="col-xs-9">
                        <select class="combobox form-control" name="type" id="type">
                            <option value="POS" selected="selected">刷卡</option>
                            <option value="WX">微信</option>
                            <option value="ZFB">支付宝</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="money" class="col-xs-3 control-label">金额</label>
                    <div class="col-xs-9">
                        <select class="combobox form-control" name="money" id="money">
                            <option value="1000" selected="selected">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="4000">4000</option>
                            <option value="5000">5000</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>

    </div>

</div>
</body>
<!-- 全局js -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/viphy_getpaycode.js"></script>
</html>