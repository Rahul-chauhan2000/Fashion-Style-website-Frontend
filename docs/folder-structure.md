# Rapid-Crew Folder Structure

```
Rapid-crew/
├─ backend/                          # Flask API + ML assets
│  ├─ application.py                 # Flask entry (WSGI: application)
│  ├─ requirements.txt               # Python deps (Flask, TF, scikit-learn, cors, gunicorn)
│  ├─ .ebextensions/
│  │  └─ python.config               # AWS EB WSGI path (application:application)
│  ├─ myntra.csv                     # Dataset
│  ├─ indices.pkl                    # Title indices
│  ├─ embeddings.pkl                 # Image feature vectors
│  ├─ filtered_indices.pkl           # Collaborative filtering indices
│  ├─ men_popular.pkl                # Men bestsellers
│  ├─ women_popular.pkl              # Women bestsellers
│  ├─ popular_products.pkl           # All-category bestsellers
│  ├─ sig1.npy.gz                    # Content similarity chunks
│  ├─ sig2.npy.gz
│  ├─ sig3.npy.gz
│  └─ sig4.npy.gz
├─ src/                              # React app (Create React App)
│  ├─ components/
│  │  ├─ Authentication/             # Login, Signup
│  │  ├─ Contact/                    # Contact page
│  │  ├─ Home/                       # Home UI (carousals, headers, main cards)
│  │  ├─ Navigation/                 # Navbar
│  │  ├─ Product/                    # Product listing, details, cards
│  │  └─ RecommadProd/               # Image-based recommendation UI
│  ├─ contexts/                      # AuthContext
│  ├─ index.js                       # App bootstrap + axios baseURL from env
│  ├─ App.js                         # Routes
│  ├─ firebase.js                    # Firebase client config
│  └─ styles                         # App.css, index.css, etc.
├─ public/                           # CRA public assets
│  ├─ images/                        # Static images (banners, categories, collections)
│  ├─ index.html
│  └─ manifest.json
├─ docs/                             # Documentation
│  └─ folder-structure.md            # This document
├─ Notebook/                         # Jupyter notebooks + CSVs for experimentation
├─ render.yaml                       # Render config (backend service)
├─ package.json                      # Frontend scripts, dev proxy
├─ requirements.txt                  # Root-level (unused by backend)
├─ README.md                         # Project overview, run and API info
└─ .gitignore
```

## Deployment Mapping
- Backend (Render):
  - Root: `backend`
  - Build: `pip install -r requirements.txt`
  - Start: `gunicorn application:application`
  - Ensure all `.pkl`, `.csv`, and `sig*.npy.gz` files are in `backend/`
- Frontend (Vercel):
  - Root: repo
  - Build: `npm run build`
  - Output: `build`
  - Env: `REACT_APP_API_BASE` = Render backend URL

## Local Development
- Backend: `python -m venv .venv && .\.venv\Scripts\Activate.ps1 && pip install -r backend/requirements.txt && python backend/application.py`
- Frontend: `npm install --legacy-peer-deps && npm run start`
- Dev proxy: `package.json` sets proxy to `http://127.0.0.1:5000`

