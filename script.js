/**
 * Lotta Nevala Portfolio - JavaScript
 * Features: i18n translations, navigation, animations, smooth scroll
 */

// ============================================
// Translations (i18n)
// ============================================
const translations = {
    en: {
        // Navigation
        nav: {
            work: "Work",
            about: "About",
            contact: "Contact"
        },
        // Hero
        hero: {
            greeting: "Hello, I'm",
            subtitle: "UX/UI Designer",
            tagline: "Crafting thoughtful digital experiences through user-centered design",
            cta: "View my work",
            cta2: "Get in touch",
            scroll: "Scroll to explore"
        },
        // Work Section
        work: {
            label: "Portfolio",
            title: "Selected Projects",
            desc: "A collection of projects where research meets design to create meaningful user experiences.",
            viewProject: "View case study"
        },
        // Projects
        projects: {
            p1: {
                category: "Mobile App Design",
                title: "Healthcare Companion App",
                desc: "Redesigning the patient experience for a digital health platform."
            },
            p2: {
                category: "Web Design",
                title: "E-commerce Redesign",
                desc: "Improving conversion rates through user research and iterative design."
            },
            p3: {
                category: "UX Research",
                title: "Banking Dashboard",
                desc: "User research and interface design for a fintech startup."
            }
        },
        // About Section
        about: {
            label: "About me",
            title: "Designer with a passion for solving problems",
            bio1: "I'm a UX/UI designer based in Finland with a background in visual arts and a deep interest in human-centered design. I believe great design comes from understanding people and their needs.",
            bio2: "When I'm not designing, you can find me exploring illustration, character design, or discovering new creative inspiration. I bring this artistic perspective to every digital experience I create.",
            skillsTitle: "Tools & Skills",
            photoPlaceholder: "Photo"
        },
        // Contact Section
        contact: {
            label: "Contact",
            title: "Let's work together",
            desc: "Have a project in mind? I'd love to hear about it. Let's create something amazing together.",
            emailLabel: "Say hello"
        },
        // Footer
        footer: {
            rights: "All rights reserved.",
            credit: "Designed with care in Finland"
        }
    },
    fi: {
        // Navigation
        nav: {
            work: "Projektit",
            about: "Minusta",
            contact: "Yhteystiedot"
        },
        // Hero
        hero: {
            greeting: "Hei, olen",
            subtitle: "UI/UX Suunnittelija",
            tagline: "Luon harkittuja digitaalisia kokemuksia käyttäjäkeskeisen suunnittelun avulla",
            cta: "Katso projektit",
            cta2: "Ota yhteyttä",
            scroll: "Vieritä alas"
        },
        // Work Section
        work: {
            label: "Portfolio",
            title: "Valitut Projektit",
            desc: "Kokoelma projekteja, joissa tutkimus kohtaa suunnittelun merkityksellisten käyttäjäkokemusten luomiseksi.",
            viewProject: "Katso tapaustutkimus"
        },
        // Projects
        projects: {
            p1: {
                category: "Mobiilisovellus",
                title: "Terveydenhuollon Sovellus",
                desc: "Potilaskokemuksen uudelleensuunnittelu digitaaliselle terveysalustalle."
            },
            p2: {
                category: "Verkkosuunnittelu",
                title: "Verkkokaupan Uudistus",
                desc: "Konversioasteen parantaminen käyttäjätutkimuksen ja iteratiivisen suunnittelun avulla."
            },
            p3: {
                category: "UX-tutkimus",
                title: "Pankin Hallintapaneeli",
                desc: "Käyttäjätutkimus ja käyttöliittymäsuunnittelu fintech-startupille."
            }
        },
        // About Section
        about: {
            label: "Minusta",
            title: "Suunnittelija, joka rakastaa ongelmanratkaisua",
            bio1: "Olen UI/UX-suunnittelija Suomesta. Taustani on kuvataiteen parissa ja olen syvästi kiinnostunut ihmiskeskeisestä suunnittelusta. Uskon, että hyvä suunnittelu syntyy ihmisten ja heidän tarpeidensa ymmärtämisestä.",
            bio2: "Kun en suunnittele, voit löytää minut tutkimassa kuvitusta, hahmosuunnittelua tai etsimässä uutta luovaa inspiraatiota. Tuon tämän taiteellisen näkökulman jokaiseen luomaani digitaaliseen kokemukseen.",
            skillsTitle: "Työkalut & Taidot",
            photoPlaceholder: "Kuva"
        },
        // Contact Section
        contact: {
            label: "Yhteystiedot",
            title: "Tehdään yhteistyötä",
            desc: "Onko sinulla projekti mielessä? Kuulisin siitä mielelläni. Luodaan jotain upeaa yhdessä.",
            emailLabel: "Sano hei"
        },
        // Footer
        footer: {
            rights: "Kaikki oikeudet pidätetään.",
            credit: "Suunniteltu rakkaudella Suomessa"
        }
    }
};

// ============================================
// State
// ============================================
let currentLang = localStorage.getItem('portfolio-lang') || 'en';

// ============================================
// DOM Elements
// ============================================
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const langButtons = document.querySelectorAll('.nav__lang-btn');

// ============================================
// i18n Functions
// ============================================
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);

        if (translation) {
            element.textContent = translation;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update active state on language buttons
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem('portfolio-lang', lang);
    currentLang = lang;
}

function initLanguageSwitcher() {
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                updateTranslations(lang);
            }
        });
    });

    // Apply saved language on load
    updateTranslations(currentLang);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded',
                navToggle.classList.contains('active'));

            // Prevent body scroll when menu is open
            document.body.style.overflow =
                navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Active Navigation Link
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavLink();
});
