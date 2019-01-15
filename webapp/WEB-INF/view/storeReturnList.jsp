<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>调货单管理</title>
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
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                            查询条件(一击展开，再击折叠)
                        </a>
                    </div>
                    <div id="collapseTwo" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <form class="form-horizontal m-t">
                                <div class="form-group form-group-sm">
                                    <div class="col-lg-1 col-md-1  text-right pt-7">
                                        <label for="ordercode" class="">退货单号：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <input class="form-control layer-date" id="ordercode" type="text"
                                               placeholder="退货单号">
                                    </div>
                                    <div class="col-lg-1  col-md-1  text-right pt-7">
                                        <label for="mdmc" class="">门店名称：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <input class="form-control " id="mdmc" type="text" placeholder="门店名称">
                                    </div>
                                    <div class="col-lg-1 col-md-1  text-right pt-7" >
                                        <label>门店：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2 ">
                                        <select class="combobox form-control" type="text" name="store" id="store">
                                        </select>
                                    </div>
                                    <div class="col-lg-1  col-md-1  text-right pt-7">
                                        <label for="status" class="">单据状态：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select id="status" class="form-control">
                                            <option value="">全部</option>
                                            <%--<option value="-1">新增</option>--%>
                                            <option value="0">提交</option>
                                            <option value="1">允许退货</option>
                                            <option value="2">到货扫描</option>
                                            <option value="3">确认到货</option>
                                            <option value="4">财务审核</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- 第二行 -->
                                <div class="form-group form-group-sm">
                                    <div class="col-lg-1  col-md-1  text-right pt-7">
                                        <label for="status" class="">扫描状态：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select id="scaned" class="form-control">
                                            <option value="">全部</option>
                                            <option value="0">未扫描</option>
                                            <option value="1">已扫描</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-1  col-md-1  text-right pt-7">
                                        <label for="status" class="">导入状态：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select id="imported" class="form-control">
                                            <option value="">全部</option>
                                            <option value="0">未导入</option>
                                            <option value="1">已导入</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-1  col-md-1  text-right pt-7">
                                        <label for="status" class="">客服审核：</label>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                        <select id="createaudit" class="form-control">
                                            <option value="">全部</option>
                                            <option value="0">未审核</option>
                                            <option value="1">审核</option>
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
                        <button class="btn btn-outline btn-default" onclick="returnDetail()">
                            退货单详细
                        </button>
                        <button class="btn btn-outline btn-default" onclick="addReturn()">
                            新增退货单
                        </button>
                        <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-outline btn-default" aria-expanded="false">导出或打印退货单详细
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="javascript:;" onclick="exportExcel()" class="font-bold">导出Excel表格</a>
                                </li>
                                <li>
                                    <a href="javascript:;" onclick="printPDF()" class="font-bold">打印PDF表单</a>
                                </li>
                            </ul>
                        </div>

                        <button class="btn btn-outline btn-default" onclick="exportScanExcel()">
                            导出退货扫描清单
                        </button>

                        <button class="btn btn-outline btn-default" onclick="createAudit()">
                            客服审核
                        </button>
                        <button class="btn btn-outline btn-default" onclick="confirmReach()">
                            确认到货
                        </button>
                        <button class="btn btn-outline btn-default" onclick="financeAudit()">
                            财务审核
                        </button>
                        <button class="btn btn-outline btn-default" onclick="stockIn()">
                            不贵入库
                        </button>
                    </div>
                    <table id="storeReturnTable" data-height="518" data-mobile-responsive="true">
                    </table>
                </div>


                <%--颜色--%>
                <div style="height: 0px; font-size: 10px; font-weight:bold;">
                    <span>新增</span>
                    <span class="color-gold" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

                    <span>提交</span>
                    <span class="color-666" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

                    <span>允许退货</span>
                    <span class="color-blue" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

                    <span>到货扫描</span>
                    <span class="color-333" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

                    <span>确认到货</span>
                    <span class="color-111" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;

                    <span>财务审核</span>
                    <span class="color-777" style="display:inline-block; height: 10px; width: 10px;"></span>&emsp;&emsp;
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/storeReturnList.js" ></script>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/constant.js" ></script>
</body>

</html>