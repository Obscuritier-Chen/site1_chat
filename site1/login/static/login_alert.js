function tip(element,text)
{
    element.childNodes[1].classList.add('wrongInput');

    const tipElement=document.createElement('div');
    tipElement.className='tip';
    tipElement.innerText=text;
    element.appendChild(tipElement);
}
function clearTip(father)
{
    if(father=='all')
    {
        document.querySelectorAll('.tip').forEach(element=>{element.remove();});
        document.querySelectorAll('.wrongInput').forEach(element=>{element.classList.remove('wrongInput');});
    }
    else
    {
        father.querySelectorAll('.tip').forEach(element=>{element.remove();});
        father.querySelectorAll('.wrongInput').forEach(element=>{element.classList.remove('wrongInput');});
    }
}
document.addEventListener('input',(event)=>{
    if(event.target.classList.contains('username') || event.target.classList.contains('password'))
        clearTip(event.target.parentNode);
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