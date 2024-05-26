let uid;
let Username;
function ownUserPageCreate()
{

}
window.addEventListener('DOMContentLoaded',()=>{
    //md不用了
    //const pattern=/user\/(\d+)/;//正则表达式 获取user/后面的数字部分
    //uid=window.location.href.match(pattern)[1];
    fetch('/api/get_user_info/',{//用户的名字
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        
        Username=data.username;
        Uid=data.uid;
        document.getElementsByClassName('username')[0].innerText=Username;
    })
    .catch(error=>{
        console.error(error);
    });

    fetch(`${window.location.href}api/get_user_info`,{//页面用户的名字 user/n/api/get_user_info
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        //console.log(data.username);
        document.title=data.username;
        console.log(data.signature)
        document.getElementsByClassName('topUsername')[0].innerText=data.username;
        /*if(data.username==Username)//用户自己的主页
        {

        }*/
    })
    .catch(error=>{
        console.error(error);
    })
})