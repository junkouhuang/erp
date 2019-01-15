var flmbId = '';
$(function () {
	//执行一个laydate实例
	laydate.render({
		  elem: '#time',
		  range: true
	});

		//1.初始化Table
        table =  $('#flfhorder_table').bootstrapTable({  //表格ID
	        method:'POST',
	        dataType:'json',
	        toolbar:"#exampleTableEventsToolbar",
	        contentType: "application/x-www-form-urlencoded",
	        cache: false,
	        striped: true,//是否显示行间隔色
	        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
	        url:pageContext+"/flmobanController/getFlmobanPage",
	        singleSelect: true, //仅允许单选
	        //search: true,
	        showColumns:true, 
	        showRefresh:true,
	        clickToSelect:true,
	        pagination:true,
	        queryParamsType: 'undefined',
	        queryParams : queryParams,
	        responseHandler:rspHandler,
	        minimumCountColumns:2,
	        pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 10,                       //每页的记录行数（*）
	        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
	        idField :"id",
	        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	        showExport: true,                    
	        exportDataType: 'all',
	        columns: [
            {
	            checkbox: true
	        },
	        //动态创建列名
	        {       
	            field : 'id',
	            title : 'ID',
	            align : 'center',
	            valign : 'middle',
	            display:'hidden',
	            sortable : true
	        },
	        {
	            field : 'mobanmc',
	            title : '模板名称',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'createname',
	            title : '创建人',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'createtime',
	            title : '创建时间',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'updatename',
	            title : '更新人',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'updatetime',
	            title : '更新时间',
	            align : 'center',
	            valign : 'middle'
	        } ],onClickRow:function( row, $element){
	        	flmbId = row.id;
	        },onCheck:function(row){
	        	flmbId = row.id;
	        }
	    });
        $('#flfhorder_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
    });
var  table = null;
function queryParams(params) {
	var time = $("#time").val();
	var addOrupdName = $("#addOrupdName").val();
	var mobanmc = $("#mobanmc").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pageSize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order, //排序方式
            time:time,
            addOrupdName:addOrupdName,
            mobanmc:mobanmc
        };  
        return temp;  
  }
//得到查询的参数      
 function rspHandler (res) { 
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
//搜索功能
 function LoadingDataListOrderRealItems(){
	 $("#flfhorder_table").bootstrapTable('refresh', queryParams);
 }
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-18 上午9:25:15
  * 模块名称:辅料模板信息
  * 操作:新增
  *
  */
 function addFlmoban(){
	 layer.open({
	      type: 2,
	      title: '新增辅料模板信息',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['700px', '450px'],
	      btn:['确定','取消'],
	      content: 'flmobaninfo-add',
		  yes:function(index, layero){
			  var posData = $(layero).find("iframe")[0].contentWindow.formData();
			  var mobanmc =posData.mobanmc;
				if(mobanmc == ''){
					layer.msg('模板名称不能为空！',function(){});
				}else{
		            var  datalist=posData.datalist;
					if(datalist.length == 0){
						layer.msg("添加模板，至少选择一个辅料信息!!",function(){});
					}else{
						var flf = { // 创建一个对象
								mobanmc: mobanmc,
								list:datalist
						};
							$.ajax({
						    	url:pageContext+"/flmobanController/addFlmoban",
							  	type:"post",
							 	data: JSON.stringify(flf),  
							  	contentType:'application/json;charset=UTF-8',
							  	dataType:"json",
							  	async:false,  
							    cache:false,
						    	success:function(data){
						    		alert(data.msg);
						    		if(data.success){
						    			window.location.reload();
						    		}
						 	    	},error:function(){
						 	    		alert("请求失败！！");
						 	    	}
							});	
					}
				}
		  },cancel:function(index){
				 layer.close(index);
			 }
	    });
 }

/**
 * 
 *
 * 作者:黄金高
 * 创建时间:2017-11-13 上午10:14:26
 * 模块名称:辅料模板信息
 * 操作:修改
 *
 */
 function updFlmoban(){
	 var row= $('#flfhorder_table').bootstrapTable("getSelections").length;
	 if(row>0){
		 layer.open({
		      type: 2,
		      title: '修改辅料模板信息',
		      shade: [0.8, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['700px', '450px'],
		      btn:['确定','取消'],
		      content: 'flmobaninfo-upd?flmbId='+flmbId,
			  yes:function(index, layero){
				  var posData = $(layero).find("iframe")[0].contentWindow.formData();
				  var mobanmc =posData.mobanmc;
					if(mobanmc == ''){
						layer.msg('模板名称不能为空！',function(){});
					}else{
			            var  datalist=posData.datalist;
						if(datalist.length == 0){
							layer.msg("添加模板，至少选择一个辅料信息!!",function(){});
						}
						var flf = { // 创建一个对象
								id:flmbId,
								mobanmc: mobanmc,
								list:datalist
						};
							$.ajax({
						    	url:pageContext+"/flmobanController/updateFlmoban",
							  	type:"post",
							 	data: JSON.stringify(flf),  
							  	contentType:'application/json;charset=UTF-8',
							  	dataType:"json",
							  	async:false,  
							    cache:false,
						    	success:function(data){
						    		alert(data.msg);
						    		if(data.success){
						    			window.location.reload();
						    		}
						 	    	},error:function(){
						 	    		alert("请求失败！！");
						 	    	}
							});	
					}
			  },cancel:function(index){
					 layer.close(index);
				 }
		    });
	 }else{
			layer.msg("请选择需要修改的辅料模板信息！！",function(){});
		}
 }
 
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-13 上午10:09:09
 * 模块名:辅料模板信息
 * 方法：删除
 */


 function deleteFlmoban(){
	 var row= $('#flfhorder_table').bootstrapTable("getSelections").length;
	if(row>0){
		$.ajax({
			url:pageContext+"/flmobanController/removeFlmoban?id="+flmbId,
			dataType:"json",
			async:true,
			type:"POST",   //请求方式
			success:function(data){
				alert(data.msg);
				if(data.success){
					window.location.reload();
				}
			},error:function(){
				
			}
		});
	}else{
		layer.msg("请选择需要删除的辅料模板信息！！",function(){});
	}
 }