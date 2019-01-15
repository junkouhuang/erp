<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次列表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg" onkeypress="if (event.keyCode == 13) _search()">
<div class="">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <div class="accordion-heading">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                        查询条件(一击展开，再击折叠)
                    </a>
                </div>
                <!-- Example Events -->
                <div class="ibox-title collapse" id="collapseTwo">
                    <form class="form-horizontal m-t" id="batchlistForm">
                        <div class="row">
                            <%-- 搜索功能 --%>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchcode" class="">批次号：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="batchcode" name="batchcode" type="text"
                                       placeholder="批次号">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchname" class="">批次名称：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <input class="form-control" id="batchname" name="batchname" type="text"
                                       placeholder="批次名称">
                            </div>

                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="status" class="">状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="status" name="status" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">默认</option>
                                    <option value="2">确认</option>
                                    <option value="3">首次配货中</option>
                                    <option value="4">首次配货完成</option>
                                    <option value="5">完工</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="baudied" class="">在库状态：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="baudied" name="baudied" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">默认</option>
                                    <option value="1">入库验收</option>
                                    <option value="2">取消</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="createtimeStr">创建时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="createtimeStr" type="text"
                                       placeholder="请选择时间段"
                                       id="createtimeStr">
                            </div>
                            <div class="col-lg-1 col-md-1  text-right pt-7">
                                <label for="batchfbstr">发布时间：</label>
                            </div>
                            <div class="col-lg-2 col-md-2 ">
                                <input class="form-control layer-date" name="batchfbstr" type="text"
                                       placeholder="请选择时间段" id="batchfbstr">
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="imports" class="">导入小程序：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="imports" name="imports" class="form-control">
                                    <option value="">全部</option>
                                    <option value="1">导入</option>
                                    <option value="0">未导入</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="batchlx" class="">批次类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="batchlx" name="batchlx" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">新货</option>
                                    <option value="1">老货</option>
                                    <option value="2">订货</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="pkgtype" class="">产品类型：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="pkgtype" name="pkgtype" class="form-control">
                                    <option value="">全部</option>
                                    <option value="0">打包</option>
                                    <option value="1">单件</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                            <label for="fblx" class="">发布类型：</label>
                        </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="fblx" name="fblx" class="form-control">
                                    <option></option>
                                    <option value='0'>默认</option>
                                    <option value='1'>订货会</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="replenish" class="">补货：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="replenish" name="replenish" class="form-control">
                                    <option></option>
                                    <option value='true'>是</option>
                                    <option value='false'>否</option>
                                </select>
                            </div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="productionok" class="">挂标：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="productionok" name="productionok" class="form-control">
                                    <option></option>
                                    <option value='true'>是</option>
                                    <option value='false'>否</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div class="col-lg-1  col-md-1  text-right pt-7">
                                <label for="productshok" class="">收货：</label>
                            </div>
                            <div class="col-lg-2 col-md-2">
                                <select id="productshok" name="productshok" class="form-control">
                                    <option></option>
                                    <option value='true'>是</option>
                                    <option value='false'>否</option>
                                </select>
                            </div>
                            <div class="col-lg-1 col-md-1">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="search()"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="ibox-content">
                    <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                        <shiro:hasPermission name="batch:firstPrePare">
                            <button class="btn btn-danger glyphicon glyphicon-random" onclick="prepare();">首次配货</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="batch:printWxOrders">
                            <button class="btn btn-primary glyphicon glyphicon-print" onclick="printWxOrdersByBatchCode();">
                                打印网络拣货单
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spbatch:acceptAnce">
                            <button class="btn btn-warning glyphicon glyphicon-shopping-cart" onclick="acceptAnce();">入库验收
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="batch:anycStock">
                            <button class="btn btn-danger glyphicon glyphicon-transfer" onclick="syncSpatchStock();">同步库存
                        </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="batch:exportExcel">
                            <button data-toggle="dropdown" class="btn btn-warning glyphicon btn-default">
                                导出Excel表格
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="javascript:;" onclick="exportSpBatchInfo()" class="font-bold">导出批次销发信息</a>
                                </li>
                                <li>
                                    <a href="javascript:;" onclick="exportSpmxkwInfo()" class="font-bold">导出在库未发布信息</a>
                                </li>
                                <li>
                                    <a href="javascript:;" onclick="exportBatchNotPrePareInfoAndStockInfo()" class="font-bold">导出批次未配货及库存信息</a>
                                </li>
                                <li>
                                    <a href="javascript:;" onclick="exportProductStockInfoByLb()" class="font-bold">导出喜乐库类别总表</a>
                                </li>
                            </ul>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spbatch:import">
                            <button class="btn btn-danger glyphicon glyphicon-copy" onclick="importBatchInfo()">导入辅料批次</button>
                        </shiro:hasPermission>
                    </div>
                    <div class="btn-group btn-group-sm" id="1111" role="group">
                        <shiro:hasPermission name="batch:add">
                            <button class="btn btn-success glyphicon glyphicon-plus" onclick="addBatch()">新增</button>
                            <button class="btn btn-primary glyphicon glyphicon-pencil" onclick="updateBatch()">修改</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spbatch:relationspxx">
                            <button class="btn btn-info glyphicon glyphicon-refresh" onclick="relationSpxx()">关联款号</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="spbatch:fxed">
                            <button class="btn btn-MediumPurple glyphicon glyphicon-th-list" onclick="fxedopt()">分箱</button>
                            <button class="btn btn-MediumPurple glyphicon glyphicon-print" onclick="printBatchFxedGcd();">
                                打印分箱工程单
                            </button>
                            <button class="btn btn-warning glyphicon glyphicon-print" onclick="printBoxBarcode()">打印箱条码
                            </button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="batch:appendFbCm">
                            <button class="btn btn-primary glyphicon glyphicon-plus" onclick="appendFbCminfo();">追加发布尺码</button>
                        </shiro:hasPermission>
                    </div>
                    <table id="dhtable" data-height="540" data-mobile-responsive="true">
                    </table>
                </div>
                <!-- End Example Events -->
            </div>
        </div>
    </div>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/batchlist.js"></script>
</body>

</html>