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
     * Handle Email Form Submission
     * Validates email and shows success message
     * Ready for backend integration (ConvertKit, Mailchimp, etc.)
     */
    function handleFormSubmit(form) {
        const input = form.querySelector('.email-input');
        const formGroup = form.querySelector('.form-group');
        const successMessage = form.querySelector('.form-success');
        const helper = form.querySelector('.form-helper');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = input.value.trim();

            // Remove previous error states
            input.classList.remove('error');
            input.setCustomValidity('');

            // Validate email
            if (!email) {
                input.classList.add('error');
                input.focus();
                showError(input, 'Please enter your email address');
                return;
            }

            if (!isValidEmail(email)) {
                input.classList.add('error');
                input.focus();
                showError(input, 'Please enter a valid email address');
                return;
            }

            // Simulate form submission
            // TODO: Replace with actual API call to ConvertKit/Mailchimp
            // Example:
            // fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: email, api_key: 'YOUR_API_KEY' })
            // })

            // Show success state
            formGroup.style.display = 'none';
            if (helper) helper.style.display = 'none';
            successMessage.hidden = false;

            // Store email in localStorage for potential future use
            try {
                localStorage.setItem('affirmaudio_email', email);
            } catch (e) {
                // localStorage not available
            }
        });
    }

    /**
     * Show Error Message
     * Creates a temporary error message below the input
     */
    function showError(input, message) {
        // Remove any existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error styling
        input.style.borderColor = '#dc2626';
        input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';

        // Reset on focus
        input.addEventListener('focus', function resetError() {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            input.classList.remove('error');
            input.removeEventListener('focus', resetError);
        }, { once: true });
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
     * Initialize all features when DOM is ready
     */
    function init() {
        // Initialize all email forms
        document.querySelectorAll('.email-form').forEach(handleFormSubmit);

        // Initialize other features
        initScrollAnimations();
        initSmoothScroll();
        initFaqAccordion();
        initNavScroll();
        initWaveformAnimation();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
