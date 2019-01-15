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
        $('#store_return_report').bootstrapTable({  //表格ID
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
                    title : '门店编号',
                    align : 'center',
                    valign : 'middle'
                },{
                    field : 'mdmc',
                    title : '门店名称',
                    align : 'center',
                    valign : 'middle'
                },{
                    field : 'spcode',
                    title : '商品款号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mxcode',
                    title : '商品明细号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spmc',
                    title : '商品名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'auditsl',
                    title : '退货数量',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'sellprice',
                    title : '销售金额',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'cpmc',
                    title : '采购品名',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'cgPrice',
                    title : '采购单价',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'supplierName',
                    title : '供应商',
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
            starttime:startTime,
            endtime:endTime,
            spCodeOrMxCode:spCodeOrMxCode
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
var spCodeOrMxCode;
//点击搜索加载门店退货信息
function LoadingStoreReturn(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	/*if((mdCode == null || mdCode == '') && (startTime == null || startTime == '') && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行搜索！", function(){});
		return false;
	}*/

    //初始化表格
    $("#store_return_report").bootstrapTable('refresh', {url:pageContext+"/reportController/getSearchStoreReturnInfo"});
    /*if ($("#store_return_report").children().length == 0){
        loadBootstrapTable();
    }else {
        $("#store_return_report").bootstrapTable('refresh', {url:pageContext+"/reportController/getSearchStoreReturnInfo"});
    }*/
}

//打印门店退货报表
function printStoreReturn(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	if((mdCode == null || mdCode == '') && (startTime == null || startTime == '') && (endTime == null || endTime == '')){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	
	//判断是否可以打印
	/*var loadData = $('#store_return_report').bootstrapTable('getData', true);
	if(loadData.length <= 0){
		layer.msg("报表没有内容！", function(){});
		return;
	}*/
	
	//发送请求到后台请求打印
	requestBackendPrintStoreReturn();
}

//请求后台进行输出打印的报表
function requestBackendPrintStoreReturn(){
    // $("body",parent.document).find("#loading").fadeIn("slow");
	window.location.href="reportController/exportStoreReturnExcel?mdcode="+mdCode
	+"&starttime="+startTime
	+"&endtime="+endTime
	+"&spCodeOrMxCode="+spCodeOrMxCode;

    /*var iCount = window.setInterval(function(){
        $.ajax({
            url: pageContext + "reportController/getExprotExcelWait",
            dataType:"json",
            async:true,
            type:"GET",
            data:{"excelTip" : "SRE"},
            success:function(req){
                console.info(req);
                if (req == null){
                    $("body",parent.document).find("#loading").fadeOut("slow");
                    clearInterval(iCount);
                }
            },
            error:function(req){

                $("body",parent.document).find("#loading").fadeOut("slow");
                clearInterval(iCount);
            }
        })
        },1500
    );*/
}


// 当点换类型时改变表格标题
// var isClick = false;
$(":radio").click(function(){
    $("#store_return_report").bootstrapTable('refresh', {url:pageContext+"/reportController/getSearchStoreReturnInfo"});
	/*if(isClick){
		$("thead").find("tr").find("th").eq(0).find("div").eq(0).html("商品款号");
		isClick = false;
	}else{
		$("thead").find("tr").find("th").eq(0).find("div").eq(0).html("商品明细号");
		isClick = true;
	}*/
});


//获取页面输入的参数
function getPageParam(){
	//获取商品款号
	spCodeOrMxCode = $("input[type='radio']:checked").val();
	
	//获取门店code
	//mdCode = $("#mdcode").val();
    mdCode = $("#store option:selected").attr("mdcode");
    if(mdCode == undefined){
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