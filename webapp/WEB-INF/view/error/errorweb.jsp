
<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<base href="<%=basePath%>">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>喜乐库ERP - error错误</title>
	<!--[if IE 8 ]><html class="no-js oldie ie8" lang="en"> <![endif]-->
	<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
	<!--[if (gte IE 9)|!(IE)]><!--><html class="no-js" lang="en"> <!--<![endif]-->
<head>

    <meta charset="utf-8">
	<title>web错误页面</title>
	<meta name="description" content="">  
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

   <link rel="stylesheet" href="css/error.css">  

	<script src="js/modernizr.js"></script>

	<link rel="icon" type="image/png" href="favicon.png">

</head>

<body>

	<!-- header 
   ================================================== -->
   <header class="main-header">
   	<div class="row">
   		<div class="logo">
	        <img alt="image" class="img-circle" src="${pageContext.request.contextPath}/img/logo.png"/>
	      </div>   		
   	</div>   

   	<a class="menu-toggle" href="#"><span>Menu</span></a>	
   </header> <!-- /header -->

   <!-- navigation 
   ================================================== -->
   <nav id="menu-nav-wrap">

   	<h5>Site Pages</h5>   	
		<ul class="nav-list">
			<li><a href="#" title="">Home</a></li>
			<li><a href="#" title="">About</a></li>
			<li><a href="#" title="">Portfolio</a></li>
			<li><a href="#" title="">Blog</a></li>
			<li><a href="#" title="">FAQ</a></li>					
			<li><a href="#" title="">Contact</a></li>					
		</ul>

		<h5>Some Text</h5>  
		<p>Lorem ipsum Non non Duis adipisicing pariatur eu enim Ut in aliqua dolor esse sed est in sit exercitation eiusmod aliquip consequat.</p>

	</nav>

	<!-- main content
   ================================================== -->
   <main id="main-404-content" class="main-content-slides">

   	<div class="content-wrap">

		   <div class="shadow-overlay"></div>

		   <div class="main-content">
		   	<div class="row">
		   		<div class="col-twelve">
			  		
			  			<h1 class="kern-this">Error.错误页面</h1>
			  			<p>
			  			${ex.message}
			  			</p>

			  			<div class="search">
				      	<form>
								<input type="button" id="s" name="s" class="search-field" value="返回首页">
							</form>
				      </div>	   			

			   	</div> <!-- /twelve --> 		   			
		   	</div> <!-- /row -->    		 		
		   </div> <!-- /main-content --> 

		   <footer>
		   	<div class="row">

		   		<div class="col-seven tab-full social-links pull-right">
			   		<ul>
				   		<li><a href="#"><i class="fa fa-facebook"></i></a></li>
					      <li><a href="#"><i class="fa fa-behance"></i></a></li>
					      <li><a href="#"><i class="fa fa-twitter"></i></a></li>
					      <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
					      <li><a href="#"><i class="fa fa-instagram"></i></a></li>   			
				   	</ul>
			   	</div>
		   			
		  			<div class="col-five tab-full bottom-links">
			   		<ul class="links">
				   		<li><a href="#">Homepage</a></li>
				         <li><a href="#">About</a></li>
				         <li><a href="mailto:joe@quatro.com">Report Error</a></li>			                    
				   	</ul>

				   	<div class="credits">
				   		<p>More Templates <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a></p>
				   	</div>
			   	</div>   		   		

		   	</div> <!-- /row -->    		  		
		   </footer>

		</div> <!-- /content-wrap -->
   
   </main> <!-- /main-404-content -->

   <div id="preloader"> 
    	<div id="loader"></div>
   </div> 
<script src="js/jquery-2.1.3.min.js"></script>
   <!-- Java Script
   ================================================== --> 
   <script src="js/plugins.js"></script>
   <script src="js/main.js"></script>

</body>

</html>