<?php
// Für normalen PHP-Webspace: listet alle .json-Dateien unter modeltest/.
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");
$root = __DIR__ . "/modeltest"; $files = [];
if (is_dir($root)) {
  $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
  foreach ($it as $f) {
    if ($f->isFile() && preg_match('/\.json$/i', $f->getFilename()))
      $files[] = str_replace("\\", "/", substr($f->getPathname(), strlen($root) + 1));
  }
}
sort($files);
echo json_encode(["files" => $files], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
