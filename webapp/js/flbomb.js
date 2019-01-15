var idBuffer = '';
$(function () {
	$("body",parent.document).find(".datagrid-view2 .datagrid-body tr").each(function(){
		var flid = $(this).find('#flid').text();
		if(flid != '' && flid != undefined){
			idBuffer += flid +',';
		}
	});

		//1.初始化Table
        table =  $('#flinfo_table').bootstrapTable({  //表格ID
	        method:'POST',
	        dataType:'json',
	        toolbar:"#exampleTableEventsToolbar",
	        contentType: "application/x-www-form-urlencoded",
	        cache: false,
	        striped: true,//是否显示行间隔色
	        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
	        url:pageContext+"/flInfoController/getFlInfoPage",
	        singleSelect: false, //仅允许单选
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
	            field : 'categroymc',
	            title : '辅料名',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'flcode',
	            title : '编码',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'gunge',
	            title : '规格',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'dw',
	            title : '单位',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'sellprice',
	            title : '零售价格',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'barcode',
	            title : '条码',
	            align : 'center',
	            valign : 'middle'
	        } ],  
	        onClickRow: function (row, $element) {  
   			 //$element.find("input").prop("checked",true);
		        }
    
	    });
    });
var  table = null;
function queryParams(params) {
	var flcode = $("#flcode").val().val().replace(/(^\s*)|(\s*$)/g, "");
	var barcode = $("#barcode").val().val().replace(/(^\s*)|(\s*$)/g, "");
	var categroymc = $("#categroymc").val().val().replace(/(^\s*)|(\s*$)/g, "");
	var minSellprice = $("#minSellprice").val().val().replace(/(^\s*)|(\s*$)/g, "");
	var maxSellprice = $("#maxSellprice").val().val().replace(/(^\s*)|(\s*$)/g, "");
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pageSize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order, //排序方式
            flcode:flcode,
            barcode:barcode,
            categroymc:categroymc,
            minSellprice:minSellprice,
            maxSellprice:maxSellprice,
            idBuffer:idBuffer
        };  
        return temp;  
  }
//得到查询的参数      
 function rspHandler (res) { 
    if (res) {
    	//循环确认是否有图片
    	$.each(res.list, function(index, item){
    		var isExistImage = '没有图片';
    		if(item.isimage != null && item.isimage == true){
    			isExistImage = '有图片';
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
//搜索功能
function LoadingDataListOrderRealItems(){
	 $("#flinfo_table").bootstrapTable('refresh', queryParams);
}
//保存
function save(){
	$("#flinfo_table tbody tr").each(function(){
		if($(this).find("input").is(":checked")){
			var idArr=$('#flinfo_table').bootstrapTable('getSelections');
			var categroymc = null;
			for (var i in idArr) {
					var content="<tr onclick='pitch(this)'>";
					content+="<td align='center' valign='middle' style='width: 280px; height: 24px;display:none;' id='flid'  >"+idArr[i].id+"</td>";
					content+="<td align='center' valign='middle' style='width: 280px; height: 24px;' id='categroymc'  >"+idArr[i].categroymc+"</td>";
					content+="<td align='center' valign='middle' style='width: 79px; height: 24px;'  ><input id='number' type='text' style='width: 79px; height: 24px;' class='bor'/></td>";
					content+="<td align='center' valign='middle' style='width: 79px; height: 24px;' ><input id='sellprice' type='text' style='width: 79px; height: 24px;' class='bor'/></td>";
					content+="<td align='center' valign='middle' style='width: 79px; height: 24px;' ><input id='sellrate' type='text' style='width: 79px; height: 24px;text-align:center;' class='bor' value='1'/ ></td>";
					content+="</tr>";
					$("body",parent.document).find(".datagrid-view2 .datagrid-body").append(content);
			}
			//取消关闭当前窗口
				var index=parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
		}else{
			layer.alert("请选中一行！");
		}
	});
};


 