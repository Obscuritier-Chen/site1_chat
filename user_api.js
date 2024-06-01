let uid;
function editSignature()
{
    document.getElementsByClassName('topSignatureContainer')[0].classList.add('hidden');

    const topSignatureEditContainer=document.createElement('div');
    topSignatureEditContainer.className='topSignatureEditContainer';
    document.getElementsByClassName('topUserText')[0].appendChild(topSignatureEditContainer);

    const signatureInput=document.createElement('input');
    signatureInput.className='signatureInput';
    topSignatureEditContainer.appendChild(signatureInput);


}
function ownUserPageCreate()
{
    //创建signatureEdit元素
    //svg真tmd恶心
    const pencilPath='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z';
    const signatureEdit=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    signatureEdit.setAttribute("class", "signatureEdit")
    signatureEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    signatureEdit.setAttribute("width", "16");
    signatureEdit.setAttribute("height", "16");
    signatureEdit.setAttribute("fill", "currentColor");
    signatureEdit.setAttribute("viewBox", "0 0 16 16");
    signatureEdit.onclick=editSignature;

    const signatureEditPath=document.createElementNS("http://www.w3.org/2000/svg", "path");
    signatureEditPath.setAttribute('d',pencilPath);
    signatureEdit.appendChild(signatureEditPath);

    document.getElementsByClassName('topSignatureContainer')[0].appendChild(signatureEdit);

}
window.addEventListener('DOMContentLoaded',()=>{
    //md不用了
    //const pattern=/user\/(\d+)/;//正则表达式 获取user/后面的数字部分
    //uid=window.location.href.match(pattern)[1];
    const fetchOwnInfo=fetch('/api/get_user_info/',{//用户的名字
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        //ownUsername=data.username;
        Uid=data.uid;
        document.getElementsByClassName('username')[0].innerText=data.username;
        Username=data.username;
        return {ownUsername: data.username};
    })
    .catch(error=>{
        console.error(error);
    });

    const fetchPageInfo=fetch(`${window.location.href}api/get_user_info`,{//页面用户的名字 user/n/api/get_user_info
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        document.title=data.username;
        console.log(data.signature)
        document.getElementsByClassName('topUsername')[0].innerText=data.username;
        return {pageUsername: data.username};
    })
    .catch(error=>{
        console.error(error);
    });
    
    Promise.all([fetchOwnInfo, fetchPageInfo])//当own和page都执行完毕后再执行
    .then(result=>{
        if(result[0].ownUsername==result[1].pageUsername)
            ownUserPageCreate();
    })
    .catch(error=>{
        console.error(error);
    });
})