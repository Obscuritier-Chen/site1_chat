function signatureCheck(signature)
{
    if(signature.length>50)
    {
        createAlert('字数不得超过50!');
        return false;
    }
    const regex=/^[!-~]+$/;
    if(!regex.test(signature))
    {
        createAlert('非法字符,仅支持键盘可输入字符!')
        return false;
    }
        
    return true;
}
function editSignature()
{
    document.getElementsByClassName('topSignatureContainer')[0].classList.add('hidden');

    const topSignatureEditContainer=document.createElement('div');
    topSignatureEditContainer.className='topSignatureEditContainer';
    document.getElementsByClassName('topUserText')[0].appendChild(topSignatureEditContainer);

    const signatureInput=document.createElement('input');
    signatureInput.className='signatureInput';
    topSignatureEditContainer.appendChild(signatureInput);

    const signatureConfirm=document.createElement('div');
    signatureConfirm.className='signatureConfirm';
    signatureConfirm.innerText='确认';
    signatureConfirm.addEventListener('click',signatureUpload);
    topSignatureEditContainer.appendChild(signatureConfirm);
}
function imageUploadHover()
{
    if(!document.getElementsByClassName('topImageUploadInfo')[0])
    {
        const info=document.createElement('div');
        info.className='topImageUploadInfo';
        info.innerText='点击上传头图';
        document.getElementsByClassName('userTop')[0].appendChild(info);
    }
}
function imageUploadClick()
{
    if(document.getElementsByClassName('topImageUploadInfo')[0])
        document.getElementsByClassName('topImageUploadInfo')[0].remove();

    const imgInput=document.createElement('input');//虚拟的图片上传元素
    imgInput.type='file';
    imgInput.accept='image/*';
    imgInput.addEventListener('change',(event)=>{//监听文件选择事件
        imageUpload(event.target.files[0]);
    })
   imgInput.click();
}
function ownUserPageRecreate(content)//userPage元素 recreate
{
    document.querySelectorAll('.vditor, .vditorButtonContainer').forEach((element)=>{
        element.remove();
    });

    const editUserPage=document.createElement('input');
    editUserPage.type='button';
    editUserPage.className='editUserPage';
    editUserPage.value='编辑';
    editUserPage.addEventListener('click', vditorCreate);
    document.getElementsByClassName('userPage')[0].appendChild(editUserPage);

    const userPageMd=document.createElement('div');
    userPageMd.className='userPageMd';
    Vditor.preview(userPageMd, content, {cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.14'});
    document.getElementsByClassName('userPage')[0].appendChild(userPageMd);
}
function vditorCreate()
{
    document.querySelectorAll('.editUserPage, .userPageMd').forEach((element)=>{
        element.remove();
    });

    const vditorElement=document.createElement('div');
    vditorElement.id='vditor';
    vditorElement.className='vditor';
    document.getElementsByClassName('userPage')[0].appendChild(vditorElement);

    const vditor = new Vditor('vditor', {
        height: 500,
        toolbarConfig: {
            pin: true,
        },
        cache: {
            id: 'vditor',
        },
        "mode": "sv",
        "preview": {
            "mode": "both"
        }
    });

    const buttonContainer=document.createElement('div');
    buttonContainer.className='vditorButtonContainer';
    document.getElementsByClassName('userPage')[0].appendChild(buttonContainer);

    const vditorSave=document.createElement('input');
    vditorSave.type='button';
    vditorSave.className='vditorSave';
    vditorSave.value='保存';
    vditorSave.addEventListener('click',()=>{
        const markdownContent = vditor.getValue();
        userPageUpload(markdownContent);
    });
    buttonContainer.appendChild(vditorSave);

    const vditorCancel=document.createElement('input');
    vditorCancel.type='button';
    vditorCancel.className='vditorCancel';
    vditorCancel.value='取消';
    vditorCancel.addEventListener('click',()=>{
        ownUserPageRecreate(originalMd);
    });
    buttonContainer.appendChild(vditorCancel);
}
function ownUserPageCreate()//整个页面
{
    //创建signatureEdit元素
    //svg真tmd恶心
    const editPath='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z';
    const signatureEdit=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    signatureEdit.setAttribute("class", "signatureEdit")
    signatureEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    signatureEdit.setAttribute("width", "16");
    signatureEdit.setAttribute("height", "16");
    signatureEdit.setAttribute("fill", "currentColor");
    signatureEdit.setAttribute("viewBox", "0 0 16 16");
    signatureEdit.addEventListener('click',editSignature);

    const signatureEditPathElement=document.createElementNS("http://www.w3.org/2000/svg", "path");
    signatureEditPathElement.setAttribute('d',editPath);
    signatureEdit.appendChild(signatureEditPathElement);

    document.getElementsByClassName('topSignatureContainer')[0].appendChild(signatureEdit);


    const uploadPath1='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z';
    const uploadPath2='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z';
    const uploadIcon=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    uploadIcon.setAttribute("class", "topImageUpload");
    uploadIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    uploadIcon.setAttribute("width", "16");
    uploadIcon.setAttribute("height", "16");
    uploadIcon.setAttribute("fill", "currentColor");
    uploadIcon.setAttribute("viewBox", "0 0 16 16");
    uploadIcon.addEventListener('mouseover', imageUploadHover);
    uploadIcon.addEventListener('mouseout', ()=>{if(document.getElementsByClassName('topImageUploadInfo')[0]){document.getElementsByClassName('topImageUploadInfo')[0].remove();}});
    uploadIcon.addEventListener('click', imageUploadClick);

    const uploadPathElement1=document.createElementNS("http://www.w3.org/2000/svg", "path");
    const uploadPathElement2=document.createElementNS("http://www.w3.org/2000/svg", "path");
    uploadPathElement1.setAttribute('d',uploadPath1);
    uploadPathElement2.setAttribute('d',uploadPath2);
    uploadIcon.appendChild(uploadPathElement1);
    uploadIcon.appendChild(uploadPathElement2);
    document.getElementsByClassName('userTop')[0].appendChild(uploadIcon);


    const editUserPage=document.createElement('input');
    editUserPage.type='button';
    editUserPage.className='editUserPage';
    editUserPage.value='编辑';
    editUserPage.addEventListener('click', vditorCreate);
    document.getElementsByClassName('userPage')[0].appendChild(editUserPage);

    getUserPage();//感觉有点过于简洁了(
}