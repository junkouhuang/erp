//获取来自父级iframe传递过来的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var wxorderid;
var bigpackagecode;
var requesturl;
$(function () {
    wxorderid = getQueryString("wxorderid");
    if (wxorderid != null) {
        requesturl = pageContext + "/wxOrderController/getJhDetailByWxOrderid/" + wxorderid;
    }
});
var info = "";
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
                info = data;
                //=======加载表格的数据========
                var sumSl = 0;
                var je = 0;
                for (var i= 0;i<data.obj.length;i++) {
                    var total = 0;
                    for (var j =0;j<data.obj[i].fhOddList.length;j++) {
                        $("#spxxMap").datagrid("appendRow", {
                            spmc: data.obj[i].fhOddList[j].spmc,
                            spcode: data.obj[i].fhOddList[j].spcode,
                            ys: data.obj[i].fhOddList[j].ys,
                            cm: data.obj[i].fhOddList[j].cm,
                            price: data.obj[i].fhOddList[j].price,
                            je: data.obj[i].fhOddList[j].je,
                            sl: data.obj[i].fhOddList[j].sl
                        });
                        total += data.obj[i].fhOddList[j].sl;
                        je += data.obj[i].fhOddList[j].je;
                    }
                    $("#packageMap").datagrid("appendRow", {
                        packageid: data.obj[i].packageid,
                        packagecode: data.obj[i].packagecode,
                        len: total
                    });
                    sumSl += total;
                }
                $("#packageMap").datagrid("appendRow", {
                    packagecode:"统计：",
                    len: sumSl
                });
                $("#spxxMap").datagrid("appendRow", {
                    price: "统计：",
                    je: je,
                    sl: sumSl
                });
            }
        }
    });
    $("#packageMap").datagrid({
        onClickRow: function (index, row) {
            $("#spxxMap").datagrid('loadData', []);
            console.log(row);
            var sumSl = 0;
            var je = 0;
            for (var i= 0;i<info.obj.length;i++) {
                if(row.packageid == info.obj[i].packageid ){
                    var total = 0;
                    for (var j =0;j<info.obj[i].fhOddList.length;j++) {
                        $("#spxxMap").datagrid("appendRow", {
                            spmc: info.obj[i].fhOddList[j].spmc,
                            spcode: info.obj[i].fhOddList[j].spcode,
                            ys: info.obj[i].fhOddList[j].ys,
                            cm: info.obj[i].fhOddList[j].cm,
                            price: info.obj[i].fhOddList[j].price,
                            je: info.obj[i].fhOddList[j].je,
                            sl: info.obj[i].fhOddList[j].sl
                        });
                        total += info.obj[i].fhOddList[j].sl;
                        je += info.obj[i].fhOddList[j].je;
                    }
                    sumSl += total;
                }
            }
            $("#spxxMap").datagrid("appendRow", {
                price: "统计：",
                je: je,
                sl: sumSl
            });
        }
    })
});

function offThisWindows() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}