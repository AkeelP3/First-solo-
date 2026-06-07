import{i as p}from"./theme-DJf8MC0t.js";import{f as v,g as m,b as g,d as u}from"./main-NwMKqaMi.js";p();const h=new URLSearchParams(window.location.search),i=h.get("id"),a=document.getElementById("book-detail");i?v(i).then(e=>{if(!e){a.innerHTML='<div class="empty-state"><p>Book not found. <a href="/">Browse books</a>.</p></div>';return}const t=e.title||"Untitled",r=m(e),n=g(e),d=u(e),o=(e.subjects||[]).slice(0,5),c=e.download_count||0,s=(e.languages||[]).join(", ").toUpperCase(),l=o.length>0?o.join(", "):"A classic work from Project Gutenberg.";document.title=`${t} — OpenPage`,document.getElementById("breadcrumb-current").textContent=t,a.innerHTML=`
          <div class="book-detail-cover">
            ${n?`<img src="${n}" alt="${t} cover" />`:`<div class="placeholder-cover" style="font-size:3rem">${t.charAt(0).toUpperCase()}</div>`}
          </div>
          <div class="book-detail-info">
            <h1>${t}</h1>
            <p class="book-author-lg">by ${r}</p>
            <dl class="book-detail-meta">
              <div><dt>Downloads</dt><dd>${c.toLocaleString()}</dd></div>
              ${s?`<div><dt>Language</dt><dd>${s}</dd></div>`:""}
              ${o.length>0?`<div><dt>Categories</dt><dd>${o.slice(0,3).join(", ")}</dd></div>`:""}
              <div><dt>Source</dt><dd>Project Gutenberg #${e.id}</dd></div>
            </dl>
            <p class="book-description">${l}</p>
            ${d?`<a href="/reader.html?id=${e.id}" class="read-now-btn">📖 Read Online</a>`:'<p style="color:var(--color-text-muted)">Reading view not available for this format.</p>'}
            ${d?`<p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:var(--space-2)">
                  <a href="${d}" target="_blank" rel="noopener">Download plain text ↗</a>
                </p>`:""}
          </div>
        `}):a.innerHTML='<div class="empty-state"><p>No book specified. <a href="/">Browse books</a>.</p></div>';
