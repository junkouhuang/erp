//初始化bootstrap Table
var returnID;
var storeID;
$(function(){
	//获取门店退货单id和门店id
	returnID = getQueryVariable("returnID");
	storeID = getQueryVariable("storeID");
	
	//初始化Table
	var oTable=new TableInit();
	oTable.Init(returnID, storeID);
})

// 当前行数据
var thisRow;
// 当前行号
var thisRowNum;
// 退款金额
var refund;

var TableInit=function(){
	var oTableInit=new Object();
	oTableInit.Init=function (returnID, storeID) {
			//1.初始化Table
	         $('#table').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:pageContext+"/storeReturnController/getStoreReturnDetailedAudit", //请求后台的url
		        singleSelect: true, //仅允许单选
		        //search: true,
		        showColumns:false, //是否显示所有的列
		        showRefresh:false,//是否显示刷新按钮
			    showFooter:true,
				pagination:false,//是否显示分页（*）
		        queryParamsType: 'json',
		        queryParams : {'returnID' : returnID, 'storeID' : storeID},//传递参数（*）
		        responseHandler:rspHandler,
				clickToSelect: true,
		        minimumCountColumns:2,//最少允许的列数
		        pageNumber:1,                       //初始化加载第一页，默认第一页
		        pageSize: 7,                       //每页的记录行数（*）
		        pageList: [7, 20, 50, 100],        //可供选择的每页的行数（*）
		        idField :"id",
		        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		        showExport: true,
		        exportDataType: 'all',
                onClickRow: function (row, $element, field) {
                    thisRow = row;
                    thisRowNum = $element.data('index');
                },

		        columns: [
		        //动态创建列名
                {
                    field : 'spid',
                    title : '商品ID',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spcode',
                    title : '款号',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        return "汇总：";
                    }
                }, {
                    field : 'spmc',
                    title : '品名',
                    align : 'center',
                    valign : 'middle'
		        }, {
		            field : 'color',
		            title : '颜色',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'size',
		            title : '尺码',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'sellprice',
		            title : '单价',
		            align : 'center',
		            valign : 'middle'/*,
                    footerFormatter	: function (value) {
                        var totalsellprice = 0;
                        $.each(value, function (index, item) {
                            totalsellprice += item.sellprice;
                        });
                        return totalsellprice;
                    }*/
		        }, {
                    field : 'auditsl',
                    title : '数量',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalAuditsl = 0;
                        $.each(value, function (index, item) {
                            totalAuditsl += item.auditsl;
                        });
                        return totalAuditsl;
                    }
                }, {
                    field : 'auditprice',
                    title : '金额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalAuditprice = 0;
                        $.each(value, function (index, item) {
                            totalAuditprice += item.auditprice;
                        });
                        return totalAuditprice;
                    }
                }, {
                    field : 'bagno',
                    title : '包号',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var pakArray = new Array()
                        $.each(value, function (index, item) {
                            var index = $.inArray(item.bagno, pakArray);
                            if(index < 0){
                                pakArray.push(item.bagno);
                            }
                        });
                        return pakArray.length + "包";
                    }
                }]
		    });

        	$('#table').bootstrapTable('hideColumn', 'spid');

	};
	 //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset:params.offset
        };
        return temp;
    };
    return oTableInit;;
}

function queryParams(params) {
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
            pageSize: params.pageSize,   //页面大小  
            pageNumber: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order //排序方式  
            //searchText:params.search,   //搜索框参数  
            //searchText:params.search,   //搜索框参数  
	};  
	return temp;  
}

function rspHandler (res) {
    if(!res.success){
        return false;
    }

    var total = 0;
    if(res.obj != null && res.obj != undefined && res.obj.list != null && res.obj.list.size != 0){
        total = res.obj.list.size;
    }

    // 包数量
    //$("#pakNum").html(res.obj.packingNum + "包");

    if (res) {
        return {
            "rows" : res.obj.list,
            "total" : total
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
};



// 客服审核确认
function confirm(){
    // 判断是否有数据
    var isDate = $('#table').bootstrapTable('getData', true);
    if(isDate == null || isDate == "" || isDate.length == 0 || isDate == undefined){
        layer.msg("没有需要客服审核的商品，无法客服审核");
        return false;
    }

    layer.confirm('确认进行客服审核？', {
        btn: ["确定", "取消"] //可以无限个按钮
        ,yes: function(index){
           requestBackEndConfirm();
           layer.close(index);
        }
    });
}

// 客服审核请求后台进行确认
function requestBackEndConfirm(){
    $.ajax({
        url:pageContext+"/storeReturnController/confirmAudit",
        dataType:"json",
        async:false,
        data:{'returnId' : returnID, 'storeId' : storeID},
        type:"POST",
        success:function(data){
            if(data.success){
                alert(data.msg);
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);  // 关闭layer
            }else{
                alert(data.msg);
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);  // 关闭layer

            }
        }
    });
}

//获取url中的参数的函数
function getQueryVariable(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	        var pair = vars[i].split("=");
	        if(pair[0] == variable){return pair[1];}
	}
	return(false);
}
	
