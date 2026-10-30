const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // IntersectionObserver para active nav link
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Fallback: también activar al hacer click (suave)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // --- Theme Toggle ---
        const themeToggle = document.getElementById('themeToggle');
        const themeDropdown = document.getElementById('themeDropdown');
        const themeOptions = document.querySelectorAll('.theme-option');

        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Toggle dropdown
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('open');
        });

        // Cerrar dropdown al clickear afuera
        document.addEventListener('click', () => {
            themeDropdown.classList.remove('open');
        });

        // Evitar cerrar al clickear dentro del dropdown
        themeDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Cambiar tema
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                themeDropdown.classList.remove('open');
            });
        });