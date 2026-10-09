require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const educationRoutes = require('./routes/educationRoutes');
const certRoutes = require('./routes/certRoutes');
const expRoutes = require('./routes/expRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// OpenAPI / Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Sanjai K - API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true
  }
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/experience', expRoutes);
app.use('/api/messages', messageRoutes);

// Root route redirect to docs
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sanjai K Portfolio REST API Server is running.',
    documentation: '/api-docs'
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Documentation available at http://localhost:${PORT}/api-docs`);
});
