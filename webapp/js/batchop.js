//初始化bootstrap Table
$(function(){
	//初始化Table
	var oTable=new TableInit();
	oTable.Init();

    var funName = getQueryVariable("execute");
    if(funName != false){
        var param = getQueryVariable("param");
        window[funName](param);
	}
});

var TableInit=function(){
	var oTableInit=new Object();
	oTableInit.Init=function () {
			//1.初始化Table
	         $('#dhtable').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:pageContext+"/spBatchController/getOpList", //请求后台的url
		        singleSelect: true, //仅允许单选
		        //search: true,
		        clickToSelect:true,
		        showColumns:false, //是否显示所有的列
		        showRefresh:true,//是否显示刷新按钮
		        pagination:true,//是否显示分页（*）
                detailView:false,
		        queryParamsType: 'undefined',
		        queryParams : queryParams,//传递参数（*）
		        responseHandler:rspHandler,
		        minimumCountColumns:2,//最少允许的列数
		        pageNumber:1,                       //初始化加载第一页，默认第一页
		        pageSize: 10,                       //每页的记录行数（*）
		        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
		        idField :"id",
		        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		        showExport: true,                    
		        exportDataType: 'all',
		        columns: [
		        {
		            checkbox: true
		        },
		        //动态创建列名
                {
                    field : 'batchcode',
                    title : '批次号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'optime',
                    title : '操作时间',
                    align : 'center',
                    valign : 'middle',
                }, {
                    field : 'opuname',
                    title : '操作人',
                    align : 'center',
                    valign : 'middle',
                    sortable : true
                }, {
                    field : 'opno',
                    title : '操作版本',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'optstatus',
                    title : '操作状态',
                    align : 'center',
                    valign : 'middle',
                    formatter: function (value, row, index) {
                        if (value == 0){
                            return "新增";
                        }else if(value == 1){
                            return "关联";
                        }else if(value == 2){
                            return "分箱";
                        }else if(value == 3){
                            return "完成上架";
                        }else{
                            return "错误";
						}
                    }

                }],
		        onClickRow: function (row, $element) {},

				// 加载子表格
                onExpandRow: function (index, row, $detail) {
                    oTableInit.InitSubTable(index, row, $detail);
                }
		    });
	        
	        $('#dhtable').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
	     
	        $('#dhprint').click(function(){ //打印机事件
	        	var selectContent = table.bootstrapTable('getSelections')[0];  
	            if(typeof(selectContent) == 'undefined') {  
	            	swal({
	                    title: "警告",
	                    text: "未选择任何调货单，请谨慎操作！",
	                    type: "warning",
	                    confirmButtonColor: "#DD6B55",
	                    confirmButtonText: "确认",
	                    closeOnConfirm: false
	                }); 
	            }else{             	
	            	  var index = parent.layer.open({
	            	  type: 2,
	            	  shade: [0.8, '#393D49'],
	            	  content: pageContext+"/storedh/printStoreReport?dhid="+selectContent.id,
	            	  area: ['300px', '195px'],
	            	  maxmin: true
	            	});   
	            	  parent.layer.full(index);
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
        var batchid = row.id;
        var cur_table = $detail.html('<table></table>').find('table');
        console.info(cur_table);
        $(cur_table).bootstrapTable({
            method:'POST',
            dataType:'json',
            contentType: "application/x-www-form-urlencoded",
            url: pageContext+"/spBatchController/getBatchInSpxx",
            queryParams: {batchID : batchid},
            pagination:false,					//是否显示分页（*）
            columns: [
                {
                    field: 'spcode',
                    title: '商品编码'
                }, {
                    field: 'spmc',
                    title: '商品名称'
                }, {
                    field: 'sellprice',
                    title: '销售价'
                }, {
                    field: 'createtime',
                    title: '创建时间'
                }
			],
            onExpandRow: function (index, row, $Subdetail) {
                oTableInit.InitSubTable(index, row, $Subdetail);
            }
        });
    };


    return oTableInit;
};
	var table = null;
	function queryParams(params) {
		var batchcode = getBatchCode();
		var optstatus = getOptstatus();

        var startTime;
        var endTime;
        var time = $("#time").val();
        if(time == ""){
            startTime = "";
            endTime = "";
        }else{
            var timeArray = time.split(" - ");
            startTime = timeArray[0];
            endTime = timeArray[1];
        }

    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                pageSize: params.pageSize,   //页面大小  
                pageNumber: params.pageNumber, //页码  
                sortName: params.sort,  //排序列名  
                sortOrder:params.order, //排序方式
            	batchcode:batchcode,
            	optstatus:optstatus,
            	startTime:startTime,
            	endTime:endTime
            };
            return temp;  
      }
	//得到查询的参数      
	 function rspHandler (res) {
	    if (res) {
	    	
	    	//循环确认每个批次的状态
	    	$.each(res.list, function(index, item){
	    		item.status = confirmSpBatchStatus(item.status);
	    	});
	    	
	    	//循环确认是否有图片
	    	$.each(res.list, function(index, item){
	    		var isExistImage = '没有图片';
	    		if(item.hasphoto != null && item.hasphoto == true){
	    			isExistImage = '有图片';
	    		}
	    		item.hasphoto = isExistImage;
	    	});
	    	
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

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-7 下午1:14:23
 * 模块名称:
 * 操作:新增批次
 *
 */
function addBatch(){
	layer.open({
	      type: 2,
	      title: '新增批次',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['750px', '450px'],
	      content: 'batch-add',
	      btn:['确定新增','取消'],
	      yes:function(index,layero){
	    	    var posData = $(layero).find("iframe")[0].contentWindow.formData();
	    		if(posData.batchname==''){
	    			layer.alert("请输入批次名称!");
	    			return false;
	    		}
	    		if(posData.brand==''){
	    			layer.alert("请选择品牌！");
	    			return false;
	    		}
	    		if(posData.texture==''){
	    			layer.alert("请输入材质！");
	    			return false;
	    		}
	    		if(posData.scsj==''){
	    			layer.alert("请选择生产时间！");
	    			return false;
	    		}
	    		if(posData.producttype==undefined){
	    			layer.alert("选择批次类型！");
	    			return false;
	    		}
	    		layer.confirm("确定添加批次吗？", function(index){
	    			$.ajax({
	    				url:pageContext+"/spBatchController/saveSpBatch",
	    			  	type:"post",
	    			  	dataType:"json",
	    			  	data:posData, 
	    			  	async:false,  
	    		    	success:function(data,index){
	    		    		if(data.success){
	    		    			layer.alert("新增批次成功！");
	    		    			window.location.reload();
	    		    		}else{
	    		    			layer.alert("保存批次失败！");
	    		    		}
	    		    	}
	    		    }); 
	    		});
	      },
	      error:function(index){
	    	  
	      }
	    });
}


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-7 下午2:19:48
 * 模块名称:
 * 操作:单件包装
 *
 */
function singlePacked(){
	//获取当前批次
	var rows = $('#dhtable').bootstrapTable("getSelections")[0];
	//判断是否选中批次
	if(rows == undefined){
        layer.msg("请选中批次", function(){});
        return false
	}
	
	//确认框
	layer.msg('批次号为'+" ' "+rows.batchcode+" ' "+'的批次进行单件包装操作吗？', {
		  time: 6000,
		  btn: ['确定', '取消'],
		  btn1: function(){
			  //请求后台判断是否可以进行单件包装操作
			  requestBackEndIsSinglePacked(rows.id);
		  }
	});
}


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-7 下午2:18:16
 * 模块名称:
 * 操作:分箱
 *
 */
function binning(){
	//判断是否选中批次
	var spBatchId;
	var rows = $('#dhtable').bootstrapTable("getSelections")[0];
	//判断是否选中批次
	if( rows!= undefined){
		//请求后台判断是否可以进行分箱操作并
		spBatchId=rows.id;
		requestBackEndIsBinning(spBatchId);
	}else{
		layer.msg("请选中批次", function(){});
	}

}


// 打印箱条码
function printBoxBarcode(){
	//判断是否选中批次
	var spBatchId;
	var flag=false;
	$("#dhtable tbody  tr").each(function(){
		if($(this).find("input[type='checkbox']").is(':checked')){
			flag=true;
			spBatchId=$(this).find("input[type='checkbox']:checked").val();
			return false;
		}
	});
	
	if(flag){
		//请求后台判断是否能打开箱条码预览窗口
		requestBackEndisOpenBoxBarcodePreviewWindows(spBatchId);
	}else{
		layer.msg("请选择批次！");
	}
}

// 请求后台判断是否可以进行单件包装操作
function requestBackEndIsSinglePacked(spBatchId){
	$.ajax({
		url:pageContext+"/spBatchController/spBatchWhetherSinglePacked",
		type:'post',
		dataType:'json',
		data:{'spBatchId' : spBatchId},
		async:false,
		success:function(data){
			if(data.success){
				//可以进行单件包装操作，再次询问是否执行单件包装操作
				layer.msg("勾选批次可以执行单件包装操作，是否要单件包装操作", {time:0, btn:['确定', '取消'], 
						btn1:function(){
							requestBackEndSinglePacked(spBatchId);
						}
					}
				);
			}else{
				layer.msg(data.msg, {time:0, btn:'确定'});
			}
		}
	});
}


// 请求后台进行单件包装操作
function requestBackEndSinglePacked(spBatchId){
	$.ajax({
		url:pageContext+"/spBatchController/spBatchExecuteSinglePacked",
		type:'post',
		dataType:'json',
		data:{'spBatchId' : spBatchId},
		async:false,
		success:function(data){
			if(data.success){
				layer.msg('处理中', {time:500, shade: 0.3}, function(){
					window.location.reload();
				});
			}else{
				layer.msg(data.msg, {time:0, btn:'确定'});
			}
		}
	});
}


// 请求后台判断是否可进行分箱操作
function requestBackEndIsBinning(spBatchId){
	$.ajax({
		url:pageContext+"/spBatchController/spBatchWhetherBinning",
		type:'post',
		dataType:'json',
		data:{'spBatchId' : spBatchId},
		async:false,
		success:function(data){
			if(data.success){
				//是否打开分箱窗口
				isOpenBinningWindows(data.success);
			}else{
				if(data.obj != null){
					layer.msg(data.msg, {time:0, btn:['确定', '重新打印箱条码'], 
							btn2:function(){
								//打开箱条码预览窗口
								openBoxBarcodePreviewWindows();
							}
						}
					);
				}else{
					layer.msg(data.msg, {time:10000, btn:['确定']});
				}
			}
		}
	});
	return isBinning;
}

// 请求后台判断是否可以打开箱条码预览窗口
function requestBackEndisOpenBoxBarcodePreviewWindows(spBatchId){
	$.ajax({
		url:pageContext+"/spBatchController/spBatchIsPrintBoxBarcode",
		type:'post',
		dataType:'json',
		data:{'spBatchId' : spBatchId},
		async:false,
		success:function(data){
			if(data.success){
				//打开分箱窗口
				openBoxBarcodePreviewWindows();
			}else{
				layer.msg(data.msg, {time:0, btn:['确定']});
			}
		}
	});
}

// 判断是否打开分箱窗口
function isOpenBinningWindows(isOpen){
	if(isOpen){
		  layer.open({
		      type: 2,
		      title: '商品分箱',
		      shade: [0.8, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px', '550px'],
		      content: 'batch-binning'
		 });
	}
}

// 打开箱条码预览窗口
function openBoxBarcodePreviewWindows(){
	layer.open({
		type: 2,
		title: '箱条码预览',
		shade: [0.8, '#393D49'],
		maxmin: true,
		area: ['400px', '550px'],
		content: 'batch-boxBarcode'
	});
}

// 关联商品
var goods = function(){
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows == null || rows == undefined || rows.length == 0){layer.msg("请选中一条批次"); return false;}
    if (rows.length > 1){layer.msg("不支持对多条批次进行操作"); return false;}

    var batchid = rows[0].batchid;		// 获取批次id
    var batchcode = rows[0].batchcode;	// 获取批次code
    var opno = rows[0].opno;			// 获取批次版本号
    layer.open({
        type: 2,
        title: '关联商品',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '600px'],
        content: 'batch-goods',
        success: function (layero, index) {
            $("#batchid", layero.find("iframe")[0].contentWindow.document).val(batchid);
            $("#opno", layero.find("iframe")[0].contentWindow.document).val(opno);
            $(".top-title h3", layero.find("iframe")[0].contentWindow.document).html("当前批次号：" + batchcode +"&nbsp;&nbsp;（版本："+ opno +"）");
        }
    });
}

// 批次分箱
var batchBinning = function(){
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows == null || rows == undefined || rows.length == 0){layer.msg("请选中一条批次"); return false;}
    if (rows.length > 1){layer.msg("不支持对多条批次操作进行操作"); return false;}

    var status = rows[0].optstatus;
    if (status == 0){layer.msg("未关联商品，无法分箱！"); return false;}
    if (status == 2){layer.msg("已经分箱，无法继续分箱！"); return false;}
    if (status == 3){layer.msg("已经完工，无法继续分箱！"); return false;}

    var batchid = rows[0].batchid;		// 获取批次id
    var batchcode = rows[0].batchcode;	// 获取批次code
    var opno = rows[0].opno;			// 获取批次版本号
    layer.open({
        type: 2,
        title: '分箱',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['900px', '600px'],
        content: 'batch-binning',
        success: function (layero, index) {
            $("#batchid", layero.find("iframe")[0].contentWindow.document).val(batchid);
            $("#opno", layero.find("iframe")[0].contentWindow.document).val(opno);
            $(".version h3", layero.find("iframe")[0].contentWindow.document).html("当前版本：" + opno);
            $(".code h3", layero.find("iframe")[0].contentWindow.document).html("当前批次：" + batchcode);
        }
    });
}


// 完成
var finish = function(){
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows == null || rows == undefined || rows.length == 0){layer.msg("请选中一条批次"); return false;}
    if (rows.length > 1){layer.msg("不支持对多条批次操作进行操作"); return false;}

    var status = rows[0].optstatus;
    if (status == 0){layer.msg("未关联商品，无法完工！"); return false;}
    if (status == 1){layer.msg("未分箱，无法完工！"); return false;}
    if (status == 3){layer.msg("已经完工！"); return false;}

    var batchid = rows[0].batchid;			// 获取批次id
    var batchcode = rows[0].batchcode;		// 获取批次编码
    var opno = rows[0].opno;				// 获取批次版本号
    layer.confirm("确认对批次号" + batchcode + "的" + opno + "版本进行完工吗？", {
            btn: ['确定','取消'],
            shade: 0.6
        }, function(index){				// 单件包装操作
            $.ajax({
                url: pageContext + "/spBatchController/finish/" + batchid +"/" + opno,
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        layer.msg(data.msg, {time: 3000});
                        layer.close(index);
                    } else {
                        layer.msg(data.msg, {time: 3000});
                        layer.close(index);
                    }
                }
            });
        }
    );
}

// 确认批次的状态（把批次的状态装换为文字）
function confirmSpBatchStatus(batchStatus){
	var textStatus;
	$.each(batchlist_status, function(index, item){
		if(item.status == batchStatus){
			textStatus = item.text;
		}
	});
	return textStatus;
}


// 判断是否选中批次thisBatch当前表格
function isSelectedBatch(thisBatch){
	var isSelect = false;
	if(thisBatch!= null && thisBatch != ''){
		isSelect = true;
	}
	return isSelect;
}

// 搜索
function search(){
    $("#dhtable").bootstrapTable('refreshOptions', {pageNumber:1});
    $("#dhtable").bootstrapTable('refresh', queryParams);
}

// 获取url中的参数的函数
var getQueryVariable = function(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

var executeSearch = function (param) {
	$("#batchcode").val(param);
    $("#dhtable").bootstrapTable('refreshOptions', {pageNumber:1});
    $("#dhtable").bootstrapTable('refresh', queryParams);
}

// 获取批次号
var getBatchCode = function () {
	var batchcode = $("#batchcode").val();
	return batchcode;
}

// 获取状态
var getOptstatus = function () {
    var optstatus = $("#optstatus").val();
    return optstatus;
}