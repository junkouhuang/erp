//初始化bootstrap Table
$(function(){
	//初始化Table
	var oTable=new TableInit();
	oTable.Init();

    // 加载门店的下拉框
    loadStore();
})


var TableInit=function(){
	var oTableInit=new Object();
	oTableInit.Init=function () {
			//1.初始化Table
	         $('#storeReturnTable').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:pageContext+"/storeReturnController/getStoreReturnInfo", //请求后台的url
		        singleSelect: true, //仅允许单选
		        //search: true,
		        showColumns:false, //是否显示所有的列
		        showRefresh:true,//是否显示刷新按钮
		        pagination:true,//是否显示分页（*）
		        queryParamsType: 'undefined',
		        queryParams : queryParams,//传递参数（*）
		        responseHandler:rspHandler,
                clickToSelect: true,
		        minimumCountColumns:2,//最少允许的列数
		        pageNumber:1,                       //初始化加载第一页，默认第一页
		        pageSize: 10,                       //每页的记录行数（*）
		        pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
		        idField :"id",
		        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		        showExport: true,                    
		        exportDataType: 'all',
				rowStyle: function (row, index) {
                    var strclass = "";
                    if (row.status == "-1") {
                        strclass = 'color-gold';
                    }
                    else if (row.status == "0") {
                        strclass = 'color-666';
                    }
                    else if (row.status == "1") {
                        strclass = 'color-blue';
                    }
                    else if (row.status == "2") {
                        strclass = 'color-333';
                    }
                    else if (row.status == "3") {
                        strclass = 'color-111';
                    }
                    else if (row.status == "4") {
                        strclass = 'color-777';
                    }
                    else {
                        strclass = '';
                    }
                    return { classes: strclass }
                },
		        columns: [
		        {
		            checkbox: true
		        },
		        //动态创建列名
		        {
		        	field : 'id',
		            title : '单号id',
		            align : 'center',
		            valign : 'middle'
		        }, {
		        	field : 'storeid',
		            title : '门店id',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'ordercode',
		            title : '退货单号',
		            align : 'center',
		            valign : 'middle',
		            sortable : true
		        }, {
		            field : 'mdcode',
		            title : '门店编号',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'mdmc',
		            title : '门店名称',
		            align : 'center',
		            valign : 'middle'
		        }, {
                    field : 'returnSL',
                    title : '数量',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'returnPrice',
                    title : '退货金额',
                    align : 'center',
                    valign : 'middle'
                }, {
		            field : 'bz',
		            title : '备注',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'createtime',
		            title : '退货申请时间',
		            align : 'center',
		            valign : 'middle'
		        }, {
                    field : 'audittime',
                    title : '到货时间',
                    align : 'center',
                    valign : 'middle'
                }/*, {
		            field : 'createaudittime',
		            title : '到货时间',
		            align : 'center',
		            valign : 'middle'
		        }*/, {
		            field : 'status',
		            title : '状态',
		            align : 'center',
		            valign : 'middle',
                    formatter : function(value, row, index) {
                        if (value == '-1')
                            return "新增";
                        if (value == '0')
                            return "提交";
                        if (value == '1')
                            return "允许退货";
                        if (value == '2')
                            return "到货扫描";
                        if (value == '3')
                            return "确认到货";
                        if (value == '4')
                            return "财务审核";
                        return "错误";
                    }
		        }, {
		            field : 'updatestocks',
		            title : '门店审核',
		            align : 'center',
		            valign : 'middle',
                    formatter : function(value, row, index) {
		            	if (true == value){
							return "是";
						}else{
                            return "否";
						}
                    }
		        }, {
		            field : 'scaned',
		            title : '扫描状态',
		            align : 'center',
		            valign : 'middle',
                    formatter : function(value, row, index) {
                        if (value == '0')
                            return "未扫描";
                        if (value == '1')
                            return "已扫描";
                        return "";
                    }
		        }, {
                    field : 'scantime',
                    title : '扫描时间',
                    align : 'center',
                    valign : 'middle'
                }/*, {
                    field : 'audittime',
                    title : '财务审核时间',
                    align : 'center',
                    valign : 'middle'
                }*/, {
					field : 'imported',
					title : '导入状态',
					align : 'center',
					valign : 'middle',
					formatter: function (value, row, index) {
						var str = '';
						if (value == '1') {
							str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
						} else {
							str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
						}
						return str;
					}
				}, {
                	field : 'importtime',
                 	title : '导入时间',
                 	align : 'center',
                  	valign : 'middle'
		        }, {
                 	field : 'createaudit',
                  	title : '客服审核',
                	align : 'center',
                   	valign : 'middle',
                   	formatter: function (value, row, index) {
                  		if (value == '0')
                    		return "否";
                   		if (value == '1')
							return "是";
                     	return '';
                	}
                } ,{
                 	field : 'wlgs',
                	title : '物流公司',
                 	align : 'center',
                   	valign : 'middle'
                }, {
                  	field : 'wldh',
                  	title : '物流单号',
                  	align : 'center',
                  	valign : 'middle'
                }]
		    });
	        
	        $('#storeReturnTable').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
	        $('#storeReturnTable').bootstrapTable('hideColumn', 'storeid');  //隐藏指定要隐藏的列
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
}

	var table = null;
	function queryParams(params) {
        // 获取退货单号
        var ordercode = $("#ordercode").val();
        // 获取门店编号
        //var mdcode = $("#mdcode").val();
        // 获取门店名称
        var mdmc = $("#mdmc").val();
        // 获取单据状态
        var status = $("#status").val();
        // 扫描状态
        var scaned = $("#scaned").val();
        // 导入状态
		var imported = $("#imported").val();
		// 客服审核
		var createaudit = $("#createaudit").val();

        var mdcode = $("#store option:selected").attr("mdcode");

    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                pageSize: params.pageSize,   //页面大小  
                pageNumber: params.pageNumber, //页码  
                sortName: params.sort,  //排序列名  
                sortOrder:params.order, //排序方式
                //searchText:params.search,   //搜索框参数  
                //searchText:params.search,   //搜索框参数
				ordercode:ordercode,
        		mdcode:mdcode,
				mdmc:mdmc,
            	status:status,
            	scaned:scaned,
            	imported:imported,
            	createaudit:createaudit
            };  
            return temp;  
      }
	//得到查询的参数      
	 function rspHandler (res) {
	    if (res) {
	    	
	    	//循环确认每个退货的状态
	    	/*$.each(res.list, function(index, item){
	    		item.status = confirmStoreReturnStatus(item.status);
	    	});*/
	    	
	    	//循环确认每个退货门店是否审核
	    	/*$.each(res.list, function(index, item){
	    		var isPrepare = item.updatestocks;
	    		item.updatestocks = isPrepare ? '是' : '否';
	    	});*/
	    	
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

//执行一个laydate实例
laydate.render({
	  elem: '#time',
	  range: true
});

// 搜索
function search(){
    $("#storeReturnTable").bootstrapTable('refresh', queryParams);
}

// 清空搜索
function clearSearch(){
    // 退货单号
   	$("#ordercode").val("");
    // 门店编号
   	//$("#mdcode").val("");
    // 门店名称
    $("#mdmc").val("");
    // 单据状态
    /*selected_option = $("input#test_input").val();
    $("select#test").val(selected_option);*/
    $("#status").val("");
    // 扫描状态
    $("#scaned").val("");
    // 导入状态
    $("#imported").val("");
    // 客服审核
	$("#createaudit").val("");
}


//门店退货详情
function returnDetail(){
	//获取当前表格
	var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
	//判断是否选中表格某项
	if(thisTable == null || thisTable == '' || thisTable == undefined){
		layer.msg("请选中退货单号");
		return false
	}
	
	//获取门店退货单id
	var returnid = thisTable.id;
	
	//获取门店id
	var storeid = thisTable.storeid;
	
	//打门店退货详细页
	layer.open({
	      type: 2,
	      title: '门店退货单详细',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['800px', '570px'],
	      content: "storeReturnDetailed?returnId="+returnid+"&storeId="+storeid
	});
}


//新增批次
function addBatch(){
	layer.open({
	      type: 2,
	      title: '新增批次',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['893px', '600px'],
	      content: 'batch-add'
	    });
}


// 确认退货单号的状态（把退货单号的状态装换为文字）
function confirmStoreReturnStatus(batchStatus){
	var textStatus;
	$.each(store_return, function(index, item){
		if(item.status == batchStatus){
			textStatus = item.text;
		}
	});
	return textStatus;
}


// 导出Excel表格
function exportExcel(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false
    }
    //获取门店退货单id
    var orderId = thisTable.id;
    //获取门店id
    var storeId = thisTable.storeid;
    window.location.href = pageContext + "storeReturnController/exportStoreReturnDetailExcel?orderId="+orderId+"&storeId="+storeId;
}


// 打印PDF
function printPDF(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false
    }
    //获取门店退货单id
    var orderId = thisTable.id;
    //获取门店id
    var storeId = thisTable.storeid;

    window.location.href = pageContext + "storeReturnController/printStoreReturnDetailedPDF?orderId="+orderId+"&storeId="+storeId;
}

/**
 * 新增退货单（用于已结业名门店）
 * */
function addReturn() {
    layer.open({
        type: 2,
        title: '新增退货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['400px', '350px'],
        content: 'storeReturn-add',
        btn:['确定', '取消'],
        yes  : function (index, layero) {
            var mdcode = $(layero).find("iframe")[0].contentWindow.getPostdata();
            $.ajax({
                url:pageContext + "/storeReturnController/addStoreReturnOrder",
                data:mdcode,
                dataType:"json",
                /*async:true,*/
                type:"POST",
                success:function (data) {
                    layer.msg(data.msg);
                    layer.close(index);
                }
            })
        },
        btn2 : function(index, layero) {
            // 按钮【取消】的回调
            layer.close(index);
        },
        cancel : function() {
            return false; //开启该代码可禁止点击该按钮关闭
        }
    })
    /* layer.prompt({title: '新增退货单（用于已结业门店）', formType: 0},
         function(value, index, elem){
                 $.ajax({
                     type:"post",
                     dataType:"json",
                     async:"true",
                     url:pageContext+"/storeReturnController/addStoreReturnOrder?mdcode="+value,
                     success:function (data) {
                        layer.msg(data.msg);
                     }
                 })
         layer.close(index);
     });*/
}


// 导出退货扫描清单
function exportScanExcel(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false
    }
    //获取门店退货单id
    var orderId = thisTable.id;
    //获取门店id
    var storeId = thisTable.storeid;
    window.location.href = pageContext + "storeReturnController/exportStoreReturnScanExcel?orderId="+orderId+"&storeId="+storeId;

    /*var url = pageContext + "storeReturnController/exportStoreReturnScanExcel";
    var fileName = "testAjaxDownload.txt";
    var form = $("<form></form>").attr("action", url).attr("method", "get");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "orderId").attr("value", orderId));
    form.append($("<input></input>").attr("type", "hidden").attr("name", "storeId").attr("value", storeId));
    form.appendTo('body').submit().remove();*/

    /*$.ajax({
        url: pageContext + "storeReturnController/exportStoreReturnScanExcel",
        dataType:"json",
        async:false,
        data:{'orderId' : orderId, 'storeId' : storeId},
        type:"GET",
        success:function(req){

        }
    });*/
}

// 确认到货
function confirmReach(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false
    }

    // 判断是否是到货扫描状态
	if(2 != thisTable.status){
        layer.msg("只有到货扫描状态的能确认到货");
        return false
	}


    // 获取门店退货单id
    var returnid = thisTable.id;

    // 获取门店id
    var storeid = thisTable.storeid;

    // 打门店到货窗口
    layer.open({
        type: 2,
        title: '门店到货详情',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "storeReturnReach?returnID="+returnid+"&storeID="+storeid
    });
}

// 财务审核
function financeAudit(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false;
    }

    // 判断是否是确认到货状态
    if(3 != thisTable.status){
        layer.msg("只有确认到货状态的能财务审核");
        return false;
    }

    // 获取门店退货单id
    var returnid = thisTable.id;

    // 获取门店id
    var storeid = thisTable.storeid;

    // 打财务审核窗口
    layer.open({
        type: 2,
        title: '财务审核',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "storeReturnFinance?returnID="+returnid+"&storeID="+storeid
    });
}

// 客服审核
function createAudit(){
    //获取当前表格
    var thisTable = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中退货单号");
        return false;
    }

    // 判断是否能进行客服审核
    if(1 == thisTable.createaudit){
    	layer.msg("该退货单已经客服审核");
    	return false;
	}
	if(true != thisTable.imported){
        layer.msg("该退货单未导入不能审核");
        return false;
	}

    // 获取门店退货单id
    var returnid = thisTable.id;

    // 获取门店id
    var storeid = thisTable.storeid;

    // 打开客服审核窗口
    layer.open({
        type: 2,
        title: '客服审核',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "storeReturnAudit?returnID="+returnid+"&storeID="+storeid
    });
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


// 入库
var stockIn = function(){
    // 获取当前
    var thisObj = $('#storeReturnTable').bootstrapTable("getSelections")[0];
    // 判断是否选中
    if(thisObj == null || thisObj == '' || thisObj == undefined){
        layer.msg("请选中退货单", function(){});
        return false
    }

    if(thisObj.status != 4){
        layer.msg("财务审核后才能入库", function(){});
        return false
    }

    // 打开退货入库窗口
    layer.open({
        type: 2,
        title: '退货入库',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '610px'],
        content: "storeReturnStockIn?returnID="+thisObj.id+"&storeID="+thisObj.storeid
    });
}