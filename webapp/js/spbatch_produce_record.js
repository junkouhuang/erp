//执行一个laydate实例
laydate.render({
	  elem: '#time',
	  range: true
});


function queryParams(params) {
	time = $("#time").val();
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
            pageSize: params.pageSize,   //页面大小  
            pageNumber: params.pageNumber, //页码  
            mdcode:mdCode,
            starttime:startTime,
            endtime:endTime,
            querytype:queryType
        };  
        return temp;

}

//得到查询的参数      
function rspHandler (res) {
   if (res) {
       return {
           "rows" : res.list,
           "total" :res.total
       };
   } else {
       return {
           "rows" : [],
           "total" : 0
       };
   }
};


var shelfTimeTop;
var shelfTimeEnd;
//点击搜索加载批次生产记录信息
function LoadingBatchProduceRecordInfo(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	if((shelfTimeTop == null || shelfTimeTop == '') && (shelfTimeEnd == null || shelfTimeEnd == '')){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	
	//发送请求到后台请求打印
	requestBackendPrintBatchProduceRecord();
}

//打印发货报表
function printBatchProduceRecord(){
	//window.location.href="reportController/printProduceRecord";
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	if((shelfTimeTop == null || shelfTimeTop == '') && (shelfTimeEnd == null || shelfTimeEnd == '')){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	
	//发送请求到后台请求打印
	requestBackendPrintBatchProduceRecord();
}

//请求后台进行输出打印的报表
function requestBackendPrintBatchProduceRecord(){
	window.location.href="reportController/exportProduceRecordExcel?" +
	"shelfTimeTop="+shelfTimeTop
	+"&shelfTimeEnd="+shelfTimeEnd;
}

//获取页面输入的参数
function getPageParam(){
	//获取时间
	var time = $("#time").val();
	if(time == ""){
		shelfTimeTop = "";
		shelfTimeEnd = "";
	}else{
		var timeArray = time.split(" - ");
		shelfTimeTop = timeArray[0];
		shelfTimeEnd = timeArray[1];
	}
}
