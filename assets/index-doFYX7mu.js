import{i as o}from"./theme-DJf8MC0t.js";import{a as t,r}from"./main-NwMKqaMi.js";o();const e=document.getElementById("book-grid");e.innerHTML=Array(12).fill("").map(()=>`<article class="book-card" aria-hidden="true">
        <div class="book-cover skeleton" style="aspect-ratio:3/4"></div>
        <div class="book-info">
          <div class="skeleton" style="height:1rem;width:80%;margin-bottom:0.25rem"></div>
          <div class="skeleton" style="height:0.75rem;width:60%"></div>
        </div>
      </article>`).join("");t(12).then(i=>{r(i,e)});
