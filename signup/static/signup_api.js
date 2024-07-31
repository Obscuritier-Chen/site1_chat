function errorProcess(error)
{
    clearTip('all');
    if(error=='existing username')
    {
        tip(document.getElementsByClassName('usernameContainer')[0], '该用户名已存在');
        //document.getElementsByClassName('username')[0].value=''; 感觉效果不好
    }
    else if(error=='illegal form')
    {
        document.getElementsByClassName('username')[0].value='', document.getElementsByClassName('password')[0].value='', document.getElementsByClassName('passwordConfirm')[0].value='';
        alert('非法表单');
        console.error('Do not attempt to bypass the check');
    }
}
document.getElementById('signUpPost').addEventListener('submit', (event)=>{
    event.preventDefault();
    if(!postContentCheck())
        return false;

    let formData=new FormData(document.getElementById('signUpPost'));
    formData.delete('passwordConfirm');

    fetch('/signup/post-new-user/',{
        method: 'POST',
        body: formData,
    })
    .then(response=>{
        if(!response.ok)
            throw new Error('network response is not ok')
        return response.json();
    })
    .then(data=>{
        'error' in data ? errorProcess(data.error) : createAlert('注册成功!');//若服务端返回的字段键为error
    })
    .catch(error=>{
        console.error(error);
    })
});