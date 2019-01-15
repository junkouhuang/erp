var flcgdanId; //打印的时候需要传递的参数
var status;
$(function () {
	//执行一个laydate实例
	laydate.render({
		  elem: '#time',
		  range: true
	});
	
	//1.初始化Table
    table =  $('#flcgdan_table').bootstrapTable({  //表格ID
        method:'POST',
        dataType:'json',
        toolbar:"#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url:pageContext+"/flcgdanController/getListPage",
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
            field : 'flcgdancode',
            title : '采购单号',
            align : 'center',
            valign : 'middle',
            sortable : true
        },
        {
            field : 'flGysxx.flgysmc',
            title : '供应商名称',
            align : 'center',
            valign : 'middle',
            sortable : true
        },{
            field : 'createtime',
            title : '创建时间',
            align : 'center',
            valign : 'middle'
        }, {
            field : 'status',
            title : '状态',
            align : 'center',
            valign : 'middle',
            formatter : function(value, row, index) {
				if (value == '0')
					return "新增";
				if (value == '1')
					return "确认";
				if (value == '2')
					return "审核";
				if (value == '3')
					return "入库";
				return "错误";
			}
        } ],  
        onClickRow: function (row, $element) {  
        	flcgdanId = row.id;
        	status = row.status;
	     },	 
	   	 onCheck:function(row){
	   		flcgdanId = row.id;
	   		status = row.status;
	      }
    });
    $('#flcgdan_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
});

var  table = null;
function queryParams(params) {
	var time = $("#time").val();
	var flcgdancode = $("#flcgdancode").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pageSize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order, //排序方式
            time:time,
            flcgdancode:flcgdancode
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
	 $("#flcgdan_table").bootstrapTable('refresh', queryParams);
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-16 下午5:40:16
  * 模块名称:辅料采购单界面
  * 操作:新增
  *
  */
 function addFlcgdan(){
	 layer.open({
	      type: 2,
	      title: '新增辅料采购单',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['700px', '450px'],
	      content: 'flcgdan-add?flcgdanId='+flcgdanId,
	      btn:['确定','取消'],
	      yes:function(index, layero){
	    	  	var posData = $(layero).find("iframe")[0].contentWindow.formData();
	    		if(posData.flcgdancode == ''){
	    			layer.msg('采购单号不能为空！！',function(){});
	    		}else{
	    				$.ajax({
	    			    	url:pageContext+"/flcgdanController/addFlcgdan",
	    				  	type:"post",
	    				 	data:  JSON.stringify(posData),  
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
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-16 下午5:53:07
  * 模块名称:辅料采购单
  * 操作:修改
  *
  */
 function updFlcgdan(){
	 if(flcgdanId!=undefined){
		 if(status==0){
			 layer.open({
			      type: 2,
			      title: '辅料单修改界面',
			      shade: [0.8, '#393D49'],
			      maxmin: true, //开启最大化最小化按钮
			      area: ['700px', '450px'],
			      content: 'flcgdan-upd?flcgdanId='+flcgdanId,
			      btn:['确定','取消'],
			      yes:function(index, layero){
			    	  	var posData = $(layero).find("iframe")[0].contentWindow.formData();
			    		if(posData.flcgdancode == ''){
			    			layer.msg('采购单号不能为空！！',function(){});
			    		}else{
			    				$.ajax({
			    			    	url:pageContext+"/flcgdanController/updateFlcgdan",
			    				  	type:"post",
			    				 	data:  JSON.stringify(posData),  
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
			 layer.alert("该采购单已不属于新增状态，不能修改！！");
		 }
	 }else{
		 layer.msg('请选择需要修改的辅料采购单！！',function(){});
	 };
 }
 
 //确认
 function confirmFlcgdan(){
	 if(flcgdanId!=undefined){
		 if(status==2){
			 layer.alert("当前数据已经确认过了！！"); 
		 }else{
			 $.ajax({
				 url:pageContext+"/flcgdanController/confirmFlcgdan?id="+flcgdanId,
				 type:"post",
				 dataType:"json",
				 async:false,  
				 cache:false,
				 success:function(data){
					 alert(data.msg);
					 if(data.success){
						 window.location.reload();
					 }
				 }
			 });	
		 }
	 }else{
		 layer.msg('请选择需要确认的辅料采购单！！',function(){});
	 }
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-29 上午11:31:54
  * 模块名称:
  * 操作:审核
  *
  */
 function auditFlcgdan(){
	 if(flcgdanId!=undefined){
		 if(status==0){
			 layer.alert("请先确认再审核！！");
		 }else{
			 if(status==2){
				 layer.alert("当前数据已经审核过了！！");
			 }else{
				 layer.open({
					 type: 2,
					 title: '审核',
					 shade: [0.8, '#393D49'],
					 maxmin: true, //开启最大化最小化按钮
					 area: ['700px', '450px'],
					 content: 'flcgdan-upd?audit=1&flcgdanId='+flcgdanId,
					 btn:['确定','取消'],
					 yes:function(index, layero){
						 var posData = $(layero).find("iframe")[0].contentWindow.formData();
						 if(posData.flcgdancode == ''){
							 layer.msg('采购单号不能为空！！',function(){});
						 }else if(posData.flgysid == ''){
							 layer.msg('请选择供应商！！',function(){});
						 }else{
							 $.ajax({
								 url:pageContext+"/flcgdanController/updateFlcgdan",
								 type:"post",
								 data:  JSON.stringify(posData),  
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
			 }
		 }
	 }else{
		 layer.msg('请选择需要审核的辅料采购单！！',function(){});
	 }
 }

 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-29 下午1:39:22
  * 模块名称:
  * 操作:入库
  *
  */
 function rkFlcgdan(){
	 if(flcgdanId!=undefined){
		 if(status==2){
			 layer.open({
				 type: 2,
				 title: '入库',
				 shade: [0.8, '#393D49'],
				 maxmin: true, //开启最大化最小化按钮
				 area: ['700px', '450px'],
				 content: 'flcgdan-inport?rk=1&flcgdanId='+flcgdanId,
				 btn:['确定','取消'],
				 yes:function(index, layero){
					 var posData = $(layero).find("iframe")[0].contentWindow.formData();
					 if(posData.cgmxLen.length>0){
						 $.ajax({
							 url:pageContext+"/flcgdanController/rkFlcgdan",
							 type:"post",
							 dataType:"json",
							 async:false,  
							 data: {"flcgdanid":flcgdanId},  
							 cache:false,
							 success:function(data){
								 if(data.success){
									 alert("入库成功！");
									 window.location.reload();
								 }else{
									 layer.alert(data.msg);
								 }
							 }
						 });	
					 }else{
						 layer.alert("请增加库位！");
					 }
				 },cancel:function(index){
					 layer.close(index);
				 }
			 });
		 }else{
			 layer.alert("需要审核之后才能进行入库操作!!");
		 }
	 }else{
		 layer.msg('请选择需要入库的辅料采购单！！',function(){});
	 }
 }
 
 //打印
 function printFlcgdan(){
		var flag=false;
		$("#flcgdan_table tr").each(function(){
			if($(this).find("input").is(":checked")){
				flag=true;
				return false;
			}
		});
		if(flag){
		 layer.open({
		      type: 2,
		      title: '辅料采购单打印预览页面',
		      shade: [0.8, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px', '530px'],
		      content: pageContext+'/flcgdanController/printFlcgdan?id='+objId
		    });
	 }else{
		 layer.msg('请选择需要打印预览的辅料采购单！！',function(){});
	 }
 }