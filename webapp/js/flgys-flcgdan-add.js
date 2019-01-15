var flgysContent = '';
$(function(){
	var gysid =$("body",parent.document).find("#flfhmx_table").find("input[type='checkbox']:checked").eq(0).val();
	 $.ajax({
	    	url:pageContext+"/FlGysxxController/getFlGysxxInfo",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		flgysContent+="<option></option>";
				for(var i=0;i<data.length;i++){
					if(data[i].id==gysid){
						flgysContent+="<option value="+data[i].id+" selected = 'selected'>"+data[i].flgysmc+"</option>";
					}else{
						flgysContent+="<option value="+data[i].id+">"+data[i].flgysmc+"</option>";
					}
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
//保存
function saveFlcgdan(){
	var flcgdancode = $("#flcgdancode").val();
	var flgysid = '';
	var obj=document.getElementById("flgys");
    for (i=0;i<obj.length;i++) {//下拉框的长度就是它的选项数.
       if (obj[i].selected== true ) {
    	   flgysid=obj[i].value;//获取当前选择项的值 .
       }
    }
	if(flcgdancode == ''){
		layer.msg('采购单号不能为空！！',function(){});
	}else if(flgysid == ''){
		layer.msg('请选择供应商！！',function(){});
	}else{
		var bookCount=$(".datagrid-view2 .datagrid-body tr");
		var datalist= new Array();  
		for ( var i = 0; i < bookCount.length; i++) {  
			var flid=$(bookCount).eq(i).find("#flid").text();
			var number=$(bookCount).eq(i).find("#number").val();
			var sellprice=$(bookCount).eq(i).find("#sellprice").val();
			if(number == ''){
				alert("至少有一个辅料信息未填写采购数量!!");
				return;
			}else if(sellprice == ''){
				alert("至少有一个辅料信息未填写采购价格!!");
				return;
			}
			datalist.push({"flid": flid,"number": number,"sellprice":sellprice});   
		}  
		
		var flf = { // 创建一个对象
				flcgdancode: flcgdancode,
				flgysid:flgysid,
				list:datalist
		};
			$.ajax({
		    	url:pageContext+"/flcgdanController/addFlcgdan",
			  	type:"post",
			 	data: JSON.stringify(flf),  
			  	contentType:'application/json;charset=UTF-8',
			  	dataType:"json",
			  	async:false,  
			    cache:false,
		    	success:function(data){
		    		alert(data.msg);
		    		if(data.success){
		    			window.parent.location.reload();
		    		}
		 	    	},error:function(){
		 	    		alert("请求失败！！");
		 	    	}
			});	
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
var indec=1;
function removeit(){
	$(".status").each(function(){
		alert($(this).is(":checked"));
		if($(this).attr('checked')){
			$(this).parents("tr").remove();
		}
		$(".datagrid-body tr").each(function(index){
			$(".pid").eq(index).text(index+1);
		
		});
	});
	indec=$(".status").length+1;
}
function accept(){
	if (endEditing()){
		$('#dg').datagrid('acceptChanges');
	}
}
function reject(){
	$('#dg').datagrid('rejectChanges');
	editIndex = undefined;
}
function getChanges(){
	var rows = $('#dg').datagrid('getChanges');
	alert(rows.length+' rows are changed!');
}

//取消关闭当前窗口
function offThisWindows(){
	var index=parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

//保存
function save(){
	var id=$(this).find("input").val();
	$("#layui-layer-iframe1").contents().find("#saveDara").bind("myClick",function(){
		
	});
	$("#layui-layer-iframe1").contents().find("#saveDara").trigger("myClick");
};

//辅料弹框
function openFlbomb(){
	layer.open({
		type: 2,
		title: '辅料选择界面',
		shade: [0.8, '#393D49'],
		maxmin: true, //开启最大化最小化按钮
		area: ['800px', '500px'],
		content: "flcgdan-add-flinfo"
	});
}

function removeit(){
	var flag=false;
	$(".datagrid-view2 .datagrid-body tr").each(function(){
		if($(this).hasClass("datagrid-row-selected")){
			flag=true;
			return false;
		}
	})
	if(flag){
		$(".datagrid-view2 .datagrid-body ").find(".datagrid-row-selected").remove();
	}else{
		layer.msg('请选择删除行！',function(){});
	}
}

//点击选中一行记录
function pitch(o){
		$(o).addClass("datagrid-row-selected").siblings().removeClass("datagrid-row-selected");
}