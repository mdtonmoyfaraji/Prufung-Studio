# Prüfungsstudio

Dateien im Projekt (einmal hochladen, danach nie wieder anfassen):
- `index.html` — die App
- `api/library.js` + `vercel.json` — für Vercel (listet die Modelltests automatisch)
- `library.php` — nur für normalen PHP-Webspace (bei Vercel/GitHub Pages unnötig)

## Modelltests hinzufügen
Nur Ordner + Moduldateien hochladen (GitHub, Webspace oder lokal kopieren):

    modeltest/<goethe|telc|testdaf>/<Niveau z. B. B2 / TDN4>/<Buchname>/lesen.json, hoeren.json, schreiben.json, sprechen.json

- Jeder Ordner mit JSON-Dateien ist ein Modelltest; Unterordner beliebig tief, jeder Ebene = ein Auswahlfeld oben.
- Dateinamen und Groß-/Kleinschreibung der Ordner sind egal (`tdn4` = `TDN 4`); das Modul wird aus der Datei erkannt.
- Keine Manifest-Datei, kein Skript, nichts zu bearbeiten.

## Wo funktioniert es
| Umgebung | Erkennung |
|---|---|
| Vercel (aus GitHub importiert) | automatisch über `api/library.js` (bei jedem Deploy) |
| GitHub Pages | automatisch über die GitHub-API (Repo wird aus der URL erkannt) |
| PHP-Webspace | automatisch über `library.php` |
| Lokal mit `python -m http.server` | automatisch (Ordnerliste des Servers) |
| Vercel, falls `api/library.js` nichts findet | fällt automatisch auf die GitHub-API zurück (Repo kommt von Vercel) |
| Lokal per Doppelklick auf `index.html` | einmal „Projektordner wählen …“ — Chrome/Edge merken den Ordner, Firefox/Safari fragen bei jedem Öffnen neu |
