$(function() {
	// 执行一个laydate实例
	laydate.render({
		elem : '#time',
		range : true
	});
	// 1.初始化Table
	table = $('#store_table').bootstrapTable(
			{ // 表格ID
				method : 'POST',
				dataType : 'json',
				toolbar : "#exampleTableEventsToolbar",
				contentType : "application/x-www-form-urlencoded",
				cache : false,
				striped : true,// 是否显示行间隔色
				sidePagination : "server",// 分页方式：client客户端分页，server服务端分页（*）
				url : pageContext + "/storeController/selectStorePageInfo",
				singleSelect : true, // 仅允许单选
				// search: true,
				showColumns : true,
				showRefresh : true,
				pagination : true,
				queryParamsType : 'undefined',
				clickToSelect:true,
				queryParams : queryParams,
				responseHandler : rspHandler,
				minimumCountColumns : 2,
				pageNumber : 1, // 初始化加载第一页，默认第一页
				pageSize : 10, // 每页的记录行数（*）
				pageList : [ 10, 20, 50, 100 ], // 可供选择的每页的行数（*）
				idField : "id",
				// uniqueId: "id", //每一行的唯一标识，一般为主键列
				showExport : true,
				exportDataType : 'all',
				columns : [ {
					checkbox : true
				},
				// 动态创建列名
				{
					field : 'id',
					title : 'ID',
					align : 'center',
					valign : 'middle',
					display : 'hidden',
					sortable : true
				}, {
					field : 'mdcode',
					title : '门店号',
					align : 'center',
					valign : 'middle'
				}, {
					field : 'mdmc',
					title : '门店名称',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'boss',
					title : '店主',
					align : 'center',
					valign : 'middle'
				}, {
					field : 'mddz',
					title : '门店地址',
					align : 'center',
					valign : 'middle'
				}, {
					field : 'bosslxdh',
					title : '联系电话',
					align : 'center',
					valign : 'middle'
				} ]
			});
	$('#store_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
});
var table = null;
function queryParams(params) {
	var mdmcOrmdcode = $("#mdmcOrmdcode").val();
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize : params.pageSize, // 页面大小
		page : params.pageNumber, // 页码
		sortName : params.sort, // 排序列名
		sortOrder : params.order,// 排序方式
        mdmcOrmdcode:mdmcOrmdcode
	};
	return temp;
}
// 得到查询的参数
function rspHandler(res) {
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
// 搜索功能
function LoadingDataListOrderRealItems() {
	$("#store_table").bootstrapTable('refresh', queryParams);
}

var formData = function(){

    return thisObj[0].id;
};