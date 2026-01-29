# LEMA Hero - Webflow Implementation Guide

## Quick Setup

### Step 1: Add Lottie Library (Head Code)
Go to **Project Settings > Custom Code > Head Code** and add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
```

### Step 2: Add Custom CSS (Head Code)
In the same Head Code section, add the styles from `lema-hero-styles.css`:

```html
<style>
/* Paste contents of lema-hero-styles.css here */
</style>
```

Or link to hosted file:
```html
<link rel="stylesheet" href="https://growtika.github.io/lema-hero/webflow/lema-hero-styles.css">
```

### Step 3: Add Custom Script (Footer Code)
Go to **Project Settings > Custom Code > Footer Code** and add:

```html
<script src="https://growtika.github.io/lema-hero/webflow/lema-hero-script.js"></script>
```

---

## Page Structure in Webflow

### Section 1: Hero Video
Create a section with:
- **Class:** `lema-hero-section`
- **ID:** `lema-section1`

Inside, add:
1. **Video element** with class `lema-hero-video`
   - Source: `https://growtika.github.io/lema-hero/Lema%20Kaleidoskop%20Hero.mp4`
   - Autoplay: ON
   - Loop: OFF
   - Muted: ON

2. **Div** with class `lema-section-overlay` containing your text content

### Section 2: Lottie Explosion (Dark)
Create a section with:
- **Class:** `lema-lottie-section dark`
- **ID:** `lema-section2`

Inside, add:
1. **Div** with:
   - **Class:** `lema-lottie-container`
   - **ID:** `lema-section2-lottie` (IMPORTANT: This ID is required)

2. **Div** with class `lema-section-overlay` containing your text content

### Section 3: Lottie Continued
Create a section with:
- **Class:** `lema-lottie-section`
- **ID:** `lema-section3`

Inside, add:
1. **Div** with:
   - **Class:** `lema-lottie-container`
   - **ID:** `lema-section3-lottie` (IMPORTANT: This ID is required)

2. **Div** with class `lema-section-overlay` containing your text content

---

## Required Element IDs

These IDs MUST be set exactly as shown:

| Element | ID |
|---------|-----|
| Section 2 Lottie Container | `lema-section2-lottie` |
| Section 3 Element | `lema-section3` |
| Section 3 Lottie Container | `lema-section3-lottie` |

---

## Configuration Options

You can customize the animation by editing the `LEMA_CONFIG` object in the script:

```javascript
const LEMA_CONFIG = {
    // Lottie JSON files
    SECTION2_LOTTIE: 'https://growtika.github.io/lema-hero/Section_02.json',
    SECTION3_LOTTIE: 'https://growtika.github.io/lema-hero/Section_3_v3.json',

    // Scroll trigger points (page scroll %)
    SECTION2_EXPANSION_TRIGGER: 30,  // Start expansion
    SECTION2_EXPLOSION_TRIGGER: 35,  // Trigger explosion
    SECTION3_PLAY_TRIGGER: 30,       // Section 3 plays

    // Animation settings
    EXPLOSION_SPEED: 1.5,            // Explosion speed (1 = normal)
    EXPANSION_PAUSE_FRAME: 0.30      // Pause at 30% of animation
};
```

---

## Asset URLs

All assets are hosted on GitHub Pages:

| Asset | URL |
|-------|-----|
| Hero Video | `https://growtika.github.io/lema-hero/Lema%20Kaleidoskop%20Hero.mp4` |
| Section 2 Lottie | `https://growtika.github.io/lema-hero/Section_02.json` |
| Section 3 Lottie | `https://growtika.github.io/lema-hero/Section_3_v3.json` |
| CSS | `https://growtika.github.io/lema-hero/webflow/lema-hero-styles.css` |
| JS | `https://growtika.github.io/lema-hero/webflow/lema-hero-script.js` |

---

## Troubleshooting

1. **Animations not playing?**
   - Check browser console for errors
   - Verify element IDs are correct
   - Ensure Lottie library is loaded before the script

2. **Styling issues?**
   - Make sure CSS is loaded
   - Check for conflicting Webflow styles
   - Use `!important` if needed to override

3. **Video not playing on mobile?**
   - Ensure `playsinline` and `muted` attributes are set
   - Mobile browsers require muted for autoplay
