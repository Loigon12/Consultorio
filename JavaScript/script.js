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
        async function handleBookingClick() {
    // 1. Verificamos si hay un usuario activo en la sesión de Supabase
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (user) {
        // 2. Si el usuario existe, lo mandamos a la interfaz de agendamiento
        window.location.href = "agendar.html";
    } else {
        // 3. Si no hay sesión, lanzamos la alerta y abrimos el modal de autenticación
        alert("Necesita registrarse o iniciar sesión para agendar una cita.");
        toggleModal('modal-auth');
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

      
/**
 * CONFIGURACIÓN DE SUPABASE
 */
const SUPABASE_URL = 'https://dademmbghkpndygsmwcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZGVtbWJnaGtwbmR5Z3Ntd2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzgxNTIsImV4cCI6MjA5MjExNDE1Mn0.AAdZaCJ3hmgHIchQASqNrNd1HdOqYiimFmjMUb3-kVg';

// Usamos 'supabaseClient' para evitar conflictos con la librería global
let supabaseClient;

try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (error) {
    console.error("DETALLE DEL ERROR:", error); // específicamente para errores de inicialización
    alert("Error: " + (error.message || "Error desconocido"));
}

/**
 * MANEJO DE LA INTERFAZ (MODALES Y VISTAS)
 */
function toggleModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

function switchView(view) {
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    
    if (view === 'register') {
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
    } else {
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
    }
}

/**
 * LÓGICA DE REGISTRO DE USUARIOS
 */
async function executeRegister() {
    // Obtenemos los valores de los inputs
    const nombre = document.getElementById('r-name').value.trim();
    const documento = document.getElementById('r-doc').value.trim();
    const telefono = document.getElementById('r-phone').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const password = document.getElementById('r-pass').value.trim();

    // Validación básica
    if (!email || !password || !nombre || !documento) {
        alert("Por favor, completa los campos obligatorios (Nombre, Documento, Correo y Contraseña).");
        return;
    }

    try {
        // 1. Crear el usuario en el sistema de autenticación de Supabase
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
            // 2. Guardar los datos adicionales en la tabla 'perfiles'
            const { error: profileError } = await supabaseClient
                .from('perfiles')
                .insert([
                    { 
                        id: authData.user.id, 
                        nombre_completo: nombre, 
                        documento: documento, 
                        telefono: telefono,
                        correo: email 
                    }
                ]);

            if (profileError) throw profileError;

            alert("¡Registro exitoso! Ya puedes iniciar sesión.");
            switchView('login'); // Redirigir al login dentro del modal
        }
    } catch (error) {
        console.error("Error en registro:", error);
        alert("No se pudo completar el registro: " + error.message);
    }
}

/**
 * LÓGICA DE INICIO DE SESIÓN
 */
async function executeLogin() {
    const email = document.getElementById('l-email').value.trim();
    const password = document.getElementById('l-pass').value.trim();

    if (!email || !password) {
        alert("Ingresa correo y contraseña.");
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        alert("Ingreso exitoso.");
        toggleModal('modal-auth');
        checkUser(); // Actualizar la interfaz inmediatamente
    } catch (error) {
        console.error("Error en login:", error);
        alert("Error de acceso: " + error.message);
    }
}

/**
 * GESTIÓN DE SESIÓN Y ESTADO DE LA UI
 */
async function checkUser() {
    if (!supabaseClient) return;

    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        const authDisplay = document.getElementById('auth-display');

        if (user && authDisplay) {
            // 1. Buscamos el nombre en la tabla 'perfiles' usando el ID del usuario
            const { data: perfil, error } = await supabaseClient
                .from('perfiles')
                .select('nombre_completo')
                .eq('id', user.id)
                .single();

            // 2. Si hay error o no hay perfil, usamos el email como respaldo
            let nombreMostrar = user.email.split('@')[0];
            
            if (perfil && perfil.nombre_completo) {
                // Tomamos solo el primer nombre para que se vea más limpio
                nombreMostrar = perfil.nombre_completo.split(' ')[0];
            }

            // 3. Actualizamos la interfaz
            authDisplay.innerHTML = `
                <div class="flex items-center gap-6">
                    <span class="text-[12px] text-gold  font-medium">Hola, ${nombreMostrar.toUpperCase()}</span>
                    <button onclick="logout()" class="nav-link text-[12px] opacity-60 hover:opacity-100">CERRAR SESIÓN</button>
                </div>
            `;
        }
    } catch (error) {
        console.log("No hay sesión activa o hubo un error al obtener el perfil.");
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    location.reload(); // Recargar para limpiar el estado de la web
}

/**
 * CONTROL DE AGENDAMIENTO
 */
async function handleBookingClick() {
    const loadingOverlay = document.getElementById('loading-overlay');

    try {
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (user) {
            // 1. Mostramos la interfaz de carga
            loadingOverlay.classList.remove('hidden');
            loadingOverlay.classList.add('flex');

            // 2. Pequeña pausa estética antes de redirigir
            setTimeout(() => {
                window.location.href = "agendar.html";
            }, 800);
            
        } else {
            alert("Para agendar una cita, primero debes iniciar sesión.");
            toggleModal('modal-auth');
        }
    } catch (error) {
        console.error("Error al verificar sesión:", error);
    }
}

/**
 * INICIALIZACIÓN AL CARGAR LA PÁGINA
 */
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay una sesión activa al abrir la web
    checkUser();

    // Inicializar iconos de Lucide (X del modal, etc)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});