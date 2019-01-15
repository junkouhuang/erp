var spid;
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
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-22 下午2:27:59
 * 模块名称:辅料调整就界面
 * 操作:加载easyui datagrid数据
 *
 */
$(function(){
    spid=getQueryString("spid");
	$.ajax({
		url:pageContext+'/spxxController/selectSpmxByspid/'+spid,
		method:"POST",
		async:false,
		cache:false,
		success:function(data){
			console.log(data);
				$("#dg").datagrid({
					  columns:[[
					        	{field:'mxid',title:'',width:10,align:'center',editor:'text',hidden:'true'},
					        	{field:'mxcode',title:'',width:10,align:'center',editor:'text',hidden:'true'},
					    		{field:'cmcode',title:'尺码号',width:120,align:'center'},
					    		{field:'cm',title:'尺码名',width:150,align:'center'},
					    		{field:'ys',title:'颜色',width:100,align:'center'},
					    		{field:'sl',title:'待入库数量',width:100,align:'center',editor:'numberbox'},
					    		{field:'kw',title:'库位',width:150,align:'center',editor:'text'}
					        ]]
				});
				for(var k in data.obj){
				$("#dg").datagrid("appendRow",{
						mxid:data.obj[k].id,
						mxcode:data.obj[k].mxcode,
                    	cmcode:data.obj[k].cmcode,
					    cm:data.obj[k].cm,
					    ys:data.obj[k].ys,
						sl:data.obj[k].jdsl,
						kw:data.obj[k].kw
						//<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="onClickRow()">修改</a>
						//cz:'<a href="javascript:void(0)"  onclick="removeit('+k+')" class="mr-20 glyphicon glyphicon-remove">移除</a><a href="javascript:void(0)"  onclick="save('+k+')" class="glyphicon glyphicon-floppy-open">保存</a>'
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
var postData = function () {
    accept();
	var storageData = new Array();
    var rows = $("#dg").datagrid("getRows");
    for(i in rows){
        storageData.push({"mxid":rows[i].mxid,"mxcode":rows[i].mxcode,"sl":rows[i].sl,"kw":rows[i].kw});
	}
	return storageData;
}


//保存datagrid数据
function accept(){
	$('#dg').datagrid('acceptChanges');
}

