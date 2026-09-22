# Prüfungsstudio

Einmal hochladen (danach nie wieder anfassen):
- `index.html` — die App
- `manifest.webmanifest` + `sw.js` + `icons/` — machen die App installierbar und offlinefähig (PWA)
- `api/library.js` + `vercel.json` — für Vercel (listet die Modelltests automatisch)
- `library.php` — nur für normalen PHP-Webspace (bei Vercel/GitHub Pages unnötig)
- `modeltest/` — hier legen Sie Ihre Ordner an (die `README.txt` darin kann bleiben)

## App installieren (PWA) & offline nutzen
Auf Vercel, GitHub Pages, PHP-Webspace oder einem lokalen Server (nicht bei
Doppelklick auf `index.html`) ist die App installierbar:
- **Desktop (Chrome/Edge):** Symbol in der Adressleiste oder Button „App installieren“
  unten links in der Seitenleiste.
- **Android (Chrome):** Menü ⋮ → „App installieren“, oder derselbe Button.
- **iOS/iPadOS (Safari):** Teilen-Symbol → „Zum Home-Bildschirm“.

Nach dem ersten Öffnen merkt sich der Service Worker die App-Oberfläche und
die zuletzt geladenen Modelltests, sodass Übungen auch ohne Internet weiter
funktionieren. Nur die KI-Funktionen (Generieren, Bewerten, Fehleranalyse)
brauchen weiterhin eine Verbindung. Ändern Sie `index.html`, `manifest.webmanifest`
oder `icons/`, erhöhen Sie zur Sicherheit `VERSION` in `sw.js`, damit
installierte Apps die neue Fassung übernehmen.

## KI-Fehleranalyse
Unter Einstellungen → „KI-Fehleranalyse“ lässt sich die Funktion ein-/ausschalten
und eine Erklärungssprache eintragen (leer = Deutsch, sonst z. B. „Bengali“
oder „English“). Ist sie aktiv:
- **Schreiben/Sprechen:** Die KI-Bewertung markiert den eigenen Text farbig —
  rot mit Wellenlinie für falsche Wörter/Formen, rot durchgestrichen mit ✕ für
  überflüssige Wörter, grün mit + für fehlende Wörter, gelb für Zeichensetzung,
  blau für Ton/Register, violett für stilistische Verbesserungen. Klick auf
  eine Markierung zeigt die Erklärung. Die Gewichtung passt sich automatisch
  an das Niveau an (A1/A2: Grundfehler zählen am meisten; C1/C2: vor allem
  Präzision, Register und Nuancen).
- **Lesen/Hören/Bausteine:** Jede Lösung zeigt weiterhin die kurze
  Standard-Begründung; zusätzlich lässt sich mit „✦ Ausführlicher erklären
  (KI)“ pro Aufgabe eine ausführlichere Erklärung in der gewählten Sprache
  anfordern.

Beides braucht einen hinterlegten KI-Schlüssel (Einstellungen → KI-Zugang).

## Speichern & Verlassen
In jedem laufenden Modul (egal welche Prüfung, welches Niveau, welcher
Modelltest) steht oben links „💾 Speichern & Verlassen". Das sichert nicht
nur die Antworten, sondern auch den aktuellen Teil und die verbleibende
Zeit — beim nächsten Mal geht es an genau dieser Stelle mit der gleichen
Restzeit weiter, nicht wieder von vorn. Der Modul-Button auf dem Dashboard
zeigt danach „Fortsetzen (heute 14:32 Uhr)" o. ä.; ein zusätzlicher Block
„Zuletzt gespeichert" oben auf dem Dashboard listet alle gespeicherten,
noch nicht abgeschlossenen Module über sämtliche Prüfungen und Niveaus
hinweg auf und springt mit einem Klick direkt hinein. Zusätzlich wird
automatisch alle 20 Sekunden sowie beim Schließen/Wechseln des Tabs im
Hintergrund gesichert, falls es einmal schnell gehen muss.

## Lückentexte mit langen Sätzen (Goethe-Stil)
Lücken zeigen jetzt einen anklickbaren Chip statt eines Dropdowns: Die
Auswahlliste zeigt jede Option immer vollständig, auch lange Sätze werden nie
mit „…“ abgeschnitten. Bei „Direkte Lückenauswahl“ aus (Standard, wie in der
echten Prüfung) erscheint in der Lücke nur der Buchstabe; bei „an“ erscheint
der vollständige eingesetzte Satz bzw. das vollständige Wort.

## Modelltests hinzufügen
Ordner selbst anlegen und Dateien hochladen:

    modeltest/<goethe|telc|testdaf>/<Niveau, z. B. B2 oder TDN4>/<beliebiger Ordner>/<beliebig viele Unterordner>/

- Es gibt keinen vorgegebenen „Standard“-Ordner — alles legen Sie selbst an, Namen sind frei.
- Jeder Ordner mit JSON-Dateien ist ein Modelltest. Es dürfen 1 bis 5 Module drin liegen
  (lesen, hoeren, schreiben, sprechen, bausteine) — es müssen nicht alle sein.
- Ordner und Unterordner beliebig tief, beliebig viele. Jede Ebene wird oben in der Kopfzeile ein Auswahlfeld
  (Prüfung · Niveau · Ordner · Unterordner … in einer Zeile). Der zuletzt gewählte Modelltest wird sofort angezeigt.
- Dateinamen und Groß-/Kleinschreibung der Ordner sind egal (`tdn4` = `TDN 4`).
- Nach dem Hochladen: Vercel deployt automatisch (ca. 1 Minute), dann Seite neu laden.

## Wo funktioniert es
| Umgebung | Erkennung |
|---|---|
| Vercel (aus GitHub importiert) | automatisch über `api/library.js`, sonst über die GitHub-API |
| GitHub Pages | automatisch über die GitHub-API |
| PHP-Webspace | automatisch über `library.php` |
| Lokal mit `python -m http.server` | automatisch (Ordnerliste des Servers) |
| Lokal per Doppelklick auf `index.html` | einmal „Ordner wählen …“ (Projektordner) — Chrome/Edge merken ihn |
