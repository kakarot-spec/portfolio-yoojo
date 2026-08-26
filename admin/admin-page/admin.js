document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const deleteImgBtn = document.getElementById("deleteImgBtn");
  const textInput = document.getElementById("textInput");
  const saveBtn = document.getElementById("saveBtn");

  let base64Image = localStorage.getItem("cardImage") || "";

  // Load existing text
  textInput.value = localStorage.getItem("cardText") || "";

  // Convert uploaded image to Base64
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        base64Image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Delete image option
  deleteImgBtn.addEventListener("click", () => {
    base64Image = "";
    imageInput.value = "";
    localStorage.removeItem("cardImage");
    alert("Image cleared.");
  });

  // Save changes to localStorage
  saveBtn.addEventListener("click", () => {
    if (base64Image) {
      localStorage.setItem("cardImage", base64Image);
    }
    localStorage.setItem("cardText", textInput.value.trim());
    alert("Card updated successfully!");
  });
});