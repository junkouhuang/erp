<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新增分拣工单</title>
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
                        <div style="margin-top: 10px;">
                            <table cellpadding="5">
                                <tr>
                                    <td class="pb-3">分拣单号:</td>
                                    <td class="pb-3" colspan="3"><input class="easyui-textbox" id="ordercode" name="ordercode" disabled
                                                            data-options="required:true,validType:'text',width:154,missingMessage:'请输入分拣单号'"></input>
                                    </td>
                                    <td class="pb-3">	&nbsp;	&nbsp;	&nbsp;分拣时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="fjsj"
                                                            name="fjsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:154,missingMessage:'请输入开始时间'"></input>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table id="sorting-tb" class="easyui-datagrid" style="width:920px;height:250px"
                                   data-options="onClickCell: onClickCell">
                                <thead>
                                <tr>
                                    <th data-options="field:'top',align:'center'">序号</th>
                                    <th data-options="field:'itemno',width:120,align:'center'">货品条目号</th>
                                    <th data-options="field:'cpmc',width:200,align:'center'">产品名称</th>
                                    <th data-options="field:'cgsl',width:100,align:'center'">采购数量</th>
                                    <th data-options="field:'recvds',width:100,align:'center'">现袋数</th>
                                    <th data-options="field:'nowds',width:100,align:'center'">到货袋数</th>
                                    <th data-options="field:'kw',width:120,align:'center'">库位</th>
                                    <th data-options="field:'fjds',width:110,editor:'numberbox',align:'center'">分拣袋数</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div style="margin-top: 10px;">
                            <table cellpadding="5">
                                <tr>
                                    <td class="pb-3">备注:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="bz" name="bz"
                                                            data-options="required:false,validType:'text',width:320,missingMessage:'请填写备注'"/>
                                    <td class="pb-3">	&nbsp;	&nbsp;	&nbsp;负责人:</td>
                                    <td class="pb-3">
                                        <input class="easyui-textbox" data-options="required:true,validType:'text',width:154,missingMessage:'请选择负责人'" id="ygxxid" list="cars"  />
                                        <datalist id="cars"></datalist>
                                    </td>

                                </tr>
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
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sortingwork.js"></script>
</body>

</html>