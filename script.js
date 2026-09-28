/**
 * NAVEEN S - Developer Portfolio & Interactive Resume Scripts
 * Includes Particle System, Typing Animation, Modal Viewer, Filters & Clipboard Tools
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Particle Canvas
    initParticleCanvas();

    // 2. Initialize Typewriter Effect for Hero
    initTypewriter();

    // 3. Project Filter System
    initProjectFilters();

    // 4. Mobile Navigation Toggle
    initMobileNav();

    // 5. Modal Handling System
    initModals();

    // 6. Navbar Scroll Blur Effect
    initScrollNavbar();
});

/* ==========================================================================
   1. Interactive Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width * 0.05), 65);
    const colors = ['rgba(245, 158, 11, 0.4)', 'rgba(6, 182, 212, 0.35)', 'rgba(251, 191, 36, 0.3)'];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.8,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(245, 158, 11, ${0.12 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw and update particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const targetElement = document.getElementById('typed-role');
    if (!targetElement) return;

    const words = [
        'Generative AI Specialist',
        'Full-Stack Web Developer',
        'B.Tech IT Student',
        'LeetCode Problem Solver',
        'LLM & Prompt Engineer'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            targetElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            targetElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1600; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   3. Project Filter System
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/* ==========================================================================
   5. Modals (Projects, Certifications, and Resume)
   ========================================================================== */
const projectDetails = {
    'genai-bot': {
        title: 'AI Multi-Modal Assistant & Research Bot',
        tag: 'Generative AI & LLMs',
        desc: 'A comprehensive generative AI assistant engineered to empower users with real-time knowledge retrieval, automated document intelligence, and multi-turn conversational agents.',
        features: [
            'Integrates Large Language Models with context-aware system prompts for high precision responses.',
            'Prompt Engineering pipeline with token caching and fallback handlers.',
            'Document analysis feature allowing users to ask questions against loaded text datasets.',
            'Designed with a clean, responsive glassmorphism chat interface.'
        ],
        techStack: ['Google Gemini API / OpenAI', 'JavaScript (ES6+)', 'Node.js Backend', 'HTML5 / CSS3', 'Prompt Architecture']
    },
    'fullstack-portal': {
        title: 'Modern Full-Stack Interactive Portal',
        tag: 'Full-Stack Web Development',
        desc: 'An enterprise-grade web application built to showcase modern component-based architecture, dynamic state management, and real-time REST API integration.',
        features: [
            'Responsive component architecture with high accessibility standards.',
            'Seamless client-side routing, theme switching, and live data rendering.',
            'REST API client with error boundaries and data validation.',
            'Optimized CSS styling with micro-interactions and smooth layout transitions.'
        ],
        techStack: ['HTML5', 'Modern CSS3', 'JavaScript', 'React.js Components', 'Node.js / Express', 'REST APIs']
    },
    'dsa-tracker': {
        title: 'Algorithmic Problem Solving Tracker',
        tag: 'DSA & LeetCode Practices',
        desc: 'A dedicated dashboard engineered to track, analyze, and visualize DSA challenges solved on LeetCode with complexity metrics.',
        features: [
            'Visual progress tracker across Arrays, Strings, HashMaps, Two-Pointers, and Recursion.',
            'Time & Space complexity benchmarks categorized by Easy, Medium, and Hard.',
            'Direct links to LeetCode profile (naveen1928) with live practice progress.'
        ],
        techStack: ['Python', 'C++', 'Data Structures & Algorithms', 'LeetCode', 'JavaScript']
    },
    'prompt-studio': {
        title: 'Smart Prompt Engineering Studio',
        tag: 'Generative AI Tools',
        desc: 'A specialized developer workstation for drafting, testing, and fine-tuning prompt chains with dynamic variables and output formatters.',
        features: [
            'Interactive prompt templating sandbox with real-time parameter tweaking (temperature, top-p).',
            'Automated response evaluation and JSON-schema verification.',
            'Export prompt blueprints directly into application code.'
        ],
        techStack: ['Generative AI', 'Prompt Engineering', 'JavaScript', 'CSS3 Glassmorphism']
    }
};

const certDetails = {
    'genai': {
        title: 'Generative AI Course & Specialization',
        issuer: 'Advanced AI Curriculum',
        status: 'Completed & Certified',
        overview: 'Specialized deep-dive into the architectural mechanics, prompt paradigms, and practical application development using modern generative AI and Large Language Models.',
        learnings: [
            'Fundamentals of Large Language Models (LLMs) and Transformer Architectures.',
            'Advanced Prompt Engineering: Zero-shot, Few-shot, Chain-of-Thought (CoT), and ReAct patterns.',
            'API Integration using OpenAI and Google Gemini APIs.',
            'Retrieval-Augmented Generation (RAG) principles and vector embeddings.',
            'AI Safety, hallucination mitigation, and structured JSON output design.'
        ]
    },
    'webdev': {
        title: 'Full-Stack Web Development Mastery',
        issuer: 'Modern Web Engineering Program',
        status: 'Completed & Certified',
        overview: 'Comprehensive hands-on training focusing on end-to-end full-stack web software development, responsive web design systems, and scalable JavaScript architectures.',
        learnings: [
            'Modern Semantic HTML5 and accessible layout design.',
            'CSS3 advanced styling: Flexbox, CSS Grid, Glassmorphism, animations, and custom CSS design systems.',
            'Modern JavaScript (ES6+): Asynchronous programming, closures, fetch API, and DOM manipulation.',
            'Component-based development with React.js.',
            'Backend server construction with Node.js and Express RESTful APIs.'
        ]
    },
    'academic': {
        title: 'Bachelor of Technology - Information Technology',
        issuer: 'SNS College of Technology (CBE - 35)',
        status: 'Currently Pursuing B.Tech IT',
        overview: 'Undergraduate engineering program accredited with excellence, emphasizing core computer science theory, systems architecture, and engineering principles.',
        learnings: [
            'Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, Sorting & Searching).',
            'Object-Oriented Programming (OOPs) in Python & C/C++.',
            'Database Management Systems (DBMS) & SQL queries.',
            'Computer Networks, Operating Systems, and Software Engineering methodologies.'
        ]
    }
};

function initModals() {
    const detailsModal = document.getElementById('details-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-content-body');

    const resumeModal = document.getElementById('resume-modal');
    const resumeModalCloseBtn = document.getElementById('resume-modal-close-btn');
    const navResumeBtn = document.getElementById('open-resume-modal-btn');
    const heroResumeTrigger = document.getElementById('hero-resume-trigger');
    const expandResumeBtn = document.getElementById('expand-resume-modal-btn');
    const modalResumeBody = document.getElementById('modal-resume-body');

    // Close details modal
    if (modalCloseBtn && detailsModal) {
        modalCloseBtn.addEventListener('click', () => {
            detailsModal.classList.remove('active');
        });

        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) {
                detailsModal.classList.remove('active');
            }
        });
    }

    // Resume Modal Triggers
    function openResumeModal() {
        const resumeDoc = document.getElementById('resume-document');
        if (resumeDoc && modalResumeBody && resumeModal) {
            modalResumeBody.innerHTML = resumeDoc.outerHTML;
            resumeModal.classList.add('active');
        }
    }

    if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
    if (heroResumeTrigger) heroResumeTrigger.addEventListener('click', openResumeModal);
    if (expandResumeBtn) expandResumeBtn.addEventListener('click', openResumeModal);

    if (resumeModalCloseBtn && resumeModal) {
        resumeModalCloseBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
        });

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
            }
        });
    }

    // Esc key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (detailsModal) detailsModal.classList.remove('active');
            if (resumeModal) resumeModal.classList.remove('active');
        }
    });
}

// Global function to open project modal
window.openProjectModal = function(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-content-body');

    modalBody.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--gold-light); background: rgba(245,158,11,0.15); padding: 0.2rem 0.6rem; border-radius: 4px;">
                ${data.tag}
            </span>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #fff;">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${data.desc}</p>
        
        <h4 style="font-size: 1rem; color: var(--gold-light); margin-bottom: 0.75rem;"><i class="fa-solid fa-list-check"></i> Key Features & Capabilities</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${data.features.map(f => `<li style="display: flex; gap: 0.6rem; font-size: 0.9rem; color: #cbd5e1;"><i class="fa-solid fa-circle-check" style="color: var(--gold-primary); margin-top: 0.2rem;"></i> <span>${f}</span></li>`).join('')}
        </ul>

        <h4 style="font-size: 1rem; color: var(--gold-light); margin-bottom: 0.75rem;"><i class="fa-solid fa-layer-group"></i> Technologies & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${data.techStack.map(t => `<span style="font-size: 0.8rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 0.3rem 0.75rem; border-radius: 6px; color: #f8fafc;">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem;">
            <a href="https://github.com/naveen---s" target="_blank" class="btn btn-primary" style="flex: 1;">
                <i class="fa-brands fa-github"></i> View GitHub Repository
            </a>
            <button onclick="document.getElementById('details-modal').classList.remove('active')" class="btn btn-secondary">
                Close
            </button>
        </div>
    `;

    modal.classList.add('active');
};

// Global function to open certification modal
window.openCertModal = function(certId) {
    const data = certDetails[certId];
    if (!data) return;

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-content-body');

    modalBody.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem;">
            <span style="font-size: 0.82rem; font-weight: 700; color: #34d399; background: rgba(16,185,129,0.15); padding: 0.25rem 0.75rem; border-radius: 999px;">
                <i class="fa-solid fa-circle-check"></i> ${data.status}
            </span>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 0.4rem; color: #fff;">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--gold-primary); font-weight: 600; margin-bottom: 1.25rem;"><i class="fa-solid fa-building-columns"></i> ${data.issuer}</p>
        
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${data.overview}</p>
        
        <h4 style="font-size: 1rem; color: var(--gold-light); margin-bottom: 0.75rem;"><i class="fa-solid fa-book-open"></i> Curriculum & Concepts Mastered</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem;">
            ${data.learnings.map(l => `<li style="display: flex; gap: 0.6rem; font-size: 0.9rem; color: #cbd5e1;"><i class="fa-solid fa-check" style="color: var(--gold-primary); margin-top: 0.2rem;"></i> <span>${l}</span></li>`).join('')}
        </ul>

        <div style="display: flex; gap: 1rem;">
            <a href="#contact" onclick="document.getElementById('details-modal').classList.remove('active')" class="btn btn-primary" style="flex: 1;">
                <i class="fa-solid fa-paper-plane"></i> Inquire About Credentials
            </a>
            <button onclick="document.getElementById('details-modal').classList.remove('active')" class="btn btn-secondary">
                Close
            </button>
        </div>
    `;

    modal.classList.add('active');
};

/* ==========================================================================
   6. Copy to Clipboard Tool & Toast
   ========================================================================== */
window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`);
    }).catch(() => {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`${label} copied!`);
    });
};

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================================================
   7. Contact Form Handler
   ========================================================================== */
window.handleFormSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link for direct sending
    const mailtoUrl = `mailto:naveensuresh1207@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast('Opening your email client to send message...');
    setTimeout(() => {
        window.location.href = mailtoUrl;
    }, 800);

    // Reset form
    document.getElementById('contact-form').reset();
};

/* ==========================================================================
   8. Navbar Blur on Scroll
   ========================================================================== */
function initScrollNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(9, 13, 22, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(9, 13, 22, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}
