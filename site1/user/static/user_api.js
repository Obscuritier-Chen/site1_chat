let originalMd='';
function getUserPage()//话说这个命名有问题 应该是获取并渲染
{
    fetch(`${window.location.href}api/get_user_page`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='get userPage successfully')
            originalMd=data.content;
        const userPageMd=document.createElement('div');
        userPageMd.className='userPageMd';
        Vditor.preview(userPageMd, originalMd, {cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.14'});
        document.getElementsByClassName('userPage')[0].appendChild(userPageMd);
    })
    .catch(error=>{
        console.error(error);
    });
}
window.addEventListener('DOMContentLoaded',()=>{
    const pattern=/user\/(\d+)/;//正则表达式 获取user/后面的数字部分
    const pageUserUid=window.location.href.match(pattern)[1];

    const fetchPageInfo=fetch(`${window.location.href}api/get_user_info/`,{//页面用户的名字 user/n/api/get_user_info
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        document.title=data.username;
        document.getElementsByClassName('topUsername')[0].innerText=data.username;
        document.getElementsByClassName('topSignature')[0].innerText=data.signature ? data.signature : '这个人很懒，什么都没有写';
        
    })
    .catch(error=>{
        console.error(error);
    });

    fetch(`${window.location.href}api/get_user_topImage/`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='get topImage successfully')
            document.getElementsByClassName('topImage')[0].src=data.image_url;
    })
    .catch(error=>{
        console.error(error);
    });
    
    if(pageUserUid==Uid)
        ownUserPageCreate();
    else
        getUserPage();
});
function signatureUpload()
{
    const signature=document.getElementsByClassName('signatureInput')[0].value;
    if(!signatureCheck(signature))
        return;
    
    let form=new FormData();
    form.append('signature', signature);
    fetch('/user/api/update_user_signature/',{
        method: 'POST',
        body: form,
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='illegal form')
            createAlert('修改失败!');
        else if(data.message=='upload signature successfully')
        {
            createAlert('修改成功!');
            document.getElementsByClassName('topSignature')[0].innerText=signature;
        }
    })
    .catch(error=>{
        console.error(error);
    });
    document.getElementsByClassName('topSignatureEditContainer')[0].remove();
    document.getElementsByClassName('topSignatureContainer')[0].classList.remove('hidden');   
}
function imageUpload(file)
{
    console.log(file);
    const imgForm=new FormData();
    imgForm.append('topImage', file);

    fetch('/user/api/upload_user_topImage/',{
        method: 'POST',
        body: imgForm,
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='invalid file')
            createAlert('上传文件错误!');
        else if(data.message=='upload topImage successfully')
        {
            createAlert('上传头图成功!');
            document.getElementsByClassName('topImage')[0].src=data.image_url;
        }
    })
    .catch(error=>{
        console.error(error);
    });
}
function userPageUpload(markdownContent)
{
    fetch('/user/api/upload_user_page/',{
        method: 'POST',
        body: JSON.stringify({content: markdownContent}),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='Invalid JSON Data')
            createAlert('格式错误!');
        else if(data.message=='upload userPage successfully')
        {
            originalMd=data.content;
            createAlert('上传主页成功!',ownUserPageRecreate(data.content));
        }
            
    })
    .catch(error=>{
        console.error(error);
    });
}