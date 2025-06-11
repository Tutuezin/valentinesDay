// Configurando o plugin de duração do Day.js
dayjs.extend(dayjs_plugin_duration);

// Defina a data do seu aniversário de 1 ano
// Formato: Ano, Mês (0-11), Dia, Hora, Minuto, Segundo
const dataAniversario = dayjs("2025-09-07T00:00:00");

function atualizaContador() {
  const agora = dayjs();
  const diferenca = dataAniversario.diff(agora);

  if (diferenca <= 0) {
    document.getElementById("contador").innerHTML =
      "<h2>Feliz 1 ano de namoro! ❤️</h2>";
    clearInterval(intervalo); // Para a contagem
    return;
  }

  const duracao = dayjs.duration(diferenca);

  const dias = Math.floor(duracao.asDays());
  const horas = duracao.hours();
  const minutos = duracao.minutes();
  const segundos = duracao.seconds();

  document.getElementById("dias").textContent = String(dias).padStart(2, "0");
  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(
    2,
    "0"
  );
  document.getElementById("segundos").textContent = String(segundos).padStart(
    2,
    "0"
  );
}

// Inicia o contador
atualizaContador();

// Atualiza o contador a cada segundo
const intervalo = setInterval(atualizaContador, 1000);

// --- CÓDIGO PARA CRIAR CORAÇÕES ALEATÓRIOS ---

function criarCoracao() {
  const coracao = document.createElement("div");
  coracao.classList.add("coracao-voando");

  // Posição horizontal aleatória
  coracao.style.left = Math.random() * 100 + "vw";

  // Duração da animação aleatória (entre 7 e 12 segundos)
  coracao.style.animationDuration = Math.random() * 5 + 7 + "s";

  // Tamanho do coração aleatório
  coracao.style.fontSize = Math.random() * 1 + 1 + "rem";

  // Opacidade inicial aleatória
  coracao.style.opacity = Math.random() * 0.2 + 0.6; // Entre 0.6 e 0.8

  // Tipos de corações para variar
  const tiposDeCoracao = ["❤️", "💖", "💕", "💓"];
  coracao.innerText =
    tiposDeCoracao[Math.floor(Math.random() * tiposDeCoracao.length)];

  document.body.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 12000); // 12 segundos (deve ser igual ou maior que a duração máxima da animação)
}

// A cada 300 milissegundos (0.3 segundos), um novo coração é criado
setInterval(criarCoracao, 300);

// --- CÓDIGO PARA ANIMAÇÃO DE FADE-IN AO ROLAR ---

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1, // A animação começa quando 10% do elemento estiver visível
  }
);

const sectionsToFade = document.querySelectorAll(".fade-in-section");
sectionsToFade.forEach((section) => {
  observer.observe(section);
});

// --- CÓDIGO PARA GALERIA LIGHTBOX ---
var lightbox = new SimpleLightbox(".fotos-clicaveis a", {
  /* opções, se desejar */
  captionsData: "alt",
  captionDelay: 250,
});

// --- CÓDIGO PARA A RASPADINHA DO AMOR ---
const canvas = document.getElementById("raspadinha-canvas");
const ctx = canvas.getContext("2d");
const container = document.getElementById("raspadinha-container");

// Ajusta o tamanho do canvas para o tamanho do container
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

// Preenche a camada da raspadinha
ctx.fillStyle = "#c0c0c0"; // Cor prateada
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Escreve o texto por cima da camada prateada
ctx.fillStyle = "#5c3b3b";
ctx.font = "bold 24px Poppins";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Raspe aqui com o mouse! ✨", canvas.width / 2, canvas.height / 2);

let isDrawing = false;

function scratch(e) {
  if (!isDrawing) return;

  // Detecta a posição do mouse/toque
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  // Apaga a "tinta" onde o mouse passa
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, 2 * Math.PI); // O 40 é o tamanho do "risco"
  ctx.fill();
}

// Eventos para mouse
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", scratch);

// Eventos para toque (celular)
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchmove", scratch);
