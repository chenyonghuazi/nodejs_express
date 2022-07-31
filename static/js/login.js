//A page can't be manipulated safely until the document is "ready."
$(document).ready(function() {
    console.log( "ready!" );

    $("#login").click(function(){
        console.log('click');
        var username = $('#username').val();
        var pass = $('#pass').val();
        
        $.ajax({
            url:"/api/login",
            type:"POST",
            //contentType: "application/json",
            data:{
                username:username,
                password:pass
            },
            dataType:"json",
            success:function(response,status){
                if(response){
                    console.log(response);
                    console.log(status);

                    window.localStorage.setItem('Authorization', response.token);

                    // $.ajax({
                    //     url:"/home",
                    //     type:"GET",
                    //     // headers:{
                    //     //     'Authorization': response.token
                    //     // },
                    //     success:function(reponse,status){
                    //         console.log('home ok!')
                    //     }
                    // })

                    // Simulate a mouse click:
                    window.location.href = "/home"; //无法设置header

                    // Simulate an HTTP redirect:
                    //window.location.replace("http://www.w3schools.com");
                }
            }
        })
        

        
    });

    $("#register").click(function(){
        var username = $('#username').val();
        var pass = $('#pass').val();
        $.ajax({
            url:"/api/reguser",
            type:"POST",
            //contentType: "application/json",
            data:{
                username:username,
                password:pass
            },
            dataType:"json",
            success:function(response,status){
                if(response){
                    console.log(response);
                    console.log(status);
                }
            }
        })

    });
})