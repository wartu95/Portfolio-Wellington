# Portfolio Wellington Armas

Hola, soy Wellington J. Armas Tuesta, Backend Developer .NET Junior. Este es el código de mi portafolio personal, hecho con Astro y listo para desplegar en Netlify.

## Stack

- Astro
- TypeScript
- CSS global modularizado
- Netlify
- `@astrojs/sitemap`

## Qué incluye

- Diseño oscuro de alto contraste, con partículas en el hero y animaciones suaves que no estorban la lectura.
- Todo el contenido (perfil, proyectos, servicios, skills y experiencia) vive en `src/data`, separado de la interfaz.
- Agregar un proyecto es editar un archivo de datos, sin tocar los componentes visuales.
- SEO base: canonical, Open Graph, Twitter Cards, JSON-LD, sitemap y robots.
- Formulario de contacto con validación, protección antispam y envío vía Netlify Forms.
- CV descargable e imagen Open Graph dedicada.
- Sitio estático rápido, sin servidor ni base de datos.

## Estructura

```txt
src/
  components/      Componentes de UI
  data/            Perfil, proyectos, servicios, skills y experiencia
  layouts/         Layout base con SEO
  pages/           Páginas Astro
  scripts/         Efectos e interacciones del navegador
  styles/          Estilos globales
public/
  assets/          Imágenes e iconos usados por el sitio
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre tu navegador en `http://127.0.0.1:4321`.

## Build

```bash
npm run build
npm run preview
```

El build genera `dist/`. Esa carpeta no se versiona porque Netlify la regenera en cada despliegue.

## Despliegue en Netlify

Configuración recomendada:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20 o superior

El archivo `netlify.toml` ya trae la configuración de build, cabeceras de seguridad y caché para assets, así que normalmente solo conectas el repo y listo.

### Recibir los mensajes del formulario

El formulario usa Netlify Forms y envía los datos sin abrir el correo del visitante. Después del primer despliegue:

1. En Netlify, activa la detección de formularios en `Forms > Usage and configuration > Form detection`.
2. Haz un nuevo despliegue para que Netlify detecte el formulario `contacto`.
3. En `Project configuration > Notifications > Emails and webhooks > Form submission notifications`, agrega una notificación al correo donde quieras recibir los mensajes.

Los envíos también quedan registrados en la sección `Forms` del proyecto.

## Agregar un proyecto

Edita `src/data/projects.ts` y agrega la imagen en `public/assets`.

Campos principales:

- `title`
- `image`
- `imageAlt`
- `description`
- `highlights`
- `codeUrl`
- `demoUrl`
- `stack`

No necesitas tocar `Projects.astro` ni `ProjectCard.astro`.

## SEO

Antes de publicar, revisa:

- Actualiza `site` en `astro.config.mjs` si cambia el dominio final.
- Netlify usa su variable `URL` para generar canonical, sitemap y metadatos con el dominio asignado.
- `robots.txt`, canonical y sitemap se generan con la URL del despliegue; no requieren un dominio propio.
- Usa una imagen Open Graph real y optimizada.
- Corre Lighthouse después de publicar.
