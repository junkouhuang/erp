<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<html>
<head>
    <title>用户信息-新增</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="shortcut icon" href="favicon.ico"> 
     <jsp:include page="cssPage.jsp"></jsp:include>
	
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body>
<div class="page-container">
	<fieldset>
		<form action="" id="userAccountForm">
			<table class="table mb-0" >
				<tr>
				<td width="80" >用户名：</td><td><input type="text" name="userName" id="userName" class="form-control radius" ></td>
				<td  width="80">姓名：</td><td><input type="text" name="realName" id="realName"  class="time1 form-control  radius"  ></td>
				<td  width="50">密码： </td><td><input type="text" name="userPass" id="userPass"  class="time1 form-control  radius"  ></td>
				</tr>
				<tr>
				<td>分组：</td><td><select id="menugroupid" name="menugroupid" class="select form-control radius"  style="height:34px;width: 100%"></select></td>
				<td>联系电话：</td><td> <input type="text" name="lxdh" id="lxdh"  class="form-control radius"></td>
	      		<td>邮箱：</td><td><input type="text" name="email" id="email"  class="time3 form-control  radius"  ></td>
				</tr>
	      		<tr>
				<td>职务：</td><td><input type="text" name="zw"  id="zw" class="form-control radius"></td>
	      		<td>门店：</td><td> <select id="storeid" name="storeid" class="select form-control radius"  style="height:34px;width: 100%"></select></td>
	      		</tr>
	      	</table>
	</form>
	</fieldset>
</div>
<!-- <div class="page-container">
    <fieldset>
        <form name="userAccountForm" id="userAccountForm">
            <table class="table mb-0">
                <tr>
                    <td width="80" class="glyphicon-asterisk">用户名：</td>
                    <td width=""><input type="text" name="userName" id="userName" class="form-control radius"/></td>
                    <td width="80" class="glyphicon-asterisk">姓名：</td>
                    <td width=""><input type="text" name="realName" id="realName" class="time1 form-control  radius">
                    </td>
                    <td width="80" class="glyphicon-asterisk">密码：</td>
                    <td width=""><input type="password" name="userPass" id="userPass"class="time1 form-control  radius"></td>
                </tr>
                <tr>
                    <td width="80" class="glyphicon-asterisk">分组：</td>
                    <td width=""><select id="menugroupid" name="menugroupid" class="select form-control radius"
                                            style="height:34px;width: 100%"></select></td>
                    <td width="80" class="glyphicon-asterisk">联系电话：</td>
                    <td width=""><input type="text" name="lxdh" id="lxdh" class="form-control radius"/></td>
                    <td width="80" class="glyphicon-asterisk">邮箱：</td>
                    <td width=""><input type="text" name="email" id="email" class="form-control radius"/></td>
                </tr>
                <tr>
                    <td width="80" class="glyphicon-asterisk">职务：</td>
                    <td width=""><input type="text" name="zw" id="zw" class="time1 form-control  radius"></td>
                    <td width="80" class="glyphicon-asterisk">门店：</td>
                    <td width="" 
                    >
                        <select class="combobox form-control" name="storeid" id="storeid"></select>
                    </td>
                </tr>
            </table>
        </form>
    </fieldset>
</div> -->
</body>
    <jsp:include page="jsPage.jsp"></jsp:include>
     <script src="${pageContext.request.contextPath}/js/userAccount-add.js"></script>
</html>