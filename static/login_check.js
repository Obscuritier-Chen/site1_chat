let Username=null;
let Uid=null;
(()=>{//立即调用函数
    fetch('/check_login_status/',{
        method: 'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='User not logged in')
            window.location.href='/login';
        else if(data.message=='Logged user')
        {
            Username=data.username;
            Uid=data.uid;
            document.getElementsByClassName('username')[0].innerText=Username;
        }
    })
    .catch(error=>{
        console.error(error);
    });
})()