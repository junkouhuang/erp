var mdContent = '';
var flfhdanid=$("body",parent.document).find("#flfhorder_table").find("input[type='checkbox']:checked").eq(0).val(); //获取上一个页面的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function(){
	$("#kwmx").datagrid({
		showFooter:true,
		singleSelect:false,
		checkOnSelect:true,
		selectOnCheck:true,
		onLoadSuccess:function(data){    
	        $("a[name='opera']").linkbutton({text:'拆分',plain:true,iconCls:'icon-add'});    
	},  
	onCheck:function(index,row){
		countCheck();
	},
	onUncheck:function(index,row){
		countCheck();
	},
	onLoadSuccess:function(data){
            $.each(data.rows, function(index, item){
                if(item.checked){
                    $('#kwmx').datagrid('checkRow', index);
                }
                });
			},
			columns:[[
			            {field:'checked',width:20,align:'center',checkbox:true},
			            {field:'id',title:'id',width:120,align:'center',hidden:'true'}, 
			            {field:'kw',title:'库位',width:120,align:'center'}, 
			            {field:'number',title:'数量',width:120,align:'center'},  
						{field:'split',title:'操作', width:120,align:'center',
							 formatter:function(value, row, index){  
								 if(row.id == null){   
										return value;
									}
							        var str = '<a  href="javascript:void(0)"  name="opera"  class="easyui-linkbutton "  onclick="splitKwXx(this)">拆分</a>';  
							        return str;  
							  }
						}
					]]
			});
	var ph = getQueryString("ph");
	var ck = getQueryString("ck");
	 $.ajax({
		   url:pageContext+"/flFhorderController/echoFlfhorder",
		  	type:"post",
		  	dataType:"json",
		  	data:{"fhfhid":flfhdanid,"ph":ph,"ck":ck},
		  	async:false,  
		    cache:false,
	    	success:function(data){
	    		if(data.success){
	    			//加载门店
	    			$.ajax({
				    	url:pageContext+"/storeController/getStoreList",
					  	type:"post",
					  	dataType:"json",
					  	async:false,  
					    cache:false,
				    	success:function(data){
				    		mdContent+="<option></option>";
							for(var i=0;i<data.length;i++){
								mdContent+="<option storeid="+data[i].id+" value="+data[i].mdmc+"  mdcode="+data[i].mdcode+">"+data[i].mdmc+"</option>";
							}
							$('#store').append(mdContent);
				 	    }
					});
	    			//-----------------------------end store---------------------------------
	    			//..........................................................文本框信息回选.......................................................
		    		$("#flfhcode").val(data.obj.flfhcode);
		    		$("#store").val(data.obj.mdmc);
		    		$("#store").attr("mdcode",data.obj.mdcode);
		    		$("#store").attr("storeid",data.obj.storeid);
		    		$("#bz").val(data.obj.bz);
		    		//辅料发货单信息回选
		    		var content;
		    		var total = 0;
					for( var i=0;i<data.obj.list.length;i++){
						$("#flfhmx").datagrid("appendRow",{
							flid : data.obj.list[i].flinfo.id,
							id : data.obj.list[i].id,
							flcode : data.obj.list[i].flinfo.flcode,
							categroymc : data.obj.list[i].flinfo.categroymc,
							number : data.obj.list[i].number,
							sellprice : data.obj.list[i].sellprice,
							sellrate :  data.obj.list[i].sellrate,
                            actualnumber :  data.obj.list[i].actualnumber,
			         });

					}
	    		}else{
	    			alert(data.msg);
	    			window.parent.location.reload();
	    		}
	 	    }
		});	
});

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-21 上午11:26:19
 * 模块名称:辅料发货单
 * 操作:获参方法
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
 * 创建时间:2017-11-21 上午11:22:24
 * 模块名称:辅料发货单
 * 操作:传参
 *
 */
var postData=function(){
	var flfhcode = $("#flfhcode").val();//辅料发货单号
	 var mdcode=$("#store").attr("mdcode");
	 var storeid=$("#store").attr("storeid");
	 var mdmc=$("#store").val();
	var obj=document.getElementById("store");
	var bz = $("#bz").val();//备注
	var id=getQueryString("flfhid");
		var bookCount=$('#flfhmx').datagrid('getRows');;
		var datalist= new Array();  
		for ( var i = 0; i < bookCount.length; i++) {
			var fid = bookCount[i].id;
			var flid=bookCount[i].flid;
			var number=bookCount[i].number;
			var sellprice=bookCount[i].sellprice;
			var sellrate=bookCount[i].sellrate;
			datalist.push({"id":fid,"flid": flid,"number": number,"sellprice":sellprice,"sellrate":sellrate});   
		  }  
		//var ck = getQueryString("ck");
		var flfhorder = { // 创建一个对象
				id:id,
				flfhcode: flfhcode,
				storeid: storeid,
			    mdmc: mdmc,
				mdcode:mdcode,
				bz:bz,
				list:datalist
		};
				return flfhorder;
}

//新增修改删除
var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#flfhmx').datagrid('validateRow', editIndex)){
		var ed = $('#flfhmx').datagrid('getEditor', {index:editIndex,field:'number'});
		var productname = $(ed.target).combobox('getText');
		$('#flfhmx').datagrid('getRows')[editIndex]['productname'] = productname;
		$('#flfhmx').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickRow(index){
	if (editIndex != index){
		if (endEditing()){
			$('#flfhmx').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#flfhmx').datagrid('selectRow', editIndex);
		}
	}
}
$("#flfhmx").datagrid({onClickRow : function(index, row){
	searchHistoryRecord(row.flid);   
    }
});
//查询当前采购明细记录是否已经有历史库位信息
function searchHistoryRecord(flid){
	$("#kwmx").datagrid({
		url:pageContext+"/flKwController/getFlkwInfoByFlid",
		queryParams:{"flfhid":flfhdanid,"flid":flid}
	});
 }

function countCheck(){
	var checkrows  = $('#kwmx').datagrid("getChecked");
	var total = 0;
	for(var i = 0; i < checkrows.length; i++){
		total  = total + checkrows[i].number;
	}
	var rows = $('#kwmx').datagrid('getFooterRows');
	rows[0]['split'] =total;
	$('#kwmx').datagrid('reloadFooter');
}
//选中库位信息表行添加复选框类型

//保存库位信息
function saveKwXx(){
	var flag=false;
	var flid=$("#flfhmx").datagrid("getSelected").flid;
	
	if(flid!=undefined){
	//满足保存的条件
	var kwmxLen = $('#kwmx').datagrid('getChecked');
	var flFlkwList=new Array();
	for(var i in kwmxLen){
		if(kwmxLen[i].flFlkw==null){
			flFlkwList.push({"id":kwmxLen[i].flFlkw,"kwid":kwmxLen[i].id,"flfhid":flfhdanid,"flid":flid});   
		}else{
			flFlkwList.push({"id":kwmxLen[i].flFlkw.id,"kwid":kwmxLen[i].id,"flfhid":flfhdanid,"flid":flid});   
		}
	
	}
	//封装数据（参数）
	var flfhorder = {"id":flfhdanid,"flid":flid,"flFlkwList":flFlkwList};
	if(flFlkwList.length>0){
	 flag=true;
	}else{
		if(confirm("暂时未选中一行记录！是否要继续？")){
			flag=true;
		}
	}
	if(flag){
		$.ajax({
	    	url:pageContext+"/flKwController/saveKwAllotInfo",
		  	type:"post",
		  	dataType:"json",
		  	async:false,  
		 	data: JSON.stringify(flfhorder),  
		  	contentType:'application/json;charset=UTF-8',
		    cache:false,
	    	success:function(data){
	    		if(data.success){
                    $("#flfhmx").datagrid("getSelected")['actualnumber'] = data.obj;
                    window.location.reload();
                    layer.alert("保存成功！");
	    		}
	 	    }
		});	
	}
}else{
	layer.msg("选中一行发货明细记录！",function(){});
	return;
}
}

//拆分库位信息
function splitKwXx(o){
	//var kwid=$(o).datagrid("getSelected").id;
	var kwid=$(o).parents("tr").find("td[field='id']").children().text();
	//var flfhNumber=$(o).datagrid("getSelected").number;
	var flfhNumber=$("#flfhmx").datagrid("getSelected").number;
	var flid=$("#flfhmx").datagrid("getSelected").flid;
	var kwNumber=$(o).parents("tr").find("td[field='number']").children().text();
	//判断是否选中一条发货明细
	if(flfhNumber!=undefined){
		if(kwNumber!=0){
			if(kwNumber!=1){
				layer.prompt({
					formType: 2,
					title: '拆分库位'
				}, function(value, index, elem){
					layer.close(index);
					//检测拆分数量是否大于实际库位记录数量
					if((/^[1-9]\d*$/g).test(value)){
						if(parseInt(value)<=parseInt(kwNumber)){
							$.ajax({
								url:pageContext+"/flFhorderController/appointSplitKwStock",
								type : "post",
								dataType : "json",
								data:{"flfhid":flfhdanid,"kwid":kwid,"number":value},
								async : false,
								success : function(data) {
									$("#kwmx").datagrid({
										url:pageContext+"/flKwController/getFlkwInfoByFlid",
										queryParams:{"flfhid":flfhdanid,"flid":flid}
									
									});	
								}
							});
						}else{
							layer.msg("要拆分的数量不能大于库位数量！",function(){});
						}
					}else{
						layer.alert("请输入大于0的数字！");
					}
				});
			}else{
				layer.msg("当前已是最小单位，不能拆分！",function(){});
			}
		}else{
			layer.msg("要拆分的数量为0，不能拆分！",function(){});
		}
	}else{
		layer.msg("选中一行发货明细记录！",function(){});
	}
};

//自动配货
function autoPh(){
	  $.ajax({
			url:pageContext+"/flFhorderController/autoPrepareFlStock",
			data:{"flfhid":flfhdanid},
			dataType:"json",
			async:true,
			type:"POST",   //请求方式
			success:function(data){
				layer.alert(data.msg);
				if(data.success){
					window.location.reload();
				}
			},error:function(){
			}
		});
}
