const startBtn = document.getElementById('startBtn');
const formSection = document.getElementById('formSection');
const nomeInput = document.getElementById('nome');
const dateButtons = document.querySelectorAll('.dateBtn');
const statusMsg = document.getElementById('statusMsg');

const SHEETDB_URL = 'https://sheetdb.io/api/v1/do29db6uv8v3c';

startBtn.addEventListener('click', () => {
  formSection.classList.remove('hidden');
  startBtn.style.display = 'none';
});

dateButtons.forEach(button => {
  button.addEventListener('click', () => {
    const nome = nomeInput.value.trim();
    const dia = button.getAttribute('data-date');

    if (!nome) {
      statusMsg.textContent = 'Por favor, digite seu nome completo.';
      statusMsg.style.color = 'red';
      return;
    }

    statusMsg.textContent = 'Verificando inscrição...';
    statusMsg.style.color = 'black';

    // Verifica se já está inscrito na mesma data
    fetch(`${SHEETDB_URL}/search?dia=${dia}&nome=${encodeURIComponent(nome)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          statusMsg.textContent = 'Você já se inscreveu para essa data.';
          statusMsg.style.color = 'red';
        } else {
          // Envia inscrição
          fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: [{ nome, dia }]
            }),
          })
            .then(response => {
              if (response.ok) {
                statusMsg.textContent = `Inscrição realizada com sucesso para ${dia}!`;
                statusMsg.style.color = 'green';
                nomeInput.value = '';
              } else {
                throw new Error('Erro ao enviar inscrição.');
              }
            })
            .catch(() => {
              statusMsg.textContent = 'Erro ao enviar inscrição. Tente novamente.';
              statusMsg.style.color = 'red';
            });
        }
      })
      .catch(() => {
        statusMsg.textContent = 'Erro ao verificar inscrições. Tente novamente.';
        statusMsg.style.color = 'red';
      });
  });
});
