var topIndex = 0;
$(function () {
    $("#fhinfo-tb").datagrid({
        columns:[[
            {field:'top',title:'',width:80,align:'center',hidden:'true'},
            {field:'ordercode',title:'发货单号',width:150,align:'center'},
            {field:'printtime',title:'发货时间',width:150,align:'center'},
            {field:'mdcode',title:'店号',width:50,align:'center'},
            {field:'mdmc',title:'店名',width:220,align:'center'},
            {field:'spcode',title:'款号',width:120,align:'center'},
            {field:'mxcode',title:'条码',width:150,align:'center'},
            {field:'spmc',title:'商品名称',width:220,align:'center'},
            {field:'tradename',title:'品牌商',width:100,align:'center'},
            {field:'whsname',title:'发货仓库',width:80,align:'center'},
            {field:'fhsl',title:'发货数量',width:70,align:'center'}
        ]]
    });
    loadTradeinfo();
    loadWhsinfo();
    loadStoreInfos();
});
function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="0">全部</option>';
            for (var i = 0; i < data.length; i++) {
                tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
            }
            $('#fhtradeid').append(tradeContent);
            $('#fhtradeid').combobox();
        }
    });
}

function loadStoreInfos() {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
}

function loadWhsinfo() {
    var tradeContent = '<option value="0">全部</option>';
    tradeContent += "<option value='1'>石岩</option>";
    tradeContent += "<option value='2'>蛇口</option>";
    tradeContent += "<option value='3'>凤岗</option>";
    $('#whsid').append(tradeContent);
    $('#whsid').combobox();
}

function getFhinfo(){
    var spcode = $("#spcode").val();
    var mxcode = $("#mxcode").val();
    var fhtradeid = $("#fhtradeid").val();
    var whsid = $("#whsid").val();
    var storeid = $("#storeid").val();
    if(spcode == "" && mxcode == ""){
        layer.msg("款号,条码至少有一个不为空检索...");
        return;
    }
    if(whsid == 0)whsid="";
    if(fhtradeid == 0)fhtradeid="";
    if(storeid == 0)storeid="";
    var postdata = $('#selectForm').serializeJSON();
    $('#fhinfo-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/spxxController/getProductFhInfoBySelective",
        type: "POST",
        data:JSON.stringify({"mxcode":mxcode,"spcode":spcode,"fhtradeid":fhtradeid,"whsid":whsid,"storeid":storeid}),
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                var rows = data.obj;
                var fhtotal = 0;
                for (var i = 0; i < rows.length; i++) {
                    $("#fhinfo-tb").datagrid("appendRow",{
                        top: ++topIndex,
                        mdcode: rows[i].mdcode,
                        mdmc: rows[i].mdmc,
                        spcode: rows[i].spcode,
                        mxcode: rows[i].mxcode,
                        spmc: rows[i].spmc,
                        tradename: rows[i].tradename,
                        whsname: rows[i].whsname,
                        fhsl: rows[i].fhsl,
                        ordercode: rows[i].ordercode,
                        printtime: rows[i].printtime
                    });
                    fhtotal += rows[i].fhsl;
                }
                $("#fhinfo-tb").datagrid("appendRow",{
                    spmc: '统计：',
                    top: ++topIndex,
                    fhsl: fhtotal
                });
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            $('#fhinfo-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#fhinfo-tb').datagrid('selectRow', editIndex);
        }
    }
}
var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#fhinfo-tb').datagrid('validateRow', editIndex)){
        var ed = $('#fhinfo-tb').datagrid('getEditor', {index:editIndex,field:'productid'});
        $('#fhinfo-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

$(function(){
    $('#mxcode').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            getFhinfo();
        }
    });
    $('#spcode').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            getFhinfo();
        }
    });
    $('#fhtradeid').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            getFhinfo();
        }
    });
    $('#whsid').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            getFhinfo();
        }
    });
    $('#storeid').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            getFhinfo();
        }
    });
});