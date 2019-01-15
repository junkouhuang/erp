//获取来自父级iframe传递过来的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var fhid;
var bigpackagecode;
var requesturl;
$(function () {
    fhid = getQueryString("fhid");
    if (fhid != null) {
        $("#exportFhMx").hide();
        $("#exportExcelFhMx").hide();
        $("#htmlExportFhMx").show();
        $("#htmlExportFhMxToPdf").show();
        requesturl = pageContext + "/fhOrdersController/getFhorderPackageDetail?fhid=" + fhid;
    } else {
        $("#htmlExportFhMx").hide();
        $("#exportFhMx").show();
        $("#exportExcelFhMx").show();
        $("#htmlExportFhMxToPdf").show();
        bigpackagecode = getQueryString("bigpackagecode");
        requesturl = pageContext + "/fhOrdersController/selectFhmxOddByBigpackagecode?bigpackagecode=" + bigpackagecode;
    }
});
$(function () {
    $.ajax({
        url: requesturl,
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data, index) {
            if (!data.success) {
                alert(data.msg);
                offThisWindows();
            } else {
                //=======加载第一个表格的数据========
                for (var i in data.obj.bigPackageList) {
                    $("#bigPackageList").datagrid("appendRow", {
                        orderId: data.obj.bigPackageList[i]
                    });
                }
                //=======加载第二个表格的数据========
                for (var key in data.obj.packageMap) {
                    for (var keys in data.obj.packageMap[key]) {
                        if (data.obj.packageMap[key][keys].batchcode != null) {
                            $("#packageMap").datagrid("appendRow", {
                                mc: keys,
                                batchcode: data.obj.packageMap[key][keys].batchcode,
                                len: data.obj.packageMap[key][keys].len
                            });
                        } else {
                            $("#packageMap").datagrid("appendRow", {
                                mc: keys,
                                len: data.obj.packageMap[key][keys].len
                            });
                        }
                    }
                }
                //顯示統計第2个表格數據
                var arr = $("#packageMap").datagrid("getRows");
                var userAmount = 0;
                //累加
                for (var i = 0; i < arr.length; i++) {
                    userAmount += arr[i].len;
                }
                $('#packageMap').datagrid('appendRow', {
                    batchcode: '<b>统计：</b>',
                    len: userAmount
                });

                //=======加载第三个表格的数据========
                for (var key in data.obj.spxxMap) {
                    for (var keys in data.obj.spxxMap[key]) {
                        $("#spxxMap").datagrid("appendRow", {
                            spmc: data.obj.spxxMap[key][keys].spmc,
                            spcode: data.obj.spxxMap[key][keys].spcode,
                            ys: data.obj.spxxMap[key][keys].ys,
                            cm: data.obj.spxxMap[key][keys].cm,
                            price: data.obj.spxxMap[key][keys].price,
                            je: data.obj.spxxMap[key][keys].je,
                            sl: data.obj.spxxMap[key][keys].sl
                        });
                    }
                }
                var orderSl = 0;
                var orderAmount = 0;
                //加载第四个表格的数据
                for (var i=0;i<data.obj.wxOrderDetails.length;i++) {
                    orderSl += data.obj.wxOrderDetails[i].sl;
                    orderAmount += data.obj.wxOrderDetails[i].amount;
                        $("#orderdetails").datagrid("appendRow", {
                            spmc: data.obj.wxOrderDetails[i].batchname,
                            batchcode: data.obj.wxOrderDetails[i].batchcode,
                            ys: data.obj.wxOrderDetails[i].ys,
                            cm: data.obj.wxOrderDetails[i].cm,
                            price: data.obj.wxOrderDetails[i].price,
                            je: data.obj.wxOrderDetails[i].amount,
                            sl: data.obj.wxOrderDetails[i].sl
                        });
                }
                $('#orderdetails').datagrid('appendRow', {
                    price: '<b>统计：</b>',
                    je: orderAmount,
                    sl:orderSl
                });
                //顯示統計第3个表格數據
                var arr = $("#spxxMap").datagrid("getRows");
                var userAmount = 0;
                var jhsl = 0;
                //累加
                for (var i = 0; i < arr.length; i++) {
                    userAmount += arr[i].je;
                    jhsl +=  arr[i].sl;
                }
                $('#spxxMap').datagrid('appendRow', {
                    price: '<b>统计：</b>',
                    je: userAmount,
                    sl:jhsl
                });
                //********************点击第一个表格的数据*******************
                $("#bigPackageList").datagrid({
                    onClickRow: function (index, row) {
                        $("#packageMap").datagrid('loadData', []);
                        for (var key in data.obj.packageMap) {
                            if (key == row.orderId) { //row.orderId是第一个表格的单号
                                for (var keys in data.obj.packageMap[key]) {
                                    if (data.obj.packageMap[key][keys].batchcode != null) {
                                        $("#packageMap").datagrid("appendRow", {
                                            mc: keys,
                                            batchcode: data.obj.packageMap[key][keys].batchcode,
                                            len: data.obj.packageMap[key][keys].len
                                        });
                                    } else {
                                        $("#packageMap").datagrid("appendRow", {
                                            mc: keys,
                                            len: data.obj.packageMap[key][keys].len
                                        });
                                    }
                                }
                            }
                        }
                        //顯示統計數據
                        var arr = $("#packageMap").datagrid("getRows");
                        var userAmount = 0;
                        //累加
                        for (var i = 0; i < arr.length; i++) {
                            userAmount += arr[i].len;
                        }
                        $('#packageMap').datagrid('appendRow', {
                            batchcode: '<b>统计：</b>',
                            len: userAmount
                        });
                        //显示第三表格数据
                        $("#spxxMap").datagrid('loadData', []);
                        var rowsThird = $("#packageMap").datagrid("getRows");
                        for (var i in rowsThird) {
                            for (var T in data.obj.spxxMap) {
                                if (T == rowsThird[i].mc) {   //跟第二个表格进行比较，第二个表格存在的,关联在第三个表格
                                    for (var K in data.obj.spxxMap[T]) {
                                        $("#spxxMap").datagrid("appendRow", {
                                            spmc: data.obj.spxxMap[T][K].spmc,
                                            spcode: data.obj.spxxMap[T][K].spcode,
                                            ys: data.obj.spxxMap[T][K].ys,
                                            cm: data.obj.spxxMap[T][K].cm,
                                            price: data.obj.spxxMap[T][K].price,
                                            je: data.obj.spxxMap[T][K].je,
                                            sl: data.obj.spxxMap[T][K].sl
                                        });
                                    }
                                }
                            }
                        }
                        //显示第三表格数据统计
                        var arr = $("#spxxMap").datagrid("getRows");
                        var userAmount = 0;
                        //累加
                        for (var i = 0; i < arr.length; i++) {
                            userAmount += arr[i].je;
                        }
                        $('#spxxMap').datagrid('appendRow', {
                            price: '<b>统计：</b>',
                            je: userAmount
                        });
                        //--------end------
                    }
                });
                //********************点击第二个表格的数据*******************
                $("#packageMap").datagrid({
                    onClickRow: function (index, row) {
                        $("#spxxMap").datagrid('loadData', []);
                        for (var key in data.obj.spxxMap) {
                            if (key == row.mc) {
                                for (var keys in data.obj.spxxMap[key]) {
                                    $("#spxxMap").datagrid("appendRow", {
                                        spmc: data.obj.spxxMap[key][keys].spmc,
                                        spcode: data.obj.spxxMap[key][keys].spcode,
                                        ys: data.obj.spxxMap[key][keys].ys,
                                        cm: data.obj.spxxMap[key][keys].cm,
                                        price: data.obj.spxxMap[key][keys].price,
                                        je: data.obj.spxxMap[key][keys].je,
                                        sl: data.obj.spxxMap[key][keys].sl
                                    });
                                }
                            }
                        }
                        //顯示統計數據
                        var arr = $("#spxxMap").datagrid("getRows");
                        var userAmount = 0;
                        //累加
                        for (var i = 0; i < arr.length; i++) {
                            userAmount += arr[i].je;
                        }
                        $('#spxxMap').datagrid('appendRow', {
                            price: '<b>统计：</b>',
                            je: userAmount
                        });
                        //--------end------
                    }
                });
            }
        }
    });
});

function offThisWindows() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function exportFhMx() {
    window.location.href = pageContext + "/fhOrdersController/exportTxtFhmxByBigpackagecode?bigpackagecode=" + bigpackagecode;
}

function exportExcelFhMx() {
    window.location.href = pageContext + "/fhOrdersController/exportExcelFhmxByBigpackagecode?bigpackagecode=" + bigpackagecode;
}

/**
 * 页面导出指定表格的发货明细为.xlsx
 * @author 肖亮亮
 * @date 2017-12-28 09:43
 **/
function htmlExportFhMx() {
    var ordercode = getQueryString("ordercode");
    ChangeToTable();
    $(".exceltable").table2excel({
        exclude: ".noExl",//不导出的表格数据选择器，不导出的数据加class加上 noExl就可以了
        name: "Excel Document Name",
        filename: ordercode + "发货明细",
        fileext: ".xlsx",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });
}

/**
 * 页面导出指定表格的发货明细为.pdf
 * @author 肖亮亮
 * @date 2017-12-28 09:43
 **/
function htmlExportFhMxToPdf() {
    var ordercode = getQueryString("ordercode");
    ChangeToTable();
    $('.exceltable').tableExport({type:'pdf',escape:'false'});
    /*alert(111111);
    $(".exceltable").tableExport({
        exclude: ".noExl",//不导出的表格数据选择器，不导出的数据加class加上 noExl就可以了
        name: "Worksheet Name",
        filename: ordercode + "发货明细",
        fileext: ".excel",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });*/
}


function ChangeToTable() { //转换grid为table标签
    printData = $("#spxxMap");
    var tableString = '';
    var columns = printData.datagrid("options").columns; // 得到columns对象
    // 载入title
    if (typeof columns != 'undefined' && columns != '') {
        $(columns).each(function (index) {
            tableString += '\n<tr>';
            for (var i = 0; i < columns[index].length; ++i) {
                if (!columns[index][i].hidden) {
                    tableString += '<th style="width: 160px;height:20px;">' + columns[index][i].title + '</th>';
                }
            }
            tableString += '\n</tr>';
        });
    }
    // 载入内容
    var rows = printData.datagrid("getRows"); // 这段代码是获取当前页的所有行
    for (var i = 0; i < rows.length; ++i) {
        if (i == rows.length - 1) {
            rows[i].spmc = '';
            rows[i].spcode = '';
            rows[i].ys = '';
            rows[i].cm = '';
            rows[i].sl = '';
        }
        tableString += '<tr >' +
            '<td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].spmc + '</td><td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].spcode + '</td>' +
            '<td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].ys + '</td><td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].cm + '</td>' +
            '<td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].price + '</td><td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].je + '</td>' +
            '<td style="text-align:center;width: 160px;height:20px;font-size: 14; ">' + rows[i].sl + '</td>' +
            '</tr>'
    }
    $(".exceltable").html("");
    $(".exceltable").append(tableString);
}