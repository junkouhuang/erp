$(function(){
	var cgid=$("body",parent.document).find(".bs-checkbox").find("input[type='checkbox']:checked").eq(0).val();
	$.ajax({
		url:pageContext+"/flFhorderController/echoFlfhorder?fhfhid="+cgid,
		dataType:"json",
		async:true,
		type:"POST",   //请求方式
		success:function(data){
			$("#flfhcode").val(data.flfhcode);
			$("#number").val(data.number);
			$("#sellprice").val(data.sellprice);
			$("#bz").val(data.bz);
			
			 $.ajax({
			    	url:pageContext+"/storeController/getStoreList",
				  	type:"post",
				  	dataType:"json",
				  	async:false,  
				    cache:false,
			    	success:function(data){
			    		var content="";
						content+="<option></option>";
						for(var i=0;i<data.length;i++){
							content+="<option code="+data[i].mdcode+" value="+data[i].id+">"+data[i].mdmc+"</option>";
						}
						$("#store").append(content);
			 	    }
				});	
			 $.ajax({
			    	url:pageContext+"/flInfoController/getFlInfoList",
				  	type:"post",
				  	dataType:"json",
				  	async:false,  
				    cache:false,
			    	success:function(data){
			    		var content="";
						content+="<option></option>";
						for(var i=0;i<data.length;i++){
							content+="<option value="+data[i].id+">"+data[i].categroymc+"</option>";
						}
						$("#fl").append(content);
			 	    }
				});	
		}
	
});
	//执行一个laydate实例
	laydate.render({
		  elem: '.time1',
		  type: 'datetime'
	});
});
//取消,关闭当前窗口
function offThisWindows(){
	var index=parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
