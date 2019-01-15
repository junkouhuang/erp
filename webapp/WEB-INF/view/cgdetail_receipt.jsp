<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>收货清点界面</title>
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
            return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (f < 10 ? ('0' + f) : f) + ':' + (s < 10 ? ('0' + s) : s);
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
                    <form class="m-t" id="cgdetaillistFrom">
                        <div>
                            姓名/工号：<input style="margin: 0px;padding-top: 0px;padding-bottom: 0px;height: 25px;line-height: 25px;width: 152px;border-radius: 5px;" id="ygmc_code" name="ygmc_code" />
                        </div>
                        <div style="float:left;">
                            <table id="ygxx-tb" class="easyui-datagrid" style="width:400px;height:150px"
                                   data-options="singleSelect: false,ctrlSelect:'true',rownumbers:'true',idField:'id'">
                                <thead>
                                <tr>
                                    <th data-options="field:'id',hidden:'true'">主键</th>
                                    <th data-options="field:'ygxm',width:100">姓名</th>
                                    <th data-options="field:'ygcode',width:100">工号</th>
                                    <th data-options="field:'zw',width:150">职务</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div style="margin-left: 5px;float:left;margin-top: 50px; margin-right: 5px;">
                            <div>
                                <input type="button" onclick="choice();" value="选择">
                            </div>
                            <div style="margin-top: 10px;">
                                <input type="button" onclick="remove();" value="移除">
                            </div>
                        </div>
                        <div style="float:left;">
                            <table id="ygxxselect-tb" class="easyui-datagrid" style="width:400px;height:150px">
                                <thead>
                                <tr>
                                    <th data-options="field:'id',hidden:'true'">主键</th>
                                    <th data-options="field:'top',width:30">序号</th>
                                    <th data-options="field:'ygxm',width:100">姓名</th>
                                    <th data-options="field:'ygcode',width:100">工号</th>
                                    <th data-options="field:'zw',width:150">职务</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div>
                            <table id="cgdetail-tb" class="easyui-datagrid" style="width:855px;height:150px"
                                   data-options="onClickCell: onClickCell">
                                <thead>
                                <tr>
                                    <th data-options="field:'cgdetailid',hidden:true">序号</th>
                                    <th data-options="field:'top',width:40">序号</th>
                                    <th data-options="field:'cgitemno',width:110">采购编码</th>
                                    <th data-options="field:'cpmc',width:240">产品名称</th>
                                    <th data-options="field:'cpsl',width:65">采购数量</th>
                                    <th data-options="field:'recvds',width:150,editor:'numberbox'">到货袋数</th>
                                    <th data-options="field:'kw',width:247,editor:'text'">库位</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div style="margin-top: 10px;">
                            <table cellpadding="5">
                                <tr>
                                    <td class="pb-3">开始时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="takestarttime"
                                                            name="takestarttime"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:154,missingMessage:'请输入开始时间'"></input>
                                    </td>
                                    <td class="pb-3">完成时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="takeendtime"
                                                            name="takeendtime"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:154,missingMessage:'请输入开始时间'"></input>
                                    </td>
                                    <td class="pb-3">收货负责人:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="recvmanage" name="recvmanage"
                                                            data-options="required:true,validType:'text',width:154,missingMessage:'请输入收货负责人'"></input>
                                    </td>
                                </tr>
                                <tr style="margin-top: 50px;">
                                    <td class="pb-3">司机名称:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="driver" name="driver"
                                                            data-options="required:false,validType:'text',width:154,missingMessage:'请填写司机名称'"/>
                                    </td>
                                    <td class="pb-3">车牌号:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="license" name="license"
                                                            data-options="required:false,validType:'text',width:154,missingMessage:'请填写车牌号'"/>
                                    </td>
                                    <td class="pb-3">司机电话:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="drivertel" name="drivertel"
                                                            data-options="required:false,validType:'text',width:154,missingMessage:'请填写司机名称'"/>
                                    </td>
                                </tr>
                                <tr style="margin-top: 20px;">
                                    <td class="pb-3">备注:</td>
                                    <td class="pb-3" colspan="5"><input class="easyui-textbox" id="bz" name="bz"
                                                                        data-options="required:false,validType:'text',width:607,missingMessage:'请选择性填写备注'"/>
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
<script src="${pageContext.request.contextPath}/js/plugins/bootstrap-combobox/bootstrap-combobox.js"></script>
<script src="${pageContext.request.contextPath}/js/contabs.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgdetail_receipt.js"></script>
</body>

</html>