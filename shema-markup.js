const schemaMarkup = `{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Wellington Armas Tuesta",
    "url": "https://wartu95.github.io/Portfolio-Wellington/",
    "image": "https://wartu95.github.io/Portfolio-Wellington/assets/wellington-sobremi.webp",
    "jobTitle": "Desarrollador Web",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://github.com/wartu95",
      "https://www.linkedin.com/in/wartudev/"
    ],
    "knowsAbout": ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "Tailwind CSS", "Git", "Spring Boot"]
  }`;
  
  // Función para insertar el schema en el head del documento
  function insertSchemaMarkup() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = schemaMarkup;
    document.head.appendChild(script);
  }
  
  // Llama a la función para insertar el schema cuando el DOM esté cargado
  document.addEventListener('DOMContentLoaded', insertSchemaMarkup);