// Inicialización de librerías y plugins
        lucide.createIcons();
        gsap.registerPlugin(ScrollTrigger);

        // UI Logic
        const nav = document.getElementById('main-nav');

        // Cambia el estilo del menú al hacer scroll para mejorar la legibilidad y la experiencia de usuario
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('bg-white/80', 'backdrop-blur-md', 'py-5', 'shadow-sm');
                nav.classList.remove('py-8');
            } else {
                nav.classList.remove('bg-white/80', 'backdrop-blur-md', 'py-5', 'shadow-sm');
                nav.classList.add('py-8');
            }
        });

        // Función para mostrar u ocultar el modal de autenticación
        function toggleModal(id) {
            const m = document.getElementById(id);
            m.classList.toggle('hidden');
        }

        // Función para manejar el clic en "Agendar Cita", verifica si el usuario está autenticado antes de permitir el acceso al sistema de agenda
        function handleBookingClick() {
            const user = JSON.parse(localStorage.getItem('clinic_session'));
            if (!user) {
                alert("Por favor, acceda a su cuenta para gestionar citas premium.");
                toggleModal('modal-auth');
            } else {
                alert("Redirigiendo al sistema de agenda...");
            }
        }

        // Función de registro de usuario (Mock)
        function executeRegister() {
            // Mock Register
            const email = document.getElementById('r-email').value;
            const password = document.getElementById('r-pass').value;
            if(email && password) {
                localStorage.setItem('clinic_session', JSON.stringify({ name: "Paciente", email }));
                toggleModal('modal-auth');
            }
        }

        // Función de inicio de sesión (Mock)

        function executeLogin() {
            // Mock Login
            const email = document.getElementById('l-email').value;
            if(email) {
                localStorage.setItem('clinic_session', JSON.stringify({ name: "Paciente", email }));
                location.reload();
            }
        }

        // Animaciones
        gsap.from(".reveal", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out" });

        // Función para intercambiar vistas dentro del modal (Intercalar entre el inicio de sesión y el registro)
    function switchView(view) {
        const login = document.getElementById('login-view');
        const register = document.getElementById('register-view');
        
        if (view === 'register') {
            login.classList.add('hidden');
            register.classList.remove('hidden');
        } else {
            login.classList.remove('hidden');
            register.classList.add('hidden');
        }
    }


    /////////////////////////////////////////
    //
    // Animaciones dentro de la sección de tratamientos/servicios para mejorar la experiencia visual al hacer scroll
    //  
    ////////////////////////////////////////

    
     // Animación de entrada para los textos al hacer scroll (utilizando ScrollTrigger para activar la animación cuando el elemento entra en el viewport)
        gsap.utils.toArray('.reveal-text').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });
        });

        // Animación suave de aparición para las imágenes
        gsap.utils.toArray('img').forEach(img => {
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                },
                opacity: 0,
                scale: 1.1,
                duration: 2,
                ease: "power2.out"
            });
        });