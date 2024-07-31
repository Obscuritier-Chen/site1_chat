function errorProcess(error)
{
    clearTip('all');
    if(error=='user does not exist')
    {
        clearTip(document.getElementsByClassName('usernameContainer')[0]);
        tip(document.getElementsByClassName('usernameContainer')[0],'该用户不存在');
    }
    else if(error=='incorrect password')
    {
        clearTip(document.getElementsByClassName('passwordContainer')[0]);
        tip(document.getElementsByClassName('passwordContainer')[0],'密码错误');
    }
}
window.addEventListener('DOMContentLoaded', ()=>{
    fetch('/login/api/check_login_status/',{
        method: 'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='Logged user')
            window.location.href='/';
    })
    .catch(error=>{
        console.error(error);
    });
})
document.getElementById('loginPost').addEventListener('submit', (event)=>{
    event.preventDefault();

    const username=document.getElementsByClassName('username')[0].value;
    const password=document.getElementsByClassName('password')[0].value;

    fetch('/login/post-login/',{
        method: 'POST',
        //body: formData,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    })
    .then(response=>response.json())// return 的简写
    .then(data=>{
        'failure' in data ? errorProcess(data.failure) : 
        localStorage.setItem('token', data.token), createAlert('登录成功',()=>{window.location.href=window.location.origin;});//保存token
    })
    .catch(error=>{
        console.error(error);
    })
});