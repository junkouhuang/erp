<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>喜乐库ERP - 登录</title>

	<jsp:include page="cssPage.jsp"></jsp:include>

    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>

    <script type="text/javascript">
	     var pageContext="${pageContext.request.contextPath}";
	     function aClick() {
	    		$("#img").hide().attr('src','${pageContext.request.contextPath}/commonController/getJPGCode?' + Math.floor(Math.random() * 100)).fadeIn();
	    	}
    </script>

</head>

<body class="gray-bg">
    <div class="middle-box text-center loginscreen  animated fadeInDown">
        <div>
            <div>
                <h1 class="logo-name">库</h1>
            </div>
			<h3><span class="label label-danger">${errorMsg}</span></h3>
            <form class="form-horizontal"   action="${pageContext.request.contextPath}/userController/userlogin" method="post">
                <div class="">
				    <div class="m-t">
				    <input type="text" class="form-control" placeholder="用户名" name="userName" required value="${username}">
				    </div>
                </div>
                <div class="m-t">
                	<div class="">
                	 <input type="password" class="form-control" placeholder="密码" name="userPass" required>
                	</div>
                </div>
                <div class="form-group m-t">
					<div  class="col-sm-7  pull-left" >
							<input type="text" class="col-sm-7   form-control " id="inputPassword"  placeholder="请输入验证码" name="jcaptchacode" required>
					</div>
					<div  class="col-sm-5" >
							<img width="100%" height="34px"  id="img" class=" form-control"  src="${pageContext.request.contextPath}/commonController/getJPGCode"  onclick="aClick()">
					</div>
				</div>
                <button type="submit" class="btn btn-primary block full-width m-b">登 录</button>
            </form>
        </div>
    </div>
</body>
<jsp:include page="jsPage.jsp"></jsp:include>
</html>
