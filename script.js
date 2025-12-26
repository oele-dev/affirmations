/**
 * AffirmAudio Landing Page Scripts
 * Handles form validation, scroll animations, and interactive elements
 */

(function() {
    'use strict';

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /**
     * Email Validation
     * Simple regex for basic email format validation
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * ConvertKit Form Enhancement
     * Adds visual feedback and hides helper text on success
     * ConvertKit handles the actual submission via their JS library
     */
    function initConvertKitForms() {
        // Watch for ConvertKit success message injection
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('formkit-alert-success')) {
                        // Hide the form helper text when success shows
                        const form = node.closest('.formkit-form');
                        if (form) {
                            const helper = form.querySelector('.form-helper');
                            if (helper) {
                                helper.style.display = 'none';
                            }
                        }
                    }
                });
            });
        });

        // Observe all ConvertKit forms for changes
        document.querySelectorAll('.formkit-form').forEach(function(form) {
            observer.observe(form, { childList: true, subtree: true });
        });
    }

    /**
     * Scroll Animation Observer
     * Triggers fade-in animations when elements enter viewport
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');

        if (!animatedElements.length) return;

        // Use Intersection Observer for performance
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    /**
     * Smooth Scroll for Navigation Links
     * Handles anchor links with smooth scrolling
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * FAQ Accordion Enhancement
     * Adds smooth height animation to details/summary elements
     */
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function(item) {
            const summary = item.querySelector('summary');
            const content = item.querySelector('.faq-answer');

            summary.addEventListener('click', function(e) {
                e.preventDefault();

                // Close other open items (optional - remove for multi-open behavior)
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });

                // Toggle current item
                item.open = !item.open;
            });
        });
    }

    /**
     * Navigation Scroll Effect
     * Adds shadow to nav on scroll
     */
    function initNavScroll() {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                nav.style.boxShadow = '0 4px 20px rgba(30, 27, 75, 0.08)';
            } else {
                nav.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Audio Waveform Animation
     * Randomizes initial animation delays for organic feel
     */
    function initWaveformAnimation() {
        const waveformBars = document.querySelectorAll('.audio-waveform span');

        waveformBars.forEach(function(bar) {
            // Add slight random variation to animation
            const randomDelay = Math.random() * 0.5;
            const randomDuration = 0.8 + Math.random() * 0.6;
            bar.style.animationDelay = randomDelay + 's';
            bar.style.animationDuration = randomDuration + 's';
        });
    }

    /**
     * Countdown Timer
     * Counts down to January 5, 2026 00:00:00 EST
     *
     * To test: Change LAUNCH_DATE to a date 5 minutes from now:
     * const LAUNCH_DATE = new Date(Date.now() + 5 * 60 * 1000);
     */
    function initCountdown() {
        // Launch date: January 5, 2026 at midnight EST (UTC-5)
        // Using explicit timezone offset for consistency
        const LAUNCH_DATE = new Date('2026-01-05T00:00:00-05:00');

        // DOM Elements - Banner
        const bannerEl = document.getElementById('countdown-banner');
        const bannerDays = document.getElementById('banner-days');
        const bannerHours = document.getElementById('banner-hours');
        const bannerMinutes = document.getElementById('banner-minutes');
        const bannerSeconds = document.getElementById('banner-seconds');

        // DOM Elements - Hero
        const heroEl = document.querySelector('.countdown-hero');
        const heroDays = document.getElementById('hero-days');
        const heroHours = document.getElementById('hero-hours');
        const heroMinutes = document.getElementById('hero-minutes');
        const heroSeconds = document.getElementById('hero-seconds');

        // Check if elements exist
        if (!bannerEl || !heroEl) return;

        // Previous values for flip animation
        let prevValues = { days: '', hours: '', minutes: '', seconds: '' };

        /**
         * Pad number with leading zero
         */
        function pad(num) {
            return num.toString().padStart(2, '0');
        }

        /**
         * Add flip animation to element if value changed
         */
        function animateIfChanged(element, newValue, key) {
            if (prevValues[key] !== newValue) {
                element.classList.add('flip');
                setTimeout(function() {
                    element.classList.remove('flip');
                }, 300);
                prevValues[key] = newValue;
            }
        }

        /**
         * Update countdown display
         */
        function updateCountdown() {
            const now = new Date();
            const diff = LAUNCH_DATE - now;

            // If countdown is finished
            if (diff <= 0) {
                handleLaunched();
                return false; // Stop the interval
            }

            // Calculate time units
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const paddedDays = pad(days);
            const paddedHours = pad(hours);
            const paddedMinutes = pad(minutes);
            const paddedSeconds = pad(seconds);

            // Update banner countdown
            if (bannerDays) bannerDays.textContent = paddedDays;
            if (bannerHours) bannerHours.textContent = paddedHours;
            if (bannerMinutes) bannerMinutes.textContent = paddedMinutes;
            if (bannerSeconds) {
                animateIfChanged(bannerSeconds, paddedSeconds, 'seconds');
                bannerSeconds.textContent = paddedSeconds;
            }

            // Update hero countdown
            if (heroDays) heroDays.textContent = paddedDays;
            if (heroHours) heroHours.textContent = paddedHours;
            if (heroMinutes) heroMinutes.textContent = paddedMinutes;
            if (heroSeconds) heroSeconds.textContent = paddedSeconds;

            // Handle urgency states
            const hoursRemaining = diff / (1000 * 60 * 60);

            if (hoursRemaining <= 1) {
                // Less than 1 hour - FINAL HOURS
                bannerEl.classList.add('is-urgent');
                heroEl.classList.add('is-urgent');

                const titleEl = heroEl.querySelector('.countdown-title');
                if (titleEl && !titleEl.dataset.urgent) {
                    titleEl.textContent = 'FINAL HOURS!';
                    titleEl.dataset.urgent = 'true';
                }
            } else if (hoursRemaining <= 24) {
                // Less than 24 hours - urgent styling
                bannerEl.classList.add('is-urgent');
                heroEl.classList.add('is-urgent');
            }

            // Update aria-label for accessibility
            const ariaLabel = 'Countdown timer to launch: ' + days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';
            bannerEl.setAttribute('aria-label', ariaLabel);
            heroEl.setAttribute('aria-label', ariaLabel);

            return true; // Continue the interval
        }

        /**
         * Handle when launch date has passed
         */
        function handleLaunched() {
            // Update banner
            bannerEl.classList.add('is-launched');
            bannerEl.classList.remove('is-urgent');
            const bannerTextEl = bannerEl.querySelector('.banner-text');
            if (bannerTextEl) {
                bannerTextEl.innerHTML = "🎉 We're Live! Get Your Tailored Affirmations Now";
            }
            const bannerCta = bannerEl.querySelector('.banner-cta');
            if (bannerCta) {
                bannerCta.textContent = '50% Off Today!';
                bannerCta.style.display = 'inline-block';
            }

            // Update hero
            heroEl.classList.add('is-launched');
            heroEl.classList.remove('is-urgent');
            const heroTitle = heroEl.querySelector('.countdown-title');
            if (heroTitle) {
                heroTitle.innerHTML = '🚀 LIVE NOW!';
            }
        }

        // Initial update
        const shouldContinue = updateCountdown();

        // Update every second if countdown is still running
        if (shouldContinue) {
            const interval = setInterval(function() {
                const continueRunning = updateCountdown();
                if (!continueRunning) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    /**
     * Initialize all features when DOM is ready
     */
    function init() {
        // Initialize ConvertKit form enhancements
        initConvertKitForms();

        // Initialize other features
        initScrollAnimations();
        initSmoothScroll();
        initFaqAccordion();
        initNavScroll();
        initWaveformAnimation();
        initCountdown();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
