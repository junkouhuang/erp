/**
 * 导出微信发布信息
 * @author 肖亮亮
 * @date 2017-12-06 15:34
 * @param  * @param null
 * @return
 **/
function exportWxfbInfo() {
    layer.open({
        type: 1,
        title: '导出微信发布信息',
        area: ['300px', '150px'],
        shade: [0.8, '#393D49'],
        btn: ["导出", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td>发布号：</td><td><input id="importwxfbcode" type="text" class="form-control"/></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var wxfbcode = $("#importwxfbcode").val();
            if (wxfbcode == '') {
                layer.msg("发布号不能为空!!", function () {});
                return;
            }
            window.location.href=pageContext+"/batchnewOrderController/exportWxfbInfoByWxfbcode?wxfbcode="+wxfbcode;
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-4 下午1:19:00
 * 模块名称:批次列表
 * 操作:导入批次信息
 *
 */
function importBatchInfo() {
    layer.open({
        type: 1,
        title: '导入批次信息',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["导入", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">批次号：</td><td  class="pb-10"><input id="importbatchcode" type="text" class="form-control"></td></tr>' +
        '<tr><td>发布号：</td><td><input id="importwxfbcode" type="text" class="form-control"/></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var batchcode = $("#importbatchcode").val();
            var wxfbcode = $("#importwxfbcode").val();
            if (batchcode == '') {
                layer.msg("批次号不能为空!!", function () {
                });
                return;
            } else if (wxfbcode == '') {
                layer.msg("发布号不能为空!!", function () {
                });
                return;
            }
            //loading层
            var indexLoad = layer.load(1, {
                shade: [0.1, '#333'] //0.1透明度的白色背景
            });
            $.ajax({
                url: pageContext + "/batchnewOrderController/importOrdersByBatchcode",
                data: {"batchcode": batchcode, "wxfbcode": wxfbcode},
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if (data.success) {
                        if (data.obj != null) {
                            layer.alert("操作成功： " + data.obj);
                            layer.close(indexLoad);
                        } else {
                            layer.close(indexLoad);
                            layer.alert(data.msg);
                        }
                        layer.close(index);
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    } else {
                        layer.alert(data.msg);
                        layer.close(indexLoad);
                    }
                }, error: function () {
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

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
})
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-4 下午1:46:34
 * 模块名称:订单列表
 * 操作:表格数据加载
 *
 */
$(function () {
    // 执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true
    });
    //1.初始化Table
    table = $('#orderlist_table').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/batchnewOrderController/selectListPage", //请求后台的url
        singleSelect: true, //仅允许单选
        //search: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        clickToSelect: true,
        sortOrder: 'asc',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        detailView: true,//父子表
        showExport: true,
        exportDataType: 'all',
        onExpandRow: onExpandRow,
        columns: [
            {
                checkbox: true
            },
            //动态创建列名
            {
                field: 'ordercode',
                title: '订单号',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'mdmc',
                title: '店名',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'mdcdoe',
                title: '店号',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'shr',
                title: '收货人',
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
                sortable: true

            }, {
                field: 'createtime',
                title: '创建时间',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'bz',
                title: '备注',
                align: 'center',
                valign: 'middle',
                sortable: true

            }],
        onClickRow: function (row, $element) {
            $element.find("input").prop("checked", true).parents("tr").siblings().find("input").prop("checked", false);
        }
    });
});

//父子表
function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    var cur_table = $detail.html('<table style="color: #7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: "post", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/batchnewOrderController/selectDetailListPage?orderid=" + row.id,
        dataType: "json",
        pagination: false,    // 显示页码等信息
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 5,           // 当前分页值
        pageList: [5, 20],  // 分页选页
        queryParams: queryParamschild,//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        responseHandler: rspHandler,//格式化数据
        columns: [
            {
                field: 'batchcode',
                title: '批次号',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'spBatch.batchname',
                title: '批次名称',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'fs',
                title: '订货份数',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'phfs',
                title: '配货份数',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 's',
                title: '偏小',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'm',
                title: '适中',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'x',
                title: '偏大',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'status',
                title: '状态',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'pktype',
                title: '分箱',
                align: 'center',
                valign: 'middle',
                sortable: true,
                formatter: function (value, row, index) {
                    if (value == '0')
                        return "Y";
                    return "N";
                }
            }
        ]
    });

};

// 搜索功能
function LoadingDataListOrderRealItems() {
    $("#orderlist_table").bootstrapTable('refresh', queryParams);
}

var table = null;

function queryParams(params) {
    var postdata = $('#orderlistForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

function queryParamschild(params) {
    var postdata = $('#orderlistForm').serializeJSON();
    postdata['pageSize'] = params.pageSize1;
    postdata['page'] = params.pageNumber1;
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