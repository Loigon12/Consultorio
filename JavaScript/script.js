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

// Animaciones iniciales
gsap.from(".reveal", { y: 50, opacity: 0, duration: 1.2, ease: "power4.out" });

// Animación de entrada para los textos al hacer scroll
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

let supabaseClient;

try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (error) {
    console.error("DETALLE DEL ERROR:", error);
    alert("Error: " + (error.message || "Error desconocido"));
}


/**
 * GESTIÓN DE MODALES Y VISTAS
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
    const nombre = document.getElementById('r-name').value.trim();
    const documento = document.getElementById('r-doc').value.trim();
    const telefono = document.getElementById('r-phone').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const password = document.getElementById('r-pass').value.trim();

    if (!email || !password || !nombre || !documento) {
        alert("Por favor, completa los campos obligatorios (Nombre, Documento, Correo y Contraseña).");
        return;
    }

    try {
        // 1. Crear el usuario en Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
            // 2. SOLUCIÓN: Usamos .upsert() para fusionar los datos con el trigger sin duplicar llaves
            const { error: profileError } = await supabaseClient
                .from('perfiles')
                .upsert([
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
            switchView('login'); 
        }
    } catch (error) {
        console.error("Error en registro:", error);
        alert("No se pudo completar el registro: " + error.message);
    }
}


/**
 * LÓGICA DE INICIO DE SESIÓN CENTRALIZADO
 */
async function executeLogin() {
    // Nota: l-email ahora puede recibir tanto correos como el texto "admin"
    const identificador = document.getElementById('l-email').value.trim();
    const password = document.getElementById('l-pass').value.trim();

    if (!identificador || !password) {
        alert("Ingresa tu usuario/correo y contraseña.");
        return;
    }

    try {
        // 1. PRIMERA VALIDACIÓN: Verificar si es el Administrador
        const { data: adminCheck, error: adminError } = await supabaseClient
            .from('administradores')
            .select('*')
            .eq('usuario', identificador)
            .eq('password', password)
            .maybeSingle();

        if (adminCheck) {
            // Es un administrador válido
            alert("Acceso de Administrador detectado. Redirigiendo al panel...");
            localStorage.setItem('isAdmin', 'true'); // Guardar sesión local
            window.location.href = "admin.html";
            return; // Detenemos la ejecución aquí
        }

        // 2. SEGUNDA VALIDACIÓN: Intentar inicio de sesión normal en Auth para pacientes
        const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
            email: identificador,
            password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
            alert("Ingreso exitoso.");
            toggleModal('modal-auth');
            checkUser(); 
        }
    } catch (error) {
        console.error("Error en login:", error);
        alert("Credenciales incorrectas o usuario no encontrado.");
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
            const { data: perfil, error } = await supabaseClient
                .from('perfiles')
                .select('nombre_completo')
                .eq('id', user.id)
                .single();

            let nombreMostrar = user.email.split('@')[0];
            
            if (perfil && perfil.nombre_completo) {
                nombreMostrar = perfil.nombre_completo.split(' ')[0];
            }

            authDisplay.innerHTML = `
                <div class="flex items-center gap-4">
            <span class="text-[12px] text-gold font-medium">Hola, ${nombreMostrar.toUpperCase()}</span>
            <a href="citas.html" class="nav-link w-full text-center md:w-auto">MIS RESERVAS</a>
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
    location.reload(); 
}


/**
 * CONTROL DE AGENDAMIENTO
 */
async function handleBookingClick() {
    const loadingOverlay = document.getElementById('loading-overlay');

    try {
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (user) {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('hidden');
                loadingOverlay.classList.add('flex');
            }

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
    checkUser();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});