<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>门店修改界面</title>
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
                    <form class="m-t" id="store-Form">
                        <div style="float:left;border: 1px solid #ddd;width: 300px;">
                            <span style="float:left;color:blue;">基本信息</span>
                            <table cellpadding="5" style="margin-left: 8px;margin-top: 4px;">
                                <tr>
                                    <td class="pb-3">门店编码:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="mdcode" name="mdcode"
                                        data-options="required:true,validType:'text',width:200,missingMessage:'请填写门店编码'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">财务编码:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="cwcode" name="cwcode"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写财务编码'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">门店名称:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="mdmc" name="mdmc"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写门店名称'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="boss" name="boss"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主名称'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主电话:</td>
                                    <td class="pb-3"><input class="easyui-numberbox" id="bosslxdh" name="bosslxdh"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主电话'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主手机:</td>
                                    <td class="pb-3"><input class="easyui-numberbox" id="bosslxsj" name="bosslxsj"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主手机号'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主QQ:</td>
                                    <td class="pb-3"><input class="easyui-numberbox" id="bossqq" name="bossqq"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主QQ号'"  />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主微信:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="bosswx" name="bosswx"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主微信号'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店主Email:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="bossemail" name="bossemail"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店主Email'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店长:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="dz" name="dz"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店长手机号'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店长QQ:</td>
                                    <td class="pb-3"><input class="easyui-numberbox" id="dzqq" name="dzqq"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店长QQ号'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店长微信:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="dzwx" name="dzwx"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店长微信号'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">店长Email:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="dzemail" name="dzemail"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写店长Email'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">门店类型:</td>
                                    <td class="pb-3">
                                        <input class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择门店类型'" name="mdlx" id="mdlx" list="carsmdlx"  />
                                        <datalist id="carsmdlx"></datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">代理:</td>
                                    <td class="pb-3">
                                        <input class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择代理'"name="dl" id="dl" list="cars"  />
                                        <datalist id="cars"></datalist>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="float:left;border: 1px solid #ddd;width: 320px;margin-left: 30px;">
                            <span style="float:left;color:blue;">扩展信息</span>
                            <table cellpadding="5" style="margin-left: 8px;margin-top: 4px;">
                                <tr>
                                    <td class="pb-3">门店地址:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="mddz" name="mddz"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写门店地址'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">门店面积:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="mdmj" name="mdmj"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写门店面积'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">加盟费:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="jmf" name="jmf"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写加盟费'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">计划缴费时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="jhjfsj" name="jhjfsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写计划缴费时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">实际缴费金额:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="sjskje" name="sjskje"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写实际缴费金额'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">实际缴费时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="sjsksj" name="sjsksj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写实际缴费时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">押金:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="yj" name="yj"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写押金'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">计划交款时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="jhyjsj" name="jhyjsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写计划交款时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">实际交款金额:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="sjyjje" name="sjyjje"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写实际交款金额'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">实际交款时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="sjyjsj" name="sjyjsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写实际交款时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">计划开店时间:</td>
                                    </td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="jhkdsj" name="jhkdsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写计划开店时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">实际开店时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="sjkdsj" name="sjkdsj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写实际开店时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">签约时间:</td>
                                    <td class="pb-3"><input class="easyui-datetimebox" id="qysj" name="qysj"
                                                            data-options="formatter:ww4,parser:w4,required:true,validType:'text',width:200,missingMessage:'请填写签约时间'">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">签约人:</td>
                                    <td class="pb-3">
                                        <input class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择代理'" name="jbrid" id="jbrid" list="carsjbrid"  />
                                        <datalist id="carsjbrid"></datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">跟单员:</td>
                                    <td class="pb-3">
                                        <input class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择代理'" id="gdyid" name="gdyid" list="carsgdyid"  />
                                        <datalist id="carsgdyid"></datalist>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="float:left;border: 1px solid #ddd;width: 300px;margin-left: 30px;">
                            <span style="float:left;color:blue;">选项信息</span>
                            <table cellpadding="5" style="margin-left: 8px;margin-top: 4px;">
                                <tr>
                                    <td class="pb-3">省份:</td>
                                    </td>
                                    <td class="pb-3">
                                        <input id="peid" name="peid" list="carstpeid"  class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择省份'" />
                                        <datalist id="carstpeid" ></datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">城市:</td>
                                    <td class="pb-3">
                                        <input id="ctyname" name="ctyname" list="ctyname_list"  class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择城市'" />
                                        <datalist id="ctyname_list"></datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">备注:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="bz" name="bz"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写备注'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">气候:</td>
                                    <td class="pb-3">
                                        <select id='cmjb' class='easyui-combobox' name='cmjb' data-options='width:200,required:true,missingMessage:"请选择气候类型"'>
                                            <option></option>
                                            <option value="南">南</option>
                                            <option value="中">中</option>
                                            <option value="北">北</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">码数:</td>
                                    <td class="pb-3">
                                        <select id='jgjb' class='easyui-combobox' name='jgjb' data-options='width:200,required:true,missingMessage:"请选择码数类型"'>
                                            <option></option>
                                            <option value="小">小</option>
                                            <option value="中">中</option>
                                            <option value="大">大</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">货品档次:</td>
                                    <td class="pb-3">
                                        <select id='jjjb' class='easyui-combobox' name='jjjb' data-options='width:200,required:true,missingMessage:"请选择货品档次"'>
                                            <option></option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">营业级别:</td>
                                    <td class="pb-3">
                                        <select id='yyejb' class='easyui-combobox' name='yyejb' data-options='width:200,required:true,missingMessage:"请选择营业级别"'>
                                            <option></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">支持度级别:</td>
                                    <td class="pb-3">
                                        <select id='zcdjb' class='easyui-combobox' name='zcdjb' data-options='width:200,required:true,missingMessage:"请选择支持度级别"'>
                                            <option></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">信用额度:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="xyed" name="xyed"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写信用额度'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">收货人:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="shrname" name="shrname"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写收货人'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">收货地址:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="shdz" name="shdz"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写收货地址'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">联系电话:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="lxdh" name="lxdh"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写联系电话'" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">品牌商:</td>
                                    <td class="pb-3">
                                        <input id="tradeid" name="tradeid" list="carstrade" editable="false" class="easyui-textbox" data-options="required:true,validType:'text',width:200,missingMessage:'请选择品牌商'" />
                                        <datalist id="carstrade"></datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pb-3">批发折扣:</td>
                                    <td class="pb-3"><input class="easyui-textbox" id="wholerate" name="wholerate"
                                                            data-options="required:true,validType:'text',width:200,missingMessage:'请填写批发折扣'" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <input type="text" name="dlid" hidden id="dlid" />
                        <input type="text" name="dlmc" hidden id="dlmc" />
                        <input type="text" name="pename" hidden id="pename" />
                        <input type="text" name="gdy" hidden id="gdy" />
                        <input type="text" name="jbr" hidden id="jbr" />
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/store-opt.js"></script>
</body>

</html>