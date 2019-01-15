// 初始化bootstrap Table
$(function() {

    $.ajax({
        url:pageContext+"/storeController/getStoreList",
        type:"post",
        dataType:"json",
        async:false,
        cache:false,
        success:function(data){
            var mdContent = '<option value="" selected="selected">选择门店</option>';
            for(var i=0;i<data.length;i++){
                mdContent+="<option value="+data[i].id+">"+data[i].mdcode+"_"+data[i].mdmc+"</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
	// 1.初始化Table
	table = $('#tbody').bootstrapTable({ // 表格ID
		method : 'POST',// 请求方式（*）
		dataType : 'json',// 获取的数据类型
		toolbar : "#exampleTableEventsToolbar",
		contentType : "application/x-www-form-urlencoded",
		cache : false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		striped : true,// 是否显示行间隔色
		sidePagination : "server",// 分页方式：client客户端分页，server服务端分页（*）
		url : pageContext + "/viphyController/getViphyListPageInfo", // 请求后台的url
		singleSelect : false, // 仅允许单选
		// search: true,
		showColumns : true, // 是否显示所有的列
		showRefresh : true,// 是否显示刷新按钮
		pagination : true,// 是否显示分页（*）
		queryParamsType : 'undefined',
		queryParams : queryParams,// 传递参数（*）
		responseHandler : rspHandler,
		smartDisplay : true,
		showToggle : true,
		clickToSelect : true,
		minimumCountColumns : 2,// 最少允许的列数$("input[type='checkbox']").is(':checked')
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 9, // 每页的记录行数（*）
		pageList : [ 9, 20, 50, 100 ], // 可供选择的每页的行数（*）
		idField : "id",
		uniqueId: "id", //每一行的唯一标识，一般为主键列
		showExport : true,
		// exportDataType: 'all',
		columns : [ {
			checkbox : true
		}, // 动态创建列名
		{
			field : 'vipcard',
			title : '会员卡号',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'lxdh',
			title : '手机号',
			align : 'center',
			valign : 'middle',
			sortable : true
		}, {
			field : 'money',
			title : '余额',
			align : 'center',
			valign : 'middle',
			sortable : true
		}, {
			field : 'firstmoney',
			title : '首充余额',
			align : 'center',
			valign : 'middle',
			sortable : true
		}, {
			field : 'xm',
			title : '姓名',
			align : 'center',
			valign : 'middle',
			sortable : true
		}, {
			field : 'storecode',
			title : '店号',
			align : 'center',
			valign : 'middle',
			sortable : true
		},  {
			field : 'createdate',
			title : '开卡时间',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'status',
			title : '状态',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {
				if (value == '0') {
					return '无效';
				} else if (value == '1') {
					return '正常';
				} else if (value == '2') {
					return '注销';
				} else if (value == '3') {
					return '锁定';
				} else {
					return "错误";
				}
			}
		}]
	});
});


function queryParams(params) {
    var postdata = $('#vipsearchform').serializeJSON();
    postdata['pagesize'] = params.pageSize;
    postdata['pagenumber'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
	postdata['sortorder'] = params.order; // 排序方式
	return postdata;
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

// 执行一个laydate实例
laydate.render({
	elem : '#starttime',
	type : 'datetime'
});
laydate.render({
	elem : '#endtime',
	type : 'datetime'
});











function loadingViphyList() {
	$("#tbody").bootstrapTable('refresh', queryParams);
}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-14 下午4:25:49
 * 模块名称:发货单列表
 * 操作:回车事件执行查询方法
 *
 */
function _search() {
	$("#tbody").bootstrapTable('refresh', queryParams);
}



function createPaycode() {
        layer.open({
            type : 2,
            title : '生成支付码',
            shade : [ 0.8, '#393D49' ],
            maxmin : true, // 开启最大化最小化按钮
			area: ['600px', '400px'], // 宽高
            content : pageContext + "/viphyController/toViphyGetpaycode",
            btn : [ '修改', '取消' ], // 可以无限个按钮
            yes : function(index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow
                    .getPostdata();
                // 发送修改请求
                $.ajax({
                    url : pageContext + "/viphyController/genaratePaycode",
                    data : posData,
                    dataType : "json",
                    async : true,
                    type : "POST", // 请求方式
                    success : function(data) {
                        if (data.success) {
                            layer.msg(data.msg);
                            layer.close(index);
                        } else {
                            layer.msg(data.msg);
                        }
                    },
                    error : function() {
                    }
                });
                // 按钮【修改】的回调
            },
            btn2 : function(index, layero) {
                // 按钮【取消】的回调
                layer.close(index);
            },
            cancel : function() {
				return false; //开启该代码可禁止点击该按钮关闭
            }
        });
}






