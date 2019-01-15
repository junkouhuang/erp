<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品包信息列表</title>
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
                    <form class="form-horizontal m-t" id="subContractForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="bigcode" class="">商品包号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="bigcode" id="bigcode" type="text"
                                       placeholder="商品包号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="createStr">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input id="createStr" name="createStr" class="form-control layer-date" type="text" placeholder="请选择时间段">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="status">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="status" id="status">
                                    <option></option>
                                    <option value="0">默认</option>
                                    <option value="1">已打印</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-danger glyphicon glyphicon-share-alt"
                                onclick="exportSubContract()">导出Excel
                        </button>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/subcontractlist.js"></script>
</body>

</html>