// Vercel-Funktion: listet alle .json-Dateien unter modeltest/ (vom aktuellen Deploy).
// Einmal im Projekt vorhanden — danach genügt es, Ordner/Dateien hochzuladen.
const fs = require("fs"), path = require("path");

module.exports = (req, res) => {
  const root = [path.join(process.cwd(), "modeltest"), path.join(__dirname, "..", "modeltest")].find(p => fs.existsSync(p));
  const files = [], e = process.env;
  const repo = e.VERCEL_GIT_REPO_OWNER && e.VERCEL_GIT_REPO_SLUG
    ? { owner: e.VERCEL_GIT_REPO_OWNER, repo: e.VERCEL_GIT_REPO_SLUG, branch: e.VERCEL_GIT_COMMIT_REF || "" } : null;
  if (!root) return res.status(200).json({ files, repo });
  (function walk(dir, rel) {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (d.name.startsWith(".")) continue;
      const r = rel ? rel + "/" + d.name : d.name;
      if (d.isDirectory()) walk(path.join(dir, d.name), r);
      else if (/\.json$/i.test(d.name)) files.push(r);
    }
  })(root, "");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ files: files.sort(), repo });
};
