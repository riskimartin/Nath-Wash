var V='nathwash-v4';
var A=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png','Poppins-Medium.ttf','Poppins-Bold.ttf'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A).then(function(){return c.add('qris.png').catch(function(){})})}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin&&u.hostname!=='www.gstatic.com')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(function(r){var c=r.clone();caches.open(V).then(function(x){x.put(e.request,c)}).catch(function(){});return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('index.html')})}));
});
