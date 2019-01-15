<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料供应商管理</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    <jsp:include page="cssPage.jsp"></jsp:include>
    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
<div class="page-container">
	<fieldset>
		<form action=""  id="operatefl" method="post">
			<input type="hidden" name="id" id="id"/>
			<table class="table mb-0">
				<tr style="display:none">	<td><input type="text" name="flgysid" id="flgysid" class="form-control radius"  value="${pageModel.id}"  style="min-width:150px;" ></td></tr>
				<tr>
					<td width="80"  class="glyphicon-asterisk">名称:</td><td><input type="text" name="flgysmc" id="flgysmc" class="form-control radius"  value="${pageModel.flgysmc}"  style="min-width:150px;" ></td>
					<td  width="80"  class="glyphicon-asterisk">编码:</td><td><input  type="text" name="flgyscode" id="flgyscode"  class="form-control radius"  onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')" value="${pageModel.flgyscode}" style="min-width:150px;"  disabled="disabled"></td>
					<td width="80"  class="glyphicon-asterisk">联系人:</td><td><input type="text"  name="contacts" id="contacts" class="form-control radius" value="${pageModel.contacts}" style="min-width:150px;" ></td>
				</tr>
				<tr>
					<td>微信:</td><td><input type="text" name="wx" id="wx" class="form-control radius text1" onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')" value="${pageModel.wx}"></td>
					<td  class="glyphicon-asterisk">手机号码:</td><td><input type="tel" name="tel" id="tel" class="form-control radius text2" onkeyup="this.value=this.value.replace(/\D/g,'')" value="${pageModel.tel}"></td>
					<td  class="glyphicon-asterisk">类型</td>
					<td class="text-l" class="producttype" >
						<fieldset class="fs ptn-12" style="width:150px;">
							<c:if test="${pageModel.type!='网络' }">
					   			<input name="type" type="radio" class="radio-1 type posit2" value='网络' ><label for="radio-1 ml-5" class=" ml-5">网络</label>
							</c:if>
							<c:if test="${pageModel.type=='厂家' }">
					   			<input name="type" type="radio" class="radio-1 type posit2 ml-10" value='厂家' checked><label for="radio-1" class=" mr-10 ml-5">厂家</label>
							</c:if>
							<c:if test="${pageModel.type=='网络' }">
					   			<input name="type" type="radio" class="radio-1 type posit2" value='网络' checked><label for="radio-1" class=" mr-10 ml-5">网络</label>
							</c:if>
							<c:if test="${pageModel.type!='厂家' }">
					   			<input name="type"  type="radio" class="radio-2 type posit2 ml-10" value='厂家' ><label for="radio-2 ml-5">厂家</label>
							</c:if>
						</fieldset>
					</td>
				</tr>
	      		<tr>
	      			<td  class="glyphicon-asterisk">地址：</td><td><input type="text" name="addr" id="addr" class="form-control radius" value="${pageModel.addr}">
		      		<td>联系电话:</td><td><input type="tel" name="tel2" id="tel2" class="form-control radius producetext" onkeyup="this.value=this.value.replace(/\D/g,'')" value="${pageModel.tel2}"></td>
		      		<td>QQ:</td><td><input type="text" name="qq" id="qq" class="form-control radius producetext" onkeyup="this.value=this.value.replace(/\D/g,'')" value="${pageModel.qq}"></td>
	      		</tr>
	      		<tr>
	      			<td id="provinceData" class="${pageModel.province}" ><i class='glyphicon-asterisk'></i>省:</td>
					<td>
				   		<select name="province" id="province" class="province3 form-control" ></select>
					</td>
					<td id="cityData" class="${pageModel.city}" ><i class='glyphicon-asterisk'></i>市：</td>
					<td>
						<select name="city" id="city" class="city3 form-control" ></select>
				   	</td>
				</tr>
	      	</table>
	      	<div style="width:99%;margin-left:2px;">
		      	<table class="easyui-datagrid"   style="width:100%;height:150px;"  id="easyui-datagrid"   data-options="
					iconCls: 'icon-edit',
					singleSelect: true,
					toolbar: '#tb',
					rownumbers:true,
					method: 'get' ">
				    <thead>
						<tr>
						   <th data-options="field:'flid',width:60">id</th>
							<th data-options="field:'categroymc',width:200,align:'center'">名称</th>
							<th data-options="field:'flcode',width:100,align:'center'">编码</th>
							<th data-options="field:'gunge',width:60,align:'center'">规格</th>
							<th data-options="field:'dw',width:60,align:'center'">单位</th>
							<th data-options="field:'barcode',width:100,align:'center'">条码</th>
							<th data-options="field:'sellprice',width:100,align:'center'">零售价格</th>
						</tr>
				    </thead>
				    <tbody>
						<c:forEach var="flInfo"  items="${pageModel.list}">
						<tr>
							<td>${flInfo.id}</td><td>${flInfo.categroymc}</td><td>${flInfo.flcode}</td><td>${flInfo.gunge}</td><td>${flInfo.dw}</td><td>${flInfo.barcode}</td><td>${flInfo.sellprice}</td>
						</tr>
						</c:forEach >
					</tbody>
			    </table>
		    </div>
			<div id="tb" style="height:auto">
				<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="relevancefl();">关联辅料</a>
				<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removefl();">移除</a>
			</div>
		</form>
	</fieldset>
</div>
</body>
 <!--js公共模板  -->
 <jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/operatefl.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/area.js" ></script>
<script language="javascript" defer>new PCAS("province","city");</script>
</html>