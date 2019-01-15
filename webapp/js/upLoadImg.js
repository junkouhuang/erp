//加载类别
$(function(){
	var id=$("body",parent.document).find(".bs-checkbox").find("input[type='checkbox']:checked").eq(0).val();
	$.ajax({
		url:pageContext+"/flInfoController/echoFlInfo",
		data:{"id":id},
		dataType:"json",
		async:true,
		type:"POST",   //请求方式
		success:function(data){
			var type =data.type;
			$("#flcode").val(data.flcode);
			$("#categroymc").val(data.categroymc);
			$("#gunge").val(data.gunge);
			$("#dw").val(data.dw);
			$("#sellprice").val(data.sellprice);
			$("#cz").val(data.cz);
			$("#ys").val(data.ys);
			$("#warnTotal").val(data.warntotal);
			$("#desc").val(data.bz);
			// ---------------------------------------
			$.ajax({
				url:pageContext+"/flInfoController/getTypeMap",
				dataType:"json",
				async:true,
				type:"POST",   //请求方式
				success:function(data){
					var content="";
					content+="<option></option>";
					for(var key in data){
						if(type == key){
							content+="<option selected='selected' value="+key+">"+data[key]+"</option>";
						}else{
							content+="<option value="+key+">"+data[key]+"</option>";
						}
					}
					$("#type").append(content);
				},error:function(){
					
				}
			});
		},error:function(){
			
		}
	});
});

//保存
function saveCgd(){
	var id=$("body",parent.document).find(".bs-checkbox").find("input[type='checkbox']:checked").eq(0).val();
	var flcode = $("#flcode").val();
	var categroymc = $("#categroymc").val();
	var type = '';
	var obj=document.getElementById("type");
    for (i=0;i<obj.length;i++) {//下拉框的长度就是它的选项数.
       if (obj[i].selected== true ) {
    	   type=obj[i].value;//获取当前选择项的值 .
       }
    }
	var gunge = $("#gunge").val();
	var dw = $("#dw").val();
	var sellprice = $("#sellprice").val();
	var cz = $("#cz").val();
	var ys = $("#ys").val();
	var warnTotal = $("#warnTotal").val();
	var desc = $("#desc").val();
	if(flcode == ''){
		layer.msg('编码不能为空！！',function(){});
	}else if(categroymc == ''){
		layer.msg('辅料名不能为空！！',function(){});
	}else if(type == ''){
		layer.msg('类型不能为空！！',function(){});
	}else if(gunge == ''){
		layer.msg('规格不能为空！！',function(){});
	}else if(dw == ''){
		layer.msg('单位不能为空！！',function(){});
	}else if(sellprice == ''){
		layer.msg('价格不能为空！！',function(){});
	}else if(warnTotal == ''){
		layer.msg('预警值不能为空！！',function(){});
	}else{
		 $.ajax({
		    	url:pageContext+"/flInfoController/updateFlInfo",
			  	type:"post",
			 	data: {"id":id,"flcode":flcode,"categroymc":categroymc,"type":type,"gunge":gunge,"dw":dw,"sellprice":sellprice,"cz":cz,"ys":ys,"warntotal":warnTotal,"bz":desc},  
			  	dataType:"json",
			  	async:false,  
			    cache:false,
		    	success:function(data){
		    		alert(data.msg);
		    		if(data.success){
		    			window.parent.location.reload();
		    		}
		 	    	},error:function(){
		 	    		alert("请求失败！！");
		 	    	}
			});		
	}
}


//取消关闭当前窗口
function offThisWindows(){
	var index=parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
