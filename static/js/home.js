


$(document).ready(function(){

    console.log('home ready!')

    //check token for users to login or sign out
    const token = localStorage.getItem('Authorization');

    // if(token){

    //     jwt.verify(token, 'wrong-secret', function(err, decoded) {
    //         // err
    //         // decoded undefined
    //     })

    //     // const {exp} = jwt.decode(token)
    //     // if (exp < (new Date().getTime() + 1) / 1000) {
    //     //     $('#signInOut').text = 'Sign in'
    //     // }else{
    //     //     $('#signInOut').text = 'Sign out'
    //     // }
    // }

    $.ajax({
            url:"/my/vertify",
            type:"GET",
            headers:{
                'Authorization': token
            },
            success:function(reponse,status){
                console.log(reponse)
                if(reponse.status == 0){
                    console.log('response: 0')
                    $('#signInOut').text('Sign out');
                    //document.getElementById('signInOut').innerHTML = 'Sign out'
                }else{
                    console.log('response: 1')
                    $('#signInOut').text('Sign in');
                }
            }
    })

})