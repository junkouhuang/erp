/*浏览图片*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    initImgList();
});

//图片列表加载
function initImgList() {
    var flid = getQueryString("flid");
    $.ajax({
        url: pageContext + "/imageController/getImagesByFlid",
        dataType: "json",
        async: true,
        data: {"flid": flid},
        type: "post",
        success: function (data) {
            $("#tbody").html(PackagData(data));
            $("#total").html(data.obj.length);
        }
    });
}

function PackagData(data) {
    var content = "";
    for (var i = 0; i < data.obj.length; i++) {
        content += "<div style='width:103px;height:155px;float:left;margin: 7px 10px;background: #dfdfe3; position: relative;'>";
        content += "<img style='width:103px;position:relative;top:6px;'src='" + data.obj[i].path + "'>";
        content += "<a href='javascript:;' onclick='datadel(this)'  style='position:absolute;top:0;right: 0;' id=" + data.obj[i].id + "> <i class='glyphicon glyphicon-remove-sign'></i></a>";
        content += "</div>";
    }
    return content;
}

/*删除图片*/
function datadel(obj) {
    var imageId = $(obj).attr("id");
    layer.confirm('确认删除吗？', function (index) {
        $.ajax({
            url: pageContext + "/imageController/deleteImageByid",
            dataType: "json",
            async: true,
            data: {"id": imageId},
            type: "post",
            success: function (data) {
                if (data.success) {
                    initImgList();
                    layer.msg(data.msg);
                } else {
                    if (data.obj != null) {
                        $(obj).parent().remove();
                        alert(data.msg);
                    } else {
                        alert(data.msg);
                    }
                }
            }
        });
        layer.close(index);
    });
}

