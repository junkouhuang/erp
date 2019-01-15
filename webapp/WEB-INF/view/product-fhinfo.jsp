<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品发货明细</title>
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
                        <table cellpadding="5" style="margin-left: 8px;margin-top: 4px;">
                            <tr>
                                <td class="pb-3">条码:</td>
                                <td class="pb-3"><input class="easyui-textbox" id="mxcode" name="mxcode"
                                                        data-options="required:true,validType:'text',width:120,missingMessage:'请输入条码'"/>
                                </td>
                                <td class="pb-3">款号:</td>
                                <td class="pb-3"><input class="easyui-textbox" id="spcode" name="spcode"
                                                        data-options="required:true,validType:'text',width:120,missingMessage:'请输入款号'"/>
                                </td>
                                <td class="pb-3">品牌商:</td>
                                <td class="pb-3">
                                    <input id="fhtradeid" name="fhtradeid" list="carstrade" class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择品牌商'" />
                                    <datalist id="carstrade"></datalist>
                                </td>
                                <td class="pb-3">发货仓库:</td>
                                <td class="pb-3">
                                    <input id="whsid" name="whsid" list="whsidcarstrade" class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择发货仓库'" />
                                    <datalist id="whsidcarstrade">
                                    </datalist>
                                </td>
                                <td class="pb-3">门店:</td>
                                <td class="pb-3">
                                    <input id="storeid" name="storeid" list="storeidcarstrade" class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择门店'" />
                                    <datalist id="storeidcarstrade">
                                    </datalist>
                                </td>
                                <td class="pb-3">
                                    <a style="background-color:#E9F1FF" href="javascript:void(0)"
                                       class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true"
                                       onclick="getFhinfo();">&nbsp;搜索</a>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div style="width:99%;margin-left:3px;">
                    <table id="fhinfo-tb" class="easyui-datagrid" style="width:100%;height:500px;"
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
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/product-fhinfo.js"></script>
</body>
</html>