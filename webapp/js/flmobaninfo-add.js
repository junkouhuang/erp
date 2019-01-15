/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:往父iframe传递参数
 *
 */

var idBuffer =new Array();

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:往父iframe传递参数
 *
 */
var formData = function(){
	//保存datagrid数据
	$('#dg').datagrid('acceptChanges');//更新获取数据
	var bookCount=$("#dg").datagrid("getRows");
	var datalist= new Array();  
	var jspArray=new Array();
	for (var i in bookCount) {  
		var flid=bookCount[i].flid;
		datalist.push({"flid": flid});   
	  } 
	 jspArray=new Array();
	 jspArray = { // 创建一个对象
			datalist:datalist,
			mobanmc:$("#mobanmc").val(),
	};
	 return jspArray;
};

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:加载供应商
 *
 */
$(function(){
	$.ajax({
		url:pageContext+"/gysxxController/getGysxxList",
		dataType:"json",
		async:true,
		type:"POST",   //请求方式
		success:function(data){
			var content="";
			content+="<option></option>";
			for(var i=0;i<data.length;i++){
				content+="<option value="+data[i].id+">"+data[i].gysmc+"</option>";
			}
			$("#gysmc").append(content);
		},error:function(){
		}
	});
});


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:点击行事件
 *
 */
var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true;};
	if ($('#dg').datagrid('validateRow', editIndex)){
		var ed = $('#dg').datagrid('getEditor', {index:editIndex,field:'productid'});
		var productname = $(ed.target).combobox('getText');
		$('#dg').datagrid('getRows')[editIndex]['productname'] = productname;
		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickRow(index){
	if (editIndex != index){
		if (endEditing()){
			$('#dg').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
		}
	}
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:删除
 *
 */

var editIndex = undefined;
function removeit(){
	if($("#dg").datagrid("getSelections").length>0){
		if (editIndex == undefined){return;}
		$('#dg').datagrid('cancelEdit', editIndex)
		.datagrid('deleteRow', editIndex);
		editIndex = undefined;
	}else{
		layer.msg("请选中要删除的行",function(){});
	}
}



/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 上午9:58:21
 * 模块名称:輔料模板信息
 * 操作:辅料模板信息选择界面
 *
 */
function getId(){
	var rows=$("#dg").datagrid("getRows");
	idBuffer.length=0;//清空一下
	for(var i=0;i<rows.length;i++)
	{
		var flid=rows[i].flid;
		if(flid != '' && flid != undefined){
			idBuffer.push(flid) ;//获取url传参的数值
		}
	}
};
function addflmobaninfoselect(){
	getId();
	parent.layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.1, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flmobaninfo-add-flmoban?idBuffer="+idBuffer,
		btn:["确定","取消"],
		btn1:function(index, layero){
			  var posData = $(layero).find("iframe")[0].contentWindow.formData();
			  //初始化easyui datagrid(共用)
			  for(var k in posData){
				  $("#dg").datagrid("appendRow",{
					            //(列的值)
					  			flid:posData[k].id,
					  			categroymc:posData[k].categroymc,
					            flcode:posData[k].flcode,
					            gunge:posData[k].gunge,
					            dw:posData[k].dw
				  });
			  }
				//*****************easyui end******************
			   
		  },btn2:function(index){
				 layer.close(index);
			 }
	});
}

