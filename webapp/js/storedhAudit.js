//初始化bootstrap Table
var dhid;
$(function(){
	//获取门店退货单id和门店id
    dhid = getQueryVariable("id");
	
	//初始化Table
	var oTable=new TableInit();
	oTable.Init(dhid);
})

// 当前行数据
var thisRow;
// 当前行号
var thisRowNum;

var TableInit=function(){
	var oTableInit=new Object();
	oTableInit.Init=function (dhid) {
			//1.初始化Table
	         $('#table').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:pageContext+"/storedhController/getStoredhAudit", //请求后台的url
		        singleSelect: true, //仅允许单选
		        //search: true,
		        showColumns:false, //是否显示所有的列
		        showRefresh:false,//是否显示刷新按钮
			    showFooter:true,
				pagination:false,//是否显示分页（*）
		        queryParamsType: 'json',
		        queryParams : {'dhid' : dhid},//传递参数（*）
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
		            field : 'ys',
		            title : '颜色',
		            align : 'center',
		            valign : 'middle'
		        }, {
		            field : 'cm',
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
                    field : 'fhsl',
                    title : '发货数量',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalSL = 0;
                        $.each(value, function (index, item) {
                            totalSL += item.fhsl;
                        });
                        return totalSL;
                    }
                }, {
                    field : 'fhje',
                    title : '发货金额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var totalPrice = 0;
                        $.each(value, function (index, item) {
                            totalPrice += item.fhje;
                        });
                        return totalPrice;
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



// 客服审核确认
function confirm(){
    // 判断是否有数据
    var isDate = $('#table').bootstrapTable('getData', true);
    if(isDate == null || isDate == "" || isDate.length == 0 || isDate == undefined){
        layer.msg("没有需要客服审核的商品，无法客服审核");
        return false;
    }

    layer.confirm('确认进行客服审核？', {
        btn: ["确定", "取消"]
        ,yes: function(index){
           requestBackEndConfirm();
           layer.close(index);
        }
    });
}

// 客服审核请求后台进行确认
function requestBackEndConfirm(){
    $.ajax({
        url:pageContext+"/storedhController/confirmAudit",
        dataType:"json",
        async:false,
        data:{'dhid' : dhid},
        type:"POST",
        success:function(data){
            if(data.success){
                alert(data.msg);
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);  // 关闭layer
                //window.parent.location.reload();  //刷新
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
	
