/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 上午10:30:20
 * 模块名称:辅料信息新增界面
 * 操作:传参
 *
 */
var formData = function(){
	 return $('#flinfoAdd').serializeJSON();
};

/**
 * 作者:黄金高
 * 创建时间:2017-11-16 上午10:30:20
 * 模块名称:辅料信息新增界面
 * 操作:加载类别
 *
 */

$(function(){
	$.ajax({
		url:pageContext+"/flInfoController/getTypeMap",
		dataType:"json",
		async:true,
		type:"POST",   //请求方式
		success:function(data){
			var content="";
			content+="<option></option>";
			for(var key in data){
				content+="<option value="+key+" >"+data[key]+"</option>";
			}
			$("#type").append(content);
		},error:function(){
			
		}
	});
	
	/**
	 * 
	 * 作者:黄金高
	 * 创建时间:2017-11-16 上午10:30:20
	 * 模块名称:辅料信息新增界面
	 * 操作:自动生成辅料编码
	 *
	 */
	
    $.ajax({
        url:pageContext+"/codeRuleController/getFlCode",
        dataType:"json",
        async:true,
        type:"POST",   //请求方式
        success:function(data){
        	if(data.success){
                $("#flcode").val(data.obj);
            }else{
                layer.alert("请求异常！！");
			}
        },error:function(){
			layer.alert("请求失败！！");
        }
    });
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 上午10:30:20
 * 模块名称:辅料信息新增界面
 * 操作:表单校验
 *
 */

$(function(){
	/**
	 * 价格校验
	 * (^([1-9]{0,3})(\.\d{0,1})?$)|(^([1-9]{0,1})(\.\d{0,3})?$)|(^([1-9]{0,2})(\.\d{0,2})?$)|(^([1-9]{0,4})?$)
	 * 只能输入四位正整数并且不以0开头
	 */
	var regPrice= /(^([0-9]{0,4})?$)|(^([0-9]{1}[0-9]{0,3})?$)/;
	var temp;
	$("#sellprice").bind("keyup",function(){
		if(regPrice.test($(this).val())){
			temp=$(this).val();
		}else{
			$(this).val(temp);
			}
	});
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 上午10:30:20
 * 模块名称:辅料信息新增界面
 * 操作:生成条码
 *
 */

$(function(){
	$("#sellprice").keyup(function(){
		getBarCode();
	});
	$("#type").bind("change",function () {  
		getBarCode();
	});
	$("#currency").bind("change",function () {  
		getBarCode();
	});
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 上午10:30:20
 * 模块名称:辅料信息新增界面
 * 操作:获取条码
 *
 */

function getBarCode(){
	var type=$("#type").find("option:selected").val();
	var sellprice=$("#sellprice").val();
	var dw=$("#currency").find("option:selected").val();//单位：元角分
	if(!type==''){
		if(!sellprice==''){
			$.ajax({
			    	url:pageContext+"/codeRuleController/getFlBarCode",
				  	type:"post",
				 	data: {"type":type,"sellprice":sellprice,"dw":dw},  
				  	dataType:"json",
				  	async:false,  
				    cache:false,
			    	success:function(data){
			    		$("#barcode").val(data.obj);
			    		if(!data.success){
			    			layer.alert("请求失败！！");
			    		}
			 	    	},error:function(){
			 	    		layer.alert("请求失败！！");
			 	    	}
				});		
		}else{
			$("#barcode").val("");
		}
	}else{
		$("#barcode").val("");
	}
}
