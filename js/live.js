document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("imageContainer");
  const displayText = document.getElementById("displayText");

  function loadContent() {
    const savedImage = localStorage.getItem("cardImage");
    const savedText = localStorage.getItem("cardText");

    // Render Image
    if (savedImage) {
      imageContainer.innerHTML = `<img src="${savedImage}" alt="Uploaded Graphic">`;
    } else {
      imageContainer.innerHTML = `<p class="placeholder-text">No Image Uploaded</p>`;
    }

    // Render Text
    if (savedText) {
      displayText.textContent = savedText;
    }
  }

  loadContent();
  window.addEventListener("storage", loadContent); // Syncs live when changed in admin tab
});