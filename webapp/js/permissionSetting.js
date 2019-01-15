var groupid;
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-8 下午3:01:28
 * 模块名称:
 * 操作:得到所有的部门分组
 *
 */
$(function () {
    var content="<table><tr><td class='text-center'><h4>界面说明</h5></td></tr><tr><td><span class='text-danger'>左</span>：<span class='text-danger m-r-10'>部门</span><span class='text-info'>中</span>：<span class='text-info m-r-10'>菜单</span>  <span class='text-warning'>右</span>：<span class='text-warning'>权限</span></td></tr><tr><td>温馨提示：（<span class='text-danger'>部门</span>，<span class='text-info'>菜单</span>，<span class='text-warning'>权限</span>）鼠标右键可添加节点！！</td></tr></table>";
    layer.msg(content, {time:3000,  area: ['320px', '180px']});
    getWebmenugroups();
});
function getWebmenugroups(){
    $.ajax({
        url: pageContext + "/userController/getWebmenugroups",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var menugroups="";
            for (var i = 0; i < data.length; i++) {
                menugroups += "<li id="+data[i].id+"  style='height:33px;' data-toggle='tooltip' data-placement='right' title='右键新增部门'><a data-toggle='tab'  href='#"+data[i].id+"' class='pl-5 pr-0' onclick='selectWebMenuidListBygroupid("+data[i].id+")' style='overflow: hidden;text-overflow: ellipsis;' groupcode="+data[i].groupcode+" groupname="+data[i].groupname+">" + data[i].groupcode + "_" + data[i].groupname + "</li>";
            }
            $('#menugroupid').html(menugroups);
            $('#menugroupid li').eq(0).addClass("active");
        }
    });
}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-9 下午4:30:57
 * 模块名称:
 * 操作:根据groupid得到该组的所有权限
 *
 */
$(function(){
    //默认显示第一个部门的信息
    selectWebMenuidList(1);
});
function selectWebMenuidListBygroupid(o){
    groupid=o;
    selectWebMenuidList(groupid);
    selectPermission(groupid);
    g=groupid;
}
function selectWebMenuidList(groupid){
    $.ajax({
        url: pageContext + "/userController/selectWebMenuidListBygroupid?groupid="+groupid,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            $('#tt').tree('reload');
            $('#tt').tree({
                onLoadSuccess: function(){
                    /*if(data.length>0){
                        for(var i in data){
                            var node = $('#tt').tree('find',data[i]);
                            $('#tt').tree('check',node.target);
                        }
                    }else{

                    };*/
                    if(data.length>0){
                        for(var i in data){
                            var node = $('#tt').tree('find',data[i]);
                            if(node.parentid==undefined){

                            }else{
                                $('#tt').tree('check',node.target);
                            }
                        }
                    }else{

                    };
                }
            });
        }
    });
}
function selectPermission(groupid){
    $.ajax({
        url: pageContext + "/userController/selectPermissionIdBygroupid?groupid="+groupid,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data,index) {
            if(data.length>0){
                $("#dg").datagrid("clearChecked");
                var rows = $("#dg").datagrid("getRows");
                for(var i=0;i<rows.length;i++){
                    var rowId = rows[i].id;
                    var index = $("#dg").datagrid("getRowIndex",rows[i])
                    for(var j=0;j<data.length;j++){
                        if(rowId==data[j]){
                            $("#dg").datagrid("checkRow",index);
                        }
                    }
                }
            }else{
                $("#dg").datagrid("clearChecked");
            }
        }
    });
}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-8 下午3:01:28
 * 模块名称:
 * 操作:加载一级菜单
 *
 */
var rowIndexs;
$(function(){
    //部门组右键
    $("#menugroupid").contextmenu({
        width: 110, // width
        itemHeight: 30, // 菜单项height
        bgColor: "#333", // 背景颜色
        color: "#fff", // 字体颜色
        fontSize: 12, // 字体大小
        hoverBgColor: "#99CC66", // hover背景颜色
        menu: [{ // 菜单项
            text: "新增",
            callback: function() {
                layer.open({
                    type: 1,
                    title: '添加部门',
                    area: ['320px', '180px'],
                    shade: [0.8, '#393D49'],
                    btn: ["保存", "取消"],
                    content: '<form id="importBatchInfo" class="p10">' +
                    '<table>' +
                    '<tr><td class="pb-5">部门名称：</td><td class="pb-5"><input id="groupname" type="text" class="form-control" /></td></tr>' +
                    '<tr><td class="pb-5">部门编码：</td><td class="pb-5"><input id="groupcode" type="text" class="form-control"/></td></tr>' +
                    '</table>' +
                    '</form>',
                    yes: function (index) {
                        var groupname=$("#groupname").val();
                        var groupcode=$("#groupcode").val();
                        if (groupname == '') {
                            layer.msg("部门名称不能为空!!", function () {});
                            return;
                        }
                        if (groupcode == '') {
                            layer.msg("部门编码不能为空!!", function () {});
                            return;
                        }
                        //添加节点的ajax
                        $.ajax({
                            url: pageContext + "/userController/addWebmenugroups",
                            type: "post",
                            dataType: "json",
                            data:{"groupname":groupname,"groupcode":groupcode},
                            async: false,
                            cache: false,
                            success: function (data) {
                                if(data.success){
                                    layer.msg("添加成功！");
                                    getWebmenugroups();
                                    layer.close(index);
                                }
                            }
                        });

                    }, error: function (index) {
                        layer.close(index);
                    }
                });
            }
        },
            {
                text: "删除",
                callback: function() {
                    layer.confirm('您确定要删除部门：'+$("#menugroupid .active a").text()+'？', {
                        btn: ['确定','取消'] //按钮
                    }, function(index){
                        $.ajax({
                            url: pageContext + "/userController/deleteWebmenugroups",
                            type: "post",
                            dataType: "json",
                            data:{"id":$("#menugroupid .active").attr("id")},
                            async: false,
                            cache: false,
                            success: function (data) {
                                if(data.success){
                                    layer.msg("删除成功！");
                                    getWebmenugroups();
                                    layer.close(index);
                                }
                            }
                        });
                        layer.close(index);
                    }, function(index){
                        layer.close(index);
                    });
                }
            },
            {
                text: "修改",
                callback: function() {
                    layer.open({
                        type: 1,
                        title: '修改部门',
                        area: ['320px', '180px'],
                        shade: [0.8, '#393D49'],
                        btn: ["保存", "取消"],
                        content: '<form id="importBatchInfo" class="p10">' +
                        '<table>' +
                        '<tr><td class="pb-5">部门名称：</td><td class="pb-5"><input id="groupnametTXT" type="text" class="form-control" value='+$("#menugroupid .active a").attr("groupname")+'></td></tr>' +
                        '<tr><td class="pb-5">部门编码：</td><td class="pb-5"><input id="groupcodeTXT" type="text" class="form-control" value='+$("#menugroupid .active a").attr("groupcode")+'></td></tr>' +
                        '</table>' +
                        '</form>',
                        yes: function (index) {
                            var groupname=$("#groupnametTXT").val();
                            var groupcode=$("#groupcodeTXT").val();
                            if (groupname == '') {
                                layer.msg("部门名称不能为空!!", function () {});
                                return;
                            }
                            if (groupcode == '') {
                                layer.msg("部门编码不能为空!!", function () {});
                                return;
                            }
                            //添加节点的ajax
                            $.ajax({
                                url: pageContext + "/userController/UpdWebmenugroups",
                                type: "post",
                                dataType: "json",
                                data:{"id":$("#menugroupid .active").attr("id"),"groupname":groupname,"groupcode":groupcode},
                                async: false,
                                cache: false,
                                success: function (data) {
                                    if(data.success){
                                        layer.msg("修改成功！");
                                        getWebmenugroups();
                                        layer.close(index);
                                    }
                                }
                            });

                        }, error: function (index) {
                            layer.close(index);
                        }
                    });
                }
            }
        ]
    });
    //功能菜单右键
    $('#tt').tree({
        onContextMenu: function(e, node){
            if(node.children!=undefined){
                e.preventDefault();
                // select the node
                $('#tt').tree('select', node.target);
                // display context menu
                $('#mm').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
            if(node.parentid!=null){
                e.preventDefault();
                // select the node
                $('#tt').tree('select', node.target);
                // display context menu
                $('#del').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        }
    });
    //权限右键
    $('#dg').datagrid({
        onRowContextMenu: function(e, rowIndex, rowData) { //右键时触发事件
            rowIndexs=rowIndex;
            //三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
            e.preventDefault(); //阻止浏览器捕获右键事件
            // $(this).datagrid("clearSelections"); //取消所有选中项
            $(this).datagrid("selectRow", rowIndex); //根据索引选中该行
            /*$(this).datagrid({
            	 rowStyler:function (rowIndex) {
                 	return 'background-color:#ebf4ff;color:#5a6f8b'; //修改背景色
                 	},
            });//根据索引改变该行颜色
*/            $('#menu').menu('show', {
                //显示右键菜单
                left: e.pageX,//在鼠标点击处显示菜单
                top: e.pageY
            });
        }
    });
});
function getChecked(){
    var nodes = $('#tt').tree('getChecked');
    var s = '';
    for(var i=0; i<nodes.length; i++){
        if (s != '') s += ',';
        s += nodes[i].text;
    }
}

/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-9 上午9:01:32
 * 模块名称:加载权限
 *
 */
$(function(){
    $.ajax({
        url: pageContext + "/userController/selectPermissions",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            for(var i in data){
                $("#dg").datagrid("appendRow",{
                    id:data[i].id,
                    permissionname:data[i].permissionname,
                    permissioncode:data[i].permissioncode,
                });
            }
            selectPermission(1);
        }
    });
})
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-9 上午9:01:32
 * 模块名称:得到所有的权限
 *
 */
function permissions(){
    $.ajax({
        url: pageContext + "/userController/selectPermissions",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var webmenuChild='<ul class="nav nav-second-level">';
            for (var i = 0; i < data.length; i++) {
                if(data[i].parentid==grounpid){
                    webmenuChild+='<li>';
                    webmenuChild+= '<a class="J_menuItem" href="" data-index="0" onclick="permissions(this)">'+data[i].text+'</a>';
                    webmenuChild+= '</li>';
                }
                webmenuChild+='</li>';
            }
            webmenuChild+= '</ul></div></div>';
            $(o).append(webmenuChild);
        }
    });
}
/**
 * easyui datagrid列编辑
 */
var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#dg').datagrid('validateRow', editIndex)){
        var ed = $('#dg').datagrid('getEditor', {index:editIndex,field:'productid'});
        var productname = $(ed.target).combobox('getText');
        $('#dg').datagrid('getRows')[editIndex]['productname'] = productname;
        $('#dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            $('#dg').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#dg').datagrid('selectRow', editIndex);
        }
    }
}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-9 下午4:18:31
 * 模块名称:
 * 操作:添加节点(功能菜单)
 *
 */
function appendChildNode(){
    var tt=$('#tt').tree('getSelected');
    if(tt.id==null){
        layer.open({
            type: 1,
            title: '添加子节点',
            area: ['320px', '220px'],
            shade: [0.8, '#393D49'],
            btn: ["保存", "取消"],
            content: '<form id="importBatchInfo" class="p10">' +
            '<table>' +
            '<tr><td class="pb-5">文件名：</td><td class="pb-5"><input id="text" type="text" class="form-control" /></td></tr>' +
            '<tr><td class="pb-5">url路径：</td><td class="pb-5"><input id="url" type="text" class="form-control"/></td></tr>' +
            '<tr><td>图标：</td><td><input id="icon" type="text" class="form-control" value="fa fa-align-center"/></td></tr>' +
            '</table>' +
            '</form>',
            yes: function (index) {
                var text = $("#text").val();
                var url = $("#url").val();
                var icon = $("#icon").val();
                if (text == '') {
                    layer.msg("文件名不能为空!!", function () {});
                    return;
                }
                if (url == '') {
                    layer.msg("url路径不能为空!!", function () {});
                    return;
                }
                if (icon == '') {
                    layer.msg("图标不能为空!!", function () {});
                    return;
                }
                //添加节点的ajax
                $.ajax({
                    url: pageContext + "/userController/addWebMenu",
                    type: "post",
                    dataType: "json",
                    data:{"parentid":0,"url":url,"icon":icon,"text":text},
                    async: false,
                    cache: false,
                    success: function (data) {
                        if(data.success){
                            layer.msg("添加成功！");
                            $('#tt').tree('reload');
                            layer.close(index);
                        }
                    }
                });

            }, error: function (index) {
                layer.close(index);
            }
        });
    }
    if(tt.id!=null&&tt.parentid!=''){
        layer.open({
            type: 1,
            title: '添加子节点',
            area: ['320px', '180px'],
            shade: [0.8, '#393D49'],
            btn: ["确定", "取消"],
            content: '<form id="importBatchInfo" class="p10">' +
            '<table>' +
            '<tr><td class="pb-5">文件名：</td><td class="pb-5"><input id="text" type="text" class="form-control" /></td></tr>' +
            '<tr><td class="pb-5">url路径：</td><td class="pb-5"><input id="url" type="text" class="form-control"/></td></tr>' +
            '</table>' +
            '</form>',
            yes: function (index) {
                var text = $("#text").val();
                var url = $("#url").val();
                var icon = $("#icon").val();
                if (text == '') {
                    layer.msg("文件名不能为空!!", function () {});
                    return;
                }
                if (url == '') {
                    layer.msg("url路径不能为空!!", function () {});
                    return;
                }
                //添加节点的ajax
                $.ajax({
                    url: pageContext + "/userController/addWebMenu",
                    type: "post",
                    dataType: "json",
                    data:{"parentid":tt.id,"url":url,"text":text},
                    async: false,
                    cache: false,
                    success: function (data) {
                        if(data.success){
                            layer.msg("添加成功！");
                            $('#tt').tree('reload');
                            layer.close(index);
                        }
                    }
                });

            }, error: function (index) {
                layer.close(index);
            }
        });
    }

}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-9 下午4:18:31
 * 模块名称:
 * 操作:删除节点(功能菜单)
 *
 */
function removeChildNode(){
    var webmenu=$('#tt').tree('getSelected');
    layer.confirm('您确定要删除菜单：'+webmenu.text+'？', {
        btn: ['确定','取消'] //按钮
    }, function(index){
        $.ajax({
            url: pageContext + "/userController/deleteWebMenu",
            type: "post",
            dataType: "json",
            data:{"id":webmenu.id},
            async: false,
            cache: false,
            success: function (data) {
                if(data.success){
                    layer.msg("移除成功！");
                    $("#tt").tree("reload");
                }
            }
        });
    });
}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-12 上午12:12:12
 * 模块名称:
 * 操作:传参
 *
 */
var formData=function(){
    var obj=new Array();

    //var groupid=$("#menugroupid .active").attr("id");
    var webMenuList=new Array();
    var permissionList=new Array();

    var webmenu=$('#tt').tree('getChecked');
    for ( var i = 0; i < webmenu.length; i++) {
        var webmenuid=webmenu[i].id;
        var webmenuparentid=webmenu[i].parentid;
        if(webmenuid!=null){
            webMenuList.push( webmenuid);
            if(webmenu[i].parentid!=undefined){
                webMenuList.push( webmenuparentid);
            }
        }
    }

    var permission=$("#dg").datagrid("getSelections");
    for ( var i = 0; i < permission.length; i++) {
        var permissionid=permission[i].id;
        permissionList.push(permissionid);
    }
    var tmp = new Array();
    for(var i in webMenuList){
        //该元素在tmp内部不存在才允许追加
        if(tmp.indexOf(webMenuList[i])==-1){
            tmp.push(webMenuList[i]);
        }
    }
    //封装
    var obj = { // 创建一个对象
        groupid:groupid,
        webmenus:tmp,
        permissions:permissionList
    };
    return obj;
};
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-13 下午4:42:18
 * 模块名称:
 * 操作:权限模糊查询01(按钮)
 *
 */
function searchByPermissionName(){
    $.ajax({
        url: pageContext + "/userController/selectPermissionIdBygroupid?groupid="+groupid,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data,index) {
            permissionname();
            if(data.length>0){
                $("#dg").datagrid("clearChecked");
                var rows = $("#dg").datagrid("getRows");
                for(var i=0;i<rows.length;i++){
                    var rowId = rows[i].id;
                    for(var j=0;j<data.length;j++){
                        if(rowId==data[j]){
                            var index = $("#dg").datagrid("getRowIndex",rows[i])
                            $("#dg").datagrid("checkRow",index);
                        }
                    }
                }
            }
        }
    });

}
function permissionname(){
    var permissionname=$("#permissionname").val();
    $.ajax({
        url: pageContext + "/userController/selectPermissionsBypPermissionName",
        type: "post",
        dataType: "json",
        data:{"permissionname":permissionname},
        async: false,
        cache: false,
        success: function (data) {
            $("#dg").datagrid('loadData',[]);
            for(var i in data){
                $("#dg").datagrid("appendRow",{
                    id:data[i].id,
                    permissionname:data[i].permissionname,
                    permissioncode:data[i].permissioncode,
                });
            }
        }
    });
}
/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-13 下午4:42:18
 * 模块名称:
 * 操作:权限模糊查询02(回车)
 *
 */
$(function(){
    $("#permissionname").keydown(function(e){
        if(e.which == 13) {
            searchByPermissionName();
        }
    });
});
//新增权限
function addPermission(){
    layer.open({
        type: 1,
        title: '添加权限',
        area: ['320px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["保存", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td class="pb-5">权限名：</td><td class="pb-5"><input id="permissionnameTxT" type="text" class="form-control" /></td></tr>' +
        '<tr><td class="pb-5">权限code：</td><td class="pb-5"><input id="permissioncodeTxT" type="text" class="form-control"/></td></tr>' +
        '</table>' +
        '</form>',
        btn1: function (index) {
            var permissionname = $("#permissionnameTxT").val();
            var permissioncode = $("#permissioncodeTxT").val();
            if (permissionname == '') {
                layer.msg("权限名不能为空!!", function () {});
                return;
            }
            if (permissioncode == '') {
                layer.msg("权限code不能为空!!", function () {});
                return;
            }
            //添加节点的ajax
            $.ajax({
                url: pageContext + "/userController/addPermission",
                type: "post",
                dataType: "json",
                data:{"permissionname":permissionname,"permissioncode":permissioncode},
                async: false,
                cache: false,
                success: function (data) {
                    if(data.success){
                        layer.msg("添加成功！");
                        $("#dg").datagrid({
                            url:pageContext+"/userController/selectPermissions",
                            method: "post"
                        });
                        $("#dg").datagrid("reload");
                        $('#dg').datagrid({
                            onLoadSuccess:function(){
                                selectPermission(groupid)
                            },
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
//删除权限
function dekPermission(){
    var row=$("#dg").datagrid('getData').rows[rowIndexs];
    layer.confirm('您确定要删除权限：'+row.permissionname+'？', {
        btn: ['确定','取消'] //按钮
    }, function(index){
        $.ajax({
            url: pageContext + "/userController/delPermission",
            type: "post",
            dataType: "json",
            data:{"id":row.id},
            async: false,
            cache: false,
            success: function (data) {
                if(data.success){
                    layer.msg("删除成功！");
                    $("#dg").datagrid({
                        url:pageContext+"/userController/selectPermissions",
                        method: "post"
                    });
                    $("#dg").datagrid("reload");
                    $('#dg').datagrid({
                        onLoadSuccess:function(){
                            selectPermission(groupid)
                        },
                    });
                    layer.close(index);
                }
            }
        });
        layer.close(index);
    }, function(index){
        layer.close(index);
    });
}
//修改权限
function updPermission(){
    var row=$("#dg").datagrid('getData').rows[rowIndexs];
    layer.open({
        type: 1,
        title: '修改权限',
        area: ['320px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["保存", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td class="pb-5">权限名：</td><td class="pb-5"><input id="permissionnameTxT" type="text" class="form-control"  value='+row.permissionname+' /></td></tr>' +
        '<tr><td class="pb-5">权限code：</td><td class="pb-5"><input id="permissioncodeTxT" type="text" class="form-control" value='+row.permissioncode+' /></td></tr>' +
        '</table>' +
        '</form>',
        btn1: function (index) {
            var permissionname = $("#permissionnameTxT").val();
            var permissioncode = $("#permissioncodeTxT").val();
            if (permissionname == '') {
                layer.msg("权限名不能为空!!", function () {});
                return;
            }
            if (permissioncode == '') {
                layer.msg("权限code不能为空!!", function () {});
                return;
            }
            //添加节点的ajax
            $.ajax({
                url: pageContext + "/userController/updPermission",
                type: "post",
                dataType: "json",
                data:{id:row.id,"permissionname":permissionname,"permissioncode":permissioncode},
                async: false,
                cache: false,
                success: function (data) {
                    if(data.success){
                        layer.msg("修改成功！");
                        $("#dg").datagrid({
                            url:pageContext+"/userController/selectPermissions",
                            method: "post"
                        });
                        $("#dg").datagrid("reload");
                        $('#dg').datagrid({
                            onLoadSuccess:function(){
                                selectPermission(groupid)
                            },
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