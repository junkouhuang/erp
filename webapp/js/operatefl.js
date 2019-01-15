/**
*本功能数据加载是采用modelAndView方式
*
*/
//1.创建一个字符串对象
var idBuffer =new Array();
function getId(){
	var rows=$("#easyui-datagrid").datagrid("getRows");
	idBuffer.length=0;//清空一下
	for(var i=0;i<rows.length;i++)
	{
		var flid=rows[i].flid;
		if(flid != '' && flid != undefined){
			idBuffer.push(flid) ;//获取url传参的数值
		}
	}
};
/**
 * easyui 隐藏列
 */
$(function(){
	$('#easyui-datagrid').datagrid('hideColumn','flid');
});
/**
 * 封装参数,传递给首页面
 */
var flgsyxx=new Array();
var relationList=new Array();
var formData = function(){
		var rows = $("#easyui-datagrid").datagrid("getRows"); 
		var flgysid=$("#flgysid").val();
		relationList.length=0; //清空，以防重复追加
		for(var i=0;i<rows.length;i++)
		{
			relationList.push({"flid": rows[i].flid,"flgysid":flgysid});
		}
		//封装为一个json对象
		var flgysmc=$("#flgysmc").val();
		var flgyscode=$("#flgyscode").val();
		var contacts=$("#contacts").val();
		var wx=$("#wx").val();
		var addr=$("#addr").val();
		var type=$(".type:checked").val();
		var tel=$("#tel").val();
		var tel2=$("#tel2").val();
		var qq=$("#qq").val();
		var province=$("#province").find("option:selected").val();
		var city=$("#city").find("option:selected").val();
		 flgsyxx={"flgysmc":flgysmc,"flgyscode":flgyscode,"contacts":contacts,"wx":wx,"addr":addr,"type":type,"tel":tel,"tel2":tel2,"qq":qq,"province":province,"city":city,"relationList":relationList}
		return flgsyxx;
};
//加载省市
$(function(){
	var contentP = "<option value='"+$('#provinceData').attr('class')+"'selected = selected>"+$('#provinceData').attr('class')+"</option>";
	var contentC = "<option value='"+$('#cityData').attr('class')+"'selected = selected>"+$('#cityData').attr('class')+"</option>";
	$("#province").append(contentP);
	$("#city").append(contentC);
});
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:30:29
 * 模块名称:辅料供应商
 * 操作:关联辅料
 *
 */
function relevancefl(){
	getId();//调用获取easyui-datagrid已经存在的行的id
	parent.layer.open({
		type: 2,
		title: '辅料供应商辅料关联界面',
	    shadeClose: false,
	    shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
	    area: ['700px', '450px'], //宽高
	    btn: ['确定', '取消'], //可以无限个按钮
		content: pageContext+"/relevancefl?flgysid="+$("#flgysid").val()+"&idBuffer="+idBuffer,
		 btn1: function(index, layero){//按钮【确定】的执行的函数
			 var posData = $(layero).find("iframe")[0].contentWindow.formData();
			 //往easyui datagrid追加行
			 for(var i=0;i<posData.length;i++){
					$("#easyui-datagrid").datagrid("appendRow",{
							flid : posData[i].flid,
							categroymc :posData[i].categroymc,
							flcode : posData[i].flcode,
							gunge : posData[i].gunge,
							dw : posData[i].dw,
							barcode : posData[i].barcode,
							sellprice : posData[i].sellprice
			         });
				 }
			  layer.close(index); 
	    	  } ,btn2: function(index, layero){
	    	    //按钮【取消】的回调
	    		  layer.close(index); 
	    	  }
	});
};
/**
 * 移除
 * 作者:黄金高
 * 创建时间:2017-11-29 上午11:02:03
 * 模块名称:
 * 操作:移除
 *
 */
function removefl(){
	var row = $('#easyui-datagrid').datagrid('getSelected');
	if (row!=null) {
	         var rowIndex = $('#easyui-datagrid').datagrid('getRowIndex', row);
	         $('#easyui-datagrid').datagrid('deleteRow', rowIndex);  
	 }else{
		 layer.msg("请选择要移除的行！",function(){});
	 }
}
//生成编码
function createCode(){
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
}
