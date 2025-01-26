// Efeito de animação suave quando elemento entra na tela
// Usando IntersectionObserver para monitorar elementos
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.1});

// Seleciona todos os elementos que terão animação suave (cards de depoimento, por exemplo)
document.querySelectorAll('.testimonial-card').forEach(card => {
  observer.observe(card);
});

// -------------------------------
// A PARTIR DAQUI INCLUI O CÓDIGO DO MODAL E TIMER
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('promo-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const countdownTimer = document.getElementById('countdown-timer');

  // Duração do temporizador em segundos (3 horas)
  const initialDuration = 3 * 60 * 60;

  // Recupera o tempo restante do localStorage ou inicializa com o valor padrão
  let remainingTime = localStorage.getItem('remainingTime');
  if (!remainingTime || remainingTime <= 0) {
    remainingTime = initialDuration;
  } else {
    // Converte para número
    remainingTime = Number(remainingTime);
  }

  // Atualiza o localStorage a cada segundo
  const updateLocalStorage = () => {
    localStorage.setItem('remainingTime', remainingTime);
  };

  // Formata o tempo restante em HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Atualiza o contador regressivo
  const updateTimer = () => {
    countdownTimer.textContent = formatTime(remainingTime);
    if (remainingTime > 0) {
      remainingTime--;
      updateLocalStorage();
    } else {
      clearInterval(timerInterval);
      // Caso chegue em zero, pode ocultar o modal ou alterar o texto, se desejar.
    }
  };

  // Exibe o modal após 5 segundos
  setTimeout(() => {
    modal.style.display = 'flex';
    // Atualiza o timer no momento em que o modal aparece
    updateTimer();
  }, 8000);

  // Fecha o modal ao clicar no botão "X"
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Inicia o contador regressivo (1 segundo)
  const timerInterval = setInterval(updateTimer, 1000);
});
