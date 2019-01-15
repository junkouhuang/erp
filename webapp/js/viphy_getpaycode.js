$(function() {
    $('#mdcode').combobox();
    $('#type').combobox();
    $('#money').combobox();
})

function getPostdata() {
    var postdata = $('#paycodeform').serializeJSON();
    return postdata;
}
