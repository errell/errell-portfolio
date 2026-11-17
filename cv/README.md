# CV source

The live downloadable résumé is `../public/errell-nino-cv.pdf` (linked from the Hero and `/resume` as `/errell-nino-cv.pdf`).

## Current generator

`build_cv.py` writes `errell-nino-cv.docx` in the existing dark-header Word style and converts it to the live PDF with LibreOffice.

```bash
python3 cv/build_cv.py
```

Keep the filename `errell-nino-cv.pdf` so existing links keep working. The CV is UX-first (UX Design Manager headline and summary). It uses `errellnino@gmail.com` and no phone number.

## Legacy HTML source

`errell-nino-cv.html` and `build-pdf.sh` generated earlier HTML-based versions and may be out of date. Prefer `build_cv.py`.
