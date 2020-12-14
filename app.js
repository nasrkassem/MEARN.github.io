// DOM Manipulation 
// register service worker (sw)
let postsselect,postscontainer;
window.addEventListener('load',async function(){
    // 1- check service worker availability in browser (naviagtor)
    postsselect=document.getElementById('postsselect');
    postscontainer=document.getElementById('postscontainer');
    // call method will fill select with set of option (text => title of post , value=postid)
    await fillselect();
    postsselect.addEventListener('change',await displaypostdetails);
    if(navigator.serviceWorker){
        console.log('Service Worker Supported');
        // register service worker 
        // how => call register method of service worker object
        try{
        await navigator.serviceWorker.register('./sw.js');
        console.log('SW Registered !');
    }catch(error)
    {
        console.log('SW Not Registered !',error);
    }
    }else{
        console.log('Service Worker Not Supported');
    }
}); 
async function displaypostdetails(event)
{
    let targetpost= await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
    let targetpostasjson = await targetpost.json();
    postscontainer.innerHTML=`
        <div style="text-align:center;border:2px solid black;padding:10px;background-color:lightpink; margin:10px auto; width:80%;">
            <h2 style="padding:10px;border:1px solid black;text-align:Center;background-color:lightgray">${targetpostasjson.title}</h2>
            <p style="margin:10px auto; text-align:center;background-color:lightyellow;">${targetpostasjson.body}</p>
        </div>
    `;
}
async function fillselect(){
    // load posts from API 
    let allposts = await fetch('https://jsonplaceholder.typicode.com/posts');
    // console.log("posts", allposts.json());   
    let allpostsasjson = await allposts.json();
    //console.log(allpostsasjson);   
    postsselect.innerHTML=allpostsasjson.map(post=>{return `<option value="${post.id}">${post.title}</option>`});   
}