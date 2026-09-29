# AI Architekt

Onepager für die KI-Tool-Leistungen von Martin Bauer: Workshops zur Projektdefinition, Konzeption, UX und komplette Umsetzung, immer als abgeschlossenes Projekt. AI Architekt ist eine Marke der MB Services GmbH.

Die Seite wird nur auf Empfehlung weitergegeben und ist bewusst von Suchmaschinen ausgeschlossen (`noindex` im HTML, `X-Robots-Tag` per `vercel.json`, `robots.txt` mit `Disallow: /`).

## Aufbau

| Pfad | Inhalt |
|---|---|
| `public/index.html` | Die komplette Seite: HTML, CSS und alle Grafiken als Inline-SVG (Schichtenmodell im Einstieg, Ablaufskizzen der Referenzwerkzeuge, Plan-Zeichnungen im Ablauf) |
| `public/impressum.html`, `public/datenschutz.html` | Rechtstexte der MB Services GmbH |
| `public/img/` | Porträt Martin Bauer, Favicon |
| `public/fonts/` | Selbst gehostete Schriften (Maven Pro, Ubuntu). Keine Verbindung zu Google-Servern |
| `public/robots.txt` | Sperrt alle Crawler |
| `vercel.json` | Ausgabeordner, Header (noindex, Sicherheit, Font-Caching) |

Kein Build-Schritt, keine Abhängigkeiten.

## Deployment auf Vercel

1. In Vercel **Add New → Project**, dieses Repository importieren, Projektname `ai-architekt`, Framework *Other*. Einstellungen kommen aus `vercel.json`.
2. Unter **Settings → Domains** die gewünschte Subdomain eintragen und beim DNS-Anbieter einen CNAME auf `cname.vercel-dns.com` setzen.

Lokal ansehen: `python3 -m http.server -d public 8000` und http://localhost:8000 öffnen.

## Inhalte ändern

Alle Texte stehen direkt in `public/index.html`. Farben und Schriften sind als Tokens im `:root`-Block am Anfang des `<style>` definiert, inklusive Dark Mode.
