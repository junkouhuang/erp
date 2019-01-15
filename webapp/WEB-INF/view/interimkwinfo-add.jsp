<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>临时库位新增界面</title>
    <link rel="shortcut icon" href="favicon.ico">

    <jsp:include page="cssPage.jsp"></jsp:include>

    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
    <style>
        .fixed-table-toolbar{display:none;}
    </style>
</head>

<body class="gray-bg">
<div class="row">
    <div class="col-sm-12">
        <div class=" ">
            <div style="margin-left: 10px;">
                批次号:<input class="easyui-textbox" id="batchcode" name="batchcode"
                           data-options="required:true,validType:'text',width:200,missingMessage:'请输入批次号'" />
                <input style="border-radius: 15px;color: saddlebrown" type="button" value="获取尺码信息" onclick="loadSpbatchetailinfo();">
            </div>
            <!-- End Example Events -->
            <div style="width:99%;margin-left:3px;">
                <table id="batchcm-tb" class="easyui-datagrid"  style="width:100%;height:230px;"
                       data-options="
                            iconCls: 'icon-tip',
                            singleSelect: true,
                            toolbar: '#tb',
                            method: 'get',
                            rownumbers: true,
                            showFooter:true,
                            onClickRow: onClickRow
                        ">
                </table>
                <table id="batchcm-tbmx" class="easyui-datagrid"  style="width:100%;height:auto;"
                       data-options="
                            iconCls: 'icon-tip',
                            singleSelect: true,
                            toolbar: '#tb',
                            method: 'get',
                            rownumbers: true,
                            showFooter:true
                        ">
                </table>
            </div>
        </div>
    </div>
</div>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/interimkwinfo-add.js"></script>
</body>
</html>