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
	            valign : 'middle'
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
	        } ],onClickRow:function(row,$element){
	        	$element.find("input").prop("checked",true).parents("tr").siblings().find("input").prop("checked",false);
	        }
	    });
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
 function addFlInfo(){
	 layer.open({
	      type: 2,
	      title: '新增辅料模板信息',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['893px', '600px'],
	      content: 'flmobaninfo-add'
	    });
 }
 function updFlInfo(){
		var flag=false;
		$("#flfhorder_table tr").each(function(){
			if($(this).find("input").is(":checked")){
				flag=true;
				return false;
			}
		});
			if(flag){
				 layer.open({
				      type: 2,
				      title: '修改辅料单',
				      shade: [0.8, '#393D49'],
				      maxmin: true, //开启最大化最小化按钮
				      area: ['893px', '600px'],
				      content: 'flmobaninfo-upd'
				    });
			}else{
				layer.msg("请选择需要修改的辅料发货单！！",function(){});
			}
		
		 
 }
 
 function printFlfhorder(){
	 var obj = $('#flfhorder_table').bootstrapTable('getSelections')[0];
	 if(obj == null){
		 layer.msg('请选择需要打印预览的辅料发货单！！',function(){});
	 }else{
		 layer.open({
		      type: 2,
		      title: '辅料发货单打印预览页面',
		      shade: [0.8, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px', '600px'],
		      content: pageContext+'/flFhorderController/printFlfhorder?id='+obj.id
		    });
	 }
 }