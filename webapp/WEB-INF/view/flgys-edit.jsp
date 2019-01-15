<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>辅料供应商管理-修改</title>
    <link rel="shortcut icon" href="favicon.ico"> 
    
    <jsp:include page="cssPage.jsp"></jsp:include>

    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
    
</head>

<body>
<div class="page-container">
	<fieldset>
		<form id="flGys_editFrom" action=""  class="p-">
			<input type="hidden" name="id" id="id"/>
			<table class="table">
				<tr>
					<td width="100" class="glyphicon-asterisk">名称:</td><td><input width="290" type="text" name="flgysmc" id="flgysmc" class="form-control radius"></td>
					<td width="110" class="glyphicon-asterisk">联系人:</td><td><input type="text" name="contacts" id="contacts" class="form-control radius"></td>
				</tr>
				<tr>
				<td class="glyphicon-asterisk">省:</td>
					<td>
				   		<select name="province" id="province" class="province3 form-control" id="province"></select>
					</td>
				<td class="glyphicon-asterisk">市：</td>
					<td>
				   		<select name="city" id="city" class="city3 form-control"  id="city"></select>
				   	<!-- 	<input tyle="text" style="width:85px;float:left;" value="生成编码" class="btn btn-primary radius"  onclick="createCode()"/> -->
				   	</td>
				</tr>
				
	      		<tr>
      			<td  width="100" class="glyphicon-asterisk">编码:</td><td><input width="290" type="text" name="flgyscode" id="flgyscode"  class="form-control radius"  onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')" readonly="readonly"></td>
				<td class="glyphicon-asterisk">类型</td>
				<td class="text-l" class="producttype">
				<fieldset class="fs ptn-12">
					   		<input name="type" value="网络" type="radio" class="radio-1  ml-10 posit2" id="radio-1"><label for="radio-1" class=" mr-10 ml-5">网络</label>
					   		<input name="type" value="厂家"  type="radio" class="radio-2  ml-5  posit2 mr-5"  id="radio-2"><label for="radio-2" >厂家</label>
				</fieldset>
				</td>
	      		</tr>
	      		<tr>
	      		<td class="glyphicon-asterisk">手机号码:</td><td><input type="tel" name="tel" id="tel" class="form-control radius text2" onkeyup="this.value=this.value.replace(/\D/g,'')"></td>
	      		<td>联系电话:</td><td><input type="tel" name="tel2" id="tel2" class="form-control radius producetext" onkeyup="this.value=this.value.replace(/\D/g,'')"></td>
	      		</tr>
	      		
	      		<tr>
	      		<td>QQ:</td><td><input type="text" name="qq" id="qq" class="form-control radius producetext" onkeyup="this.value=this.value.replace(/\D/g,'')"></td>
	      		<td>微信:</td><td><input type="text" name="wx" id="wx" class="form-control radius text1" onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')"></td>
	      		
				</tr>
				<tr>
				<td class="glyphicon-asterisk">地址：</td>
				<td><input type="text" name="addr" id="addr" class="form-control radius">
				</tr>
	      	</table>
		</form>
	</fieldset>
</div>

</body>

<jsp:include page="jsPage.jsp"></jsp:include>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/flgys-edit.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/area.js" ></script>
<script language="javascript" defer>new PCAS("province","city","area");</script>
</html>