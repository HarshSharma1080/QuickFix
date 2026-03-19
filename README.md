# QuickFix – Home Repairs in 30 Minutes

QuickFix is a web platform for booking home repair services instantly — like Blinkit, but for electricians, plumbers, carpenters, mechanics, and other skilled workers. The goal is to make finding trusted repair professionals fast, easy, and reliable, especially in emergency situations with a 30-minute response guarantee.

## Features

- **Instant Booking** — Book verified electricians, plumbers, carpenters, painters, AC technicians, mechanics, appliance repair experts, and locksmiths
- **Emergency Services** — Priority dispatch within 30 minutes for urgent repairs
- **Service Categories** — Browse 8 service categories with 18+ specific service types
- **Transparent Pricing** — Clear starting prices with no hidden fees
- **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- **Search & Filter** — Find the exact service you need quickly

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero, service categories, how-it-works, worker profiles, testimonials, and more |
| `services.html` | Full services listing with category filters and detailed service cards |
| `booking.html` | Booking form with service selection, scheduling, address input, and order summary |

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Flexbox, Grid, responsive breakpoints
- **Vanilla JavaScript** — No frameworks; handles navigation, search, filtering, form validation, and animations
- **Google Fonts** — Inter typeface
- **Font Awesome** — Service and UI icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/HarshSharma1080/QuickFix.git
   cd QuickFix
   ```

2. Open `index.html` in a browser, or serve locally:
   ```bash
   python3 -m http.server 8080
   ```

3. Visit `http://localhost:8080` in your browser.

## Basic Security Self-Check (for your own site)

If you want to test your own website safely, use this defensive checklist:

1. **Keep dependencies updated**
   - If you add libraries later, update them regularly and remove unused ones.

2. **Validate all form inputs**
   - Never trust user input.
   - Validate required fields, email, phone, and length limits on both client and server (when you add a backend).

3. **Prevent XSS**
   - Do not inject raw user input into `innerHTML`.
   - Prefer `textContent` when rendering untrusted text.

4. **Use HTTPS in production**
   - Always deploy over HTTPS and avoid mixed content (HTTP assets on HTTPS pages).

5. **Add security headers when deploying**
   - Configure headers like Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy on your hosting platform.

6. **Harden authentication (if you add login later)**
   - Hash passwords with a strong algorithm, enforce strong passwords, and add rate limiting for login attempts.

7. **Run automated checks**
   - Use browser DevTools + Lighthouse and OWASP ZAP baseline scans against your own local/staging environment.

8. **Test safely and legally**
   - Only test apps and domains you own or have explicit permission to test.

## Deployment

This project includes a GitHub Actions workflow that automatically deploys the site to **GitHub Pages** on every push to `main`.

### To publish the site:

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Push a commit to the `main` branch (or trigger the workflow manually from the **Actions** tab).
5. Once the workflow completes, your site will be live at:
   ```
   https://<your-username>.github.io/QuickFix/
   ```

You can also trigger a deployment manually from the **Actions** tab using the "Run workflow" button.

## Project Structure

```
QuickFix/
├── index.html        # Landing page
├── services.html     # Services listing
├── booking.html      # Booking form
├── css/
│   └── style.css     # All styles
├── js/
│   └── main.js       # All interactivity
└── README.md
```
