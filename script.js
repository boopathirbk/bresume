import { resumeData } from './data.js';

/**
 * Main application initialization.
 * Uses strict mode automatically (ES Module).
 */
const App = {
    init() {
        this.renderContent();
        this.setupTheme();
        this.setupAnimations();
        this.setupAccessibility();
        this.updateYear();
    },

    /**
     * Renders all dynamic content from data.js
     */
    renderContent() {
        // Safe DOM query helper
        const $ = (id) => document.getElementById(id);

        if (!resumeData || !resumeData.personalInfo) {
            console.error('Resume data or personal info not found.');
            return;
        }

        // Hero Section — Avatar
        if (resumeData.personalInfo.avatar && $('avatar')) {
            const avatarEl = $('avatar');
            avatarEl.src = resumeData.personalInfo.avatar;
            avatarEl.style.display = 'inline-block';
        }

        // Tagline
        if ($('tagline')) $('tagline').textContent = resumeData.personalInfo.tagline || '';

        // Hero Name — with gradient span
        if ($('heroName')) {
            const name = resumeData.personalInfo.name || 'Developer';
            $('heroName').innerHTML = `Hi, I'm <br><span class="name-gradient">${name}</span>`;
        }

        // Bio
        if ($('heroBio')) $('heroBio').textContent = resumeData.personalInfo.bio || '';

        // Social Links + Resume
        const linksContainer = document.querySelector('.links-container');
        if (linksContainer && resumeData.personalInfo.social) {
            linksContainer.innerHTML = '';

            const createLink = (url, text, iconClass, isPrimary = false) => {
                const a = document.createElement('a');
                a.href = url;
                a.className = `btn ${isPrimary ? 'primary' : ''}`;
                a.innerHTML = `<i class="${iconClass}"></i> ${text}`;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                return a;
            };

            linksContainer.appendChild(createLink(resumeData.personalInfo.social.github, 'GitHub', 'fab fa-github', true));
            linksContainer.appendChild(createLink(resumeData.personalInfo.social.linkedin, 'LinkedIn', 'fab fa-linkedin'));
            linksContainer.appendChild(createLink('https://drive.google.com/uc?export=download&id=1CxD9xVYdcAzzN9NGGCPsFKzytOTXmwB9', 'Download Resume', 'fas fa-download'));
        }

        // Story
        const storyContainer = $('storyContent');
        if (storyContainer && resumeData.story?.content) {
            storyContainer.style.whiteSpace = 'pre-line';
            storyContainer.textContent = resumeData.story.content;
        }

        // Experience
        const expList = $('experienceList');
        if (expList && resumeData.experience) {
            resumeData.experience.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <div class="role">${exp.role}</div>
                    <div class="company">${exp.company}</div>
                    <span class="text-muted text-sm" style="margin-bottom: 0.75rem; display: block;">${exp.period}</span>
                    <ul class="text-secondary" style="list-style-position: inside; font-size: 0.875rem; line-height: 1.75;">
                        ${exp.description.map(d => `<li style="margin-bottom:0.25rem">${d}</li>`).join('')}
                    </ul>
                `;
                expList.appendChild(item);
            });
        }

        // Projects
        const projGrid = $('projectsGrid');
        if (projGrid && resumeData.projects) {
            resumeData.projects.forEach(proj => {
                const card = document.createElement('div');
                card.className = 'project-card';

                const isProprietaryProject = !proj.link;

                card.innerHTML = `
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="text-secondary text-sm">${proj.description}</p>
                    <div class="tags">
                        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    ${isProprietaryProject
                        ? `<span class="proprietary-note"><i class="fas fa-lock"></i> Proprietary — internal company use</span>`
                        : `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:0.375rem; margin-top:1rem; font-size:0.8rem; font-weight:500;">
                            View Project <i class="fas fa-arrow-right" style="font-size:0.7em;"></i>
                        </a>`}
                `;
                projGrid.appendChild(card);
            });
        }

        // Skills — Color-coded badges
        const skillCategories = [
            { keywords: ['Windows', 'OS Troubleshooting', 'Microsoft 365'], colorClass: 'badge-sky' },
            { keywords: ['Linux', 'Networking'], colorClass: 'badge-emerald' },
            { keywords: ['Remote', 'Web & Content'], colorClass: 'badge-rose' },
            { keywords: ['AI-Assisted'], colorClass: 'badge-violet' },
            { keywords: ['Email Admin'], colorClass: 'badge-amber' },
        ];

        const getSkillColor = (skill) => {
            for (const cat of skillCategories) {
                if (cat.keywords.some(kw => skill.includes(kw))) return cat.colorClass;
            }
            return '';
        };

        const skillsContainer = $('skillsList');
        if (skillsContainer && resumeData.skills) {
            resumeData.skills.forEach(skill => {
                const span = document.createElement('span');
                span.className = `skill-pill ${getSkillColor(skill)}`;
                span.textContent = skill;
                skillsContainer.appendChild(span);
            });
        }

        // Certifications — Icon cards
        const certsContainer = $('certsList');
        if (certsContainer && resumeData.certifications) {
            certsContainer.innerHTML = '';
            certsContainer.style.flexDirection = 'column';

            resumeData.certifications.forEach(cert => {
                const div = document.createElement('div');
                div.className = 'cert-card';
                div.innerHTML = `
                    <div class="cert-icon"><i class="fas fa-shield-alt"></i></div>
                    <span>${cert}</span>
                `;
                certsContainer.appendChild(div);
            });
        }

        // Interests
        const interestsContainer = $('interestsList');
        if (interestsContainer && resumeData.interests) {
            resumeData.interests.forEach(item => {
                const span = document.createElement('span');
                span.className = 'skill-pill badge-amber';
                span.textContent = item;
                interestsContainer.appendChild(span);
            });
        }

        // Footer
        if ($('footerLocation')) {
            $('footerLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${resumeData.personalInfo.location}`;
        }

        const footerSocial = $('footerSocial');
        if (footerSocial) {
            footerSocial.innerHTML = `
                <h2 style="margin-bottom: 2.5rem;">Get in Touch</h2>
                <div class="contact-grid">
                    
                    <a href="mailto:${resumeData.personalInfo.email}" class="contact-card">
                        <div class="icon-box"><i class="fas fa-envelope"></i></div>
                        <div>
                            <span class="label">Email</span>
                            <span class="value">${resumeData.personalInfo.email}</span>
                        </div>
                    </a>

                    <a href="tel:${resumeData.personalInfo.phone}" class="contact-card">
                        <div class="icon-box"><i class="fas fa-phone"></i></div>
                        <div>
                            <span class="label">Phone</span>
                            <span class="value">${resumeData.personalInfo.phone}</span>
                        </div>
                    </a>

                    <a href="${resumeData.personalInfo.social.github}" target="_blank" rel="noopener noreferrer" class="contact-card">
                        <div class="icon-box"><i class="fab fa-github"></i></div>
                        <div>
                            <span class="label">GitHub</span>
                            <span class="value">/boopathirbk</span>
                        </div>
                    </a>

                    <a href="${resumeData.personalInfo.social.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-card">
                        <div class="icon-box"><i class="fab fa-linkedin"></i></div>
                        <div>
                            <span class="label">LinkedIn</span>
                            <span class="value">/boopathirb</span>
                        </div>
                    </a>
                </div>
            `;
        }
    },

    /**
     * Handles Dark/Light mode toggling with persistence.
     */
    setupTheme() {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('i');
        const root = document.documentElement;

        const savedTheme = localStorage.getItem('app-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let currentTheme;
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            currentTheme = systemPrefersDark ? 'dark' : 'light';
        }

        root.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(icon, currentTheme);

        toggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', currentTheme);
            localStorage.setItem('app-theme', currentTheme);
            this.updateThemeIcon(icon, currentTheme);
        });
    },

    updateThemeIcon(iconElement, theme) {
        if (!iconElement) return;
        iconElement.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    },

    updateYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    },

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const shouldReduceMotion = document.body.getAttribute('data-a11y-motion') === 'reduce';

                if (shouldReduceMotion) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    return;
                }

                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    },

    setupAccessibility() {
        const trigger = document.getElementById('a11yTrigger');
        const menu = document.getElementById('a11yMenu');
        const close = document.getElementById('closeA11y');

        if (!trigger || !menu) return;

        const state = {
            textSize: 100,
            grayscale: false,
            highContrast: false,
            readableFont: false,
            links: false,
            motion: false
        };

        const toggleFeature = (btnId, stateKey, className, target = document.body) => {
            const btn = document.getElementById(btnId);
            if (!btn) return;

            btn.addEventListener('click', () => {
                state[stateKey] = !state[stateKey];

                if (state[stateKey]) target.classList.add(className);
                else target.classList.remove(className);

                btn.setAttribute('aria-pressed', state[stateKey]);

                if (stateKey === 'motion') {
                    if (state.motion) document.body.setAttribute('data-a11y-motion', 'reduce');
                    else document.body.removeAttribute('data-a11y-motion');
                }
                if (stateKey === 'highContrast') {
                    if (state.highContrast) document.body.setAttribute('data-a11y-contrast', 'high');
                    else document.body.removeAttribute('data-a11y-contrast');
                }
            });
        };

        toggleFeature('grayscaleToggle', 'grayscale', 'grayscale-mode', document.documentElement);
        toggleFeature('readableFontToggle', 'readableFont', 'readable-font-mode');
        toggleFeature('underlineLinksToggle', 'links', 'link-highlight-mode');
        toggleFeature('reduceMotionToggle', 'motion', 'reduce-motion');
        toggleFeature('highContrastToggle', 'highContrast', 'high-contrast');

        const updateTextSize = () => {
            document.documentElement.style.fontSize = `${state.textSize}%`;
            document.getElementById('textSizeDisplay').textContent = `${state.textSize}%`;
        };

        document.getElementById('increaseText')?.addEventListener('click', () => {
            if (state.textSize < 150) {
                state.textSize += 10;
                updateTextSize();
            }
        });

        document.getElementById('decreaseText')?.addEventListener('click', () => {
            if (state.textSize > 80) {
                state.textSize -= 10;
                updateTextSize();
            }
        });

        document.getElementById('resetA11y')?.addEventListener('click', () => {
            Object.keys(state).forEach(k => state[k] = (k === 'textSize' ? 100 : false));
            document.documentElement.classList.remove('grayscale-mode');
            document.body.classList.remove('readable-font-mode', 'link-highlight-mode');
            document.body.removeAttribute('data-a11y-contrast');
            document.body.removeAttribute('data-a11y-motion');
            menu.querySelectorAll('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', 'false'));
            updateTextSize();
        });

        const toggleMenu = (isOpen) => {
            if (isOpen) {
                menu.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                setTimeout(() => document.getElementById('closeA11y')?.focus(), 100);
            } else {
                menu.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            }
        };

        trigger.addEventListener('click', () => toggleMenu(!menu.classList.contains('active')));
        close?.addEventListener('click', () => toggleMenu(false));

        menu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggleMenu(false);
        });
    }
};

// Initialize app
App.init();
