<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>分拣信息添加界面</title>
    <link rel="shortcut icon" href="favicon.ico">

 	<jsp:include page="cssPage.jsp"></jsp:include>

     <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";

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

    <style>
    	.tabs-container .panel-body {padding:0;}
    </style>
</head>

<body style="overflow:hidden;">
	<div class="easyui-tabs" style="width:99%;height:600px;margin-left:4px;">
		<div title="基础信息" style="padding:10px">
			 <form id="sort_out_table" name="sort_out_table" method="post">
				 <div>
					 姓名/工号：<input style="margin: 0px;padding-top: 0px;padding-bottom: 0px;height: 25px;line-height: 25px;width: 152px;border-radius: 5px;" id="ygmc_code" name="ygmc_code" />
				 </div>
				 <div style="float:left;">
					 <table id="ygxx-tb" class="easyui-datagrid" style="width:400px;height:150px"
							data-options="singleSelect: false,ctrlSelect:'true',rownumbers:'true',idField:'id', onClickCell:onClickRow">
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
				<div style="float: left">
					<table style="margin-top: 10px;" cellpadding="5">
						<tr>
							<td  class="pb-3">自编码:</td>
							<td  class="pb-3"><input class="easyui-textbox" disabled id="itemno" name="itemno" data-options="required:true,validType:'text',width:154,missingMessage:'请输入自编码'"></input></td>
							<td class="pb-3">品牌定向:</td>
							<td class="pb-3"><input class="easyui-textbox" name="ppdx" data-options="required:false,validType:'text',width:154,missingMessage:'请输入品牌定向'"/></td>
							<td class="pb-3">工程单单号:</td>
							<td class="pb-3"><input disabled class="easyui-textbox" id="fjdanhao" name="fjdanhao" data-options="required:true,validType:'text',width:154,missingMessage:'请输入分拣工程单单号'"></input></td>
						</tr>
						<tr>
							<td class="pb-3">商品类别:</td>
							<td class="pb-3" onclick="selectSplb()">
								<input class="easyui-textbox" name="lbmc" id="lbmc" data-options="iconCls:'icon-add',required:true,validType:'text',prompt:'选择类别,生成编码',width:154,missingMessage:'选择类别,生成编码'"  />
							</td>
							<td class="pb-3">商品编码:</td>
							<td class="pb-3"><input class="easyui-textbox" disabled id="spcode" name="spcode" data-options="required:true,validType:'text',prompt:'请先选择类别',width:154,missingMessage:'请先选择类别'"></input>
							<td class="pb-3">单位:</td>
							<td class="pb-3" onclick="dw()">
								<input class="easyui-textbox" name="dw" id="dw"data-options="iconCls:'icon-add',required:true,validType:'text',width:154,prompt:'点击图标+添加单位',missingMessage:'点击图标+添加单位'"  />
							</td>
						</tr>
						<tr>
							<td class="pb-3">商品名称:</td>
							<td class="pb-3"><input class="easyui-textbox" id="spmc" name="spmc" data-options="required:true,validType:'text',width:154,missingMessage:'请输入商品名称'"/></td>
							<td class="pb-3">品牌:</td>
							<td class="pb-3" onclick="brandInfoWindows()"><input class="easyui-textbox" id="brand" name="brand" data-options="iconCls:'icon-add',required:true,validType:'text',prompt:'点击+号选择品牌',width:154,missingMessage:'请点击+号选择品牌'"></input></td>
							<td class="pb-3">材质:</td>
							<td class="pb-3"><input class="easyui-textbox"id="cz" name="cz" data-options="required:true,validType:'text',width:154,missingMessage:'请输入材质'"></input></td>
						</tr>
						<tr>
							<td class="pb-3">吊牌价格:</td>
							<td class="pb-3"><input class="easyui-numberbox"  min="0.1" value="" max="100000000" precision="1" onkeyup="this.value=this.value.replace(/\D/g,'')" id="price" name="price" data-options="required:true,width:154,missingMessage:'请输入吊牌价格'"/></td>
							<td class="pb-3">零售价格:</td>
							<td class="pb-3"><input class="easyui-numberbox"   min="0.1" value="" max="100000000" precision="1"  onkeyup="this.value=this.value.replace(/\D/g,'')" id="sellprice"  name="sellprice" data-options="required:true,width:154,missingMessage:'请输入零售价格'"></input></td>
							<td class="pb-3">零售折扣:</td>
							<td class="pb-3"><input class="easyui-numberspinner" value="1" id="sellrate"  name="sellrate"  min="0" max="1"  precision="1" increment="0.1" data-options="required:true,validType:'text',prompt:'0.5表示5折,1表示不打折',width:154,missingMessage:'请选择零售折扣'" /></td>
						</tr>
						<tr>
							<td class="pb-3">批发折扣:</td>
							<td class="pb-3"><input class="easyui-numberspinner"  id="rate" name="rate"  min="0" max="1"  value="0.5"  precision="1"    increment="0.1" data-options="required:true,validType:'text',prompt:'0.5表示5折,1表示不打折',width:154,missingMessage:'请选择批发折扣'" ></input></td>
							<td class="pb-3">商品类型:</td>
							<td class="pb-3">
								<select id='goodtype' class='easyui-combobox' name='goodtype' data-options='width:154'>
									<option selected value="0">可售商品</option>
									<option value="1">物料</option>
									<option value="2">赠品</option>
									<option value="3">现金购换</option>
									<option value="4">积分购换</option>
									<option value="5">折扣商品</option>
									<option value="6">可售商品A</option>
								</select>
							</td>
							<td class="pb-3">地区:</td>
							<td class="pb-3">
								<select id='area' class='easyui-combobox' name='dq' data-options='width:154'>
									<option value= 0>极北</option>
									<option value= 1>北部</option>
									<option value= 2>中部</option>
									<option value= 2>南部</option>
									<option value= 2>极南</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="pb-3">年龄段:</td>
							<td class="pb-3">
								<select id='yearduan' class='easyui-combobox' name='yearduan' data-options='width:154'>
									<option value= 0>老年</option>
									<option value= 1>中年</option>
									<option value= 2>童年</option>
									<option value= 3>通用</option>
									<option value= 4>积分换购</option>
									<option value= 5>折售商品</option>
								</select>
							</td>
							<td class="pb-3">档次:</td>
							<td class="pb-3">
								<select id='style' class='easyui-combobox' name='style' data-options='width:154'>
									<option value= 0>A</option>
									<option value= 1>B</option>
									<option value= 2>C</option>
								</select>
							</td>
							<td  class="pb-3">产品类型:</td>
							<td  class="pb-3">
								<select id='lx' class='easyui-combobox'  data-options="width:154,required:true,missingMessage:'请击+号添加限区域'">
									<option value= 0>现货</option>
									<option value= 1>预定</option>
									<option value= 2>生活</option>
								</select>
							</td>
						</tr>
						<tr>
							<td class="pb-3">备注:</td>
							<td class="pb-3"><input class=" easyui-textbox" id="bz" name="bz" data-options="validType:'text',prompt:'请填写备注',width:154,missingMessage:'请填写备注'" ></input></td>
							<td class="pb-3">限区域:</td>
							<td class="pb-3" onclick="area()">
								<input  class=" easyui-textbox" name="toarea"  id="toarea" data-options="iconCls:'icon-add',required:true,validType:'text',prompt:'点击+号添加区域',width:154,missingMessage:'请点击+号添加区域'" ></input>
							</td>
							<td class="pb-3">是否单款: </td>
							<td class="pb-3">
								<div id="single" class="pl-0  pr-0 col-lg-3  col-md-3 col-sm-3 col-xs-3 pt-5" >
									<div class="icheckbox_square-green checked" style="position: relative;" onclick="isSingle(this)">
										<input type="checkbox" name="single" id="radio-5" class="i-checks"  style="position: absolute; opacity: 0;" value="true">
										<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
									</div>
									<label for="radio-3" class="">单款</label>
									<div class="icheckbox_square-green" style="position: relative;" onclick="isSingle(this)">
										<input type="checkbox" name="single" id="radio-6" class="i-checks" style="position: absolute; opacity: 0;" value="false">
										<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
									</div>
									<label for="radio-4" class="">非单款</label>
								</div>
							</td>
						</tr>
						<tr>
							<td class="pb-3">是否可退: </td>
							<td class="pb-3">
								<div id="spreturn" class="pl-0  pr-0 col-lg-3  col-md-3 col-sm-3 col-xs-3 pt-5" >
									<div class="icheckbox_square-green checked" style="position: relative;" onclick="isRadio(this)">
										<input type="checkbox" name="spreturn" id="radio-3" class="i-checks"  style="position: absolute; opacity: 0;" value="true">
										<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
									</div>
									<label for="radio-3" class="">可退</label>
									<div class="icheckbox_square-green" style="position: relative;" onclick="isRadio(this)">
										<input type="checkbox" name="spreturn" id="radio-4" class="i-checks" style="position: absolute; opacity: 0;" value="false">
										<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
									</div>
									<label for="radio-4" class="">不可退</label>
								</div>
							</td>
							<td class="pb-3">品牌商:</td>
							<td  class="pb-3">
								<select id='spxxtradeid' class='easyui-combobox'  data-options="width:154,required:true,missingMessage:'请选择品牌商'">
								</select>
							</td>
						</tr>
					</table>
				 </div>
			 </form>
		</div>

		<div title="明细" style="padding:1px">
			<table id="dg" class="easyui-datagrid" data-options="onClickCell: onClickRowDg,width:550,height:373">
				<thead>
					<tr>
						<th data-options="field:'id',width:90,align:'center',hidden:true">id</th>
						<th data-options="field:'oldid',width:90,align:'center',hidden:true">oldid</th>
						<th data-options="field:'ysid',width:90,align:'center',editor:'numberbox'">颜色序号</th>
						<th data-options="field:'ys',width:90,editor:'text',align:'center'">颜色</th>
						<th data-options="field:'cmcode',width:90,align:'center',align:'center'">尺码</th>
						<th data-options="field:'cm',width:90,align:'center',align:'center'">尺码名称</th>
						<th data-options="field:'jdsl',width:90,align:'center',editor:'numberbox',align:'center'">数量</th>
						<th data-options="field:'cz',width:98,align:'center',editor:'',align:'center'">操作</th>
					</tr>
				</thead>
			</table>
			<a href="#" class="easyui-linkbutton" class="fa  fa-barcode" style="width:90px;height:35px;position:absolute;top:20px;right:10px;" onclick="selCm()">
			<i class=" fa  fa-barcode" style="font-size: 20px; position: relative; top: 3px;right: 3px;"></i>选择尺码</a>
		</div>
	</div>


	<ul id="splbs" class="easyui-tree"  data-options="
			url:' ${pageContext.request.contextPath}/productLbController/getProductLbPageList',method:'post',animate:true"  style="display:none">
	</ul>
	<div id="dd" style="width:220px;height:380px;padding-left:2px">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appendBrand()">增加</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeitBrand()">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="acceptBrand()">确定</a>
	<table id="brand-tb" class="easyui-datagrid" style="width:200px;height:285px"
			data-options="url:' ${pageContext.request.contextPath}/spBatchController/getAllSpBrandInfo',method:'post',singleSelect: true,ctrlSelect:'true',rownumbers:'true'" >
	</table>
	</div>
	<div id="cm" style="width:500px;height:330px;padding-left:4px">
	<table id="mm" class="easyui-datagrid" style="width:500px;height:330px"
			data-options="toolbar: '#tb',url:' ${pageContext.request.contextPath}/sizeInfoController/selectSizeinfos',method:'post',selectOnCheck: true,rownumbers:'true'" >
	</table>
	<div id="tb" style="height:auto">
		<%--<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appendSizeinfo()">增加</a>--%>
		<%--<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeSizeinfo()">删除</a>--%>
		<%--<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true" onclick="cancel()">退出</a>--%>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-print',plain:true" onclick="printSizeinfos()">打印</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="accept()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true" ><label><input id="disabled" checked="checked"  type="checkbox" style="position: relative;top: 2px;"/>显示禁止</label></a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true" >
			<select style="width:120px;height:25px;" id="cmlxs"></select>
		</a>
	</div>
	</div>
	<div id="areas" style="width:285px;height:335px;padding-left:2px;">
	<table id="areas-tb" class="easyui-datagrid" style="width:285px;height:335px"
			data-options="toolbar: '#tarea',url:' ${pageContext.request.contextPath}/spxxController/selectAreas',method:'post',singleSelect: true,ctrlSelect:'true',rownumbers:'true'" >
	</table>
	</div>
		<div id="tarea" style="height:auto">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appArea()">增加</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeitArea()">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="acceptArea()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true" onclick="canceAreal()">退出</a>
	</div>
	<div id="dww" style="width:290px;height:335px;padding-left:2px;">
	<table id="dw-tb" class="easyui-datagrid" style="width:290px;height:335px"
			data-options="toolbar: '#dwTip',url:' ${pageContext.request.contextPath}/dwController/selectDwDTOList',method:'post',singleSelect: true,ctrlSelect:'true',rownumbers:'true'" >
	</table>
	</div>
	<div id="dwTip" style="height:auto">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="appendDw()">增加</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeitDw()">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="acceptDw()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true" onclick="cancelDw()">退出</a>
	</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/cgfjlist-addfjinfo.js"></script>
</body>
</html>