let totalPageNum,currentPageNum;
window.addEventListener('DOMContentLoaded',()=>{
    fetch(`${window.location.href}/api/get_blog_data/`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='get blog successfully')
        {
            blogDisplay(data);
            totalPageNum=Math.ceil(data.comment_num/10)
            currentPageNum=1
        }
        else if(data.message=='blog not found')
            document.body.innerHTML='404 not found';
    })
    .catch(error=>{
        console.error(error);
    });

    getBlogComment();
});
function getBlogComment(page=1)
{
    fetch(`${window.location.href}/api/get_blog_comment/${page}/`,{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='get comments successfully')
        {
            totalPageNum=Math.ceil(data.comment_num/10);
            currentPageNum=page;
            commentsDisplay(data.comments);
        }
    })
    .catch(error=>{
        console.error(error);
    });
}
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
function deleteComment(comment_id)
{
    fetch(`api/delete_blog_comment/${comment_id}/`,{
        method: 'POST',
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message=='comment deleted successfully')
        {
            totalPageNum=Math.ceil(data.comment_num/10)
            document.getElementsByClassName('blogCommentNum')[0].innerText=data.comment_num;
            document.getElementsByClassName('commentNum')[0].innerText=data.comment_num;
            commentsDisplay(data.comments);
        }
    })
    .catch(error=>{
        console.error(error);
    });
}
document.getElementsByClassName('submitCommentButton')[0].addEventListener('click',()=>{
    const content=document.getElementsByClassName('submitComment')[0].value;
    document.getElementsByClassName('submitComment')[0].value='';
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
        if(data.message=='comment created successfully')
        {
            document.getElementsByClassName('blogCommentNum')[0].innerText=data.comment_num;
            document.getElementsByClassName('commentNum')[0].innerText=data.comment_num;
            document.getElementsByClassName('blogCommentNum')[0].innerText=data.comment_num;
            document.getElementsByClassName('commentNum')[0].innerText=data.comment_num;
            commentsDisplay(data.comments);
        }
    })
    .catch(error=>{
        console.error(error);
    });
})