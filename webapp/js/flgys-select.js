var selectedid= '';
var flid =$("body",parent.document).find("#flinfo_table").find("input[type='checkbox']:checked").eq(0).val();
$(function () {
		//1.初始化Table
        table =  $('#flfhmx_table').bootstrapTable({  //表格ID
	        method:'POST',
	        dataType:'json',
	        toolbar:"#exampleTableEventsToolbar",
	        contentType: "application/x-www-form-urlencoded",
	        cache: false,
	        striped: true,//是否显示行间隔色
	        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
	        url:pageContext+"/FlGysxxController/getFlGysxxListByFlid",
	        singleSelect: true, //仅允许单选
	        //search: true,
	        showColumns:true, 
	        clickToSelect:true,//点击则选中
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
	        columns: [{ 
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
	        },{
	            field : 'flgysmc',
	            title : '供应商名称',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'flgyscode',
	            title : '编码',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'tel',
	            title : '联系电话',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'flgysFl.lastsellprice',
	            title : '上次交易金额',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'flgysFl.minsellprice',
	            title : '最低交易金额',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        },{
	            field : 'contacts',
	            title : '联系人',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }],  
	        onClickRow: function (row, $element) {  
	        	selectedid = row.id;
		     }
	    });
    $('#flinfo_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
    });


var  table = null;
function queryParams(params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pagesize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order, //排序方式
            flid:flid
        };  
        return temp;  
  }
//得到查询的参数      
function rspHandler (res) { 
   if (res) {
   	//循环确认是否有图片
   	$.each(res.list, function(index, item){
   		var isExistImage = '没有图片';
   		if(item.isimage){
   			isExistImage = '<a onclick="showImg(this)">图片浏览</a>';
   		}
   		item.isimage = isExistImage;
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

//新增辅料采购单
function addFlCgdan(){
	layer.open({
	      type: 2,
	      title: '新增辅料采购单界面',
	      skin: 'layui-layer-demo',     //样式类名
	      shade: [0.8, '#393D49'],
	      maxmin: true,     //开启最大化最小化按钮
	      area: ['800px', '500px'],
	      btn:['确定','取消'],
	      content: 'flgys-flcgdan-add',
	      yes: function(index, layero){
	    	  var posData = $(layero).find("iframe")[0].contentWindow.formData();
	    	  posData["id"]=obj.id;
	    	  //发送修改请求
	    	  $.ajax({
					url:pageContext+"/fhOrdersController/edtFhShinfo",
					data:posData,
					dataType:"json",
					async:true,
					type:"POST",   //请求方式
					success:function(data){
						if(data.success){
							layer.close(index);
						  $('#tbody').bootstrapTable('refresh',queryParams);
						}else{
							layer.msg(data.msg);
						}
						
					},error:function(){
					}
				});
	    	    //按钮【修改】的回调
	    	  }
	    	  ,btn2: function(index, layero){
	    	    //按钮【取消】的回调
	    		  layer.close(index); 
	    	  }
	    	  ,cancel: function(){ 
	    	    //return false; //开启该代码可禁止点击该按钮关闭
	    	  }
	    });
}

