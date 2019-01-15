$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#userAccount_table").bootstrapTable('refresh', queryParams);
        }
    });
});
$(function () {
    laydate.render({
        elem: '#time',
        range: true
    });

    // 1.初始化Table
    table = $('#userAccount_table').bootstrapTable(
        { // 表格ID
            method: 'POST',
            dataType: 'json',
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            striped: true,// 是否显示行间隔色
            sidePagination: "server",// 分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/userController/selectPageList",
            singleSelect: true, // 仅允许单选
            // search: true,
            showColumns: true,
            showRefresh: true,
            pagination: true,
            queryParamsType: 'undefined',
            clickToSelect: true,
            queryParams: queryParams,
            responseHandler: rspHandler,
            minimumCountColumns: 2,
            pageNumber: 1, // 初始化加载第一页，默认第一页
            pageSize: 10, // 每页的记录行数（*）
            pageList: [10, 20, 50, 100], // 可供选择的每页的行数（*）
            idField: "id",
            // uniqueId: "id", //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [{
                checkbox: true
            },
                // 动态创建列名
                {
                    field: 'id',
                    title: 'ID',
                    align: 'center',
                    valign: 'middle',
                    display: 'hidden',
                    sortable: true
                }, {
                    field: 'userName',
                    title: '用户名',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'realName',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'zw',
                    title: '职务',
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
                    field: 'webmenugroup.groupname',
                    title: '部门',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'createtime',
                    title: '创建日期',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'lastlogintime',
                    title: '最近登录日期',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'email',
                    title: '邮箱',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }],
            onClickRow: function (row, $element) {
                flfhid = row.id;
            }, onCheck: function (row) {
            flfhid = row.id;
        }
        });
    $('#userAccount_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
});
var table = null;

function queryParams(params) {
    var postdata = $('#userAccountForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

// 得到查询的参数
function rspHandler(res) {
	console.log(res);
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

// 搜索功能
function LoadingDataListOrderRealItems() {
    $("#userAccount_table").bootstrapTable('refresh', queryParams);
}

/**
 * 用户信息新增
 * @author 肖亮亮
 * @date 2017-11-29 13:38
 * @param  * @param
 **/
function addUserAccount() {
    layer.open({
        type: 2,
        title: '新增用户信息',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['700px', '450px'],
        btn: ["确定", "取消"],
        content: 'userAccount-add',
        yes: function (index, layero) {//按钮【确定】的执行的函数
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(posData);
            if (posData.userName == '' || posData.userName == undefined) {
                layer.msg("用户名不能为空！！", function () {
                });
                return;
            } else if (posData.realName == '' || posData.realName == undefined) {
                layer.msg("姓名不能为空！！", function () {
                });
                return;
            } else if (posData.userPass == '' || posData.userPass == undefined) {
                layer.msg("密码不能为空！！", function () {
                });
                return;
            } else if (posData.menugroupid == '' || posData.menugroupid == undefined) {
                layer.msg("分组不能为空！！", function () {
                });
                return;
            } else if (posData.lxdh == '' || posData.lxdh == undefined) {
                layer.msg("联系电话不能为空！！", function () {
                });
                return;
            } else if (posData.zw == '' || posData.zw == undefined) {
                layer.msg("职务不能为空！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/userController/addUserAccount",
                type: "post",
                data: posData,
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        window.location.reload();
                    }
                }, error: function () {
                    alert("请求失败！！");
                }
            });
        }, btn2: function (index, layero) {
            //按钮【取消】的回调
            layer.close(index);
        }
    });
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-14 下午9:08:56
 * 模块名称:
 * 操作:设置权限
 *
 */
function permissionSetting(){
layer.open({
        type: 2,
        title: '权限设置',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['90%', '90%'],
        btn: ["确定", "取消"],
        content: 'permissionSetting',
        yes: function (index, layero) {//按钮【确定】的执行的函数
            var userPermissionControlModel = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(userPermissionControlModel);
            $.ajax({
                url: pageContext + "/userController/updateUserPermission",
                type: "post",
               data: JSON.stringify(userPermissionControlModel),
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                	layer.alert(data.msg);
                    if (data.success) {
                        window.location.reload();
                    }
                }, error: function () {
                    alert("请求失败！！");
                }
            });
        }, btn2: function (index, layero) {
            //按钮【取消】的回调
            layer.close(index);
        }
    });
}

/**
 * 移除用户
 * @author 肖亮亮
 * @date 2017-12-08 10:11
 * @param  * @param null
 * @return
 **/
function removeUserAccount() {
    var rows = $("#userAccount_table").bootstrapTable("getSelections");
    if (rows.length != 1) {
        layer.msg("请选择你要移除的用户！！", function () {
        });
        return;
    }
    layer.confirm('你确定要移除该用户吗？',
        {btn: ['确认', '取消']},
        function (index) {
            $.ajax({
                url: pageContext + "/userController/removeUserAccount",
                type: "post",
                data: {"userid": rows[0].id},
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        window.location.reload();
                    }
                }, error: function () {
                    alert("请求失败！！");
                }
            });
        }
    );
}