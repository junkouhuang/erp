//加载供应商
var content;
$(function () {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
            }
            $('#cgtradeid').append(tradeContent);
            $('#cgtradeid').combobox();
        }
    });
    $.ajax({
        url: pageContext + "/gysxxController/getGysxxList",
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            var content = "";
            content += "<option></option>";
            for (var i = 0; i < data.length; i++) {
                content += "<option value=" + data[i].id + ">" + data[i].gysmc + "</option>";
            }
            $("#gysmc").append(content);
            $('#gysmc').combobox();
        }, error: function () {
        }
    });
    $.ajax({
        url: pageContext + "/cgdController/getSplbList",
        dataType: "json",
        async: true,
        type: "POST",
        data: {"parentid": "0"},
        success: function (data) {
            content = "<ul class='treeMap'>";
            content += "<li><i class='l-box  l-expandable-open tree0'></i><span class='l-box l-tree-icon-folder-open'></span><span>所有类别</span><ul>";
            for (var i = 0; i < data.length; i++) {
                content += "<li style='float:left; width: 100%;'><i class='l-box  l-expandable-close tree1'></i><span class='l-box l-tree-icon-folder'></span><span>" + data[i].lbmc + "</span><ul  class='l-children'>";
                for (var j = 0; j < data[i].list.length; j++) {
                    content += "<li><i class='l-box l-note tree2'></i><span class='l-box l-tree-icon'></span><span class='lbmc' onclick='lbmcFun(this)'>" + data[i].list[j].lbmc + "</span></li>";
                }
                content += "</ul></li>";
            }
            content += "</ul></li>";
            content += "</ul>";
        }
    });

    /**
     * 获取自动生成的单据号
     * @author 郑学亮
     * @date   2018/4/8 9:32
     **/
    $.ajax({
        url: pageContext + "/cgdController/getNewOrdercode",
        type: "GET",
        async: "false",
        dataType: "JSON",
        success: function (req) {
            if (req.success) {
                $("#ordercode").val(req.obj);
            } else {
                $("body", parent.document).find(".layui-layer-btn0").css("display", "none");
                $("#ordercode").val("单据号生成失败");
            }
        }
    });
});

//执行一个laydate实例
laydate.render({
    elem: '.time1',
    type: 'datetime'
});
laydate.render({
    elem: '.time2',
    type: 'datetime'
});
laydate.render({
    elem: '.time3',
    type: 'datetime'
});

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-4 上午10:26:12
 * 模块名称:
 * 操作:easyui datagrid表格新增删除修改
 *
 */

var lastIndex;

function append() {
    if (endEditing()) {
        $('#dg').datagrid('appendRow', {
            pid: $('#dg').datagrid('getRows').length + 1,
            add: '<a class="easyui-linkbutton l-btn l-btn-small l-btn-plain">' +
            '<span class="l-btn-left l-btn-icon-left">' +
            '<span class="l-btn-left l-btn-icon-left" onclick="lb()">添加物料类别</span>' +
            '&nbsp;<span class="l-btn-icon icon-add">&nbsp;</span></span></a>'
        });
        lastIndex = $('#dg').datagrid('getRows').length - 1;
        createCgitemno(lastIndex);					// 创建采购编号
        $('#dg').datagrid('selectRow', lastIndex)
            .datagrid('beginEdit', lastIndex);
    }
}

function removeit() {
    var row = $('#dg').datagrid('getSelected');
    if (row != null) {
        var rowIndex = $('#dg').datagrid('getRowIndex', row);
        $('#dg').datagrid('deleteRow', rowIndex);
    } else {
        layer.msg("请选择要移除的行！", function () {
        });
    }
}

function endEditing() {
    if (lastIndex == undefined) {
        return true
    }
    if ($('#dg').datagrid('validateRow', lastIndex)) {
        var ed = $('#dg').datagrid('getEditor', {index: lastIndex, field: 'productid'});
        $('#dg').datagrid('endEdit', lastIndex);
        lastIndex = undefined;
        return true;
    } else {
        return false;
    }
}

$(function () {
    $('#dg').datagrid({
        onClickRow: function (rowIndex) {
            if (lastIndex != rowIndex) {
                $(this).datagrid('endEdit', lastIndex);
                $(this).datagrid('beginEdit', rowIndex);
            }
            lastIndex = rowIndex;
        },
        onBeginEdit: function (rowIndex) {
            var editors = $('#dg').datagrid('getEditors', rowIndex);
            var n1 = $(editors[1].target);
            var n2 = $(editors[2].target);
            var n3 = $(editors[3].target);
            n1.add(n2).numberbox({
                onChange: function () {
                    var cost = n1.numberbox('getValue') * n2.numberbox('getValue');
                    n3.numberbox('setValue', cost);
                }
            })
        }
    });
});


var indexx;

function lb() {
    indexx = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['265px', '90%'],
        shadeClose: true,
        skin: 'yourclass',
        content: content
    });
    //收缩树形图
    $(".tree1").each(function () {
        $(this).click(function () {
            if ($(this).hasClass("l-expandable-close")) {
                $(this).removeClass("l-expandable-close").addClass("l-expandable-open");
                $(this).siblings("span").removeClass("l-tree-icon-folder").addClass("l-tree-icon-folder-open");
                $(this).siblings("ul").removeClass("l-children");
            } else {
                $(this).removeClass("l-expandable-open").addClass("l-expandable-close");
                $(this).siblings("span").removeClass("l-tree-icon-folder-open").addClass("l-tree-icon-folder");
                $(this).siblings("ul").addClass("l-children");
            }
        });
    });
    lbmcFun(o);
}

function lbmcFun(o) {
    var lbmc = $(o).text();
    var row = $('#dg').datagrid('getSelected');
    row.lb = lbmc;
    accept();
    layer.close(indexx);
}

function accept() {
    if (endEditing()) {
        $('#dg').datagrid('acceptChanges');
    }
}


var formData = function () {
    accept();
    var ordercode = $("#ordercode").val();
    var cgsj = $("#cgsj").val();
    var gysmc = $("#gysmc").find("option:selected").text();
    var gysid = $("#gysmc").find("option:selected").val();

    var jbrmc = $("#jbrmc").val();
    var clxx = $("#clxx").val();
    var yjdhsj = $("#yjdhsj").val();

    var sjxm = $("#sjxm").val();
    var lxdh = $("#lxdh").val();
    var yjfhsj = $("#yjfhsj").val();

    var cph = $("#cph").val();
    var bz = $("#bz").val();
    var cgtradeid = $("#cgtradeid").val();
    var bookCount = $("#dg").datagrid("getRows");
    var datalist = new Array();
    for (var i = 0; i < bookCount.length; i++) {
        var pid = bookCount[i].pid;
        var cpmc = bookCount[i].cpmc;
        var cpsl = bookCount[i].cpsl;
        var dj = bookCount[i].dj;
        var je = bookCount[i].je;
        var lb = bookCount[i].lb;
        var cgitemno = bookCount[i].cgitemno;
        var historyitemno = bookCount[i].historyitemno;
        datalist.push({"pid": pid, "cpmc": cpmc, "cpsl": cpsl, "dj": dj, "je": je, "lb": lb, "cgitemno": cgitemno,"historyitemno":historyitemno});
    }
    var cgdan = { // 创建一个对象
        ordercode: ordercode,
        cgsj: cgsj,
        gysmc: gysmc,
        gysid: gysid,
        jbrmc: jbrmc,
        clxx: clxx,
        cph: cph,
        sjxm: sjxm,
        lxdh: lxdh,
        yjfhsj: yjfhsj,
        yjdhsj: yjdhsj,
        bz: bz,
        cgtradeid: cgtradeid,
        list: datalist
    };
    return cgdan;
};

/**
 * 创建采购编号
 * @author 郑学亮
 * @date   2018/4/8 10:47
 * @param  index     某行的索引
 **/
var createCgitemno = function (index) {
    var code;
    $.ajax({
        url: pageContext + "/cgdController/getNewItemno",
        type: "GET",
        async: false,
        dataType: "JSON",
        success: function (req) {
            if (req.success) {
                code = req.obj;
            } else {
                code = "采购编号生成失败";
                $("body", parent.document).find(".layui-layer-btn0").css("display", "none");
            }
        }
    });
    $("#dg").datagrid('updateRow', {
        index: index,
        row: {
            cgitemno: code,
        }
    });
}
    
