#define connectPage "<!doctype html> <html lang=\"en\"> <head> <meta charset=\"utf-8\"> <title>Backlighter</title> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <style> body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial, sans-serif;} form{width:100%;max-width:300px;padding: 20px;box-sizing:border-box;border:1px solid #1eb9a4;} input{width:100%;padding:4px 2px;margin-bottom:10px;box-sizing: border-box;} button{background:#1eb9a4;border:none;width:100%;padding:10px;font-size:14px;color:#fff;} button:disabled{background:gray;pointer-events:none;} button:hover{background:#178d7d;cursor:pointer;} .hidden{display:none;} #err{font-size:12px;background:#df6a6f;color:#fff;padding:5px;margin-bottom:10px;} </style> </head> <body> <form id=\"form\"> <div id=\"err\" class=\"hidden\">Cannot connect to this point.</div> <input id=\"ssid\" name=\"ssid\" placeholder=\"SSID\"> <input id=\"pass\" name=\"pass\" placeholder=\"password\" type=\"password\"> <button disabled id=\"btn\">Connect</button> </form> <script> let ssid,pass,avai, id; const btn = document.getElementById('btn'),err = document.getElementById('err'), av=()=>{btn.disabled = !ssid||!pass;err.classList.add('hidden');}, onE=()=>{err.classList.remove('hidden');btn.innerHTML=\"Connect\";}, chnet=async()=>{ try { const r = await fetch('http://195.2.93.153/check_connection'); if(r.status==200){window.location.replace(`http://195.2.93.153/devise/add/${id}`);return;} throw new Error(); }catch(err){setTimeout(chnet,2000)}; }, chst=async()=>{ try { const r = await fetch('/status'); if(r.status!==200){onE();return;} const b = await r.text(); if(b=='wait'){setTimeout(chst,2000);return;}; if(b=='error'){onE();return;}; }catch(err){onE();return;}; setTimeout(()=>{ fetch(`/finish?ssid=${ssid}&pass=${pass}`); chnet(); }, 2000); }; document.getElementById('ssid').addEventListener('input',({target})=>{ssid=target.value;av();}); document.getElementById('pass').addEventListener('input',({target})=>{pass=target.value;av();}); document.getElementById('form').addEventListener('submit',async e=>{ e.preventDefault(); if (btn.disabled) return; btn.disabled=true; btn.innerHTML=\"Connecting...\"; try { const res=await fetch(`/setup?ssid=${ssid}&pass=${pass}`); id = await res.text(); }catch(err){onE();}; chst(); }); </script> </body> <html>"