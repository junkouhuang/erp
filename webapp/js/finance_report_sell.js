//初始化bootstrap Table
$(function(){
    //初始化Table
    var oTable=new TableInit();
    oTable.Init();

    // 加载门店的下拉框
    loadStore();
});

var TableInit=function(){
    var oTableInit=new Object();
    oTableInit.Init=function () {
        //1.初始化Table
        $('#selldetailTable').bootstrapTable({  //表格ID
            method: 'POST',
            dataType: 'json',
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: "", //请求后台的url
            singleSelect: true, //仅允许单选
            showFooter:true,
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: false,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            detailView: true,
            queryParamsType: 'undefined',
            queryParams: queryParams,
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [
                {
                    field: 'createTime',
                    title: '业务时间',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'costprice',
                    title: '采购单价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'orderCode',
                    title: '销售单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cwcode',
                    title: '财务编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdcode',
                    title: '店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdlx',
                    title: '店铺类型',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'realMoney',
                    title: '实销金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.realMoney;
                        });
                        return total;
                    }
                }, {
                    field: 'mxcode',
                    title: '子码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spcode',
                    title: '商品编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'itemno',
                    title: '自编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ys',
                    title: '颜色',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cm',
                    title: '尺码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.sl;
                        });
                        return total;
                    }
                }, {
                    field: 'price',
                    title: '吊牌价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sellprice',
                    title: '售价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spmc',
                    title: '品名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bigclass',
                    title: '大类',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'dq',
                    title: '地区',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'typename',
                    title: '档次',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'totalCostPrice',
                    title: '成本总额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.totalCostPrice;
                        });
                        return total;
                    }
                }],
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

	
// 执行一个laydate实例
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
            startTime : startTime,
            endTime : endTime,
            mdcode : mdcode
        };
        return temp;
}

// 得到查询的参数
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

var startTime;
var endTime;
var mdcode;
//点击搜索加载信息
function LoadingPageInfo(){
	getPageParam();
    $("#selldetailTable").bootstrapTable('refresh', {url:pageContext+"/reportController/getSell2"});
}

// 导出报表
function exportExcel(){
	// 获取页面输入的参数
	getPageParam();
	// 判断是否有输入条件
	if((mdcode == null || mdcode == '' || mdcode == undefined)
        && (startTime == null || startTime == '')
        && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	excelSize();              // 请求后台查询出导出的Excel表的数据量大小
}

// 请求后台查询出导出的Excel表的数据量大小
var excelSize = function () {
    $.ajax({
        url: pageContext + "/reportController/getSellExcelSize",
        type: "POST",
        dataType: "JSON",
        async: false,
        data: {"mdcode" : mdcode, "startTime" : startTime, "endTime" : endTime},
        success: function (data) {
            if (data.success){
                var size = data.obj;
                if (size == 0){
                    layer.msg("没有数据需要导出");
                    return false;
                }
                var time = calculateTime(size);
                layer.confirm("待导出数据有" + size + "行，" + time + "，确定要导出Excel表格？" , {
                    btn : ["确认", "取消"],
                    shade : 0.4,
                    btn1 : function () {
                        requestExport();
                    }
                });
                return false;
            }else{
                layer.msg(data.msg);
                return false
            }
        }
    });
}

// 计算时间
var calculateTime = function (num) {
    var i = num.toString().length;
    if (i < 4){
        return "大约需要30秒"
    }
    var time = "";
    switch(i){
        case 4:
            time = "大约需要1分钟";
            break;
        case 5:
            time = "大约需要3分钟";
            break;
        case 6:
            time = "大约需要7分钟";
            break;
        case 7:
            time = "大约需要10分钟";
            break;
        case 8:
            time = "大约需要60分钟";
            break;
        case 9:
            time = "大约需要90分钟";
            break;
        case 10:
            time = "大约需要150分钟";
            break;
        default:
            time = "无法预计需要时间";
    }
    return time;
}

// 请求后台进行输出打印的报表
function requestExport(){
	window.location.href="reportController/exportSellExcel2/?"
    + "startTime="+startTime
	+ "&endTime="+endTime
	+ "&mdcode="+mdcode;
}

// 获取页面输入的参数
function getPageParam(){
    mdcode = $("#store option:selected").attr("mdcode");
    if (mdcode == undefined){ mdcode = "";}

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