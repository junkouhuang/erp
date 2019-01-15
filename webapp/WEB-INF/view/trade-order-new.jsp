<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新增品牌调货单</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico"> <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/trade-order-new.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>

<div class="page-container ">
    <h4>品牌调货单信息</h4>
    <div class="info">
        <table class="table">
            <tr>
                <td width="120">品牌调货单号:</td>
                <td ><input type="text" name="tradeordercode" id="tradeordercode" class="form-control radius" readonly style="width:200px"></td>
                <td ></td>
                <td></td>
            </tr>
            <tr>
                <td  width="120">卖方品牌商:</td>
                <td>
                    <select class="typenameSelect form-control radius" name="outtradeid" id="outtradeid" style="width:200px">
                    </select>
                </td>
                <td  width="120">买方品牌商:</td>
                <td>
                    <select class="typenameSelect form-control radius" name="intradeid" id="intradeid" style="width:200px">
                    </select>
                </td>
            </tr>
            <tr>
                <td  width="120">折扣:</td>
                <td><input type="text" name="rate" id="rate" class="form-control radius" onkeyup="clearNoNum(this);" style="width:200px"></td>
                <td  width="120">货物来源:</td>
                <td>
                    <select class="combobox form-control"  name="tradeordertype" id="tradeordertype" style="width:200px">
                    </select>
                </td>
            </tr>
        </table>
    </div>
    <div class="bottom">
        <button class="btn btn-success" onclick="save()">
            新增
        </button>
        <button class="btn btn-danger" onclick="exitWindows()">
            取消
        </button>
    </div>
</div>

</body>
<!-- End Panel Other -->
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/trade-order-new.js" ></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js" ></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/utils/JSUtils.js" ></script>

</html>