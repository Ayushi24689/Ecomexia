import "../scss/style.scss";

// import "preline";

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const slides = slider.children;
  const totalSlides = slides.length;
  let currentSlide = 0;

  function updateSlider() {
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
  }

  document.getElementById("prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  document.getElementById("next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  // Initialize the slider position
  updateSlider();
});
document.addEventListener("DOMContentLoaded", () => {
  function formatNumber(num) {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "k";
    } else {
      return num;
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  function counter(id, start, end, duration) {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, step);
  }
  counter("count1", 0, 10, 3000);
  counter("count2", 0, 50, 2500);
  counter("count3", 0, 100, 3000);
});
