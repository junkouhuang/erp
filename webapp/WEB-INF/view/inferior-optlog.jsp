<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>次品操作日志</title>
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
                    <form class="form-horizontal m-t" id="inferioroptlogForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">条码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="mxcode"  id="mxcode" type="text" placeholder="条码">
                            </div>
                            <label for="inputEmail3"  class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" >开单日期：</label>
                            <div class="col-lg-2 col-md-2  col-sm-2 col-xs-2">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="time"  id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="tradeid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="tradeid" id="tradeid">
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="whsid" class="">仓库：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="whsid" name="whsid" class="form-control">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">操作人：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="optname"  id="optname" type="text" placeholder="操作人">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="opttype" class="">操作类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="opttype" name="opttype" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">历史采购编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="historycode"  id="historycode" type="text" placeholder="历史采购编码">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7" >
                                <label>门店：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <select class="combobox form-control" type="text" name="storeid" id="storeid">
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">备注：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="bz"  id="bz" type="text" placeholder="备注">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/inferior-optlog.js"></script>
</body>

</html>