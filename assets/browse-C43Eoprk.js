import{i as l}from"./theme-DJf8MC0t.js";import{a as m,r as f,c as h}from"./main-NwMKqaMi.js";l();const a=document.getElementById("book-grid"),t=document.getElementById("load-more-btn");let i=0;const r=24;let n=!1;const u=new URLSearchParams(window.location.search),g=u.get("topic")||"";document.querySelectorAll(".category-pill").forEach(e=>{e.removeAttribute("aria-current"),e.dataset.topic===g&&e.setAttribute("aria-current","true")});async function d(e=!1){if(n)return;n=!0,t.disabled=!0,t.textContent="Loading…",e&&(i=0,a.innerHTML=Array(r).fill("").map(()=>`<article class="book-card" aria-hidden="true">
            <div class="book-cover skeleton"></div>
            <div class="book-info">
              <div class="skeleton" style="height:1rem;width:80%;margin-bottom:0.25rem"></div>
              <div class="skeleton" style="height:0.75rem;width:60%"></div>
            </div>
          </article>`).join(""));const o=await m(r,i);if(i+=o.length,e)f(o,a);else{const s=document.createDocumentFragment();o.forEach(c=>{s.appendChild(h(c))}),a.appendChild(s)}n=!1,t.disabled=!1,t.textContent="Load More Books ↓",o.length<r&&(t.style.display="none")}d(!0);t.addEventListener("click",()=>d(!1));
