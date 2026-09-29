# AI Architekt

Website für **https://ai-architekt.com**.

Onepager für die KI-Tool-Leistungen von Martin Bauer: Workshops zur Projektdefinition, Konzeption, UX und komplette Umsetzung, immer als abgeschlossenes Projekt. AI Architekt ist eine Marke der MB Services GmbH.

Suchmaschinen sind derzeit ausgeschlossen (`noindex` im HTML, `X-Robots-Tag` per `vercel.json`, `robots.txt` mit `Disallow: /`). Wer die Seite indexieren lassen will, entfernt diese drei Stellen.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `public/index.html` | Die komplette Seite: HTML, CSS und alle Grafiken als Inline-SVG (Abb. 1 Schichtenmodell, Aufbau-Skizzen der Projekte, Plan-Zeichnungen der Zusammenarbeit) |
| `public/impressum.html`, `public/datenschutz.html` | Rechtstexte der MB Services GmbH |
| `public/img/` | Porträt Martin Bauer, Favicon |
| `public/fonts/` | Selbst gehostete Schrift Maven Pro. Keine Verbindung zu Google-Servern |
| `public/robots.txt` | Sperrt alle Crawler |
| `vercel.json` | Ausgabeordner, Header (noindex, Sicherheit, Font-Caching) |

Kein Build-Schritt, keine Abhängigkeiten.

## Deployment auf Vercel

1. In Vercel **Add New → Project**, dieses Repository importieren, Projektname `ai-architekt`, Framework *Other*. Einstellungen kommen aus `vercel.json`.
2. Unter **Settings → Domains** `ai-architekt.com` und `www.ai-architekt.com` (Weiterleitung auf die Hauptdomain) eintragen und die DNS-Einträge beim Domain-Anbieter so setzen, wie Vercel sie anzeigt.

Lokal ansehen: `python3 -m http.server -d public 8000` und http://localhost:8000 öffnen.

## Inhalte ändern

Alle Texte stehen direkt in `public/index.html`. Farben und Schriften sind als Tokens im `:root`-Block am Anfang des `<style>` definiert, inklusive Dark Mode.
