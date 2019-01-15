<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>无订单商品追加界面</title>
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
            <form id="fhdetailSpAppendForm">
                <div style="margin-left: 10px;float: left">
                    条码:<input class="easyui-textbox" id="mxcode" name="mxcode"
                              data-options="required:true,validType:'text',width:120,missingMessage:'请输入条码进行查询'"/>
                    <a href="javascript:void(0)" style="color: red;background-color: #0F769F" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="loadSelectionInfos()">查询商品信息</a>
                    <span style="margin-left: 10px;color: red;">(查询时将会带上后面条件，即指定仓库品牌商的退货区商品检索！)</span>
                </div>
                <div style="margin-right: 10px;float: right">
                    发货单号:<input disabled="disabled" class="easyui-textbox" id="ordercode" name="ordercode"
                                data-options="required:true,validType:'text',align:'center',width:120"/>
                    品牌商： <input disabled="disabled" class="easyui-textbox" data-options="required:true,validType:'text',width:100" name="returnkwtraderid" id="returnkwtraderid" list="fhtradeids"  />
                    <datalist id="fhtradeids"></datalist>
                    仓库：<input disabled="disabled" class="easyui-textbox" data-options="required:true,validType:'text',width:100" name="whsid" id="whsid" list="whsids"  />
                    <datalist id="whsids"></datalist>
                </div>
            </form>
            <!-- End Example Events -->
            <div style="width:99%;margin-left:3px;background-color: #7aba7b">
                <table id="selection-tb" class="easyui-datagrid" style="width:100%;height:150px;"
                       data-options="
                            iconCls: 'icon-tip',
                            singleSelect: true,
                            toolbar: '#tb',
                            method: 'get',
                            rownumbers: true,
                            showFooter:true
                        ">
                </table>
                <div style="float: left;width: 100%;margin-top: 5px;">
                    条码:<input class="easyui-textbox" id="unicode" name="unicode"
                              data-options="required:true,validType:'text',width:120,missingMessage:'请填写条码'"/>
                    数量:<input class="easyui-textbox" id="sl" name="sl"
                              data-options="required:true,validType:'text',width:120,missingMessage:'请填写数量'"/>
                    <a href="javascript:void(0)" style="color: red;background-color: #0F769F" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="addFhdetailsp()">添加</a>
                    <a href="javascript:void(0)" style="color: purple;background-color: rgb(255, 140, 60)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true" onclick="importFhdetailSpExcel()">Import</a>
                    <span style="margin-left: 10px;color: red;">(如果你想查询，请在上面检索，如果你要直接追加或导入请使用此！)</span>
                </div>
                <table id="fhdetailsp-tb" class="easyui-datagrid" style="width:100%;height:auto;"
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/fhdetailsp-append.js"></script>
</body>
</html>