import"./modulepreload-polyfill-3cfb730f.js";const s="/assets/facegen-132415fe.png",a="/assets/terrain-cc075d00.png",g="/assets/mouse-95474442.png",o="/assets/textureOne-79ad020a.png",n=[`url(${s})`,`url(${a})`,`url(${g})`,`url(${o})`];let e=0;const r=document.getElementById("imageContainer");function t(){r.style.backgroundImage=n[e],e=(e+1)%n.length}t();setInterval(t,2e3);
