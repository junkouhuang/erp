$(function(){
    $.ajax({
        url: pageContext + "/logisticsController/getLogisticsInfo",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var wlgsContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.obj.length; i++) {
                wlgsContent += "<option>" + data.obj[i].name +"</option>";
            }
            $('#wlgsList').append(wlgsContent);
        }
    });
    $('#wlgsList').combobox();
})
function formData() {
    var wlgs = $("#wlgsList").val();
    return wlgs;
}