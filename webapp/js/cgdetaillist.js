//初始化bootstrap Table
var rowid = 0;
$(function () {
    loadGysList();
    //1.初始化Table
    table = $('#cgdetaillist_table').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: true,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/cgdetailController/getCgdetailPageList", //请求后台的url
        singleSelect: false, //仅允许单选
        //search: true,
        sortable: true,  //是否启动排序
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）， 显示页码等信息
        queryParamsType: 'undefined',
        clickToSelect: true,//在点击行时，自动选择rediobox 和 checkbox
        sidePagination: 'server',//分页方式：client 客户端分页，server 服务端分页
        sortOrder: 'asc',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        showExport: true,
        exportDataType: 'all',
        rowStyle: function (row, index) {
            var strclass = "";
            if(row.cgsenddetailid != null){
                strclass = "btn-primary";
            }
            return {classes: strclass}
        },
        columns: [
            {
                checkbox: true
            }, {
                field: 'cgdan.ordercode',
                title: '采购单号',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'cgitemno',
                title: '采购编码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'fjcomplete',
                title: '分拣完成',
                align: 'center',
                valign: 'middle',
                sortable: true,
                formatter: function (value, row, index) {
                    var str = '';
                    if (value) {
                        str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'historyitemno',
                title: '原始采购编码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'cpmc',
                title: '产品名称',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'cpsl',
                title: '产品数量',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'cgdan.createtime',
                title: '开单日期',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'cgdan.gysmc',
                title: '供应商',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'cgdan.jbrmc',
                title: '采购员',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgdan.cgsj',
                title: '采购时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgdan.bz',
                title: '备注',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgdan.addusername',
                title: '建单员',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgdan.yjfhsj',
                title: '预计发货时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgdan.yjdhsj',
                title: '预计到货时间',
                align: 'center',
                valign: 'middle'
            }],
        onClickRow: function (row, $element) {
            rowid = row.id;
        },
        onCheck: function (row) {
            rowid = row.id;
        }
    });
});

var table = null;

function queryParams(params) {
    var postdata = $('#cgdetaillistFrom').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
    var time = $("#time").val();
}

function queryDetailView(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        cgid: params
    };
    return temp;
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-6 上午11:17:37
 * 模块名称:
 * 操作:父子表
 *
 */
function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    var cur_table = $detail.html('<table id="cur_table" style="color:#7aba7b"></table>').find('table');
    var cgid = row.id;
    $(cur_table).bootstrapTable({
        method: "get", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/cgdController/getCgdetailByCgdanid",
        singleSelect: true, //仅允许单选
        dataType: "json",
        pagination: false,    // 显示页码等信息
        responseHandler: responseHandler,
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 10,           // 当前分页值
        pageList: [10, 20],  // 分页选页
        queryParams: queryDetailView(cgid),//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        striped: true, // 隔行加亮
        columns: [
            {
                checkbox: true,
                formatter: function (value, row, index) {
                    if (row.id == '' || row.id == null || row.id == undefined) {
                        return {
                            disabled: true
                        };
                    }
                }
            },
            {
                title: '产品名称',
                field: 'cpmc',
                align: 'center',
            },

            {
                title: '订单数量',
                field: 'cpsl',
                align: 'center',
            },
            {
                title: '单价',
                field: 'dj',
                align: 'center',
            },
            {
                title: '金额',
                field: 'je',
                align: 'center',
            },
            {
                title: '物料类别',
                field: 'lb',
                align: 'center',
            }
        ], onClickRow: function (row, $element) {
            rowid = row.id;
        },
        onCheck: function (row) {
            rowid = row.id;
        }
    });

};

//得到查询的参数
function rspHandler(res) {
    if (res) {
        return {
            "rows": res.list,
            "total": res.total
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }
};

function responseHandler(res) {
    if (res) {
        return {
            "rows": res,
            "total": res.total
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }
};

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});

//搜索功能
function LoadingDataListOrderRealItems() {
    $("#cgdetaillist_table").bootstrapTable('refresh', queryParams);
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-7 上午10:53:54
 * 模块名称:
 * 操作:选择框
 *
 */
var status = -1;

function isRadio(o) {
    status = $(o).find("input").val();
    if (!$(o).hasClass("checked")) {
        $(o).addClass("checked").siblings().removeClass("checked");
    }
}

/**
 * @Description 打开采购清点界面
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-04-08 16:15
 **/
var cgdetails;
function openReceipt() {
    cgdetails = $("#cgdetaillist_table").bootstrapTable("getSelections");
    if(cgdetails.length < 1){
        layer.msg("请选择采购明细进行收货清点！！",function(){});
        return;
    }
    for(var i in cgdetails){
        if(cgdetails[i].fjcomplete){
            layer.msg("采购明细:"+cgdetails[i].cgitemno+"已经分拣完成，不能进行收货清点操作！！",function(){});
            return;
        }
    }
    layer.open({
        type: 2,
        title: '收货清点界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['1000px', '618px'], //宽高
        content: "cgdetail_receipt",
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var cgsenddetails = posData["cgsenddetails"];
            var jbrid = posData["jbrid"];
            var jbrmc = posData["jbrmcs"];
            var recvmanage = posData["recvmanages"];
            var takestarttimeStr = posData["takestarttimeStr"];
            var takeendtimeStr = posData["takeendtimeStr"];
            if(jbrid == null || jbrid =="" || jbrid == undefined){
                layer.msg("收货清点人员不能为空！！",function(){});
                return;
            }
            if(jbrmc == null || jbrmc =="" || jbrmc == undefined){
                layer.msg("收货清点人员不能为空！！",function(){});
                return;
            }
            if(recvmanage == null || recvmanage =="" || recvmanage == undefined){
                layer.msg("收货负责人不能为空！！",function(){});
                return;
            }
            if(takestarttimeStr == null || takestarttimeStr =="" || takestarttimeStr == undefined){
                layer.msg("收货开始时间不能为空！！",function(){});
                return;
            }
            if(takeendtimeStr == null || takeendtimeStr =="" || takeendtimeStr == undefined){
                layer.msg("收货结束时间不能为空！！",function(){});
                return;
            }
            console.log(cgsenddetails);
            for(var i =0;i<cgsenddetails.length;i++){
                if(cgsenddetails[i].cgdetailid == null){
                    layer.msg("有cgdetailid为null！！",function(){});
                    return;
                }else if(cgsenddetails[i].recvds == null){
                    layer.msg("有到货袋数未填！！",function(){});
                    return;
                }else if(cgsenddetails[i].kw == null || cgsenddetails[i].kw =="" || cgsenddetails[i].kw == undefined){
                    layer.msg("有库位未填！！",function(){});
                    return;
                }
            }
            $.ajax({
                url:pageContext + "/cgrecvController/addCgrecv",
                contentType:'application/json;charset=utf-8',
                type:"POST",
                dataType:"json",
                async:true,
                data:JSON.stringify(posData),
                success:function (data) {
                    layer.alert(data.msg);
                    if(data.success){
                        layer.close(index);
                        LoadingDataListOrderRealItems();
                    }
                }
            });
        }
        , btn2: function (index, layero) {
            layer.close(index);
        }
    })
}
function getCgdetails() {
    return cgdetails;
}
function loadGysList() {
    $.ajax({
        url: pageContext + "/gysxxController/getGysxxList",
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            var content = "";
            content += "<option value=\"\" selected=\"selected\">请选择供应商</option>";
            for (var i = 0; i < data.length; i++) {
                content += "<option value=" + data[i].id + ">" + data[i].gysmc + "</option>";
            }
            $("#gysid").append(content);
            $('#gysid').combobox();
        }, error: function () {
        }
    });
}
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#cgdetaillist_table").bootstrapTable('refresh', queryParams);
        }
    });
});
