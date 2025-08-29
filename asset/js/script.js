"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /*ハンバーガーバー */
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  /* スライドショー */
  const images = document.querySelectorAll(".slideshow img");
  let current = 0;
  setInterval(() => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
  }, 8000);

  /* 横スクロール */
  const hScroll = document.querySelector(".h-scroll");
  if (hScroll) {
    hScroll.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        hScroll.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  }

  /* 絞り込み検索 */
  const tags = document.querySelectorAll("#filterTags .tag");
  const cards = document.querySelectorAll('[id^="productGrid"] .card');
  const selected = new Set();

  function applyFilter() {
    cards.forEach(card => {
      const cardTags = card.dataset.tags.split(",");
      const show = selected.size === 0 || [...selected].every(t => cardTags.includes(t));
      card.classList.toggle("hidden", !show);
    });
  }

  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      const t = tag.dataset.tag;
      if (selected.has(t)) {
        selected.delete(t);
        tag.classList.remove("active");
      } else {
        selected.add(t);
        tag.classList.add("active");
      }
      applyFilter();
    });
  });

  applyFilter();

  // いいねボタン
  const likeBtn = document.getElementById("like");
  const disBtn  = document.getElementById("dislike");
  const likeCount = document.getElementById("likeCount");
  const disCount  = document.getElementById("dislikeCount");

  let state = "none", like = 0, dislike = 0;

  function render() {
    likeBtn.classList.toggle("active", state==="like");
    disBtn.classList.toggle("active", state==="dislike");
    likeCount.textContent = like;
    disCount.textContent = dislike;
  }

  likeBtn.addEventListener("click", () => {
    if (state==="like") { like--; state="none"; }
    else { if (state==="dislike") dislike--; like++; state="like"; }
    render();
  });

  disBtn.addEventListener("click", () => {
    if (state==="dislike") { dislike--; state="none"; }
    else { if (state==="like") like--; dislike++; state="dislike"; }
    render();
  });

  render();

  /* footer */
  const footer = document.querySelector(".footer");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      footer.classList.add("fixed");
    } else {
      footer.classList.remove("fixed");
    }
  });
});