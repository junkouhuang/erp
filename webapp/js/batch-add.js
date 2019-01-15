var batchlbid;
var suited = false;
var batchtradeid;
$(function(){
    var batchid = getQueryString("batchid");
    if(batchid != null && batchid != '' && batchid != undefined){
        //表示是进入了修改方法
        $.ajax({
            url:pageContext+"/spBatchController/getSpBatchInfoByBatchid/"+batchid,
            type:"post",
            dataType:"json",
            async:false,
            success:function(data){
                console.log(data);
                if(data.success){
                    $("#batchcode").val(data.obj.batchcode);
                    $("#batchname").val(data.obj.batchname);
                    $("#typename").val(data.obj.typename);
                    $("#dq").val(data.obj.dq);
                    $("#batchlx").val(data.obj.batchlx);
                    $("#jj").val(data.obj.jj);
                    $("#brand").val(data.obj.brand);
                    $("#batchlbmc").val(data.obj.batchlbmc);
                    batchlbid = data.obj.batchlbid;
                    $("#batchlbid").val(batchlbid);
                    $("#batchtype").val(data.obj.batchtype);
                    $("#spprice").val(data.obj.spprice);
                    $("#bz").val(data.obj.bz);
                    batchtradeid = data.obj.batchtradeid;
                    if(data.obj.suited){
                        $.each($("input[name='taozhuang']"),function(i,checkbox){
                            $(checkbox).attr("checked",true);
                        });
                    }
                }else{
                    layer.msg("error msg:"+data.msg);
                }
            }
        });
    }else{
        buildSpBatchCode();
    }
    $("#spprice").bind("keyup",function(){
        $("#spprice").val($("#spprice").val().replace(/[^\-?\d.]/g,''));
    });
    loadTradeinfo();
});
//生成批次号
function buildSpBatchCode(){
	$.ajax({
		url:pageContext+"/spBatchController/obtainSpBatchCode",
	  	type:"post",
	  	dataType:"json",
	  	async:false,  
	  	success:function(data){
	  		if(data.success){
	  			$("#batchcode").val(data.obj);
	  		}else{
	  			$("#batchcode").val(data.msg);
	  		}
	  	}
	});
}
//执行一个laydate实例
laydate.render({
	  elem: '#scsj',
	  type: 'datetime'
});

function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="" selected="selected">请选择品牌商</option>';
            for (var i = 0; i < data.length; i++) {
                if(batchtradeid == data[i].id){
                    tradeContent += "<option selected value='" + data[i].id + "'>" + data[i].tradename + "</option>";
                }else{
                    tradeContent += "<option value='" + data[i].id + "'>" + data[i].tradename + "</option>";
                }
            }
            $('#batchtradeid').append(tradeContent);
        }
    });
    $('#batchtradeid').combobox();
}


function selectSplb() {
    closeTree = layer.open({
        type: 1,
        title: '选择类别',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['220px', '350px'],
        content: $("#splbs"),
        btn: ['关闭'], //可以无限个按钮
        yes: function (index) {
            layer.close(index);
        }
    });
}

$("#splbs").tree({
    onClick: function (node) {
        if (node.children == '') {
            $("#batchlbmc").val(node.text);//赋值
            batchlbid = node.id;
            layer.close(closeTree);
        }
    }
});

function formData() {
    $("#batchlbid").val(batchlbid);
    suited = $("input[type='checkbox']").is(':checked');
    $("#suited").val(suited);
    return $('#addBatchFrom').serializeJSON();
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};