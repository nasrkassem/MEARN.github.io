// code for service worker object
// sw => event driven => sw (listen events ) , install (set caches ) ,
// cache object 
let cachename='static-cache';
let cachedassets=[
    './index.html',
    './contact.html',
    './about.html',
    './UP/1.jpg',
    './UP/2.jpg',
    './style.css',
    './fallback.json'
];

self.addEventListener('install',async function(){
    console.log('install');
    // write caches 
    // how to create cache 
    // caches API => open (create) . match () , delete , keys , put 
   let createdcache= await caches.open(cachename);
   await createdcache.addAll(cachedassets);
    await self.skipWaiting();

});// end of install event

// actiavte (clear old caches ), 
self.addEventListener('activate',async function(){
    console.log('activate');
    // to clear old version sof caches 
    //1- get all caches
    let allcaches=await caches.keys();

    //2- compare between current cache and iterated one 
    // for(i=0;i<allcaches.length;i++){
    //     if(allcaches[i]!=cachename)
    //     {
    //         await caches.delete(allcaches[i]);
    //     }
    // }
    //3- if match false = > delete current iterated cache
    // navigator object in js (BOM) => 
});
//fetch (return response to user)
self.addEventListener('fetch',async function(event){
    console.log('fetch');
    // cach strategies (1- cache first , network first , fallback strategy)
    if(!navigator.onLine)
    {
        // load from cache

        await event.respondWith(cachefirst(event.request));
        //caches.match(event.request);
    }else{
        //load from internet from network
        return await event.respondWith(networkfirst(event.request)); 
    }
    
    //Cach First // await event.respondWith(caches.match(event.request));
});

async function cachefirst(req)
{
    return await caches.match(req)||await caches.match('fallback.json');
}
async function networkfirst(req)
{
    //create dynamic cach
    let dynamiccache=await caches.open('cache-dynamic');

    // take response for fetched request
    let resp= await fetch(req);
    // cache response inside dynamic cache
    await dynamiccache.put(req,resp.clone());
    // return response to user   
    return resp; 

}




