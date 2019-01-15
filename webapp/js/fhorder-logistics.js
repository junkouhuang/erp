var fhID;
$(function () {
    // 加载物流信息
    requestBackEndGetLogistics();

    // 获取发货单id
    fhID = getQueryVariable("fhid");
});

// 请求后台获取物流信息
function requestBackEndGetLogistics(){
    $.ajax({
        url:pageContext + "/logisticsController/getLogisticsInfo",
        type:"get",
        dataType:"json",
        async:true,
        success:function (data) {
            if(data.success){
                // 加载数据到页面
                loadData(data.obj);
            }else{
                layer.msg(data.msg);
            }
        }
    });
}


// 加载数据
function loadData(data){
    var content = "";
    // 遍历数据
    $.each(data, function(index, item){
        content += packagingData(item);
        var a = index + 1;
        if(0 == a % 6){
            content += "</br>"
        }else{
            content += outputSpace(item.name.length);
        }
    });

    $("#logistics").html(content);
}

// 组装数据
function packagingData(data){
    var content =
        "<span class='radio-box'>" +
        "<input type='radio' id='"+data.id+"' name='logisticsRadio' tel='"+data.tel+"' code='"+data.code+"'>" +
        "<label for='radio-1'>"+data.name+"</label>" +
        "</span>";
    return content;
}


var id;
var name;
var tel;
var code;
// 点击单选框往下面的input里添加内容
$("#logistics").delegate("input","click",function(){
    id = getID();
    name = getName();
    tel = getTel();
    code = getCode();

    // 添加到修改框
    addModifyFrame();
});


// 添加内容到修改框
function addModifyFrame(){
    $("#logisticsID").val(id);
    $("#logisticsName").val(name);
    $("#logisticsTel").val(tel);
    $("#logisticsCode").val(code);
}

// 修改物流
function modifyLogistics(){
    // 判断内容是否有修改内容
    var thisID = getModifyID();
    var thisName = getModifyName();
    var thisTel = getModifyTel();
    var thisCode = getModifyCode();

    if((thisName == "" || thisName == null || thisName == undefined)
        && (thisTel == "" || thisTel == null || thisTel == undefined)
        && (thisCode == "" || thisCode == null || thisCode == undefined)){
        // 提示选择物流
        layer.msg('请选择要修改的物流', {time:3000});
        return false;
    }

    if(thisName == "" || thisName == null || thisName == undefined){
        layer.msg('物流名称不能为空', {time:3000});
        $("#logisticsName").val(name);
        return false;
    }

    if(thisCode == "" || thisCode == null || thisCode == undefined){
        layer.msg('物流编码不能为空', {time:3000});
        $("#logisticsCode").val(code);
        return false;
    }

    // 判断内容是否需要修改
    if(thisName == name && thisTel == tel && thisCode == code){
        layer.msg('没有修改', {time:3000});
        return false;
    }

    // 判断物流名称是否已经存在
    var isExistName = nameIsExist(thisName, getPapeAllLogisticsName());
    if(isExistName && thisName != name){
        layer.msg('物流名称已存在，请重新输入', {time:3000});
        return false;
    }
    // 判断物流编码是否已经存在
    var isExistCode = codeIsExist(thisCode, getPapeAllLogisticsCode());
    if(isExistCode && thisCode != code){
        layer.msg('物流编码已存在，请重新输入', {time:3000});
        return false;
    }

    layer.open({
        content: "<p style='color: #0e9aef'>修改前：</p><div>"+name+" - "+tel+" - "+ code +"</div><p style='color: #FF0000'>" +
        "修改后：</p><div>"+ thisName + " - " +thisTel+ " - " + thisCode+ "</div>"
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
            // 请求后台进行修改
            $.ajax({
                url:pageContext + "/logisticsController/modifyLogisticsInfo",
                type:"POST",
                dataType:"json",
                async:true,
                data:{"id":thisID, "name":thisName, "tel":thisTel, "code":thisCode},
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        layer.close(index);
                        window.location.reload();
                    }else{
                        layer.msg(data.msg);
                        layer.close(index);
                    }
                }
            });
        }
    });

}

// 添加物流
function addLogistics(){
    // 判断名称是否为空
    var name = getAddName();
    var code = getAddCode();
    if(name == "" || name == null || name == undefined){
        layer.msg('请输入物流名称', {time:3000});
        return false;
    }
    if(code == "" || code == null || code == undefined){
        layer.msg('请输入物流编码', {time:3000});
        return false;
    }
    var tel = getAddTel();

    // 判断物流名称是否已经存在
    var isExistName = nameIsExist(name, getPapeAllLogisticsName());
    if(isExistName){
        layer.msg('物流名称已存在，请重新输入', {time:3000});
        return false;
    }
    // 判断物流编码是否已经存在
    var isExistCode = codeIsExist(code, getPapeAllLogisticsCode());
    if(isExistCode){
        layer.msg('物流编码已存在，请重新输入', {time:3000});
        return false;
    }
    // 发送请求到后台新增物流信息
    layer.open({
        content: "<p style='color: #FF0000'>物流名称:"+name+"</p>" +
        "<p style='color: #FF0000'>联系电话:"+tel+"</p>" +
        "<p style='color: #FF0000'>物流编码:"+code+"</p>"
        ,btn: ['确定新增', '取消']
        ,yes: function(index, layero){
            // 请求后台进行新增
            $.ajax({
                url:pageContext + "/logisticsController/addLogistics",
                type:"POST",
                dataType:"json",
                async:true,
                data:{"name":name, "tel":tel, "code":code},
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        layer.close(index);
                        window.location.reload();
                    }else{
                        layer.msg(data.msg);
                        layer.close(index);
                    }
                }
            });
        }
    });
}

// 删除物流
function deleteLogistics(){
    var thisID = getID();
    var thisName = getName();
    var thisTel = getTel();
    var thisCode = getCode();

    if((thisName == "" || thisName == null || thisName == undefined)
        && (thisTel == "" || thisTel == null || thisTel == undefined)){
        // 提示选择物流
        layer.msg('请选择要删除的物流', {time:3000});
        return false;
    }

    layer.open({
        content: "<p style='color: #FF0000'>物流名称:"+thisName+"</p><p style='color: #FF0000'>联系电话:"+thisTel+"</p>"
        ,btn: ['确定删除', '取消']
        ,yes: function(index, layero){
            // 请求后台进行修改
            $.ajax({
                url:pageContext + "/logisticsController/deleteLogistics",
                type:"POST",
                dataType:"json",
                async:true,
                data:{"logisticsID":thisID},
                success:function (data) {
                    if(data.success){
                        layer.msg(data.msg);
                        layer.close(index);
                        window.location.reload();
                    }else{
                        layer.msg(data.msg);
                        layer.close(index);
                    }
                }
            });
        }
    });

}

// 打印物流
function printLogistics(){
    var logisticsID = getID();
    // 判断是否有选择物流
    var isSelect = $("#logistics").find("input[type='radio']:checked");
    if (isSelect.length == 0 || isSelect == null || isSelect == undefined){
        layer.msg('请选择物流', {time:3000});
        return false;
    }

    // 请求后台进行打印
    requestBackEndPrint();
}

// 请求后台进行打印
function requestBackEndPrint(){
    window.location.href =
        pageContext + "/logisticsController/printLogistics?fhID="+fhID+"&logisticsID="+id;
}

// 恢复修改
function recoverModify(){
    var isSelect = $("#logistics").find("input[type='radio']:checked");
    if (isSelect.length == 0 || isSelect == null || isSelect == undefined){
        id = null;
        name = null;
        tel = null;
        code = null;
    }else{
        $("#logisticsID").val(id);
        $("#logisticsName").val(name);
        $("#logisticsTel").val(tel);
        $("#logisticsCode").val(code);
    }
}

// 获取要修改的物流id
function getModifyID(){
    var id = $("#logisticsID").val();
    return id;
}

// 获取要修改的物流名称
function getModifyName(){
    var name = $("#logisticsName").val().trim();
    return name;
}

// 获取要修改的物流电话
function getModifyTel(){
    var tel = $("#logisticsTel").val().trim();
    return tel;
}

// 获取要修改的物流编码
function getModifyCode(){
    var code = $("#logisticsCode").val().trim();
    return code;
}

// 获取物流id
function getID(){
    var id = $("#logistics").find("input[type='radio']:checked").attr("id");
    return id;
}

// 获取物流名称
function getName(){
    var name = $("#logistics").find("input[type='radio']:checked").next("label").text();
    return name;
}

// 获取物流电话
function getTel(){
    var tel = $("#logistics").find("input[type='radio']:checked").attr("tel");
    return tel;
}

// 获取物流编码
function getCode(){
    var code = $("#logistics").find("input[type='radio']:checked").attr("code");
    return code;
}

// 获取添加的物流名称
function getAddName(){
    var name = $("#addLogisticsName").val().trim();
    return name;
}

// 获取添加的物流电话
function getAddTel(){
    var tel = $("#addLogisticsTel").val().trim();
    return tel;
}

// 获取添加的物流编码
function getAddCode(){
    var code = $("#addLogisticsCode").val().trim();
    return code;
}

// 获取页面上的所有物流名称
function getPapeAllLogisticsName(){
    var nameSet = $("#logistics").find("label");
    if(nameSet.length == 0 || nameSet == "" || nameSet == null || nameSet == undefined){
        return new Array();
    }
    return nameSet;
}

// 获取页面上的所有物流编码
function getPapeAllLogisticsCode(){
    var codeSet = $("#logistics").find("input[type='radio']");
    if(codeSet.length == 0 || codeSet == "" || codeSet == null || codeSet == undefined){
        return new Array();
    }
    console.info(codeSet);
    return codeSet;
}

// 判断名称是否存在
function nameIsExist(name, nameSet){
    var  isExist = false;
    $.each(nameSet, function(index, item){
        if(name == $(item).text()){
            isExist = true;
            return false;
        }
    });
    return isExist;
}

// 判断编码是否存在
function codeIsExist(code, codeSet){
    var  isExist = false;
    $.each(codeSet, function(index, item){
        if(code == $(item).attr("code")){
            isExist = true;
            return false;
        }
    });
    return isExist;
}

// 给予长度，输出相应的&nbsp；
function outputSpace(length) {
    var space = "";
    for(i = length; i < 7; i ++){
        space += "&emsp;";
    }
    return space;
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}





