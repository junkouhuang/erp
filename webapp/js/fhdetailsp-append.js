var whsid;
var fhtradeid;
var fhid;
$(function(){
    var fhdinfos = window.parent.getFhorderInfos();
    whsid = fhdinfos.whsid;
    fhtradeid = fhdinfos.fhtradeid;
    fhid = fhdinfos.id;
    $("#ordercode").textbox('setValue',fhdinfos.ordercode);
    loadModel();
    loadFhdetailSpInfos();
});

function loadModel() {
    $("#selection-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'spcode',title:'款号',width:110,align:'center'},
            {field:'mxcode',title:'条码',width:120,align:'center'},
            {field:'spmc',title:'商品名称',width:260,align:'center'},
            {field:'ys',title:'颜色',width:100,align:'center'},
            {field:'cm',title:'尺码',width:100,align:'center'},
            {field:'sellprice',title:'价格',width:100,align:'center'},
            {field:'dw',title:'单位',width:100,align:'center'},
            {field:'lbmc',title:'类别',width:250,align:'center'},
            {field:'sl',title:'数量',width:150,align:'center'}
        ]]
    });
    $("#fhdetailsp-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'spcode',title:'款号',width:110,align:'center'},
            {field:'mxcode',title:'条码',width:120,align:'center'},
            {field:'spmc',title:'商品名称',width:260,align:'center'},
            {field:'ys',title:'颜色',width:100,align:'center'},
            {field:'cm',title:'尺码',width:100,align:'center'},
            {field:'sellprice',title:'销售价',width:100,align:'center'},
            {field:'pfprice',title:'折扣价',width:100,align:'center'},
            {field:'sl',title:'数量',width:100,align:'center'},
            {field:'pfje',title:'批发金额',width:150,align:'center'},
            {field:'sellje',title:'销售金额',width:150,align:'center'}
        ]]
    });
    loadTradeinfo();
    loadWhsinfo();
}

function loadSelectionInfos(){
    var postdata = $('#fhdetailSpAppendForm').serializeJSON();
    $('#selection-tb').datagrid('loadData',{total:0,rows:[]});
    postdata["whsid"]=whsid;
    postdata["returnkwtraderid"]=fhtradeid;
    $.ajax({
        url: pageContext + "/returnSpmxKwController/getReturnSpmxKwBySelective",
        data:JSON.stringify(postdata),
        contentType:'application/json;charset=UTF-8',
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                for(var i in data.obj){
                    $("#selection-tb").datagrid("appendRow",{
                        id: data.obj[i].id,
                        spcode: data.obj[i].spcode,
                        mxcode: data.obj[i].mxcode,
                        spmc: data.obj[i].spmc,
                        dw: data.obj[i].dw,
                        lbmc: data.obj[i].lbmc,
                        sellprice: data.obj[i].sellprice,
                        ys: data.obj[i].ys,
                        sl: data.obj[i].sl,
                        cm: data.obj[i].cm
                    });
                }
                $("#unicode").textbox('setValue',$("#mxcode").val());
                $('#sl').textbox('textbox').focus();
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function loadFhdetailSpInfos() {
    $('#fhdetailsp-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/fhOrdersController/getFhspdetailByFhid",
        data:{"fhid":fhid},
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var pfamount = 0;
            var sellamount = 0;
            var total = 0;
            for (var i in data) {
                $("#fhdetailsp-tb").datagrid("appendRow", {
                    id: data[i].id,
                    spcode: data[i].spcode,
                    mxcode: data[i].mxcode,
                    spmc: data[i].spmc,
                    sellprice: data[i].sellprice,
                    ys: data[i].ys,
                    cm: data[i].cm,
                    sl: data[i].sl,
                    pfprice: data[i].pfprice,
                    pfje: data[i].pfje,
                    sellje: data[i].sellje
                });
                pfamount += data[i].pfje;
                sellamount += data[i].sellje;
                total += data[i].sl;
            }
            $("#fhdetailsp-tb").datagrid("appendRow", {
                spcode: "汇总：",
                sl: total,
                pfje: pfamount,
                sellje: sellamount
            });
        }
    });
}

function append(index) {
    var rows = $('#spxx-tb').datagrid('getRows');//获得所有行
    var row = rows[index];//根据index获得其中一行。
    if(row.price != spprice){
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

function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value=""></option>';
            for (var i = 0; i < data.length; i++) {
                if(fhtradeid == data[i].id){
                    tradeContent += "<option selected='selected' value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }else{
                    tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }
            }
            $('#returnkwtraderid').append(tradeContent);
        }
    });
    $('#returnkwtraderid').combobox();
}

function loadWhsinfo() {
    $.ajax({
        url: pageContext + "/whsController/getWhsinfoList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var whsContent = '<option value="">请选择仓库</option>';
            for (var i = 0; i < data.length; i++) {
                if(whsid = data[i].id){
                    whsContent += "<option selected='selected' value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
                }else{
                    whsContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
                }
            }
            $('#whsid').append(whsContent);
        }
    });
    $('#whsid').combobox();
}
function addFhdetailsp() {
    var mxcode = $("#unicode").val();
    var sl = $("#sl").val();
    if(mxcode == ""){
        layer.msg("添加时，条码不能为空！",function(){});
        return;
    }
    if(sl <= 0){
        layer.msg("数量不能小于0！",function(){});
        return;
    }
    $.ajax({
        url: pageContext + "/fhdetailSpController/fhorderAppendFhdetailsp",
        data:{"mxcode":mxcode,"sl":sl,"fhid":fhid},
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                $("#sl").textbox('setValue',"");
                if( $("#unicode").val() == $("#mxcode").val()){
                    loadSelectionInfos();
                }
                $("#unicode").textbox('setValue',"");
                $("#mxcode").textbox('setValue',"");
                $('#mxcode').textbox('textbox').focus();
                loadFhdetailSpInfos();
            }else{
                layer.alert(data.msg);
            }
        }
    });
}
$(function(){
    $('#sl').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            addFhdetailsp();
        }
    });
    $('#mxcode').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            loadSelectionInfos();
        }
    });
});

function importFhdetailSpExcel() {
    layer.open({
        type: 2,
        title: "发货明细导入界面",
        shadeClose: true,
        shade: 0.8,
        area: ['500px', '300px'],
        content: "fhdetailsp-upload?fhid="+fhid,
        btn: ['确定', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            $(layero).find("iframe")[0].contentWindow.formData();
        }
    });
}