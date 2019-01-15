<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>批次库存同步界面</title>
    <link rel="shortcut icon" href="favicon.ico">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
        function ww4(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var f = date.getMinutes();
            var s = date.getSeconds();
            return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h)+ ':'+ (f < 10 ? ('0' + f) : f) + ':'+ (s < 10 ? ('0' + s) : s);
        }
        function w4(s) {
            var reg = /[\u4e00-\u9fa5]/ //利用正则表达式分隔
            var ss = (s.split(reg));
            var y = parseInt(ss[0], 10);
            var m = parseInt(ss[1], 10);
            var d = parseInt(ss[2], 10);
            var h = parseInt(ss[3], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h)) {
                return new Date(y, m - 1, d, h);
            } else {
                return new Date();
            }
        }
    </script>
</head>

<body class="gray-bg">
<div class="animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <!-- Example Events -->
                <div class="ibox-title">
                    <form class="m-t" id="sortingInfo">
                        <div>
                            <span style="color: blue">下面是批次的尺码数据...</span>
                            <table id="syncinfo-tb" class="easyui-datagrid" style="width:450px;height:200px"
                                   data-options="onClickCell: onClickCell">
                                <thead>
                                <tr>
                                    <th data-options="field:'top'">序号</th>
                                    <th data-options="field:'id',hidden:'true'">主键</th>
                                    <th data-options="field:'batchcm',width:120">尺码</th>
                                    <th data-options="field:'batchys',width:120">颜色</th>
                                    <th data-options="field:'orderfs',width:100">未拣货份数</th>
                                    <th data-options="field:'syfs',width:100,editor:'numberbox'">剩余份数</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- js公共模板 -->
<jsp:include page="jsPage.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/syncSpbatchStock.js"></script>
</body>

</html>