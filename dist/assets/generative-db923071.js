import"./modulepreload-polyfill-3cfb730f.js";const s="/assets/facegen-132415fe.png",a="/assets/terrain-cc075d00.png",g="/assets/ant-1515735b.png",r="/assets/textureOne-79ad020a.png",n=[`url(${s})`,`url(${a})`,`url(${g})`,`url(${r})`];let e=0;const c=document.getElementById("imageContainer");function t(){c.style.backgroundImage=n[e],e=(e+1)%n.length}t();setInterval(t,2e3);