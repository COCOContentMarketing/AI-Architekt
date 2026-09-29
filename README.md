# COCO KI-Werkstatt

Live unter **https://ki-werkstatt.coco-consulting.de** (Vercel-Projekt `ki-werkstatt`).

Onepager für die KI-Tool-Leistungen von Martin Bauer (COCO Consulting): Workshops zur Projektdefinition, Konzeption, UX und komplette Umsetzung, immer als abgeschlossenes Projekt.

Die Seite wird nur auf Empfehlung weitergegeben und ist bewusst von Suchmaschinen ausgeschlossen (`noindex` im HTML, `X-Robots-Tag` per `vercel.json`, `robots.txt` mit `Disallow: /`).

## Aufbau

| Pfad | Inhalt |
|---|---|
| `public/index.html` | Die komplette Seite: HTML und CSS in einer Datei, im Look von COCO Consulting |
| `public/img/` | COCO-Logo und Porträt Martin Bauer (aus coco-consulting.de) |
| `public/fonts/` | Selbst gehostete Schriften der COCO-Marke (Maven Pro, Ubuntu). Keine Verbindung zu Google-Servern, damit datenschutzkonform |
| `public/robots.txt` | Sperrt alle Crawler |
| `vercel.json` | Ausgabeordner, Header (noindex, Sicherheit, Font-Caching) |

Kein Build-Schritt, keine Abhängigkeiten.

## Deployment auf Vercel

1. In Vercel **Add New → Project**, dieses Repository importieren, Framework *Other*. Einstellungen kommen aus `vercel.json`.
2. Unter **Settings → Domains** ist `ki-werkstatt.coco-consulting.de` eingetragen. Beim DNS-Anbieter von coco-consulting.de braucht es dafür einen CNAME `ki-werkstatt` → `cname.vercel-dns.com`.

Lokal ansehen: `python3 -m http.server -d public 8000` und http://localhost:8000 öffnen.

## Inhalte ändern

Alle Texte stehen direkt in `public/index.html`. Farben und Schriften sind als Tokens im `:root`-Block am Anfang des `<style>` definiert, inklusive Dark Mode.
