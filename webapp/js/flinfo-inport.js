var flgysContent = ''; //采购供应商
var flcgdanid=$("body",parent.document).find("#flcgdan_table").find("input[type='checkbox']:checked").eq(0).val(); //获取上一个页面的id
var id=$("body",parent.document).find("#flcgdan_table").find("input[type='checkbox']:checked").eq(0).val();
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function(){
	var rk = getQueryString("rk");
	var flgysid = '';
	 $.ajax({
	    	url:pageContext+"/flcgdanController/echoFlcgdan",
		  	type:"post",
			data: {"id":id,"rk":rk}, 
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		if(data.success){
		    		$("#flcgdancode").val(data.obj.flcgdancode);
		    		flgysid = data.obj.flgysid;
		    		var content;
					for( var i=0;i<data.obj.list.length;i++){
						content+='<tr onclick="pitch(this)">';
						content+="<td align='center' valign='middle' style='width: 280px; height: 24px;display:none;' class='flid' jhid="+data.obj.list[i].id+"  >"+data.obj.list[i].flinfo.id+"</td>";
						content+="<td align='center' valign='middle' style='width: 280px; height: 24px;' id='categroymc'  >"+data.obj.list[i].flinfo.categroymc+"</td>";
						content+='<td align="center" valign="middle" style="width: 80px; height: 24px;"><input  type="text" style="width: 79px; height: 24px;" class="number bor" value='+data.obj.list[i].number+' disabled="disabled"></td>';
						content+='<td align="center" valign="middle" style="width: 80px; height: 24px;"><input  type="text" style="width: 79px; height: 24px;" class="sellprice bor" value='+data.obj.list[i].sellprice+' disabled="disabled"></td>';
					}
					$("#cgmx .datagrid-view2 .datagrid-body").append(content);
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
//保存
function saveFlcgdan(){
	var cgmxLen=$("#kwmx .datagrid-view2 .datagrid-body tr").length; //获取库位条数
	var flid=$("#cgmx .datagrid-view2 .datagrid-body").find(".datagrid-row-selected .flid").text();
	//判断是否选中一行采购明细记录
	if(flid!=''){
		if(cgmxLen>0){
				var datalist= new Array();  
				//封装数据（参数）
				var kw;
				var number;
				var sumNum=0;
				var bookCount=$("#kwmx .datagrid-view2  .datagrid-body tr");
				for ( var i = 0; i < bookCount.length; i++) {  
					var id=$(bookCount).eq(i).find(".id").val();
					var kw=$(bookCount).eq(i).find(".kw").val();
					var number=$(bookCount).eq(i).find(".number").val();
					sumNum=sumNum+parseInt(number);
					if(number == ''){
						layer.msg("请输入数量！",function(){});
						return;
					}else if(kw == ''){
						layer.msg("请输入库位名称！",function(){});
						return;
					}
					datalist.push({"id":id,"kw":kw,"number": number,"flcgdanid":flcgdanid,"flid":flid});   
				}
				//采购明细的数量和库位的总数量比较
				var cgnumber=$("#cgmx .datagrid-view2 .datagrid-body").find(".datagrid-row-selected .number").val();
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
//取消关闭当前窗口
function offThisWindows(){
	var index=parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
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
//选择添加背景颜色
function pitch(o){
	var flid=$(o).find(".flid").text();
	//控制不重复点击添加数据
	if(!$(o).hasClass("datagrid-row-selected")){
		searchHistoryRecord(flid);
	}
	$(o).addClass("datagrid-row-selected").find("input").addClass("datagrid-row-selected").parents("tr").siblings("tr").removeClass("datagrid-row-selected").find("input").removeClass("datagrid-row-selected");
}
//查询当前采购明细记录是否已经有历史库位信息
function searchHistoryRecord(flid){
	 $.ajax({
	    	url:pageContext+"/flKwController/getFlkwInfo",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		  	data:{"flcgdanid":flcgdanid,"flid":flid},
		    cache:false,
	    	success:function(data){
	    		var content="<table>";
	    		for(var i=0;i<data.obj.length;i++){
	    			content+="<tr onclick='addSe(this)'>";
	    			content+='<td align="center" valign="middle" style="display:none;"><input  type="text" class="id" value='+data.obj[i].id+'></td>';
	    			content+='<td align="center" valign="middle" style="width: 280px; height: 24px;"><input  type="text" style="width: 280px; height: 24px;" class="number bor" value='+data.obj[i].number+'></td>';
	    			content+='<td align="center" valign="middle" style="width: 80px; height: 24px;"><input  type="text" style="width: 79px; height: 24px;" class="kw bor" value='+data.obj[i].kw+'></td>';
	    			content+='</tr>';
	    		}
	    		content+="</table>";
	    		$("#kwmx .datagrid-view2 .datagrid-body").html(content);
	 	    }
		});	
}
function addSe(o){
	$(o).addClass("datagrid-row-selected").find("input").addClass("datagrid-row-selected").parents("tr").siblings().removeClass("datagrid-row-selected").find("input").removeClass("datagrid-row-selected");
}

//增加库位信息
function addKwXx(){
	var content="<tr onclick='addSe(this)'>";
	content+='<td align="center" valign="middle" style="width: 280px; height: 24px;"><input  type="text" style="width: 280px; height: 24px;" class="number bor"></td>';
	content+='<td align="center" valign="middle" style="width: 80px; height: 24px;"><input  type="text" style="width: 79px; height: 24px;" class="kw bor" ></td>';
	content+='</tr>';
	$("#kwmx .datagrid-view2 .datagrid-body").append(content);
}
//删除库位信息
function removeKwXx(){
		var flag=false;
		$("#kwmx .datagrid-view2 .datagrid-body tr").each(function(){
			if($(this).hasClass("datagrid-row-selected")){
				flag=true;
				return false;
			}
		});
		if(flag){
			$("#kwmx  .datagrid-view2 .datagrid-body ").find(".datagrid-row-selected").remove();
		}else{
			layer.msg('请选择删除行！',function(){});
		}
	$("#kwmx .datagrid-view2 .datagrid-body").append(content);
}