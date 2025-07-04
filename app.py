"""
Flask Text‑to‑PDF – Unicode‑safe, emoji‑fallback
"""

from flask import Flask, render_template, request, send_file, abort
from fpdf   import FPDF              # fpdf2 (v2.x)
import io, datetime, os, pathlib, textwrap

app = Flask(__name__)

# -------- Font (bundled) --------
FONT_PATH = pathlib.Path(__file__).parent / "static" / "fonts" / "NotoSans-Regular.ttf"
if not FONT_PATH.exists():
    raise FileNotFoundError(
        f"Font not found at {FONT_PATH}\n"
        "Download NotoSans-Regular.ttf and place it under static/fonts/"
    )

# -------- Emoji → ASCII fallback --------
EMOJI_MAP = {"🔹": "•", "✅": "✓", "❌": "✗", "➜": "->"}

def safe_text(line: str, pdf: FPDF, repl="□") -> str:
    """Replace any glyph the font can’t render with `repl`."""
    return "".join(repl if pdf.get_string_width(ch) == 0 else ch for ch in line)


# -------- Build PDF --------
def build_pdf(text: str) -> bytes:
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_margins(10, 10, 10)

    pdf.add_font("NotoSans", "", str(FONT_PATH))
    pdf.set_font("NotoSans", size=12)
    pdf.add_page()

    for raw in text.splitlines():
        for emoji, replacement in EMOJI_MAP.items():
            raw = raw.replace(emoji, replacement)
        raw = raw.rstrip()

        if not raw:
            pdf.ln(5)
            continue

        cleaned = safe_text(raw, pdf, repl="?")
        pdf.multi_cell(w=0, h=7, text=cleaned)
        pdf.ln(1)

    buf = io.BytesIO()
    pdf.output(buf)
    buf.seek(0)
    return buf.read()


# -------- Routes --------
@app.get("/")
def home():
    return render_template("index.html")

@app.post("/convert")
def convert():
    raw_text = request.form.get("text", "").strip()
    if not raw_text:
        abort(400, "No text received!")
    pdf_bytes = build_pdf(raw_text)
    fname = f"text_{datetime.datetime.now():%Y%m%d_%H%M%S}.pdf"
    return send_file(io.BytesIO(pdf_bytes),
                     as_attachment=True,
                     download_name=fname,
                     mimetype="application/pdf")


# -------- Local run --------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
