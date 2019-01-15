/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 上午10:06:31
 * 模块名称:輔料模板信息
 * 操作:往父iframe传递参数
 *
 */

var formData = function(){
	var bookCount=$('#flmoban_table').bootstrapTable('getSelections');
	return bookCount;
};


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 上午10:06:31
 * 模块名称:輔料模板信息
 * 操作:获取父iframe传递参数
 *
 */
var idBuffer = ''; 
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


$(function () {
	idBuffer= getQueryString("idBuffer");//获取父iframe传递参数
		//1.初始化Table
        table =  $('#flmoban_table').bootstrapTable({  //表格ID
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
	        showColumns:false, 
	        showRefresh:false,
	        pagination:true,
	        clickToSelect:true,
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
	            field : 'categroymc',
	            title : '名称',
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
	            field : 'barcode',
	            title : '条码',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'sellprice',
	            title : '零售价格',
	            align : 'center',
	            valign : 'middle'
	        } ]
	    });
    });
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 上午10:06:31
 * 模块名称:輔料模板信息
 * 操作:传递参数
 *
 */
var  table = null;
function queryParams(params) {
	var flcode = $("#flcode").val().replace(/(^\s*)|(\s*$)/g, "");
	var barcode = $("#barcode").val().replace(/(^\s*)|(\s*$)/g, "");
	var categroymc = $("#categroymc").val().replace(/(^\s*)|(\s*$)/g, "");
	var minSellprice = $("#minSellprice").val().replace(/(^\s*)|(\s*$)/g, "");
	var maxSellprice = $("#maxSellprice").val().replace(/(^\s*)|(\s*$)/g, "");
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
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午10:32:27
 * 模块名称:模板信息表
 * 操作:得到查询的参数      
 *
 */
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
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午10:32:08
 * 模块名称:模板信息表
 * 操作:搜索功能(刷新)
 *
 */
function LoadingDataListOrderRealItems(){
	 $("#flmoban_table").bootstrapTable('refresh', queryParams);
}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-27 下午12:48:30
 * 模块名称:
 * 操作:回车搜索功能
 *
 */
$(function(){
	$("#categroymc,#flcode,#barcode,#minSellprice,#maxSellprice").bind("keydown",function(e){
		  var key = e.which;
				if(key==13){
					   e.preventDefault();
					   LoadingDataListOrderRealItems();
				}
	});
});
