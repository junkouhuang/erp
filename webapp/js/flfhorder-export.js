var mdContent = '';
var flfhdanid = $("body", parent.document).find("#flfhorder_table").find("input[type='checkbox']:checked").eq(0).val(); //获取上一个页面的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    var audit = getQueryString("audit");
    var gdaudit = getQueryString("gdaudit");
    var showmx = getQueryString("showmx");
    var whsaudit = getQueryString("whsaudit");
    if (gdaudit == null && audit!= null) {
        $("#wlgsxx").hide();
    }
    $.ajax({
        url: pageContext + "/flFhorderController/echoFlfhorder",
        type: "post",
        dataType: "json",
        data: {"fhfhid": flfhdanid, "audit": audit, "gdaudit": gdaudit,"showmx":showmx,"whsaudit":whsaudit},
        async: false,
        cache: false,
        success: function (data) {
            if (data.success) {
                //加载门店
                $.ajax({
                    url: pageContext + "/storeController/getStoreList",
                    type: "post",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        mdContent += "<option></option>";
                        for (var i = 0; i < data.length; i++) {
                            mdContent += "<option code=" + data[i].mdcode + " value=" + data[i].id + ">" + data[i].mdmc + "</option>";
                        }
                        $('#store').append(mdContent);
                    }
                });
                //-----------------------------end store---------------------------------
                //..........................................................文本框信息回选.......................................................
                $("#flfhcode").val(data.obj.flfhcode);
                $("#store").val(data.obj.storeid);
                $("#bz").val(data.obj.bz);
                $("#wlgs").val(data.obj.wlgs);
                //辅料发货单信息回选
                var content;
                for (var i = 0; i < data.obj.list.length; i++) {
                    $("#allot").datagrid("appendRow", {
                        flid: data.obj.list[i].flinfo.id,
                        id: data.obj.list[i].id,
                        flcode: data.obj.list[i].flinfo.flcode,
                        categroymc: data.obj.list[i].flinfo.categroymc,
                        number: data.obj.list[i].number,
                        sellprice: data.obj.list[i].sellprice,
                        sellrate: data.obj.list[i].sellrate,
                        actualnumber: data.obj.list[i].actualnumber,
                        price: data.obj.list[i].price
                    });
                }
                $("#flfhmx .datagrid-view2 .datagrid-body").append(content);
            } else {
                alert(data.msg);
                window.parent.location.reload();
            }
        }
    });
});
/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-21 下午5:33:12
 * 模块名称:辅料发货单审核界面
 * 操作:审核传参
 *
 */
var postDataAudit = function () {
    var array = new Array();
    var allot = $("#allot").datagrid("getRows");
    var wlgs = $("#wlgs").val();
    var flag = 2;
    for (var i in allot) {
        if (allot[i].number < allot[i].actualnumber) {  //发货数量小于实配数量
            flag = 0;
            break;
        } else if (allot[i].number > allot[i].actualnumber) {  //发货数量大于实配数量
            flag = 1;
        }
    }
    array.push({"flag": flag, "wlgs": wlgs});
    return array;

}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-11-21 下午5:33:12
 * 模块名称:辅料发货单审核界面
 * 操作:出库传参
 *
 */
var postData = function () {
    var array = new Array();
    var allot = $("#allot").datagrid("getRows");
    var flag = 2;
    for (var i in allot) {
        if (allot[i].number < allot[i].actualnumber) {  //发货数量小于实配数量
            flag = 0;
            break;
        } else if (allot[i].number > allot[i].actualnumber) {  //发货数量大于实配数量
            flag = 1;
        }
    }
    array.push({"flag": flag});
    return array;

}

function onClickRow(index) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#dg').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#dg').datagrid('selectRow', editIndex);
        }
    }
}

$("#allot").datagrid({
    onClickRow: function (index, row) {
        searchHistoryRecord(row.flid);
    }
})

/**
 * 导出发货明细
 * @author 肖亮亮
 * @date 2017-12-01 11:01
 * @param  * @param null
 * @return
 **/
function exportExcelFhMx() {
    window.location.href = pageContext +"/flFhorderController/exportExcelFhmxByFlfhid?flfhid="+flfhdanid;
}


