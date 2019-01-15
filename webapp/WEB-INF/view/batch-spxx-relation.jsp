<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次关联款号</title>
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
            <div style="margin-left: 10px;float: left" >
                款号:<input class="easyui-textbox" id="spcode" name="spcode"
                           data-options="required:true,validType:'text',width:200,missingMessage:'请输入款号进行查询'" />
                <input style="border-radius: 15px;color: saddlebrown" type="button" value="查询商品信息" onclick="loadSpxxByCode();">
            </div>
            <div style="margin-right: 10px;float: right">
                批次名称:<input disabled="disabled" class="easyui-textbox" id="batchname" name="batchname"
                          data-options="required:true,validType:'text',align:'center',width:200" />
                单价:<input disabled="disabled" class="easyui-textbox" id="spprice" name="spprice"
                          data-options="required:true,validType:'text',align:'center',width:100" />
            </div>
            <!-- End Example Events -->
            <div style="width:99%;margin-left:3px;background-color: #7aba7b">
                <table id="spxx-tb" class="easyui-datagrid"  style="width:100%;height:230px;"
                       data-options="
                            iconCls: 'icon-tip',
                            singleSelect: true,
                            toolbar: '#tb',
                            method: 'get',
                            rownumbers: true,
                            showFooter:true
                        ">
                </table>
                <table id="spxx-relation" class="easyui-datagrid"  style="width:100%;height:auto;"
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-spxx-relation.js"></script>
</body>
</html>