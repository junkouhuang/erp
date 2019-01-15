<%--
  Created by IntelliJ IDEA.
  User: Alan
  Date: 2017-11-23
  Time: 20:02
  To change this template use File | Settings | File Templates.
--%>
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
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
        var fhid = "${fhorder.id}";
    </script>
</head>
<body class="container-fluid">
        <div style="margin-top: 5px">
            <form class="form-inline" id="fhorderform">
                <div>
                    <div class="input-group">
                        <div class="input-group-addon">单号</div>
                        <input type="text" class="form-control" id="ordercode" value="${fhorder.ordercode}" readonly="readonly">
                    </div>
                    <div class="input-group">
                        <div class="input-group-addon">店号</div>
                        <input type="text" class="form-control" id="mdcode" value="${fhorder.mdcode}" readonly="readonly" style="width: 100px">
                    </div>
                    <div class="input-group">
                        <div class="input-group-addon">店名</div>
                        <input type="text" class="form-control" id="mdmc" value="${fhorder.mdmc}" readonly="readonly" style="width: 370px">
                    </div>
                </div>
            </form>
        </div>
        <hr style="margin-top: 5px;margin-bottom: 5px"/>
        <div style="height: auto">
            <table id="tbody" data-height="273"></table>
        </div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/fhorder-docaudit.js"></script>
</html>
