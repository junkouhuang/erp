//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();

    var funName = getQueryVariable("execute");
    if (funName != false) {
        var param = getQueryVariable("param");
        window[funName](param);
    }
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#dhtable').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/spBatchController/getAllSpBatchInfo", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            clickToSelect: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            detailView: true,
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            onExpandRow: onExpandRow,
            columns: [
                {
                    checkbox: true
                },
                //动态创建列名
                {
                    field: 'id',
                    title: '批次Id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'batchname',
                    title: '名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'replenish',
                    title: '会补货',
                    align: 'center',
                    valign: 'middle',
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
                    field: 'imports',
                    title: '导入小程序',
                    align: 'center',
                    valign: 'middle',
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
                    field: 'fxed',
                    title: '分箱',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == true) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'audited',
                    title: '关联',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == true) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'cgsendsTotal',
                    title: '收货',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value > 0) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'productionTotal',
                    title: '挂标',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value > 0) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'replenish',
                    title: '补货',
                    align: 'center',
                    valign: 'middle',
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
                    field: 'hasphoto',
                    title: '图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == true) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "默认";
                        } else if (value == 2) {
                            return "确认";
                        } else if (value == 3) {
                            return "首次配货中";
                        } else if (value == 4) {
                            return "首次配货完成";
                        } else if (value == 5) {
                            return "完工";
                        } else {
                            return "未知";
                        }
                    }
                }, {
                    field: 'baudied',
                    title: '在库状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "入库验收";
                        } else if (value == 2) {
                            return "取消";
                        } else {
                            return "默认";
                        }
                    }
                }, {
                    field: 'fblx',
                    title: '发布类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "订货会";
                        return "未知";
                    }
                }, {
                    field: 'pkgtype',
                    title: '产品类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            return '打包';
                        } else if (value == 1) {
                            return '单件';
                        }
                        return str;
                    }
                }, {
                    field: 'batchlx',
                    title: '批次类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            return '新货';
                        } else if (value == 1) {
                            return '老货';
                        } else if (value == 2) {
                            return '订货';
                        }
                        return str;
                    }
                }, {
                    field: 'spprice',
                    title: '单价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchfbtime',
                    title: '发布时间',
                    align: 'center',
                    valign: 'middle'
                }]
        });
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
};
var table = null;

function onExpandRow(index, row, $Subdetail) {
    InitSubTable(index, row, $Subdetail);
}

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

function queryDetailView(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        "batchID": params
    };
    return temp;
}

// 子表格
InitSubTable = function (index, row, $detail) {
    var batchid = row.id;
    var cur_table = $detail.html('<table id="cur_table" style="color:#7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: "get", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/spBatchController/getBatchInSpxx",
        singleSelect: true, //仅允许单选
        dataType: "json",
        pagination: false,    // 显示页码等信息
        responseHandler: responseHandler,
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 10,           // 当前分页值
        pageList: [10, 20],  // 分页选页
        queryParams: queryDetailView(batchid),//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        columns: [
            {
                field: 'spcode',
                title: '商品编码'
            }, {
                field: 'spmc',
                title: '商品名称'
            }, {
                field: 'lbmc',
                title: '商品类别'
            }, {
                field: 'sellprice',
                title: '销售价'
            }, {
                field: 'createtime',
                title: '创建时间'
            }
        ],
        onClickRow: function (row, $element) {
            rowid = row.id;
        },
        onCheck: function (row) {
            rowid = row.id;
        }
    });
};

function queryParams(params) {
    var postdata = $('#batchlistForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['pageNumber'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
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
laydate.render({
    elem: '#createtimeStr',
    range: true,
    type: 'datetime'
});
laydate.render({
    elem: '#batchfbstr',
    range: true,
    type: 'datetime'
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-7 下午1:14:23
 * 模块名称:
 * 操作:新增批次
 *
 */
function addBatch() {
    layer.open({
        type: 2,
        title: '新增',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        content: 'batch-add',
        btn: ['确定新增', '取消'],
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(posData);
            if (posData.batchcode == '' || posData.batchcode == undefined || posData.batchcode == null) {
                layer.msg("批次号不能为空！！", function () {
                });
                return;
            }
            if (posData.batchname == '') {
                layer.msg("请输入批次名称！！", function () {
                });
                return;
            }
            if (posData.brand == '') {
                layer.msg("请选择品牌！！", function () {
                });
                return;
            }
            if (posData.typename == '') {
                layer.msg("请选择档次类型！！", function () {
                });
                return;
            }
            if (posData.dq == '') {
                layer.msg("请选择地域属性！！", function () {
                });
                return;
            }
            if (posData.jj == '') {
                layer.msg("请选择对应季节！！", function () {
                });
                return;
            }
            /*if (posData.lbmc == '') {
                layer.msg("请选择类别！！", function () {});
                return;
            }*/
            if (posData.lx == '') {
                layer.msg("请选择产品类型！！", function () {
                });
                return;
            }
            if (posData.spprice == '' || posData.spprice == null || posData.spprice == undefined) {
                layer.msg("请填写价格！！", function () {
                });
                return;
            }
            if (posData.batchtradeid == '' || posData.batchtradeid == null || posData.batchtradeid == undefined) {
                layer.msg("请选择品牌商！！", function () {
                });
                return;
            }
            if (posData.batchlx == '' || posData.batchlx == null || posData.batchlx == undefined) {
                layer.msg("请选择批次类型！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/spBatchController/addSpBatchInfo",
                type: "post",
                dataType: "json",
                data: JSON.stringify(posData),
                contentType: 'application/json;charset=utf-8',
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        search();
                        layer.close(index);
                    }
                }
            });
        },
        error: function (index) {

        }
    });
}

//修改批次
function updateBatch() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一个批次进行修改操作", function () {
        });
        return false
    }
    layer.open({
        type: 2,
        title: '修改批次信息',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        content: 'batch-add?batchid=' + rows[0].id,
        btn: ['确定修改', '取消'],
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(posData);
            var spprice = posData["spprice"];
            if (rows[0].imports && rows[0].spprice != spprice) {
                layer.msg("选中的批次已经导入小程序了，不能修改其价格！", function () {
                });
                return;
            }
            if (posData.batchcode == '' || posData.batchcode == undefined || posData.batchcode == null) {
                layer.msg("批次号不能为空！！", function () {
                });
                return;
            }
            if (posData.batchname == '') {
                layer.msg("请输入批次名称！！", function () {
                });
                return;
            }
            if (posData.brand == '') {
                layer.msg("请选择品牌！！", function () {
                });
                return;
            }
            if (posData.typename == '') {
                layer.msg("请选择档次类型！！", function () {
                });
                return;
            }
            if (posData.dq == '') {
                layer.msg("请选择地域属性！！", function () {
                });
                return;
            }
            if (posData.jj == '') {
                layer.msg("请选择对应季节！！", function () {
                });
                return;
            }
            if (posData.lbmc == '') {
                layer.msg("请选择类别！！", function () {
                });
                return;
            }
            if (posData.lx == '') {
                layer.msg("请选择产品类型！！", function () {
                });
                return;
            }
            if (posData.spprice == '' || posData.spprice == null || posData.spprice == undefined) {
                layer.msg("请填写价格！！", function () {
                });
                return;
            }
            if (posData.batchtradeid == '' || posData.batchtradeid == null || posData.batchtradeid == undefined) {
                layer.msg("请选择品牌商！！", function () {
                });
                return;
            }
            if (posData.batchlx == '' || posData.batchlx == null || posData.batchlx == undefined) {
                layer.msg("请选择批次类型！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/spBatchController/updateSpBatchInfoBySelective/" + rows[0].id,
                type: "post",
                dataType: "json",
                data: JSON.stringify(posData),
                contentType: 'application/json;charset=utf-8',
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        search();
                        layer.close(index);
                    }
                }
            });
        },
        error: function (index) {
        }
    });
}

//打印箱条码
function printBoxBarcode() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一个批次进行箱条码打印操作！", function () {
        });
        return;
    }
    if (rows[0].pkgtype != 0) {
        layer.msg("只有打包的批次才支持箱条码打印操作！", function () {
        });
        return;
    }
    openBoxBarcodePreviewWindows(rows[0].id);
}

//打开箱条码预览窗口
function openBoxBarcodePreviewWindows(batchid) {
    layer.open({
        type: 2,
        title: '箱条码预览',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['100%', '100%'],
        content: 'batch-boxBarcode?batchid=' + batchid
    });
}

//判断是否选中批次thisBatch当前表格
function isSelectedBatch(thisBatch) {
    var isSelect = false;
    if (thisBatch != null && thisBatch != '') {
        isSelect = true;
    }
    return isSelect;
}

// 搜索
function search() {
    $("#dhtable").bootstrapTable('refreshOptions', {pageNumber: 1});
    $("#dhtable").bootstrapTable('refresh', queryParams);
}

// 获取url中的参数的函数
var getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

/**
 * @Description配貨操作
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/17 16:47
 **/
function prepare() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一个批次进行配货操作", function () {});
        return false
    }
    if (rows[0].baudied == 1) {
        layer.msg("该批次已经是完工状态，不能进行首次配货操作！！", function () {});
        return;
    }
    if (rows[0].status == 3 || rows[0].status == 4) {
        layer.msg("当前批次已经打了首批货了,不能再次进行首批配货操作！！", function () {});
        return;
    }/*  if(rows[0].replenish){
        layer.msg("会补货的批次请先上架，然后使用补货配货操作！！", function () {});
        return;
    }*/

    layer.confirm('确定对批次：' + rows[0].batchcode + "进行首次配货操作?",
        {btn: ['确认', '取消']},
        function (index) {
            $.ajax({
                url: pageContext + "/spBatchController/prepare/" + rows[0].id,
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        search();
                    }
                }
            });
            layer.close(index);
        });
}

/**
 * @Description根据批次打印网络拣货单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/18 13:28
 **/
function printWxOrdersByBatchCode() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一个批次进行网络拣货单打印操作", function () {
        });
        return false
    }
    layer.open({
        type: 2,
        title: '打印拣货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['100%', '100%'],
        btn: ['确认', '关闭'], //可以无限个按钮
        content: pageContext + "/spBatchController/printJhOrderByBatchCode/" + rows[0].id,
        yes: function (index, layero) {
            if (rows[0].status != 3) {
                layer.msg("只有批次状态是首次配货中的批次才能进行打印确认操作！！", function () {
                });
                return;
            } else {
                $.ajax({
                    url: pageContext + "/spBatchController/updateWxOrdersPrePareStatusByBatchid/" + rows[0].id,
                    contentType: 'application/json;charset=UTF-8',
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            layer.close(index);
                        }
                    }
                });
            }
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 * @Description入库验收
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/30 15:49
 **/
function acceptAnce() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("入库验收操作只支持单选！！", function () {
        });
        return;
    } else if (rows[0].baudied == 1) {
        layer.msg("该批次已经入库验收了！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].batchcode + '入库验收界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['520px', '300px'], // 宽高
        content: pageContext + "/spBatchController/getAcceptAnceInfo/" + rows[0].id,
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            $.ajax({
                url: pageContext + "/spBatchController/acceptAnceByBatchid/" + rows[0].id,
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    }
                }, error: function () {
                }
            });
        }
    });
}

/**
 * @Description同步库存
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/5/8 13:09
 **/
function syncSpatchStock() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选择一条要同步库存的批次！！", function () {
        });
        return;
    }
    if (!rows[0].imports) {
        layer.msg("批次尚未在小程序发布！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].batchcode + '库存同步界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['520px', '300px'], // 宽高
        content: "syncSpbatchStock?batchid=" + rows[0].id,
        btn: ['确认', '取消', '下架'], // 可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            $.ajax({
                url: pageContext + "/spBatchController/syncSpbatchdetail/" + rows[0].id,
                data: JSON.stringify(posData),
                contentType: 'application/json;charset=utf-8',
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    }
                }, error: function () {
                }
            });
        }, btn2: function (index) {
            layer.close(index);  //关闭弹窗
        }, btn3: function (index) {
            layer.confirm('确定要下架该批次？', {
                btn: ["确定", "取消"] //可以无限个按钮
                , yes: function (index2) {
                    layer.close(index2);
                    $.ajax({
                        url: pageContext + "/spBatchController/offBatchByid/" + rows[0].id,
                        dataType: "json",
                        async: true,
                        type: "POST",   //请求方式
                        success: function (data) {
                            alert(data.msg);
                            if (data.success) {
                                layer.close(index);
                                $('#tbody').bootstrapTable('refresh', queryParams);
                            }
                        }, error: function () {
                        }
                    });
                }
            });
        }
    });
}

var spbatchdetails = "";

function appendFbCminfo() {
    var selections = $('#dhtable').bootstrapTable("getSelections");
    if (selections.length != 1) {
        layer.msg("请选择一条要追加发布尺码的批次！！", function () {
        });
        return;
    }
    $.ajax({
        url: pageContext + "/spBatchController/getSpbatchdetailListByBatchid/" + selections[0].id,
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            if (data.success) {
                spbatchdetails = data.obj;
                layer.open({
                    type: 2,
                    title: selections[0].batchcode + '新增发布尺码界面',
                    shade: [0.8, '#393D49'],
                    maxmin: true, // 开启最大化最小化按钮
                    area: ['80%', '80%'], // 宽高
                    content: "batch-sync-cminfo",
                    btn: ['确认', '取消'], // 可以无限个按钮
                    yes: function (index, layero) {
                        var rows = $(layero).find("iframe")[0].contentWindow.formData();
                        var spbatchdetails = new Array();
                        for (var i in rows) {
                            if (rows[i].id == null || rows[i].id == "" || rows[i].id == undefined) {
                                console.log(rows[i]);
                                if (rows[i].batchcm == "" || rows[i].batchcm == null || rows[i].batchcm == undefined) {
                                    layer.msg("尺码不能为空！！", function () {
                                    });
                                    return;
                                }
                                if (rows[i].mfsl == "" || rows[i].mfsl == null || rows[i].mfsl == undefined) {
                                    layer.msg("每份数量不能为空！！", function () {
                                    });
                                    return;
                                }
                                if (rows[i].batchys == "" || rows[i].batchys == null || rows[i].batchys == undefined) {
                                    layer.msg("颜色不能为空！！", function () {
                                    });
                                    return;
                                }
                                if (selections[0].pkgtype == 1 && (rows[i].bdmxcode == "" || rows[i].bdmxcode == null || rows[i].bdmxcode == undefined)) {
                                    layer.msg("单件上架批次，条码不能为空！！", function () {
                                    });
                                    return;
                                }
                                spbatchdetails.push({
                                    "bdmxcode": rows[i].bdmxcode,
                                    "batchcm": rows[i].batchcm,
                                    "mfsl": rows[i].mfsl,
                                    "batchys": rows[i].batchys
                                });
                            }
                        }
                        if (spbatchdetails.length <= 0) {
                            layer.msg("未发生数据变动！！", function () {
                            });
                            return;
                        }
                        $.ajax({
                            url: pageContext + "/spBatchController/addSpbatchdeatilList/" + selections[0].id,
                            data: JSON.stringify(spbatchdetails),
                            contentType: 'application/json;charset=utf-8',
                            dataType: "json",
                            async: true,
                            type: "POST",   //请求方式
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    layer.close(index);
                                }
                            }, error: function () {
                            }
                        });
                    }, btn2: function (index) {
                        layer.close(index);  //关闭弹窗
                    }
                });
            } else {
                alert(data.msg);
            }
        }, error: function () {
        }
    });
}

function getSpbatchdetails() {
    return spbatchdetails;
}

/**
 * @Description关联款号
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-07-21 17:43
 **/
var batchinfo;

function relationSpxx() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选择一条要关联款号的批次！！", function () {
        });
        return;
    }
    batchinfo = rows[0];
    layer.open({
        type: 2,
        title: rows[0].batchcode + '关联款号',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['100%', '100%'], // 宽高
        content: "batch-spxx-relation",
        btn: ['关联完成', '关闭'], // 可以无限个按钮
        yes: function (index, layero) {
            layer.confirm("确定批次：" + rows[0].batchcode + "关联款号完成？", {
                btn: ['确定', '取消']
            }, function (index2) {
                $.ajax({
                    url: pageContext + "/spBatchController/batchRelationSpxxConfirm/" + rows[0].id,
                    type: "post",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            layer.close(index2);
                            search();
                            layer.close(index);
                        }
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
        }, btn2: function (index) {
            layer.close(index);  //关闭弹窗
        }
    });
}

function getBatchInfo() {
    return batchinfo;
}

/**
 * @Description批次分箱
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-07-23 12:25
 **/
function batchfxed(row) {
    layer.open({
        type: 2,
        title: row.batchcode + '分箱',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['100%', '100%'], // 宽高
        content: "batch-fxed?batchid=" + row.id,
        btn: ['确认分箱', '关闭'], // 可以无限个按钮
        yes: function (index, layero) {
            var postData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(postData);
            var pkgtype = postData["pkgtype"];
            var pkgstr = pkgtype == 0 ? '打包' : '单件';
            var spbatchdetails = postData["spbatchdetails"];
            for (var i in spbatchdetails) {
                if (spbatchdetails[i].batchid == null || spbatchdetails[i].batchid == undefined || spbatchdetails[i].batchid == "") {
                    layer.msg("batchid不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].batchcm == null || spbatchdetails[i].batchcm == undefined || spbatchdetails[i].batchcm == "") {
                    layer.msg("batchcm不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].batchys == null || spbatchdetails[i].batchys == undefined || spbatchdetails[i].batchys == "") {
                    layer.msg("batchys不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].mfsl == null || spbatchdetails[i].mfsl == undefined || spbatchdetails[i].mfsl == "") {
                    layer.msg("mfsl不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].fxfs == null || spbatchdetails[i].fxfs == undefined || spbatchdetails[i].fxfs == "") {
                    layer.msg("fxfs不能为空！！", function () {
                    });
                    return;
                }
                if (pkgtype == 1) {
                    if (spbatchdetails[i].mxid == null || spbatchdetails[i].mxid == undefined || spbatchdetails[i].mxid == "") {
                        layer.msg("mxid不能为空！！", function () {
                        });
                        return;
                    }
                    if (spbatchdetails[i].bdmxcode == null || spbatchdetails[i].bdmxcode == undefined || spbatchdetails[i].bdmxcode == "") {
                        layer.msg("bdmxcode不能为空！！", function () {
                        });
                        return;
                    }
                }
                for (var j in spbatchdetails) {
                    if (i == j) continue;
                    if (spbatchdetails[i].batchcm == spbatchdetails[j].batchcm && spbatchdetails[i].batchys == spbatchdetails[j].batchys) {
                        layer.msg("尺码：" + spbatchdetails[i].batchcm + "，颜色：" + spbatchdetails[i].batchys + "存有重复的！！", function () {
                        });
                        return;
                    }
                }
            }
            layer.confirm("确定标识批次：" + row.batchcode + "为" + pkgstr + "，并添加发布数据？", {
                btn: ['确定', '取消']
            }, function (index2) {
                $.ajax({
                    url: pageContext + "/spBatchController/batchFxedOptConfirm/" + row.id + "/" + pkgtype,
                    type: "post",
                    data: JSON.stringify(spbatchdetails),
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            layer.close(index2);
                            search();
                            layer.close(index);
                        }
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
        }, btn2: function (index) {
            layer.close(index);  //关闭弹窗
        }
    });
}

/**
 * @Description批次分箱修改
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-07-25 10:28
 **/
function batchfxedUpd(row) {
    if (row.imports) {
        layer.msg("批次：" + row.batchcode + "，已经导入到小程序！！", function () {
        });
        return;
    }
    if (row.batchfbtime != null && row.batchfbtime != "" && row.batchfbtime != undefined) {
        layer.msg("批次：" + row.batchcode + "，已经在小程序发布，不能对起分箱信息进行补充操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: row.batchcode + '分箱补充界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['100%', '100%'], // 宽高
        content: "batch-fxed-upd?batchid=" + row.id + "&pkgtype=" + row.pkgtype,
        btn: ['确认分箱', '关闭'], // 可以无限个按钮
        yes: function (index, layero) {
            var postData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(postData);
            var spbatchdetails = postData["spbatchdetails"];
            var pkgtype = postData["pkgtype"];
            for (var i in spbatchdetails) {
                if (spbatchdetails[i].batchid == null || spbatchdetails[i].batchid == undefined || spbatchdetails[i].batchid == "") {
                    layer.msg("batchid不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].batchcm == null || spbatchdetails[i].batchcm == undefined || spbatchdetails[i].batchcm == "") {
                    layer.msg("batchcm不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].batchys == null || spbatchdetails[i].batchys == undefined || spbatchdetails[i].batchys == "") {
                    layer.msg("batchys不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].mfsl == null || spbatchdetails[i].mfsl == undefined || spbatchdetails[i].mfsl == "") {
                    layer.msg("mfsl不能为空！！", function () {
                    });
                    return;
                }
                if (spbatchdetails[i].fxfs == null || spbatchdetails[i].fxfs == undefined || spbatchdetails[i].fxfs == "") {
                    layer.msg("fxfs不能为空！！", function () {
                    });
                    return;
                }
                if (pkgtype == 1) {
                    if (spbatchdetails[i].mxid == null || spbatchdetails[i].mxid == undefined || spbatchdetails[i].mxid == "") {
                        layer.msg("mxid不能为空！！", function () {
                        });
                        return;
                    }
                    if (spbatchdetails[i].bdmxcode == null || spbatchdetails[i].bdmxcode == undefined || spbatchdetails[i].bdmxcode == "") {
                        layer.msg("bdmxcode不能为空！！", function () {
                        });
                        return;
                    }
                }
                for (var j in spbatchdetails) {
                    if (i == j) continue;
                    if (spbatchdetails[i].batchcm == spbatchdetails[j].batchcm && spbatchdetails[i].batchys == spbatchdetails[j].batchys) {
                        layer.msg("尺码：" + spbatchdetails[i].batchcm + "，颜色：" + spbatchdetails[i].batchys + "存有重复的！！", function () {
                        });
                        return;
                    }
                }
            }
            layer.confirm("确定对批次：" + row.batchcode + "进行分箱补充操作？", {
                btn: ['确定', '取消']
            }, function (index2) {
                $.ajax({
                    url: pageContext + "/spBatchController/updateSpBatchFxedInfo/" + row.id + "/" + pkgtype,
                    type: "post",
                    data: JSON.stringify(spbatchdetails),
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            layer.close(index2);
                            search();
                            layer.close(index);
                        }
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
        }, btn2: function (index) {
            layer.close(index);  //关闭弹窗
        }
    });
}

function fxedopt() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选择一条进行分箱操作的批次！！", function () {
        });
        return;
    }
    if (rows[0].fxed) {//表示已经分箱，进入分箱补充界面
        batchfxedUpd(rows[0]);
    } else {//表示尚未分箱，进入分箱界面
        batchfxed(rows[0]);
    }
}

function printBatchFxedGcd() {
    var rows = $('#dhtable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一个批次进行分箱工程单打印操作", function () {
        });
        return false
    }
    if (!rows[0].fxed) {
        layer.msg("此批次尚未进行分箱操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].batchcode + '打印分箱工程单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['100%', '100%'],
        btn: ['关闭'], //可以无限个按钮
        content: pageContext + "/spBatchController/printBatchFxedReport/" + rows[0].id,
        yes: function (index, layero) {
            layer.close(index);
        }, error: function (index) {
            layer.close(index);
        }
    });
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#dhtable").bootstrapTable('refresh', queryParams);
        }
    });
});

function exportSpBatchInfo() {
    var batchcode = $("#batchcode").val();
    var batchname = $("#batchname").val();
    var status = $("#status").val();
    var baudied = $("#baudied").val();
    var time = $("#createtimeStr").val();
    var batchfbstr = $("#batchfbstr").val();
    var imports = $("#imports").val();
    var batchlx = $("#batchlx").val();
    var pkgtype = $("#pkgtype").val();
    var fblx = $("#fblx").val();
    var replenish = $("#replenish").val();
    window.location.href = pageContext + "/reportController/exportBatchInfoExcel"
        + "?batchcode=" + batchcode
        + "&batchname=" + batchname
        + "&status=" + status
        + "&baudied=" + baudied
        + "&createtimeStr=" + time
        + "&batchfbstr=" + batchfbstr
        + "&imports=" + imports
        + "&batchlx=" + batchlx
        + "&pkgtype=" + pkgtype
        + "&fblx=" + fblx
        + "&replenish=" + replenish;
}

function exportSpmxkwInfo() {
    var batchcode = $("#batchcode").val();
    var batchname = $("#batchname").val();
    var status = $("#status").val();
    var baudied = $("#baudied").val();
    var time = $("#createtimeStr").val();
    var batchfbstr = $("#batchfbstr").val();
    var imports = $("#imports").val();
    var batchlx = $("#batchlx").val();
    var pkgtype = $("#pkgtype").val();
    var fblx = $("#fblx").val();
    var replenish = $("#replenish").val();
    window.location.href = pageContext + "/reportController/exportSpmxkwInfo"
        + "?batchcode=" + batchcode
        + "&batchname=" + batchname
        + "&status=" + status
        + "&baudied=" + baudied
        + "&createtimeStr=" + time
        + "&batchfbstr=" + batchfbstr
        + "&imports=" + imports
        + "&batchlx=" + batchlx
        + "&pkgtype=" + pkgtype
        + "&fblx=" + fblx
        + "&replenish=" + replenish;
}
function exportBatchNotPrePareInfoAndStockInfo() {
    var batchcode = $("#batchcode").val();
    var batchname = $("#batchname").val();
    var status = $("#status").val();
    var baudied = $("#baudied").val();
    var time = $("#createtimeStr").val();
    var batchfbstr = $("#batchfbstr").val();
    var imports = $("#imports").val();
    var batchlx = $("#batchlx").val();
    var pkgtype = $("#pkgtype").val();
    var fblx = $("#fblx").val();
    var replenish = $("#replenish").val();
    var productionok = $("#productionok").val();
    var productshok = $("#productshok").val();
    window.location.href = pageContext + "/spBatchController/exportBatchNotPrePareInfoAndStockInfo"
        + "?batchcode=" + batchcode
        + "&batchname=" + batchname
        + "&status=" + status
        + "&baudied=" + baudied
        + "&createtimeStr=" + time
        + "&batchfbstr=" + batchfbstr
        + "&imports=" + imports
        + "&batchlx=" + batchlx
        + "&pkgtype=" + pkgtype
        + "&fblx=" + fblx
        + "&productionok=" + productionok
        + "&productshok=" + productshok
        + "&replenish=" + replenish;
}

function exportProductStockInfoByLb() {
    window.location.href = pageContext + "/productLbController/exportProductStockInfoByLb";
}

function importBatchInfo() {
    layer.open({
        type: 1,
        title: '导入批次信息',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["导入", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">辅料编码：</td><td  class="pb-10"><input id="importbatchcode" type="text" class="form-control"></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var batchcode = $("#importbatchcode").val();
            if (batchcode == '') {
                layer.msg("辅料编码不能为空!!", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/spBatchController/importBatchInfoByBarCode/" + batchcode,
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if (data.success) {
                        search();
                        layer.close(index);
                    } else {
                        layer.alert(data.msg);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}