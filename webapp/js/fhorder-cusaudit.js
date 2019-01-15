//加载类别
$(function () {
    table = $('#tbody').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/fhOrdersController/getFhspdetailByFhid", //请求后台的url
        singleSelect: false, //仅允许单选
        queryParamsType: 'undefined',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        smartDisplay: true,
        clickToSelect: true,
        showFooter: true,
        idField: "id",
        showExport: true,
        columns: [
            {
                field: 'spcode',
                title: '款号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'spmc',
                title: '品名',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'mxcode',
                title: '条码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sl',
                title: '数量',
                align: 'center',
                valign: 'middle',
                footerFormatter: function (value) {
                    var count = 0;
                    for (var i in value) {
                        count += value[i].sl;
                    }
                    return count;
                }
            },
            {
                field: 'sellprice',
                title: '售价',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sellje',
                title: '金额',
                align: 'center',
                valign: 'middle',
                footerFormatter: function (value) {
                    var count = 0;
                    for (var i in value) {
                        count += value[i].sellje;
                    }
                    return count;
                }
            }, {
                field: 'ys',
                title: '颜色',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cm',
                title: '尺码',
                align: 'center',
                valign: 'middle'
            }
        ]
    });

    $('#fhbatchno').combobox();
});
//序列化表单
var formData = function () {
    return $("#fhorderform").serializeJSON();
    /* if( $.trim(data.wlgs) != ''){
         return data;
     }else {
         layer.msg("未指定物流公司");
         return;
     }*/
};

function queryParams(params) {
    var temp = {};
    temp["fhid"] = fhid;
    return temp;
}

//得到查询的参数
function rspHandler(res) {
    if (res) {
        return {
            "rows": res
        };
    } else {
        return {
            "rows": []
        };
    }
};
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-18 下午3:40:39
 * 模块名称:
 * 操作:温馨提示
 *
 */
function openFlfhorderBystoreid() {
	window.parent.openFlfhorder();
}