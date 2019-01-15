<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>库位信息</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>
<body class="gray-bg">
<div class="">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <form class="form-horizontal m-t" name="spmxkwFrom" id="spmxkwFrom">
                    <div class="ibox-title">
                        <div class="row">
                            <%-- 搜索功能 --%>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="mxcode" class="">条码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="mxcode" name="mxcode" type="text" placeholder="条码">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="spcode" class="">款号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="spcode" name="spcode" type="text" placeholder="款号">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="spmc" class="">品名：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="spmc" name="spmc" type="text" placeholder="品名">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="itemno" class="">采购编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="itemno" name="itemno" type="text" placeholder="采购编码">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="whsid" class="">仓库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="whsid" name="whsid" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="kwtraderid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select name="kwtraderid" class="combobox form-control" name="kwtraderid" id="kwtraderid">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">库位状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="status" id="status">
                                    <option></option>
                                    <option value="0">默认</option>
                                    <option value="1">配货锁定</option>
                                    <option value="2">异常锁定</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="onkw">是否在库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="onkw" id="onkw">
                                    <option></option>
                                    <option value="true">在库</option>
                                    <option value="false">不在库</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">上架时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="time" type="text" placeholder="请选择时间段" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="kwpkgtype">库位类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="kwpkgtype" id="kwpkgtype">
                                    <option></option>
                                    <option value="0">打包</option>
                                    <option value="1">单件</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="loccode" class="">区号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="loccode" name="loccode" type="text" placeholder="区号">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="kw" class="">库位：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="kw" name="kw" type="text" placeholder="库位">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchcode" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="batchcode" name="batchcode" type="text" placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="parentid">首次上架标识：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="parentid" id="parentid">
                                    <option></option>
                                    <option value="0">首次上架</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="imports" class="">导入小程序：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="imports" name="imports" class="form-control">
                                    <option value="">全部</option>
                                    <option value="1">导入</option>
                                    <option value="0">未导入</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()"/>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-danger glyphicon glyphicon-share-alt" onclick="exportSpmxkw()">导出Excel</button>
                        <button class="btn btn-primary glyphicon glyphicon-cutlery" onclick="sppackagePacket()">拆包</button>
                    </div>
                    <table id="spmxkw_table" data-height="528" data-mobile-responsive="true">
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/spmxkwlist.js"></script>
</body>

</html>