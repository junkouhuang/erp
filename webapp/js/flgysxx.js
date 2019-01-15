var flgysId; //供应商ID
$(function() {
	/**
	 * 
	 * 作者:黄金高
	 * 创建时间:2017-11-17 下午2:19:20
	 * 模块名称:辅料供应商
	 * 操作:初始化Table
	 *
	 */
	table = $('#flgystable').bootstrapTable({
						method : 'POST',
						dataType : 'json',
						toolbar : "#exampleTableEventsToolbar",
						contentType : "application/x-www-form-urlencoded",
						cache : false,
						striped : true,// 是否显示行间隔色
						sidePagination : "server",// 分页方式：client客户端分页，server服务端分页（*）
						url : pageContext+"/FlGysxxController/getFlGysxxList",
						singleSelect : true, // 仅允许单选
						// search: true,
						showColumns : true,
						clickToSelect:true,
						showRefresh : true,
						pagination : true,
						queryParamsType : 'undefined',
						queryParams : queryParams,
						responseHandler : rspHandler,
						minimumCountColumns : 2,
						page : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						pageList : [ 9, 20, 50, 100 ], // 可供选择的每页的行数（*）
						idField : "id",
						// uniqueId: "id", //每一行的唯一标识，一般为主键列
						showExport : true,
						exportDataType : 'all',
						columns : [ {
							checkbox : true
						}, {
							field : 'id',
							title : 'ID',
							align : 'center',
							valign : 'middle',
							sortable : true
						}, {
							field : 'flgysmc',
							title : '名称',
							align : 'center',
							valign : 'middle',
							sortable : true
						}, {
							field : 'flgyscode',
							title : '编号',
							align : 'center',
							valign : 'middle'
						},{
							field : 'contacts',
							title : '联系人',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'addr',
							title : '地址',
							align : 'center',
							valign : 'middle',
							sortable : true
						}, {
							field : 'province',
							title : '省份',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'city',
							title : '市',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'type',
							title : '状态',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'qq',
							title : 'QQ',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'wx',
							title : '微信',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'tel',
							title : '手机号码',
							align : 'center',
							valign : 'middle'
						}, {
							field : 'tel2',
							title : '备用号码',
							align : 'center',
							valign : 'middle'
						}],  
				        onClickRow: function (row, $element) {  
		        			flgysId=row.id;
				        },onCheck:function(row){
				        	flgysId=row.id;
				        }
					});
				$('#flgystable').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
				$('#dhprint').click(
					function() {
						var selectContent = table
								.bootstrapTable('getSelections')[0];
						if (typeof (selectContent) == 'undefined') {
							swal({
								title : "警告",
								text : "未选择任何调货单，请谨慎操作！",
								type : "warning",
								confirmButtonColor : "#DD6B55",
								confirmButtonText : "确认",
								closeOnConfirm : false
							});
						} else {
							var index = parent.layer
									.open({
										type : 2,
										content : "${pageContext.request.contextPath}/storedh/printStoreReport?dhid="+ selectContent.id,
										area : [ '300px', '195px' ],
										maxmin : true
									});
							parent.layer.full(index);

						}
					});
					laydate.render({
						  elem: '#time',
						  range: true
					});
});
var table = null;
function queryParams(params) {
		var flgysmc_search = $("#flgysmc_search").val();
		var flgyscode_search = $("#flgyscode_search").val();
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.pageSize,   //页面大小  
		page: params.pageNumber, //页码
		flgysmc_search:flgysmc_search,
		flgyscode_search:flgyscode_search
		};
		return temp;
}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 下午2:19:20
 * 模块名称:辅料供应商
 * 操作:得到查询的参数
 *
 */
function rspHandler(res) {
	if (res) {
		return {
			"rows" : res.list,
			"total" : res.total
		};
	} else {
		return {
			"rows" : [],
			"total" : 0
		};
	}
};
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 下午2:19:20
 * 模块名称:辅料供应商
 * 操作:查询刷新
 *
 */
function LoadingDataListOrderRealItems(){
	$("#flgystable").bootstrapTable('refresh', queryParams);
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:54:23
 * 模块名称:辅料供应商界面
 * 操作:打印
 *
 */

function printStoreReport(){
	if(flgysId!=''){
		layer.open({
		      type: 2,
		      title: '打印采购单',
		      shadeClose: true,
		      shade: false,
		      maxmin: true, //开启最大化最小化按钮
		      area: ['700px', '450px'],
		      content: pageContext+"/storedhController/printStoreReport?dhid="+flgysId
		});
	}else{
		layer.msg("请选择需要打印预览的辅料供应商单！！",function(){});
	}
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午4:36:25
 * 模块名称:辅料供应商界面
 * 操作:新增辅料供应商
 *
 */

	function addflgys(){
		layer.open({
		      type: 2,
		      title: '新增辅料供应商界面',
		      shadeClose: false,
		      shade: [0.8,"#393D49"],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['700px', '450px'],
		      btn:['确定','取消'],
		      content: 'flgys-add',
		      yes: function(index,layero){
		    	  var posData = $(layero).find("iframe")[0].contentWindow.formData();
		    		if(posData.flgysmc==""){
		    			layer.msg('供应商名称不能为空！！',function(){});
		    		}else if(posData.contacts==""){
		    			layer.msg('联系人不能为空！！',function(){});
		    		}else if(posData.province==""){
		    			layer.msg('请选择省份！！',function(){});
		    		}else if(posData.type == undefined){
		    			layer.msg('请选择类型！！',function(){});
		    		}else if(posData.tel == ''){
		    			layer.msg('手机号码不能为空！！',function(){});
		    		}/*else if(posData.tel2 == ''){
		    			layer.msg('联系电话不能为空！！',function(){});
		    		}else if(posData.qq == ''){
		    			layer.msg('QQ不能为空！！',function(){});
		    		}else if(posData.wx == ''){
		    			layer.msg('微信不能为空！！',function(){});
		    		}*/else if(posData.addr == ''){
		    			layer.msg('联系地址不能为空！！',function(){});
		    		}else{
		    			$.ajax({
	    					url:pageContext+"/FlGysxxController/addFlGysxx",
	    					type:"post",
	    					dataType:"json",
	    					data:posData, 
	    					async:false,  
	    					success:function(data){
	    						if(data.success){
	    							alert(data.msg);
	    							window.location.reload();
	    						}else{
	    							layer.alert(data.msg);
	    						}
	    					},error:function(){
	    		 	    		alert("请求失败！！");
	    			 	    }
	    				}); 
		    		}
		      },
		      btn2: function(index){
		    	  layer.close(index); 
		    	  }
		    });
	}
	/**
	 * 
	 * 作者:黄金高
	 * 创建时间:2017-11-17 下午2:18:10
	 * 模块名称:辅料供应商界面
	 * 操作:修改
	 *
	 */
	function editflgys(){
			if($("#flgystable").bootstrapTable("getSelections").length>0){
					layer.open({
						type: 2,
						title: '修改辅料供应商界面',
						shadeClose: false,
						shade: [0.8,"#393D49"],
						maxmin: true, //开启最大化最小化按钮
						area: ['700px', '450px'],
						btn:['确定','取消'],
						content: "flgys-edit",
						yes: function(index,layero){
					    	    var posData = $(layero).find("iframe")[0].contentWindow.formData();
					    	    posData["id"]=flgysId;
					    		if(posData.flgysmc==""){
					    			layer.msg('供应商名称不能为空！！',function(){});
					    		}else if(posData.contacts==""){
					    			layer.msg('联系人不能为空！！',function(){});
					    		}else if(posData.province==""){
					    			layer.msg('请选择省份！！',function(){});
					    		}else if(posData.type == undefined){
					    			layer.msg('请选择类型！！',function(){});
					    		}else if(posData.tel == ''){
					    			layer.msg('手机号码不能为空！！',function(){});
					    		}/*else if(posData.tel2 == ''){
					    			layer.msg('联系电话不能为空！！',function(){});
					    		}else if(posData.qq == ''){
					    			layer.msg('QQ不能为空！！',function(){});
					    		}else if(posData.wx == ''){
					    			layer.msg('微信不能为空！！',function(){});
					    		}*/else if(posData.addr == ''){
					    			layer.msg('联系地址不能为空！！',function(){});
					    		}else{
					    				$.ajax({
					    					url:pageContext+"/FlGysxxController/editFlGys",
					    					type:"post",
					    					dataType:"json",
					    					data:posData, 
					    					async:false,  
					    					success:function(data){
					    						if(data.success){
					    							alert(data.msg);
					    							window.location.reload();
					    						}else{
					    							layer.alert(data.msg);
					    						}
					    					},error:function(){
					    		 	    		alert("请求失败！！");
					    			 	    }
					    				}); 
					    		}
					      },
					      btn2: function(index){
					    	  layer.close(index); 
					    	  }
					});
			}else{
				layer.msg("请选择需要修改的供应商！！",function(){});
			}
	}
	
	/**
	 * 
	 * 作者:黄金高
	 * 创建时间:2017-11-17 下午2:19:20
	 * 模块名称:辅料供应商
	 * 操作:删除供应商联辅料
	 *
	 */
	function deleteflgys(){
		if(obj != null && obj != ''){
			if(confirm("你确定要删除ID为"+obj.id+"的记录吗？")){
				 $.ajax({
				    	url:pageContext+"/FlGysxxController/deleteFlGysByid",
					  	type:"post",
					 	data: {"id":flgysId},  
					  	dataType:"json",
					  	async:false,  
					    cache:false,
				    	success:function(data){
				    		alert(data.msg);
				    		if(data){
				    			window.location.reload();
				    		}
				 	    	},error:function(){
				 	    		alert("请求失败！！");
				 	    	}
					});		
			}
		}else{
			layer.msg("请选择需要删除的采购单！！",function(){});
		}
	}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 下午2:19:20
 * 模块名称:辅料供应商
 * 操作:关联辅料
 *
 */
function relevancefl(){
	if($("#flgystable").bootstrapTable("getSelections").length>0){
			layer.open({
				type: 2,
				title: '辅料供应商操作界面',
			    shadeClose: false,
			    shade: [0.1, '#393D49'],
				maxmin: true, //开启最大化最小化按钮
			    area: ['700px', '450px'], //宽高
			    btn: ['确定', '取消'], //可以无限个按钮
				content: pageContext+"/FlGysxxController/relationFlInfo?flgysid="+flgysId,
				 yes: function(index, layero){//按钮【确定】的执行的函数
					 var posData = $(layero).find("iframe")[0].contentWindow.formData();
					 posData["id"] = flgysId;
					 if(posData.flgysmc==""){
			    			layer.msg('供应商名称不能为空！！',function(){});
			    		}else if(posData.contacts==""){
			    			layer.msg('联系人不能为空！！',function(){});
			    		}else if(posData.province==""){
			    			layer.msg('请选择省份！！',function(){});
			    		}else if(posData.type == undefined){
			    			layer.msg('请选择类型！！',function(){});
			    		}else if(posData.tel == ''){
			    			layer.msg('手机号码不能为空！！',function(){});
			    		}/*else if(posData.tel2 == ''){
			    			layer.msg('联系电话不能为空！！',function(){});
			    		}else if(posData.qq == ''){
			    			layer.msg('QQ不能为空！！',function(){});
			    		}else if(posData.wx == ''){
			    			layer.msg('微信不能为空！！',function(){});
			    		}*/else if(posData.addr == ''){
			    			layer.msg('联系地址不能为空！！',function(){});
			    		}else{
					    	if(posData.relationList.length>0){
					    		  //发送【保存】请求
						    	  $.ajax({
										url:pageContext+"/FlGysxxController/addRelationFlInfo",
										data:JSON.stringify(posData),
										contentType:'application/json;charset=UTF-8',
										dataType:"json",
										async:true,
										type:"POST",   //请求方式
										success:function(data){
											alert(data.msg);
											window.location.reload();
										}
									});
					    	}else{
					    		layer.msg("请添加一条模板！",function(){});
					    	};
			    		}
			    	  } ,btn2: function(index, layero){
			    	    //按钮【取消】的回调
			    		  layer.close(index); 
			    	  }
			});
		}else{
			layer.msg("请选择需要关联的辅料供应商！",function(){});
		}
}

	
