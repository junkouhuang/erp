var flJson=new Array();//用于封装参数，传递给父iframe
var flgysid=getQueryString("flgysid");//获取辅料供应商ID
var idBuffer=getQueryString("idBuffer"); //获取父iframe模板已经添加过的记录的ID
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
		//1.初始化Table
        table =  $('#flinfo_table').bootstrapTable({  //表格ID
	        method:'POST',
	        dataType:'json',
	        toolbar:"#exampleTableEventsToolbar",
	        contentType: "application/x-www-form-urlencoded",
	        cache: false,
	        striped: true,//是否显示行间隔色
	        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
	        url:pageContext+"/flInfoController/getFlInfoPageByFlgysid",
	        singleSelect: false, //仅允许单选
	        //search: true,
	        showColumns:false, 
	        showRefresh:false,
	        pagination:true,
	        clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
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
//返回json字符串数组
var formData = function(){
	//点击行，封装数据并返回给父iframe
	// 2:获取选中行
	var arr=$('#flinfo_table').bootstrapTable('getSelections');
	flJson.length=0;
	for(var i in arr ){
		flJson.push({"flid":arr[i].id,"categroymc": arr[i].categroymc,"flcode": arr[i].flcode,"gunge":arr[i].gunge,"dw":arr[i].dw,"barcode":arr[i].barcode,"sellprice":arr[i].sellprice});
	};
    return flJson;
};
var  table = null;
function queryParams(params) {
	var flcode = $("#flcode").val().replace(/(^\s*)|(\s*$)/g, "");
	var categroymc = $("#categroymc").val().replace(/(^\s*)|(\s*$)/g, "");
	var minSellprice = $("#minSellprice").val().replace(/(^\s*)|(\s*$)/g, "");
	var maxSellprice = $("#maxSellprice").val().replace(/(^\s*)|(\s*$)/g, "");
	var barcode= $("#barcode").val().replace(/(^\s*)|(\s*$)/g, "");
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
