$(function(){
	//加载品牌信息
	loadBrandInfo();
	$("#brandContent tr").each(function(){
		$(this).click(function(){
			$(this).css("background-color","#5a98de").siblings("tr").css("background-color","");
		});
	});
});

//加载品牌信息
var index;
function loadBrandInfo(){
	$.ajax({
		url:pageContext+"/spBatchController/getAllSpBrandInfo",
		type : "post",
		dataType : "json",
		async : false,
		success : function(data) {
			var content = "<table><tbody>";
			$.each(data, function(index, item){
				content += "<tr><td style=' width: 40px;text-align: center;'>"+item.id+"</td><td style=' width: 219px;text-align: center;'>"+item.brandname+"</td></tr>";
			});
			content += "<tr style='position: fixed; bottom: 55px;left:0;right:0; background: #1ab394;color: #fff;'><td style=' width: 39px;text-align: center;'> 100</td><td style=' width: 220px;text-align: center;'>"+data.length+"</td></tr>";
			content+="</tbody></table>";
			$(".datagrid-view2 .datagrid-body").html(content);
		}
	});
	//点击选中
	$(".datagrid-view2 .datagrid-body tr").each(function(){
		$(this).bind("click",function(){
			$(this).addClass("datagrid-row-selected").siblings().removeClass("datagrid-row-selected");
		});
	});
}

function brandAdd(){
	$("body",parent.document).find("#brandAdd").click();
}

//关闭窗口
function offWindows(){
	var index = parent.layer.getFrameIndex(window.name);  
	parent.layer.close(index);
}
//添加品牌信息
function append(){
	indexc=parseInt($(".datagrid-view2 .datagrid-body tbody tr").eq(($(".datagrid-view2 .datagrid-body tbody tr").length)-2).find("td:first-child").text());
	indexc=indexc+1;
	layer.prompt({
		  formType: 2,
		  title: '请输入品牌名称'
		}, function(value, index, elem){
			$.ajax({
				url:pageContext+"/spBatchController/addBrand",
				type : "post",
				dataType : "json",
				data:{"brandname":value},
				async : false,
				success : function(data) {
					window.location.reload()
				}
			});
		//点击选中
			$(".datagrid-view2 .datagrid-body tr").each(function(){
				$(this).bind("click",function(){
					$(this).addClass("datagrid-row-selected").siblings().removeClass("datagrid-row-selected");
				})
			})
		  layer.close(index);
		});
}
//删除选中
function removeit(){
$(".datagrid-view2 .datagrid-body tr").each(function(){
		if($(this).hasClass("datagrid-row-selected")){
			$.ajax({
				url:pageContext+"/spBatchController/deleteBrand",
				type : "post",
				dataType : "json",
				data:{"brandid":$(this).find("td:first").text()},
				async : false,
				success : function(data) {
					window.location.reload();
				}
			});
		}else{
			layer.alert("请选择要删除的品牌！");
		}
})
}
//加载表头信息
var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
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
			$('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
		}
	}
}
//确定选择
function saveCgd(){
	$(".datagrid-view2 .datagrid-body tr").each(function(){
		if($(this).hasClass("datagrid-row-selected")){
			$("body",parent.document).find("tbody").find("#brand").val($(this).find("td:nth-child(2)").text());
			var index = parent.layer.getFrameIndex(window.name);  
			parent.layer.close(index);
		};
	});
}
