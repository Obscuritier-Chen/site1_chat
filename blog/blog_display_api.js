function blogDisplay(data)
{
    fetch(`${window.location.origin}/user/${data.uid}/api/get_user_info/`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementsByClassName('blogAuthorName')[0].innerText=data.username;
    })
    .catch(error=>{
        console.error(error);
    });

    const blogPublishTime=`${data.year}年${data.month}月${data.day}日 ${data.hour}:${data.minute}`;
    document.getElementsByClassName('blogPublishTime')[0].innerText=blogPublishTime;

    document.getElementsByClassName('blogViewNum')[0].innerText=data.view_num;

    const blogContent=document.getElementsByClassName('blogContent')[0];
    Vditor.preview(blogContent, data.content, {cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.14'});
}
window.addEventListener('DOMContentLoaded',()=>{
    fetch(`${window.location.href}/api/get_blog_data/`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='get blog successfully')
            blogDisplay(data);
        else if(data.message=='blog not found')
            document.body.innerHTML='404 not found'
    })
    .catch(error=>{
        console.error(error);
    });
});
const tip=document.createElement('div');
tip.className='likeGivenTip';
tip.innerText='取消点赞';
document.getElementsByClassName('giveBlogLike')[0].addEventListener('click',()=>{
    const element=document.getElementsByClassName('giveBlogLike')[0];
    document.getElementsByClassName('giveBlogLikeText')[0].innerText=element.classList.contains('likeGiven') ? '点赞' : '已点赞';
    if(element.classList.contains('likeGiven'))
        tip.remove();
    element.classList.toggle('likeGiven');//有就删 没就添
});
document.getElementsByClassName('giveBlogLike')[0].addEventListener('mouseover',()=>{
    const element=document.getElementsByClassName('giveBlogLike')[0];
    if(element.classList.contains('likeGiven'))
        element.parentNode.appendChild(tip);
});
document.getElementsByClassName('giveBlogLike')[0].addEventListener('mouseleave',()=>{
    const element=document.getElementsByClassName('giveBlogLike')[0];
    if(element.classList.contains('likeGiven'))
        tip.remove();
});