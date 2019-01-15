<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<html>
<head>
    <title>用户信息-新增</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="shortcut icon" href="favicon.ico"> 
     <link href="${pageContext.request.contextPath}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/animate.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/base.css" rel="stylesheet">
   <link href="${pageContext.request.contextPath}/css/contextMenu.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/plugins/easyui/themes/icon.css">
	
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
    </script>
</head>

<body class="gray-bg">
    <div class="wrapper  animated fadeIn posit6">
            <div class="col-sm-6">
                <div class="tabs-container">
					<div><span class="mr-50 badge ">部门</span><span class="ml-50 badge ">功能菜单</span></div>
                    <div class="tabs-left">
                        <ul class="nav nav-tabs" id="menugroupid" style="height:329px;overflow-y:auto;overflow-x:hidden;">
                           
                        </ul>
                        <div class="tab-content ">
						<div class="easyui-panel panel-body"  style="width: 231px;height: 329px;border-left: 1px solid #fff;">
								<ul id="tt" class="easyui-tree"  data-options="
								url:' ${pageContext.request.contextPath}/userController/selectWebMenus',
								method:'post',
								animate:true,
								checkbox:true
								" >        
								</ul>
								<!-- ,onClick: function(node){$(this).tree('beginEdit',node.target);}  编辑节点-->
						</div>
						</div>
						<div id="mm" class="easyui-menu" style="width:120px;">
							<div onclick="appendChildNode()" data-options="iconCls:'icon-add'">添加节点</div>
							<div onclick="removeChildNode()" data-options="iconCls:'icon-remove'">删除节点</div>
						</div>
						<div id="del" class="easyui-menu" style="width:120px;">
							<div onclick="removeChildNode()" data-options="iconCls:'icon-remove'">删除节点</div>
						</div>
						<div id="menu" class="easyui-menu" style="width: 50px; display: none;">
					    <!--放置一个隐藏的菜单Div-->
					    <div onclick="addPermission()" data-options="iconCls:'icon-add'" >增加</div>
					    <!--具体的菜单事件请自行添加，跟toolbar的方法是基本一样的-->
					    <div onclick="updPermission()" data-options="iconCls:'icon-edit'" >修改</div>
					    <div onclick="dekPermission()" data-options="iconCls:'icon-remove'" >删除</div>
					</div>
                    </div>

                </div>
            </div>
            <div class="col-sm-6">
                <div class="tabs-container">
	              <!--   <input class="easyui-searchbox" data-options="prompt:'请输入权限名称......'" style="width:100%;position:absolute;top:10px;" onclick="alert('asas')"> -->
	              <div>
		              <input class="form-control layer-date " type="text" placeholder="请输入权限名称....." id="permissionname" lay-key="1"  style="width:240px;float:left;">
		              <input class="btn btn-primary  layer-date" type="button" value="搜索" onclick="searchByPermissionName()">
	              </div>
                  <table id="dg" class="easyui-datagrid"  style="width:100%;height:315px;position: relative;top: -14px;"
										data-options="
											iconCls: 'icon-edit',
											singleSelect: false,
											method:'get',
											toolbar: '#tb',
											rownumbers:true,
											onClickRow: onClickRow
										">
									<thead>
										<tr>
											<th data-options="field:'id',width:120,align:'left',hidden:'hidden'">id</th>
											<th data-options="field:'permissionname',width:120,align:'left'">权限名称</th>
											<th data-options="field:'permissioncode',width:110,align:'left'">权限编码</th>
											<th data-options="field:'ck',checkbox:true"></th>
										</tr>
									</thead>
					</table>
                </div>
            </div>
	</div>
</body>
    <!-- 全局js -->
    <script src="${pageContext.request.contextPath}/js/jquery.min.js?v=2.1.4"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap.min.js?v=3.3.6"></script>
    <!-- 自定义js -->
    <script src="${pageContext.request.contextPath}/js/content.js?v=1.0.0"></script>
	<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.easyui.min.js" ></script>
	<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.etree.js" ></script>
	<script type="text/javascript"  src="${pageContext.request.contextPath}/js/plugins/easyui/jquery.etree.lang.js" ></script>
    <script src="${pageContext.request.contextPath}/js/plugins/layer/layer.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/jquery.serializejson.min.js" ></script>
    <script src="http://7jpri5.com1.z0.glb.clouddn.com/contextMenu.js"></script>
     <script src="${pageContext.request.contextPath}/js/permissionSetting.js"></script>
</html>