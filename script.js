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
  