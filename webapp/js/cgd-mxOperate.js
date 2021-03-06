var toareaid;//用来标志限区域的选中id
var dwid;//用来标志选中单位id
var lbid;
var isspreturn = true;
var dgArr = new Array();
var issingle = true;
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:
 * 选择类别
 */
var closeTree;

function selectSplb() {
    closeTree = layer.open({
        type: 1,
        title: '选择类别',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['220px', '350px'],
        content: $("#splbs"),
        btn: ['关闭'], //可以无限个按钮
        yes: function (index) {
            layer.close(index);
        }
    });
}

$("#splbs").tree({
    onClick: function (node) {
        if (node.children == '') {
            $("#lbmc").textbox('setValue', node.text);//赋值
            lbid = node.id;
            layer.close(closeTree);
            $.ajax({
                url: pageContext + "/codeRuleController/getSpcode",
                data: {"splbid": node.id},
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.success) {
                        $("#spcode").textbox("setValue", data.obj);
                    } else {
                        layer.msg(data.msg);
                    }
                }
            });
        }
    }
});
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:分拣
 * 树形分组
 */
$('#tt').tree({
    onClick: function (node) {
        $("input[name='splb']").textbox('setValue', node.text);
    }
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:选择品牌
 * 操作:选择品牌
 */
var brandIframe;

function brandInfoWindows() {
    brandIframe = layer.open({
        type: 1,
        title: '选择品牌',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['220px', '380px'],
        content: $("#dd"),
        btn: ['关闭'], //可以无限个按钮
        yes: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:
 * 明细界面数据加载
 */
$('#brand-tb').datagrid({
    columns: [[
        {field: 'brandname', title: '品牌', width: 120},
        {field: 'id', title: '序号', width: 40}
    ]]
});
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:分拣
 * 初始化<明细界面>
 */
/*$('#dg').datagrid({
	columns:[[
		{field:'id',title:'序号',width:40,editor:'text'},
		{field:'ys',title:'颜色',width:120,editor:'numberbox'},
		{field:'cm',title:'尺码',width:120,editor:'text'},
		{field:'sl',title:'数量',width:120,editor:'text'}
	]]
});*/
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:
 * 选择尺码(尺码设置)
 */
var indexCM;

function selCm() {
    indexCM = layer.open({
        type: 1,
        title: '尺码设置',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['507px', '395px'],
        content: $("#cm"),
        //btn: ['保存','关闭'],可以无限个按钮
        yes: function (index) {
            layer.close(index);
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:分拣
 * 初始化<尺码设置>界面
 */
$('#mm').datagrid({
    columns: [[
        {field: 'id', title: '', width: 50, checkbox: true},
        {field: 'cmcode', title: '尺码', width: 50, align: 'center'},
        {field: 'cmmc', title: '尺码名称', width: 120, align: 'center'},
        {field: 'cmlx', title: '类型', width: 120, align: 'center'},
        {field: 'state', title: '状态', width: 60, align: 'center'},
        {field: 'seq', title: '序列号', width: 60, align: 'center'}
    ]]
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午9:18:00
 * 模块名称:分拣
 * 操作:新增(尺码)
 *
 */
function appendSizeinfo() {
    layer.open({
        type: 1,
        title: '新增尺码信息',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['340px', '230px'],
        content: addCm(),
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index) {
            var posData = $("#addCm").serializeJSON();
            $.ajax({
                url: pageContext + "/sizeInfoController/addSizeinfo",
                data: JSON.stringify(posData),
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        $("#mm").datagrid('appendRow', {
                            id: data.obj.id,
                            cmcode: data.obj.cmcode,
                            cmmc: data.obj.cmmc,
                            cmlx: data.obj.cmlx,
                            state: data.obj.state,
                            seq: data.obj.seq
                        });
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午10:37:03
 * 模块名称:分拣
 * 操作:新增(函数)
 *
 */
function addCm() {
    var content = "<form id='addCm' name='addCm'><table>";
    content += "<tr><td class='pl-20 pr-5  pt-5'>尺码号:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text' name='cmcode'  id='cmcode' ></td>";
    content += "<tr><td  class='pl-20 pr-5  pt-5'>尺码名称:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text' name='cmmc' id='cmmc' ></td>";
    content += "<tr><td  class='pl-20 pr-5  pt-5'>尺码类型:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text' name='cmlx' id='cmlx' ></td>";
    content += "</table></form>";
    return content;
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午10:37:57
 * 模块名称:分拣
 * 操作:删除(函数)
 *
 */
function removeSizeinfo() {
    var rows = $('#mm').datagrid('getSelections');
    if (rows.length <= 0) {
        layer.msg("请选择你要删除的尺码信息！！", function () {
        });
        return;
    }
    layer.confirm('确定要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        var removeidBuff = '';
        for (var i in rows) {
            removeidBuff += rows[i].id + ',';
        }
        $.ajax({
            url: pageContext + "/sizeInfoController/deleteSizeinfos",
            data: {"removeidBuff": removeidBuff},
            type: "POST",
            dataType: "json",
            async: false,
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    for (var i in rows) {
                        var dex = $('#mm').datagrid('getRowIndex', rows[i]);
                        $('#mm').datagrid('deleteRow', dex);
                    }
                    layer.close(index);
                }
            }
        });
    }, function (index) {
        layer.close(index);
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午11:06:15
 * 模块名称:分拣
 * 操作:选中列编辑
 *
 */
$.extend($.fn.datagrid.methods, {
    editCell: function (jq, param) {
        return jq.each(function () {
            var opts = $(this).datagrid('options');
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            $(this).datagrid('beginEdit', param.index);
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }
        });
    }
});

var editIndex = undefined;

function endEditing() {
    if (editIndex == undefined) {
        return true;
    }
    if ($('#dg').datagrid('validateRow', editIndex)) {
        $('#dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field) {
    if (endEditing()) {
        $('#dg').datagrid('selectRow', index)
            .datagrid('editCell', {index: index, field: field});
        editIndex = index;
    }
}

/**
 * 编辑完成后触发onAfterEdit
 * @author 郑学亮
 * @date   2018/5/9 11:19
 **/
var onAfterEdit = function (rowIndex, rowData, changes){
    if (jQuery.isEmptyObject(changes)){                        // 未修改离开方法
        return false;
    }

    // 判断是否有重复的颜色序号 + 尺码（颜色序号 + 尺码不能出现重复）
    if (changes.hasOwnProperty("ysid")){
        var ysid = changes.ysid;
        var rows = $("#dg").datagrid('getData').rows;
        $.each(rows, function (index, item) {
            if (index == rowIndex){
                return true;
            }
            var cmcode = rowData.cmcode;
            if (item.ysid == ysid && item.cmcode == cmcode){
                $("#dg").datagrid('updateRow',{                                                  // 修改一行的某一个属性
                    index: rowIndex,
                    row: {
                        ysid: ""
                    }
                });
                layer.msg("颜色序号尺码组已经存在，请重新输入颜色序号！", {time: 4000});
            }
        });
    }
}

/**
 * sizeinfos打印
 * @author 肖亮亮
 * @date 2018-01-05 12:45
 * @return
 **/
function printSizeinfos() {
    layer.open({
        type: 2,
        title: '尺码信息打印预览界面',
        shade: [1.0, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['100%', '100%'],
        content: pageContext + '/sizeInfoController/printSizeinfos'
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午11:06:15
 * 模块名称:分拣
 * 操作:选择尺码(确定)
 *
 */

function accept() {
    var rows = $("#mm").datagrid("getSelections");
    for (var i in rows) {
        var exists = false;
        for (var j in dgArr) {
            if (rows[i].id == dgArr[j]) {
                exists = true;
            }
        }
        dgArr.push(rows[i].id);
        $("#dg").datagrid('appendRow', {
            id: rows[i].id,
            cmcode: rows[i].cmcode,
            cm: rows[i].cmmc,
            cz: '<a onclick="del()"  style="color:red">删除</a>'
        });
    }
    layer.close(indexCM);
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午10:59:15
 * 模块名称:分拣
 * 操作:选择尺码(退出)
 *
 */
function cancel() {
    layer.close(indexCM);
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-26 上午10:56:15
 * 模块名称:分拣
 * 操作:选择尺码select事件
 *
 */
$(document).ready(function () {
    $("#cmd").change(function () {
        var v = $(this).val();
        /**
         * 此处书写请求代码
         */
    });
});

//获取自编码
$(function () {
    var cgdetailid = getQueryString("cgdetailid");
    $.ajax({
        url: pageContext + "/codeRuleController/getSpxxItemno",
        data: {"cgdetailid": cgdetailid},
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.success) {
                $("#itemno").textbox("setValue", data.obj);
            } else {
                layer.msg(data.msg);
            }
        }
    });
    $.ajax({
        url: pageContext + "/sizeInfoController/selectGroupSizeinfos",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var cmlx;
            cmlx += "<option></option>";
            for (var i = 0; i < data.length; i++) {
                cmlx += "<option>" + data[i] + "</option>";
            }
            $('#cmlxs').html("");
            $('#cmlxs').append(cmlx);
        }
    });
    /**
     * 检索尺码信息
     * @author 肖亮亮
     * @date 2018-01-05 12:59
     * @return
     **/
    $("#cmlxs,#disabled").change(function () {
        var options = $("#cmlxs option:selected");
        var cmlx = options.text();
        selectCmlxs(cmlx);
    });
})

function selectCmlxs(cmlx) {
    var intStatus = null;//表示显示所有
    if (!$('#disabled').is(':checked')) {
        intStatus = 0;//表示显示正常可用的
    }
    $.ajax({
        url: pageContext + "/sizeInfoController/selectSizeinfos",
        data: {"cmlx": cmlx, "intStatus": intStatus},
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            $("#mm").datagrid('loadData', []);
            for (i in data) {
                $("#mm").datagrid('appendRow', {
                    id: data[i].id,
                    cmcode: data[i].cmcode,
                    cmmc: data[i].cmmc,
                    cmlx: data[i].cmlx,
                    state: data[i].state,
                    seq: data[i].seq
                });
            }
        }
    });
}


/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域
 *
 */
$("#areas-tb").datagrid({
    columns: [[
        {field: 'id', title: '区域编码', width: 60, align: 'center'},
        {field: 'areades', title: '区域名称', width: 100, align: 'center'},
        {field: 'areabz', title: '备注', width: 80, align: 'center'}
    ]]
});
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域
 *
 */
var canceIndex;

function area() {
    canceIndex = layer.open({
        type: 1,
        title: '限定区域',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['290px', '380px'],
        content: $("#areas"),
        yes: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域(添加)
 *
 */

function appArea() {
    layer.open({
        type: 1,
        title: '添加区域信息',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['340px', '230px'],
        content: addAre(),
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index) {
            var qydm = $("#qydm").val();
            var qyxx = $("#qyxx").val();
            var qybz = $("#qybz").val();
            if (qydm == '' || qydm == undefined || qydm == null) {
                layer.msg("区域代码不能为空！");
            }else if (qyxx == '' || qyxx == undefined || qyxx == null) {
                layer.msg("区域信息不能为空！");
            }
            else {
                $.ajax({
                    url: pageContext + "/areaController/addArea",
                    data: {"areacode": qydm, "areades": qyxx,"areabz":qybz},
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if(data.success){
                            $("#areas-tb").datagrid("appendRow", {
                                id: data.obj.id,
                                areacode: data.obj.areacode,
                                areades: data.obj.areades,
                                areabz: data.obj.areabz
                            });
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
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域(添加function)
 *
 */
function addAre() {
    var content = "<table>";
    content += "<tr><td class='pl-20 pr-5  pt-5'>区域代码:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text'  id='qydm' ></td>";
    content += "<tr><td  class='pl-20 pr-5  pt-5'>区域信息:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text'  id='qyxx' ></td>";
    content += "<tr><td  class='pl-20 pr-5  pt-5'>备注:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text'  id='qybz' ></td>";
    content += "</table>";
    return content;
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域(删除)
 *
 */
function removeitArea() {
    var row = $('#areas-tb').datagrid('getSelected');
    if (row) {
        var rows = $('#areas-tb').datagrid('getSelections');
        $.ajax({
            url: pageContext + "/areaController/deleteArea/" + rows[0].id,
            type: "POST",
            dataType: "json",
            async: false,
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    var rowIndex = $('#areas-tb').datagrid('getRowIndex', row);
                    $('#areas-tb').datagrid('deleteRow', rowIndex);
                }
            }
        });
    } else {
        layer.msg("请选择要删除的行！");
    }

}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域(确定)
 *
 */
function acceptArea() {
    var row = $('#areas-tb').datagrid('getSelected');
    if (row != "") {
        console.log(row.areades);
        $("#toarea").textbox("setValue", row.areades);
        toareaid = row.id;
        layer.close(canceIndex);
    } else {
        layer.msg("请选择单位！");
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:限区域(退出)
 *
 */
function canceAreal() {
    layer.close(canceIndex);
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位
 *
 */
$("#dw-tb").datagrid({
    columns: [[
        {field: 'id', title: 'ID', width: 100, align: 'center'},
        {field: 'dwmc', title: '单位', width: 120, align: 'center'}
    ]]
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午2:38:27
 * 模块名称:分拣
 * 操作:单位
 *
 */
var canceDw;

function dw() {
    canceDw = layer.open({
        type: 1,
        title: '单位',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['295px', '380px'],
        content: $("#dww"),
        yes: function (index) {
            layer.close(index);
        }
    });
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(删除)
 *
 */
function removeitDw() {
    var row = $('#dw-tb').datagrid('getSelected');
    if (row) {
        var rows = $('#dw-tb').datagrid('getSelections');
        $.ajax({
            url: pageContext + "/dwController/deleteDw/" + rows[0].id,
            type: "POST",
            dataType: "json",
            async: false,
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    var rowIndex = $('#dw-tb').datagrid('getRowIndex', row);
                    $('#dw-tb').datagrid('deleteRow', rowIndex);
                }
            }
        });
    } else {
        layer.msg("请选择要删除的行！");
    }

}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(确定)
 *
 */
function acceptDw() {
    var row = $('#dw-tb').datagrid('getSelected');
    if (row != "") {
        $("#dw").textbox("setValue", row.dwmc);
        dwid = row.id;
        layer.close(canceDw);
    } else {
        layer.msg("请选择单位！");
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(打印)
 *
 */
function printDw() {

}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(添加)
 *
 */

function appendDw() {
    layer.open({
        type: 1,
        title: '添加单位',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['340px', '200px'],
        content: addDw(),
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index) {
            var dwmc = $("#dwmc").val();
            if (dwmc == '') {
                layer.msg("单位不能为空！");
            }
            else {
                $.ajax({
                    url: pageContext + "/dwController/addDwDTO",
                    data: {"dwmc": dwmc},
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            $("#dw-tb").datagrid("appendRow", {
                                id: data.obj.id,
                                dwmc: data.obj.dwmc
                            });
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
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(添加function)
 *
 */
function addDw() {
    var content = "<table>";
    content += "<tr><td class='pl-20 pr-5  pt-5'>单位:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text'  id='dwmc' ></td>";
    content += "</table>";
    return content;
}

/**
 * 添加品牌
 * @author 肖亮亮
 * @date 2018-01-06 12:01
 * @return
 **/
function addBrand() {
    var content = "<table>";
    content += "<tr><td class='pl-20 pr-5  pt-5'>品牌名称:</td><td  class='pl-10 pr-5 pt-5'><input class='form-control ' type='text'  id='brandmc' ></td>";
    content += "</table>";
    return content;
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-29 下午1:29:08
 * 模块名称:分拣
 * 操作:单位(退出)
 *
 */
function cancelDw() {
    layer.close(canceDw);

}

$('#createtime').datetimebox(
    $.fn.datebox.defaults.formatter = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + m + '-' + d;
    });


$('#wcsj').datetimebox(
    $.fn.datebox.defaults.formatter = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + m + '-' + d;
    });

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

var formData = function () {
    var createtime = $("#createtime").val();
    var wcsj = $("#wcsj").val();
    var itemno = $("#itemno").val();
    var lbmc = $("#lbmc").val();
    var spcode = $("#spcode").val();
    var spmc = $("#spmc").val();
    var dw = $("#dw").val();
    var brand = $("#brand").val();
    var cz = $("#cz").val();
    var price = $("#price").val();
    var sellprice = $("#sellprice").val();
    var sellrate = $("#sellrate").val();
    var rate = $("#rate").val();
    var goodtype = $("#goodtype").find("option:selected").val();
    var area = $("#area").find("option:selected").text();
    var yearduan = $("#yearduan").find("option:selected").text();
    var style = $("#style").find("option:selected").text();
    var fjdanhao = $("#fjdanhao").val();
    var bz = $("#bz").val();
    var toarea = toareaid;
    var spreturn = isspreturn;
    var single = issingle;
    var splbid = lbid;
    var mxlist = $("#dg").datagrid("getRows");
    var obj = {
        "createtime": createtime,
        "itemno": itemno,
        "lbmc": lbmc,
        "lbid": splbid,
        "spcode": spcode,
        "spmc": spmc,
        "dw": dw,
        "brand": brand,
        "cz": cz,
        "price": price,
        "sellprice": sellprice,
        "sellrate": sellrate,
        "rate": rate,
        "goodtype": goodtype,
        "yearduan": yearduan,
        "style": style,
        "fjdanhao": fjdanhao,
        "toarea": toarea,
        "area": area,
        "spreturn": spreturn,
        "single": single,
        "bz": bz,
        "mxlist": mxlist
    }
    return obj;
}

function appendBrand() {
    layer.open({
        type: 1,
        title: '添加品牌',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['340px', '150px'],
        content: addBrand(),
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index) {
            var brandname = $("#brandmc").val();
            if (brandname == '') {
                layer.msg("品牌名称不能为空！");
            }
            else {
                $.ajax({
                    url: pageContext + "/spBrandController/addSpBrand",
                    data: {"brandname": brandname},
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        layer.alert(data.msg);
                        if (data.success) {
                            $("#brand-tb").datagrid("appendRow", {
                                id: data.obj.id,
                                dwmc: data.obj.brandname
                            });
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

function removeitBrand() {
    var row = $('#brand-tb').datagrid('getSelected');
    if (row) {
        var rows = $('#brand-tb').datagrid('getSelections');
        $.ajax({
            url: pageContext + "/spBrandController/deleteSpBrand/" + rows[0].id,
            type: "POST",
            dataType: "json",
            async: false,
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    var rowIndex = $('#brand-tb').datagrid('getRowIndex', row);
                    $('#brand-tb').datagrid('deleteRow', rowIndex);
                    layer.close(index);
                }
            }
        });
    } else {
        layer.msg("请选择要删除的行！");
    }
}

function acceptBrand() {
    var row = $('#brand-tb').datagrid('getSelected');
    if (row != "") {
        $("#brand").textbox("setValue", row.brandname);
        brandid = row.id;
        layer.close(brandIframe);
    } else {
        layer.msg("请选择单位！");
    }
}

function isRadio(o) {
    isspreturn = $(o).find("input").val();
    if (!$(o).hasClass("checked")) {
        $(o).addClass("checked").siblings().removeClass("checked");
    }
}

function isSingle(o) {
    issingle = $(o).find("input").val();
    if (!$(o).hasClass("checked")) {
        $(o).addClass("checked").siblings().removeClass("checked");
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2018-1-3 下午3:22:28
 * 模块名称:分拣结果
 * 操作:移除
 *
 */
function del() {
    layer.confirm('确定要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        var row = $('#dg').datagrid('getSelected');
        var rows = $('#dg').datagrid('getRows');
        dgArr.length = 0;
        var dex = $('#dg').datagrid('getRowIndex', row);
        $('#dg').datagrid('deleteRow', dex);
        for (i in rows) {
            dgArr.push(rows[i].id);
        }
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
}


/**
 * 关闭窗口
 * @author 郑学亮
 * @date   2018/5/8 10:48
 **/
var closeWindows = function () {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}


/**
 * 明细操作的保存
 * @author 郑学亮
 * @date   2018/5/8 10:48
 **/
var cgspcode;
var saveMx = function () {
    if (checkTable()){
        return false;
    }
    if (cgspcode == "" || cgspcode == null || cgspcode == undefined){
        layer.msg("采购编码为空，无法进行保存操作！");
        return false;
    }
    var list = [];
    var data = $("#dg").datagrid('getData');
    var rows = data.rows;

    var i = 0;
    $.each(rows, function (index, item) {
        var flag = false;
        var mxObj = {};
        mxObj.cgmxcode = cgspcode + item.ysid + item.cmcode;    // 采购明细编号 = 采购商品编号 + 颜色序号 + 尺码编号
        mxObj.cgspcode = cgspcode;
        mxObj.cgsl = item.jdsl;
        mxObj.cm = item.cm;
        mxObj.cmcode = item.cmcode;
        mxObj.ys = item.ys;
        mxObj.yscode = item.ysid;

        if (!v_empty(item.cgmxcode, 0)){
            $.each(oldList, function (index2, item2) {                  // 这个循环是用于要被更新的数据
                if (item2.cgmxcode == item.cgmxcode){
                    if (item2.yscode == item.ysid && item2.ys == item.ys && item2.cgsl == item.jdsl){
                        flag = true;
                        return false;
                    }
                    mxObj.sign = item2.cgmxcode;
                    return false;
                }
            });
        }
        if (flag){
            return true;
        }
        list[i ++] = mxObj;
    });

    $.each(oldList, function (index, item) {                // 这个循环是用于找出要被删除的数据
        var flag = false;
        $.each(rows, function (index2, item2) {
            if (item.cgmxcode == item2.cgmxcode){
                flag = true;
                return false;
            }
        });
        if (!flag){
            var mxObj = {};
            mxObj.cgmxcode = item.cgmxcode;
            mxObj.sign = "DEL";
            list[i ++] = mxObj;
        }
    });

    if (list.length == 0){
        alert("保存成功！");
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }

    $.ajax({
        url: pageContext + "/cgdetailController/saveCgspmxList/" + cgspcode,
        type: "POST",
        contentType : 'application/json;charset=utf-8',
        async: false,
        dataType: "json",
        data: JSON.stringify(list),
        success: function (req) {
            if (req.success){
                alert("保存成功！");
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            }else {
                layer.msg(req.msg);
            }
        }
    });
}

var checkTable = function () {
    var flag = false;
    $("#dg").datagrid('endEdit', editIndex);
    var data = $("#dg").datagrid('getData');
    var rows = data.rows;
    for (var i = 1; i <= rows.length; i ++ ){
        var obj = rows[i - 1];
        if (v_empty(obj.ysid, 0)){
            layer.msg("第" + i + "行的颜色序号不能为空");
            flag = true;
            break;
        }
        if (v_empty(obj.ys, 0)){
            layer.msg("第" + i + "行的颜色不能为空");
            flag = true;
            break;
        }
        if (v_empty(obj.jdsl, 0)){
            layer.msg("第" + i + "行的数量不能为空");
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 初始化明细操作表格
 * @author 郑学亮
 * @date   2018/5/8 17:18
 **/
$(function () {
    cgspcode = getQueryVariable("cgspcode");                // 获取采购商品编号，cgspcode = cgitemno
    initTable(cgspcode);
})

var oldList;
var initTable = function (cgspcode) {
    if (cgspcode == "null" || cgspcode == "" || cgspcode == null || cgspcode == undefined){
        return false;
    }

    $.ajax({
        url: pageContext + "/cgdetailController/getCgspmxList/" + cgspcode,
        type: "GET",
        async: false,
        success: function (req) {
            if (req.success){
                oldList = req.obj;
            }else {
                layer.msg(req.msg);
            }
        }
    });
    $.each(oldList, function (index, item) {
        $("#dg").datagrid('appendRow', {
                cgmxcode: item.cgmxcode,
                cgspcode: item.cgspcode,
                jdsl: item.cgsl,
                cm: item.cm,
                cmcode: item.cmcode,
                ys: item.ys,
                ysid: item.yscode,
                cz: "<a onclick='del()' style='color:red'>删除</a>"
            }
        );
        
    });
}






