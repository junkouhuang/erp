<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>门店列表</title>
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
                <div class="ibox-title">
                    <div class="row">
                        <%-- 搜索功能 --%>
                        <div class="col-lg-1 col-md-1  text-right pt-7">
                            <label>门店：</label>
                        </div>
                        <div class="col-lg-2 col-md-2 ">
                            <select class="combobox form-control" type="text" name="storeid" id="storeid">
                            </select>
                        </div>
                        <div class="col-lg-1 col-md-1  text-right pt-7">
                            <label for="status">状态：</label>
                        </div>
                        <div class="col-lg-2 col-md-2">
                            <select class="combobox form-control" name="status" id="status">
                                <option></option>
                                <option value="0">未开业</option>
                                <option value="1">营业中</option>
                                <option value="4">已停业</option>
                                <option value="9">已结业</option>
                            </select>
                        </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="mdlx">门店类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="mdlx" id="mdlx">
                                    <option></option>
                                    <option value="0">加盟店</option>
                                    <option value="3">直营店</option>
                                </select>
                            </div>
                        <div class="col-lg-1 col-md-1  text-right pt-7">
                            <label for="time">创建时间：</label>
                        </div>
                        <div class="col-lg-2 col-md-2 ">
                            <input class="form-control layer-date" type="text" placeholder="请选择时间段" id="time">
                        </div>

                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-lg-1 col-md-1  text-right pt-7">
                            <label for="inputEmail3" class="">店长：</label>
                        </div>
                        <div class="col-lg-2 col-md-2 ">
                            <input class="form-control layer-date" name="dz"  id="dz" type="text" placeholder="店长名称">
                        </div>
                        <div class="col-lg-2 col-md-2 ">
                            <input class="btn btn-primary  layer-date" type="button" value="搜索" id="storesearch"
                                   onclick="search()"/>
                        </div>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-danger glyphicon glyphicon-plus" onclick="addStore();">新增</button>
                        <button class="btn btn-info glyphicon glyphicon-pencil" onclick="updateStoreInfo();">修改</button>
                        <button class="btn btn-primary glyphicon glyphicon-retweet" onclick="updateStoreCrux();">标识门店信息</button>
                       <%-- <button class="btn btn-primary glyphicon glyphicon-retweet" onclick="updateStoreLx();">标识门店类型</button>
                        <button class="btn btn-primary glyphicon glyphicon-retweet" onclick="updateWholerate();">修改批发折扣</button>--%>
                    </div>
                    <table id="storetable" data-height="510" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/storelist.js"></script>
</body>

</html>