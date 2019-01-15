<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>用户管理</title>
	<jsp:include page="cssPage.jsp"></jsp:include>
    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>
<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="form-horizontal m-t" id="userAccountForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">最近登录时间:</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" type="text" placeholder="请选择时间段" name="time" id="time">
                            </div>
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">用户名/姓名：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control" type="text" placeholder="请填写用(户名/姓名)" name="userAndreal"  id="userAndreal">
                            </div>
                            <div class="col-lg-1 col-md-1 text-right">
                                <label for="inputEmail3" class=" control-label  pt-10"
                                       style=" padding-top: 8px;">部门：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control" type="text" placeholder="请填写部门名称" name="groupname"  id="groupname">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="LoadingDataListOrderRealItems()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content ">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-success glyphicon glyphicon-plus" onclick="addUserAccount()">新增</button>
                        <button class="btn btn-info glyphicon glyphicon-wrench" onclick="permissionSetting()">权限设置</button>
                        <button class="btn btn-danger  glyphicon glyphicon-minus" onclick="removeUserAccount()">移除</button>
                    </div>
                    <table id="userAccount_table" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/userManage.js"></script>
</body>
</html>