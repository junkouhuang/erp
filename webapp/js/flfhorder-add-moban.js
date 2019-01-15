var id;//当前页面ID
var idArr = new Array();
$(function () {
	/*$("body",parent.document).find(".datagrid-view2 .datagrid-body tr").each(function(){
		var flid = $(this).find('#flid').text();
		if(flid != '' && flid != undefined){
			idArr.push(flid);
		}
	});*/
	//执行一个laydate实例
	laydate.render({
		  elem: '#time'
		  ,type: 'datetime'
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
	        showColumns:false, 
	        clickToSelect:true,
	        showRefresh:false,
	        pagination:true,
	        queryParamsType: 'undefined',
	        queryParams : queryParams,
	        responseHandler:rspHandler,
	        minimumCountColumns:2,
	        pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 4,                       //每页的记录行数（*）
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
	            field : 'createtime',
	            title : '创建时间',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'createname',
	            title : '创建人',
	            align : 'center',
	            valign : 'middle'
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
	        	id=row.id;
	        }
	    });
        $('#flfhorder_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
    });
var  table = null;
function queryParams(params) {
	var time = $("#time").val().replace(/(^\s*)|(\s*$)/g, "");
	var addOrupdName = $("#addOrupdName").val().replace(/(^\s*)|(\s*$)/g, "");
	var mobanmc = $("#mobanmc").val().replace(/(^\s*)|(\s*$)/g, "");
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
  * 创建时间:2017-11-19 上午14:37:34
  * 模块名称:辅料发货单新增界面-关联模板界面
  * 操作:确定
  *
  */


 var formData = function(){
	 if($("#flfhorder_table").bootstrapTable("getSelections").length>0){
		 return id;
/*		 $.ajax({
			 url:pageContext+"/flmobanController/getFlmoban",
			 type:'post',
			 dataType:'json',
			 data:{"id":id},
			 async:false,
			 success:function(data){*/
				 //alert($('#flfhorder_table').bootstrapTable("getSelections").length);
				 /*
				 var content;
				 for(var i in data.flinfoList){
					 var is = true;
					 for(var j in idArr){
						 if(idArr[j] == data.flinfoList[i].id){
							 is = false;
						 }
					 }
					 var json
					 if(is){
						 content+="<tr onclick='pitch(this)'>";
						 content+="<td width='280' style='text-align:center;display:none;' id='flid'>"+data.flinfoList[i].id+"</td>";
						 content+="<td width='80' style='text-align:center;'>"+data.flinfoList[i].flcode+"</td>";
						 content+="<td width='120' style='text-align:center;'>"+data.flinfoList[i].categroymc+"</td>";
						 content+="<td><input type='text' class='bor' class='bor' style='width:79px;text-align:center;' id='number'/></td>";
						 content+="<td style='width:80px;text-align:center;' id='sellprice'>"+data.flinfoList[i].sellprice+"</td>";
						 content+="<td><input type='text' class='bor' value='1' class='bor' style='width:79px;text-align:center;' id='sellrate'/></td>";
						 content+="</tr>";
					 };
				 }
				 $("body",parent.document).find(".datagrid-view2 .datagrid-body").append(content);
				 var index=parent.layer.getFrameIndex(window.name);
				 parent.layer.close(index);
			 */
			/*	 for(var i in data.flinfoList){
					 var is = true;
					 for(var j in idArr){
						 if(idArr[j] == data.flinfoList[i].id){
							 is = false;
						 }
					 }
								 if(is){
									 return data;	 
								 }
					 }
			 }
		 });*/
	 }else{
		 layer.msg("请选择一行！",function(){});
	 };
 	//return $("#flfhorder_table").bootstrapTable("getSelections");
 };
 //保存
 function  saveflfhorder(){
	/*var id;
	 var flag=false;
		$("#flfhorder_table tr").each(function(){
			if($(this).find("input").is(":checked")){
				id =$(this).find("input").val();
				flag=true;
				return false;
			}
		});
		if(flag){
		 $.ajax({
			 url:pageContext+"/flmobanController/getFlmoban",
			 type:'post',
			 dataType:'json',
			 data:{"id":id},
			 async:false,
			 success:function(data){
				 var content;
				 for(var i in data.flinfoList){
					 var is = true;
					 for(var j in idArr){
						 if(idArr[j] == data.flinfoList[i].id){
							 is = false;
						 }
					 }
					 if(is){
						 content+="<tr onclick='pitch(this)'>";
						 content+="<td width='280' style='text-align:center;display:none;' id='flid'>"+data.flinfoList[i].id+"</td>";
						 content+="<td width='80' style='text-align:center;'>"+data.flinfoList[i].flcode+"</td>";
						 content+="<td width='120' style='text-align:center;'>"+data.flinfoList[i].categroymc+"</td>";
						 content+="<td><input type='text' class='bor' class='bor' style='width:79px;text-align:center;' id='number'/></td>";
						 content+="<td style='width:80px;text-align:center;' id='sellprice'>"+data.flinfoList[i].sellprice+"</td>";
						 content+="<td><input type='text' class='bor' value='1' class='bor' style='width:79px;text-align:center;' id='sellrate'/></td>";
						 content+="</tr>";
					 }
				 }
				 $("body",parent.document).find(".datagrid-view2 .datagrid-body").append(content);
			     var index=parent.layer.getFrameIndex(window.name);
				 parent.layer.close(index);
			 }
		 });
		 
	 }else{
		 layer.msg("请选择一行！",function(){});
	 }*/
 }
	//取消关闭当前窗口
