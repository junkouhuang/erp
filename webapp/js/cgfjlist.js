//初始化bootstrap Table
$(function () {
    $('#status').combobox();
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#cgfjlist_table").bootstrapTable('refresh', queryParams);
        }
    });
});
var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#cgfjlist_table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/cgfjController/getCgfjListPage", //请求后台的url
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
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            detailView: true, 					//是否显示详情折叠(父子表)
            exportDataType: 'all',
            onExpandRow: onExpandRow,
            rowStyle: function (row, index) {
                var strclass = "";
                if (row.status == 1) {
                    strclass = 'btn-danger';
                }
                return {classes: strclass}
            },
            columns: [
                {
                    checkbox: true
                },
                {
                    field: 'cgtradeid',
                    title: '采购单品牌商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'ordercode',
                    title: '分拣单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'recvOrderCode',
                    title: '到货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cgOrderCode',
                    title: '采购单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
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
                    field: 'itemno',
                    title: '明细号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cpmc',
                    title: '产品名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'addusername',
                    title: '制单人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'recordok',
                    title: '商品部建档未用',
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
                    field: 'fjds',
                    title: '分拣袋数',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fjsj',
                    title: '分拣时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fjfzr',
                    title: '分拣负责人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'begintime',
                    title: '拣货开始时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'endtime',
                    title: '拣货结束时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }]
        });
        $('#cgfjlist_table').bootstrapTable('hideColumn', 'cgdetailid');
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
    var postdata = $('#cgfjForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
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

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});

// 搜索
function search() {
    $("#cgfjlist_table").bootstrapTable('refresh', queryParams);
}

function addCgfjWork() {
    var rows = $('#cgfjlist_table').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条采购分拣信息进行添加分拣工单操作！！", function () {
        });
        return;
    }
    if (rows[0].status == 1) {
        layer.msg("分拣单号:" + rows[0].ordercode + "已经确认分拣完成！！", function () {
        });
        return;
    }
    $.ajax({
        url: pageContext + "/cgfjWorkController/addCgfjWork/" + rows[0].id,
        type: "POST",
        async: false,
        dataType: "JSON",
        success: function (req) {
            if (req.success) {
                search();
            }
            alert(req.msg);
        }
    });
}

function addCgfjinfo() {
    var rows = $('#cur_table').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条采购分拣工程单信息进行添加分拣结果操作！！", function () {
        });
        return;
    }
    if (rows[0].status != 0) {
        layer.msg("该采购分拣工程单状态不是默认！！", function () {
        });
        return;
    }
    var data = $('#cgfjlist_table').bootstrapTable('getData', true);//parent
    var cgdetailid;
    var cgfjid;
    var itemno;
    var cgtradeid;
    $.each(data, function (index, item) {
        if (data[index].id === rows[0].cgfjid) {
            cgdetailid = data[index].cgdetailid;
            cgfjid = data[index].id;
            itemno = data[index].itemno;
            cgtradeid = data[index].cgtradeid;
        }
    });
    var newspxx = 0;
    layer.open({
        type: 1,
        title: '请选择添加分拣结果的类型？',
        area: ['450px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["按流程走","用新的","用指定款号","取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table align="center" style="margin-top: 10px;">' +
        '<tr><td>款号：</td><td><input placeholder="请输入款号" id="spcode" type="text" class="form-control"/></td></tr>' +
        '</table>' +
        '</form>',
        btn1: function (index) {
            console.log("按流程走！");
            layer.close(index);
            open_cgfj_addcjinfoFun(cgdetailid, rows[0].workcode, itemno, 0, cgtradeid,'',cgfjid);
        }, btn2: function (index) {
            console.log("用新的！");
            layer.close(index);
            open_cgfj_addcjinfoFun(cgdetailid, rows[0].workcode, itemno, 1, cgtradeid,'',cgfjid);
        }, btn3: function (index) {
            var spcode = $("#spcode").val();
            console.log("用指定款号:"+spcode);
            if (spcode == '') {
                layer.msg("款号不能为空！", function () {});
                return;
            }else{
                layer.close(index);
                open_cgfj_addcjinfoFun(cgdetailid, rows[0].workcode, itemno, 0, cgtradeid,spcode,cgfjid);
            }
        }, btn4: function (index) {
            console.log("取消！");
            layer.close(index);
        }
    });

}

function open_cgfj_addcjinfoFun(cgdetailid, fjdanhao, itemno, newspxx, cgtradeid,spcode,cgfjid) {
    var rows = $('#cur_table').bootstrapTable('getSelections');
    layer.open({
        type: 2,
        title: '分拣结果添加界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: 'cgfjlist-addfjinfo?cgdetailid=' + cgdetailid + "&fjdanhao=" + fjdanhao +
        "&itemno=" + itemno + "&newspxx=" + newspxx + "&cgtradeid=" + cgtradeid+"&spcode="+spcode,
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            if (rows[0].status > 1) {
                layer.msg("该分拣工单已经生产入库了！！", function () {});
                return;
            }
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            posData["cgdetailid"] = cgdetailid;
            posData["fjid"] = cgfjid;
            var mxlist = posData["mxlist"];
            if (mxlist.length <= 0) {
                layer.msg("明细信息不能为空！！", function () {
                });
                return;
            }
            var kpiList = posData["kpiList"];
            if (kpiList.length <= 0) {
                layer.msg("分拣信息不能为空！！", function () {
                });
                return;
            }
            var jdTotal = 0;
            for (i in mxlist) {
                if (mxlist[i].ysid == '' || mxlist[i].ysid == null || mxlist[i].ysid == undefined) {
                    layer.msg("明细-颜色序号不能为空！！", function () {
                    });
                    return;
                } else if (mxlist[i].ys == '' || mxlist[i].ys == null || mxlist[i].ys == undefined) {
                    layer.msg("明细-颜色不能为空！！", function () {
                    });
                    return;
                } else if (mxlist[i].jdsl == '' || mxlist[i].jdsl == null || mxlist[i].jdsl == undefined) {
                    mxlist[i].jdsl = 0;
                }
                jdTotal += parseInt(mxlist[i].jdsl);
            }
            var fjTotal = 0;
            for (i in kpiList) {
                fjTotal += parseInt(kpiList[i].fjsl);
            }
            if (jdTotal != fjTotal) {
                layer.msg("建档数量和员工KPI信息不一致！！", function () {
                });
                return;
            }
            if (posData.cgdetailid == '' || posData.cgdetailid == undefined) {
                layer.msg("请选择要建档的采购明细！！", function () {
                });
                return;
            } else if (posData.fjdanhao == '' || posData.fjdanhao == undefined) {
                layer.msg("工程单单号不能为空！！", function () {
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
            if (posData.Identification == 1) {//update
                $.ajax({
                    url: pageContext + "/spxxController/cgfjOptSpxx/" + rows[0].id,
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
            } else if (posData.Identification == 0) {//insert
                $.ajax({
                    url: pageContext + "/spxxController/addSpxx/" + rows[0].id,
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
            } else {
                layer.msg("无法确定你要操作的类型！！", function () {
                });
                return;
            }

        }, btn2: function (index) {
            layer.close(index);
        }

    });
}


function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    var cur_table = $detail.html('<table style="color: #7aba7b" id="cur_table"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        singleSelect: false, //仅允许单选
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/cgfjWorkController/getCgfjWorkByCgfjid/" + row.id,
        showColumns: false, //是否显示所有的列
        //pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        queryParams: queryParamschild,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 50, 100],        //可供选择的每页的行数（*）
        showExport: true,
        rowStyle: function (row, index) {
            var strclass = "";
            if (row.status == 1) {
                strclass = 'btn-warning';
            } else if (row.status == 2) {
                strclass = 'btn-success';
            }
            return {classes: strclass}
        },
        columns: [
            {
                checkbox: true
            }, {
                field: 'workcode',
                title: '工程单单号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'createuname',
                title: '创建人',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'createtime',
                title: '创建时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'status',
                title: '状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "默认";
                    } else if (value == 1) {
                        return "已添加分拣结果";
                    } else if (value == 2) {
                        return "已生产入库";
                    } else {
                        return "异常";
                    }
                }
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

/**
 * 打印分拣工程单
 * @author 郑学亮
 * @date   2018/6/5 15:15
 **/
var printFjWork = function () {
    var rows = $('#cur_table').bootstrapTable('getSelections');
    if (rows.length < 1) {
        layer.msg("请选择一条采购分拣信息进行打印分拣工程单", function () {
        });
        return;
    }
    var str = "";
    for (var i in rows) {
        str += rows[i].id + ",";
    }
    layer.open({
        type: 2,
        title: '打印分拣工程单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        btn: ["关闭"],
        content: pageContext + "/cgfjWorkController/printCgFjWork/" + str,
        yes: function (index) {
            layer.close(index);
        }
    });
}

/**
 * @Description确认分拣完成
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-06-11 10:24
 **/
function confirmFjComplete() {
    var rows = $('#cgfjlist_table').bootstrapTable('getSelections');
    console.log("length:" + rows.length);
    if (rows.length != 1) {
        layer.msg("请选择一条采购分拣信息进行确认分拣完成操作！！", function () {
        });
        return;
    }
    layer.open({
        content: '确定对分拣单号' + rows[0].ordercode + "进行确认分拣完成操作？"
        , area: ['30%', '30%']
        , btn: ['确认分拣完成', '取消']
        , yes: function (index, layero) {
            if (rows[0].status == 1) {
                layer.msg("该分拣工单已经是分拣完成状态，请勿重复操作！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/cgfjController/confirmFjCompleteByCgfjid/" + rows[0].id,
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        search();
                        layer.close(index);
                    }
                }
            });
        }, btn3: function (index, layero) {
            layer.close(index);
        }
    });
}