//初始化bootstrap Table
$(function(){
			//1.初始化Table
	         table=$('#sales_report').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:"", //请求后台的url
		        singleSelect: false, //仅允许单选
		        //search: true,
		        showColumns:true, //是否显示所有的列
		        showRefresh:true,//是否显示刷新按钮
		        pagination:true,//是否显示分页（*）
		        queryParamsType: 'undefined',
		        queryParams : queryParams,//传递参数（*）
		        responseHandler:rspHandler,
		        minimumCountColumns:2,//最少允许的列数
		        pageNumber:1,                       //初始化加载第一页，默认第一页
		        pageSize: 9,    
		        pageList: [9, 20, 50, 100],        //可供选择的每页的行数（*）
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
		            sortable : true
		        },
		        {
		            field : 'batchcode',
		            title : '批次号',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        }, {
		            field : 'createtime',
		            title : '开单日期',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'batchname',
		            title : '批次名称',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        }, {
		            field : 'hasphoto',
		            title : '图片',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'createtime',
		            title : '创建时间',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'status',
		            title : '状态',
		            align : 'center',
		            valign : 'middle'
		        }],  
	});
   //执行一个laydate实例
     laydate.render({
     	  elem: '#time',
     	  range: true
     });         
});
	var table = null;
	function queryParams(params) {
		var batchcode = $("#batchcode").val();
		var time = $("#time").val();
    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    			pageSize: params.pageSize,   //页面大小  
    			page: params.pageNumber, //页码  
                sortName: params.sort,  //排序列名  
                sortOrder:params.order, //排序方式
                batchcode:batchcode,
                time:time
            };  
            return temp;  
      }
	//得到查询的参数      
	 function rspHandler (res) {
		    if (res) {
		    	//循环确认是否有图片
		    	$.each(res.list, function(index, item){
		    		var isExistImage = '没有图片';
		    		if(item.hasphoto != null && item.hasphoto == true){
		    			isExistImage = '有图片';
		    		}
		    		if(item.status==0){
		    			item.status = '默认';
		    		}else if(item.status==1){
		    			item.status = '新品定向';
		    		}else if(item.status==2){
		    			item.status = '发布';
		    		}else if(item.status==3){
		    			item.status = '已配货';
		    		}else if(item.status==4){
		    			item.status = '补货定向';
		    		}else if(item.status==5){
		    			item.status = '补货';
		    		}else{
		    			item.status = '未知';
		    		}
		    		item.hasphoto = isExistImage;
		    	});
		    	
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
//显示商品销售报表
function show_merchandise_sales_report(){
	var obj = $('#sales_report').bootstrapTable('getSelections');
	var idArray = new Array();
	for ( var i in obj) {
		idArray[i] = obj[i].id;
	}
	var time = $("#time").val();
	if(idArray !=''){
		if(time == ''){
			layer.msg("需要选择一个时间段！！",function(){});
		}else{
			window.location.href=pageContext+"/reportController/exportSpBatchSaleReport?idList="+idArray+"&time="+time;
		}
	}else{
		layer.msg("未选择批次号！！",function(){});
	}
}
//选中记录操作
function xz(o){
	if($(o).is(":checked")){
		$(o).prop("checked",true);
		$("#tbody").find("#"+$(o).attr("id")).prop("checked",true);
	}else{
		$(o).prop("checked",false);
		$("#tbody").find("#"+$(o).attr("id")).prop("checked",false);
	}
	var _flag;
	$(".list").each(function(){
		if($(this).is(":checked")){
			_flag=true;
		}else{
			_flag=false;//存在没选中的则跳出循环
			return false;
		}
		return _flag;
	});
	if(_flag){
		$("#allChex").prop("checked",true);
	}else{
		$("#allChex").prop("checked",false);
	}
	   $(".check-order span").text($(".list:checked").length);
}
function LoadingDataListRealItems(){
	$("#sales_report").bootstrapTable('refresh', {"url":pageContext+"/reportController/getSpBatchListPageInfo"});
}