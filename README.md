# AI Architekt

Website für **https://ai-architekt.com**.

Onepager für die KI-Tool-Leistungen von Martin Bauer: Workshops zur Projektdefinition, Konzeption, UX und komplette Umsetzung, immer als abgeschlossenes Projekt. AI Architekt ist eine Marke der MB Services GmbH.

Die Seite ist für Suchmaschinen freigegeben: kanonische Adresse `https://ai-architekt.com/`, `sitemap.xml`, strukturierte Daten (JSON-LD) und Open-Graph-Vorschaubild `img/share-ai.png`.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `public/index.html` | Die komplette Seite: HTML, CSS und alle Grafiken als Inline-SVG (Abb. 1 Schichtenmodell, Aufbau-Skizzen der Projekte, Plan-Zeichnungen der Zusammenarbeit) |
| `public/impressum.html`, `public/datenschutz.html` | Rechtstexte der MB Services GmbH |
| `public/img/` | Porträt Martin Bauer, Favicon (die Buchstaben „AI“ der Wortmarke als SVG-Pfade), PNG-Icons, Vorschaubild zum Teilen (`share-ai.png`, das „AI“ der Wortmarke) |
| `public/fonts/` | Selbst gehostete Schrift Maven Pro. Keine Verbindung zu Google-Servern |
| `public/robots.txt`, `public/sitemap.xml` | Crawler-Freigabe (ausdrücklich auch für Claude) und Sitemap |
| `public/llms.txt` | Inhalt der Seite als Klartext für KI-Assistenten. Bei inhaltlichen Änderungen an `index.html` mitpflegen |
| `api/contact.js` | Versand des Kontaktformulars per SMTP, mit Prüfung der Eingaben und Spam-Falle |
| `vercel.json` | Ausgabeordner, Sicherheits- und Cache-Header, Weiterleitung `/favicon.ico` |

Die Seite selbst braucht keinen Build-Schritt. Das Kontaktformular schickt an `api/contact.js`, eine Vercel-Funktion, die Anfragen per SMTP weiterleitet (Abhängigkeit: `nodemailer`).

## Kontaktformular einrichten

In Vercel unter **Settings → Environment Variables** für Production eintragen:

| Variable | Beispiel |
|---|---|
| `SMTP_HOST` | `smtp.ionos.de` |
| `SMTP_PORT` | `465` (SSL) oder `587` (STARTTLS) |
| `SMTP_USER`, `SMTP_PASS` | Zugangsdaten des Postfachs, über das verschickt wird |
| `MAIL_TO` | `kontakt@ai-architekt.com` |
| `MAIL_FROM` | optional, Absenderadresse (Standard: `SMTP_USER`) |

Danach neu deployen. Lokal ohne Versand testen mit `MAIL_DRY_RUN=1`.

## Deployment auf Vercel

1. In Vercel **Add New → Project**, dieses Repository importieren, Projektname `ai-architekt`, Framework *Other*. Einstellungen kommen aus `vercel.json`.
2. Unter **Settings → Domains** ist `ai-architekt.com` die Hauptdomain (liefert die Seite direkt aus), `www.ai-architekt.com` leitet per 308 auf `ai-architekt.com` weiter. So können auch KI-Assistenten wie Claude die Adresse `ai-architekt.com` ohne Umweg über eine andere Domain lesen. Die DNS-Einträge beim Domain-Anbieter so setzen, wie Vercel sie anzeigt.

Lokal ansehen: `python3 -m http.server -d public 8000` und http://localhost:8000 öffnen.

## Inhalte ändern

Alle Texte stehen direkt in `public/index.html`. Farben und Schriften sind als Tokens im `:root`-Block am Anfang des `<style>` definiert, inklusive Dark Mode.
