/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-22 下午2:27:59
 * 模块名称:辅料调整就界面
 * 操作:获取flid
 *
 */
function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
};
var flid;
$(function(){
	 flid=getQueryString("flid");
});
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-22 下午2:27:59
 * 模块名称:辅料调整就界面
 * 操作:加载easyui datagrid数据
 *
 */
$(function(){
	$.ajax({
		url:pageContext+'/flKwController/selectKwInfoByFlid',
		method:"post",
		data:{"flid":flid},
		async:false,
		cache:false,
		success:function(data){
			console.log(data);
				$("#dg").datagrid({
					  columns:[[
					        	{field:'id',title:'',width:180,align:'center',editor:'text',hidden:'true'},
					    		{field:'kw',title:'库位',width:180,align:'center',editor:'text'},
					    		{field:'number',title:'数量',width:180,align:'center',editor:'numberbox'},
					    		{field:'cz',title:'操作',width:200,align:'center'}
					        ]]
				});
				for(var k in data.list){
				$("#dg").datagrid("appendRow",{
						id:data.list[k].id,
						kw:data.list[k].kw,
						number:data.list[k].number,
						//<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="onClickRow()">修改</a>
						cz:'<a href="javascript:void(0)"  onclick="removeit('+k+')" class="mr-20 glyphicon glyphicon-remove">移除</a><a href="javascript:void(0)"  onclick="save('+k+')" class="glyphicon glyphicon-floppy-open">保存</a>'
					});
				}
		},error:function(error){
			
		}
	});
});
/**
 * easyui datagrid列编辑
 */
var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#dg').datagrid('validateRow', editIndex)){
		var ed = $('#dg').datagrid('getEditor', {index:editIndex,field:'productid'});
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
			$('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
		}
	}
}

function onClickRowData(){
	if (editIndex != index){
		if (endEditing()){
			$('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
		}
	}
}
function append(){
		if (endEditing()){
			$('#dg').datagrid('appendRow',{cz:'<a href="javascript:void(0)"  onclick="removeitData()" class="mr-20 glyphicon glyphicon-remove">移除</a><a href="javascript:void(0)"  onclick="saveData()" class="glyphicon glyphicon-floppy-open">保存</a>'});
			editIndex = $('#dg').datagrid('getRows').length-1;
			$('#dg').datagrid('selectRow', editIndex)
					.datagrid('beginEdit', editIndex);
		}
}

function removeit(index){
	var sttr=$("#dg").datagrid("getRows")[index];
	$.ajax({
			url:pageContext+"/flKwController/clearKwFlstock",
		    data:{"id":sttr.id},
			type: "POST",
			async:true,
			dataType:'json',
			success:function(data){
				if(data.success){
					window.location.reload();
				}
			},
			error:function(){
				
			}
	});
}

function removeitData(){
	if (editIndex == undefined){return}
	$('#dg').datagrid('cancelEdit', editIndex)
			.datagrid('deleteRow', editIndex);
	editIndex = undefined;
}
function accept(){
	if (endEditing()){
		$('#dg').datagrid('acceptChanges');
	}
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-23 下午3:44:08
 * 模块名称:包装调整界面
 * 操作:保存传参（修改）
 *
 */
function save(index){
	var sttr=$("#dg").datagrid("getSelected");
	accept();
	var array={"id":sttr.id,"kw":sttr.kw,"number":sttr.number}
	$.ajax({
		url:pageContext+"/flKwController/updateKwFlstock",
		data:array,
		type: "POST",
		async:true,
		dataType:'json',
		success:function(data){
			if(data.success){
				window.location.reload();
			}
		},
		error:function(){
			
		}
	});
}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-23 下午3:44:08
 * 模块名称:包装调整界面
 * 操作:保存传参（新增）
 *
 */
function saveData(index){
	var sttr=$("#dg").datagrid("getSelected");
	accept();
	var array={"flid":flid,"kw":sttr.kw,"number":sttr.number}
	$.ajax({
		url:pageContext+"/flKwController/addKwFlstock",
		data:array,
		type: "POST",
		async:true,
		dataType:'json',
		success:function(data){
			if(data.success){
				window.location.reload();
			}
		},
		error:function(){
			
		}
	});
}

//保存datagrid数据
function accept(){
		$('#dg').datagrid('acceptChanges');
}