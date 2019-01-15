<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生产入库界面</title>
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
                    <form class="m-t" id="productionStorageForm">
                            <table style="margin-top: 10px;" cellpadding="5">
                                <tr>
                                    <td class="pb-3">商品编码:</td>
                                    <td class="pb-3"><input class="easyui-textbox" disabled id="spcode" name="spcode"
                                                            data-options="required:true,validType:'text',width:154,missingMessage:'请输入商品编码'"></input>
                                    </td>
                                    <td class="pb-3">商品名称:</td>
                                    <td class="pb-3"><input class="easyui-textbox" disabled id="spmc" name="spmc"
                                                            data-options="required:false,validType:'text',width:154,missingMessage:'请输入商品名称'"/>
                                    </td>
                                    <td class="pb-3">
                                        <div id="issjLable" style="display: none;">
                                            是否上架：
                                        </div>
                                    </td>
                                    <td class="pb-3">
                                        <div id="isSjDiv" class="icheckbox_square-green " style="position: relative;display: none;" onclick="isSjFun(this)">
                                            <input type="checkbox" id="onewarn" class="i-checks"  style="position: absolute; opacity: 0;" >
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">分拣单号:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="fjdanhao" name="fjdanhao"
                                                            data-options="required:true,validType:'text',width:154,missingMessage:'请输入分拣单号'"/>
                                    </td>
                                    <td class="pb-3">开始时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="starttime"
                                                            name="starttime"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:154,missingMessage:'请输入开始时间'"></input>
                                    </td>
                                    <td class="pb-3">完成时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="endtime"
                                                            name="starttime"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:154,missingMessage:'请输入开始时间'"></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">仓库:</td>
                                    <td class="pb-3">
                                        <select onchange="isSjClick();" class="combobox form-control" type="text" name="whsid" id="whsid"></select>
                                    </td>
                                    <td class="pb-3">品牌商:</td>
                                    <td class="pb-3">
                                        <select onchange="isSjClick();" class="combobox form-control" type="text" name="tradeid" id="tradeid"></select>
                                    </td>
                                    <td class="pb-3">货品类型:</td>
                                    <td class="pb-3">
                                    <select class="combobox form-control" name="splx" id="splx">
                                        <option value="0">大货</option>
                                        <option value="1">样板</option>
                                    </select>
                                    </td>
                                </tr>
                            </table>
                        <span style="color:blue;display: block">请选择生产入库人员..</span>
                        <div>
                            姓名/工号：<input style="margin: 0px;padding-top: 0px;padding-bottom: 0px;height: 25px;line-height: 25px;width: 152px;border-radius: 5px;" id="ygmc_code" name="ygmc_code" />
                        </div>
                        <div style="float:left;">
                            <table id="ygxx-tb" class="easyui-datagrid" style="width:400px;height:150px"
                                   data-options="singleSelect: false,ctrlSelect:'true',rownumbers:'true',idField:'id',onClickCell:onClickRow">
                                <thead>
                                <tr>
                                    <th data-options="field:'id',hidden:'true'">主键</th>
                                    <th data-options="field:'ygxm',width:70">姓名</th>
                                    <th data-options="field:'ygcode',width:60">工号</th>
                                    <th data-options="field:'zw',width:120">职务</th>
                                    <th data-options="field:'fjsl',width:100,editor:'numberbox'">分拣数量</th>
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
                                    <th data-options="field:'ygxm',width:70">姓名</th>
                                    <th data-options="field:'ygcode',width:60">工号</th>
                                    <th data-options="field:'zw',width:120">职务</th>
                                    <th data-options="field:'fjsl',width:100,editor:'numberbox'">分拣数量</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div>
                            <table id="cgdetail-tb" class="easyui-datagrid" style="width:850px;height:152px"
                                   data-options="onClickCell: openEdtiorCgdetail_tb">
                                <thead>
                                <tr>
                                    <th data-options="field:'id',width:40,hidden:true">ID</th>
                                    <th data-options="field:'ysid',width:110">颜色序号</th>
                                    <th data-options="field:'ys',width:150">颜色</th>
                                    <th data-options="field:'cm',width:150">尺码</th>
                                    <th data-options="field:'jdsl',width:150">建档数量</th>
                                    <th data-options="field:'gpsl',width:100,editor:'numberbox'">生产入库数量</th>
                                    <th data-options="field:'kw',width:185,editor:'text',hidden:true">库位</th>
                                </tr>
                                </thead>
                            </table>
                            <div style="margin-top: 5px;">
                                <span style="color: blue;">温馨提示：</span><br/>
                                <span style="color: blue;">1.只有仓库为蛇口,品牌商为不贵的时候才会有(同时上架)按钮显示</span><br/>
                                <span style="color: blue;">2.只有生产入库数量大于0的才会被提交</span><br/>
                                <span style="color: blue;">3.当选择同时上架操作时,需要生产入库数量大于0的并且库位号不为空的才会被提交</span>

                            </div>
                        </div>
                    </form>
                </div>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/productionStorage.js"></script>
</body>

</html>