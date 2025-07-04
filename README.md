# 📝 Text to PDF Converter (Flask)

A powerful, Unicode-safe web app built using **Python Flask** that lets you convert long text (like MCQs, notes, blog drafts) into cleanly formatted downloadable PDF files — with emoji and Hindi support ✅

---

## 🚀 Features

- ✅ Paste or type **any long text** (1000+ lines supported)
- ✅ Supports **Hindi**, **Emojis**, special characters
- ✅ Clean formatting with proper **line breaks and wrapping**
- ✅ One-click **PDF download**
- ✅ 📦 Ready for deployment on **Render.com** or any Flask host

---

## 🖥️ Live Demo

> 📍 **Coming soon**  
> _(Once deployed, put your Render link here)_

---

## 📸 Screenshot

> _(You can add your UI screenshot here)_

---

## 🧰 Tech Stack

| Layer      | Tech Used          |
|------------|--------------------|
| Backend    | Flask (Python)     |
| PDF Engine | fpdf2 (v2.x)       |
| Frontend   | HTML, Bootstrap 5  |
| JS         | Vanilla JS (Fetch) |
| Font       | NotoSans-Regular   |
| Deploy     | Render / Railway   |

---

## ⚙️ How to Run Locally

```bash
# 1. Clone repo
git clone https://github.com/yourusername/text2pdf-flask-app.git
cd text2pdf-flask-app

# 2. Create virtualenv (optional)
python -m venv venv
venv\Scripts\activate       # on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Download font once:
mkdir -p static/fonts
curl -L -o static/fonts/NotoSans-Regular.ttf https://github.com/googlefonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf?raw=true

# 5. Run the app
python app.py
```

Now visit: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🗂️ Project Structure

```
text2pdf-flask-app/
│
├── app.py
├── requirements.txt
├── Procfile               # For Render deploy
│
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── fonts/
│       └── NotoSans-Regular.ttf
```

---

## ☁️ Deploy to Render

1. Push this repo to GitHub
2. Go to [https://render.com](https://render.com)
3. New > Web Service > Connect repo
4. Set:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
5. Done! ✅ Your app will be live.

---

## ✅ Example Text to Try

```
1. Which of the following is an AI-specific hardware platform designed by Google?
A. CUDA
B. GPU
C. TPU
D. FPGA

Answer: ✅ C. TPU

2. Which AI platform is commonly used for large-scale training at Facebook?
A. TensorFlow
B. Caffe
C. PyTorch
D. MXNet

Answer: ✅ C. PyTorch
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you want to change.

---

## 📄 License

[MIT](LICENSE)

---

> Built with ❤️ by [Sheikh Mursaleen](https://github.com/sheikhmursaleen)
