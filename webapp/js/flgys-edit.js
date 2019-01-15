var formData = function(){
	 return $('#flGys_editFrom').serializeJSON();
};	
//加载供应商
$(function(){
	var id=$("body",parent.document).find("#flgystable").find("input[type='checkbox']:checked").eq(0).val();
	$.ajax({
		url:pageContext+"/FlGysxxController/editInfo?id="+id,
		dataType:"json",
		async:true,
		type:"POST",   //请求方式
		success:function(data){
			var contentP = "<option selected = selected value="+data.province+">"+data.province+"</option>";
			var contentC = "<option selected = selected value="+data.city+">"+data.city+"</option>";
			$("#id").val(data.id);
			$("#flgysmc").val(data.flgysmc);
			$("#flgyscode").val(data.flgyscode);
			$("#contacts").val(data.contacts);
			$("#addr").val(data.addr);
			$("#province").append(contentP);
			$("#city").append(contentC);
			if(data.type == '厂家'){
				$("#radio-2").attr("checked", true);
			}else{
				$("#radio-1").attr("checked", true);
			}
			$("#qq").val(data.qq);
			$("#wx").val(data.wx);
			$("#tel").val(data.tel);
			$("#tel2").val(data.tel2);},error:function(){
		}
	});
});
//生成编码
$(function(){
	$("#province,#city").bind("change",function(){
		var province=$("#province").find("option:selected").val();
		var city=$("#city").find("option:selected").val();
		if(province!='' && city!=''){
			$.ajax({
				url:pageContext+"/codeRuleController/getFlgysCode",
				type:"post",
				dataType:"json",
				data:{"province":province,"city":city}, 
				async:false,  
				success:function(data,index){
					if(data.success){
						$("#flgyscode").val(data.obj);
					}
				}
			}); 
		}else{
			layer.msg("请选择省份和城市",function(){});
		}
	});
});