document.getElementsByClassName('logo')[0].addEventListener('click',()=>{
    window.location.href=window.location.origin;//仅获取页面地址
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
});
let userPanelCondition=false;
let timeoutId;
document.getElementsByClassName('avatar')[0].addEventListener('mouseover',()=>{
    clearTimeout(timeoutId);//删除原延迟操作
    if(userPanelCondition)
        return;
    const userPanel=document.createElement('div');
    userPanel.className='userPanel';
    userPanel.addEventListener('mouseover',()=>{
        clearTimeout(timeoutId);
    });
    userPanel.addEventListener('mouseleave',()=>{
        timeoutId=setTimeout(()=>{
            document.getElementsByClassName('userPanel')[0].remove(), userPanelCondition=false;
        },'70');
    });
    document.getElementsByClassName('avatarContainer')[0].appendChild(userPanel);

    const username=document.createElement('div');
    username.className='panelUsername';
    username.innerText=Username;
    userPanel.appendChild(username);

    const functionalZone=document.createElement('div');//给几个选项的container
    functionalZone.className='panelZone';
    userPanel.appendChild(functionalZone);
    //重复四遍很烂，但懒得写一个函数了
    const personalPage=document.createElement('div');
    personalPage.className='panelFunction';
    personalPage.innerText='个人主页';
    functionalZone.appendChild(personalPage);

    const setting=document.createElement('div');
    setting.className='panelFunction';
    setting.innerText='隐私设置';
    functionalZone.appendChild(setting);

    const blog=document.createElement('div');
    blog.className='panelFunction';
    blog.innerText='个人博客';
    functionalZone.appendChild(blog);

    const cloudStorage=document.createElement('div');
    cloudStorage.className='panelFunction';
    cloudStorage.innerText='云存储区';
    functionalZone.appendChild(cloudStorage);

    userPanelCondition=true;
});
document.getElementsByClassName('avatar')[0].addEventListener('mouseleave',()=>{
    timeoutId=setTimeout(()=>{
        document.getElementsByClassName('userPanel')[0].remove(), userPanelCondition=false;
    },'70');
});
document.querySelectorAll('.avatarContainer, .username').forEach((element)=>{
    element.addEventListener('click',()=>{
        window.location.href=`/user/${Uid}`;
    })
})
document.getElementsByClassName('avatarContainer')[0].addEventListener('click',()=>{
    window.location.href=`/user/${Uid}`;
});
function createAlert(text,confirmF=()=>{})//传文本内容 confirm执行的函数 使用了默认参数为空函数
{
    const container=document.createElement('div');
    container.className='alertContainer';
    document.getElementsByClassName('container')[0].appendChild(container);

    const alert=document.createElement('div');
    alert.className='alert';

    container.appendChild(alert);

    const content=document.createElement('div');
    content.className='alertContent';
    content.innerText=text;
    alert.appendChild(content);

    const confirm=document.createElement('input');
    confirm.className='alertConfirm';
    confirm.type='button';
    confirm.value='确认';
    confirm.addEventListener('click',()=>{container.remove();});
    confirm.addEventListener('click',confirmF);
    alert.appendChild(confirm);
}