<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次管理</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <base target="_blank">
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>
<body>
<div class="page-container">
    <fieldset>
        <form id="addBatchFrom">
            <table class="table">
                <tr>
                    <td>批次号:</td>
                    <td><input readonly="readonly" type="text" name="batchcode" id="batchcode" class="form-control radius"></td>
                    <td>批次名称:</td>
                    <td><input type="text" name="batchname" id="batchname" class="form-control radius"></td>
                    <td>档次类型:</td>
                    <td>
                        <select class="typenameSelect form-control radius" id="typename" name="typename">
                            <option value='A类'>A类</option>
                            <option selected='selected' value='B类'>B类</option>
                            <option value='C类'>C类</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>地域属性:</td>
                    <td>
                        <select class="dqSelect form-control radius" id="dq" name="dq">
                            <option value='南'>南</option>
                            <option value='中'>中</option>
                            <option value='北'>北</option>
                        </select>
                    </td>
                    <td>批次类型:</td>
                    <td>
                        <select class="combobox form-control" name="batchlx" id="batchlx">
                            <option value="0">新货</option>
                            <option value="1" selected="selected">老货</option>
                            <option value="2">订货</option>
                        </select>
                    </td>
                    <td>季节:</td>
                    <td>
                        <select class="jjSelect form-control" id="jj" name="jj">
                            <option value='夏'>夏</option>
                            <option value='春秋'>春秋</option>
                            <option value='冬'>冬</option>
                            <option selected="selected" value='四季'>四季</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>品牌:</td>
                    <td>
                        <input type="text" style="width: 75%;float: left" name="brand" id="brand"
                               class="form-control brand" readonly="readonly">
                        <a class="btn btn-warning glyphicon glyphicon-zoom-in" data-title="保存"
                           onclick="brandInfoWindows();" href="javascript:;"
                           style="color: rgb(255, 35, 0);float: left;width: 25%;">Select</a>
                    </td>
                    <td>类别:</td>
                    <td>
                        <input type="text" style="width: 75%;float: left" name="batchlbmc" id="batchlbmc"
                               class="form-control brand" readonly="readonly">
                        <a class="btn btn-warning glyphicon glyphicon-zoom-in" data-title="保存"
                           onclick="selectSplb();" href="javascript:;"
                           style="color: rgb(255, 35, 0);float: left;width: 25%;">Select</a>
                    </td>
                    <td>产品类型</td>
                    <td class="text-l" >
                        <select class="dqSelect form-control radius" id="batchtype" name="batchtype">
                            <option value='1'>服装</option>
                            <option value='2'>童装</option>
                            <option value='3'>鞋子</option>
                            <option value='4'>辅料</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>价格:</td>
                    <td><input type="text" id="spprice" name="spprice" class="form-control radius pricedes"></td>
                    <td>备注:</td>
                    <td><input type="text" name="bz" id="bz" class="form-control radius bz"></td>
                    <td>品牌商:</td>
                    <td>
                        <select class="combobox form-control" name="batchtradeid" id="batchtradeid"></select>
                    </td>
                </tr>
                <tr>

                    <td class="pb-3">是否套装:</td>
                    <td class="pb-3" colspan="4">
                        <input name="taozhuang" type="checkbox" style=" width: 16px;height: 16px;"/>
                    </td>
                </tr>
            </table>
            <ul id="splbs" class="easyui-tree"  data-options=" url:' ${pageContext.request.contextPath}/productLbController/getProductLbPageList',method:'post',animate:true" style="display: none" >
            </ul>
            <div id="ddDiv" style="margin-top: 300px;">
                <div id="dd" style="width:200px;height:335px;padding-left:2px;">
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appendBrand()">增加</a>
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeitBrand()">删除</a>
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="acceptBrand()">确定</a>
                    <table id="brand-tb" class="easyui-datagrid" style="width:200px;height:285px"
                           data-options="url:' ${pageContext.request.contextPath}/spBatchController/getAllSpBrandInfo',method:'post',singleSelect: true,ctrlSelect:'true',rownumbers:'true'" >
                    </table>
                </div>
            </div>
            <input type="hidden" id="batchlbid" name="batchlbid" />
            <input type="hidden" id="suited" name="suited" />
        </form>
    </fieldset>
</div>

</body>

<!-- 自定义js -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/brand-opt.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batch-add.js"></script>

</html>