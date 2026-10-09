const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sanjai K Portfolio & CMS REST API',
      version: '1.0.0',
      description: 'Production-ready OpenAPI 3.0 documentation for Sanjai K\'s Developer Portfolio API. Includes JWT Bearer authentication for protected admin endpoints.',
      contact: {
        name: 'Sanjai K',
        email: 'sanjaik@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        }
      },
      schemas: {
        ApiResponseSuccess: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation completed successfully' },
            data: { type: 'object' }
          }
        },
        ApiResponseError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Resource not found or unauthorized' },
            error: { type: 'string', example: 'ERROR_CODE' }
          }
        },
        AuthLoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@sanjaik.dev' },
            password: { type: 'string', example: 'admin123' }
          }
        },
        Profile: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Sanjai K' },
            title: { type: 'string', example: 'Information Technology Student | Software Developer' },
            bio: { type: 'string', example: 'Passionate developer creating full-stack web applications.' },
            about: { type: 'string', example: 'Detailed biography...' },
            profileImage: { type: 'string', example: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
            resume: { type: 'string', example: '/resume.pdf' },
            email: { type: 'string', example: 'sanjaik@example.com' },
            location: { type: 'string', example: 'Tamil Nadu, India' },
            socialLinks: {
              type: 'object',
              properties: {
                github: { type: 'string', example: 'https://github.com/sanjaik' },
                linkedin: { type: 'string', example: 'https://linkedin.com/in/sanjaik' },
                instagram: { type: 'string', example: 'https://instagram.com/sanjaik' }
              }
            }
          }
        },
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', example: 'AI Knowledge Gap Detector' },
            slug: { type: 'string', example: 'ai-knowledge-gap-detector' },
            description: { type: 'string', example: 'NLP platform identifying documentation gaps.' },
            problem: { type: 'string', example: 'Technical docs missing prerequisites.' },
            solution: { type: 'string', example: 'Automated entity & concept graph analyzer.' },
            features: { type: 'array', items: { type: 'string' }, example: ['Concept graph', 'PDF Parsing'] },
            image: { type: 'string', example: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' },
            technologies: { type: 'array', items: { type: 'string' }, example: ['React', 'Python', 'FastAPI'] },
            category: { type: 'string', example: 'AI/ML' },
            githubUrl: { type: 'string', example: 'https://github.com/sanjaik/knowledge-gap-detector' },
            liveUrl: { type: 'string', example: 'https://knowledge-gap.example.com' },
            featured: { type: 'boolean', example: true },
            createdAt: { type: 'string' }
          }
        },
        Skill: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Node.js' },
            category: { type: 'string', example: 'Backend' },
            icon: { type: 'string', example: 'bi-node-plus-fill' },
            description: { type: 'string', example: 'Asynchronous event-driven JavaScript runtime.' },
            proficiency: { type: 'number', example: 90 },
            order: { type: 'number', example: 1 }
          }
        },
        Education: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            degree: { type: 'string', example: 'B.Tech Information Technology' },
            institution: { type: 'string', example: 'Anna University' },
            startDate: { type: 'string', example: '2022-08' },
            endDate: { type: 'string', example: '2026-05' },
            description: { type: 'string', example: 'Specialized in Software Engineering and Data Structures.' }
          }
        },
        Certification: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', example: 'AWS Certified Cloud Practitioner' },
            organization: { type: 'string', example: 'Amazon Web Services' },
            date: { type: 'string', example: '2024-03' },
            credentialId: { type: 'string', example: 'AWS-12345678' },
            certificateUrl: { type: 'string', example: 'https://aws.amazon.com/verify' },
            image: { type: 'string', example: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3' }
          }
        },
        Experience: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            organization: { type: 'string', example: 'Tech Solutions Inc.' },
            position: { type: 'string', example: 'Software Engineering Intern' },
            startDate: { type: 'string', example: '2024-05' },
            endDate: { type: 'string', example: '2024-08' },
            description: { type: 'string', example: 'Developed REST API microservices and React frontends.' },
            technologies: { type: 'array', items: { type: 'string' }, example: ['Express.js', 'React', 'MongoDB'] }
          }
        },
        MessageInput: {
          type: 'object',
          required: ['name', 'email', 'subject', 'message'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            subject: { type: 'string', example: 'Project Collaboration' },
            message: { type: 'string', example: 'Hello Sanjai, I would like to discuss a project.' }
          }
        },
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            subject: { type: 'string', example: 'Project Collaboration' },
            message: { type: 'string', example: 'Hello Sanjai, I would like to discuss a project.' },
            read: { type: 'boolean', example: false },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
