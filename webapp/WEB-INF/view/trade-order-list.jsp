<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>品牌调货单列表</title>
    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <link href="${pageContext.request.contextPath}/css/color-styleX.css" rel="stylesheet">

    <base target="_blank">
    <script type="text/javascript">
        var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight" style="padding:0px 20px 0px 20px;">
    <div class="row">
        <div class="">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title" style="padding-bottom: 0px; padding-top: 5px;">
                    <div>
                        <div class="accordion-inner">
                            <form class="form-horizontal m-t">
                                <div class="form-group form-group-sm">
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="tradeordercode" class="">调货单号：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <input class="form-control layer-date" id="tradeordercode" type="text"
                                               placeholder="调货单号">
                                    </div>
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="status" class="">调货单状态：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select id="status" class="form-control">
                                            <option value="">全部</option>
                                            <option value="0">新增</option>
                                            <option value="1">扫描上传</option>
                                            <option value="2">扫描确认</option>
                                            <option value="3">确认收货</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="createtime" >创建时间：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2 ">
                                        <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="createtime">
                                    </div>
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="scantime" >扫描时间：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2 ">
                                        <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="scantime">
                                    </div>
                                </div>
                                <!-- 第二行 -->
                                <div class="form-group form-group-sm">
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="outtraderid">卖方品牌商：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select class="combobox form-control" name="outtraderid" id="outtraderid">
                                        </select>
                                    </div>
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="inttraderid">买方品牌商：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select class="combobox form-control" name="outtraderid" id="inttraderid">
                                        </select>
                                    </div>
                                    <div class="col-lg-1 col-md-1">
                                        <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                               onclick="search()"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                <div class="ibox-content" style="padding: 0px 0px 0px 0px;">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <button class="btn btn-outline btn-default" onclick="newTradeOrder()">
                            新增品牌调货单
                        </button>
                        <button class="btn btn-outline btn-default" onclick="scanConfirm()">
                            扫描确认
                        </button>
                        <button class="btn btn-warning" onclick="exportTradeOrder()">导出信息</button>
                    </div>
                    <table id="table" data-height="518" data-mobile-responsive="true">
                    </table>
                    <div>
                        <i class="fa fa-square text-warning">新增</i>
                        <i class="fa fa-square text-success">扫描上传</i>
                        <i class="fa fa-square text-navy">扫描确认</i>
                        <i class="fa fa-square text-danger">确认收货</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Panel Other -->
<!-- 全局js -->
<script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/js/laydate/laydate.js?v=5.0.7"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/trade-order-list.js" ></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/constant.js" ></script>
</body>

</html>