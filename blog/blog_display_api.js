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
function likeGiveOrDelete()
{
    fetch(`${window.location.href}/api/give_delete_like/`,{
        method: 'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='blog like successfully'||data.message=='blog like delete successfully')
        {
            document.getElementsByClassName('giveBlogLikeNum')[0].innerText=data.like_num;
            document.getElementsByClassName('blogLikeNum')[0].innerText=data.like_num;
        }
    })
    .catch(error=>{
        console.error(error);
    });
}
document.getElementsByClassName('submitCommentButton')[0].addEventListener('click',()=>{
    const content=document.getElementsByClassName('submitComment')[0].value;
    if(content.length>200||content.length==0)
        return;

    let form=new FormData();
    form.append('content', content);

    fetch(`${window.location.href}/api/create_blog_comment/`,{
        method: 'POST',
        body: form//JSON.stringify({content: content}),
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    })
    .catch(error=>{
        console.error(error);
    });
})