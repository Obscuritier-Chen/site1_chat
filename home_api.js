/*window.addEventListener('DOMContentLoaded',()=>{
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
document.getElementsByClassName('logout')[0].addEventListener('click',()=>{
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
});*/
let userPanelCondition=false;
let timeoutId;
document.querySelector('.avatar, .userPanel').addEventListener('mouseover',()=>{
    clearTimeout(timeoutId);//删除原延迟操作
    if(userPanelCondition)
        return;
    const userPanel=document.createElement('div');
    userPanel.className='userPanel';
    document.getElementsByClassName('avatar')[0].appendChild(userPanel);

    const username=document.createElement('div');
    username.className='userPanelName';
    username.innerText='username';
    userPanelCondition=true;
});
document.querySelector('.avatar, .userPanel').addEventListener('mouseleave',(event)=>{
    timeoutId=setTimeout(()=>{
        if(!document.querySelector('.avatar, .userPanel').contains(event.relatedTarget) && event.relatedTarget!=document.getElementsByClassName('userPanel')[0])//mdn搜索relatedPanel
            document.getElementsByClassName('userPanel')[0].remove(), userPanelCondition=false;
    },'100');
});