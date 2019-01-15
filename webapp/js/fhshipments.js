var fhid;
//初始化bootstrap Table
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
    laydate.render({
        elem: '#time',
        range: true,
        done: function (value, date, endDate) {
            time = value;
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    //1.初始化Table
    table = $('#tbody').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: false,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/fhOrdersController/selectFhorderBycwAudit", //请求后台的url
        singleSelect: false, //仅允许单选
        //search: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        smartDisplay: true,
        showToggle: true,
        clickToSelect: true,
        minimumCountColumns: 2,//最少允许的列数$("input[type='checkbox']").is(':checked')
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [6, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,
        //exportDataType: 'all',
        rowStyle: function (row, index) {
            //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
            var strclass = "";
            if (row.status == "0") {
                strclass = 'btn-warning';//还有一个active
            }
            else if (row.status == "1") {
                strclass = 'btn-success';
            }
            else if (row.status == "2") {
                strclass = 'btn-primary';
            }
            else if (row.status == "3") {
                strclass = 'btn-gold';
            }
            else if (row.status == "4") {
                strclass = 'btn-info';
            }
            else if (row.status == "5") {
                strclass = 'btn-MediumPurple';
            }
            else {
                strclass = 'btn-danger';
            }
            return {classes: strclass}
        },
        columns: [
            {
                field: 'ordercode',
                title: '发货单号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'fhbatchno',
                title: '发货批号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'fhtotal',
                title: '发货数量',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'fhje',
                title: '金额',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'mdcode',
                title: '店号',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'store.cwcode',
                title: '财务编码',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'mdmc',
                title: '店名',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'shrr',
                title: '收货人',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'createtime',
                title: '制单时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'status',
                title: '单据状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '待处理';
                    } else if (value == '1') {
                        return '打印分拣';
                    } else if (value == '2') {
                        return '财务审核';
                    } else if (value == '3') {
                        return '物流发货';
                    } else if (value == '4') {
                        return '门店收货';
                    } else if (value == '5') {
                        return '总部撤单';
                    } else {
                        return '错误';
                    }
                }
            }, {
                field: 'printstatus',
                title: '打印状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '1') {
                        return '已打印';
                    } else {
                        return '未打印';
                    }
                }
            }, {
                field: 'hasgoods',
                title: '拣货状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '1') {
                        return '<label class="btn-danger p31">已拣货</label>';
                    } else {
                        return '待拣货';
                    }
                }
            }, {
                field: 'docaudit',
                title: '文件组审核',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'docaudittime',
                title: '文件组审核时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cusaudit',
                title: '客服审核',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-danger"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'cusaudittime',
                title: '客服审核时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cusbind',
                title: '客服绑定',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-warning"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'cusbindtime',
                title: '客服绑定时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'audittime',
                title: '财务审核时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'printtime',
                title: '打印时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'store.gdy',
                title: '客服',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'wldh',
                title: '物流单号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'wlgs',
                title: '物流公司',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'fhzaudit',
                title: '是否发货',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-default"><input type="checkbox" class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'fhzaudittime',
                title: '发货时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'bz',
                title: '备注',
                align: 'center',
                valign: 'middle'
            }],
        onClickRow: function (row, $element) {
            fhid = row.id;
        },
        onCheck: function (row, $element) {
            fhid = row.id;
        }
    });
});
var table = null;
function queryParams(params) {
    var time = $("#time").val();
    var storeid = $("#storeid").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        time:time,
        storeid:storeid
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

function LoadingFhordersList() {
    $("#tbody").bootstrapTable('refresh', queryParams);
}
//导出发货件数统计报表
function exportFhshipmentsExcel (){
    var time = $("#time").val();
    if(time == null || time == undefined || time == '' ){
        layer.msg('请选择指定的时间导出！！',function(){});
        return;
    }
    var storeid = $("#storeid").val();
    window.location.href=pageContext+"/reportController/exportFhshipmentsExcel?time="+time+"&storeid="+storeid;
}