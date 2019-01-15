var flgysContent = ''; //采购供应商
var flcgdanId; //获取上一个页面的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function(){
	var rk = getQueryString("rk");
	flcgdanId=getQueryString("flcgdanId");
	var flgysid = '';
	 $.ajax({
	    	url:pageContext+"/flcgdanController/echoFlcgdan",
		  	type:"post",
			data: {"id":flcgdanId,"rk":rk}, 
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		if(data.success){
		    		$("#flcgdancode").val(data.obj.flcgdancode);
		    		flgysid = data.obj.flgysid;
		    		for( var i=0;i<data.obj.list.length;i++){
			    		$("#cgmx").datagrid("appendRow",{
			    			jhid: data.obj.list[i].id,
			    			flid:data.obj.list[i].flinfo.id,
			    			categroymc:data.obj.list[i].flinfo.categroymc,
			    			number:data.obj.list[i].number,
			    			sellprice:data.obj.list[i].sellprice
			         });
		    		}	
	    		}else{
	    			alert(data.msg);
	    			window.parent.location.reload();
	    		}
	 	    }
		});	
	 //加载供应商
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
//查询当前采购明细记录是否已经有历史库位信息
$("#cgmx").datagrid({
	 onClickRow : function(index, row){
		 $("#dg").datagrid('loadData',[]);
         //你要写的逻辑
		 $.ajax({
		    	url:pageContext+"/flKwController/getFlkwInfo",
			  	type:"post",
			  	dataType:"json",
			  	async:false,  
			  	data:{"flcgdanid":flcgdanId,"flid":row.flid},
			    cache:false,
		    	success:function(data){
		    		for(var i=0;i<data.obj.length;i++){
		    			$("#dg").datagrid("appendRow",{
		    				id:data.obj[i].id,
			    			number:data.obj[i].number,
			    			kw:data.obj[i].kw
			         });
		    		}
		 	    }
			});	
	 }
});

//保存库位信息
function saveKwXx(){
	accept();
	//满足保存的条件
	var cgmxLen=$("#dg").datagrid("getRows"); //获取库位条数
	var flid=$("#cgmx").datagrid("getSelections");
	//判断是否选中一行采购明细记录
	if(flid.length>0){
		flid=flid[0].flid;
		if(cgmxLen.length>0){
				var datalist= new Array();  
				//封装数据（参数）
				var kw,number;
				var sumNum=0;
				for ( var i = 0; i < cgmxLen.length; i++) {  
					var id=cgmxLen[i].id;
					var number=cgmxLen[i].number;
					var kw=cgmxLen[i].kw;
					sumNum=sumNum+parseInt(number);
					if(number == ''){
						layer.msg("请输入数量！",function(){});
						return;
					}else if(kw == ''){
						layer.msg("请输入库位名称！",function(){});
						return;
					}
					datalist.push({"id":id,"kw":kw,"number": number,"flcgdanid":flcgdanId,"flid":flid});   
				}
				//采购明细的数量和库位的总数量比较
				var cgnumber=$("#cgmx").datagrid("getSelections")[0].number;
				var r =false;
				if(sumNum<=cgnumber){
					if(sumNum != cgnumber){
						r=confirm("库位总数量小于采购数量，是否继续？");
					}else{
						r = true;
					}
					if (r==true){
						$.ajax({
					    	url:pageContext+"/flcgdanController/rkSaveFlKwInfo",
						  	type:"post",
						  	dataType:"json",
						  	async:false,  
						 	data: JSON.stringify(datalist),  
						  	contentType:'application/json;charset=UTF-8',
						    cache:false,
					    	success:function(data){
					    		if(data.success){
					    			layer.alert("保存成功！");
					    		}else{
					    			layer.alert(data.msg);
					    		}
					 	    }
						});	
					  }
				}else{
					layer.msg("分配的数量不能大于采购数量!!",function(){});
				}
		}else{
			layer.alert("请新增库位信息！");
		}
	}else{
		layer.msg("选中一行采购明细记录！",function(){});
		return;
	}
}

//往父iframe传递参数
var formData = function(){
	var jspArray=new Array();
	var jspArray = { // 创建一个对象
			cgmxLen:$("#dg").datagrid("getRows"),
		
	};
	 return jspArray;
};

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
//新增
function append(){
	if (endEditing()){
		$('#dg').datagrid('appendRow',{status:'P'});
		editIndex = $('#dg').datagrid('getRows').length-1;
		$('#dg').datagrid('selectRow', editIndex)
				.datagrid('beginEdit', editIndex);
	}
}
//删除
function removeit(){
	if (editIndex == undefined){return}
	$('#dg').datagrid('cancelEdit', editIndex)
			.datagrid('deleteRow', editIndex);
	editIndex = undefined;
}
//保存datagrid数据
function accept(){
		$('#dg').datagrid('acceptChanges');
}