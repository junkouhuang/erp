<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>日志列表</title>
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
                    <form class="form-horizontal m-t" id="orderlistForm">
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">业务名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="optname"  id="optname" type="text" placeholder="业务名称">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">用户名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="username"  id="username" type="text" placeholder="用户名称">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="time">操作时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="preparestatus">操作类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="type" id="type">
                                    <option></option>
                                    <option value="1">新增</option>
                                    <option value="2">删除</option>
                                    <option value="3">修改</option>
                                    <option value="4">查询</option>
                                    <option value="5">未知</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">记录值：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="params"  id="params" type="text" placeholder="记录值">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                    </div>
                    <table class="loginfolist_table" id="loginfolist_table" data-height="510" data-mobile-responsive="true">

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/loginfolist.js"></script>
</body>

</html>