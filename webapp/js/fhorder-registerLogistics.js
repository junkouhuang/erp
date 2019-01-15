var fhID;
$(function () {
    // 加载物流信息
    requestBackEndGetLogistics();

    // 获取发货单id
    fhID = getQueryVariable("fhid");

    // 请求后台获取原有的登记物流信息
    requestBackEndGetRegisterLogisticsInfo(fhID);
});

// 请求后台获取物流信息
function requestBackEndGetLogistics(){
    $.ajax({
        url:pageContext + "/logisticsController/getLogisticsInfo",
        type:"get",
        dataType:"json",
        async:false,
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

    // 追加自提的选项
    //content += appendPickUpData();

    $("#logistics").append(content);
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

// 追加自提的选项
function appendPickUpData(){
    var content = "<span class='radio-box'>" +
    "<input type='radio' name='logisticsRadio' id='pickUp'>" +
    "<label for='radio-1'>自提</label>" +
        "</span>&emsp;&emsp;&emsp;&emsp;&emsp;";
    return content;
}

// 默认信息
var defaultInfo;
// 请求后台获取原有的登记物流信息
function requestBackEndGetRegisterLogisticsInfo(fhID){
    $.ajax({
        url:pageContext + "/fhOrdersController/getFhOrderLogisticsInfo",
        type:"post",
        dataType:"json",
        async:false,
        data:{"fhID":fhID},
        success:function (data) {
            if(data.success){
                // 获取到后台信息选择默认值
                defaultInfo = data.obj;
                defaultSelect(data.obj);
            }else{
                window.parent.location.reload();
            }
        }
    });
}

// 选择默认值
function defaultSelect(thisObj){
    // 添加物流单号
    $("#fhCode").html("当前发货单号："+thisObj.fhorder);

    // 默认的物流公司
    if("" != thisObj.company && null != thisObj.company && undefined != thisObj.company){
        var company = thisObj.company.substring(0, 2);
        var nameArry = getPapeAllLogisticsName();
        $.each(nameArry, function(index, item){
            var name = $(item).text().substring(0, 2);
            if(company == name){
                $(item).prev().attr("checked", "checked");
            }
        });
    }

    // 默认单号
    if("" != thisObj.code && null != thisObj.code && undefined != thisObj.code){
        // 如果是自提的单号，不能修改
        if("自提无需物流单号" == thisObj.code || "自提" == thisObj.company || 18 == thisObj.id){
            $("#code").val("自提无需物流单号");
            $("#code").attr("readonly", "true");
        }else{
            $("#code").val(thisObj.code);
        }
    }
}

// 点击输入物流单先判断是否已经选择物流公司
$("#code").click(function(){
    // 判断是否有选择物流公司
    var isSelect = $("#logistics").find("input[type='radio']:checked");
    if (isSelect.length == 0 || isSelect == null || isSelect == undefined){
        layer.msg('请选择物流公司后在输入物流单号', {time:3000});
        $("#code").attr("readonly", "true");
        return false;
    }
    /*// 获取当前id
    var thisID = $(isSelect).attr("id");
    var thisV = $(isSelect).val();
    if(thisID != 18 && thisV == ""){
        $("#code").val("");
        $("#code").removeAttr("readonly");
    }*/
});

// 当选择自提后物流单号不需要填写
$("#logistics").delegate("input","click",function(){
    var thisID = $(this).attr("id");
    if("pickUp" == thisID || thisID == 18){
        $("#code").val("自提无需物流单号");
        $("#code").attr("readonly", "true");
    }else {
        $("#code").val("");
        $("#code").removeAttr("readonly");
    }
});



// 登记
function register(){
    // 判断是否有选择物流公司
    var isSelect = $("#logistics").find("input[type='radio']:checked");
    if (isSelect.length == 0 || isSelect == null || isSelect == undefined){
        layer.msg('请选择物流公司', {time:3000});
        return false;
    }

    // 判断物流单号是否有输入
    var thisCode = $("#code").val();
    if("" == thisCode || null == thisCode || undefined == thisCode){
        layer.msg('请输入物物流单号', {time:3000});
        return false;
    }

    // 当前选中的物流公司名字
    var thisName = $("#logistics").find("input[type='radio']:checked").next("label").text();

    // 请求后台进行登记物流
    layer.open({
        content: "<p style='color: #FF0000'>发货单号:"+defaultInfo.fhorder+"</p>" +
        "<p style='color: #FF0000'>物流公司:"+thisName+"</p>" +
        "<p style='color: #FF0000'>物流单号:"+thisCode+"</p>"
        ,btn: ['确定登记', '取消']
        ,yes: function(index, layero){
            // 判断是否已经修改过
            if(("" != defaultInfo.company && null != defaultInfo.company && undefined != defaultInfo.company)
                && ("" != defaultInfo.code && null != defaultInfo.code && undefined != defaultInfo.code)){
                if (thisName.substring(0, 2) == defaultInfo.company.substring(0, 2) && thisCode == defaultInfo.code){
                    alert("登记成功");
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    return false;
                }
            }

            // 请求后台进行登记
            $.ajax({
                url:pageContext + "/fhOrdersController/registerLogistics",
                type:"POST",
                dataType:"json",
                async:true,
                data:{"fhID":fhID, "name":thisName, "code":thisCode},
                success:function (data) {
                    if(data.success){
                        alert(data.msg);
                        //window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }else{
                        alert(data.msg);
                        //window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }
                }
            });
        }
    });
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





