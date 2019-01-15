var toareaid;//用来标志限区域的选中id
var dwid;//用来标志选中单位id
var lbid;
var isspreturn = true;
var dgArr = new Array();
var issingle = true;
var closeTree;
var cgdetailid = "";
var id ;
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-25 下午2:42:51
 * 模块名称:分拣
 * 操作:
 * 选择类别
 */

$(function () {
    id = getQueryString("spid");
    $.ajax({
        url: pageContext + "/cgfjController/getSpxxBySelective",
        data:{"id":id},
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            if(data.success){
                id = data.obj.id;
                lbid = data.obj.lbid;
                dwid = data.obj.dwid;
                $("#itemno").textbox("setValue", data.obj.itemno);
                $("#lbmc").textbox("setValue", data.obj.lbmc);
                $("#spcode").textbox("setValue", data.obj.spcode);
                $("#dw").textbox("setValue", data.obj.dw);
                $("#spmc").textbox("setValue", data.obj.spmc);
                $("#brand").textbox("setValue", data.obj.brand);
                $("#cz").textbox("setValue", data.obj.cz);
                $("#price").textbox("setValue", data.obj.price);
                $("#sellprice").textbox("setValue", data.obj.sellprice);
                $("#sellrate").textbox("setValue", data.obj.sellrate);
                $("#rate").textbox("setValue", data.obj.rate);
                $('#goodtype').combobox('select',data.obj.goodtype);
                $('#dq').combobox('select',data.obj.dq);
                $('#yearduan').combobox('select',data.obj.yearduan);
                $('#style').combobox('select',data.obj.style);
                $("#bz").textbox("setValue", data.obj.bz);
                $("#toarea").textbox("setValue", data.obj.toarea);
                spreturn =  data.obj.spreturn;
                $("#spreturn div").each(function() {
                    if (spreturn != Boolean($(this).find("input").val())) {
                        $(this).addClass("checked").siblings().removeClass("checked");
                    }
                });
                for (var i = 0; i < data.obj.mxList.length; i++) {
                    $("#dg").datagrid('appendRow', {
                        oldid: data.obj.mxList[i].id,
                        ysid: data.obj.mxList[i].ysid,
                        ys: data.obj.mxList[i].ys,
                        cmcode: data.obj.mxList[i].cmcode,
                        cm: data.obj.mxList[i].cm,
                        jdsl: data.obj.mxList[i].jdsl
                    });
                }
                $.ajax({
                    url: pageContext + "/tradeinfoController/getTradeinfoPageList",
                    type: "post",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        var tradeContent = '<option value="" selected="selected">请选择品牌商</option>';
                        for (var i = 0; i < data.length; i++) {
                            tradeContent += "<option value='" + data[i].id + "'>" + data[i].tradename + "</option>";
                        }
                        $('#spxxtradeid').append(tradeContent);
                    }
                });
                $('#spxxtradeid').combobox();
                $('#spxxtradeid').combobox('select',data.obj.spxxtradeid);
                $("#price").textbox({disabled:true});
                $("#sellprice").textbox({disabled:true});
                $("#sellrate").textbox({disabled:true});
                $("#rate").textbox({disabled:true});
            }else{
                alert(data.msg);
            }
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
        }
    });
})
//获取自编码
function loadItemno(){
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
}
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

var editIndexDg = undefined;
function onClickRowDg(index){
    if (editIndexDg != index){
        if (endEditingDg()){
            $('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndexDg = index;
        } else {
            $('#dg').datagrid('selectRow', editIndexDg);
        }
    }else{
        editIndexDg = undefined;
        $('#dg').datagrid('endEdit', editIndexDg);
    }
}
function endEditingDg(){
    if (editIndexDg == undefined){return true}
    if ($('#dg').datagrid('validateRow', editIndexDg)){
        $('#dg').datagrid('endEdit', editIndexDg);
        editIndexDg = undefined;
        return true;
    } else {
        return false;
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
    $('#dg').datagrid('endEdit', editIndexDg);
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
    var spxxtradeid = $("#spxxtradeid").val();
    var obj = {
        "id":id,
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
        "mxlist": mxlist,
        "spxxtradeid":spxxtradeid
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

var selectindex = 0;

function choice() {
    $('#ygxx-tb').datagrid('endEdit', editIndex);
    var row = $('#ygxx-tb').datagrid('getSelected');
    if (row) {
        var selections = $('#ygxxselect-tb').datagrid('getRows');//获得所有行
        for(var i in selections){
            if(selections[i].id == row.id){
                layer.msg("员工："+row.ygxm+"，已经添加！！",function(){});
                return;
            }
        }
        if(row.fjsl == "" || row.fjsl == null || row.fjsl == undefined){
            layer.msg("分拣数量不能为空！！",function(){});
            return;
        }
        if(row.fjsl < 1){
            layer.msg("分拣数量最低为1",function () {});
            return;
        }
        var rowIndex = $('#ygxx-tb').datagrid('getRowIndex', row);
        $('#ygxx-tb').datagrid('deleteRow', rowIndex);
        $("#ygxxselect-tb").datagrid("appendRow", {
            id:row.id,
            top: ++selectindex,
            ygxm: row.ygxm,
            ygcode: row.ygcode,
            zw: row.zw,
            fjsl:row.fjsl
        });
    }
    $("#ygxx-tb").datagrid('hideColumn', 'id');
}

function remove() {
    var row = $('#ygxxselect-tb').datagrid('getSelected');
    if (row) {
        //删除右边菜单栏里面的信息
        var rowIndex = $('#ygxxselect-tb').datagrid('getRowIndex', row);
        $('#ygxxselect-tb').datagrid('deleteRow', rowIndex);
        //添加到左边菜单栏去
        $("#ygxx-tb").datagrid("appendRow", {
            ygxm: row.ygxm,
            zw: row.zw,
            ygcode: row.ygcode,
            id: row.id
        })
        var rows = $('#ygxxselect-tb').datagrid("getData");
        for (var i = 0; i < rows.total; i++) {
            $('#ygxxselect-tb').datagrid('updateRow', {
                index: i,
                row: {
                    top: i + 1
                }
            });
        }
        selectindex = rows.total;
    }
}
var ygmc_code = "";
$(function () {
    loadYgxx();
    $("#ygmc_code").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            loadYgxx();
        }
    });
});

function loadYgxx() {
    ygmc_code = $("#ygmc_code").val();
    $('#ygxx-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/cgdetailController/getYgxxListBySHZ",
        data: {"ygmc_code": ygmc_code},
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.length == 0){
                layer.msg("检索的员工信息不存在！！",function(){});
                return;
            }
            for (var i in data) {
                $("#ygxx-tb").datagrid("appendRow", {
                    id: data[i].id,
                    ygxm: data[i].ygxm,
                    ygcode: data[i].ygcode,
                    zw: data[i].zw
                });
            }
        }
    });
}
var editIndex = undefined;
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            $('#ygxx-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#ygxx-tb').datagrid('selectRow', editIndex);
        }
    }else{
        editIndex = undefined;
        $('#ygxx-tb').datagrid('endEdit', editIndex);
    }
}
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#ygxx-tb').datagrid('validateRow', editIndex)){
        $('#ygxx-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}