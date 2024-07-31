function createAlert(text)
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
    confirm.onclick=function(){container.remove();};
    alert.appendChild(confirm);
}