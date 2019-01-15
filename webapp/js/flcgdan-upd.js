/**
 * 傳遞參數，防止重複添加
 */
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
 * 作者:黄金高
 * 创建时间:2017-11-24 下午1:46:06
 * 模块名称:
 * 操作:獲取父iframe參數的方法
 *
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};

var audit="";//審核的需要傳遞的參數
var flcgdanId;//获取父级iframe的id
$(function(){
    flcgdanId = getQueryString("flcgdanId");
    audit = getQueryString("audit");
	var flgysid = '';
	 $.ajax({
	    	url:pageContext+"/flcgdanController/echoFlcgdan",
		  	type:"post",
		  	data: {"id":flcgdanId,"audit":audit}, 
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		if(data.success){
		    		$("#flcgdancode").val(data.obj.flcgdancode);
		    		flgysid = data.obj.flgysid;
			    			$("#dg").datagrid({
				    			columns:[[
				    			  		{field:'id',title:'id ID',width:80,hidden:'true',align:'center'},
				    			  		{field:'flid',title:'flid',width:80,hidden:'true',align:'center'},
				    			  		{field:'flcode',title:'辅料编码',width:120,align:'center'},
				    			  		{field:'categroymc',title:'辅料',width:200,align:'center'},
				    			  		{field:'number',title:'数量',width:80,editor:'numberbox',align:'center'},
				    			  		{field:'sellprice',title:'价格',width:80,editor:{type:'numberbox',options:{precision:1}},align:'center'}
				    			  	]]
				         });
			    		for( var i=0;i<data.obj.list.length;i++){
					    		$("#dg").datagrid("appendRow",{
						    		 	id : data.obj.list[i].id,
									 	flid : data.obj.list[i].flinfo.id,
									 	flcode : data.obj.list[i].flinfo.flcode,
										categroymc : data.obj.list[i].flinfo.categroymc,
										number:data.obj.list[i].number,
										sellprice:data.obj.list[i].sellprice
				    		 });
			    		}
			    		//审核、入库状态的easyui表格数量和价格不能编辑设置
			    		if(audit!=null){
			    			  var number=$('#dg').datagrid('getColumnOption', 'number');
			    			  var sellprice=$('#dg').datagrid('getColumnOption', 'sellprice');
			    			  number.editor={type:''};
			    			  sellprice.editor={type:''};
			    			  $("#flgys").attr("disabled","disabled");
			    			  $("#tb").hide();
			    		}
	    		}else{
	    			layer.alert(data.msg);
	    			window.parent.location.reload();
	    		}
	 	    }
		});	
	 /**
	  * 供應商加載
	  */
	 var flgysContent = ''; //存放供应商
	 $.ajax({
	    	url:pageContext+"/FlGysxxController/getFlGysxxInfo",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		flgysContent+="<option></option>";
				for(var i=0;i<data.length;i++){
					if(flgysid ==data[i].id){
						flgysContent+="<option selected='selected' value="+data[i].id+">"+data[i].flgysmc+"</option>";
					}else{
						flgysContent+="<option value="+data[i].id+">"+data[i].flgysmc+"</option>";
					}
				}
				$('#flgys').append(flgysContent);
	 	    }
		});	
});
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-24 下午1:47:54
 * 模块名称:
 * 操作:传参
 *
 */
var formData = function(){
	var flcgdancode=$("#flcgdancode").val();
	var flgysid=$("#flgys").find("option:selected").val();
	accept();//保存easyUi的编辑状态的数据
	var rows= $('#dg').datagrid('getRows');
	var datalist=new Array();
	if(flgysid!=''){
		if(rows.length>0){
				for ( var i = 0; i < rows.length; i++) {  
					     if(rows[i].number == undefined){
							layer.msg("请填写辅料数量!!",function(){});
							return;
						}else if(rows[i].sellprice == undefined){
							layer.msg("请填写辅料价格!!",function(){});
							return;
						}
			     datalist.push({"id":rows[i].id,"flid":rows[i].flid,"number": rows[i].number,"sellprice":rows[i].sellprice});   
				}
				var jsonArray = { // 创建一个对象
						flcgdancode: flcgdancode,
						flgysid:flgysid,
						id:flcgdanId,
						audit:audit,
						list:datalist
				};
		}else{
			layer.msg("请添加模板记录",function(){});
		}
	}else{
			layer.msg("供应商不能为空!!",function(){});
		}
	 return jsonArray;
};


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-24 下午1:39:20
 * 模块名称:辅料采购单
 * 操作:选择辅料
 *
 */
function openFlbomb(){
	getId();
    var flgysid = '';
    var obj=document.getElementById("flgys");
    for (i=0;i<obj.length;i++) {//下拉框的长度就是它的选项数.
        if (obj[i].selected== true ) {
            flgysid=obj[i].value;//获取当前选择项的值 .
        }
    }
	parent.layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flcgdan-upd-fl?flgysid="+flgysid+"&idBuffer="+idBuffer,
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
function accept(){
	$('#dg').datagrid('acceptChanges');
}

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
