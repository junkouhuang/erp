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
            method:'POST',
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
            showRefresh:true,//是否显示刷新按钮
            pagination:true,//是否显示分页（*）
            detailView:true,
            queryParamsType: 'undefined',
            queryParams : queryParams,
            responseHandler:rspHandler,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField :"id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
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
                }, {
                    field : 'orderCode',
                    title : '小票号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'vipMrate',
                    title : '会员折扣',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'rate',
                    title : '残次折扣',
                    align : 'center',
                    valign : 'middle'
                }/*, {
                    field : 'userName',
                    title : '操作员',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'computerCode',
                    title : '电脑号',
                    align : 'center',
                    valign : 'middle'
                }*/, {
                    field : 'amount',
                    title : '小票金额',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'rateMoney',
                    title : '折扣金额',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'vipCard',
                    title : '会员卡号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'vipMoney',
                    title : '储值卡支付',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'totalCash',
                    title : '现金支付',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'totalPos',
                    title : '刷卡支付',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'totalMobi',
                    title : '移动支付',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'djqmoney',
                    title : '代金券',
                    align : 'center',
                    valign : 'middle'
                }],

            // 加载子表格
            onExpandRow: function (index, row, $detail) {
                oTableInit.InitSubTable(index, row, $detail);
            }
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
                {
                    field: 'spcode',
                    title: '商品编码'
                }, {
                    field: 'spmc',
                    title: '商品名称'
                }, {
                    field: 'dw',
                    title: '单位'
                }, {
                    field: 'brand',
                    title: '品牌'
                }, {
                    field: 'cz',
                    title: '材质'
                }, {
                    field: 'mxcode',
                    title: '明细编码'
                }, {
                    field: 'ys',
                    title: '颜色'
                }, {
                    field: 'cm',
                    title: '尺码'
                }, {
                    field: 'sl',
                    title: '数量'
                }, {
                    field: 'price',
                    title: '单价'
                }, {
                    field: 'sellprice',
                    title: '销售单价'
                }, {
                    field: 'rateprice',
                    title: '折扣单价'
                }, {
                    field: 'ratemoney',
                    title: '折扣金额'
                }, {
                    field: 'sellrate',
                    title: '销售折扣'
                }, {
                    field: 'returnsl',
                    title: '退货数量'
                }, {
                    field: 'djqdkmoney',
                    title: '代金券'
                }, {
                    field: 'realprice',
                    title: '实际销售单价'
                }
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
            mdCode:mdCode
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
//点击搜索加载信息
function LoadingPageInfo(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	/*if((mdCode == null || mdCode == '') && (startTime == null || startTime == '') && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行搜索！", function(){});
		return false;
	}*/
    $("#selldetailTable").bootstrapTable('refresh', {url:pageContext+"/reportController/getSell"});
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
        && (endTime == null || endTime == '')){
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
	+ "&mdCode="+mdCode;
}

//获取页面输入的参数
function getPageParam(){
    orderCode = $("#orderCode").val();
    vipCard = $("#vipCard").val();
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