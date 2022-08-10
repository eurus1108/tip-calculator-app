const tipLabel = document.querySelectorAll(".card__tip label");

tipLabel.forEach((elm) => {
  elm.addEventListener("click", (e) => {
    const clickedBtn = e.target;

    clickedBtn.classList.add("selected");

    tipLabel.forEach((target) => {
      if (target !== clickedBtn) {
        target.classList.remove("selected");
      }
    });
  });
});
