document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const deleteImgBtn = document.getElementById("deleteImgBtn");
  const titleInput = document.getElementById("titleInput");
  const textInput = document.getElementById("textInput");
  const saveBtn = document.getElementById("saveBtn");

  let base64Image = localStorage.getItem("cardImage") || "";

  // Load existing data into inputs
  titleInput.value = localStorage.getItem("cardTitle") || "";
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

  // Delete Image
  deleteImgBtn.addEventListener("click", () => {
    base64Image = "";
    imageInput.value = "";
    localStorage.removeItem("cardImage");
    alert("Image cleared!");
  });

  // Save changes to localStorage
  saveBtn.addEventListener("click", () => {
    if (base64Image) {
      localStorage.setItem("cardImage", base64Image);
    }
    localStorage.setItem("cardTitle", titleInput.value.trim());
    localStorage.setItem("cardText", textInput.value.trim());

    alert("Card updated successfully!");
  });
});