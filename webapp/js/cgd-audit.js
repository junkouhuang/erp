//初始化bootstrap Table
$(function(){
			//1.初始化Table
	         table=$('#audittable').bootstrapTable({  //表格ID
		        method:'POST',//请求方式（*）
		        dataType:'json',//获取的数据类型
		        toolbar:"#exampleTableEventsToolbar",
		        contentType: "application/x-www-form-urlencoded",
		        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        striped: true,//是否显示行间隔色
		        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
		        url:pageContext+'/cgdController/getCgdetailBycgid', //请求后台的url
		        singleSelect: false, //仅允许单选
		        //search: true,
		        clickToCheck:true,
		        showColumns:false, //是否显示所有的列
		        showRefresh:false,//是否显示刷新按钮
		     /*   pagination:true,*///是否显示分页（*）
		        queryParamsType: 'undefined',
		        queryParams : queryParams,//传递参数（*）
		        responseHandler:rspHandler,
		        minimumCountColumns:2,//最少允许的列数
		        pageNumber:1,                       //初始化加载第一页，默认第一页
		        pageSize: 7,                       //每页的记录行数（*）
		        pageList: [7, 20, 50, 100],        //可供选择的每页的行数（*）
		        idField :"id",
		        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		        showExport: true,                    
		        exportDataType: 'all',
		        columns: [
		  		        {
		  		            checkbox: true
		  		        }, {
		  		            field : 'id',
		  		            title : '编号',
		  		            align : 'center',
		  		            valign : 'middle',
		  		            sortable : true
		  		        }
		  		        , {
		  		            field : 'pid',
		  		            title : '项目编号',
		  		            align : 'center',
		  		            valign : 'middle',
		  		            sortable : true
		  		        },
		  		        //动态创建列名
		  		        {
		  		            field : 'cpmc',
		  		            title : '产品名称',
		  		            align : 'center',
		  		            valign : 'middle',
		  		            sortable : true
		  		        }, {
		  		            field : 'cpsl',
		  		            title : '数量',
		  		            align : 'center',
		  		            valign : 'middle'
		  		        }, {
		  		            field : 'dj',
		  		            title : '单价',
		  		            align : 'center',
		  		            valign : 'middle',
		  		            sortable : true
		  		        }, {
		  		            field : 'je',
		  		            title : '金额',
		  		            align : 'center',
		  		            valign : 'middle'
		  		        }, {
		  		            field : 'lb',
		  		            title : '物料类别',
		  		            align : 'center',
		  		            valign : 'middle'
		  		        }]
		    });
	 $('#audittable').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
     $.ajax({
 		url:pageContext+"/cgdController/getCgdAudit",
 		dataType:"json",
 		async:true,
 		type:"POST",   //请求方式
 		success:function(data){
 			var content="";
 			for(var key in data){
 				content+= "<option id='fkfs' value="+key+">"+data[key]+"</option>";
 			}
 			$("#fkfs").append(content);
 		},error:function(){
 			
 		}
 	});
});	     

var table = null;
function queryParams(params) {
	var cgid=$("body",parent.document).find(".bs-checkbox").find("input[type='checkbox']:checked").eq(0).val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			pagesize: params.pageSize,   //页面大小  
			page: params.pageNumber, //页码  
			cgid:cgid
        };  
        return temp;  
  }

//得到查询的参数      
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
 * 创建时间:2017-12-6 下午9:26:23
 * 模块名称:
 * 操作:审核传参
 *
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

/*function cgdAudit(){*/
var formData=function(){
	var idArr = $('#audittable').bootstrapTable('getSelections');
	var cgdetaidBuff = null;
	for (var i in idArr) {
		cgdetaidBuff=cgdetaidBuff + idArr[i].id+",";
	}
	var cgid=getQueryString("rowid");
	var fkfs =$("#fkfs").find("option:selected").text();
	/*var obj=document.getElementById("fkfs");
    for (i=0;i<obj.length;i++) {
       if (obj[i].selected== true ) {
    	   fkfs=obj[i].text;
       }
    }*/
	var spbz = $("#spbz").val();
	var temp={"cgdetailIdBuff":cgdetaidBuff,"cgid":cgid,"fkfs":fkfs,"spbz":spbz}
	return temp;
}
	/*$.ajax({
 		url:pageContext+"/cgdController/cgdAudit",
 		dataType:"json",
 		data:{"cgdetailIdBuff":cgdetaidBuff,"cgid":cgid,"fkfs":fkfs,"spbz":spbz},
 		async:true,
 		type:"POST",   //请求方式
 		success:function(data){
 			alert(data.msg);
 			if(data.success){
 				window.location.reload();
 			}
 		},error:function(){
 			alert("请求错误！！");
 		}
 	});*/
/*}*/
