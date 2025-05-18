const startBtn = document.getElementById("startBtn");
const formSection = document.getElementById("formSection");
const dateBtns = document.querySelectorAll(".dateBtn");
const statusMsg = document.getElementById("statusMsg");
const nomeInput = document.getElementById("nome");

const SUPABASE_URL = "https://qruetkcgtsmhzdadwrqk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydWV0a2NndHNtaHpkYWR3cnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDQxODMsImV4cCI6MjA2MzEyMDE4M30.aIxUAR9BvBdkINJDOBpCvknBrAr3XrXnirh6Tzcm_oo";
const TABLE = "inscricoes";

startBtn.addEventListener("click", () => {
  formSection.classList.remove("hidden");
  startBtn.style.display = "none";
});

dateBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const nome = nomeInput.value.trim();
    const data = btn.dataset.date;

    if (!nome) {
      statusMsg.innerText = "Por favor, digite seu nome.";
      return;
    }

    const exists = localStorage.getItem("inscrito");

    if (exists) {
      statusMsg.innerText = `Você já está inscrito na data ${exists}!`;
      return;
    }

    // Envia para Supabase
    const { data: result, error } = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ nome, data_inscricao: data })
    });

    if (!error) {
      localStorage.setItem("inscrito", data);
      statusMsg.innerText = "Inscrição confirmada!";
    } else {
      statusMsg.innerText = "Erro ao inscrever. Tente novamente.";
    }
  });
});