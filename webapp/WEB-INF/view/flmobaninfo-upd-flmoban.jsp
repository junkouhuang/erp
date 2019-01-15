<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料信息表</title>
    <link rel="shortcut icon" href="favicon.ico"> 
	<jsp:include page="cssPage.jsp"></jsp:include>
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
    <div>
    <div class="row">
            <div class="col-sm-12">
                <div>
                        <div class="ibox-content  mb-1">
                           		<div>
						            <form class="form-horizontal"  id="commentForm" >
										<table class="table mb-0"  data-show-columns="false">
											<tr>
												<td width="120"><input type="text" name="categroymc" id="categroymc" class="form-control radius"  placeholder="辅料名....."></td>
												<td width="120"><input type="text" name="flcode" id="flcode" class="form-control radius" placeholder="编码....."></td>
								      			<td width="140"><input type="text" name="barcode" id="barcode"  class="form-control radius" placeholder="条码......"></td>
								      			<td width="80" class="pr-0"><input type="text" name="minSellprice" id="minSellprice"  class="form-control radius" placeholder="最小价......"></td>
								      			<td width="20" align="center" class="pl-0 pr-0"><span class="glyphicon glyphicon-resize-horizontal"></span></td>
								      			<td width="80" class="pl-0"><input type="text" name="maxSellprice" id="maxSellprice" class="form-control" placeholder="最大价......"></td>
								      			<td width=""><input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()"></td>
								      		</tr>
							      	</table>
									</form>
						        </div>
                                <table id="flmoban_table" data-height="270" data-mobile-responsive="true" >
                                </table>
                        </div>
                    </div>
        </div>
    </div>
    </div>
	<!-- js公共模板 -->
	<jsp:include page="jsPage.jsp"></jsp:include>
	<script src="${pageContext.request.contextPath}/js/flmobaninfo-upd-flmoban.js"></script>
</body>
</html>