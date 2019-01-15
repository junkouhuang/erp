<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次操作</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
    <div class="">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                        	<div class="row" >
							    <%-- 搜索功能 --%>
                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="batchcode" class="">批次号：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <input class="form-control" id="batchcode" type="text" placeholder="批次号">
                                </div>

                                <div class="col-lg-1 col-md-1  text-right pt-7" >
                                    <label for="time" >操作时间：</label>
                                </div>
                                <div class="col-lg-2 col-md-2 ">
                                    <input class="form-control layer-date" type="text" placeholder="请选择时间段"  id="time">
                                </div>

                                <div class="col-lg-1  col-md-1  text-right pt-7">
                                    <label for="optstatus" class="">操作状态：</label>
                                </div>
                                <div class="col-lg-2 col-md-2">
                                    <select id="optstatus" class="form-control">
                                        <option value="">全部</option>
                                        <option value="0">新增</option>
                                        <option value="1">关联</option>
                                        <option value="2">分箱</option>
                                        <option value="3">完成上架</option>
                                    </select>
                                </div>
							</div>

                            <div class="col-lg-1 col-md-1">
                                <input class="btn btn-primary  layer-date" type="button" value="搜索"
                                       onclick="search()"/>
                            </div>

                        </div>
                        
                        <div class="ibox-content">
                                <div class="btn-group hidden-xs" id="exampleTableEventsToolbar" role="group">
                                    <%--<button class="btn  btn-warning" id="dhprint">
                                        <i class="glyphicon glyphicon-print" aria-hidden="true"></i>
                                    </button>--%>
                                    <button class="btn btn-success" onclick="goods()">
                                        关联商品
                                    </button>
                                    <button class="btn btn-info" onclick="batchBinning()">
                                        分箱&单件包装
                                    </button>

                                    <button class="btn btn-warning" onclick="finish()">
                                        完工
                                    </button>
                       		</div>
                       		<table id="dhtable" data-height="510" data-mobile-responsive="true">
                            </table>
                        </div>
                        <!-- End Example Events -->
                    </div>
        </div>
    </div>
    </div>
      <jsp:include page="jsPage.jsp"></jsp:include>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/batchop.js" ></script>
</body>

</html>