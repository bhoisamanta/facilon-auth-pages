/**
 * Facilon Services - Custom Authentication Pages
 * JavaScript for enhanced functionality and Azure Entra External ID integration
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        debug: true,
        apiCheckInterval: 100, // Check every 100ms for API container
        maxApiCheckAttempts: 50, // Maximum 5 seconds
        analyticsEnabled: false
    };

    // State management
    const state = {
        pageType: null,
        apiContainerFound: false,
        formInjected: false,
        attempts: 0
    };

    /**
     * Initialize page
     */
    window.initializePage = function(pageType) {
        state.pageType = pageType;
        log('Initializing ' + pageType + ' page');

        // Wait for Azure to inject content
        waitForApiContainer();

        // Track page view
        trackPageView(pageType);

        // Add custom enhancements
        addCustomEventListeners();

        // Check for URL parameters (errors, messages, etc.)
        handleUrlParameters();
    };

    /**
     * Wait for Azure Entra External ID to inject content into #api div
     */
    function waitForApiContainer() {
        const apiDiv = document.getElementById('api');
        
        if (!apiDiv) {
            logError('API container (#api) not found in HTML!');
            return;
        }

        state.apiContainerFound = true;
        log('API container found, monitoring for injected content...');

        // Use MutationObserver to detect when Azure injects content
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    log('Content injected by Azure Entra External ID');
                    state.formInjected = true;
                    onFormInjected();
                    observer.disconnect(); // Stop observing once content is injected
                }
            });
        });

        observer.observe(apiDiv, {
            childList: true,
            subtree: true
        });

        // Fallback: Check periodically if observer doesn't fire
        checkApiContainerPeriodically();
    }

    /**
     * Periodic check for API container content (fallback)
     */
    function checkApiContainerPeriodically() {
        const interval = setInterval(function() {
            const apiDiv = document.getElementById('api');
            state.attempts++;

            if (apiDiv && apiDiv.children.length > 0) {
                log('API container has content (periodic check)');
                state.formInjected = true;
                clearInterval(interval);
                onFormInjected();
            } else if (state.attempts >= config.maxApiCheckAttempts) {
                logError('Azure content not injected after ' + (config.maxApiCheckAttempts * config.apiCheckInterval / 1000) + ' seconds');
                clearInterval(interval);
                showError('Failed to load authentication form. Please refresh the page.');
            }
        }, config.apiCheckInterval);
    }

    /**
     * Called when Azure injects the authentication form
     */
    function onFormInjected() {
        log('Applying custom enhancements to injected form');

        // Apply custom styling
        styleInjectedElements();

        // Add validation enhancements
        enhanceFormValidation();

        // Add password strength indicator (for signup/reset pages)
        if (state.pageType === 'signup' || state.pageType === 'resetpassword') {
            addPasswordStrengthIndicator();
        }

        // Add accessibility enhancements
        improveAccessibility();

        // Track form loaded event
        trackEvent('form_loaded', { pageType: state.pageType });
    }

    /**
     * Apply custom styling to Azure-injected elements
     */
    function styleInjectedElements() {
        // Add custom classes to inputs
        const inputs = document.querySelectorAll('#api input');
        inputs.forEach(function(input) {
            input.classList.add('custom-input');
            
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement?.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement?.classList.remove('focused');
                }
            });
        });

        // Add custom classes to buttons
        const buttons = document.querySelectorAll('#api button');
        buttons.forEach(function(button) {
            button.classList.add('custom-button');
            
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                addRippleEffect(e, this);
            });
        });

        // Style error messages
        const errors = document.querySelectorAll('#api .error, #api .alert-danger');
        errors.forEach(function(error) {
            error.classList.add('custom-error');
        });

        log('Custom styling applied to ' + inputs.length + ' inputs and ' + buttons.length + ' buttons');
    }

    /**
     * Enhance form validation
     */
    function enhanceFormValidation() {
        const form = document.querySelector('#api form');
        
        if (!form) {
            log('No form found in API container');
            return;
        }

        // Add real-time validation
        const emailInputs = document.querySelectorAll('#api input[type="email"]');
        emailInputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateEmail(this);
            });
        });

        // Track form submission
        form.addEventListener('submit', function() {
            log('Form submitted');
            trackEvent('form_submit', { pageType: state.pageType });
        });

        log('Form validation enhanced');
    }

    /**
     * Add password strength indicator
     */
    function addPasswordStrengthIndicator() {
        const passwordInputs = document.querySelectorAll('#api input[type="password"]');
        
        passwordInputs.forEach(function(input) {
            // Skip confirmation password fields
            if (input.id && input.id.toLowerCase().includes('confirm')) {
                return;
            }

            // Create strength indicator
            const strengthDiv = document.createElement('div');
            strengthDiv.className = 'password-strength hidden';
            strengthDiv.innerHTML = '<div class="password-strength-bar"></div>';
            
            input.parentElement?.appendChild(strengthDiv);

            // Update strength on input
            input.addEventListener('input', function() {
                const strength = calculatePasswordStrength(this.value);
                updatePasswordStrength(strengthDiv, strength);
            });

            input.addEventListener('focus', function() {
                strengthDiv.classList.remove('hidden');
            });
        });

        log('Password strength indicators added');
    }

    /**
     * Calculate password strength
     */
    function calculatePasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }

    /**
     * Update password strength indicator
     */
    function updatePasswordStrength(strengthDiv, strength) {
        const bar = strengthDiv.querySelector('.password-strength-bar');
        
        // Remove all strength classes
        bar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
        
        // Add current strength class
        bar.classList.add('strength-' + strength);
    }

    /**
     * Improve accessibility
     */
    function improveAccessibility() {
        // Ensure all inputs have proper labels
        const inputs = document.querySelectorAll('#api input');
        inputs.forEach(function(input) {
            if (!input.getAttribute('aria-label') && !input.id) {
                const label = input.parentElement?.querySelector('label');
                if (label) {
                    const labelText = label.textContent?.trim();
                    input.setAttribute('aria-label', labelText || 'Input field');
                }
            }
        });

        // Add ARIA live region for error messages
        const apiDiv = document.getElementById('api');
        if (apiDiv && !document.getElementById('error-announcement')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'error-announcement';
            liveRegion.setAttribute('role', 'alert');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.className = 'sr-only';
            apiDiv.appendChild(liveRegion);
        }

        log('Accessibility improvements applied');
    }

    /**
     * Validate email format
     */
    function validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        } else {
            clearInputError(input);
            return true;
        }
    }

    /**
     * Show input-specific error
     */
    function showInputError(input, message) {
        clearInputError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '13px';
        errorDiv.style.marginTop = '4px';
        
        input.parentElement?.appendChild(errorDiv);
        input.style.borderColor = '#dc2626';
    }

    /**
     * Clear input error
     */
    function clearInputError(input) {
        const existingError = input.parentElement?.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    /**
     * Add ripple effect to buttons
     */
    function addRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 600);
    }

    /**
     * Handle URL parameters
     */
    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const error = urlParams.get('error');
        const errorDesc = urlParams.get('error_description');
        const message = urlParams.get('message');

        if (error) {
            showError(errorDesc || error);
            trackEvent('auth_error', { error: error });
        }

        if (message) {
            showInfo(message);
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        const apiDiv = document.getElementById('api');
        if (!apiDiv) return;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error alert-danger';
        errorDiv.textContent = message;
        
        apiDiv.insertBefore(errorDiv, apiDiv.firstChild);

        // Auto-dismiss after 10 seconds
        setTimeout(function() {
            errorDiv.style.transition = 'opacity 0.3s';
            errorDiv.style.opacity = '0';
            setTimeout(function() {
                errorDiv.remove();
            }, 300);
        }, 10000);
    }

    /**
     * Show info message
     */
    function showInfo(message) {
        const apiDiv = document.getElementById('api');
        if (!apiDiv) return;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info alert-info';
        infoDiv.textContent = message;
        
        apiDiv.insertBefore(infoDiv, apiDiv.firstChild);

        // Auto-dismiss after 8 seconds
        setTimeout(function() {
            infoDiv.style.transition = 'opacity 0.3s';
            infoDiv.style.opacity = '0';
            setTimeout(function() {
                infoDiv.remove();
            }, 300);
        }, 8000);
    }

    /**
     * Add custom event listeners
     */
    function addCustomEventListeners() {
        // Prevent form resubmission on page refresh
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }

        // Handle page visibility change
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                log('Page hidden');
            } else {
                log('Page visible');
            }
        });

        // Handle online/offline status
        window.addEventListener('online', function() {
            log('Connection restored');
            showInfo('Connection restored');
        });

        window.addEventListener('offline', function() {
            log('Connection lost');
            showError('No internet connection. Please check your network.');
        });
    }

    /**
     * Track page view (analytics)
     */
    function trackPageView(pageType) {
        if (!config.analyticsEnabled) return;

        log('Tracking page view: ' + pageType);
        
        // Integrate with your analytics service (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: 'Auth - ' + pageType,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }

    /**
     * Track custom events
     */
    function trackEvent(eventName, eventData) {
        if (!config.analyticsEnabled) return;

        log('Tracking event: ' + eventName, eventData);

        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    /**
     * Logging helper
     */
    function log(message, data) {
        if (config.debug) {
            if (data) {
                console.log('[Facilon Auth] ' + message, data);
            } else {
                console.log('[Facilon Auth] ' + message);
            }
        }
    }

    /**
     * Error logging helper
     */
    function logError(message, error) {
        if (config.debug) {
            if (error) {
                console.error('[Facilon Auth] ' + message, error);
            } else {
                console.error('[Facilon Auth] ' + message);
            }
        }
    }

    /**
     * Get browser info for debugging
     */
    function getBrowserInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
        };
    }

    /**
     * Check system requirements
     */
    function checkRequirements() {
        const requirements = {
            localStorage: typeof(Storage) !== "undefined",
            cookies: navigator.cookieEnabled,
            javascript: true,
            https: window.location.protocol === 'https:' || window.location.hostname === 'localhost'
        };

        log('System requirements check:', requirements);

        if (!requirements.localStorage) {
            showError('Your browser does not support local storage. Please use a modern browser.');
        }

        if (!requirements.cookies) {
            showError('Cookies are disabled. Please enable cookies to sign in.');
        }

        return requirements;
    }

    /**
     * Initialize on DOM ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        log('DOM Content Loaded');
        log('Browser Info:', getBrowserInfo());
        checkRequirements();
    });

    /**
     * Handle page load
     */
    window.addEventListener('load', function() {
        log('Page fully loaded');
    });

    /**
     * Handle page unload (cleanup)
     */
    window.addEventListener('beforeunload', function() {
        log('Page unloading');
    });

    /**
     * Expose utilities to global scope
     */
    window.FacilonAuth = {
        log: log,
        logError: logError,
        trackEvent: trackEvent,
        showError: showError,
        showInfo: showInfo,
        getState: function() { return state; },
        getConfig: function() { return config; }
    };

})();
