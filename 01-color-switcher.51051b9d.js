!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")},e=null,n="";t.btnStop.setAttribute("disabled","disabled"),t.btnStart.addEventListener("click",(function(){e=setInterval((function(){n="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),t.body.style.backgroundColor=n,t.btnStart.setAttribute("disabled","disabled"),t.btnStop.removeAttribute("disabled")}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(e),t.btnStart.removeAttribute("disabled"),t.btnStop.setAttribute("disabled","disabled")}))}();
//# sourceMappingURL=01-color-switcher.51051b9d.js.map
