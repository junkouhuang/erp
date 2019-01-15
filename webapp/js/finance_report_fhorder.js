$(function(){
    var oTable=new TableInit();
    oTable.Init();

    loadStore();
});

var TableInit=function(){
    var oTableInit=new Object();
    oTableInit.Init=function () {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method:'GET',
            dataType:'json',
            toolbar:"#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: "", //请求后台的url
            singleSelect: true, //仅允许单选
            showFooter:true,
            //search: true,
            showColumns:false, //是否显示所有的列
            showRefresh:false,//是否显示刷新按钮
            pagination:true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams : queryParams,
            responseHandler:rspHandler,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField :"id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType:'all',
            columns:  [
                //动态创建列名
                {
                    field : 'printtime',
                    title : '打印时间',
                    align : 'center',
                    valign : 'middle' ,
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field : 'ordercode',
                    title : '发货单号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'cwcode',
                    title : '财务编码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'sourceType',
                    title : '发货单来源',
                    align : 'center',
                    valign : 'middle',
                    formatter: function (value, row, index) {
                        if (value == '2') {
                            return '网络订单';
                        } else if (value == '3') {
                            return '退货';
                        } else if (value == '4') {
                            return '新品未上架';
                        } else if (value == '5') {
                            return '新品可挑上架';
                        } else if (value == '6') {
                            return '特殊类型';
                        } else {
                            return '错误';
                        }
                    }
                }, {
                    field : 'mdcode',
                    title : '店号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mdlx',
                    title : '门店类型',
                    align : 'center',
                    valign : 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                            return '加盟店';
                        } else {
                            return '直营店';
                        }
                    }
                }, {
                    field : 'mdmc',
                    title : '门店名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'whsbz',
                    title : '发货仓库',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spcode',
                    title : '款号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mxcode',
                    title : '条码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'itemno',
                    title : '自编码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spmc',
                    title : '商品名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'price',
                    title : '吊牌价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'hagTagAmount',
                    title : '吊牌金额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.hagTagAmount;
                        });
                        return total;
                    }
                }, {
                    field : 'wholesaleAmount',
                    title : '批发金额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.wholesaleAmount;
                        });
                        return total;
                    }
                }, {
                    field : 'sl',
                    title : '数量',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.sl;
                        });
                        return total;
                    }
                }, {
                    field : 'costprice',
                    title : '成本价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'costTotalPrice',
                    title : '成本总额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.costTotalPrice;
                        });
                        return total;
                    }
                }]
            });

    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset:params.offset
        };
        return temp;
    };
    return oTableInit;
};

//执行一个laydate实例
laydate.render({
	  elem: '#time',
	  range: true
});

function queryParams(params) {
	time = $("#time").val();
    getPageParam();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
            pageSize: params.pageSize,   //页面大小  
            pageNumber: params.pageNumber, //页码  
            mdcode:mdCode,
            startTime:startTime,
            endTime:endTime,
            spcode:spcode,
            mxcode:mxcode
        };
        return temp;

}

//得到查询的参数      
function rspHandler (res) {
   if (res) {
       return {
           "rows" : res.list,
           "total" :res.total
       };
   } else {
       return {
           "rows" : [],
           "total" : 0
       };
   }
};

var mdCode;
var startTime;
var endTime;
var spcode;
var mxcode;
function search(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	/*if((mdCode == null || mdCode == '') && (startTime == null || startTime == '') && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行搜索！", function(){});
		return false;
	}*/

	//初始化表格
    $("#table").bootstrapTable('refresh', {url:pageContext+"/financeReportController/getFhorderList"});
}

function exportExcel(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	if((mdCode == null || mdCode == '')
        && (startTime == null || startTime == '')
        && (endTime == null || endTime == '')
        && (spcode == null || spcode == '')
        && (mxcode == null || mxcode == '')){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	
	/*//判断是否可以打印
	var loadData = $('#store_send_report').bootstrapTable('getData', true);
	if(loadData.length <= 0){
		layer.msg("报表没有内容！", function(){});
		return;
	}*/
	
	requestExportExcel();
}

function requestExportExcel(){
	window.location.href="financeReportController/exportFhorderExcel?mdcode="+mdCode
	+"&startTime="+startTime
	+"&endTime="+endTime
    +"&spcode="+spcode
    +"&mxcode="+mxcode;
}

//获取页面输入的参数
function getPageParam(){
	//获取门店code
	mdCode = $("#store option:selected").attr("mdcode");
	if(mdCode == null || mdCode == undefined){
	    mdCode = "";
    }

	//获取时间
	var time = $("#time").val();
	if(time == ""){
		startTime = "";
		endTime = "";
	}else{
		var timeArray = time.split(" - ");
		startTime = timeArray[0];
		endTime = timeArray[1];
	}

    spcode = $("#spcode").val();
    mxcode = $("#mxcode").val();
}

// 加载门店
function loadStore(){
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" +data[i].mdcode+ "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#store').append(mdContent);
        }
    });
    $('#store').combobox();
}