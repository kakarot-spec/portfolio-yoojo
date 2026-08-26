document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("imageContainer");
  const displayTitle = document.getElementById("displayTitle");
  const displayText = document.getElementById("displayText");

  function loadContent() {
    const savedImage = localStorage.getItem("cardImage");
    const savedTitle = localStorage.getItem("cardTitle");
    const savedText = localStorage.getItem("cardText");

    // Render Image
    if (savedImage) {
      imageContainer.innerHTML = `<img src="${savedImage}" alt="Uploaded Graphic">`;
    } else {
      imageContainer.innerHTML = `<p class="placeholder-text">No Image Uploaded</p>`;
    }

    // Render Title & Text
    displayTitle.textContent = savedTitle || "Default Title";
    displayText.textContent = savedText || "Your text content will appear here...";
  }

  loadContent();
  window.addEventListener("storage", loadContent);
});