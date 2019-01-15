//执行一个laydate实例
laydate.render({
	  elem: '#time',
	  range: true
});

var start;
var end;

//打印发货报表
function printScrapOrder(){
	//获取页面输入的参数
	getPageParam();
	
	//判断是否有输入条件
	if((start == null || start == '' || start == undefined) && (end == null || end == '' || end == undefined)){
		layer.msg("请输入条件进行打印！", function(){});
		return false;
	}
	
	//发送请求到后台请求打印
	scrapOrderReport();
}

//请求后台进行输出打印的报表
function scrapOrderReport(){
	window.location.href="reportController/exportSPBFDanExcel?mdcode="
	+"&start="+start
	+"&end="+end;
}

//获取页面输入的参数
function getPageParam(){
	//获取时间
	var time = $("#time").val();
	
	if(time == "" || time == null || time == undefined){
		start = "";
		end = "";
	}else{
		var timeArray = time.split(" - ");
		start = timeArray[0];
		end = timeArray[1];
	}
}
