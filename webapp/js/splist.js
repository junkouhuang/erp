//初始化bootstrap Table
$(function () {
    $('#goodsType').combobox();
    $('#spStatus').combobox();
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
});
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#sptable").bootstrapTable('refresh', queryParams);
        }
    });
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#sptable').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: true,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/spManageController/getAllSpInfo", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            clickToSelect: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true, //是否显示刷新按钮
            pagination: true,  //是否显示分页（*）
            detailFormatter: detailMenu,
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                        //每页的记录行数（*）
            pageList: [10, 20, 50, 100],         //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            detailView: true, 					//是否显示详情折叠(父子表)
            exportDataType: 'all',
            onExpandRow: onExpandRow,
            rowStyle: function (row, index) {
                console.log(row.status);
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "2") {
                    strclass = 'btn-danger';
                }
                return {classes: strclass}
            },
            columns: [
                {
                    checkbox: true
                },
                //动态创建列名
                {
                    field: 'id',
                    title: '商品id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spcode',
                    title: '商品编码',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'spmc',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cgOrderCode',
                    title: '采购单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cgitemno',
                    title: '采购编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'historyitemno',
                    title: '历史采购编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tradename',
                    title: '品牌商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            str = '未关联批次';
                        } else if (value == 1){
                            str = '关联批次';
                        } else if (value == 2){
                            str = '禁用';
                        }
                        return str;
                    }
                }, {
                    field: 'productionTotal',
                    title: '有入库',
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
                    field: 'hasimage',
                    title: '图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == true) {
                            return "<a id=" + row.id + " onclick='openBrowseWindow(this)'>图片浏览</a>";
                        } else {
                            return "没有图片";
                        }
                    }
                }, {
                    field: 'spreturn',
                    title: '是否可退',
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
                    field: 'brand',
                    title: '品牌',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'dw',
                    title: '单位',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'price',
                    title: '吊牌价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'rate',
                    title: '批发折扣',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sellprice',
                    title: '零售价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sellrate',
                    title: '零售折扣',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'lbmc',
                    title: '商品类别',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '建立时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'goodtype',
                    title: '商品类型',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'itemno',
                    title: '条目号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fjdanhao',
                    title: '分拣单号',
                    align: 'center',
                    valign: 'middle'
                }]
        });
        $('#sptable').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
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

function onExpandRow(index, row, $Subdetail) {
    InitSubTable(index, row, $Subdetail);
}

// 子表格
InitSubTable = function (index, row, $detail) {
    var spid = row.id;
    var cur_table = $detail.html('<table id="cur_table" style="color:#7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: "get", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/spManageController/getSpOtherInfo",
        singleSelect: true, //仅允许单选
        dataType: "json",
        pagination: false,    // 显示页码等信息
        responseHandler: responseHandler,
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 10,           // 当前分页值
        pageList: [10, 20],  // 分页选页
        queryParams: queryDetailView(spid),//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        columns: [
            {
                field: 'mxcode',
                title: '明细编码'
            }, {
                field: 'ys',
                title: '颜色'
            }, {
                field: 'cm',
                title: '尺码'
            }, {
                field: 'batchcode',
                title: '批次号'
            }, {
                field: 'batchname',
                title: '批次名称'
            }, {
                field: 'createtime',
                title: '批次创建时间'
            }
        ], onClickRow: function (row, $element) {
            rowid = row.id;
        },
        onCheck: function (row) {
            rowid = row.id;
        }
    });
};
var table = null;

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
        "spID": params
    };
    return temp;
}

function queryParams(params) {
    var historyitemno = $("#historyitemno").val();
    getTime();
    goodtype = $("#goodsType").val();
    status = $("#spStatus").val();
    var cgOrderCode = $("#cgOrderCode").val();
    var cgitemno = $("#cgitemno").val();
    var itemno = $("#itemno").val();
    var minPrice = $("#minPrice").val();
    var maxPrice = $("#maxPrice").val();
    var spmc = $("#spmc").val();
    var spcode = $("#spcode").val();
    var mxcode = $("#mxcode").val();
    var batchcode = $("#batchcode").val();
    var fjdanhao = $("#fjworkcode").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        spmc: spmc,
        spcode: spcode,
        mxcode: mxcode,
        startTime: startTime,
        endTime: endTime,
        goodtype: goodtype,
        status: status,
        historyitemno: historyitemno,
        cgOrderCode: cgOrderCode,
        cgitemno: cgitemno,
        itemno: itemno,
        minPrice: minPrice,
        maxPrice: maxPrice,
        batchcode:batchcode,
        fjdanhao:fjdanhao
    };
    return temp;
}

//得到查询的参数
function rspHandler(res) {
    if (res) {

        // 循环确认每个商品的类型
        $.each(res.list, function (index, item) {
            item.goodtype = confirmSpType(item.goodtype);
        });
   /*     // 循环确认每个商品的状态
        $.each(res.list, function (index, item) {
            item.status = confirmSpStatus(item.status);
        });
*/
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

var searchCondition;
var startTime;
var endTime;
var goodtype;
var status;

// 搜索功能
function querySearch() {
    // 获取输入的值
    searchCondition = $("#condition").val();
    getTime();
    // 刷新表格
    $("#sptable").bootstrapTable('refreshOptions', {pageNumber: 1});
    $("#sptable").bootstrapTable('refresh', queryParams);

}


// 切换商品类型
function switchGoodsType() {
    // 获取value值
    goodtype = $("#goodsType").val();
    // 刷新表格
    $("#sptable").bootstrapTable('refreshOptions', {pageNumber: 1});
    $("#sptable").bootstrapTable('refresh', queryParams);
}


// 切换状态
function switchStatus() {
    // 获取value值
    status = $("#spStatus").val();
    // 刷新表格
    $("#sptable").bootstrapTable('refreshOptions', {pageNumber: 1});
    $("#sptable").bootstrapTable('refresh', queryParams);
}


// 离开输入框时判断是否为空，为空清空searchCondition
$("#condition").blur(function () {
    // 获取输入的值
    searchCondition = $("#condition").val();
    if (searchCondition == null || searchCondition == "" || searchCondition == undefined) {
        $("#condition").val("");
    }
});
$("#time").blur(function () {
    getTime();
    if ((startTime == null || startTime == "" || startTime == undefined)
        && (endTime == null || endTime == "" || endTime == undefined )) {
        startTime = null;
        endTime = null;
    }
});


// 详细菜单
function detailMenu(index, row) {
    // 并接cm，ys，mxcode
    var finalValue = createMenu(row);
    return finalValue;
}


// 并接cm，ys，mxcode的函数
function createMenu(row) {
    var content = "<table class='table'><thead><tr>" +
        "<th>明细编号尺码</th>" +
        "<th>颜色</th>" +
        "<th>尺码</th></tr></thead>" +
        "<tbody>";

    $.each(row.mxList, function (index, item) {
        content += "<tr>" +
            "<td width='100px'>" + item.mxcode + "</td>" +
            "<td width='100px'>" + item.ys + "</td>" +
            "<td width='100px'>" + item.cm + "</td></tr>";
    });
    content += "</tbody></table>";
    return content;
}


// 获取时间方法
function getTime() {
    var time = $("#time").val();
    if (time == "") {
        startTime = "";
        endTime = "";
    } else {
        var timeArray = time.split(" - ");
        startTime = timeArray[0];
        endTime = timeArray[1];
    }
}


// 确认商品状态
function confirmSpStatus(spStatus) {
    var textStatus;
    $.each(order_status, function (index, item) {
        if (item.status == spStatus) {
            textStatus = item.text;
        }
    });
    return textStatus;
}


// 上传图片
function imageUpload() {
    // 获取当前
    var thisObj = $('#sptable').bootstrapTable("getSelections")[0];
    //判断是否选中批次
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中商品", function () {
        });
        return false
    }

    // 打开窗口
    openImageUploadWindow(thisObj.id);
}


// 打开图片上传窗口
function openImageUploadWindow(spid) {
    layer.open({
        type: 2,
        title: '上传图片',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['894px', '530px'],
        content: 'sp_image_upload?spid=' + spid,
        btn: ['关闭'], //可以无限个按钮
        yes: function (index, layero) {
            layer.close(index);
            $("#sptable").bootstrapTable('refresh', queryParams);
        }
    });
}


// 打开浏览图片窗口
function openBrowseWindow(thisObj) {
    var spID = $(thisObj).attr("id");
    layer.open({
        type: 2,
        title: '查看图片',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '280px'],
        content: 'sp_image_browse?spID=' + spID
    });
}


// 确认商品类型
function confirmSpType(sptype) {
    var textStatus;
    $.each(order_type, function (index, item) {
        if (item.status == sptype) {
            textStatus = item.text;
        }
    });
    return textStatus;
}


// 判断是否选中当前表格
function isSelected(thisObj) {
    var isSelect = false;
    if (thisObj != null && thisObj != '') {
        isSelect = true;
    }
    return isSelect;

}


// 查看商品批次
var checkBatch = function () {
    // 获取当前
    var thisObj = $('#sptable').bootstrapTable("getSelections")[0];
    //判断是否选中批次
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中商品", function () {
        });
        return false
    }

    // 打开窗口
    batchBrowse(thisObj.id);
}


var batchBrowse = function (id) {
    layer.open({
        type: 2,
        title: '批次浏览',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['640px', '280px'],
        content: 'sp_batch_browse?spID=' + id
    });
}


// 入库
var stockIn = function () {
    // 获取当前
    var thisObj = $('#sptable').bootstrapTable("getSelections")[0];
    // 判断是否选中批次
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中商品", function () {
        });
        return false
    }

    // 打开商品入库窗口
    layer.open({
        type: 2,
        title: '商品入库',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '610px'],
        content: "spStockIn?spid=" + thisObj.id
    });
}

function openBatchList(param) {
    // 判断是否已经打开
    var isOpen = $("body", parent.document).find(".page-tabs-content").find("a[data-id='batchlist']").length;
    if (isOpen != 0) {
        /*var src = $("body", parent.document).find("iframe[data-id='batchlist']").attr("src");
        var sub1 = src.substring(src.indexOf("param="));
        var useParam = sub1.substring(sub1.indexOf("=") + 1)*/

        // 删除原来的
        $("body", parent.document).find('.J_mainContent').find("iframe[data-id='batchlist']").remove();
        $("body", parent.document).find('.J_menuTabs .page-tabs-content').find("a[data-id='batchlist']").remove();

        // 添加新的
        var str =
            '<a href="javascript:;" class="J_menuTab active" data-id="batchlist">批次列表<i class="fa fa-times-circle"></i></a>';
        $("body", parent.document).find('.J_menuTab').removeClass('active');
        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframe0" ' +
            'width="100%" height="100%" ' +
            'src=' + pageContext + '/batchlist?execute=executeSearch&param=' + param + ' frameborder="0" data-id="batchlist" seamless></iframe>';
        $("body", parent.document).find('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
        $("body", parent.document).find('.J_menuTabs .page-tabs-content').append(str);
        return false;
    }
    var str =
        '<a href="javascript:;" class="J_menuTab active" data-id="batchlist">批次列表<i class="fa fa-times-circle"></i></a>';
    $("body", parent.document).find('.J_menuTab').removeClass('active');
    // 添加选项卡对应的iframe
    var str1 = '<iframe class="J_iframe" name="iframe0" ' +
        'width="100%" height="100%" ' +
        'src=' + pageContext + '/batchlist?execute=executeSearch&param=' + param + ' frameborder="0" data-id="batchlist" seamless></iframe>';
    $("body", parent.document).find('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
    $("body", parent.document).find('.J_menuTabs .page-tabs-content').append(str);
    //scrollToTab($('.J_menuTab.active'));

}

// 商品部入库操作
function spbStorageOpt() {
    // 获取当前
    var thisObj = $('#sptable').bootstrapTable("getSelections")[0];
    // 判断是否选中批次
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中商品", function () {
        });
        return false
    }

    // 打开商品部入库操作窗口
    layer.open({
        type: 2,
        title: "商品部入库界面",
        shade: [0.8, '#393D49'], // 遮罩层
        maxmin: true, // 开启最大化最小化按钮
        area: ['700px', '450px'],// 显示弹出框的宽高
        content: 'splist-spbstorage?spid=' + thisObj.id,
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.postData();
            console.log(posData);
            var storageData = posData["storageData"];
            for (i in storageData) {
                if (storageData[i].id == null || storageData[i].id == undefined || storageData[i].id == '') {
                    layer.msg("请重新加载!!", function () {
                    });
                    return;
                } else if (storageData[i].stock == null || storageData[i].stock == undefined || storageData[i].stock == '') {
                    layer.msg("待入库数量不能为空!!", function () {
                    });
                    return;
                } else if (storageData[i].kw == null || storageData[i].kw == undefined || storageData[i].kw == '') {
                    layer.msg("入库库位不能为空!!", function () {
                    });
                    return;
                }
            }
            $.ajax({
                url: pageContext + "/spxxController/spbStorageOpt",
                data: JSON.stringify(posData),
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                    }
                }
            });
        },
        cancel: function (index) {
            //取消按钮，关闭当前窗体
            layer.close(index);
        }
    });
}

var selectionspxx;

/**
 * @Description生产入库操作
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-06-11 11:58
 **/
function productionStorage() {
    var rows = $('#sptable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一款商品进行生产入库操作！！", function () {
        });
        return false
    }
    selectionspxx = rows[0];
    layer.open({
        type: 2,
        title: '生产入库界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: 'productionStorage',
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var fjdanhao = posData.fjdanhao;
            var whsid = posData["whsid"];
            var splx = posData["splx"];
            var tradeid = posData["tradeid"];
            var issj = posData["issj"];
            var mxlist = posData["mxlist"];
            var kpiList = posData["kpiList"];
            if (whsid == "" || whsid == undefined || whsid == null) {
                layer.msg("请选择仓库！！", function () {
                });
                return;
            }
            if (tradeid == "" || tradeid == undefined || tradeid == null) {
                layer.msg("请选择品牌商！！", function () {
                });
                return;
            }
            if (splx == "" || splx == undefined || splx == null) {
                layer.msg("请选择货品类型！！", function () {
                });
                return;
            }
            if (splx == 0 && (fjdanhao == "" || fjdanhao == null || fjdanhao == undefined)) {
                layer.msg("分拣单号不能为空！！", function () {
                });
                return;
            }
            if (mxlist.length < 1) {
                layer.msg("请填写生产入库实数！！", function () {
                });
                return;
            }
            var total = 0;
            for (var i in mxlist) {
                total += parseInt(mxlist[i].gpsl);
            }
            var kpiTotal = 0;
            for (var i in kpiList) {
                kpiTotal += parseInt(kpiList[i].gpsl);
            }
            if (total != kpiTotal) {
                layer.msg("生产入库总数和员工KPI数量不一致！！", function () {
                });
                return;
            }
            if (issj) {
                layer.confirm('确定在生产入库的同时进行上架操作？', {
                    btn: ["确定", "取消"]
                    , yes: function (index2) {
                        $.ajax({
                            url: pageContext + "/spxxController/productionStorage/" + rows[0].id,
                            contentType: 'application/json;charset=utf-8',
                            type: "POST",
                            dataType: "json",
                            async: true,
                            data: JSON.stringify(posData),
                            success: function (data) {
                                layer.alert(data.msg);
                                if (data.success) {
                                    querySearch();
                                    layer.close(index2);
                                    layer.close(index);
                                }
                            }
                        });
                    }, btn2: function (index) {
                        layer.close(index);
                    }
                });
            } else {
                $.ajax({
                    url: pageContext + "/spxxController/productionStorage/" + rows[0].id,
                    contentType: 'application/json;charset=utf-8',
                    type: "POST",
                    dataType: "json",
                    async: true,
                    data: JSON.stringify(posData),
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            querySearch();
                            layer.close(index);
                        }
                    }
                });
            }
        }, btn2: function (index) {
            layer.close(index);
        }

    });
}

function getSelectionSpxx() {
    return selectionspxx;
}

function updateSpxx() {
    var rows = $('#sptable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选中一款商品进行信息修改操作！！", function () {
        });
        return false
    }
    layer.open({
        type: 2,
        title: '商品信息修改界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: 'spxx-update?spid=' + rows[0].id,
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var mxlist = posData["mxlist"];
            if (mxlist.length == 0) {
                layer.msg("明细信息不能为空！！", function () {
                });
                return;
            }
            for (var i = 0; i < mxlist.length; i++) {
                if (mxlist[i].ysid == '' || mxlist[i].ysid == null || mxlist[i].ysid == undefined) {
                    layer.msg("明细-颜色序号不能为空！！", function () {
                    });
                    return;
                } else if (mxlist[i].ys == '' || mxlist[i].ys == null || mxlist[i].ys == undefined) {
                    layer.msg("明细-颜色不能为空！！", function () {
                    });
                    return;
                }
                for (var j = 0; i < mxlist.length; i++) {
                    if (i != j) {
                        if (mxlist[j].ysid == mxlist[i].ysid && mxlist[j].cm == mxlist[i].cm) {
                            layer.msg("明细：" + "颜色序号：" + mxlist[i].ysid + "+尺码：" + mxlist[i].cm + "有重复的！", function () {
                            });
                            return;
                        }
                    }
                }
            }
            if (posData.itemno == '' || posData.itemno == undefined) {
                layer.msg("自编码不能为空！！", function () {
                });
                return;
            } else if (posData.lbid == '' || posData.lbid == undefined) {
                layer.msg("商品类别不能为空！！", function () {
                });
                return;
            } else if (posData.lbmc == '' || posData.lbmc == undefined) {
                layer.msg("商品类别不能为空！！", function () {
                });
                return;
            } else if (posData.spcode == '' || posData.spcode == undefined) {
                layer.msg("商品编码不能为空！！", function () {
                });
                return;
            } else if (posData.dw == '' || posData.dw == undefined) {
                layer.msg("单位不能为空！！", function () {
                });
                return;
            } else if (posData.spmc == '' || posData.spmc == undefined) {
                layer.msg("商品名称不能为空！！", function () {
                });
                return;
            } else if (posData.brand == '' || posData.brand == undefined) {
                layer.msg("品牌不能为空！！", function () {
                });
                return;
            } else if (posData.price == '' || posData.price == undefined) {
                layer.msg("吊牌价格不能为空！！", function () {
                });
                return;
            } else if (posData.sellprice == '' || posData.sellprice == undefined) {
                layer.msg("零售价格不能为空！！", function () {
                });
                return;
            } else if (posData.sellrate == '' || posData.sellrate == undefined) {
                layer.msg("零售折扣不能为空！！", function () {
                });
                return;
            } else if (posData.rate == '' || posData.rate == undefined) {
                layer.msg("批发折扣不能为空！！", function () {
                });
                return;
            } else if (posData.goodtype == '' || posData.goodtype == undefined) {
                layer.msg("商品类型不能为空！！", function () {
                });
                return;
            } else if (posData.spxxtradeid == '' || posData.spxxtradeid == undefined) {
                layer.msg("品牌商不能为空！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/spxxController/updateSpxxInfoBySelective/" + rows[0].id,
                data: JSON.stringify(posData),
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                    }
                }
            });
        }, btn2: function (index) {
            layer.close(index);
        }

    });
}


//作废指定商品
function cancelProductById() {
    //获取当前表格
    var selections = $('#sptable').bootstrapTable("getSelections");
    //判断是否选中表格某项
    if(selections.length != 1){
        layer.msg("请选择一条要作废的商品信息");
        return false
    }
    layer.open({
        type: 1,
        title: '作废商品，填写备注',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["确定", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">备注：</td><td  class="pb-10"><input id="bz" type="text" class="form-control"></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var bz = $("#bz").val();
            if(bz == ''){
                layer.msg("备注信息不能为空！",function(){});
                return;
            }
            $.ajax({
                url: pageContext + "/spxxController/cancelProductById/"+selections[0].id,
                data:{"bz":bz},
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if(data.success){
                        querySearch();
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}