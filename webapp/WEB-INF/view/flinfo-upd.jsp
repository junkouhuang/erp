<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
<title>辅料信息-修改</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico"> 
    
	<jsp:include page="cssPage.jsp"></jsp:include>
	
	<script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
    </script>
</head>

<body>
<div class="page-container">
	<fieldset>
		<form  id="flinfoUpd">
			<table class="table mb-0">
				<tr>
					<td width="80"  class="glyphicon-asterisk">编码：</td><td width="130"><input type="text" name="flcode" id="flcode" class="form-control radius"  readonly="readonly"  onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')" /></td>
					<td  width="80"  class="glyphicon-asterisk">物料名称：</td><td width="130"><input type="text" name="categroymc" id="categroymc"  class="time1 form-control  radius"  ></td>
                     <td  width="80"  class="glyphicon-asterisk">类型： </td><td width="130"> <select  id="type" name="type" class="select form-control radius"   style="height:34px;width: 100%"></select></td>
				</tr>
				<tr>
					<td>规格：</td><td>  <input type="text" name="gunge"  id="gunge"  class="form-control radius" ></td>
					<td  class="glyphicon-asterisk">单位：</td><td> <input type="text" name="dw" id="dw"  class="form-control radius"></td>
					<td  class="glyphicon-asterisk">价格： </td>
					<td class="row">
						<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 pl-0 pr-5" >
							<input type="text" name="sellprice" id="sellprice" class="form-control radius "  >
						</div> 
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 p-0" >
							<select class="form-control radius p-0 " name="currency" id="currency" >
								<option value="A">元</option>
								<option value="B">角</option>
								<option value="C">分</option>
							</select>
						</div>
					</td>
				</tr>
	      		<tr>
				<td>材质：</td><td> <input type="text" name="cz" id="cz"  class="form-control radius"></td>
				<td>颜色：</td><td><input type="text" name="ys" id="ys" class="form-control radius"  ></td>
				<td>预警值：</td><td><input type="text" name="warntotal"  id="warnTotal"  class="time3 form-control  radius"  onKeyUp="this.value=this.value.replace(/\D/g,'')"></td>
	      		</tr>
	      		<tr>
				<td>条码：</td><td> <input type="text" name="barcode" id="barcode"  class="form-control radius" onkeyup="value = value.replace(/[\u4e00-\u9fa5]/g, '')"  readonly="readonly"></td>
				<td>最小采购数量：</td><td><input type="text" name="mincgsl" id="mincgsl" class="form-control radius"  onKeyUp="this.value=this.value.replace(/\D/g,'')"></td>
				<td>最大采购数量：</td><td><input type="text" name="maxcgsl" id="maxcgsl"  class="time3 form-control  radius"  onKeyUp="this.value=this.value.replace(/\D/g,'')"></td>
	      		</tr>
	      		<tr>
	      		<td>开始库存：</td><td><input type="text" name="startStock"  id="startStock" class="form-control radius" onKeyUp="this.value=this.value.replace(/\D/g,'')" ></td>
	      		<td>采购周期：</td><td><input type="text" name="cycle"  id="cycle" class="form-control radius" onKeyUp="this.value=this.value.replace(/\D/g,'')" ></td>
	      		<td>备注：</td><td colspan="2"><input type="text" name="bz"  id="bz" class="form-control radius"></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
</body>

<jsp:include page="jsPage.jsp"></jsp:include>

<!--请在下方写此页面业务相关的脚本-->
<script src="${pageContext.request.contextPath}/js/flinfo-upd.js"></script>
</html>