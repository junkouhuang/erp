<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料模板信息</title>
    <link rel="shortcut icon" href="favicon.ico"> 
     <jsp:include page="cssPage.jsp"></jsp:include>
     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body class="">
    <div class="wrapper  animated fadeInRight">
    <div class="row">
            <div class="col-sm-12">
                <div class="ibox ">
                        <!-- Example Events -->
                        <div class="ibox-title">
                        <form class="form-horizontal"  id="commentForm" >
	                        <table class="table" >
								<tr>
									<td width="130">创建日期：</td><td><input type="text" name="time" id="time" class="form-control radius layer-date"></td>
									<td width="100">模板名称：</td><td><input type="text" name="mobanmc" id="mobanmc" class="form-control radius"></td>
					      		</tr>
					      		<tr>
									<td>创建人、更新人：</td><td><input type="text" name="addOrupdName" id="addOrupdName" class="form-control radius"></td>
					      			<td colspan="6"><input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="LoadingDataListOrderRealItems()">  </td>
					      		</tr>
					      	</table>
						</form>
                        </div>
                        <div class="ibox-content">
                                <table id="flfhorder_table" data-height="270" data-mobile-responsive="true">
                                </table>
                               	<div class="ml-10">
									<a class="btn btn-primary radius" data-title="保存" onclick="saveflfhorder();" href="javascript:;" style="margin: 4px 0;" id="bc">保存</a>
									<a class="btn btn-white" data-title="取消" onclick="offThisWindows()" href="javascript:;" style="margin: 4px 0;">取消</a>
								</div>
                        </div>
                    </div>
        </div>
    </div>
    </div>
    <!-- 公共模板 -->
	<jsp:include page="jsPage.jsp"></jsp:include>
	<script src="${pageContext.request.contextPath}/js/flfhorder-upd-moban.js"></script>
</body>
</html>