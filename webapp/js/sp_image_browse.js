$(function(){
	loadImage();
});


// 获取父页面请求参数
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}


// 加载图片
function loadImage(){
    var spID = getQueryVariable("spID");

    // 请求后台加载数据
	requestBackEndLoadData(spID);
}


// 删除图片
function deleteImage(thisObj){
    // 获取id
    var imageID = $(thisObj).attr("id");

    // 请求后台删除图片
    requestBackEndDetele(imageID);
}


// 请求后台加载数据
function requestBackEndLoadData(spID){
	$.ajax({
		url:pageContext+"/imageController/spImageBrowse",
        type:"GET",
		dataType:"json",
		data:{"spID":spID},
		async:false,
		success:function(resp){
			// 填充数据到页面
            fillPageData(resp);
		}
	});
}

// 请求后台删除
function requestBackEndDetele(imageID){
    $.ajax({
        url:pageContext+"/imageController/spImageDelete",
        type:"POST",
        dataType:"json",
        data:{"imageID":imageID},
        async:false,
        success:function(resp){
            if(resp.success){
                window.location.reload();
            }else{
                layer.msg(resp.msg, function(){});
            }
        }
    });
}

/*删除图片*/
function datadel(obj){
	var imageId = $(obj).attr("id");
	layer.confirm('确认删除吗？',function(index){
		$.ajax({
			url:pageContext+"/imageController/deleteImageByid",    
			dataType:"json",   
			async:true,
			data:{"id":imageId},    
			type:"post",  
			success:function(data){
				if(data.success){
					initImgList();
					layer.msg(data.msg);
				}else{
					if(data.obj != null){
						$(obj).parent().remove();
						alert(data.msg);
					}else{
						alert(data.msg);
					}
				}
			}
		});
		layer.close(index);
	})
}
// 填充数据到页面
function fillPageData(data){
    var content="";
    $.each(data, function(index, item){
        content += assembleData(item);
	});
    $("#tbody").html(content);
    $("#total").html(data.length);
}


// 组装数据
var top = true;
function assembleData(data) {
    var content = "";
    content+="<div style='width:103px;height:162px;float:left;margin: 10px;background: #dfdfe3; position: relative;'>";
    content += "<img style='width:103px;position:relative;top:6px;'src='http://119.23.48.31/"+data.path+"'>";
    content += "<a href='javascript:;' onclick='deleteImage(this)'  style='position:absolute;top:0;right: 0;' id="+data.id+"> <i class='glyphicon glyphicon-remove-sign'></i></a>";
    content += "<input type='text' maxlength='2' style='width:18px;height:17px;position:absolute;top:0;right: 13px;' value='"+data.number+"'/>";
    if(data.head == true && top){
        content += "<a href='javascript:;' style='color: #FF0000' class="+data.id+"><i  class='glyphicon glyphicon-flag'></i></a>";
        top = false;
    }else{
        content += "<a href='javascript:;' onclick='changeHead(this)' style='color:#C0C0C0' class="+data.id+"><i class='glyphicon glyphicon-flag'></i></a>";
    }
    content += "</div>";
    return content;
}

// 更改图片序号
var originalValue;
$("#tbody").delegate("input","focus",function(){
    originalValue = $(this).val();
});
$("#tbody").delegate("input","blur",function(){
    var thisNumber =  $(this).val();
    if(thisNumber == 0 || thisNumber == null || thisNumber == '' || thisNumber == undefined){
        $(this).val(originalValue);
        return false;
    }
    if(thisNumber == originalValue){
        return false;
    }

    // 获取当前图片id
    var imageID = getImageID(this);

    // 请求后台进行改变序号
    requestBackEndUpdateNumber(imageID, thisNumber);
});
$("#tbody").delegate("input","keyup",function(){
    $(this).val($(this).val().replace(/[^\d]/g,""));
});


// 请求后台更新序号
function requestBackEndUpdateNumber(imageID, newNumber){
    $.ajax({
        url:pageContext+"/imageController/changeImageNumber",
        type:"POST",
        dataType:"json",
        data:{"imageID":imageID, "newNumber":newNumber},
        async:false,
        success:function(resp){
            if(!resp.success){
                layer.msg(resp.msg, function(){});
            }
        }
    });
}


// 改变首图
function changeHead(thisObj){
    // 或当前图片id
    var imageID = $(thisObj).attr("class");

    // 请求后台进行修改首图
    requestBackEndUpdateHead(imageID);
}


// 请求后台修改首图
function requestBackEndUpdateHead(imageID){
    $.ajax({
        url:pageContext+"/imageController/changeImageHead",
        type:"POST",
        dataType:"json",
        data:{"imageID":imageID},
        async:false,
        success:function(resp){
            if(resp.success){
                // 互换页面的首图位置
                swapHeadPosition(resp.obj, imageID);
            }else{
                layer.msg(resp.msg, function(){});
            }
        }
    });
}


// 互换页面的首图位置
function swapHeadPosition(id, thisID){
    // 把原来的首图取消
    $("a[class='"+id+"']").attr("onclick", "changeHead(this)");
    $("a[class='"+id+"']").css("color", "#C0C0C0");

    // 当前点击的变为首图
    $("a[class='"+thisID+"']").removeAttr("onclick");;
    $("a[class='"+thisID+"']").css("color", "#FF0000");
}

// 获取当前图片id
function getImageID(thisObj){
    var thisImageID = $(thisObj).prev("a").attr("id");
    return thisImageID;
}



