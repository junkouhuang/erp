//初始化bootstrap Table
$(function(){
    // 获取统计栏的数据
    getCount();

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
            method:'GET',
            dataType:'json',
            toolbar:"#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url:"", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showColumns:false, //是否显示所有的列
            showRefresh:false,//是否显示刷新按钮
            showToolbar:false,
            pagination:true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams : queryParams,
            responseHandler:rspHandler,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField :"id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: false,
            showFooter:false,
            exportDataType:'all',
            columns:  [
                //动态创建列名
                {
                    field : 'mdcode',
                    title : '门店编码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mdMc',
                    title : '门店名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'createTime',
                    title : '日期',
                    align : 'center',
                    valign : 'middle'
                },{
                    field: 'spcode',
                    title: '商品编码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'spmc',
                    title: '商品名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'dw',
                    title: '单位',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'brand',
                    title: '品牌',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'cz',
                    title: '材质',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'mxcode',
                    title: '明细编码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'ys',
                    title: '颜色',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'cm',
                    title: '尺码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'sl',
                    title: '数量',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'price',
                    title: '单价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'sellprice',
                    title: '销售单价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'rateprice',
                    title: '折扣单价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'ratemoney',
                    title: '折扣金额',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'sellrate',
                    title: '销售折扣',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'djqdkmoney',
                    title: '代金券',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'realprice',
                    title: '实际销售单价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field: 'returnsl',
                    title: '退货数量',
                    align : 'center',
                    valign : 'middle'
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

    // 子表格
    oTableInit.InitSubTable = function (index, row, $detail) {
        var storeid = row.storeid;
        var sellid = row.id;
        var cur_table = $detail.html('<table></table>').find('table');
        $(cur_table).bootstrapTable({
            method:'POST',
            dataType:'json',
            contentType: "application/x-www-form-urlencoded",
            url: pageContext+"/reportController/getSellDetail",
            queryParams: {"storeid" : storeid, "sellid" :　sellid},
            pagination:false,					//是否显示分页（*）
            columns: [

            ],
            onExpandRow: function (index, row, $Subdetail) {
                oTableInit.InitSubTable(index, row, $Subdetail);
            }
        });
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
            startTime:startTime,
            endTime:endTime,
            orderCode:orderCode,
            vipCard:vipCard,
            mdCode:mdCode,
            spcode:spcode,
            spmc:spmc
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

var startTime;
var endTime;
var orderCode;
var vipCard;
var mdCode;
var spcode;
var spmc;
//点击搜索加载信息
function LoadingPageInfo(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	/*if((mdCode == null || mdCode == '') && (startTime == null || startTime == '') && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行搜索！", function(){});
		return false;
	}*/
    $("#selldetailTable").bootstrapTable('refresh', {url:pageContext+"/reportController/getAllSellDetail"});
}

// 导出报表
function exportExcel(type){
    if (type == "" || type == null || type == undefined){ return false; }

	// 获取页面输入的参数
	getPageParam();

	// 判断是否有输入条件
	if((orderCode == null || orderCode == '' || orderCode == undefined)
        && (vipCard == null || vipCard == '' || vipCard == undefined)
        && (mdCode == null || mdCode == '' || mdCode == undefined)
        && (startTime == null || startTime == '')
        && (endTime == null || endTime == '')
        && (spcode == null || spcode == '' || spcode == undefined)
        && (spmc == null || spmc == '' || spmc == undefined)){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	// 发送请求到后台请求打印
	requestExport(type);
}

// 请求后台进行输出打印的报表
function requestExport(type){
	window.location.href="reportController/exportSellExcel/" + type + "?"
    + "startTime="+startTime
	+ "&endTime="+endTime
	+ "&orderCode="+orderCode
    + "&vipCard="+vipCard
	+ "&mdCode="+mdCode
    + "&spcode="+spcode
    + "&spmc="+spmc;
}

//获取页面输入的参数
function getPageParam(){
    orderCode = $("#orderCode").val();
    if (orderCode == undefined){ orderCode = ""; }
    vipCard = $("#vipCard").val();
    if (vipCard == undefined){ vipCard = ""; }

    //mdCode = $("#mdCode").val();
    mdCode = $("#store option:selected").attr("mdcode");
    if (mdCode == undefined){ mdCode = ""; }

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
	spmc = $("#spmc").val();
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


/**
 * 获取统计栏的数据
 * @author 郑学亮
 * @date   2018/6/1 11:39
 **/
var getCount = function () {
    $.ajax({
        url: pageContext + "/reportController/getSellDetailSumData",
        type: "get",
        dataType: "json",
        async: true,
        success: function (data) {
            if (!data.success){
                return false;
            }
            var obj = data.obj;
            $("#sumSl").html(obj.sumSl);                     // 数量的总和
            $("#sumPrice").html(obj.sumPrice);               // 单价的总和
            $("#sumSellPrice").html(obj.sumSellPrice);       // 销售单价的总和
            $("#sumRealPrice").html(obj.sumRealPrice);       // 实际销售单价的总和
            $("#sumReturnSl").html(obj.sumReturnSl);          // 退货数量的总和
        }
    });
}