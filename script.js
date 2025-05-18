document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("formSection").classList.remove("hidden");
});

const dateButtons = document.querySelectorAll(".dateBtn");
const statusMsg = document.getElementById("statusMsg");

dateButtons.forEach(button => {
  button.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value.trim();
    const dia = button.getAttribute("data-date");

    if (!nome) {
      statusMsg.textContent = "Por favor, digite seu nome.";
      return;
    }

    // Verifica se já existe
    const response = await fetch(`https://sheetdb.io/api/v1/do29db6uv8v3c/search?nome=${encodeURIComponent(nome)}`);
    const data = await response.json();

    if (data.length > 0) {
      statusMsg.textContent = "Você já se inscreveu!";
      return;
    }

    // Envia os dados
    const postResponse = await fetch("https://sheetdb.io/api/v1/do29db6uv8v3c", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [{ nome, dia }] })
    });

    if (postResponse.ok) {
      statusMsg.textContent = "Inscrição realizada com sucesso!";
    } else {
      statusMsg.textContent = "Erro ao enviar inscrição. Tente novamente.";
    }
  });
});
