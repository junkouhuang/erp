<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>临时库位信息</title>
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
                    <form class="form-horizontal m-t" id="interimkwinfoForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">库位：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="kw"  id="kw" type="text" placeholder="库位">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcode"  id="batchcode" type="text" placeholder="批次号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">批次名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchname"  id="batchname" type="text" placeholder="批次名称">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">尺码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchcm"  id="batchcm" type="text" placeholder="尺码">
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">操作人：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="adduname"  id="adduname" type="text" placeholder="操作人">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">添加时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time" name="time">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-danger glyphicon glyphicon-plus" onclick="addInterimKwInfo()">新增临时库位信息</button>
                    </div>
                    <table class="table" id="table" data-height="528" data-mobile-responsive="true">

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/interimkwinfolist.js"></script>
</body>

</html>