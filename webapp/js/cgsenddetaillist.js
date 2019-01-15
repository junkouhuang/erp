//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#cgsenddetaillist_table").bootstrapTable('refresh', queryParams);
        }
    });
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#cgsenddetaillist_table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/cgsenddetailController/getCgsenddetailPageList", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            clickToSelect: true,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            detailView: true, 					//是否显示详情折叠(父子表)
            exportDataType: 'all',
            onExpandRow: onExpandRow,
            rowStyle: function (row, index) {
                var strclass = "";
                if (row.fjing) {
                    strclass = 'btn-danger';
                } else {
                    strclass = 'btn-success';
                }
                return {classes: strclass}
            },
            columns: [
                {
                    checkbox: true
                },
                {
                    field: 'cgdetailid',
                    title: '采购明细id',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'cpmc',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'itemno',
                    title: '明细号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fjcomplete',
                    title: '明细分拣完成',
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
                    field: 'cgordercode',
                    title: '采购单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cpsl',
                    title: '采购数量',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'nowds',
                    title: '现袋数',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'recvds',
                    title: '到货袋数',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fjing',
                    title: '分拣状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value) {
                            return '分拣中';
                        } else {
                            return '可分拣';
                        }
                    }
                }]
        });
        $('#cgsenddetaillist_table').bootstrapTable('hideColumn', 'cgdetailid');
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset
        };
        return temp;
    };
    return oTableInit;
}

var table = null;

function queryParams(params) {
    var cgordercode = $("#cgordercode").val();
    var itemno = $("#itemno").val();
    var cpmc = $("#cpmc").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        cgordercode: cgordercode,
        itemno: itemno,
        cpmc:cpmc
    };
    return temp;
}

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

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});

// 搜索
function search() {
    $("#cgsenddetaillist_table").bootstrapTable('refresh', queryParams);
}

/**
 * @Description创建分拣工单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/5/5 9:46
 **/
var cgsenddetails;

function sortingWork() {
    var rows = $('#cgsenddetaillist_table').bootstrapTable("getSelections"); //获取当前表格
    cgsenddetails = rows[0];
    if (rows.length != 1) {
        layer.msg("此操作只支持单条操作！！", function () {});
        return;
    }
    if (rows[0].fjing) {
        layer.msg("有分拣工单尚未处理完毕,不能再次开分拣工单！！", function () {});
        return;
    }
    if (rows[0].fjcomplete){
        layer.msg("该采购明细已经分拣完成，不能再开分拣工单！！",function(){});
        return;
    }
    layer.open({
        type: 2,
        title: '分拣工单界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['1000px', '618px'], //宽高
        content: "sortingwork",
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var ordercode = posData["ordercode"];
            var cpmc = posData["cpmc"];
            var itemno = posData["itemno"];
            var fjds = posData["fjds"];
            var fjTime = posData["fjTime"];
            var fjfzr = posData["fjfzr"];
            posData["senddetailid"] = rows[0].id;
            posData["cgdetailid"] = rows[0].cgdetailid;
            if (ordercode == null || ordercode == undefined || ordercode == "") {
                layer.msg("分拣单号不能为空！！", function () {});
                return;
            }
            if (cpmc == null || cpmc == undefined || cpmc == "") {
                layer.msg("产品名称不能为空！！", function () {});
                return;
            }
            if (itemno == null || itemno == undefined || itemno == "") {
                layer.msg("货品条目号不能为空！！", function () {});
                return;
            }
            if (fjds == null || fjds == undefined || fjds == "") {
                layer.msg("分拣袋数不能为空！！", function () {});
                return;
            }
            if (fjds > rows[0].recvds){
                layer.msg("分拣袋数，大于实际袋数！！",function(){});
                return;
            }
            if (fjTime == null || fjTime == undefined || fjTime == "") {
                layer.msg("分拣时间不能为空！！", function () {});
                return;
            }
            if (fjfzr == null || fjfzr == undefined || fjfzr == "") {
                layer.msg("分拣负责人不能为空！！", function () {});
                return;
            }
            $.ajax({
                url: pageContext + "/cgfjController/addCgfj/"+rows[0].id,
                contentType: 'application/json;charset=utf-8',
                type: "POST",
                dataType: "json",
                async: true,
                data: JSON.stringify(posData),
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        search();
                    }
                }
            });
        }
        , btn2: function (index, layero) {
            layer.close(index);
        }
    })
}

function getCgsenddetails() {
    return cgsenddetails;
}

function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    var cur_table = $detail.html('<table style="color: #7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/cgfjController/getCgfjListPage?senddetailid=" + row.id,
        showColumns: false, //是否显示所有的列
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        queryParams: queryParamschild,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 50, 100],        //可供选择的每页的行数（*）
        showExport: true,
        columns: [
            {
                field: 'ordercode',
                title: '分拣单号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'createtime',
                title: '创建时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'fjds',
                title: '分拣袋数',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'status',
                title: '状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "分拣中";
                    } else if (value == 1) {
                        return "分拣完成";
                    } else {
                        return "异常";
                    }
                }
            }, {
                field: 'addusername',
                title: '操作员',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'fjfzr',
                title: '分拣负责人',
                align: 'center',
                valign: 'middle'
            }
        ]
    });
};

function queryParamschild(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order //排序方式
    };
    return temp;
}


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

function getcgrecvmx() {
    var rows = $('#cgsenddetaillist_table').bootstrapTable("getSelections"); //获取当前表格
    if(rows.length != 1){
        layer.msg("请选择一条进行到货明细查询！！",function(){});
        return;
    }
    layer.open({
        type: 2,
        title: '到货明细',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "cgrecvdetails?cgdetailid="+rows[0].cgdetailid,
        btn: ['取消'], //可以无限个按钮
        yes: function (index, layero) {
            layer.close(index);
        }
    });
}

function CgdetailCompeleteOpt() {
    var rows = $('#cgsenddetaillist_table').bootstrapTable("getSelections");
    if(rows.length != 1){
        layer.msg("请选择一条进行确认分拣完成操作！！",function(){});
        return;
    }
    if(rows[0].fjcomplete){
        layer.msg("明细号："+rows[0].itemno+"已经确认分拣完成了！！",function(){});
        return;
    }
    $.ajax({
        url: pageContext + "/cgdetailController/confirmFjCompleteByCgdetailid/"+rows[0].cgdetailid,
        contentType: 'application/json;charset=utf-8',
        type: "POST",
        dataType: "json",
        async: true,
        data: JSON.stringify(posData),
        success: function (data) {
            layer.alert(data.msg);
            if (data.success) {
                layer.close(index);
                search();
            }
        }
    });
}