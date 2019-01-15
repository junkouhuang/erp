<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包信息列表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">

        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="form-horizontal m-t" id="sppackageForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="packagecode" class="">包号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="packagecode" id="packagecode" type="text"
                                       placeholder="包号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchcode" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode" id="batchcode" type="text"
                                       placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="zxsj">装箱时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="zxsj"
                                       id="zxsj">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="sjsj">上架时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="sjsj"
                                       id="sjsj">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="kw" class="">库位：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="kw" id="kw" type="text"
                                       placeholder="库位">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="kwloccode" class="">区号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="kwloccode" id="kwloccode" type="text"
                                       placeholder="区号">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="status" class="">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="status" name="status" class="form-control">
                                    <option></option>
                                    <option value="0">空箱</option>
                                    <option value="1">已装箱</option>
                                    <option value="2">已上架</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="ownerid" class="">分配状态：</label>
                            </div>
                            <div class="col-lg-1 col-md-1">
                                <select id="ownerid" name="ownerid" class="form-control">
                                    <option></option>
                                    <option value="0">默认</option>
                                    <option value="1">已分配</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="bpkgtype" class="">包类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="bpkgtype" name="bpkgtype" class="form-control">
                                    <option></option>
                                    <option value="1">批次包</option>
                                    <option value="2">退货包</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="bpkgwhsid" class="">仓库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="bpkgwhsid" name="bpkgwhsid" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="bpkgtradeid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select name="bpkgtradeid" class="combobox form-control" id="bpkgtradeid">
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="onkw" class="">是否在库：</label>
                            </div>
                            <div class="col-lg-1 col-md-1">
                                <select id="onkw" name="onkw" class="form-control">
                                    <option></option>
                                    <option value="true">在库</option>
                                    <option value="false">不在库</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataList()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-primary glyphicon glyphicon-refresh" onclick="sppackageEmpty()">拆包重扫
                        </button>
                        <button class="btn btn-danger glyphicon glyphicon-share-alt" onclick="exportSppackageInfo()">导出Excel
                        </button>
                    </div>
                    <table id="sppackage_table" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sppackagelist.js"></script>
</body>

</html>