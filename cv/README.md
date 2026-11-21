# CV source

The live downloadable résumé is `../private/errell-nino-cv.pdf`. It is not public: visitors leave an email at the gate (`/cv` or `/resume`), which sets the signed `cv_access` cookie, and `/cv/download` serves the file only with that cookie. The old `/errell-nino-cv.pdf` URL redirects to `/cv/download`.

## Current generator

`build_cv.py` writes `errell-nino-cv.docx` in the existing dark-header Word style and converts it to the live PDF with LibreOffice.

```bash
python3 cv/build_cv.py
```

Keep the filename and the `private/` location; `app/cv/download/route.ts` reads it from there. The CV is UX-first (UX Design Manager headline and summary). It uses `errellnino@gmail.com` and no phone number.

## Legacy HTML source

`errell-nino-cv.html` and `build-pdf.sh` generated earlier HTML-based versions and may be out of date. Prefer `build_cv.py`.
