var brandid;
$('#brand-tb').datagrid({
    columns: [[
        {field: 'brandname', title: '品牌', width: 168},
        {field: 'id', title: '序号', width: 40,hidden:true}
    ]]
});

//显示选择品牌框
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
        $("#brand").val(row.brandname);
        brandid = row.id;
        layer.close(brandIframe);
    } else {
        layer.msg("请选择单位！");
    }
}