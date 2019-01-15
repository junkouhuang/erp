var time ='';
//初始化bootstrap Table
$(function(){
    loadStore();
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
		        pageSize: 10,
		        pageList: [10, 50, 100, 500],        //可供选择的每页的行数（*）
		        idField :"id",
		        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		        showExport: true,                    
		        exportDataType: 'all',
		        columns: [
		        //动态创建列名
		        {       
		            field : 'storeid',
		            title : 'ID',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        },
		        {
		            field : 'mdcode',
		            title : '门店号',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        }, {
		            field : 'mdmc',
		            title : '门店名称',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'amount',
		            title : '销售金额',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        }, {
		            field : 'sl',
		            title : '数量',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'createtime',
		            title : '创建时间',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'type',
		            title : '类型',
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
		time = $("#time").val();
		var storeid = $("#storeid").val();
    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    			pageSize: params.pageSize,   //页面大小  
    			page: params.pageNumber, //页码  
                sortName: params.sort,  //排序列名  
                sortOrder:params.order, //排序方式
                time:time,
            	storeid:storeid
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
//显示门店销售报表
function show_merchandise_sales_report(){
	time = $("#time").val();
	var storeid = $("#storeid").val();
	if(time == ''){
		layer.msg("需要选择一个时间段！！",function(){});
	}else{
		window.location.href=pageContext+"/reportController/exportStoreSaleReport?time="+time+"&storeid="+storeid;
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
	$("#sales_report").bootstrapTable('refresh', {"url":pageContext+"/reportController/getStoreSaleReportPageInfo"});
}
// 加载门店
function loadStore() {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
}
