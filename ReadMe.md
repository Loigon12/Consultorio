# 🦷 Consultorio Odontológico — Rosa Ducuara

Sitio web para la gestión de citas y presentación de servicios de un consultorio odontológico. Incluye autenticación de usuarios, registro de perfiles y una interfaz de agendamiento, todo conectado a **Supabase** como backend.

---

## 📋 Requisitos previos

Antes de instalar el proyecto, asegúrate de tener lo siguiente:

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| [Git](https://git-scm.com/downloads) | Cualquiera | https://git-scm.com/downloads |
| Navegador web moderno | Chrome 90+, Firefox 90+, Edge 90+ | — |
| [VS Code](https://code.visualstudio.com/) *(recomendado)* | Cualquiera | https://code.visualstudio.com/ |
| Extensión **Live Server** para VS Code *(recomendada)* | Cualquiera | Buscable en el marketplace de VS Code |

> **Nota:** Este proyecto es un sitio web estático (HTML + CSS + JavaScript). **No requiere Node.js, Python, ni ningún servidor adicional** para ejecutarse. El backend ya está configurado en Supabase en la nube.

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

Abre una terminal (CMD, PowerShell, Git Bash o Terminal de macOS/Linux) y ejecuta:

```bash
git clone https://github.com/Loigon12/Consultorio.git
```

Esto descargará el proyecto en una carpeta llamada `Consultorio` en el directorio donde ejecutaste el comando.

### 2. Entrar a la carpeta del proyecto

```bash
cd Consultorio
```

### 3. Abrir el proyecto

**Opción A — Con VS Code y Live Server (recomendado):**

```bash
code .
```

Una vez abierto VS Code:
1. Instala la extensión **Live Server** si no la tienes (busca "Live Server" de Ritwick Dey en la pestaña de extensiones).
2. Haz clic derecho sobre el archivo `index.html` en el explorador de archivos.
3. Selecciona **"Open with Live Server"**.
4. El sitio se abrirá automáticamente en tu navegador en `http://127.0.0.1:5500`.

**Opción B — Abrir directamente en el navegador:**

Navega a la carpeta `Consultorio` en tu explorador de archivos y haz doble clic sobre `index.html`.

> ⚠️ Algunas funciones de autenticación pueden no funcionar correctamente con `file://` por restricciones del navegador. Se recomienda usar Live Server.

---

## ⚙️ Configuración de Supabase

El proyecto ya incluye una configuración de Supabase lista para usar. Las credenciales se encuentran al inicio del archivo `JavaScript/script.js`:

```javascript
const SUPABASE_URL = 'https://dademmbghkpndygsmwcu.supabase.co';
const SUPABASE_KEY = 'TU_CLAVE_ANON_AQUÍ';
```

### ¿Quieres usar tu propio proyecto de Supabase?

Si deseas conectar el sitio a una base de datos propia, sigue estos pasos:

1. Crea una cuenta gratuita en [https://supabase.com](https://supabase.com).
2. Crea un nuevo proyecto.
3. En el panel de Supabase, ve a **Project Settings → API**.
4. Copia la **Project URL** y la clave **anon public**.
5. Reemplaza los valores en `JavaScript/script.js`:
   ```javascript
   const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
   const SUPABASE_KEY = 'tu-clave-anon-publica';
   ```

### Crear la tabla de perfiles en Supabase

El proyecto guarda los datos de los usuarios registrados en una tabla llamada `perfiles`. Créala ejecutando el siguiente SQL en el **SQL Editor** de tu proyecto de Supabase:

```sql
CREATE TABLE perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT NOT NULL,
  documento TEXT NOT NULL,
  telefono TEXT,
  correo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;

-- Política: cada usuario solo puede ver y editar su propio perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil"
  ON perfiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON perfiles FOR INSERT WITH CHECK (auth.uid() = id);
```

---

## 📁 Estructura del proyecto

```
Consultorio/
├── index.html              # Página principal (inicio, nosotros, login)
├── Tratamientos.html       # Página de tratamientos y servicios
├── css/
│   └── style.css           # Estilos personalizados
├── JavaScript/
│   └── script.js           # Lógica principal (Supabase, autenticación, animaciones)
├── Images/
│   └── Hero.jpeg           # Imágenes del sitio
└── Backend/                # Modelos de datos en Python (no se ejecutan en el navegador)
    ├── Usuario.py
    ├── Cita.py
    ├── Servicio.py
    ├── agenda.py
    ├── Historial.py
    └── Clinica.py
```

> La carpeta `Backend/` contiene los modelos de datos en Python usados para el diseño conceptual del sistema. No se requieren para ejecutar el sitio web.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 + CSS3 | Estructura y estilos base |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de diseño (vía CDN) |
| [GSAP](https://greensock.com/gsap/) | Animaciones y efectos de scroll |
| [Lucide](https://lucide.dev/) | Íconos |
| [Supabase](https://supabase.com/) | Autenticación y base de datos en la nube |
| Python 3 | Modelos de dominio (diseño) |

---

## 🔑 Funcionalidades principales

- **Registro e inicio de sesión** de pacientes mediante Supabase Auth.
- **Agendamiento de citas** (requiere estar autenticado).
- **Página de tratamientos** con catálogo de servicios odontológicos.
- **Diseño responsive** adaptado a dispositivos móviles y escritorio.
- **Animaciones** al hacer scroll con GSAP y ScrollTrigger.

---

## ❓ Solución de problemas frecuentes

**El sitio no carga correctamente al abrir `index.html` directamente:**
Usa Live Server en VS Code en lugar de abrir el archivo directamente. Esto evita restricciones de CORS del navegador.

**El registro o inicio de sesión no funciona:**
Verifica que la URL y la clave de Supabase en `JavaScript/script.js` sean correctas. Revisa la consola del navegador (F12 → Consola) para ver mensajes de error detallados.

**No se guardan los datos del perfil al registrarse:**
Asegúrate de haber creado la tabla `perfiles` en Supabase y de que las políticas de Row Level Security estén configuradas correctamente.

---

## 📄 Licencia

Este proyecto es de uso académico. Todos los derechos del diseño y contenido pertenecen a sus autores.