    /**
     * 
     * 作者:黄金高
     * 创建时间:2017-11-21 上午10:04:21
     * 模块名称:新增辅料发货单
     * 操作:加载门店
     *
     */
$(function(){
	$.ajax({
		url:pageContext+"/storeController/getStoreList",
		type:"post",
		dataType:"json",
		async:false,
		cache:false,
		success:function(data){
			var mdContent = '<option value="" selected="selected">选择门店</option>';
			for(var i=0;i<data.length;i++){
				mdContent+="<option  storeid="+data[i].id+" mdcode="+data[i].mdcode+" value="+data[i].mdmc+">"+data[i].mdcode+"_"+data[i].mdmc+"</option>";
			}
			$('#store').append(mdContent);
		}
	});
	$('#store').combobox();
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-15 上午10:04:21
 * 模块名称:新增辅料发货单
 * 操作:传参
 *
 */
var  mdmc;//获取当前选择项的value .
var storeid;//获取当前选择项的值 .
var mdcode;//获取当前选择项的值 .
var postData=function(){
	var datalist=new Array();
	accept();
    
	var flfhcode = $("#flfhcode").val();
	var bz = $("#bz").val();
	var bookCount=$("#dg").datagrid("getRows");
			for ( var i = 0; i < bookCount.length; i++) {  
				var flid=bookCount[i].id;
				var number=bookCount[i].number;
				var sellprice=bookCount[i].sellprice;
				var sellrate=bookCount[i].sellrate;
				datalist.push({"flid": flid,"number": number,"sellprice":sellprice,"sellrate":sellrate});   
			}  
			var flf = { // 创建一个对象
					flfhcode: flfhcode, //辅料发货单号
					storeid: storeid,   //门店
					mdmc:mdmc,
					mdcode:mdcode,
					bz:bz,
					list:datalist
			};
		return flf;
};


/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-15 上午11:00:27
 * 模块名称:辅料发货单新增界面
 * 操作:辅料删除
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
		layer.msg("请选择要移除的行",function(){});
	}
}

var idBuffer = new Array();
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-21 下午9:34:50
 * 模块名称:
 * 操作:防止数据重复添加
 *
 */
function getId(){
	var rows=$("#dg").datagrid("getRows");
	idBuffer.length=0;//清空一下
	for(var i=0;i<rows.length;i++)
	{
		var flid=rows[i].id;
		if(flid != '' && flid != undefined){
			idBuffer.push(flid) ;//获取url传参的数值
		}
	}
};

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-15 上午11:00:27
 * 模块名称:辅料发货单新增界面
 * 操作:辅料弹框
 *
 */
function openFlbomb(){
	getId();
	parent.layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flfhorder-add-fl?idBuffer="+idBuffer,
		btn:["确定","取消"],
		btn1:function(index,layero){
			var posData = $(layero).find("iframe")[0].contentWindow.formData();
			for(var i in posData){
				$("#dg").datagrid("appendRow",{
					id:posData[i].id,
					flcode:posData[i].flcode,
					flmc:posData[i].categroymc,
					dw:posData[i].dw,
					sellprice:posData[i].sellprice,
					sellrate:1
				});
			}
		},
		btn2:function(index){
			layer.close(index);  //关闭弹窗
		}
	});
}

//选中辅模板
function openFlmoban(){
	parent.layer.open({
		type: 2,
		title: '选择辅料模板界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['700px', '450px'],
		content: "flfhorder-add-moban?idBuffer="+idBuffer,
		btn:["确定","取消"],
		btn1:function(index,layero){
			var id = $(layero).find("iframe")[0].contentWindow.formData();
			 $.ajax({
				 url:pageContext+"/flmobanController/getFlmoban",
				 type:'post',
				 dataType:'json',
				 data:{"id":id},
				 async:false,
				 success:function(data){
					 for(var i in  data.flinfoList){
						 var is = true;
						 var idArr=$("#dg").datagrid("getRows");
						 for(var j in idArr){
							 if(idArr[j].id == data.flinfoList[i].id){
								 is = false;
							 }
						 }
						 if(is){
							 $("#dg").datagrid("appendRow",{
								 id:data.flinfoList[i].id,
								 flcode:data.flinfoList[i].flcode,
								 flmc:data.flinfoList[i].categroymc,
                                 dw:data.flinfoList[i].dw,
								 sellprice:data.flinfoList[i].sellprice,
								 sellrate:1
							 });
						 }
					 }
				 	}
				 });
		},
		btn2:function(index){
			layer.close(index);  //关闭弹窗
		}
	});
}

//生成发货单号
var mdcode;
var mdmc;
var storeid;
function selectOnchang(obj) {
    var data = obj.options[obj.selectedIndex];
	mdcode = $(data).attr("mdcode");
	mdmc=$(data).val();
	storeid=$(data).attr("storeid");
	
	if(!mdcode==''){
		$.ajax({
		    	url:pageContext+"/codeRuleController/getFlfhOrderCode",
			  	type:"post",
			 	data: {"mdcode":mdcode},  
			  	dataType:"json",
			  	async:false,  
			    cache:false,
		    	success:function(data){
		    		$("#flfhcode").val(data.obj);
		    		if(!data.success){
		    			layer.alert("请求失败！！");
		    		}
		 	    	},error:function(){
		 	    		layer.alert("请求失败！！");
		 	    	}
			});		
		}else{
			$("#flfhcode").val("");
		}
}


//保存datagrid数据
function accept(){
		$('#dg').datagrid('acceptChanges');
}
/**
 * easyui datagrid列编辑
 */
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
	if (editIndex == undefined){return true}
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

