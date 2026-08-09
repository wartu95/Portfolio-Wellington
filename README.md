# Portfolio Wellington Armas

Portafolio profesional de Wellington J. Armas Tuesta, orientado a oportunidades como Backend Developer .NET Junior y preparado para desplegar en Netlify.

## Stack

- Astro
- TypeScript
- CSS global modularizado
- Netlify
- `@astrojs/sitemap`

## Características

- Diseño oscuro de alto contraste, partículas en el hero y animaciones suaves.
- Contenido separado en archivos de datos dentro de `src/data`.
- Proyectos agregables sin tocar componentes visuales.
- SEO base con canonical, Open Graph, Twitter Cards, JSON-LD, sitemap y robots.
- Formulario de contacto con validación, protección antispam y envío mediante Netlify Forms.
- CV moderno descargable e imagen Open Graph dedicada.
- Build estático rápido, ideal para portfolio personal.

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

Abrir:

```txt
http://127.0.0.1:4321
```

## Build

```bash
npm run build
npm run preview
```

El build genera `dist/`. Esa carpeta no se versiona porque Netlify la genera automáticamente.

## Despliegue en Netlify

Configuración recomendada:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20 o superior

El archivo `netlify.toml` ya incluye la configuración de build, headers básicos y cache para assets.

### Recepción de mensajes del formulario

El formulario usa Netlify Forms y envía los datos sin abrir la aplicación de correo del visitante. Después del primer despliegue:

1. En Netlify, activar la detección de formularios en `Forms > Usage and configuration > Form detection`.
2. Realizar un nuevo despliegue para que Netlify detecte el formulario `contacto`.
3. En `Project configuration > Notifications > Emails and webhooks > Form submission notifications`, agregar una notificación al correo que recibirá los mensajes.

Los envíos también quedarán registrados en la sección `Forms` del proyecto en Netlify.

## Agregar un proyecto

Editar `src/data/projects.ts` y agregar la imagen en `public/assets`.

Campos principales:

- `title`
- `image`
- `imageAlt`
- `description`
- `highlights`
- `codeUrl`
- `demoUrl`
- `stack`

No es necesario tocar `Projects.astro` ni `ProjectCard.astro`.

## SEO

Revisar antes de publicar:

- Actualizar `site` en `astro.config.mjs` si cambia el dominio final.
- Netlify usa automáticamente su variable `URL` para generar canonical, sitemap y metadatos con el dominio asignado.
- Verificar que `public/robots.txt` apunte al dominio correcto.
- Usar una imagen Open Graph real y optimizada.
- Revisar Lighthouse después de desplegar.
