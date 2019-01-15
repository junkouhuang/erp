/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-18 上午9:26:28
 * 模块名称:辅料模板信息界面
 * 操作:往父iframe传递参数
 *
 */

var idBuffer = '';

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 上午11:28:18
 * 模块名称:辅料模板信息
 * 操作:往父iframe传递参数
 *
 */
var formData = function(){
	var bookCount=$("#dg").datagrid("getRows");
	var datalist= new Array();  
	var jspArray=new Array();
	for (var i in bookCount) {  
		var flid=bookCount[i].flid;
		var id=bookCount[i].id;
		datalist.push({"id": id,"flid": flid});   
	  } 
	 jspArray=new Array();
	 jspArray = { // 创建一个对象
			datalist:datalist,
			mobanmc:$("#mobanmc").val(),
	};
	accept();
	 return jspArray;
};

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 下午12:04:34
 * 模块名称:辅料模板信息修改界面
 * 操作:保存datagrid数据
 *
 */
function accept(){
		$('#dg').datagrid('acceptChanges');
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var flmbId;
$(function(){
     flmbId = getQueryString("flmbId");
	 $.ajax({
	    	url:pageContext+"/flmobanController/echoFlmoban",
		  	type:"post",
		  	dataType:"json",
		  	data:{"id":flmbId},
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		$("#mobanmc").val(data.mobanmc);
				for( var i=0;i<data.flinfoList.length;i++){
					 $("#dg").datagrid("appendRow",{
				            //(列的值)
					        id:data.flinfoList[i].flflmobanid,
					        flid:data.flinfoList[i].id,
				  			categroymc:data.flinfoList[i].categroymc,
				            flcode:data.flinfoList[i].flcode,
				            gunge:data.flinfoList[i].gunge,
				            dw:data.flinfoList[i].dw
					 });
				}
	 	    }
		});	
});

//新增修改删除
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

var idBuffer =new Array();
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

/**
 * 
 *
 * 作者:黄金高
 * 创建时间:2017-11-13 上午10:47:32
 * 模块名称:
 * 操作:辅料
 *
 */
function addflmobaninfoselect(){
	getId();
	parent.layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flmobaninfo-upd-flmoban?idBuffer="+idBuffer,
		btn:["确定","取消"],
		btn1:function(index,layero){
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
			     //关闭当前弹出层
			  	layer.close(index);
				//*****************easyui end******************
		},btn2:function(index){
			layer.close(index);
		}
	});
}


/**
 * 
 *
 * 作者:黄金高
 * 创建时间:2017-11-13 上午10:46:54
 * 模块名称:
 * 操作:删除
 *
 */

//删除
var editIndex = undefined;
function removeit(){
	if($("#dg").datagrid("getSelections").length>0){
		if (editIndex == undefined){return;}
		$('#dg').datagrid('cancelEdit', editIndex)
		.datagrid('deleteRow', editIndex);
		editIndex = undefined;
	}else{
		layer.msg("请选中要删除的行！",function(){});
	}
}
