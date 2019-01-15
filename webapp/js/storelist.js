$(function () {
    var oTable = new TableInit();
    oTable.Init();
    $('#status').combobox();
    $('#mdlx').combobox();
});
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#storetable").bootstrapTable('refresh', queryParams);
        }
    });
});

var TableInit = function () {
    loadStore();
    var oTableInit = new Object();
    oTableInit.Init = function () {
        $('#storetable').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: true,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/storeController/selectStorePageInfo", //请求后台的url
            singleSelect: true, //仅允许单选
            clickToSelect: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true, //是否显示刷新按钮
            pagination: true,  //是否显示分页（*）
            detailView: false,
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                        //每页的记录行数（*）
            pageList: [10, 20, 50, 100],         //可供选择的每页的行数（*）
            idField: "id",
            exportDataType: 'all',
            columns: [
                {
                    checkbox: true
                },
                //动态创建列名
                {
                    field: 'mdmc',
                    title: '店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdcode',
                    title: '店号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "未开业";
                        if (value == '1')
                            return "营业中";
                        if (value == '4')
                            return "已停业";
                        if (value == '9')
                            return "已结业";
                        return "错误";
                    }
                }, {
                    field: 'mdlx',
                    title: '门店类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "加盟店";
                        if (value == '3')
                            return "直营店";
                        return "错误";
                    }
                }, {
                    field: 'salelx',
                    title: '销售类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "正常";
                        if (value == '1')
                            return "星级";
                        if (value == '2')
                            return "五折";
                        return "错误";
                    }
                }, {
                    field: 'wholerate',
                    title: '批发折扣',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'dz',
                    title: '店长',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'shdz',
                    title: '门店地址',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'lxdh',
                    title: '门店联系电话',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gdy',
                    title: '跟单员',
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


    //执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true
    });

    return oTableInit;
};

var table = null;

function queryParams(params) {
    var storeid = $("#storeid").val();
    var mdlx = $("#mdlx").val();
    var status = $("#status").val();
    var dz = $("#dz").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        storeid: storeid,
        mdlx: mdlx,
        status: status,
        dz: dz
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


//搜索功能
function search() {
    $("#storetable").bootstrapTable('refresh', queryParams);
}


// 加载门店
function loadStore() {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
}

//绑定品牌商
function bindTradeinfo() {
    var rows = $('#storetable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("品牌商绑定操作只能单条操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: '品牌商绑定界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['300px', '350px'],
        content: "storelist-bindtrade?tradeid=" + rows[0].tradeid,
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            if (posData == undefined || posData == null || posData == "") {
                layer.confirm('确定要解除该门店与品牌商的关联吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index2) {
                    layer.close(index2);
                    $.ajax({
                        url: pageContext + "/tradeinfoController/bindTradeinfoByStoreid/" + rows[0].id + "/" + posData,
                        type: "post",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (data) {
                            layer.msg(data.msg);
                            if (data.success) {
                                layer.close(index);
                            }
                        }
                    });
                }, function (index2) {
                    layer.close(index2);
                });
            } else {
                $.ajax({
                    url: pageContext + "/tradeinfoController/bindTradeinfoByStoreid/" + rows[0].id + "/" + posData,
                    type: "post",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        layer.msg(data.msg);
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
 * @Description新增门店
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-05-25 11:16
 **/
function addStore() {
    layer.open({
        type: 2,
        title: '新增门店-填写信息',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        content: "store-opt",
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(posData);
            if (posData["mdcode"] == "" || posData["mdcode"] == undefined || posData["mdcode"] == null) {
                layer.msg("店号不能为空！！", function () {
                });
                return;
            }
            if (posData["mdmc"] == "" || posData["mdmc"] == undefined || posData["mdmc"] == null) {
                layer.msg("店名不能为空！！", function () {
                });
                return;
            }
            if (posData["mdlx"] == "" || posData["mdlx"] == undefined || posData["mdlx"] == null) {
                layer.msg("门店类型不能为空！！", function () {
                });
                return;
            }
            if (posData["tradeid"] == "" || posData["tradeid"] == undefined || posData["tradeid"] == null) {
                layer.msg("品牌商不能为空！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/storeController/addStore",
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
    });
}

function updateStoreInfo() {
    var rows = $('#storetable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("修改门店信息只能单条操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: '修改门店信息',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        content: "store-opt?storeid=" + rows[0].id,
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            posData["id"] = rows[0].id;
            $.ajax({
                url: pageContext + "/storeController/updateStoreInfoBySelective",
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
    });
}
function getSelectionStore() {
    return selectionStore;
}
var selectionStore;
//标识门店信息
function updateStoreCrux() {
    var rows = $('#storetable').bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选择一个门店进行状态标识！", function () {});
        return;
    }
    selectionStore = rows[0];
    layer.open({
        type: 2,
        title: '门店标识信息修改界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['400px', '550px'],
        content: "store-crux-upd",
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            $.ajax({
                url: pageContext + "/storeController/updateStoreCrux/" + rows[0].id,
                contentType: 'application/json;charset=utf-8',
                type: "POST",
                dataType: "json",
                async: true,
                data:JSON.stringify(posData),
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        search();
                    }
                }
            });
        }
    });
}