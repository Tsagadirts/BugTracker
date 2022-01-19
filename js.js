$(document).ready(function() {

    // Evenement  formulaire d'inscription (s'inscrire)
    $("#show-signin-form-btn").click(function() {
        $('#signin-btn').css('display', 'block');
        $('.hidden-input').css('display', 'block');
        $('#show-signin-form-btn').css('display', 'none');
        $('#login-btn').css('display', 'none');
        $('#show-signup-form-btn').css('display', 'block');
    });

    // Evenement formulaire de connexion (entrer)
    $("#show-signup-form-btn").click(function() {
        $('#signin-btn').css('display', 'none');
        $('.hidden-input').css('display', 'none');
        $('#show-signup-form-btn').css('display', 'none');
        $('#login-btn').css('display', 'block');
        $('#show-signin-form-btn').css('display', 'block');
    });

    // Evenemnt btn s'inscrire envoie les données vers l'API
    $("#signin-btn").click(function() {
        let userNAme = $("#userName").val();
        let pswd = $("#pswd").val();
        let confirmPswd = $("#confirm-pswd").val();
        // Confirmation du mdp
        if (pswd == confirmPswd) {
            $.ajax({
                    url: "http://greenvelvet.alwaysdata.net/bugTracker/api/signup/" + userNAme + "/" + pswd,
                    method: "GET",
                    dataType: "json",
                })
                .done(function(response) {

                    let userId = response.result.id;
                    let message = response.result.message;
                    let token = response.result.token; //avoir un jeton
                    localStorage.setItem('bugtracker-token', token);

                    if (response.result.status == "done") {
                        $('.alert').remove();
                        $("<p class='alert alert-success'>" + message + "</p>").appendTo("legend");
                        //$(location).attr('href', '#');
                    } else {
                        $('.alert').remove();
                        $("<p class='alert alert-danger'>" + message + "</p>").appendTo("legend");
                    }
                })
                .fail(function(response) {
                    $('.alert').remove();
                    $("<p class='alert alert-danger'>Non enregistré</p>").appendTo("legend");
                });
        } else {
            $('.alert').remove();
            $("<p class='alert alert-danger'>Pas le meme mot de passe</p>").appendTo("legend");
        }

    });

    $('#login-btn').click(function() {
        let userNAme = $("#userName").val();
        let pswd = $("#pswd").val();

        $.ajax({
                url: "http://greenvelvet.alwaysdata.net/bugTracker/api/login/" + userNAme + "/" + pswd,
                method: "GET",
                dataType: "json"
            })
            .done(function(response) {
                let userId = response.result.id;
                let message = response.result.message;
                let token = response.result.token;

                localStorage.setItem('bugTracker-user', userId);
                localStorage.setItem('bugTracker-token', token);

                if (response.result.status == "done") {
                    $(location).attr('href', '/logged.html'); //chemin vers la nouvelle page 
                } else {
                    $('.alert').remove();
                    $("<p class='alert alert-danger'>" + message + "</p>").appendTo("legend");
                }
            })
            .fail(function(response) {
                $('.alert').remove();
                $("<p class='alert alert-danger'>Connexion non reçue</p>").appendTo("legend");
            });
    });

});