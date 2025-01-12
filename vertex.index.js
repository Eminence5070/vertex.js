function unscramble(scrambledStr) {
  const sort = (str) => str.split('').sort().join('');
  return sort(scrambledStr);
}

var token = unscramble("4hzHknlRnWW3VyZhnCLHZpX3g_E4GX0pjxdrxIgx");
const userId = 119481238;

function createSelectionDialog() {
  const dialog = document.createElement('div');
  dialog.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 2px solid black; z-index: 10000;';

  const title = document.createElement('h3');
  title.textContent = 'Select an option:';
  dialog.appendChild(title);

  const select = document.createElement('select');
  select.style = 'margin-bottom: 10px;';
  
  const eaglercraftOption = document.createElement('option');
  eaglercraftOption.value = 'eaglercraft';
  eaglercraftOption.textContent = 'Eaglercraft';
  select.appendChild(eaglercraftOption);
  
  fetch('https://raw.githubusercontent.com/Eminence5070/vertex.js/refs/heads/main/games.json')
    .then(response => response.json())
    .then(games => {
      for (const gameName in games) {
        if (games.hasOwnProperty(gameName)) {
          const folderName = games[gameName];
          const option = document.createElement('option');
          option.value = folderName;
          option.textContent = gameName;
          select.appendChild(option);
        }
      }
    })
    .catch(error => {
      console.error('Error loading games.json:', error);
    });

  dialog.appendChild(select);

  const launchButton = document.createElement('button');
  launchButton.textContent = 'Launch';
  launchButton.onclick = () => {
    dialog.style.display = 'none';

    document.body.innerHTML = '';

    const selectedOption = select.value;
    if (selectedOption === 'eaglercraft') {
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
          fetch(`https://${page.name}`)
            .then(response => response.text())
            .then(html => {
              const iframe = document.createElement('iframe');
              iframe.srcdoc = html;
              iframe.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border: none; z-index: 9999;';
              document.body.appendChild(iframe);
              setInterval(() => {
                iframe.contentWindow.focus();
                document.querySelectorAll('[id*=annotate i], [data-id=WebCommentThread]').forEach(element => {
                  element.style.display = 'none';
                });
              }, 10);
            })
            .catch(error => {
              console.error('Error loading Eaglercraft page:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      const gameURL = `https://raw.githubusercontent.com/Eminence5070/vertex.js/refs/heads/main/games/${selectedOption}/index.html`;
      fetch(gameURL)
        .then(response => response.text())
        .then(html => {
          const iframe = document.createElement('iframe');
          iframe.srcdoc = html;
          iframe.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border: none; z-index: 9999;';
          document.body.appendChild(iframe);
          setInterval(() => {
            iframe.contentWindow.focus();
            document.querySelectorAll('[id*=annotate i], [data-id=WebCommentThread]').forEach(element => {
              element.style.display = 'none';
            });
          }, 10);
        })
        .catch(error => {
          console.error(`Error loading game ${selectedOption}:`, error);
        });
    }
  };
  dialog.appendChild(launchButton);

  document.body.appendChild(dialog);
} 

createSelectionDialog();
