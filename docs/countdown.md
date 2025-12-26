```
Add a countdown timer to the landing page with these specifications:

## PLACEMENT:
Add the countdown timer in TWO locations:

1. **Top banner (sticky/fixed):**
   - Position: Fixed at top of page (stays visible when scrolling)
   - Background: Gradient (primary color with slight transparency)
   - Should push content down (not overlap)
   - Mobile: Remains visible but smaller font

2. **Hero section (below headline):**
   - Position: Below the subheadline, above email form
   - Larger, more prominent display
   - Part of the main hero content

## COUNTDOWN TARGET:
- Date: January 5, 2026
- Time: 00:00:00 EST (midnight)
- When countdown reaches zero: Display "Launch Day! 🎉"

## DESIGN SPECIFICATIONS:

### Top Banner (Sticky):
```
┌─────────────────────────────────────────────────────────┐
│ 🎆 New Year Launch Special - Jan 5th                    │
│ ⏰ Days: 09 | Hours: 14 | Minutes: 23 | Seconds: 45    │
│ First 100 people get 50% off forever                    │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: 60px (desktop), 80px (mobile - 2 lines if needed)
- Font: Medium weight, easy to read
- Color: White text on gradient background
- Numbers: Slightly larger/bold than surrounding text
- Animation: Seconds should flip/update smoothly (optional fade effect)
- Z-index: Should be above all content
- Shadow: Subtle shadow for depth

### Hero Section Countdown:
```
┌─────────────────────────────────────────────────────────┐
│              LAUNCHING IN:                              │
│                                                          │
│    ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│    │  09  │  │  14  │  │  23  │  │  45  │             │
│    │ DAYS │  │HOURS │  │ MINS │  │ SECS │             │
│    └──────┘  └──────┘  └──────┘  └──────┘             │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- Style: Card-based design with boxes for each unit
- Each box: 80px x 100px (desktop), 60px x 80px (mobile)
- Background: Slightly lighter than page background or subtle gradient
- Border: Optional subtle border or shadow
- Numbers: Large, bold (36px desktop, 24px mobile)
- Labels: Smaller text below numbers (12px)
- Spacing: 20px between boxes
- Centered in hero section

## JAVASCRIPT FUNCTIONALITY:

```javascript
// Required features:
1. Calculate time difference from now to Jan 5, 2026 00:00:00 EST
2. Update every second
3. Display format: Days, Hours, Minutes, Seconds
4. When countdown hits zero:
   - Top banner: Change to "🎉 We're Live! Get 50% Off Today Only"
   - Hero countdown: Change to "LIVE NOW! 🚀" with CTA button
5. Handle timezone: Use Eastern Standard Time (EST)
6. Pad numbers with leading zeros (09 not 9)
```

## EDGE CASES:

1. **If launch date has passed:**
   - Top banner: "🎉 Launched! Get Your Tailored Affirmations Now"
   - Hero: Replace countdown with prominent CTA button

2. **Less than 24 hours remaining:**
   - Add pulsing/urgent animation
   - Optional: Change color to more urgent (amber/red tint)

3. **Less than 1 hour remaining:**
   - Add "FINAL HOURS!" text
   - More prominent animation

## MOBILE RESPONSIVENESS:

**Desktop (>768px):**
- Top banner: Single line, horizontal layout
- Hero countdown: 4 boxes in a row

**Tablet (481px-768px):**
- Top banner: May wrap to 2 lines
- Hero countdown: 4 boxes in a row, slightly smaller

**Mobile (<480px):**
- Top banner: 2 lines if needed, smaller text
- Hero countdown: 2x2 grid (Days/Hours on top, Mins/Secs below)
- Reduce box sizes proportionally

## ANIMATION (OPTIONAL BUT RECOMMENDED):

1. **Smooth transitions:**
   - When numbers change, subtle fade or flip animation
   - Seconds should feel "alive" (updating continuously)

2. **Attention grabbing:**
   - Optional pulse effect on hero countdown (subtle, every 3 seconds)
   - Not annoying - should enhance, not distract

## COLOR SUGGESTIONS:

**Top banner:**
- Background: Gradient from primary color (#6366F1) to secondary (#8B5CF6)
- Text: White (#FFFFFF)
- Numbers: Bright white or slight yellow tint for emphasis

**Hero countdown boxes:**
- Background: White with subtle shadow OR light gradient
- Numbers: Primary color (#6366F1) or dark gray (#1E293B)
- Labels: Light gray (#64748B)
- Border (if used): Light gray (#E2E8F0)

## ACCESSIBILITY:

- Add aria-label: "Countdown timer to launch: X days, Y hours, Z minutes, W seconds"
- Update aria-label as countdown changes
- Ensure sufficient color contrast (WCAG AA minimum)
- Timer should not cause motion sickness (no aggressive animations)

## PERFORMANCE:

- Use requestAnimationFrame or setInterval (1000ms) for updates
- Don't re-render entire DOM, only update number text nodes
- Minimize reflows/repaints
- Countdown should not impact page load time

## TESTING CHECKLIST:

After implementation, verify:
- [ ] Countdown calculates correctly from current time to Jan 5, 2026
- [ ] Updates every second without lag
- [ ] Numbers display with leading zeros (09, 08, 07...)
- [ ] Works across timezones (always shows time to EST midnight)
- [ ] Top banner stays fixed on scroll
- [ ] Mobile responsive (both banner and hero countdown)
- [ ] What happens when countdown reaches zero
- [ ] No console errors
- [ ] Smooth animations (if implemented)

## DELIVERABLES:

1. Updated HTML with countdown markup (both locations)
2. Updated CSS with all countdown styles + responsiveness
3. New JavaScript file (countdown.js) OR add to existing script.js
4. Comments explaining key functions
5. Instructions on how to:
   - Change launch date if needed
   - Customize styles/colors
   - Test countdown locally (set date to 5 minutes from now)

## EXAMPLE HTML STRUCTURE:

```html
<!-- Top Banner -->
<div id="countdown-banner" class="countdown-banner">
  <div class="container">
    <span class="banner-icon">🎆</span>
    <span class="banner-text">New Year Launch Special - Jan 5th</span>
    <div class="countdown-compact">
      <span class="countdown-unit">
        <span id="banner-days">00</span>d
      </span>
      <span class="countdown-unit">
        <span id="banner-hours">00</span>h
      </span>
      <span class="countdown-unit">
        <span id="banner-minutes">00</span>m
      </span>
      <span class="countdown-unit">
        <span id="banner-seconds">00</span>s
      </span>
    </div>
    <span class="banner-cta">First 100 people get 50% off</span>
  </div>
</div>

<!-- Hero Countdown -->
<div class="countdown-hero">
  <h3 class="countdown-title">Launching In:</h3>
  <div class="countdown-boxes">
    <div class="countdown-box">
      <span class="countdown-number" id="hero-days">00</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-box">
      <span class="countdown-number" id="hero-hours">00</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-box">
      <span class="countdown-number" id="hero-minutes">00</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-box">
      <span class="countdown-number" id="hero-seconds">00</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>
</div>
```

## ADDITIONAL NOTES:

- Keep code clean and well-commented
- Make it easy to change launch date (single constant at top of JS)
- Consider adding a test mode (set launch date to 5 min from now for testing)
- Ensure it works even if user's device time is incorrect (use server time if possible, or at least validate)

Let me know when it's done and I'll test it!
```
