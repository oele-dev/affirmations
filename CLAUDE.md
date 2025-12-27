# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VoiceMyGoals is a landing page for a product that converts personal affirmations into professional audio files with AI voices and 432Hz background music. The site is a static frontend-only application with no build step.

## Running Locally

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx serve .
```

Then open http://localhost:8000

## Deployment

```bash
# Vercel
vercel

# Netlify
netlify deploy --prod
```

## Architecture

**Tech Stack**: Vanilla HTML/CSS/JavaScript (no frameworks, no build process)

**File Structure**:
- `index.html` - Main page with all sections (hero, problem, solution, pricing, FAQ)
- `styles.css` - All styling including CSS variables, responsive design, animations
- `script.js` - Form handling, scroll animations, audio player, countdown timer
- `assets/audio/` - Sample audio files

**Key Features**:
- Email forms integrated with ConvertKit (using their JS SDK at `https://f.convertkit.com/ckjs/ck.5.js`)
- Custom audio player with play/pause, progress bar, and volume controls
- Countdown timer targeting January 5, 2026 (EST timezone)
- Scroll-triggered fade-in animations using Intersection Observer
- FAQ accordion using native `<details>/<summary>` elements

**CSS Architecture**:
- CSS custom properties defined in `:root` for colors, typography, spacing
- Mobile-first responsive design
- Primary font: Fraunces (display), DM Sans (body) via Google Fonts
- Icons: Lucide Icons via CDN (`https://unpkg.com/lucide@latest`)

**JavaScript Patterns**:
- IIFE wrapper with `'use strict'`
- All features initialized via `init()` function on DOMContentLoaded
- Lucide icons initialized with `lucide.createIcons()`
- ConvertKit forms auto-submit; custom code observes for success messages to hide helper text

## Content Updates

- **Waitlist count**: Update "200+" in hero and final CTA sections
- **Launch date**: Update countdown in `script.js` (`LAUNCH_DATE` constant) and displayed text in `index.html`
- **Pricing**: Update in pricing section
- **Colors**: Modify CSS variables in `:root` in `styles.css`
