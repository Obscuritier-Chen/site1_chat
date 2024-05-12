window.addEventListener('DOMContentLoaded',()=>{
    fetch('/check_login_status/',{
        method: 'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='User not logged in')
            window.location.href='/login';
    })
    .catch(error=>{
        console.error(error);
    });


    fetch('/api/get_username/',{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementsByClassName('username')[0].innerText=data.username;
    })
    .catch(error=>{
        console.error(error);
    });
});
document.getElementsByClassName('logout')[0].addEventListener('click',(event)=>{
    localStorage.removeItem('token');

    fetch('/user_logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response=>{
        if(response.ok)
            window.location.href='/login';
        else
            console.error('Logout failed');
    })
    .catch(error=>{
        console.error(error);
    });
});