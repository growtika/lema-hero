/* ============================================
   LEMA HERO - WEBFLOW SCRIPT
   Add this to: Project Settings > Custom Code > Footer
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION - Edit these URLs if needed
    // ============================================
    const LEMA_CONFIG = {
        // Lottie JSON files (hosted on GitHub Pages)
        SECTION2_LOTTIE: 'https://growtika.github.io/lema-hero/Section_02_v01.json',
        SECTION3_LOTTIE: 'https://growtika.github.io/lema-hero/Section_3_v3.json',

        // Scroll trigger points (page scroll %)
        SECTION2_EXPANSION_TRIGGER: 30,  // Start expansion at 30% scroll
        SECTION2_EXPLOSION_TRIGGER: 35,  // Trigger explosion at 35% scroll
        SECTION3_PLAY_TRIGGER: 30,       // Section 3 plays when 30% visible

        // Animation settings
        EXPLOSION_SPEED: 1.5,            // Explosion speed multiplier
        EXPANSION_PAUSE_FRAME: 0.30      // Pause at 30% of Lottie frames
    };

    // ============================================
    // STATE
    // ============================================
    let section2Anim = null;
    let section3Anim = null;
    let section2Started = false;
    let section2Exploded = false;
    let section3Played = false;
    let section3Complete = false;

    // ============================================
    // LOTTIE INITIALIZATION
    // ============================================
    function initLottieAnimations() {
        return new Promise((resolve) => {
            // Check if Lottie is loaded
            if (typeof lottie === 'undefined') {
                console.error('Lottie library not loaded. Add lottie-web script first.');
                return;
            }

            const section2Container = document.getElementById('lema-section2-lottie');
            const section3Container = document.getElementById('lema-section3-lottie');

            if (!section2Container || !section3Container) {
                console.error('Lottie containers not found. Check element IDs.');
                return;
            }

            let loaded = 0;

            // Section 2 Lottie
            section2Anim = lottie.loadAnimation({
                container: section2Container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: LEMA_CONFIG.SECTION2_LOTTIE,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMax slice'
                }
            });

            section2Anim.addEventListener('DOMLoaded', () => {
                console.log('LEMA: Section 2 loaded -', section2Anim.totalFrames, 'frames');
                section2Anim.goToAndStop(0, true);
                loaded++;
                if (loaded === 2) resolve();
            });

            // Section 3 Lottie
            section3Anim = lottie.loadAnimation({
                container: section3Container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: LEMA_CONFIG.SECTION3_LOTTIE,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            });

            section3Anim.addEventListener('DOMLoaded', () => {
                console.log('LEMA: Section 3 loaded -', section3Anim.totalFrames, 'frames');
                loaded++;
                if (loaded === 2) resolve();
            });
        });
    }

    // ============================================
    // SECTION 2: TWO-PHASE ANIMATION
    // ============================================
    function getExpansionEndFrame() {
        return Math.floor(section2Anim.totalFrames * LEMA_CONFIG.EXPANSION_PAUSE_FRAME);
    }

    function startSection2Expansion() {
        if (section2Started) return;
        section2Started = true;

        console.log('LEMA: Starting expansion');
        const pauseFrame = getExpansionEndFrame();

        function onEnterFrame() {
            if (section2Anim.currentFrame >= pauseFrame && !section2Exploded) {
                section2Anim.removeEventListener('enterFrame', onEnterFrame);
                section2Anim.goToAndStop(pauseFrame, true);
                console.log('LEMA: Expansion paused at frame', pauseFrame);
            }
        }

        section2Anim.addEventListener('enterFrame', onEnterFrame);
        section2Anim.goToAndPlay(0, true);
    }

    function triggerSection2Explosion() {
        if (section2Exploded) return;
        section2Exploded = true;

        console.log('LEMA: Triggering explosion');
        section2Anim.setSpeed(LEMA_CONFIG.EXPLOSION_SPEED);

        if (!section2Started) {
            section2Started = true;
            section2Anim.goToAndPlay(getExpansionEndFrame(), true);
        } else {
            section2Anim.play();
        }
    }

    // ============================================
    // SECTION 3: PLAY ONCE
    // ============================================
    function playSection3() {
        if (section3Played) return;
        section3Played = true;

        console.log('LEMA: Playing Section 3');
        section3Anim.goToAndPlay(0, true);

        section3Anim.addEventListener('complete', () => {
            section3Complete = true;
            console.log('LEMA: Section 3 complete');
            section3Anim.goToAndStop(section3Anim.totalFrames - 1, true);
        });
    }

    function keepSection3Frozen() {
        if (section3Complete) {
            section3Anim.goToAndStop(section3Anim.totalFrames - 1, true);
        }
    }

    // ============================================
    // SCROLL HANDLER
    // ============================================
    function onScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const totalScrollPct = (scrollY / docHeight) * 100;

        // Section 2: Start expansion
        if (totalScrollPct >= LEMA_CONFIG.SECTION2_EXPANSION_TRIGGER && !section2Started) {
            startSection2Expansion();
        }

        // Section 2: Trigger explosion
        if (totalScrollPct >= LEMA_CONFIG.SECTION2_EXPLOSION_TRIGGER && !section2Exploded) {
            triggerSection2Explosion();
        }

        // Section 3: Check visibility and play
        const section3El = document.getElementById('lema-section3');
        if (section3El) {
            const section3Rect = section3El.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const s3Progress = ((viewportHeight - section3Rect.top) / (viewportHeight + section3Rect.height)) * 100;

            if (s3Progress >= LEMA_CONFIG.SECTION3_PLAY_TRIGGER && !section3Played) {
                playSection3();
            }
        }

        keepSection3Frozen();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    async function initLemaHero() {
        console.log('LEMA: Initializing hero animations...');

        await initLottieAnimations();

        console.log('LEMA: Ready');
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial check
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLemaHero);
    } else {
        initLemaHero();
    }

    // Expose config for easy editing
    window.LEMA_CONFIG = LEMA_CONFIG;

})();
