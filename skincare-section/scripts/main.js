const packageCards = document.querySelectorAll(".pkg-card");

const cardRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-visible", "true");
        cardRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

packageCards.forEach((card) => cardRevealObserver.observe(card));
