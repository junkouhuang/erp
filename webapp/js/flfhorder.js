var flfhid = '';

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
});

$(function () {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value=" + data[i].id + ">" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
    var origin = getQueryString("origin");
    if (origin == 1) {
        var storeid = getQueryString("storeid");
        $(".combobox ").val($("#storeid").find("option[value='" + storeid + "']").text());
        $("#storeid").find("option[value='" + storeid + "']").attr("selected", true);

    }
    $('#status').combobox();
    // 执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true,
        done: function (value, date, endDate) {
            time = value;
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    laydate.render({
        elem: '#fhTime',
        range: true,
        done: function (value, date, endDate) {
            fhTime = value;
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });

    // 1.初始化Table
    table = $('#flfhorder_table').bootstrapTable(
        { // 表格ID
            method: 'POST',
            dataType: 'json',
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            striped: true,// 是否显示行间隔色
            sidePagination: "server",// 分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/flFhorderController/getListPage",
            singleSelect: true, // 仅允许单选
            // search: true,
            showColumns: true,
            showRefresh: true,
            showToggle: false,
            pagination: true,
            queryParamsType: 'undefined',
            clickToSelect: true,
            queryParams: queryParams,
            responseHandler: rspHandler,
            minimumCountColumns: 2,
            pageNumber: 1, // 初始化加载第一页，默认第一页
            pageSize: 10, // 每页的记录行数（*）
            pageList: [10, 20, 50, 100], // 可供选择的每页的行数（*）
            idField: "id",
            // uniqueId: "id", //每一行的唯一标识，一般为主键列
            showExport: true,
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "6") {
                    strclass = 'btn-danger';//还有一个active
                }
                return {classes: strclass}
            },
            exportDataType: 'all',
            columns: [{
                checkbox: true
            },
                // 动态创建列名
                {
                    field: 'id',
                    title: 'ID',
                    align: 'center',
                    valign: 'middle',
                    display: 'hidden',
                    sortable: true
                }, {
                    field: 'flfhcode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'mdcode',
                    title: '门店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'lxdh',
                    title: '联系电话',
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
                            return "<span class=' btn-primary p30'>新增<span>";
                        if (value == '1')
                            return "<span class=' btn-warning p30'>确认<span>";
                        if (value == '2')
                            return "<span class=' btn-primary p30'>配货<span>";
                        if (value == '3')
                            return "<span class=' btn-primary p30'>文件组审核<span>";
                        if (value == '4')
                            return "<span class=' btn-danger p30'>跟单审核<span>";
                        if (value == '5')
                            return "<span class=' btn-primary  p30'>审核<span>";
                        if (value == '6')
                            return "<span class=' btn-danger p30'>发货<span>";
                        if (value == '9')
                            return "<span class=' btn-warning p30'>撤单<span>";
                        return "错误";
                    }
                }, {
                    field: 'shrr',
                    title: '收货人',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'wlgs',
                    title: '物流公司',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'shdz',
                    title: '收货地址',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'wldh',
                    title: '物流单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'jhprint',
                    title: '拣货单打印状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "已打印";
                        return "未打印";
                    }
                }, {
                    field: 'fhprint',
                    title: '发货单打印状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "已打印";
                        return "未打印";
                    }
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'updtime',
                    title: '修改时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'confirmtime',
                    title: '确认时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'whsaudittime',
                    title: '文件组审核时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'phtime',
                    title: '配货时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gdaudittime',
                    title: '跟单审核时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cwaudittime',
                    title: '财务审核时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fhtime',
                    title: '发货时间',
                    align: 'center',
                    valign: 'middle'
                }],
            onClickRow: function (row, $element) {
                flfhid = row.id;
            }, onCheck: function (row) {
            flfhid = row.id;
        }
        });
    $('#flfhorder_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
});
var table = null;

var time = $("#time").val();
var fhTime = $("#fhTime").val();

function queryParams(params) {
    var flfhcode = $("#flfhcode").val();
    var storeid = $("#storeid").val();
    var status = $("#status").val();
    var angle = $("#angle").val();
    var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort, // 排序列名
        sortOrder: params.order, // 排序方式
        time: time,
        fhTime: fhTime,
        flfhcode: flfhcode,
        storeid: storeid,
        status: status,
        angle:angle
    };
    return temp;
}

// 得到查询的参数
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

// 搜索功能
function LoadingDataListOrderRealItems() {
    $("#flfhorder_table").bootstrapTable('refresh', queryParams);
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    $("#flfhcode").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    $("#storeid,#status").change(function () {
        $("#flfhorder_table").bootstrapTable('refresh', queryParams);
    });
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-15 上午10:00:20
 * 模块名称:辅料发货单
 * 操作:新增
 *
 */
function addFlInfo() {
    layer.open({
        type: 2,  //1:DOM标签 2:页面
        title: '新增辅料发货单',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['700px', '450px'],
        content: 'flfhorder-add',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            var postData = $(layero).find("iframe")[0].contentWindow.postData();
            if (postData.storeid == undefined) {
                layer.msg('请选择门店！！', function () {});
            } else if (postData.flfhcode == '') {
                layer.msg('辅料发货单号不能为空！！', function () {});
            } else {
                if (postData.list.length > 0) {
                    for (var i = 0; i < postData.list.length; i++) {
                        if (postData.list[i].number == undefined || postData.list[i].number == '') {
                            layer.msg("请填写辅料数量!!", function () {});
                            return false;
                        }
                    }
                    $.ajax({
                        url: pageContext + "/flFhorderController/addFlFhorder", //接口：保存新增界面的信息
                        type: "post",
                        data: JSON.stringify(postData),
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (data) {
                            alert(data.msg);
                            if (data.success) {
                                LoadingDataListOrderRealItems();
                                layer.close(index);
                            }
                        }, error: function () {
                            layer.alert("请求失败！！");
                        }
                    });
                } else {
                    layer.msg("请添加一行记录信息！", function () {
                    });
                }
            }
        },
        btn2: function (index) {
            layer.close(index);  //关闭弹窗
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-15 下午4:46:51
 * 模块名称:辅料发货单
 * 操作:修改
 *
 */

function updFlInfo() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status == 0) {
            layer.open({
                type: 2,
                title: '修改辅料单',
                shade: [0.8, '#393D49'],
                maxmin: true, // 开启最大化最小化按钮
                area: ['700px', '450px'],
                content: 'flfhorder-upd?flfhid=' + flfhid,
                btn: ["确定", "取消"],
                yes: function (index, layero) {
                    var postData = $(layero).find("iframe")[0].contentWindow.postData();
                    if (postData.mdmc == undefined || postData.mdmc == '') {
                        layer.msg('请选择门店！！', function () {
                        });
                    } else if (postData.flfhcode == '') {
                        layer.msg('辅料发货单号不能为空！！', function () {
                        });
                    } else {
                        if (postData.list.length > 0) {
                            for (var i = 0; i < postData.list.length; i++) {
                                if (postData.list[i].number == undefined || postData.list[i].number == '') {
                                    layer.msg("请填写辅料数量!!", function () {
                                    });
                                    return false;
                                }
                            }
                            $.ajax({
                                url: pageContext + "/flFhorderController/updateFlfhorder",
                                type: "post",
                                data: JSON.stringify(postData),
                                contentType: 'application/json;charset=UTF-8',
                                dataType: "json",
                                async: false,
                                cache: false,
                                success: function (data) {
                                    alert(data.msg);
                                    if (data.success) {
                                        LoadingDataListOrderRealItems();
                                        layer.close(index);
                                    }
                                }, error: function () {
                                    alert("请求失败！！");
                                }
                            });
                        } else {
                            layer.msg("请添加一行记录信息！", function () {
                            });
                        }
                    }
                },
                btn2: function (index) {
                    layer.close(index);  //关闭弹窗
                }
            });
        } else {
            layer.msg("该辅料发货单已不属于新增状态，不能修改！！", function () {
            });
        }
    } else {
        layer.msg("请选择需要修改的辅料发货单！！", function () {
        });
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-21 上午10:35:35
 * 模块名称:辅料发货单
 * 操作:打印
 *
 */

function printFlfhorder() {
    var rows = $('#flfhorder_table').bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status < 4) {
            layer.msg("只有财务审核后才能打印辅料发货单！！", function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '辅料发货单打印预览页面',
            shade: [0.8, '#393D49'],
            maxmin: true, // 开启最大化最小化按钮
            area: ['100%', '100%'],
            content: pageContext + '/flFhorderController/printFlfhorder?id=' + flfhid
        });
    } else {
        layer.msg('请选择需要打印预览的辅料发货单！！', function () {
        });
    }
}

/**
 * 财务打印
 * @author 肖亮亮
 * @date 2017-12-06 14:29
 * @param  * @param null
 * @return
 **/
function cwprintFlfhorder() {
    var rows = $('#flfhorder_table').bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].fhprint != 1) {
            layer.msg("辅料发货单还未打印，不能进行财务打印操作！！");
            return;
        }
        layer.open({
            type: 2,
            title: '辅料发货单打印预览页面',
            shade: [0.8, '#393D49'],
            maxmin: true, // 开启最大化最小化按钮
            area: ['100%', '100%'],
            content: pageContext + '/flFhorderController/cwprintFlfhorder?id=' + flfhid
        });
    } else {
        layer.msg('请选择需要打印预览的辅料发货单！！', function () {
        });
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-21 上午10:36:10
 * 模块名称:辅料发货单
 * 操作:确认
 *
 */

function flfhorderConfirm() {
    var rows = $('#flfhorder_table').bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status != 0) {
            layer.msg("只有处于新增状态的辅料发货单才能进行确认操作！！", function () {
            });
            return;
        }
        layer.confirm('确定要确认该辅料发货单吗？',
            {btn: ['确认', '取消']},
            function (index) {
                $.ajax({
                    url: pageContext + "/flFhorderController/confirmFlfhorder?id=" + flfhid,
                    dataType: "json",
                    async: true,
                    type: "POST", // 请求方式
                    success: function (data) {
                        alert(data.msg);
                        if (data.success) {
                            LoadingDataListOrderRealItems();
                            layer.close(index);
                        }
                    },
                    error: function () {

                    }
                });
            }
        );
    } else {
        layer.msg("请选择需要确认的辅料发货单信息！！", function () {
        });
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-21 上午10:33:45
 * 模块名称:辅料发货单
 * 操作:配货
 *
 */

function flfhorderPh() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status == 1 || rows[0].status == 2) {
            layer.open({
                type: 2,
                title: '配货',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                area: ['700px', '450px'],
                content: 'flfhorder-inport?ph=1&flfhid=' + flfhid,
                btn: ["确定", "取消"],
                yes: function (index, layero) {
                    var postData = $(layero).find("iframe")[0].contentWindow.postData();
                    $.ajax({
                        url: pageContext + "/flFhorderController/flfhorderDistribution",
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: JSON.stringify(postData),
                        contentType: 'application/json;charset=UTF-8',
                        cache: false,
                        success: function (data) {
                            if (data.success) {
                                layer.alert("保存成功！");
                                LoadingDataListOrderRealItems();
                                layer.close(index);
                            } else {
                                layer.alert(data.msg);
                            }
                        }
                    });
                },
                btn2: function (index) {
                    layer.close(index);  //关闭弹窗
                }
            });
        } else {
            layer.msg("只有状态为确认，配货的发货单才能进行配货操作！！", function () {
            });
        }
    } else {
        layer.msg("请选择需要配货的辅料发货单！！", function () {
        });
    }
}


/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-13 下午4:42:31
 * 模块名称:辅料发货单
 * 操作:跟单审核
 *
 */
function flfhorderGdAudit() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status == 3 || rows[0].status == 4) {
            layer.open({
                type: 2,
                title: '发货单跟单审核界面',
                shade: [0.8, '#393D49'],
                maxmin: true, // 开启最大化最小化按钮
                area: ['700px', '450px'],
                content: 'flfhorder-export?gdaudit=1',
                btn: ["确定", "取消"],
                yes: function (index, layero) {
                    var flag = $(layero).find("iframe")[0].contentWindow.postDataAudit()[0].flag;
                    var wlgs = $(layero).find("iframe")[0].contentWindow.postDataAudit()[0].wlgs;
                    var isSure = false;
                    if (wlgs == '' || wlgs == undefined) {
                        alert("物流公司必填！！");
                        isSure = false;
                        return false;
                    }
                    else if (parseInt(flag) == 0) {
                        alert("存在实配数量大于发货数量 ，不能审核！");
                        isSure = false;
                        return false;
                    } else if (parseInt(flag) == 1) {
                        if (confirm("发货数量大于实配数量 !!，是否继续？")) {
                            isSure = true;
                        }
                    } else if (parseInt(flag) == 2) {
                        isSure = true;
                    }
                    if (isSure) {
                        $.ajax({
                            url: pageContext + "/flFhorderController/gendanFlfhorder",
                            type: "post",
                            dataType: "json",
                            async: false,
                            data: {"flfhid": flfhid, "isContinue": isSure, "wlgs": wlgs},
                            cache: false,
                            success: function (data) {
                                layer.alert(data.msg);
                                if (data.success) {
                                    LoadingDataListOrderRealItems();
                                    layer.close(index);
                                }
                            }
                        });
                    }
                },
                btn2: function (index) {
                    layer.close(index);  //关闭弹窗
                }
            });

        } else {
            layer.msg("该辅料发货单已不属于文件组审核状态，不能进行跟单审核！！", function () {
            });
        }
    } else {
        layer.msg("请选择一条需要出库的辅料发货单信息！！", function () {
        });
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-20 下午2:20:07
 * 模块名称:辅料发货单
 * 操作:辅料拣货单打印
 *
 */
function printFlpicking() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status < 2) {
            layer.msg("只有配货之后才能打印辅料拣货单！！", function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '辅料拣货单打印预览页面',
            shade: [0.8, '#393D49'],
            maxmin: true, // 开启最大化最小化按钮
            area: ['100%', '100%'],
            content: pageContext + "/flFhorderController/printFlpicking?id=" + rows[0].id,
        });
    } else {
        layer.msg("请勾选一条辅料发货单！", function () {
        });
    }
}

function exportFlPicking() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        layer.open({
            type: 2,
            title: '辅料拣货单打印预览页面',
            shade: [0.8, '#393D49'],
            maxmin: true, // 开启最大化最小化按钮
            area: ['100%', '100%'],
            content: pageContext + "/flFhorderController/exportFlPicking?flfhid=" + rows[0].id,
        });
    } else {
        layer.msg("请勾选一条辅料发货单！", function () {});
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-20 下午3:39:22
 * 模块名称:辅料发货单
 * 操作:登记物流信息
 *
 */
function registeredLogisticsInfo() {
    var idBuff = "";
    var rows = $('#flfhorder_table').bootstrapTable('getSelections');
    if (rows.length > 0) {
        if (rows[0].status < 5 && rows[0].status != 9) {
            layer.msg("未出库,已发货状态的辅料发货单，不能发货！！");
            return;
        }
        layer.open({
            type: 2,
            title: '登记物流信息',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['700px', '450px'], //宽高
            content: pageContext + "/flFhorderController/updateReceiptInfoEcho?flfhid=" + rows[0].id,
            btn: ['修改', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                posData["id"] = rows[0].id;
                //发送修改请求
                $.ajax({
                    url: pageContext + "/flFhorderController/updateReceiptInfo",
                    data: posData,
                    dataType: "json",
                    async: true,
                    type: "post",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            LoadingDataListOrderRealItems();
                            layer.close(index);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
                //按钮【修改】的回调
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //return false; //开启该代码可禁止点击该按钮关闭
            }
        });
    } else {
        layer.msg("请至少选择一条需要修改收货信息的辅料发货单！！");
    }

}

/**
 * 辅料发货单撤单
 * @author 肖亮亮
 * @date 2017-11-23 11:48
 * @param  * @param null
 * @return
 **/
function cancelFlfhorder() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length == 1) {
        if (rows[0].status != 6) {
            layer.confirm('确定要撤销该辅料发货单吗？',
                {btn: ['确认', '取消']},
                function (index) {
                    $(function () {
                        $.ajax({
                            url: pageContext + "/flFhorderController/cancelFlfhorder?flfhid=" + rows[0].id,
                            type: "post",
                            dataType: "json",
                            async: false,
                            cache: false,
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    LoadingDataListOrderRealItems();
                                }
                            }
                        });
                    });
                }
            );
        } else {
            if(rows[0].status != 9){
                layer.msg("该辅料发货单已属于撤单状态！！");
            }
            layer.msg("已发货，不能撤单！！");
        }
    } else {
        layer.msg("请选择一条需要撤单的辅料发货单！！");
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-24 下午1:24:01
 * 模块名称:辅料发货单
 * 操作:审核
 *
 */
function flfhorderAudit() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status == 4 || rows[0].status == 5) {
            layer.open({
                type: 2,
                title: '审核',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                area: ['700px', '450px'],
                content: 'flfhorder-export?audit=1',
                btn: ["确定", "取消"],
                yes: function (index, layero) {
                    var flag = $(layero).find("iframe")[0].contentWindow.postData()[0].flag;
                    var isSure = false;
                    if (parseInt(flag) == 0) {
                        alert("存在实配数量大于发货数量 ，不能审核！");
                        isSure = false;
                        return false;
                    } else if (parseInt(flag) == 1) {
                        if (confirm("发货数量大于实配数量 !!，是否继续？")) {
                            isSure = true;
                        }
                    } else if (parseInt(flag) == 2) {
                        isSure = true;
                    }
                    if (isSure) {
                        $.ajax({
                            url: pageContext + "/flFhorderController/auditFlfhorder",
                            type: "post",
                            dataType: "json",
                            async: false,
                            data: {"flfhid": flfhid, "isContinue": isSure},
                            cache: false,
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    LoadingDataListOrderRealItems();
                                    layer.close(index);
                                }
                            }
                        });
                    }
                },
                btn2: function (index) {
                    layer.close(index);  //关闭弹窗
                }
            });
        } else {
            layer.msg("只有状态为跟单审核的发货单才能进行审核操作！！", function () {
            });
        }
    } else {
        layer.msg("请选择一条需要审核的辅料发货单！！", function () {
        });
    }
}


function showFlfhorderInfo() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        layer.open({
            type: 2,
            title: '显示发货明细',
            shade: [0.8, '#393D49'],
            maxmin: true, // 开启最大化最小化按钮
            area: ['700px', '450px'],
            content: 'flfhorder-export?showmx=1',
            btn: ["关闭"],
            btn2: function (index) {
                layer.close(index);  //关闭弹窗
            }
        });

    } else {
        layer.msg("请选择一条需要出库的辅料发货单信息！！", function () {
        });
    }
}

/**
 * 文件组审核
 * @author 肖亮亮
 * @date 2017-12-30 13:43
 **/
function whsAudit() {
    var rows = $("#flfhorder_table").bootstrapTable("getSelections");
    if (rows.length > 0) {
        if (rows[0].status == 2 || rows[0].status == 3) {
            layer.open({
                type: 2,
                title: '审核',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                area: ['700px', '450px'],
                content: 'flfhorder-export?whsaudit=1',
                btn: ["确定", "取消"],
                yes: function (index, layero) {
                    $.ajax({
                        url: pageContext + "/flFhorderController/whsAuditFlfhorder",
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: {"flfhid": flfhid},
                        cache: false,
                        success: function (data) {
                            alert(data.msg);
                            if (data.success) {
                                LoadingDataListOrderRealItems();
                                layer.close(index);
                            }
                        }
                    });
                },
                btn2: function (index) {
                    layer.close(index);  //关闭弹窗
                }
            });
        } else {
            layer.msg("只有状态为跟单审核的发货单才能进行审核操作！！", function () {
            });
        }
    } else {
        layer.msg("请选择一条需要审核的辅料发货单！！", function () {
        });
    }
}