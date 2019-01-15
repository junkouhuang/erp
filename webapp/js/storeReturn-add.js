$(function(){


	$.ajax({
		type:"post",
		DataType:"json",
        async:false,
        cache:false,
		url:pageContext+"/storeController/getStoreList",
		success:function (data) {
			if (data != null){
				var mdContent = '<option value="" selected="selected">选择门店</option>';
                $.each(data,function(index,item){
                    mdContent += "<option value="+item.mdcode+">"+item.mdcode+"_"+item.mdmc+"</option>";
                });
                $("#mdcode").append(mdContent);
			}
        }
	})

    $("#mdcode").combobox();


    /*$.ajax({
        type:"post",
        dataType:"json",
        async:"true",
        url:pageContext+"/storeReturnController/addStoreReturnOrder",
        success:function (data) {
            layer.msg(data.msg);
        }
    })*/
})


function getPostdata() {
    var postdata = $('#addStoreReturnFrom').serialize();
    return postdata;
}


