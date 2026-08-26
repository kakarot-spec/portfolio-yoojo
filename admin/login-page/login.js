document.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const loginForm = document.getElementById("loginForm");

  // Toggle password visibility & icon state
  togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";

    // Switch icon class between eye and eye-slash
    const icon = togglePassword.querySelector("i");
    icon.className = isPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
    
    togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });

  // Handle form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const passwordValue = password.value;
    const remember = document.getElementById("remember").checked;

    if (!email || !passwordValue) return;

    console.log("Login submitted:", { email, remember });
  });
});