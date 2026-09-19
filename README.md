# Prüfungsstudio — Paket

## Enthalten
- `Pruefungsstudio.html` — die App selbst. Einzelne Datei, keine Installation.
- `modeltest/` — die Ordnerstruktur für die Modellbibliothek, mit einem
  Platzhalterordner „Standard“ für jede Prüfung und jedes Niveau.

## So befüllen Sie einen Modelltest
1. Öffnen Sie `Pruefungsstudio.html`, wählen Sie oben Prüfung + Niveau,
   legen Sie einen Modelltest an und füllen Sie ihn (mit der KI oder von Hand).
2. Gehen Sie zu **Import & Export → Einzelnes Modul** und laden Sie jedes
   Modul herunter (`lesen.json`, `hoeren.json`, `schreiben.json`,
   `sprechen.json`, bei telc zusätzlich `bausteine.json`).
3. Verschieben Sie diese Dateien in den passenden Ordner, z. B.:
   `modeltest/goethe/B2/Standard/lesen.json`
   Die `README.txt` in jedem Ordner können Sie danach löschen.
4. Für ein weiteres Buch auf demselben Niveau: neuen Ordner neben
   „Standard“ anlegen (z. B. `Zusatzbuch`) und den Namen zusätzlich in
   `modeltest/manifest.json` eintragen.

## Wichtig: echter Webserver nötig
Die Modellbibliothek liest diese Dateien per `fetch()`. Browser blockieren
das aus Sicherheitsgründen, wenn Sie die HTML-Datei einfach per Doppelklick
öffnen (`file://`). Sie brauchen also eines von:

- **Lokal, zum Testen:** im Ordner mit `Pruefungsstudio.html` ausführen:
  `python3 -m http.server 8000`
  und dann `http://localhost:8000/Pruefungsstudio.html` öffnen.
- **Dauerhaft, online:** den ganzen Ordner (HTML-Datei + `modeltest/`) auf
  GitHub Pages, Netlify, Vercel oder einen eigenen Webspace hochladen.

Die KI-Generierung (eigener Gemini-Schlüssel) funktioniert in beiden Fällen,
da es sich um eine normale, selbst gehostete Webseite handelt — nur eine
`file://`-geöffnete Datei blockiert manche Browser zusätzlich beim externen
API-Aufruf.

## Ordnerstruktur
```
Pruefungsstudio.html
modeltest/
  manifest.json
  goethe/{A1,A2,B1,B2,C1,C2}/Standard/{lesen,hoeren,schreiben,sprechen}.json
  telc/{A1,A2,B1,B2,C1}/Standard/{lesen,bausteine,hoeren,schreiben,sprechen}.json
  testdaf/{TDN3,TDN4,TDN5}/Standard/{lesen,hoeren,schreiben,sprechen}.json
```
