var formData = function () {
   return $('#userAccountForm').serializeJSON();
};
$(function () {
    $.ajax({
        url: pageContext + "/userController/getWebmenugroups",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value=" + data[i].id + ">" + data[i].groupcode + "_" + data[i].groupname + "</option>";
            }
            $('#menugroupid').append(mdContent);
        }
    });
    $('#menugroupid').combobox();
        $.ajax({
            url: pageContext + "/storeController/getStoreList",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                var mdContent = '<option value="" selected="selected"></option>';
                for (var i = 0; i < data.length; i++) {
                    mdContent += "<option value=" + data[i].id + ">" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
                }
                $('#storeid').append(mdContent);
            }
        });
        $('#storeid').combobox();
});
