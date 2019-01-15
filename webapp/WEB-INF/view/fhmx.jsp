<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发货明细</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/plugins/bootstrap-table/bootstrap-table.min.css"
          rel="stylesheet">
    <!-- Sweet Alert -->
    <link href="${pageContext.request.contextPath}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">

    <base target="_blank">
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body style="overflow-y:hidden;">
<div>
    <span value="${msg}" style="color: red;"></span>
    <div class="p-20">
        <table data-toggle="table" data-height="320" id="tab0" data-mobile-responsive="true">
            <thead>
            <tr>
                <th data-field="index" data-formatter="indexFormatter" data-align="center">序号</th>
                <th data-field="spcode" data-align="center">款号</th>
                <th data-field="spmc" data-align="center">品名</th>
                <th data-field="ys" data-align="center">颜色</th>
                <th data-field="cm" data-align="center">尺码</th>
                <th data-field="price" data-align="center">单价</th>
                <th data-field="sl" data-align="center">数量</th>
                <th data-field="je" data-align="center">金额</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${fhDetailOdd.fhOddList}" var="pageFhOdd">
                <tr>
                    <td></td>
                    <td>${pageFhOdd.spcode}</td>
                    <td>${pageFhOdd.spmc}</td>
                    <td>${pageFhOdd.ys}</td>
                    <td>${pageFhOdd.cm}</td>
                    <td>${pageFhOdd.price}</td>
                    <td>${pageFhOdd.sl}</td>
                    <td>${pageFhOdd.je}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <div style="width:100%;height:43px;overflow:hidden;">
            <table class="table mb-0" id="tab1" style="line-height:15px;">
                <thead>
                <tr height="13">
                    <th data-field="total" data-align="center" colspan="5" class="bg-warning" style="padding:0  8px;">
                        汇总
                    </th>
                    <c:if test="${sl > 0}">
                        <th data-field="sl" data-align="center" class="bg-success" style="padding:0  8px;">${sl}（数量）
                        </th>
                    </c:if>
                    <c:if test="${sl==null}">
                        <th data-field="sl" data-align="center" class="bg-success" style="padding:0  8px;">0（数量）</th>
                    </c:if>
                    <c:if test="${je >0}">
                        <th data-field="je" id="je" data-align="center" value="${je}" class="bg-info"
                            style="padding:0  8px;">${je}（金额）
                        </th>
                    </c:if>
                    <c:if test="${je ==null}">
                        <th data-field="je" data-align="center" class="bg-info" style="padding:0  8px;">0（金额）</th>
                    </c:if>
                </tr>

                <tr height="13">
                    <th data-field="total" data-align="center" class="bg-warning" style="padding:0  8px;">信用额度：</th>
                    <th class="bg-warning" style="padding:0  8px;">${fhDetailOdd.xyed}</th>
                    <th class="bg-warning" style="padding:0  8px;">累计欠款:</th>
                    <th class="bg-warning" style="padding:0  8px;">${fhDetailOdd.balance>0?0:fhDetailOdd.balance}</th>
                    <th class="bg-warning" style="padding:0  8px;">付款方式:</th>
                    <th class="bg-warning" colspan="2" style="padding:0  8px;" height="15">
                        <select id="fkfs" name="fkfs" style="width:122px">
                            <option value="1">账期发货</option>
                            <option value="0">现款支付</option>
                        </select>
                    </th>
                </tr>
                </thead>
            </table>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js"></script>

</body>
<script type="text/javascript">
    function indexFormatter(value, row, index) {
        return index + 1;
    }

    $(function () {
        $("#tab0").hover(function () {
            $("#tab1,#tab2").slideToggle();
        });
    });
    //序列化表单
    var formData = function () {
        var je = $("#je").attr("value");
        var fkfs = $("#fkfs option:selected").val();
        var fhid = ${fhid};
        var jsonstr = new Array();
        jsonstr = {"fhid": fhid, "je": je, "fkfs": fkfs};
        return jsonstr;
    };
</script>
</html>
