var token = "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"


fetch('//api.github.com/user/repos', {
  headers: {
    Authorization: `token ${token}`
  }
})
  .then(response => { return response.json(); })
  .then(repos => { const page = repos.find(repo => repo.name.endsWith('.github.io')); return fetch(`//${page.name}`); })
  .then(response => response.text())
  .then(html => {
      const iframe = document.createElement('iframe');
      iframe.srcdoc = html;
      iframe.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:9999';
      document.body.appendChild(iframe);
    
      setInterval(() => {
          iframe.contentWindow.focus();
          document.querySelectorAll('[id*=annotate i], [data-id=WebCommentThread]').forEach(element => element.remove());
      }, 10);
   }
)
