<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>次品列表</title>
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
                    <form class="form-horizontal m-t" id="inferiorlistForm">
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">条码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="mxcode"  id="mxcode" type="text" placeholder="条码">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">款号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="spcode"  id="spcode" type="text" placeholder="款号">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="traderid">品牌商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select class="combobox form-control" name="traderid" id="traderid">
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
                        <div class="row" >
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">商品名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="spmc"  id="spmc" type="text" placeholder="商品名称">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="gysid" class="">供应商：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="gysid" name="gysid" class="form-control">
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="inputEmail3" class="">历史采购编码：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="historycode"  id="historycode" type="text" placeholder="历史采购编码">
                            </div>
                            <div class="col-lg-1 col-md-1 ">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-primary glyphicon glyphicon-plus" onclick="addInferior()">次品入库</button>
                        <button class="btn btn-success glyphicon glyphicon-tasks" onclick="inferiorOptLog()">操作记录</button>
                        <button class="btn btn-danger glyphicon glyphicon-transfer" onclick="inferiorReturn()">次品退货</button>
                        <button class="btn btn-MediumPurple glyphicon glyphicon-trash" onclick="inferiorBf()">次品报废</button>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/inferiorlist.js"></script>
</body>

</html>