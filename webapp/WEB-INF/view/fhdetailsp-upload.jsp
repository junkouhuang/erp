<!DOCTYPE HTML>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="cssPage.jsp"></jsp:include>
    <title>发货单明细追加界面</title>
    <script type="text/javascript">
        var pageContext = "${pageContext.request.contextPath}";
        var fhid = getQueryString("fhid");
        function formData(){
            if(fhid == null || fhid == "" || fhid == undefined){
                layer.msg("发货单不明确！",function(){});
                return;
            }
            $("#importWalletBalanceFrom").attr("action",pageContext+"/fhdetailSpController/importFhdetailspExcelInfo/"+fhid);
            $("#importWalletBalanceFrom").submit();
            $(function($){
                var textStr;
                $("#target").load(function(){
                    textStr = $(this);
                    var responseText = textStr[0].contentDocument.body.textContent;
                    if("SUCCESS" == responseText){
                        window.parent.location.reload();
                    }else{
                        alert(responseText);
                    }
                })
            })
        }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        };
    </script>

</head>
<body>
<div class="addMenu">
    <form id="importWalletBalanceFrom" action="${pageContext.request.contextPath}/fhdetailSpController/importFhdetailspExcelInfo/1"
          method="post"
          enctype="multipart/form-data" target="target">
        <div class="uploader orange" style="margin-left: 20%;margin-top: 2%;">
            <input type="text" class="filename" readonly="readonly"/>
            <input type="button" name="file" class="button" value="Browse..."/>
            <input type="file" name="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" runat="server"/>
            <iframe hidden name="target" id="target" width="100%" height="100%"></iframe>
        </div>
        <img style="margin-left: 20%;margin-top: 1%;border: 1px;" src="${pageContext.request.contextPath}/img/fhdetail-excel.png">
        <div>
            <span style="color: blue;margin-left: 10%;margin-top: 2%;">注意：Excel首行不计数，第一列必须是条码，第二列必须是大于0的整数</span>
        </div>
    </form>
</div>
<jsp:include page="jsPage.jsp"></jsp:include>
<script type="text/javascript">
    $(function(){
        $("input[type=file]").change(function(){$(this).parents(".uploader").find(".filename").val($(this).val());});
        $("input[type=file]").each(function(){
            if($(this).val()==""){$(this).parents(".uploader").find(".filename").val("No file selected...");}
        });
    });
</script>
</body>
</html>