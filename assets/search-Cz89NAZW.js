import{i as s}from"./theme-DJf8MC0t.js";import{s as i,r as a}from"./main-NwMKqaMi.js";s();const r=document.getElementById("book-grid"),n=document.getElementById("empty-state"),o=document.getElementById("results-count"),d=new URLSearchParams(window.location.search),e=d.get("q")||"";e?(document.getElementById("search-input").value=e,r.innerHTML=Array(6).fill("").map(()=>`<article class="book-card" aria-hidden="true">
          <div class="book-cover skeleton" style="aspect-ratio:3/4"></div>
          <div class="book-info">
            <div class="skeleton" style="height:1rem;width:80%;margin-bottom:0.25rem"></div>
            <div class="skeleton" style="height:0.75rem;width:60%"></div>
          </div>
        </article>`).join(""),o.textContent=`Searching for "${e}"…`,i(e).then(t=>{t.length===0?(r.innerHTML="",n.hidden=!1,o.textContent=`No results for "${e}".`):(n.hidden=!0,o.textContent=`${t.length} result${t.length!==1?"s":""} for "${e}"`,a(t,r))})):(o.textContent="Enter a search term above to find books.",n.hidden=!1,n.innerHTML="<p>Enter a search term to find books.</p>");
