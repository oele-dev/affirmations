# VoiceMyGoals Landing Page

A professional, conversion-focused landing page for VoiceMyGoals - a tool that converts personal affirmations into taylored audio files.

## Quick Start

### Running Locally

**Option 1: Simple HTTP Server (Python)**
```bash
cd /path/to/affirmations
python3 -m http.server 8000
```
Open http://localhost:8000 in your browser.

**Option 2: VS Code Live Server**
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

**Option 3: Node.js (serve)**
```bash
npx serve .
```

## Project Structure

```
/
├── index.html      # Main HTML structure
├── styles.css      # All styles (responsive, animations)
├── script.js       # Form validation, scroll animations
├── README.md       # This file
└── PDR.md          # Product Design Requirements
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts. Your site will be live at `your-project.vercel.app`

### Deploy to Netlify

**Option 1: Drag & Drop**
1. Go to https://app.netlify.com/drop
2. Drag the project folder to the upload area
3. Done! Your site is live.

**Option 2: CLI**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Email Integration

The forms are frontend-ready. To connect to your email provider:

### ConvertKit

In `script.js`, replace the TODO comment with:

```javascript
fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email,
        api_key: 'YOUR_PUBLIC_API_KEY'
    })
})
.then(response => response.json())
.then(data => {
    // Show success message
    formGroup.style.display = 'none';
    if (helper) helper.style.display = 'none';
    successMessage.hidden = false;
})
.catch(error => {
    console.error('Subscription failed:', error);
});
```

### Mailchimp

```javascript
// Use Mailchimp's embedded form action or their API
fetch('https://YOUR_DC.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    method: 'POST',
    headers: {
        'Authorization': 'apikey YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email_address: email,
        status: 'subscribed'
    })
});
```

**Note:** For production, use a serverless function (Vercel/Netlify Functions) to hide API keys.

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #6366f1;      /* Main purple */
    --color-secondary: #a855f7;     /* Accent purple */
    --color-accent: #f59e0b;        /* Amber highlights */
    --color-bg: #faf9f7;            /* Background */
    --color-text: #1e1b4b;          /* Main text */
}
```

### Content Updates

- **Waitlist count**: Search for "147" in `index.html` and update
- **Launch date**: Search for "January 15th" in `index.html`
- **Pricing**: Update in the pricing section

### Adding a Sample Audio

Replace the placeholder in the Solution section:

```html
<audio controls>
    <source src="sample.mp3" type="audio/mpeg">
</audio>
```

## Features

- Mobile-first responsive design (375px → 1440px+)
- Scroll-triggered animations
- Email validation (frontend)
- FAQ accordion
- Accessible (ARIA labels, semantic HTML, focus states)
- SEO optimized (meta tags, Open Graph)
- Reduced motion support
- No dependencies (vanilla HTML/CSS/JS + Lucide icons CDN)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Minimal JavaScript (~3KB)
- CSS animations hardware-accelerated
- No heavy frameworks
- Lucide icons loaded from CDN
- Google Fonts with `display=swap`

## License

Private project. All rights reserved.
