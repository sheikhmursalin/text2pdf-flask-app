// 1️⃣ PDF form submission + download
const form     = document.getElementById("pdfForm");
const textarea = document.getElementById("textArea");
const spinner  = document.getElementById("spinner");
const button   = document.getElementById("convertBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!textarea.value.trim()) return;

  spinner.classList.remove("d-none");
  button.disabled = true;

  try {
    const formData = new FormData();
    formData.append("text", textarea.value);

    const res  = await fetch("/convert", { method: "POST", body: formData });
    const data = await res.blob();  // Always read blob
    if (!res.ok) {
      const errText = await data.text();
      throw new Error(errText || "Server error");
    }

    // Trigger download
    const url = window.URL.createObjectURL(data);
    const a   = document.createElement("a");
    a.href = url;
    const cd = res.headers.get("Content-Disposition") || "";
    const fn = (cd.match(/filename="(.+?)"/) || [])[1] || "converted.pdf";
    a.download = fn;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert(err.message);
  } finally {
    spinner.classList.add("d-none");
    button.disabled = false;
  }
});


// 2️⃣ PWA Install App button
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove("d-none");  // Show button
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log("PWA install outcome:", outcome);
  deferredPrompt = null;
  installBtn.classList.add("d-none");
});
