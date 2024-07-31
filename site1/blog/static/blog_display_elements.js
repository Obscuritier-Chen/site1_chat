function getPageArray(totalPages, currentPage)//gpt写的 格式懒得改了
{
    const maxDisplayPages = 5;
    const half = Math.floor(maxDisplayPages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust the start and end if they are out of bounds
    if (start === 1) {
        end = Math.min(totalPages, maxDisplayPages);
    } else if (end === totalPages) {
        start = Math.max(1, totalPages - maxDisplayPages + 1);
    }

    // Create the page array
    const pageArray = [];
    for (let i = start; i <= end; i++) {
        pageArray.push(i);
    }

    return pageArray;
}
function commentPageGenerator(totalPages, currentPage=1)
{
    if(currentPage==1)
        document.getElementsByClassName('bi-chevron-left')[0].classList.add('chevron-disabled');
    if(currentPage==totalPages)
        document.getElementsByClassName('bi-chevron-right')[0].classList.add('chevron-disabled');
    if(currentPage>1)
        document.getElementsByClassName('bi-chevron-left')[0].classList.remove('chevron-disabled');
    if(currentPage<totalPages)
        document.getElementsByClassName('bi-chevron-right')[0].classList.remove('chevron-disabled');
    currentPageNum=currentPage;
    document.getElementsByClassName('commentPages')[0].innerHTML=''
    const pageArray=getPageArray(totalPages, currentPage);
    pageArray.forEach(page=>{
        const commentPage=document.createElement('div');
        commentPage.className='commentPage';
        commentPage.innerText=page;
        commentPage.addEventListener('click',()=>{
            getBlogComment(page);
        });
        document.getElementsByClassName('commentPages')[0].appendChild(commentPage);
    });
    document.getElementsByClassName('commentPageTotal')[0].innerText=`/${totalPages}页`;
}
document.getElementsByClassName('bi-chevron-left')[0].addEventListener('click',()=>{
    getBlogComment(currentPageNum-1);
})
document.getElementsByClassName('bi-chevron-right')[0].addEventListener('click',()=>{
    getBlogComment(currentPageNum+1);
})
document.getElementsByClassName('commentPageSkip')[0].addEventListener('click',()=>{
    const skipPage=document.getElementsByClassName('commentPageSelectInput')[0].value;
    if(skipPage<1||skipPage>totalPageNum)
        return;
    document.getElementsByClassName('commentPageSelectInput')[0].value=''
    getBlogComment(skipPage);
})
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

    const blogPublishTime=`${data.year}年${data.month}月${data.day}日 ${data.hour<10 ? '0' : ''}${data.hour}:${data.minute<10 ? '0' : ''}${data.minute}`;
    document.getElementsByClassName('blogPublishTime')[0].innerText=blogPublishTime;

    document.getElementsByClassName('blogViewNum')[0].innerText=data.view_num;

    document.getElementsByClassName('giveBlogLikeNum')[0].innerText=data.like_num;
    document.getElementsByClassName('blogLikeNum')[0].innerText=data.like_num;

    document.getElementsByClassName('blogCommentNum')[0].innerText=data.comment_num;
    document.getElementsByClassName('commentNum')[0].innerText=data.comment_num;

    const blogContent=document.getElementsByClassName('blogContent')[0];
    Vditor.preview(blogContent, data.content, {cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.14'});

    if(!data.like_status)
    {
        document.getElementsByClassName('giveBlogLikeText')[0].innerText='已点赞';
        document.getElementsByClassName('giveBlogLike')[0].classList.add('likeGiven');
    }
}
const tip=document.createElement('div');
tip.className='likeGivenTip';
tip.innerText='取消点赞';
document.getElementsByClassName('giveBlogLike')[0].addEventListener('click',()=>{
    const element=document.getElementsByClassName('giveBlogLike')[0];
    document.getElementsByClassName('giveBlogLikeText')[0].innerText=element.classList.contains('likeGiven') ? '点赞' : '已点赞';
    if(element.classList.contains('likeGiven'))
        tip.remove();
    element.classList.toggle('likeGiven');//有就删 没就添

    likeGiveOrDelete();
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

function commentsDisplay(comments)
{
    document.getElementsByClassName('commentsContainer')[0].innerHTML='';
    comments.forEach((comment)=>{
        const monocommentContainer=document.createElement('div');
        monocommentContainer.className='monocommentContainer';
        document.getElementsByClassName('commentsContainer')[0].appendChild(monocommentContainer);

        const commentTop=document.createElement('div');
        commentTop.className='commentTop';
        monocommentContainer.appendChild(commentTop);

        const commentUser=document.createElement('div');
        commentUser.className='commentUser';
        commentTop.appendChild(commentUser);

        const commentAvatar=document.createElement('div');
        commentAvatar.className='commentAvatar';
        commentUser.appendChild(commentAvatar);

        const commentUsername=document.createElement('div');
        commentUsername.className='commentUsername';
        commentUsername.innerText=comment.username;
        commentUser.appendChild(commentUsername);

        const commentContent=document.createElement('div');
        commentContent.className='commentContent';
        commentContent.innerText=comment.content;
        commentTop.appendChild(commentContent);

        const commentBottom=document.createElement('div');
        commentBottom.className='commentBottom';
        monocommentContainer.appendChild(commentBottom);

        const commentTime=document.createElement('div');
        commentTime.className='commentTime';
        commentTime.innerText=`${comment.year}年${comment.month}月${comment.day}日 ${comment.hour<10 ? '0' : ''}${comment.hour}:${comment.minute<10 ? '0' : ''}${comment.minute}`;
        commentBottom.appendChild(commentTime);

        if(comment.uid==Uid)
        {
            const commentDelete=document.createElement('div');
            commentDelete.className='commentDelete';
            commentDelete.innerText='删除'
            commentDelete.addEventListener('click', ()=>{deleteComment(comment.comment_id)});
            commentBottom.appendChild(commentDelete);
        }
    });

    commentPageGenerator(totalPageNum,currentPageNum);
}