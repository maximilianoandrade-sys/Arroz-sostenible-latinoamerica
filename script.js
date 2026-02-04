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
    const locationList = document.getElementById('location-list');

    if (mapElement && typeof L !== 'undefined') {
        // Init Map with Premium Tiles (CartoDB Voyager)
        const map = L.map('coverage-map', {
            scrollWheelZoom: false // Better UX for scrolling page
        }).setView([-20.0, -60.0], 3);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Move zoom control
        map.zoomControl.setPosition('topright');

        // Custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #004d40; width: 35px; height: 35px; border-radius: 50%; border: 3px solid #0089d0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"><i class="fas fa-leaf" style="color: white; font-size: 16px;"></i></div>',
            iconSize: [35, 35],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20]
        });

        // Detailed country data
        const countries = [
            {
                id: 'arg',
                name: "Argentina",
                coords: [-34.6, -58.3],
                region: "Buenos Aires, Entre Ríos",
                productores: 120,
                hectareas: "15,000 ha",
                actividad: "Diagnóstico de actores",
                contacto: "INTA Argentina"
            },
            {
                id: 'bra',
                name: "Brasil",
                coords: [-15.7, -47.9],
                region: "Rio Grande do Sul",
                productores: 300,
                hectareas: "45,000 ha",
                actividad: "Piloto MRV Digital",
                contacto: "EMBRAPA"
            },
            {
                id: 'chl',
                name: "Chile",
                coords: [-33.4, -70.6],
                region: "Maule, Ñuble",
                productores: 80,
                hectareas: "8,500 ha",
                actividad: "Capacitación Técnica",
                contacto: "IICA Chile"
            },
            {
                id: 'ecu',
                name: "Ecuador",
                coords: [-0.18, -78.4],
                region: "Guayas, Los Ríos",
                productores: 150,
                hectareas: "22,000 ha",
                actividad: "Mercados Carbono",
                contacto: "INIAP"
            },
            {
                id: 'ury',
                name: "Uruguay",
                coords: [-34.9, -56.1],
                region: "Treinta y Tres",
                productores: 90,
                hectareas: "12,000 ha",
                actividad: "Evaluación Digital",
                contacto: "INIA"
            }
        ];

        const markers = {};

        countries.forEach(country => {
            // 1. Create Popup Content (Premium Styling)
            const popupContent = `
                <div class="popup-header">
                    <h3>${country.name}</h3>
                </div>
                <div class="popup-body">
                    <div class="popup-stat">
                        <span>Región:</span>
                        <strong>${country.region}</strong>
                    </div>
                    <div class="popup-stat">
                        <span>Productores:</span>
                        <strong>${country.productores}</strong>
                    </div>
                    <div class="popup-stat">
                        <span>Cobertura:</span>
                        <strong>${country.hectareas}</strong>
                    </div>
                    <div class="popup-stat" style="border:none;">
                        <span>Fase:</span>
                        <strong>${country.actividad}</strong>
                    </div>
                    <a href="#" class="popup-link">Ver Ficha Completa <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            // 2. Add Marker to Map
            const marker = L.marker(country.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent);

            markers[country.id] = marker;

            // 3. Add Item to Sidebar List
            if (locationList) {
                const item = document.createElement('div');
                item.className = 'location-item';
                item.setAttribute('data-id', country.id);
                item.innerHTML = `
                    <h4>${country.name}</h4>
                    <p><i class="fas fa-map-pin" style="color:var(--accent); margin-right:5px;"></i> ${country.region}</p>
                `;

                // Interaction: Sidebar Click -> Map FlyTo
                item.addEventListener('click', () => {
                    // Reset active states
                    document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');

                    // Fly to location and open popup
                    map.flyTo(country.coords, 6, {
                        duration: 1.5,
                        easeLinearity: 0.25
                    });

                    setTimeout(() => {
                        marker.openPopup();
                    }, 1500);
                });

                locationList.appendChild(item);
            }
        });

        // Fit bounds to show all markers initially
        /* 
        const group = new L.featureGroup(Object.values(markers));
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
        */
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
    // --- 5. Newsletter Subscription with Supabase ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const button = newsletterForm.querySelector('button');
            const originalBtnContent = button.innerHTML;

            if (!emailInput || !emailInput.value) return;
            const email = emailInput.value;

            // Simple validation
            if (!email.includes('@')) {
                alert('Por favor ingresa un correo válido.');
                return;
            }

            // Check if Supabase client is ready
            if (!supabaseClient) {
                alert('El servicio de suscripción no está configurado (Faltan credenciales de Supabase).');
                console.error('Supabase keys missing in supabase-client.js');
                return;
            }

            try {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                // Insert into 'subscribers' table
                const { data, error } = await supabaseClient
                    .from('subscribers')
                    .insert([{ email: email, created_at: new Date() }]);

                if (error) {
                    throw error;
                }

                alert('¡Gracias por suscribirte!');
                newsletterForm.reset();
            } catch (err) {
                console.error('Error subscription:', err);
                if (err.message.includes('unique constraint') || err.code === '23505') {
                    alert('Este correo ya está registrado.');
                } else {
                    alert('Hubo un error al suscribirte. Intenta nuevamente.');
                }
            } finally {
                button.disabled = false;
                button.innerHTML = originalBtnContent;
            }
        });
    }
});
