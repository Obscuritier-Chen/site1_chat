window.addEventListener('DOMContentLoaded',()=>{
    const socket=new WebSocket('ws://127.0.0.1:8000/ws/chat/')

    socket.onmessage=(event)=>{
        console.log(event.data);
    };
    
})
document.getElementsByClassName('publicChatSubmitBtn')[0].addEventListener('click',()=>{
    const content=document.getElementsByClassName('publicChatSubmitContent')[0].value;
    if(content.length==0)
        createAlert('内容不可为空');
    else if(content.length>400)
        createAlert('内容不可超过400字');

    let form=new FormData();
    form.append('content', content);
    fetch('api/submit_public_chat/',{
        method: 'POST',
        body: form,
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        document.getElementsByClassName('publicChatSubmitContent')[0].value='';
    })
    .catch(error=>{
        console.error(error);
    });
});