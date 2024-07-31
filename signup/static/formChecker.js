function tip(element,text)
{
    element.childNodes[1].classList.add('wrongInput');

    const tipElement=document.createElement('div');
    tipElement.className='tip';
    tipElement.innerText=text;
    element.appendChild(tipElement);
}
function clearTip(father)
{
    if(father=='all')
    {
        document.querySelectorAll('.tip').forEach(element=>{element.remove();});
        document.querySelectorAll('.wrongInput').forEach(element=>{element.classList.remove('wrongInput');});
    }
    else
    {
        father.querySelectorAll('.tip').forEach(element=>{element.remove();});
        father.querySelectorAll('.wrongInput').forEach(element=>{element.classList.remove('wrongInput');});
    }
}
function postContentCheck()
{
    let flag=true;
    const username=document.getElementsByClassName('username')[0].value;
    const password=document.getElementsByClassName('password')[0].value;
    const passwordConfirm=document.getElementsByClassName('passwordConfirm')[0].value;
    const usernameRegex=/^[a-zA-Z0-9-_]{5,15}$/;
    const passwordRegex=/^[!-~]{6,30}$/;

    clearTip('all');

    if(password!=passwordConfirm)
    {
        tip(document.getElementsByClassName('passwordConfirmContainer')[0],'与密码不符');
        document.getElementsByClassName('passwordConfirm')[0].value='';
        flag=false;
    }
    if(!usernameRegex.test(username))
    {
        tip(document.getElementsByClassName('usernameContainer')[0],'非法用户名');
        flag=false;
    } 
    if(!passwordRegex.test(password))
    {
        tip(document.getElementsByClassName('passwordContainer')[0],'非法密码');
        flag=false;
    }
    return flag;
}

document.getElementsByClassName('username')[0].addEventListener('input',(event)=>{
    if(event.target.value.length==0)
    {
        clearTip(document.getElementsByClassName('usernameContainer')[0]);
        return;
    }
    const regex = /^[a-zA-Z0-9_\-]+$/;//用于检测字符串是否由字母 数字 - _ 组成
    if(event.target.value.length<5||event.target.value.length>15)
    {
        clearTip(document.getElementsByClassName('usernameContainer')[0]);
        tip(document.getElementsByClassName('usernameContainer')[0],`用户名长度应为5~15`);
    }
    else if(!regex.test(event.target.value))
    {
        clearTip(document.getElementsByClassName('usernameContainer')[0]);
        tip(document.getElementsByClassName('usernameContainer')[0],`仅支持字母数字连词符'-'下划线'_'`);
    }    
    else if(event.target.value.length>=5&&event.target.value.length<=15&&regex.test(event.target.value))
        clearTip(document.getElementsByClassName('usernameContainer')[0]);
});
document.getElementsByClassName('password')[0].addEventListener('input',(event)=>{
    if(event.target.value.length==0)
    {
        clearTip(document.getElementsByClassName('passwordContainer')[0]);
        return;
    }
    const regex=/^[!-~]+$/;
    if(event.target.value.length<6||event.target.value.length>30)
    {
        clearTip(document.getElementsByClassName('passwordContainer')[0]);
        tip(document.getElementsByClassName('passwordContainer')[0],`密码长度应为6~30`);
    }
    else if(!regex.test(event.target.value))
    {
        clearTip(document.getElementsByClassName('passwordContainer')[0]);
        tip(document.getElementsByClassName('passwordContainer')[0],'仅支持键盘可输入字符');
    }
    else if(event.target.value.length>=6&&event.target.value.length<=30&&regex.test(event.target.value))
        clearTip(document.getElementsByClassName('passwordContainer')[0]);
});
document.getElementsByClassName('passwordConfirm')[0].addEventListener('input',()=>{
    clearTip(document.getElementsByClassName('passwordConfirmContainer')[0]);
})