# Prüfungsstudio — Paket

## Enthalten
- `index.html` — die App selbst. Einzelne Datei, keine Installation.
  (Heißt bewusst `index.html`, damit GitHub Pages und Vercel sie automatisch
  als Startseite erkennen.)
- `modeltest/` — die Ordnerstruktur für die Modellbibliothek, mit einem
  Platzhalterordner „Standard“ für jede Prüfung und jedes Niveau.

## So befüllen Sie einen Modelltest — keine Datei zu bearbeiten
Es gibt **keine manifest.json und keinen Index mehr zu pflegen.** Die App
erkennt neue Ordner und Dateien automatisch, sobald sie im Repository
liegen.

1. Öffnen Sie `index.html`, wählen Sie oben Prüfung + Niveau, legen Sie
   einen Modelltest an und füllen Sie ihn (mit der KI oder von Hand).
2. Gehen Sie zu **Import & Export → Einzelnes Modul** und laden Sie jedes
   Modul herunter. Die Dateien heißen automatisch genau richtig:
   ```
   lesen.json
   hoeren.json
   schreiben.json
   sprechen.json
   bausteine.json   (nur bei telc)
   ```
3. Laden Sie diese Dateien in den passenden Ordner hoch, z. B.:
   `modeltest/goethe/B2/Standard/lesen.json`
   Die `README.txt` in jedem Ordner können Sie danach löschen — sie wird
   von der App ohnehin ignoriert.
4. Fertig. Sobald Sie Prüfung + Niveau in der App wählen, taucht „Standard“
   automatisch in der Bibliothek-Zeile oben in der Kopfzeile auf — nichts
   einzutragen, nichts zu bearbeiten.

**Weiteres Buch:** einfach einen weiteren Ordner neben „Standard“ anlegen,
z. B. `modeltest/goethe/B2/Zusatzbuch/`, und dieselben Dateinamen dort
hochladen. Er erscheint automatisch als weitere Auswahl.

**Noch mehr Unterordner** sind erlaubt, z. B.
`modeltest/goethe/B2/Zusatzbuch/Teil 2/lesen.json` — die App zeigt dann so
lange ein weiteres Auswahlfeld an, bis sie auf einen Ordner mit den
Moduldateien selbst stößt.

## Voraussetzung: GitHub-Repository + echter Webserver
Die automatische Ordnererkennung liest die Dateiliste live über GitHubs
Contents-API — dafür muss dieses Paket in einem **öffentlichen
GitHub-Repository** liegen (Vercel- und Netlify-Deployments, die aus einem
GitHub-Repo importiert wurden, funktionieren genauso).

- **Auf einer `*.github.io`-Adresse** wird das Repository automatisch aus
  der URL erkannt — nichts einzustellen.
- **Auf einer eigenen Domain oder `*.vercel.app`** tragen Sie das
  Repository einmalig ein: In der App unter **Import & Export →
  Modellbibliothek** das Feld „GitHub-Repository“ ausfüllen, Format
  `Benutzername/Repo`. Das ist der einzige manuelle Schritt überhaupt —
  danach genügt reines Hochladen von Dateien.

Zum lokalen Testen (ohne GitHub) reicht:
`python3 -m http.server 8000` im Ordner ausführen und
`http://localhost:8000/index.html` öffnen — die Bibliothek selbst bleibt
in diesem Fall inaktiv (kein GitHub-Repository erreichbar), alles andere
funktioniert normal.

Die KI-Generierung (eigener Gemini-Schlüssel) funktioniert unabhängig
davon auf jeder echten Webadresse, nur nicht bei einer per Doppelklick
geöffneten Datei (`file://`).

## Ordnerstruktur
```
index.html
modeltest/
  goethe/{A1,A2,B1,B2,C1,C2}/Standard/{lesen,hoeren,schreiben,sprechen}.json
  telc/{A1,A2,B1,B2,C1}/Standard/{lesen,bausteine,hoeren,schreiben,sprechen}.json
  testdaf/{TDN3,TDN4,TDN5}/Standard/{lesen,hoeren,schreiben,sprechen}.json
```
