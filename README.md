# UsedTech Marketplace

A full-stack marketplace for buying and selling used electronic components, development boards, and engineering supplies.

## Features

### Frontend (React + TypeScript)
- **User Authentication**: Registration, login, logout with JWT tokens
- **Product Browsing**: Search, filter, and sort products by category, condition, price
- **Product Details**: Detailed product pages with images, specifications, seller info
- **Shopping Cart**: Add/remove items, quantity management
- **Categories**: Browse by categories and subcategories
- **Comments**: Product comments and replies system
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Admin Panel**: Product and user management for administrators

### Backend (Node.js + Express + PostgreSQL)
- **RESTful API**: Clean API design with proper HTTP status codes
- **Authentication**: JWT-based authentication with HTTP-only cookies
- **Database**: PostgreSQL with proper relationships and indexes
- **File Uploads**: Image upload system (ready for Cloudinary integration)
- **Validation**: Input validation and sanitization
- **Security**: Helmet, CORS, rate limiting, password hashing
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Context API for state management

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Helmet for security headers
- Morgan for logging

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd usedtech-marketplace/Usedtech
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb usedtech_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE usedtech_db;
   \q
   ```

5. **Configure environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp server/.env.example server/.env
   
   # Edit the .env files with your configuration
   ```

6. **Run database migrations**
   ```bash
   cd server
   npm run db:migrate
   npm run db:seed
   cd ..
   ```

7. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start them separately
   npm run dev              # Frontend (port 5173)
   npm run server:dev       # Backend (port 5000)
   ```

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

#### Backend (server/.env)
```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usedtech_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `categories` - Product categories
- `subcategories` - Product subcategories
- `products` - Product listings
- `product_images` - Product images
- `product_ratings` - Product ratings and reviews
- `comments` - Product comments and replies
- `orders` - Purchase orders
- `messages` - User messaging
- `favorites` - User favorites

## Default Users

After running the seed script, you can login with:

**Admin Account:**
- Email: admin@usedtech.com
- Password: admin123

**Test Users:**
- Email: john@example.com
- Password: password123

## Production Deployment

### Frontend
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Backend
1. Set up a PostgreSQL database
2. Configure production environment variables
3. Build the backend:
   ```bash
   cd server
   npm run build
   ```
4. Run migrations:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.