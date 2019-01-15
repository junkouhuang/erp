//初始化bootstrap Table
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#dhtable").bootstrapTable('refresh', queryParams);
        }
    });
});
var rowid = 0;
$(function () {
    //1.初始化Table
    table = $('#dhtable').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: true,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/cgdController/getCgdListPage", //请求后台的url
        singleSelect: true, //仅允许单选
        //search: true,
        sortable: true,  //是否启动排序
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）， 显示页码等信息
        queryParamsType: 'undefined',
        clickToSelect: true,//在点击行时，自动选择rediobox 和 checkbox
        sortOrder: 'asc',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,
        detailView: true, 					//是否显示详情折叠(父子表)
        exportDataType: 'all',
        onExpandRow: onExpandRow,
        columns: [
            {
                checkbox: true
            },
            //动态创建列名
            {
                field: 'id',
                title: 'ID',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'ordercode',
                title: '单据号',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'createtime',
                title: '开单日期',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'gysmc',
                title: '供应商',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'jbrmc',
                title: '采购员',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cgsj',
                title: '采购时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'zje',
                title: '总金额',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'bz',
                title: '备注',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'addusername',
                title: '建单员',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'clxx',
                title: '车辆信息',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cph',
                title: '车辆号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sjxm',
                title: '司机名称',
                align: 'center',
                valign: 'middle',
            }, {
                field: 'lxdh',
                title: '联系电话',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'yjfhsj',
                title: '预计发货时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'yjdhsj',
                title: '预计到货时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'fkfj',
                title: '付款方式',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'ztmemo',
                title: '状态',
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

    $('#dhprint').click(function () { //打印机事件
        var selectContent = table.bootstrapTable('getSelections')[0];
        if (typeof(selectContent) == 'undefined') {
            swal({
                title: "警告",
                text: "未选择任何调货单，请谨慎操作！",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                closeOnConfirm: false
            });
        } else {
            var index = parent.layer.open({
                type: 2,
                shade: [0.8, '#393D49'],
                content: pageContext + "/storedh/printStoreReport?dhid=" + selectContent.id,
                area: ['300px', '195px'],
                maxmin: true
            });
            parent.layer.full(index);
        }
    });
});

var table = null;

function queryParams(params) {
    var time = $("#time").val();
    var cgrOrgys = $("#cgrOrgys").val();
    var ordercode = $("#ordercode").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        time: time,
        cgrOrgys: cgrOrgys,
        ordercode: ordercode
    };
    return temp;
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
                title: '采购编号',
                field: 'cgitemno',
                align: 'center'
            },
            {
                title: '原始采购编号',
                field: 'historyitemno',
                align: 'center'
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
            /*,
            {
                title: '操作',
                field: 'operate',
                align: 'center',
                formatter: function (value, row, index) {
                    var cgid = row.cgid;
                    if (cgid == null || cgid == undefined){
                        return;
                    }
                    return operateHTML(row.id, row.cgitemno);
                }
            },
            {
                title: '图片',
                field: 'image',
                align: 'center',
                formatter: function (value, row, index) {
                    var cgid = row.cgid;
                    if (cgid == null || cgid == undefined){
                        return;
                    }
                    return imageHTML(row.id);
                }
            }*/
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

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-2 上午10:29:34
 * 模块名称:
 * 操作:新增采购单
 *
 */
function addCgd() {
    layer.open({
        type: 2,
        title: '新增采购单',
        shadeClose: false,
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        btn: ['保存', '取消'], //可以无限个按钮
        content: 'cgd-add',
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            //必填信息
            if (posData.ordercode == '') {
                layer.msg('单据号不能为空！！', function () {
                });
                return;
            } else if (posData.cgsj == '') {
                layer.msg('采购时间不能为空！！', function () {
                });
                return;
            } else if (posData.cgtradeid == '') {
                layer.msg('采购品牌商不能为空！！', function () {
                });
                return;
            } else if (posData.gysmc == '') {
                layer.msg('供应商不能为空！！', function () {
                });
                return;
            } else if (posData.jbrmc == '') {
                layer.msg('采购人不能为空！！', function () {
                });
                return;
            } else if (posData.yjdhsj == '') {
                layer.msg('预计到货时间不能为空！！', function () {
                });
                return;
            } else if (posData.lxdh == '') {
                layer.msg('联系电话不能为空！！', function () {
                });
                return;
            } else if (posData.yjfhsj == '') {
                layer.msg('预计发货时间不能为空！！', function () {
                });
                return;
            } else {
                if (posData.list == "") {
                    layer.alert("请添加一行采购单记录！");
                    return;
                } else {
                    for (var i in posData.list) {
                        if (posData.list[i].cpmc == "") {
                            layer.msg('产品名称不能为空！！', function () {
                            });
                            return;
                        } else if (posData.list[i].cpsl == "") {
                            layer.msg('采购数量不能为空！！', function () {
                            });
                            return;
                        } else if (posData.list[i].dj == "") {
                            layer.msg('采购单价不能为空！！', function () {
                            });
                            return;
                        } else if (posData.list[i].lb == undefined) {
                            layer.msg('物料类别不能为空！！', function () {
                            });
                            return;
                        }
                    }
                    $.ajax({
                        url: pageContext + "/cgdController/addCgd",
                        type: "post",
                        data: JSON.stringify(posData),
                        dataType: "json",
                        contentType: 'application/json;charset=UTF-8',
                        async: false,
                        cache: false,
                        success: function (data) {
                            alert(data.msg);
                            if (data.success) {
                                window.location.reload();
                            }
                        }, error: function () {
                            alert("请求失败！！");
                        }
                    });
                }
            }
            //关闭当前页面
            layer.close(index);
            $("#dhtable").bootstrapTable('refresh', queryParams);
        },
        btn2: function (index) {
            layer.close(index);
        }
    });
}

//搜索功能
function LoadingDataListOrderRealItems() {
    $("#dhtable").bootstrapTable('refresh', queryParams);
}

/*打印采购单*/
function printCgd() {
    var obj = $('#dhtable').bootstrapTable('getSelections')[0];
    if (obj != null && obj != '') {
        layer.open({
            type: 2,
            title: '打印采购单',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            content: pageContext + "/cgdController/printCgd?cgid=" + obj.id,
            btn: ["关闭"],
            yes: function (index, layero) {//按钮【确定】的执行的函数
                layer.close(index);
            }
        });
    } else {
        layer.msg("请选择需要打印预览的采购单！！", function () {
        });
    }
}

function deleteCgd() {
    var obj = $('#dhtable').bootstrapTable('getSelections')[0];
    if (obj != null && obj != '') {
        if (confirm("你确定要删除ID为" + obj.id + "的记录吗？")) {
            $.ajax({
                url: pageContext + "/cgdController/deleteCgdByid",
                type: "post",
                data: {"cgid": obj.id},
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    alert(data.msg);
                    if (data) {
                        window.location.reload();
                    }
                }, error: function () {
                    alert("请求失败！！");
                }
            });
        }
    } else {
        layer.msg("请选择需要删除的采购单！！", function () {
        });
    }
}

function cgdAudit() {
    var obj = $('#dhtable').bootstrapTable('getSelections')[0];
    if (obj != null && obj != '') {
        $.ajax({
            url: pageContext + "/cgdController/isAllAudit",
            type: "post",
            data: {"cgid": obj.id},
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                if (data) {
                    alert("该采购单已经财务审核过了！！");
                } else {
                    layer.open({
                        type: 2,
                        title: '财务处理',
                        shade: [0.8, '#393D49'],
                        maxmin: true, //开启最大化最小化按钮
                        area: ['700px', '450px'],
                        content: "cgd-audit?rowid=" + rowid,
                        btn: ["审核通过"],
                        yes: function (index, layero) {
                            var posData = $(layero).find("iframe")[0].contentWindow.formData();
                            $.ajax({
                                url: pageContext + "/cgdController/cgdAudit",
                                dataType: "json",
                                data: posData,
                                async: true,
                                type: "POST",   //请求方式
                                success: function (data) {
                                    alert(data.msg);
                                    if (data.success) {
                                        window.location.reload();
                                    }
                                }, error: function () {
                                    alert("请求错误！！");
                                }
                            });
                            layer.close(index);
                        }, no: function (index) {
                            layer.close(index);
                        }
                    });
                }
            }
        });
    } else {
        layer.msg("请选择需要审核的采购单！！", function () {
        });
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-5 下午10:48:28
 * 模块名称:
 * 操作:修改
 *
 */
function updCgd() {
    var obj = $('#dhtable').bootstrapTable('getSelections').length;
    if (obj > 0) {
        layer.open({
            type: 2,
            title: '采购单信息修改界面',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: "cgd-upd?rowid=" + rowid,
            btn: ["确定", "取消"],
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                //必填信息
                if (posData.ordercode == '') {
                    layer.msg('单据号不能为d空！！', function () {
                    });
                    return;
                } else if (posData.cgtradeid == '') {
                    layer.msg('采购品牌商不能为空！！', function () {
                    });
                    return;
                } else if (posData.cgsj == '') {
                    layer.msg('采购时间不能为空！！', function () {
                    });
                    return;
                } else if (posData.gysmc == '') {
                    layer.msg('供应商不能为空！！', function () {
                    });
                    return;
                } else if (posData.jbrmc == '') {
                    layer.msg('采购人不能为空！！', function () {
                    });
                    return;
                } else if (posData.yjdhsj == '') {
                    layer.msg('预计到货时间不能为空！！', function () {
                    });
                    return;
                } else if (posData.lxdh == '') {
                    layer.msg('联系电话不能为空！！', function () {
                    });
                    return;
                } else if (posData.yjfhsj == '') {
                    layer.msg('预计发货时间不能为空！！', function () {
                    });
                    return;
                } else {
                    if (posData.list == "") {
                        layer.alert("请添加一行采购单记录！");
                        return;
                    } else {
                        for (var i in posData.list) {
                            if (posData.list[i].cpmc == "") {
                                layer.msg('产品名称不能为空！！', function () {
                                });
                                return;
                            } else if (posData.list[i].cpsl == "") {
                                layer.msg('采购数量不能为空！！', function () {
                                });
                                return;
                            } else if (posData.list[i].dj == "") {
                                layer.msg('采购单价不能为空！！', function () {
                                });
                                return;
                            } else if (posData.list[i].lb == undefined) {
                                layer.msg('物料类别不能为空！！', function () {
                                });
                                return;
                            } else if (posData.list[i].cgitemno == undefined) {
                                layer.msg('采购单号不能为空！！', function () {
                                });
                                return;
                            }
                        }
                        $.ajax({
                            url: pageContext + "/cgdController/updateCgd",
                            type: "post",
                            data: JSON.stringify(posData),
                            dataType: "json",
                            contentType: 'application/json;charset=UTF-8',
                            async: false,
                            cache: false,
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    //关闭当前页面
                                    layer.close(index);
                                }
                            }, error: function () {
                                alert("请求失败！！");
                            }
                        });
                    }
                }

                $("#dhtable").bootstrapTable('refresh', queryParams);
            },
            btn2: function (index) {
                layer.close(index);
            }

        });
    } else {
        layer.msg("请选择需要修改的采购单！！", function () {
        });
    }
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
 *
 * 作者:黄金高
 * 创建时间:2017-12-22 下午3:34:08
 * 模块名称:
 * 操作:分拣单
 *
 */
function commodityRecord() {
    var obj = $('#cur_table').bootstrapTable('getSelections')[0];
    if (obj == null || obj == '' || obj == undefined) {
        layer.msg("请选择需要建档的物料！！", function () {
        })
    } else {
        layer.open({
            type: 2,
            title: '建档页面',
            shade: [0.8, '#393D49'],
            maxmin: false, //开启最大化最小化按钮
            area: ['80%', '80%'],
            content: 'spb_create_record?cgdetailid=' + obj.id + "&itemno=" + obj.cgitemno,
            btn: ['保存', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                posData["cgdetailid"] = obj.id;
                console.log(posData);
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
                }
                if (posData.cgdetailid == '' || posData.cgdetailid == undefined) {
                    layer.msg("请选择要建档的采购明细！！", function () {
                    });
                    return;
                } else if (posData.itemno == '' || posData.itemno == undefined) {
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
                if (posData.withbatch && (posData.batchcode == "" || posData.lx == "")) {
                    layer.msg("批次号或类型不能为空！", function () {
                    });
                    return;
                }
                $.ajax({
                    url: pageContext + "/spxxController/addSpxx",
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

}

/**
 * 图片操作的HTML代码
 * @author 郑学亮
 * @date   2018/4/8 16:32
 **/
var imageHTML = function (id) {
    return "<div class='btn-group btn-group-xs'>" +
        "<button type='button' class='btn btn-primary' onclick='browsePic(" + id + ")'>浏览图片</button>" +
        "<button type='button' class='btn btn-success' onclick='uploadPic(" + id + ")'>上传图片</button>" +
        "</div>";
}

/**
 * 浏览图片
 * @author 郑学亮
 * @date   2018/4/8 16:49
 **/
var browsePic = function (id) {
    layer.open({
        type: 2,
        title: '浏览图片',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '600px'],
        content: 'file_browse?cgdetailid=' + id
    });
}

/**
 * 上传图片
 * @author 郑学亮
 * @date   2018/4/8 16:49
 **/
var uploadPic = function (id) {
    layer.open({
        type: 2,
        title: '图片上传',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '600px'],
        content: 'file_upload?cgdetailid=' + id
    });
}

/**
 * 采购商品的操作栏的HTML代码
 * @author 郑学亮
 * @date   2018/4/14 9:49
 **/
var operateHTML = function (id, cgitemno) {
    return "<div class='btn-group btn-group-xs'>" +
        "<button type='button' class='btn btn-warning' onclick=mxOperate(" + id + ",'" + cgitemno + "')>明细操作</button>" +
        "<button type='button' class='btn btn-danger' onclick='confirm(" + id + ")'>确认</button>" +
        "</div>";
}

/**
 * 采购商品的确认
 * @author 郑学亮
 * @date   2018/4/14 9:56
 **/
var confirm = function (id) {
    layer.confirm('确认要进行此操作？', {
        btn: ["确认", "取消"],
        shade: false,
        btn1: function (index) {
            requestConfirm(id);
        }
    });

    var requestConfirm = function (id) {
        $.ajax({
            url: pageContext + "/cgdetailController/cgspConfirm/" + id,
            type: "POST",
            async: false,
            dataType: "JSON",
            success: function (req) {
                if (req.success) {
                    layer.msg(req.msg);
                } else {
                    layer.msg("确认失败！");
                    console.info(req.msg);
                }
            }
        });
    }
}

/**
 * 采购商品的明细操作
 * @author 郑学亮
 * @date   2018/5/7 17:48
 **/
var mxOperate = function (id, cgspcode) {
    if (cgspcode == "null" || cgspcode == null || cgspcode == "" || cgspcode == undefined) {
        cgspcode = "";
    }
    layer.open({
        type: 2,
        title: '明细操作',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['100%', '100%'],
        content: 'cgd-mxOperate?cgdetailid=' + id + '&cgspcode=' + cgspcode
    });
}

function exportCgdanInfos() {
    var time = $("#time").val();
    var cgrOrgys = $("#cgrOrgys").val();
    var ordercode = $("#ordercode").val();
    window.location.href = pageContext + "/reportController/exportCgdanInfos?ordercode=" + ordercode +
        "&cgrOrgys=" + cgrOrgys +
        "&time=" + time;
}