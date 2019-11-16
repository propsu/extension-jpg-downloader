const btn = document.querySelector('.btn');
const getImgs = ()=>{
    var srcs="";
    chrome.tabs.executeScript({
        code: `var img = document.querySelectorAll('img'); 
        var srcs=[];
            for(let i=0; i<img.length;i++){
                srcs[i] = img[i].src;

            }
        srcs;
        `
    }, function (result) {
        srcs = result[0];
        createImgs(srcs);
    });
    
    
};

    function download(url, id){
    const name = document.querySelector('input[name="name"]').value;
        var downloading = chrome.downloads.download({
            url: url,
            filename: name+'-'+(id)+'.jpg'
        },function (d){
            console.log('Started downloading: '+d);
        });
    }

const createImgs = (srcs)=>{
    const imagesDiv = document.querySelector('.images');
    var imgs=new Array();
    for(let i=0;i < srcs.length; i++){
        imgs[i] = document.createElement('img');
        imgs[i].src = srcs[i];
        imgs[i].dataset.selected="true";
        imgs[i].classList.add('selected');

        imgs[i].addEventListener('click',(e)=>{
            const target = e.currentTarget;
            if(target.dataset.selected=='true'){
                target.dataset.selected='false';
                target.classList.add('deselected');
                target.classList.remove('selected');
            } else {
                target.dataset.selected='true';
                target.classList.add('selected');
                target.classList.remove('deselected');
            }
            
        });
        imagesDiv.append(imgs[i]);
    }
    const input = document.createElement('input');
    input.type='text';
    input.placeholder="Session's name";
    input.name='name';
    document.querySelector('body').append(input);

    const btnDown = document.createElement('button');
    btnDown.innerHTML="Download selected";
    btnDown.addEventListener('click', (e)=>{

     var imgSrc = new Array();   
        imgs.forEach((img)=>{
            const flag = img.classList.contains('selected');
            if(flag) imgSrc.push(img);
        });
        console.log('STARTED DOWNLOAD');
        imgSrc.forEach((img, i)=>{
            download(img.src, i);
        });
        
        
    });
    document.querySelector('body').append(btnDown);
};
        
btn.addEventListener('click', ()=>{
    getImgs();
});
