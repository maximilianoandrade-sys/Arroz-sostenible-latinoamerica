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

    // --- 3. Leaflet Map (Index) - Enhanced Version ---
    const mapElement = document.getElementById('coverage-map');
    if (mapElement && typeof L !== 'undefined') {
        // Init Map centered on South America
        const map = L.map('coverage-map').setView([-20.0, -60.0], 3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Custom icon for markers
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #004d40; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #0089d0; display: flex; align-items: center; justify-content: center;"><i class="fas fa-leaf" style="color: white; font-size: 14px;"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Detailed country data
        const countries = [
            {
                name: "Argentina",
                coords: [-34.6, -58.3],
                region: "Buenos Aires, Entre Ríos",
                productores: 120,
                hectareas: "15,000 ha",
                actividad: "Mapeo de actores y diagnóstico de género",
                contacto: "INTA Argentina"
            },
            {
                name: "Brasil",
                coords: [-15.7, -47.9],
                region: "Rio Grande do Sul, Santa Catarina",
                productores: 300,
                hectareas: "45,000 ha",
                actividad: "Implementación de MRV digital piloto",
                contacto: "EMBRAPA"
            },
            {
                name: "Chile",
                coords: [-33.4, -70.6],
                region: "Maule, Ñuble",
                productores: 80,
                hectareas: "8,500 ha",
                actividad: "Talleres de capacitación técnica",
                contacto: "IICA Chile - Hernán Chiriboga"
            },
            {
                name: "Ecuador",
                coords: [-0.18, -78.4],
                region: "Guayas, Los Ríos",
                productores: 150,
                hectareas: "22,000 ha",
                actividad: "Estudio de mercados de carbono",
                contacto: "INIAP Ecuador"
            },
            {
                name: "Uruguay",
                coords: [-34.9, -56.1],
                region: "Treinta y Tres, Rocha",
                productores: 90,
                hectareas: "12,000 ha",
                actividad: "Evaluación de capacidades digitales",
                contacto: "INIA Uruguay"
            }
        ];

        countries.forEach(country => {
            const popupContent = `
                <div style="font-family: 'Roboto', sans-serif; min-width: 250px;">
                    <h3 style="color: #004d40; margin: 0 0 10px 0; font-size: 18px; border-bottom: 2px solid #0089d0; padding-bottom: 5px;">
                        <i class="fas fa-map-marker-alt"></i> ${country.name}
                    </h3>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>📍 Región:</strong> ${country.region}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>👥 Productores:</strong> ${country.productores}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>🌾 Hectáreas:</strong> ${country.hectareas}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>🎯 Actividad Actual:</strong> ${country.actividad}</p>
                    <p style="margin: 5px 0; font-size: 13px; color: #0089d0;"><strong>📞 Contacto:</strong> ${country.contacto}</p>
                </div>
            `;

            L.marker(country.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent, { maxWidth: 300 });
        });

        // Add a legend
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'map-legend');
            div.innerHTML = `
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-family: 'Roboto', sans-serif;">
                    <h4 style="margin: 0 0 10px 0; color: #004d40; font-size: 14px;">
                        <i class="fas fa-info-circle"></i> Leyenda
                    </h4>
                    <p style="margin: 5px 0; font-size: 12px;">
                        <span style="display: inline-block; width: 15px; height: 15px; background: #004d40; border-radius: 50%; margin-right: 5px;"></span>
                        País Participante
                    </p>
                    <p style="margin: 5px 0; font-size: 11px; color: #666;">
                        Haz clic en los marcadores para ver detalles
                    </p>
                </div>
            `;
            return div;
        };
        legend.addTo(map);
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
