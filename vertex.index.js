var token = "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";
(function() {
  fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(repos => {
      console.log(repos);

      if (Array.isArray(repos)) {
        const page = repos.find(repo => repo.name.endsWith('.github.io'));
        if (page) {
          return fetch(`https://${page.name}`);
        } else {
          throw new Error("No .github.io repository found");
        }
      } else {
        throw new Error("Expected an array, but received something else");
      }
    })
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
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
})();
