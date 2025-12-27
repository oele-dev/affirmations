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
     * Custom Audio Player
     * Handles play/pause, progress, and volume controls
     */
    function initAudioPlayer() {
        const player = document.getElementById('audio-player');
        const audio = document.getElementById('audio-element');
        const playBtn = document.getElementById('play-btn');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const currentTimeEl = document.getElementById('current-time');
        const totalTimeEl = document.getElementById('total-time');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeBar = document.getElementById('volume-bar');

        if (!audio || !player) return;

        let isDragging = false;

        /**
         * Format time in M:SS format
         */
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' : '') + secs;
        }

        /**
         * Toggle play/pause
         */
        function togglePlay() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        /**
         * Update play button icon
         */
        function updatePlayButton() {
            const playIcon = playBtn.querySelector('.play-icon');
            const pauseIcon = playBtn.querySelector('.pause-icon');

            if (audio.paused) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                player.classList.remove('is-playing');
                playBtn.setAttribute('aria-label', 'Play audio');
            } else {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                player.classList.add('is-playing');
                playBtn.setAttribute('aria-label', 'Pause audio');
            }
        }

        /**
         * Update progress bar
         */
        function updateProgress() {
            if (!isDragging && audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = percent + '%';
                currentTimeEl.textContent = formatTime(audio.currentTime);
            }
        }

        /**
         * Seek to position in track
         */
        function seek(e) {
            const rect = progressContainer.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audio.currentTime = percent * audio.duration;
            progressBar.style.width = (percent * 100) + '%';
        }

        /**
         * Update volume
         */
        function setVolume(e) {
            const rect = volumeSlider.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audio.volume = percent;
            volumeBar.style.width = (percent * 100) + '%';
            updateVolumeIcon();
        }

        /**
         * Toggle mute
         */
        function toggleMute() {
            audio.muted = !audio.muted;
            updateVolumeIcon();
        }

        /**
         * Update volume icon based on state
         */
        function updateVolumeIcon() {
            const volumeIcon = volumeBtn.querySelector('.volume-icon');
            const muteIcon = volumeBtn.querySelector('.mute-icon');

            if (audio.muted || audio.volume === 0) {
                volumeIcon.style.display = 'none';
                muteIcon.style.display = 'block';
            } else {
                volumeIcon.style.display = 'block';
                muteIcon.style.display = 'none';
            }
        }

        // Event Listeners
        playBtn.addEventListener('click', togglePlay);
        audio.addEventListener('play', updatePlayButton);
        audio.addEventListener('pause', updatePlayButton);
        audio.addEventListener('timeupdate', updateProgress);

        audio.addEventListener('loadedmetadata', function() {
            totalTimeEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            progressBar.style.width = '0%';
            updatePlayButton();
        });

        // Progress bar click/drag
        progressContainer.addEventListener('click', seek);

        progressContainer.addEventListener('mousedown', function(e) {
            isDragging = true;
            seek(e);
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                seek(e);
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        // Volume controls
        if (volumeBtn) {
            volumeBtn.addEventListener('click', toggleMute);
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('click', setVolume);
        }

        // Keyboard controls
        player.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'ArrowLeft') {
                audio.currentTime = Math.max(0, audio.currentTime - 5);
            } else if (e.code === 'ArrowRight') {
                audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
            }
        });

        // Make player focusable for keyboard controls
        player.setAttribute('tabindex', '0');
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
        initAudioPlayer();
        initCountdown();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
