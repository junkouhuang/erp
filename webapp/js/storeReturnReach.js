//初始化bootstrap Table
var returnID;
var storeID;
$(function(){
	//获取门店退货单id和门店id
	returnID = getQueryVariable("returnID");
	storeID = getQueryVariable("storeID");
    loadWhsinfo();
	//初始化Table
	var oTable=new TableInit();
	oTable.Init(returnID, storeID);
})
function loadWhsinfo() {
    $.ajax({
        url: pageContext + "/whsController/getWhsinfoList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var whsContent = '<option value="" selected="selected">请选择仓库</option>';
            for (var i = 0; i < data.length; i++) {
                whsContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
            }
            $('#whsid').append(whsContent);
        }
    });
    $('#whsid').combobox();
}
// 当前行数据
var thisRow;
// 当前行号
var thisRowNum;

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
		        url:pageContext+"/storeReturnController/getScanStoreReturnDetail", //请求后台的url
		        singleSelect: true, //仅允许单选
		        //search: true,
		        //showColumns:true, //是否显示所有的列
		        //showRefresh:true,//是否显示刷新按钮
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
                    field : 'id',
                    title : '商品ID',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spmc',
                    title : '商品名称',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        return "汇总：";
                    }
		        }, {
                 	field : 'spcode',
                 	title : '商品编码',
                 	align : 'center',
                 	valign : 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total ++;
                        });
                        return total;
                    }
		        }, {
                    field : 'mxid',
                    title : '明细ID',
                    align : 'center',
                    valign : 'middle'
		        }, {
                    field : 'mxcode',
                    title : '明细编码',
					align : 'center',
                    valign : 'middle'
                }, {
                    field : 'bagno',
                    title : '箱号',
                    align : 'center',
                    valign : 'middle'
                }, {
		            field : 'sellprice',
		            title : '销售金额',
		            align : 'center',
		            valign : 'middle'/*,
                    footerFormatter	: function (value) {
						var totalSellprice = 0;
						$.each(value, function (index, item) {
                            totalSellprice += item.sellprice;
                        });
						return totalSellprice;
                    }*/
		        }, {
		            field : 'auditsl',
		            title : '退货数量',
		            align : 'center',
		            valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalSl = 0;
                        $.each(value, function (index, item) {
                            var number = parseInt(item.auditsl);
                            if(!isNaN(number)){
                                totalSl += number;
                            }
                        });
                        return totalSl;
                    },
                    editable: {
                        type: 'text',
                        title: '退货数量',
                        validate: function (v) {
                            if (v.trim() == "" || v == null || v == undefined){
                                layer.msg("输入不能为空");
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }
                            // 判断输入的是否是数字
                            if(isNaN(v)){
                                layer.msg("只能输入数字");
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }
                            // 判断输入的是否有小数点
                            if(String(v).indexOf(".") > -1){
                                layer.msg("输入数字不能包含小数点");
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }
                            // 判断输入的数字是否超过999999(九十万)
                            if(parseInt(v) > 999999){
                                layer.msg("输入数字不能超过999999");
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }
                            // 判断是否有修改
                            if(v == thisRow.auditsl){
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }
                            thisRow.auditsl = parseInt(v);
                            $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});

                            // 发送请求进行修改数量
                            //requestModifyNum(v);
                        }
                    }
		        }, {
		            field : 'auditprice',
		            title : '退货金额',
		            align : 'center',
		            valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalReturnPrice = 0;
                        $.each(value, function (index, item) {
                            totalReturnPrice += item.auditprice;
                        });
                        return totalReturnPrice;
                    }
		        }, {
 					field: 'operate',
					title: '操作',
					align: 'center',
					formatter: function(){
                        //return "<input style='height: 20px;' class='btn btn-danger btn-xs' type='button' value='移除' onclick='removeThis()'>"
						return "<input style='height: 20px;' class='btn btn-danger btn-xs' type='button' value='移除' onclick='removeRow()'>"
					}
				}]
		    });

        	$('#table').bootstrapTable('hideColumn', 'mxid');
        	$('#table').bootstrapTable('hideColumn', 'id');

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

var table = null;
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
    console.info(res.msg);
    if (res) {
        return {
            "rows" : res.obj,
            "total" : res.obj.size
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
};

/**
 * 2018年3月1日14:00:31，代替Redis删除一行，由页面直接删除一行
 * */
var removeRow = function () {
    layer.confirm('确定移除吗？', {
        btn: ["确定", "取消"] //可以无限个按钮
        ,yes: function(index){
            $('#table').bootstrapTable('remove', {field: 'id', values: [thisRow.id]});
            layer.close(index);
        }
    });
}

// 移除一行
function removeThis(){
    layer.confirm('确定移除吗？', {
        btn: ["确定", "取消"] //可以无限个按钮
        ,yes: function(index){
            // 请求后台进行移除
            requestBackEndDeleteItem();
            layer.close(index);
        }
    });
}


// 请求后台删除
function requestBackEndDeleteItem(){
    $.ajax({
        url:pageContext+"/storeReturnController/delSP",
        dataType:"json",
        async:false,
        data:{"id":thisRow.id},
        type:"POST",
        success:function(data){
            if(data.success){
                console.info("R_DELETE_S");
                $('#table').bootstrapTable('remove', {field: 'id', values: [thisRow.id]});
            }else{
                layer.msg(data.msg);
            }
        }
    });
}


/**
 * 2018年3月1日14:00:31，代替Redis修改数量，由页面直接改数量
 * */
// 请求后台修改数量
function requestModifyNum(num){
    var isSuccess = false;
    $.ajax({
        url:pageContext+"/storeReturnController/modifyNum",
        dataType:"json",
        async:false,
        data:{"id":thisRow.id, "num":num},
        type:"POST",
        success:function(data){
            if(data.success){
                console.info("R_Modify_S");
                isSuccess = true;
            }else{
                layer.msg(data.msg);
                isSuccess = false;
            }
        }
    });
    if(!isSuccess){
        $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
    }
}

// 确认
function confirm(){
    // 判断是否有商品
    var whsid = $("#whsid").val();
    if(whsid == null || whsid == undefined || whsid == ""){
        layer.msg("请选择仓库！！",function(){});
        return;
    }
    var isDate = $('#table').bootstrapTable('getData', true);
    if(isDate == null || isDate == "" || isDate.length == 0 || isDate == undefined){
        layer.msg("没有需要确认到货的商品，无法确认到货");
        return false;
    }
    $("button").attr("disabled", true);         // 禁止重复点击
    layer.confirm('确认到货无误？', {
        btn: ["确定", "取消"] //可以无限个按钮
        ,btn1:function(index){
            var list = getTableDate();
            $.ajax({
                url:pageContext+"/storeReturnController/confirmReach2/" + returnID + "/" + storeID+"/"+whsid,
                contentType:'application/json;charset=utf-8',
                dataType:"json",
                async:false,
                data:JSON.stringify(list),
                type:"POST",
                success:function(data){
                    alert(data.msg);
                    if(data.success){
                        layer.close(index);  // 关闭layer
                        var index2 = parent.layer.getFrameIndex(window.name); //获取窗口索引
                        parent.layer.close(index2);  // 关闭layer
                    }
                }
            });
        },
        btn2:function(index){
            $("button").attr("disabled", false);
        }
    });
}

// 请求后台进行确认
function requestBackEndConfirm(){
    $.ajax({
        url:pageContext+"/storeReturnController/confirmReach",
        dataType:"json",
        async:false,
        data:{'orderId' : returnID, 'storeId' : storeID},
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

// 请求后台进行确认（version---0.2）
function requestBackEndConfirm2(){
    var list = getTableDate();
    $.ajax({
        url:pageContext+"/storeReturnController/confirmReach2/" + returnID + "/" + storeID,
        contentType:'application/json;charset=utf-8',
        dataType:"json",
        async:false,
        data:JSON.stringify(list),
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

var getTableDate = function () {
    var rows = $('#table').bootstrapTable('getData');
    var list = [];
    $.each(rows, function (index, item) {
        list.push(item);
    });
    return list;
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
	
