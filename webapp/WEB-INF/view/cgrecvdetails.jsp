<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>采购到货明细</title>
    <link rel="shortcut icon" href="favicon.ico">

    <jsp:include page="cssPage.jsp"></jsp:include>

    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
    <style>
        .fixed-table-toolbar {
            display: none;
        }
    </style>
</head>

<body class="gray-bg">
<div class="row">
    <div class="col-sm-12">
        <div class=" ">
            <div class="ibox-title" style="width: 100%;padding: 3px;float: left">
                <div style="float:left;border: 1px solid #ddd;width: 100%;">
                    <form class="m-t" id="selectForm">
                    </form>
                </div>
                <div style="width:99%;margin-left:3px;">
                    <table id="cgrecvdetail-tb" class="easyui-datagrid" style="width:100%;height:500px;"
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
</div>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgrecvdetails.js"></script>
</body>
</html>