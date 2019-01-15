$(function () {
    init();
})
var initmdlx = "";
var initgdyid = "";
var initjbrid = "";
var inittradeid = "";
var initpeid = "";
var initctyname = "";
var initdlid = "";

function init() {
    var storeid = getQueryString("storeid");
    if(storeid != null && storeid != "" && storeid != undefined){
        $.ajax({
            url: pageContext + "/storeController/getStoreinfoByid/"+storeid,
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                console.log(data);
                $("#mdcode").textbox('setValue',data.mdcode);
                $("#mddz").textbox('setValue',data.mddz);
                $("#mdmc").textbox('setValue',data.mdmc);
                $("#dzqq").textbox('setValue',data.dzqq);
                $("#dzwx").textbox('setValue',data.dzwx);
                $("#jgjb").textbox('setValue',data.jgjb);
                initmdlx = data.mdlx;
                initgdyid = data.gdyid;
                initjbrid = data.jbrid;
                inittradeid = data.tradeid;
                initpeid = data.peid;
                initctyname = data.ctyname;
                initdlid = data.dlid;
                $("#jhjfsj").textbox('setValue',data.jhjfsj);
                $("#jhkdsj").textbox('setValue',data.jhkdsj);
                $("#jhyjsj").textbox('setValue',data.jhyjsj);
                $("#jjjb").textbox('setValue',data.jjjb);
                $("#jmf").textbox('setValue',data.jmf);
                $("#lxdh").textbox('setValue',data.lxdh);
                $("#qysj").textbox('setValue',data.qysj);
                $("#shdz").textbox('setValue',data.shdz);
                $("#shrname").textbox('setValue',data.shrname);
                $("#sjkdsj").textbox('setValue',data.sjkdsj);
                $("#sjskje").textbox('setValue',data.sjskje);
                $("#sjsksj").textbox('setValue',data.sjsksj);
                $("#sjyjje").textbox('setValue',data.sjyjje);
                $("#sjyjsj").textbox('setValue',data.sjyjsj);
                $("#xyed").textbox('setValue',data.xyed);
                $("#yj").textbox('setValue',data.yj);
                $("#yyejb").textbox('setValue',data.yyejb);
                $("#zcdjb").textbox('setValue',data.zcdjb);
                $("#mdmj").textbox('setValue',data.mdmj);
                $('#bossemail').textbox('setValue',data.bossemail);
                $("#bosslxdh").textbox('setValue',data.bosslxdh);
                $("#bosslxsj").textbox('setValue',data.bosslxsj);
                $("#bossqq").textbox('setValue',data.bossqq);
                $("#bosswx").textbox('setValue',data.bosswx);
                $("#boss").textbox('setValue',data.boss);
                $("#bz").textbox('setValue',data.bz);
                $("#cmjb").textbox('setValue',data.cmjb);
                $("#cwcode").textbox('setValue',data.cwcode);
                $("#dz").textbox('setValue',data.dz);
                $("#dzemail").textbox('setValue',data.dzemail);
                $("#wholerate").textbox('setValue',data.wholerate);
                $("#wholerate").textbox({disabled:true});
            }
        });
    }
    loadMdlxinfo();
    loadDlinfo();
    loadTradeinfo();
    loadProvince();
    loadYgxx();
    loadUserAccount();
}

function loadMdlxinfo() {
    $.ajax({
        url: pageContext + "/storeController/getStoreMdlxMap",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdlxContent = '<option></option>';
            for(var key in data){
                if(initmdlx == key){
                    mdlxContent += "<option selected value='" + key+ "'>" +data[key] + "</option>";
                }else{
                    mdlxContent += "<option value='" + key+ "'>" +data[key] + "</option>";
                }
            }
            $("#mdlx").append(mdlxContent);
            $('#mdlx').combobox();
        }
    });
}
//加载代理信息
function loadDlinfo() {
    $.ajax({
        url: pageContext + "/storeController/selectDlPojoList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var dlContent = '<option></option>';
            for (var i = 0; i < data.length; i++) {
                if(initdlid == data[i].id){
                    dlContent += "<option selected value='" + data[i].id + "' fzr='" + data[i].fzr + "'>" + data[i].qy + "_" + data[i].fzr + "</option>";
                }else{
                    dlContent += "<option value='" + data[i].id + "' fzr='" + data[i].fzr + "'>" + data[i].qy + "_" + data[i].fzr + "</option>";
                }
            }
            $("#dl").append(dlContent);
            $('#dl').combobox({
                onSelect: function (record) {
                    if (record.value != "") {
                        $("#dlid").val(record.value);
                        $("#dlmc").val(record.text)
                    } else {
                        $("#dlid").val("");
                        $("#dlmc").val("")
                    }
                }
            });
        }
    });
}

//加载品牌商信息
function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option></option>';
            for (var i = 0; i < data.length; i++) {
                if(data[i].id == inittradeid){
                    tradeContent += "<option selected value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }else{
                    tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }
            }
            $('#tradeid').append(tradeContent);
            $('#tradeid').combobox();
        }
    });
}

//加载省会信息
function loadProvince() {
    $.ajax({
        url: pageContext + "/storeController/getProvinceList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data);
            var provinceContent = '<option></option>';
            for (var i = 0; i < data.length; i++) {
                if(initpeid == data[i].id){
                    provinceContent += "<option selected value='" + data[i].id + "'>" + data[i].name + "</option>";
                }else{
                    provinceContent += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                }
            }
            console.log("provinceContent:"+provinceContent);
            $('#peid').append(provinceContent);
            $('#peid').combobox({
                onSelect: function (record) {
                    if (record.value != "") {
                        $.ajax({
                            url: pageContext + "/storeController/getCityListByProvinceid/" + record.value,
                            type: "post",
                            dataType: "json",
                            async: false,
                            cache: false,
                            success: function (data) {
                                var cityContent = '<option></option>';
                                for (var i = 0; i < data.length; i++) {
                                    if(initctyname == data[i].name){
                                        cityContent += "<option selected value='" + data[i].name + "'>" + data[i].name + "</option>";
                                    }else{
                                        cityContent += "<option value='" + data[i].name + "'>" + data[i].name + "</option>";
                                    }
                                }
                                $('#ctyname').html('');
                                $('#ctyname').append(cityContent);
                                $('#ctyname').combobox();
                                $("#pename").val(record.text);
                            }
                        });
                    } else {
                        $("#pename").val('');
                        $('#ctyname').html('');
                        $('#ctyname').combobox();
                    }
                }
            });
        }
    });
}

//加载员工信息
function loadYgxx() {
    $.ajax({
        url: pageContext + "/cgdetailController/getYgxxList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var ygxxContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                if(initjbrid == data[i].id){
                    ygxxContent += "<option selected value=" + data[i].id + ">" +data[i].ygxm +"</option>";
                }else{
                    ygxxContent += "<option value=" + data[i].id + ">" +data[i].ygxm +"</option>";
                }
            }
            $('#jbrid').append(ygxxContent);
            $('#jbrid').combobox({
                onSelect: function (record) {
                    if (record.value != "") {
                        $("#jbr").val(record.text)
                    } else {
                        $("#jbr").val("");
                    }
                }
            });
        }
    });
}

function loadUserAccount() {
    $.ajax({
        url: pageContext + "/userController/getUserAccountList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var gdyContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                if(initgdyid == data[i].id){
                    gdyContent += "<option selected value=" + data[i].id + ">" + data[i].realName +"</option>";
                }else{
                    gdyContent += "<option value=" + data[i].id + ">" + data[i].realName +"</option>";
                }
            }
            $('#gdyid').append(gdyContent);
            $('#gdyid').combobox({
                onSelect: function (record) {
                    if (record.value != "") {
                        $("#gdy").val(record.text)
                    } else {
                        $("#gdy").val("");
                    }
                }
            });
        },
        error: function (data) {
            if (data.status == 'undefined') {
                return;
            }
            switch (data.status) {
                case 400:
                    alert(data.status+": "+data.msg);
                    break;
                case 403:
                    // 未授权异常
                    alert("系统拒绝：您没有访问权限。");
                    break;

                case 404:
                    alert("您访问的资源不存在。");
                    break;
                default:
                    alert("error:" + data.status);
                    break;
            }
        }
    });
}

//序列化表单
function formData(){
    return $("#store-Form").serializeJSON();
};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};