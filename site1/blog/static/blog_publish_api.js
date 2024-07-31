const titleLengthAlert=document.createElement('div');
titleLengthAlert.className='titleLengthAlert';
titleLengthAlert.innerText='标题长度需在1~30字之间';
document.getElementsByClassName('blogTitle')[0].addEventListener('input',(event)=>{
    title=event.target.value;
    if(title.length<=0||title.length>30)
        document.getElementsByClassName('blogTitleContainer')[0].appendChild(titleLengthAlert);
    else
        titleLengthAlert.remove();
})

document.getElementsByClassName('exit')[0].addEventListener('click',()=>{
    createAlert('确认退出?',()=>{window.location.href=window.location.origin;});
})
document.getElementsByClassName('publish')[0].addEventListener('click',()=>{
    if(title.length<=0||title.length>30)
        return;
    const form=new FormData();  

    form.append('title', document.getElementsByClassName('blogTitle')[0].value);
    form.append('content', vditor.getValue());
    
    fetch('/blog/publish/blog_publish/',{
        method: 'POST',
        body: form
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='blog published successfully')
            createAlert('发布成功!',()=>{window.location.href=`${window.location.origin}/blog/${data.blog_id}`});
    })
    .catch(error=>{
        console.error(error);
    });
})