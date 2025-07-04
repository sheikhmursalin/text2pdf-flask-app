// Front‑end fetch + download
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
    const data = await res.blob();               // read blob anyway
    if (!res.ok) {
      const errText = await data.text();
      throw new Error(errText || "Server error");
    }

    // Trigger download
    const url = window.URL.createObjectURL(data);
    const a   = document.createElement("a");
    a.href = url;
    const cd = res.headers.get("Content-Disposition") || "";
    const fn = (cd.match(/filename="(.+)"/) || [])[1] || "converted.pdf";
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
