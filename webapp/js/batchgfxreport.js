$(function () {
	showPrompt("此处输入批次号", $("input[type='text']"));
	
	$('#excelexport').click(function(){ //打印机事件
	  // 获取页面的所有input框的对象
	  var allInputObj = getAllInput();
	  // 把页面的的所有input框的内容并接，成xxx\nxxxx\nxxxxx\nxxxxx\n
	  var finalContent = assembleInputContent(allInputObj);

	  // 获取页面的textarea框的内容
	  var textareaContent = $(".multiBatchCode").find("textarea[type='text']").val();

	  // 判断用户是否为空，当不为空才请求后台
	  if((finalContent == "" || finalContent == null || finalContent == undefined)
		  && (textareaContent == "" || textareaContent == null || textareaContent == undefined)){
		  layer.msg("请输入要打印的批次号!", function(){});
		  return;
	  }
	  var batchCodeStr;
	  console.info(finalContent);
	  console.info(textareaContent);
	  if(finalContent != "" && finalContent != null && finalContent != undefined){
          batchCodeStr = finalContent;
	  }else{
          batchCodeStr = textareaContent;
	  }
	  
      window.location.href=pageContext+"/reportController/exportSPbatchxfinfosBybatchcodes?batchCodeStr="+encodeURI(batchCodeStr);
	});
	
	// 页面所有input的获取焦点事件
	$(".inputFrameParent").delegate("input", "focus", function(){
		// 判断页面的批量输入是否有内容
        var isContent = textareaIsContent($(".multiBatchCode").find("textarea[type='text']"));
  		if(isContent){
            $("input[type='text']").attr("readonly", "true");
            layer.confirm('批量输入的批次号将会被清除', {btn: ['确定清除','取消']},
                function(index){
                    $(".multiBatchCode").find("textarea[type='text']").val("");
                    $("input[type='text']").removeAttr("readonly");
                    $("input[type='text']").focus();
                    layer.close(index);
                }
            );

		}

		// 判断是否是最后一个input框
		var isLast = lastInput($(this));
		
		if(isLast == true){
			// 生成下一个input
			createNextInput();
		}
	});
	
	// 页面所有input的失去焦点事件，判断当前是否有内容，并且下一个标签是否有内容，如果都没内容删除下一个标签
	$(".inputFrameParent").delegate("input", "blur", function(){
		// 判断当前的input框是否有内容
		var isContent = inputIsContent($(this));
		
		// 判断下一个input框对象是否有内容
		var nextInputObj = getNextInputObj($(this));
		var nextInputIsContent = inputIsContent(nextInputObj);
		

		// 当下一个input框没有内容时删除下一个input框
		if(!isContent && !nextInputIsContent ){
			// 删除下一个input框
			deleteInput(nextInputObj);
		}
		
		// 当当前的input没有内容，下一个input有内容删除当前input
		if(!isContent && nextInputIsContent){
			// 删除下一个input框
			deleteInput($(this));
		}
		
		// 如果当前input框输入了内容，下一个input框没有内容，弹出提示
		if(isContent && !nextInputIsContent){
			showPrompt("下一个批次号", $(this).parent("div").next("div").find("input[type='text']"));
		}
	});


    // 页面所有textarea的获取焦点事件
    $(".multiBatchCode").delegate("textarea", "focus", function(){
   		// 判断input是否有内容
        var isContent = inputIsContent($("input[type='text']"));
        if(isContent){
            $(".multiBatchCode").find("textarea[type='text']").attr("readonly", "true");
            layer.confirm('已输入的批次号将会被清除', {btn: ['确定清除','取消']},
				function(index){
                    deleteAllInput();
                    $(".multiBatchCode").find("textarea[type='text']").removeAttr("readonly");
                    $(".multiBatchCode").find("textarea[type='text']").focus();
                    layer.close(index);
				}
			);
		}
    });
});


// 判断input框是否有内容
function inputIsContent(thisObj){
	var content = thisObj.val();
	if(content == '' || content == null || content == undefined){
		return false;
	}else{
		return true;
	}
}

// 判断是否是最后一个input框
function lastInput(thisObj){
	// 获取下一个input框
	var nextInput = getNextInputTag(thisObj);
	
	// 判断是否是最后一个，当nextInput等于undefined时为最后一个
	if(nextInput == undefined){
		return true;
	}else{
		return false;
	}
}


// 获取页面所有input框对象的数组
function getAllInput(){
	var allInput = $("input[type='text']");
	return allInput;
}


// 获取最后一个input框
function getLastInput(){
	var allInput = getAllInput();
	var lastInput = allInput[allInput.length - 1];
	return lastInput;
}

// 获取下一个input框标签
function getNextInputTag(thisObj){
	// 获取下一个input框
	var nextInput = thisObj.parent("div").next("div").find("input[type='text']").get(0);
	return nextInput;
}

// 获取下一个input框标签
function getNextInputObj(thisObj){
	// 获取下一个input框
	var nextInputObj = thisObj.parent("div").next("div").find("input[type='text']");
	return nextInputObj;
}

// 创建下一个input
function createNextInput(){
	// 获取所有input标签的父元素inputFrameParent
	var parentTag = $(".inputFrameParent");

	// 为父标签添追加一个input标签
	parentTag.append("<div class='col-lg-2 col-md-3'>" +
			"<input class='form-control' type='text'>" +
			"</div>");
}

// 删除一个input框
function deleteInput(thisObj){
	thisObj.parent("div").remove();
}

// 组合多个input的内容，格式xxx/nxxxx/nxxxx/nxxxx/n
function assembleInputContent(thisObj){
	var finalCotent = ""
	$.each(thisObj, function(index, item){
		if($(this).val() != "" && $(this).val() != null && $(this).val() != undefined){
			finalCotent = finalCotent + $(this).val() + "\n";
		}
	});
	return finalCotent;
}

// 显示提示框
function showPrompt(text, obj){
	layer.tips(text, obj, {
        tips: [2, '#3595CC'],
        time: 3000
    });
}

// 清空input并且删除所有input只留下一个input
function deleteAllInput(){
    var allInputObj = getAllInput();
    $.each(allInputObj, function(index, item){
        if(index != 0){
            $(item).parent("div[class='col-lg-2 col-md-3']").remove();
        }else{
            $(item).val("");
        }
    });
}


// 判断textarea框是否有内容
function textareaIsContent(thisObj){
    var content = thisObj.val();
    if(content == '' || content == null || content == undefined){
        return false;
    }else{
        return true;
    }
}