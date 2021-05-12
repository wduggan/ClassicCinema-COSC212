/*global $*/
var GetCartContents=(function (){
    "use strict";
    var pub = {};
    var cartData = window.sessionStorage.getItem("cart");

    pub.setup= function(){
        $.ajax({
            type:"POST",
            url:'php/processCartContents.php',
            cache: false,
            data: cartData,
            datatype: 'JSON',
            contentType:"application/json; charset=utf-8",
            success: function(data){
                $("#movieTable").html(data);
                window.sessionStorage.clear();
            },
            error: function(data){
                window.alert("Ajax Failed");
            }
        });
    };

    return pub;
}());
$(document).ready(GetCartContents.setup);