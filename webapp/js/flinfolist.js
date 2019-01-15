var selectedid= ''; //选中行的Id
$(function () {
		//1.初始化Table
        table =  $('#flinfo_table').bootstrapTable({  //表格ID
	        method:'POST',
	        dataType:'json',
	        toolbar:"#exampleTableEventsToolbar",
	        contentType: "application/x-www-form-urlencoded",
	        cache: false,
	        striped: true,//是否显示行间隔色
	        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
	        url:pageContext+"/flInfoController/getFlInfoPage",
	        singleSelect: true, //仅允许单选
	        //search: true,
	        showColumns:true, 
	        showRefresh:true,
            pagination:true,
	       // clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox*/	 
	        queryParamsType: 'undefined',
	        queryParams : queryParams,
	        responseHandler:rspHandler,
	        minimumCountColumns:2,
	        pageNumber:1,                       //初始化加载第一页，默认第一页
	        pageSize: 10,                       //每页的记录行数（*）
	        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
	        idField :"id",
	        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	        exportDataType: 'all',
	        columns: [
            {
	            checkbox: true
	        },
	        //动态创建列名
	        {       
	            field : 'id',
	            title : 'ID',
	            align : 'center',
	            valign : 'middle',
	            display:'hidden',
	            sortable : true
	        },
	        {
	            field : 'flcode',
	            title : '编码',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'type',
	            title : '类型',
	            align : 'center',
	            valign : 'middle',
	            formatter : function(value, row, index) {
					if (value == '1')
						return "销售物料";
					else if (value == '2')
						return "耗材物料";
					else if (value == '4')
						return "内部物料";
					else 
						return "未知";
				}
	        }, {
	            field : 'categroymc',
	            title : '名称',
	            align : 'center',
	            valign : 'middle',
	            sortable : true
	        }, {
	            field : 'gunge',
	            title : '规格',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'dw',
	            title : '单位',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'bz',
	            title : '备注',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'sellprice',
	            title : '销售价',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'cz',
	            title : '材质',
	            align : 'center',
	            valign : 'middle'
	        } , {
	            field : 'ys',
	            title : '颜色',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'warntotal',
	            title : '预警值',
	            align : 'center',
	            valign : 'middle'
	        } , {
	            field : 'isimage',
	            title : '图片',
	            align : 'center',
	            valign : 'middle',
					formatter :function(value, row, index){
                        if(value){
                            return '<a flid='+row.id+' onclick="showImg(this)">图片浏览</a>';
                        }
                        return '没有图片';
					}
	        } , {
	            field : 'mincgsl',
	            title : '最小采购',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'maxcgsl',
	            title : '最大采购',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'cycle',
	            title : '采购周期',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'barcode',
	            title : '条码',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'stockTotal',
	            title : '现库存',
	            align : 'center',
	            valign : 'middle'
	        }, {
	            field : 'onewarnTotal',
	            title : '一级预警',
	            align : 'center',
	            valign : 'middle',
	            formatter : function(value, row, index) {
					if (value < 0){
						return "<span style='background:#f8ac59; width: 100%;height: 100%;display: inline-block;color: #fff;'>"+row.onewarnTotal+"</span>";
					}else 
						return value;
				}
	        }, {
	            field : 'twowarnTotal',
	            title : '二级预警',
	            align : 'center',
	            valign : 'middle',
	            formatter : function(value, row, index) {
					if (value <0)
						return "<span style='background:red;background: red; width: 100%;height: 100%;display: inline-block;color: #fff;cursor:pointer;' onclick='twowarnT()'>"+row.twowarnTotal+"</span>";
					else 
						return value;
				}
	        }],
	        onClickRow: function (row, $element) {
	        	//使用这种方法来控制复选框打钩，而不用clickToSelect：true,是因为点击图片的时候存在bug
	         selectedid = row.id;
	        	if($element.find("input").is(':checked')){
	        		$element.find("input").prop("checked",false).parents("tr").siblings().find("input").prop("checked",false);
	        		$element.find("td").css("background-color","") ;
	        	}else{
	        		$element.find("input").prop("checked",true).parents("tr").siblings().find("input").prop("checked",false);
	        		$element.find("td").css("background-color","#ffffbe").parents("tr").siblings().find("td").css("background-color","");
	        	}
		     },
		     onCheck:function(row, $element){
		    	 selectedid = row.id;
		        }
	    });
    $('#flinfo_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
    });
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:25:17
 * 模块名称:辅料信息界面
 * 操作:传参
 *
 */
var  table = null;
function queryParams(params) {
	var flcode = $("#flcode").val();
	var categroymc = $("#categroymc").val();
	var minSellprice = $("#minSellprice").val();
	var maxSellprice = $("#maxSellprice").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pageSize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
            sortName: params.sort,  //排序列名  
            sortOrder:params.order, //排序方式
            flcode:flcode,
            categroymc:categroymc,
            minSellprice:minSellprice,
            maxSellprice:maxSellprice,
            onewarn:onewarn,
            twowarn:twowarn
        };  
        return temp;  
  }

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:22:33
 * 模块名称:辅料信息界面
 * 操作:得到查询的参数      
 *
 */

 function rspHandler (res) { 
    if (res) {
        return {
            "rows" : res.list,
            "total" : res.total
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
};

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:22:58
 * 模块名称:辅料信息界面
 * 操作:搜索功能
 *
 */

 function LoadingDataListOrderRealItems(){
	 $("#flinfo_table").bootstrapTable('refresh', queryParams);
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-15 下午1:18:55
  * 模块名称:辅料信息新增界面
  * 操作:新增
  *
  */
 
 function addFlInfo(){
	 layer.open({
	      type: 2,
	      title: '新增辅料单',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['700px', '450px'],
	      btn:["确定","取消"],
	      content: 'flinfo-add',
	      yes:function(index, layero){//按钮【确定】的执行的函数
	    	  		var posData = $(layero).find("iframe")[0].contentWindow.formData();
	    			if(posData.flcode == ''){
	    				layer.msg('编码不能为空！！',function(){});
	    			}else if(posData.categroymc == ''){
	    				layer.msg('物料名称不能为空！！',function(){});
	    			}else if(posData.type == ''){
	    				layer.msg('类型不能为空！！',function(){});
	    			}/*else if(posData.gunge == ''){
	    				layer.msg('规格不能为空！！',function(){});
	    			}*/else if(posData.dw == ''){
	    				layer.msg('单位不能为空！！',function(){});
	    			}else if(posData.sellprice == ''){
	    				layer.msg('价格不能为空！！',function(){});
	    			}/*else if(posData.cz == ''){
	    				layer.msg('材质不能为空！！',function(){});
	    			}else if(posData.ys == ''){
	    				layer.msg('颜色不能为空！！',function(){});
	    			}else if(posData .warntotal == ''){
	    				layer.msg('预警值不能为空！！',function(){});
	    			}else if(posData.barcode == ''){
	    				layer.msg('条码不能为空！！',function(){});
	    			}else if(posData.mincgsl == ''){
	    				layer.msg('最小采购数量不能为空！！',function(){});
	    			}else if(posData.maxcgsl == ''){
	    				layer.msg('最大采购数量不能为空！！',function(){});
	    			}else if(posData.startStock == ''){
	    				layer.msg('开始库存不能为空！！',function(){});
	    			}else if(posData.cycle == ''){
	    				layer.msg('采购周期不能为空！！',function(){});
	    			}*/else{
	    				 $.ajax({
	    				    	url:pageContext+"/flInfoController/addFlInfo",
	    					  	type:"post",
	    					 	data: posData,  
	    					  	dataType:"json",
	    					  	async:false,  
	    					    cache:false,
	    				    	success:function(data){
	    				    		alert(data.msg);
	    				    		if(data.success){
	    				    			window.location.reload();
	    				    		}
	    				 	    	},error:function(){
	    				 	    		alert("请求失败！！");
	    				 	    	}
	    					});		
	    			}
	      },btn2: function(index, layero){
	    	    //按钮【取消】的回调
    		  layer.close(index); 
    	  }
	    });
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-16 上午11:40:39
  * 模块名称:辅料信息
  * 操作:修改界面
  *
  */
 
 function updFlInfo(){
		var flag=false;
		$("#flinfo_table tr").each(function(){
				if($(this).find("input").is(":checked")){
					flag=true;
					return false;
				}
			});
		if(flag){
			 layer.open({
			      type: 2,
			      title: '修改辅料单',
			      shade: [0.8, '#393D49'],
			      maxmin: true, //开启最大化最小化按钮
			      area: ['700px', '450px'],
			      btn:["确定","取消"],
			      content: 'flinfo-upd?id='+selectedid,
			      yes:function(index, layero){//按钮【确定】的执行的函数
			    	  		var posData = $(layero).find("iframe")[0].contentWindow.formData();
			    	  		posData["id"]=selectedid;
			    			if(posData.flcode == ''){
			    				layer.msg('编码不能为空！！',function(){});
			    			}else if(posData.categroymc == ''){
			    				layer.msg('物料名称不能为空！！',function(){});
			    			}else if(posData.type == ''){
			    				layer.msg('类型不能为空！！',function(){});
			    			}/*else if(posData.gunge == ''){
			    				layer.msg('规格不能为空！！',function(){});
			    			}*/else if(posData.dw == ''){
			    				layer.msg('单位不能为空！！',function(){});
			    			}else if(posData.sellprice == ''){
			    				layer.msg('价格不能为空！！',function(){});
			    			}/*else if(posData.cz == ''){
			    				layer.msg('材质不能为空！！',function(){});
			    			}else if(posData.ys == ''){
			    				layer.msg('颜色不能为空！！',function(){});
			    			}else if(posData .warntotal == ''){
			    				layer.msg('预警值不能为空！！',function(){});
			    			}else if(posData.barcode == ''){
			    				layer.msg('条码不能为空！！',function(){});
			    			}else if(posData.mincgsl == ''){
			    				layer.msg('最小采购数量不能为空！！',function(){});
			    			}else if(posData.maxcgsl == ''){
			    				layer.msg('最大采购数量不能为空！！',function(){});
			    			}else if(posData.startStock == ''){
			    				layer.msg('开始库存不能为空！！',function(){});
			    			}else if(posData.cycle == ''){
			    				layer.msg('采购周期不能为空！！',function(){});
			    			}*/else{
			    				 $.ajax({
			    				    	url:pageContext+"/flInfoController/updateFlInfo",
			    					  	type:"post",
			    					 	data: posData,  
			    					  	dataType:"json",
			    					  	async:false,  
			    					    cache:false,
			    				    	success:function(data){
			    				    		alert(data.msg);
			    				    		if(data.success){
			    				    			window.location.reload();
			    				    		}
			    				 	    	},error:function(){
			    				 	    		alert("请求失败！！");
			    				 	    	}
			    					});		
			    			}
			      },btn2: function(index, layero){
			    	    //按钮【取消】的回调
		    		  layer.close(index); 
		    	  }
			    });
		}else{
				 layer.msg('请选择需要修改的辅料单！！',function(){});
			 }
 }

 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-16 下午3:23:26
  * 模块名称:辅料信息界面
  * 操作:上传图片
  *
  */
 
 function uploadImg(){
		var flag=false;
		$("#flinfo_table tr").each(function(){
				if($(this).find("input").is(":checked")){
					flag=true;
					return false;
				}
			});
		if(flag){
				 layer.open({
				      type: 2,
				      title: '上传图片',
				      shade: [0.8, '#393D49'],
				      maxmin: true, //开启最大化最小化按钮
				      area: ['700px', '450px'],
				      content: 'upLoadImg',
				      btn: ['保存', '取消'], //可以无限个按钮
				      yes: function(index, layero){
				    	  layer.close(index);
				    	  $("#flinfo_table").bootstrapTable('refresh', queryParams);
				      },
				      btn2: function(index, layero){
				    	  layer.close(index); 
				    	  }
				    });
			 }else{
				 layer.msg('请选择上传图片的辅料单！！',function(){});
			 }
 }
 
 /**
  * 
  * 作者:黄金高
  * 创建时间:2017-11-16 下午3:23:55
  * 模块名称:辅料模板界面
  * 操作:删除图片
  *
  */
 
function deleteFlInfo(){
	var flag=false;
	$("#flinfo_table tr").each(function(){
		if($(this).find("input").is(":checked")){
			flag=true;
			return false;
		}
	});
	if(flag){
		
	 }else{
		 layer.msg('请选择行！！',function(){});
	 }
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午2:33:46
 * 模块名称:辅料信息
 * 操作:浏览图片
 *
 */

function showImg(o){
	var flid = $(o).attr("flid");
	$(o).parent("td").siblings(".bs-checkbox").find("input").prop("checked",false); //保證點擊瀏覽圖片的時候，複選框保持打鉤狀態
	 layer.open({
	      type: 2,
	      title: '查看图片',
	      shade: [0.8, '#393D49'],
	      maxmin: true, //开启最大化最小化按钮
	      area: ['700px', '450px'],
	      btn:["确定"],
	      content: 'flinfo-image?flid='+flid,
	      yes:function(){
	    	  window.location.reload();
	      }
	    });
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:24:32
 * 模块名称:辅料信息界面
 * 操作:辅料发货明细
 *
 */

function twowarnT(){
	 layer.open({
	      type: 2,
	      title: '辅料供应商选择界面',
	      skin: 'layui-layer-demo',     //样式类名
	      shade: [0.8, '#393D49'],
	      maxmin: true,     //开启最大化最小化按钮
	      area: ['893px', '540px'],
	      content: 'flgys-select',
	      btn:['取消'],
	      cancel: function(){ 
	    	    //return false; //开启该代码可禁止点击该按钮关闭
	    	  }
	    });
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:24:53
 * 模块名称:辅料信息界面
 * 操作:导出辅料库存
 *
 */

function exportFlStock(){
	window.location.href=pageContext+"/reportController/exportFlStock";
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:24:53
 * 模块名称:辅料信息界面
 * 操作:辅料盘点单打印预览页面
 *
 */

function exportFlinventoryInfo(){
	layer.open({
	      type: 2,
	      title: '辅料盘点单打印预览页面',
	      shade: [0.8, '#393D49'],
	      maxmin: false, //开启最大化最小化按钮
	      area: ['100%', '100%'],
	      content:pageContext+"/reportController/printFlinventory"
	    });
}

/**
 * 
 * 作者:黄金高
 * 创建时间:2017-11-16 下午3:25:17
 * 模块名称:辅料信息界面
 * 操作:登记起始库存
 *
 */

function registerStock(){
	if($("#flinfo_table").bootstrapTable("getSelections").length>0){
		 layer.open({
		      type: 2,
		      title: '登记起始库存',
		      skin: 'layui-layer-demo',     //样式类名
		      shadeClose: true,     //开启遮罩关闭
		      shade: false,
		      maxmin: true,     //开启最大化最小化按钮
		      area: ['893px', '540px'],
		      content: 'flinfo-inport'
		    });
	 }else{
		 layer.msg('请选择行！！',function(){});
	 }
}
 /**
  * 调整辅料库存
  * @author 肖亮亮
  * @date 2017-11-22 13:10
  * @param  * @param null
  * @return
  **/
function adjustFlstock(){
	var flag=false;
	$("#flinfo_table tr").each(function(){
			if($(this).find("input").is(":checked")){
				flag=true;
				return false;
			}
		});
	if(flag){
		layer.open({
	        type : 2,
	        title : "包装调整界面",
	        shade : [ 0.8, '#393D49' ], // 遮罩层
	        maxmin : true, // 开启最大化最小化按钮
	        area : [ '700px', '450px' ],// 显示弹出框的宽高
	        content : 'adjustFlstock?flid='+selectedid,
	        btn:["确定","取消"],
	        yes:function(index){
	         	 layer.close(index);
	        },
	        cancel:function(index){
	       	 //取消按钮，关闭当前窗体
	       	 layer.close(index);
	        }
	    });
	}
	else{
		layer.msg("请勾选一条记录！！",function(){});
	}
}
/**
 * 
 * 作者:黄金高
 * 创建时间:2017-12-16 上午15:53:54
 * 模块名称:
 * 操作:选择框
 *
 */
var onewarn=false;
var twowarn=false;
function onewarnFun(o){
	if(!$(o).hasClass("checked")){
		$(o).addClass("checked");
		onewarn=true;
	}else{
		$(o).removeClass("checked");
		onewarn=true;
	}
}
function twowarnFun(o){
	if(!$(o).hasClass("checked")){
		$(o).addClass("checked");
		twowarn=true;
	}else{
		$(o).removeClass("checked");
		twowarn=false;
	}
}


