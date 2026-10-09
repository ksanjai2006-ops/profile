require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('./models/Admin');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Education = require('./models/Education');
const Certification = require('./models/Certification');
const Experience = require('./models/Experience');
const Message = require('./models/Message');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sanjai_portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Certification.deleteMany({});
    await Experience.deleteMany({});
    await Message.deleteMany({});

    // 1. Create Admin
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await Admin.create({
      email: 'admin@sanjaik.dev',
      passwordHash
    });
    console.log('✓ Admin account created: admin@sanjaik.dev / admin123');

    // 2. Create Profile
    await Profile.create({
      name: 'Sanjai K',
      title: 'Information Technology Student | Software Developer | Tech Enthusiast',
      bio: 'Aspiring software developer with a strong foundation in full-stack web applications, RESTful services, modern UI designs, and database management.',
      about: 'I am an Information Technology student passionate about building clean, efficient, and scalable web solutions. Experienced in React, TypeScript, Express.js, Node.js, Bootstrap, and MongoDB.',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      resume: '/resume.pdf',
      email: 'sanjaik@example.com',
      location: 'Tamil Nadu, India',
      socialLinks: {
        github: 'https://github.com/sanjaik',
        linkedin: 'https://linkedin.com/in/sanjaik',
        instagram: 'https://instagram.com/sanjaik'
      }
    });
    console.log('✓ Profile data seeded');

    // 3. Create Skills
    await Skill.insertMany([
      { name: 'JavaScript', category: 'Programming', icon: 'bi-filetype-js', description: 'ES6+, Async/Await, Promises', proficiency: 92, order: 1 },
      { name: 'TypeScript', category: 'Programming', icon: 'bi-filetype-tsx', description: 'Strict typing, Interfaces, Generics', proficiency: 88, order: 2 },
      { name: 'React', category: 'Frontend', icon: 'bi-react', description: 'Hooks, State Management, Router', proficiency: 90, order: 3 },
      { name: 'Bootstrap 5', category: 'Frontend', icon: 'bi-bootstrap-fill', description: 'Responsive Layouts, Custom Themes, Components', proficiency: 94, order: 4 },
      { name: 'Node.js', category: 'Backend', icon: 'bi-node-plus-fill', description: 'Event loop, Core modules, NPM', proficiency: 87, order: 5 },
      { name: 'Express.js', category: 'Backend', icon: 'bi-server', description: 'REST APIs, Middleware, JWT Auth', proficiency: 89, order: 6 },
      { name: 'MongoDB', category: 'Database', icon: 'bi-database-fill', description: 'Mongoose ORM, Aggregations, Atlas', proficiency: 85, order: 7 },
      { name: 'Swagger / OpenAPI', category: 'Tools', icon: 'bi-file-earmark-code-fill', description: 'API Documentation & Interactive Testing', proficiency: 90, order: 8 },
      { name: 'Git & GitHub', category: 'Tools', icon: 'bi-github', description: 'Version Control, CI/CD Actions', proficiency: 89, order: 9 }
    ]);
    console.log('✓ Skills seeded');

    // 4. Create Projects
    await Project.insertMany([
      {
        title: 'AI Knowledge Gap Detector',
        slug: 'ai-knowledge-gap-detector',
        description: 'Automated NLP platform that detects missing concepts, prerequisite violations, and inconsistencies in technical documentation.',
        problem: 'Technical documentation often suffers from missing background context and logical concept gaps.',
        solution: 'Built a graph analysis engine that compares markdown/PDF docs against structured knowledge nodes.',
        features: ['Automated PDF/Markdown parser', 'Concept graph heatmap', 'Prerequisite checker', 'Exportable PDF audit report'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'TypeScript', 'Express.js', 'Python', 'FastAPI', 'MongoDB'],
        category: 'AI/ML',
        githubUrl: 'https://github.com/sanjaik/ai-knowledge-gap-detector',
        liveUrl: 'https://knowledge-gap.example.com',
        featured: true
      },
      {
        title: 'Enterprise FinTrack AI SaaS Platform',
        slug: 'enterprise-fintrack-ai-saas',
        description: 'Financial tracking web app with predictive expense analytics, budget optimization, and automated receipt scanning.',
        problem: 'Users struggle to categorize expenses and forecast monthly spending accurately.',
        solution: 'Integrated ML classification with real-time financial dashboards and budget limits.',
        features: ['Receipt OCR parsing', 'Predictive budget charts', 'Exportable CSV/PDF statements', 'Multi-currency support'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'Bootstrap 5', 'Node.js', 'Express', 'MongoDB'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/sanjaik/fintrack-ai-saas',
        liveUrl: 'https://fintrack.example.com',
        featured: true
      },
      {
        title: 'CogniWave Natural Language SQL Query Translator',
        slug: 'cogniwave-nl-sql-translator',
        description: 'Transforms plain English questions into optimized, ready-to-execute SQL queries with schema introspection.',
        problem: 'Non-technical stakeholders require database reports but do not know complex SQL syntax.',
        solution: 'Developed an LLM-assisted SQL generator with visual execution trees and schema guards.',
        features: ['Real-time SQL generation', 'Schema visualizer', 'Query execution plan', 'Export query results'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express'],
        category: 'Web Development',
        githubUrl: 'https://github.com/sanjaik/cogniwave-sql-translator',
        liveUrl: 'https://cogniwave.example.com',
        featured: true
      }
    ]);
    console.log('✓ Projects seeded');

    // 5. Create Education
    await Education.insertMany([
      {
        degree: 'B.Tech in Information Technology',
        institution: 'Anna University Campus / IT Department',
        startDate: '2022-08',
        endDate: '2026-05',
        description: 'Focusing on Data Structures & Algorithms, Software Engineering, Database Systems, Web Technologies, and Cloud Computing.'
      },
      {
        degree: 'Higher Secondary Certificate (HSC - Computer Science)',
        institution: 'State Board Higher Secondary School',
        startDate: '2020-06',
        endDate: '2022-04',
        description: 'Graduated with distinction in Mathematics, Physics, Chemistry, and Computer Science.'
      }
    ]);
    console.log('✓ Education seeded');

    // 6. Create Certifications
    await Certification.insertMany([
      {
        title: 'AWS Certified Cloud Practitioner',
        organization: 'Amazon Web Services',
        date: '2024-03',
        credentialId: 'AWS-CCP-987654321',
        certificateUrl: 'https://aws.amazon.com/verify',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'Full Stack Web Development Certification',
        organization: 'FreeCodeCamp / Meta',
        date: '2023-11',
        credentialId: 'FCC-FS-554433221',
        certificateUrl: 'https://freecodecamp.org/verify',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'
      }
    ]);
    console.log('✓ Certifications seeded');

    // 7. Create Experience
    await Experience.insertMany([
      {
        organization: 'NovaTech Solutions',
        position: 'Full Stack Developer Intern',
        startDate: '2024-05',
        endDate: '2024-08',
        description: 'Built scalable REST endpoints using Express.js and created interactive dashboard components with React & Bootstrap.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB']
      }
    ]);
    console.log('✓ Experience seeded');

    // 8. Create Sample Message
    await Message.create({
      name: 'Sarah Connor',
      email: 'sarah@techrecruiter.com',
      subject: 'Inquiry regarding Full Stack Role',
      message: 'Hi Sanjai, I impressed by your portfolio and projects. Would love to connect regarding an opportunity.',
      read: false
    });
    console.log('✓ Messages seeded');

    console.log('\n--- SEED COMPLETE ---');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedData();
