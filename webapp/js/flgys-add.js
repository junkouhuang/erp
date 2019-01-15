var formData = function(){
	 return $('#addFlGysFrom').serializeJSON();
};

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 下午2:19:20
 * 模块名称:辅料供应商
 * 操作:生成编码
 *
 */
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