<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>
    <base target="_blank">
    <style type="text/css">
        table.gridtable {
            font-family: verdana, arial, sans-serif;
            font-size: 11px;
            color: #333333;
            border-width: 1px;
            border-color: #666666;
            border-collapse: collapse;
        }

        table.gridtable th {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #dedede;
        }

        table.gridtable td {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
        }
    </style>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>
<body class="container-fluid">
<div style="margin-top: 5px">
    <form class="form-inline" id="fhorderform">
        <table class="gridtable" border="1">
            <tr>
                <td>类型</td>
                <td>单价</td>
                <td>折扣</td>
                <td>下单数量</td>
                <td>拣货数量</td>
                <td>下单金额</td>
                <td>拣货金额</td>
                <td>退款金额</td>
            </tr>
            <tr>
                <td>吊牌金额</td>
                <td>${mx.sellprice}</td>
                <td>${mx.sprate}</td>
                <td>${mx.ordertotal}</td>
                <td>${mx.jhtotal == null ?0:mx.jhtotal}</td>
                <td>${mx.orderamount}</td>
                <td>${mx.jhamount == null ?0:mx.jhamount}</td>
                <td>${mx.refundamount}</td>
            </tr>
            <tr>
                <td>折后金额</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${mx.orderrateamount}</td>
                <td>${mx.jhrateamount == null ?0:mx.jhrateamount}</td>
                <td>${mx.refundratemount}</td>
            </tr>
        </table>
    </form>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<!--请在下方写此页面业务相关的脚本-->
</html>
