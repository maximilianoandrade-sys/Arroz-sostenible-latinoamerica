// --- Configuración de Supabase ---
// IMPORTANTE: Debes crear un proyecto en https://supabase.com/dashboard/projects
// y reemplazar estos valores con los tuyos (Settings -> API).

const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI'; // Ej: https://xyz.supabase.co
const SUPABASE_KEY = 'TU_SUPABASE_ANON_KEY_AQUI'; // Ej: eyJhbGciOiJl...

// Inicialización del cliente
let supabaseClient;

if (typeof supabase !== 'undefined') {
    if (SUPABASE_URL.includes('TU_SUPABASE_URL')) {
        console.warn('⚠️ Supabase no está configurado. Por favor edita supabase-client.js con tus credenciales.');
    } else {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase conectado.');
    }
} else {
    console.error('❌ Supabase SDK no se cargó correctamente.');
}
