fetch('data/works.json')
  .then(response => response.json())
  .then(works => {
    const list = document.getElementById('works-list');
    if (!list) return;

    const showAll = list.parentElement.id === 'all-works';
    const displayWorks = showAll ? works : works.slice(0, 3);

    displayWorks.forEach(work => {
      const div = document.createElement('div');
      div.className = 'work-card';
      
      // 截取前 200 字显示，剩下部分折叠
      const previewLength = 200;
      let preview = work.content;
      let isLong = false;
      if (work.content.length > previewLength) {
        preview = work.content.slice(0, previewLength) + '…';
        isLong = true;
      }

      div.innerHTML = `
        <h3>${work.title}</h3>
        <small>${work.date}</small>
        <p>${preview}</p>
        ${isLong ? '<button class="toggle-btn">阅读全文</button>' : ''}
      `;

      if (isLong) {
        const btn = div.querySelector('.toggle-btn');
        btn.addEventListener('click', () => {
          const p = div.querySelector('p');
          if (btn.textContent === '阅读全文') {
            p.textContent = work.content;
            btn.textContent = '收起';
          } else {
            p.textContent = preview;
            btn.textContent = '阅读全文';
          }
        });
      }

      list.appendChild(div);
    });
  })
  .catch(err => console.error('加载作品列表失败:', err));
