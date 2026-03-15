function submitEmail() {
  const webAppURL = "https://script.google.com/macros/s/AKfycbzJjsiiVWOw67oeE5Of8DB1pB-fqyln16Gf3X6ScnsfGv9nJyQw-mtC_PkvZNgEt-bOUg/exec";
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  const msg = document.getElementById('message');

  msg.style.opacity = 0;

  if (!email) {
    msg.textContent = "Please enter your email address registered in the database.";
    msg.className = "error";
    emailInput.focus();
    msg.style.opacity = 1;
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    msg.className = "error";
    emailInput.focus();
    msg.style.opacity = 1;
    return;
  }

  msg.textContent = "Processing...";
  msg.className = "";
  msg.style.opacity = 1;

  setTimeout(() => {
    msg.textContent = "You will receive your link soon.";
    msg.className = "success";
    msg.style.opacity = 1;

    fetch(webAppURL + "?email=" + encodeURIComponent(email)).catch(err => {
      console.error("Background request failed", err);
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }, 400);
}