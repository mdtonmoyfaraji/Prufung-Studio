Legen Sie hier die Moduldateien für telc A1 — Buch "Standard" ab:
  lesen.json
  hoeren.json
  schreiben.json
  sprechen.json
  bausteine.json  (nur telc)

Das ist alles — keine manifest.json, kein Index, nichts zu pflegen.
Sobald diese Dateien hier liegen (und die Seite über einen echten
Webserver läuft), erscheint "Standard" automatisch in der Bibliothek
oben in der Kopfzeile der App.

Jede Datei ist genau das, was der Button "Einzelnes Modul" in
Prüfungsstudio → Import & Export erzeugt. Diese README.txt können Sie
löschen, sobald die echten JSON-Dateien hier liegen — sie wird von der
App ignoriert.

Weiteres Buch für dieses Niveau: legen Sie einfach einen weiteren Ordner
neben "Standard" an, z. B. modeltest/telc/A1/Zusatzbuch/, und laden
Sie dort die gleichen Dateinamen hoch. Er erscheint automatisch als
weitere Option — nichts einzutragen, nichts zu bearbeiten.

Sie können auch noch tiefer schachteln, z. B.
modeltest/telc/A1/Zusatzbuch/Teil 2/lesen.json — die App zeigt dann
so lange ein weiteres Auswahlfeld, bis sie auf einen Ordner mit den
Moduldateien selbst stößt.
