<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>次品报废操作界面</title>
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
                报废单号:<input class="easyui-textbox" id="spbfdancode" name="spbfdancode"
                           data-options="required:true,validType:'text',width:200,missingMessage:'请输入报废单号'" />
                <input style="border-radius: 15px;color: saddlebrown" type="button" value="获取报废单信息" onclick="getSpBfdanInfo();">
            </div>
            <!-- End Example Events -->
            <div style="width:99%;margin-left:3px;">
                <table id="spbfdan-tb" class="easyui-datagrid"  style="width:100%;height:55px;"
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
                <div id="selectForm" class="ibox-title" style="width: 100%;padding: 3px;float: left;display: none">
                    <form class="m-t" id="inferiorspmxForm">
                        <div style="float:left;border: 1px solid #ddd;width: 100%;">
                            <table cellpadding="5" style="margin-left: 8px;margin-top: 4px;">
                                <tr>
                                    <td class="pb-3">条码:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="mxcode" name="mxcode"
                                                            data-options="required:true,validType:'text',width:120,missingMessage:'请输入条码'" />
                                    </td>
                                    <td class="pb-3">款号:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="spcode" name="spcode"
                                                            data-options="required:true,validType:'text',width:120,missingMessage:'请输入款号'" />
                                    </td>
                                    <td class="pb-3">商品名称:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="spmc" name="spmc"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请输入商品名称'" />
                                    </td>
                                    <td class="pb-3">
                                        <a style="background-color:#E9F1FF" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="queryInferiorspmxTable();" >&nbsp;搜索</a>
                                    </td>

                                </tr>
                            </table>
                        </div>
                    </form>
                </div>
                <div data-options="region:'west',split:true" style="width:48%;padding:3px;float: left;">
                    <div class="ml-5" style="width:99%;margin-left:5px;height: 310px;">
                        <table id="inferiorspmx-table" style="width:100%;height: 100%;" ></table>
                    </div>
                </div>
                <div id="optButton" data-options="region:'west',split:true" style="width:4%;padding:3px;float: left;display: none">
                    <div data-options="region:'center',title:'操作',split:true" style="padding-top: 80px;text-align: center">
                        <button class="btn btn-danger glyphicon glyphicon-arrow-right" onclick="tempBind()"></button>
                        <button style="margin-top: 20px;" class="btn btn-danger glyphicon glyphicon-arrow-left" onclick="tempRemove()"></button>
                    </div>
                </div>
                <div data-options="region:'west',split:true" style="width:48%;padding:3px;float: right;">
                    <div class="ml-5" style="width:99%;margin-left:5px;height: 310px;">
                        <table id="select-inferiorspmx-table" data-options="fit:true,border:false,onClickCell:onClickRow">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/inferior-bf.js"></script>
</body>
</html>