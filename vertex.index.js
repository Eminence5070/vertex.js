document.body.innerHTML = '';
document.head.innerHTML = `<base href="https://Eminence5070.github.io/">`;

fetch('//Eminence5070.github.io')
  .then(response => response.text())
  .then(html => {
    const iframe = document.createElement('iframe');
    iframe.srcdoc = html;
    iframe.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border: none; z-index: 9999;';
    document.body.appendChild(iframe);

    let event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    
    setInterval(() => {
      document.querySelectorAll('[id*=annotate i], [data-id=WebCommentThread]').forEach(element => {
        element.style.display = 'none';
        });
      }, 20);
});
