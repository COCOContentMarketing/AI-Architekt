# Maßwerk – KI-Werkzeuge nach Maß

Onepager für die KI-Tool-Leistungen von Martin Bauer (COCO Consulting): Workshops zur Projektdefinition, Konzeption, UX und komplette Umsetzung, immer als abgeschlossenes Projekt.

Die Seite wird nur auf Empfehlung weitergegeben und ist bewusst von Suchmaschinen ausgeschlossen (`noindex` im HTML, `X-Robots-Tag` per `vercel.json`, `robots.txt` mit `Disallow: /`).

## Aufbau

| Pfad | Inhalt |
|---|---|
| `public/index.html` | Die komplette Seite: HTML, CSS und das Canvas-Motiv (Maßwerk-Rosette) in einer Datei |
| `public/fonts/` | Selbst gehostete Schriften (Bodoni Moda, IBM Plex Sans, IBM Plex Mono, SIL Open Font License). Keine Verbindung zu Google-Servern, damit datenschutzkonform |
| `public/robots.txt` | Sperrt alle Crawler |
| `vercel.json` | Ausgabeordner, Header (noindex, Sicherheit, Font-Caching) |

Kein Build-Schritt, keine Abhängigkeiten.

## Deployment auf Vercel

1. In Vercel **Add New → Project**, dieses Repository importieren, Framework *Other*. Einstellungen kommen aus `vercel.json`.
2. Optional unter **Settings → Domains** eine eigene (Sub-)Domain eintragen, z. B. `ki.coco-consulting.de`.

Lokal ansehen: `python3 -m http.server -d public 8000` und http://localhost:8000 öffnen.

## Inhalte ändern

Alle Texte stehen direkt in `public/index.html`. Farben und Schriften sind als Tokens im `:root`-Block am Anfang des `<style>` definiert, inklusive Dark Mode.
