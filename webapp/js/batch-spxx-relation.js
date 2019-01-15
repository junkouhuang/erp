var splist;
var spxxes;
var batchid;
var spprice;
var suited;
var relationSpides = new Array();
$(function(){
    var batchinfo = window.parent.getBatchInfo();
    batchid = batchinfo.id;
    spprice = batchinfo.spprice;
    suited = batchinfo.suited;
    $("#spprice").textbox('setValue',spprice);
    $("#batchname").textbox('setValue', batchinfo.batchname);
    loadModel();
    loadRelationSpxx();
});

function loadModel() {
    $("#spxx-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'spcode',title:'款号',width:110,align:'center'},
            {field:'spmc',title:'商品名称',width:260,align:'center'},
            {field:'dw',title:'单位',width:110,align:'center'},
            {field:'lbmc',title:'类别',width:160,align:'center'},
            {field:'price',title:'价格',width:100,align:'center'},
            {field:'createtime',title:'创建时间',width:160,align:'center'},
            {field:'opt',title:'操作',width:150,align:'center'}
        ]]
    });
    $("#spxx-relation").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'spcode',title:'款号',width:110,align:'center'},
            {field:'spmc',title:'商品名称',width:260,align:'center'},
            {field:'dw',title:'单位',width:110,align:'center'},
            {field:'lbmc',title:'类别',width:160,align:'center'},
            {field:'price',title:'价格',width:100,align:'center'},
            {field:'createtime',title:'创建时间',width:160,align:'center'},
            {field:'opt',title:'操作',width:150,align:'center'}
        ]]
    });
}

function loadSpxxByCode(){
    var spcode = $("#spcode").val();
    $('#spxx-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/spxxController/getProductInfoBySpCode/"+spcode,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                spxxes = data.obj;
                var index = 0;
                for (var i in spxxes) {
                    var isExists = false;
                    for(var indx in relationSpides) {
                        if (spxxes[i].id == relationSpides[indx]) {
                            isExists = true;
                        }
                    }
                    if(!isExists){
                        $("#spxx-tb").datagrid("appendRow",{
                            id: spxxes[i].id,
                            spcode: spxxes[i].spcode,
                            spmc: spxxes[i].spmc,
                            dw: spxxes[i].dw,
                            lbmc: spxxes[i].lbmc,
                            price: spxxes[i].price,
                            createtime: spxxes[i].createtime,
                            opt:'<a href="javascript:void(0)"  onclick="append('+index+')" class="glyphicon glyphicon-floppy-open">添加关联</a>'
                        });
                        ++index;
                    }
                }
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function loadRelationSpxx() {
    $('#spxx-relation').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/spxxController/getBatchRelationSpxxList/"+batchid,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            splist = data.obj;
            for (var i in splist) {
                relationSpides.push(splist[i].id);
                $("#spxx-relation").datagrid("appendRow", {
                    id: splist[i].id,
                    spcode: splist[i].spcode,
                    spmc: splist[i].spmc,
                    dw: splist[i].dw,
                    lbmc: splist[i].lbmc,
                    price: splist[i].price,
                    createtime: splist[i].createtime,
                    opt:'<a href="javascript:void(0)"  onclick="removeRelation('+i+')" class="mr-20 glyphicon glyphicon-remove">移除关联</a>'
                });
            }
        }
    });
}

function append(index) {
    var rows = $('#spxx-tb').datagrid('getRows');//获得所有行
    var row = rows[index];//根据index获得其中一行。
    if(row.price != spprice && !suited){
        layer.msg("款号与批次不同价！！",function(){});
        return;
    }
    $.ajax({
        url: pageContext + "/spxxController/appendBatchSpUnionInfo/"+batchid+"/"+row.id,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            layer.alert(data.msg);
            if(data.success){
                relationSpides.length = 0;
                loadRelationSpxx();
                loadSpxxByCode();
            }
        }
    });
}

function removeRelation(index) {
    var rows = $('#spxx-relation').datagrid('getRows');//获得所有行
    var row = rows[index];//根据index获得其中一行。
    $.ajax({
        url: pageContext + "/spxxController/removeBatchSpUnionInfo/"+batchid+"/"+row.id,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            layer.alert(data.msg);
            if(data.success){
                relationSpides.length = 0;
                loadRelationSpxx();
                loadSpxxByCode();
            }
        }
    });
}