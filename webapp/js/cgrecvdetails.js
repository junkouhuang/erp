var topIndex = 0;
$(function () {
    $("#cgrecvdetail-tb").datagrid({
        columns:[[
            {field:'top',title:'',width:80,align:'center',hidden:'true'},
            {field:'ordercode',title:'到货单号',width:140,align:'center'},
            {field:'recvds',title:'到货袋数',width:80,align:'center'},
            {field:'kw',title:'库位',width:80,align:'center'},
            {field:'createtime',title:'创建时间',width:160,align:'center'},
            {field:'driver',title:'司机名称',width:100,align:'center'},
            {field:'license',title:'车牌号',width:100,align:'center'},
            {field:'drivertel',title:'司机电话',width:100,align:'center'},
            {field:'recvmanages',title:'负责人',width:60,align:'center'},
            {field:'jbrmcs',title:'扫描人员',width:180,align:'center'},
            {field:'takestarttime',title:'到货扫描开始时间',width:160,align:'center'},
            {field:'takeendtime',title:'到货扫描结束时间',width:160,align:'center'}
        ]]
    });
    getcgrecvmx();
})
function getcgrecvmx(){
    var cgdetailid = getQueryString("cgdetailid");
    //var postdata = $('#selectForm').serializeJSON();
    $('#cgrecvdetail-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/cgrecvController/getCgrecvDetailListByCgdetailid/"+cgdetailid,
        type: "POST",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                var rows = data.obj;
                for (var i = 0; i < rows.length; i++) {
                    $("#cgrecvdetail-tb").datagrid("appendRow",{
                        top: ++topIndex,
                        ordercode: rows[i].cgrecv.ordercode,
                        recvds: rows[i].recvds,
                        kw: rows[i].kw,
                        createtime: rows[i].cgrecv.createtime,
                        driver: rows[i].cgrecv.driver,
                        license: rows[i].cgrecv.license,
                        drivertel: rows[i].cgrecv.drivertel,
                        recvmanages: rows[i].cgrecv.recvmanages,
                        jbrmcs: rows[i].cgrecv.jbrmcs,
                        takestarttime: rows[i].cgrecv.takestarttime,
                        takeendtime: rows[i].cgrecv.takeendtime
                    });
                }
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};