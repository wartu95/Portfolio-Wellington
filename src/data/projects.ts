export const projects = [
  {
    title: "Mantenimiento de Trabajadores",
    image: "/assets/project-dotnet-workers.svg",
    imageAlt: "Diagrama visual del proyecto Mantenimiento de Trabajadores en .NET",
    description:
      "Aplicación desarrollada como prueba técnica para gestionar trabajadores con validaciones de negocio y persistencia estructurada.",
    highlights: [
      "CRUD con fotografía, filtros y validación de documento único",
      "Arquitectura por capas: Web, Application, Domain, Infrastructure y Tests",
      "Procedimientos almacenados y pruebas unitarias con xUnit y Moq",
    ],
    codeUrl: "https://github.com/wartu95/MantenimientoTrabajadores-PruebaTecnica",
    demoUrl: null,
    stack: [".NET 8", "C#", "ASP.NET Core MVC", "SQL Server", "EF Core"],
    featured: true,
  },
  {
    title: "HelpDesk Lite",
    image: "/assets/project-helpdesk.svg",
    imageAlt: "Panel visual del proyecto HelpDesk Lite",
    description:
      "MVP para gestionar tickets internos con roles, prioridades, conversación y seguimiento de estados.",
    highlights: [
      "Autenticación con Supabase y rutas protegidas por rol",
      "Políticas RLS para controlar el acceso a tickets y mensajes",
      "Vista administrativa con filtros, búsqueda y asignación",
      "Pruebas funcionales y de seguridad documentadas",
    ],
    codeUrl: "https://github.com/wartu95/HelpDesk_Lite",
    demoUrl: "https://help-desk-lite.vercel.app/",
    stack: ["React", "Supabase", "RLS", "QA", "Vercel"],
    featured: true,
  },
  {
    title: "Focus Guard MCP",
    image: "/assets/focus-guard-mcp.webp",
    imageAlt: "Diagrama de la aplicación Focus Guard MCP",
    description:
      "Sistema de productividad con reglas de negocio determinísticas, persistencia en Firebase y alertas por WhatsApp.",
    highlights: [
      "Orquestación central en Node.js y TypeScript",
      "IA Gemini usada solo para interpretar lenguaje natural",
      "Restricción de foco: un proyecto activo a la vez",
      "Persistencia en Firestore con auditoría de inactividad",
      "Alertas automáticas mediante Twilio WhatsApp",
    ],
    codeUrl: "https://github.com/wartu95/Focus_Guard_MCP",
    demoUrl: null,
    stack: ["Node.js", "TypeScript", "Firebase", "Gemini", "Twilio"],
    featured: true,
  },
];
