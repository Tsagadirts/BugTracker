$(document).ready(function() {
    $('#sauvegarder').click(function() {
        if ($("#titre").val() != "" && $("#description").val() != "") {
            let info = { titre: $("#titre").val(), description: $("#description").val() };
            console.log(info);
            token = localStorage.getItem('bugTracker-token');
            userId = localStorage.getItem('bugTracker-user');


            $.ajax({
                    url: "http://greenvelvet.alwaysdata.net/bugTracker/api/add/" + token + "/" + userId,
                    method: "POST",
                    dataType: "json",
                    data: info,
                })
                .done(function(response) {
                    let bugId = response.result.bug.id;

                })
                .fail(function(response) {

                })
        }


    })
})