//加载数据
var flgysContent = ''; //用于存放供应商
//1.创建一个字符串对象
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


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function(){
	flid=getQueryString("getQueryString");
	 $.ajax({
	    	url:pageContext+"/FlGysxxController/getFlGysxxInfo",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		flgysContent+="<option></option>";
				for(var i=0;i<data.length;i++){
					flgysContent+="<option value="+data[i].id+">"+data[i].flgysmc+"</option>";
				}
				$('#flgys').append(flgysContent);
	 	    }
		});	
	 $.ajax({
	    	url:pageContext+"/codeRuleController/getFlCgdanCode",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
    		$("#flcgdancode").val(data.obj);
    		if(!data.success){
    			layer.alert("请求失败！！");
    		}
 	    	},error:function(){
 	    		layer.alert("请求失败！！");
 	    	}
		});	
});

//辅料弹框
function openFl(){
	getId();//调用获取easyui-datagrid已经存在的行的id
    var flgysid = '';
    var obj=document.getElementById("flgys");
    for (i=0;i<obj.length;i++) {//下拉框的长度就是它的选项数.
        if (obj[i].selected== true ) {
            flgysid=obj[i].value;//获取当前选择项的值 .
        }
    }
	//获得当前选中的下拉框的value
	parent.layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flcgdan-add-fl?flgysid="+flgysid+"&idBuffer="+idBuffer,
		btn:['确定','取消'],
		btn1:function(index,layero){
			 var posData = $(layero).find("iframe")[0].contentWindow.formData();
			 for(var i in posData){
				 $("#dg").datagrid("appendRow",{
					 	flid : posData[i].id,
					 	flcode : posData[i].flcode,
						categroymc : posData[i].categroymc
		         });
			 }
			 layer.close(index);
		},cancel:function(index){
			layer.close(index);
		}
	});
}

var editIndex = undefined;
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-29 上午11:09:53
 * 模块名称:
 * 操作:删除
 *
 */

function removeit(){
	var row = $('#dg').datagrid('getSelected');
	if (row!=null) {
	         var rowIndex = $('#dg').datagrid('getRowIndex', row);
	         $('#dg').datagrid('deleteRow', rowIndex);  
	 }else{
		 layer.msg("请选择要移除的行！",function(){});
	 }
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-15 下午1:53:52
 * 模块名称:
 * 操作:获取父iframe传参
 *
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var flcgdanId;
$(function(){
	var flcgdanId = getQueryString("flcgdanId");
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-17 下午2:39:12
 * 模块名称:輔料採購單
 * 操作:傳參
 *
 */
var formData = function(){
	accept();
	var rows= $('#dg').datagrid('getRows');
	var flcgdancode=$("#flcgdancode").val();
	var flgysid=$("#flgys").find("option:selected").val()
	var datalist=new Array();
    if(flgysid!= ''){
    	if(rows.length>0){
    		for ( var i = 0; i < rows.length; i++) {  
    			if(rows[i].number == undefined){
    				layer.msg("请填写辅料数量!!",function(){});
    				return;
    			}else if(rows[i].sellprice == undefined){
    				layer.msg("请填写辅料价格!!",function(){});
    				return;
    			}
    			datalist.push({"flid":rows[i].flid,"number": rows[i].number,"sellprice":rows[i].sellprice});   
    		} 
    		var jsonArray = { // 创建一个对象
    				flcgdancode: flcgdancode,
    				flgysid:flgysid,
    				list:datalist
    		};
    		return jsonArray;
    	}else{
    		layer.msg("请添加模板记录",function(){});
    	}
	}else{
		layer.msg('请选择供应商！！',function(){});
	}
	
};
//保存datagrid数据
function accept(){
		$('#dg').datagrid('acceptChanges');
}
//easyui datagrid列编辑
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true;}
	if ($('#dg').datagrid('validateRow', editIndex)){
		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#dg').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}