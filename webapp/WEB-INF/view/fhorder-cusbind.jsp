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
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-combobox/bootstrap-combobox.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/bootstrap/easyui.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/locale/easyui-lang-zh_CN.js">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
        var fhgrid;
        var bindgrid;
    </script>
</head>
<body class="easyui-layout" data-options="fit:true,border:false" style="margin: 2px 2px 0px 2px;height: 400px">
<div data-options="region:'north'" style="height:10%">
    <form class="form-inline" id="fhorderbindform">
        <div class="input-group" style="padding-top: 2px">
            <div class="input-group-addon">物流公司</div>
            <input type="text" class="form-control" id="wlgs" name="wlgs"  style="width: 510px">
        </div>
        <div class="input-group" style="padding-top: 2px">
            <div class="input-group-addon">发货批号</div>
            <input type="text" class="form-control" id="fhbatchno" name="fhbatchno" readonly="readonly" style="width: 260px">
            <span class="input-group-addon">
                <a href="javascript:void(0);" class="btn-block" onclick="getBatchno()">生成</a>
            </span>
        </div>
    </form>
</div>
<div data-options="region:'west',split:true" style="width:48%;padding:3px">
    <div style="width:48%;padding:3px;float: left">
        <select class="combobox form-control" onchange="selectOnchang(this)" name="storeid" id="storeid"  style="height: 20px">
        </select>
    </div>
    <div style="width:48%;padding:3px;float: right">
        <select class="combobox form-control" onchange="selectWhsOnChang(this)" name="whsid" id="whsid"  style="height: 20px">
        </select>
    </div>
    <div class="ml-5" style="width:99%;margin-left:5px;height: 310px;">
    <table id="fhtable" style="width:100%;height: 100%;" ></table>
    </div>
</div>
<div data-options="region:'center',title:'操作',split:true" style="padding-top: 60px;text-align: center">
        <a href="javascript:void(0);" class="easyui-linkbutton" onclick="tempBind()" plain="true" iconCls="icon-filter"></a>
</div>
<div data-options="region:'east',split:true" style="width:48%;padding:3px">
    <table id="bindtable" data-options="fit:true,border:false"></table>
</div>
</body>
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/fhorder-cusbind.js"></script>
</html>