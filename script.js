document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar & Mobile Menu ---
    const navbar = document.getElementById('main-nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Animations (Counters) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger animation when stats section is in view
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(statsSection); // Run once
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // --- 3. Leaflet Map (Index) - Simple Stable Version ---
    const mapElement = document.getElementById('coverage-map');
    if (mapElement && typeof L !== 'undefined') {
        const map = L.map('coverage-map').setView([-20.0, -60.0], 3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const countries = [
            { name: "Argentina", coords: [-34.6, -58.3] },
            { name: "Brasil", coords: [-15.7, -47.9] },
            { name: "Chile", coords: [-33.4, -70.6] },
            { name: "Ecuador", coords: [-0.18, -78.4] },
            { name: "Uruguay", coords: [-34.9, -56.1] }
        ];

        countries.forEach(country => {
            L.marker(country.coords)
                .addTo(map)
                .bindPopup(`<b>${country.name}</b><br>Proyecto Activo`);
        });
    }

    // --- 4. Chart.js Charts (Dashboard) ---
    const budgetCtx = document.getElementById('budgetChart');
    if (budgetCtx) {
        new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Implementación', 'Capacitación', 'Gestión', 'Imprevistos'],
                datasets: [{
                    data: [500000, 250000, 150000, 50000],
                    backgroundColor: ['#004d40', '#0089d0', '#ffb74d', '#e0e0e0']
                }]
            },
            options: { responsive: true }
        });
    }

    const emissionsCtx = document.getElementById('emissionsChart');
    if (emissionsCtx) {
        new Chart(emissionsCtx, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'Toneladas CO2eq Reducidas',
                    data: [0, 1500, 4500, 8000],
                    borderColor: '#004d40',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(0, 77, 64, 0.1)'
                }]
            },
            options: { responsive: true }
        });
    }

    const adoptionCtx = document.getElementById('adoptionChart');
    if (adoptionCtx) {
        new Chart(adoptionCtx, {
            type: 'bar',
            data: {
                labels: ['Argentina', 'Brasil', 'Chile', 'Ecuador', 'Uruguay'],
                datasets: [{
                    label: 'Productores Capacitados',
                    data: [120, 300, 80, 150, 90],
                    backgroundColor: '#0089d0'
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
    }
});
