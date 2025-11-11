# E-Rental System - Frontend

![React](https://img.shields.io/badge/React-19.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.1.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.5-blue)
![License](https://img.shields.io/badge/License-Private-red)

Premium vehicle rental platform frontend built with React, Vite, and TailwindCSS. RentX provides a seamless experience for renting cars, bikes, and other vehicles.

## 🚀 Features

- **User Authentication** - Login/Register for Owners and Customers
- **Owner Dashboard** - Manage vehicles, bookings, and track revenue
- **Customer Dashboard** - Browse vehicles, make bookings, view rental history
- **Vehicle Management** - Add, edit, delete vehicles with image uploads
- **Booking System** - Real-time booking with date selection and location
- **Payment Integration** - Razorpay payment gateway integration
- **Responsive Design** - Beautiful UI with glassmorphism effects
- **Real-time Updates** - Live booking status updates
- **Role-based Access** - Separate interfaces for Owners and Customers

## 🛠️ Tech Stack

### Core Technologies
- **React** (v19.0.0) - UI library
- **Vite** (v6.1.0) - Build tool and dev server
- **React Router DOM** (v7.5.0) - Client-side routing
- **Axios** (v1.8.4) - HTTP client

### UI & Styling
- **TailwindCSS** (v4.0.5) - Utility-first CSS framework
- **Styled Components** (v6.1.15) - CSS-in-JS styling
- **Framer Motion** (v12.23.24) - Animation library
- **React Icons** (v5.5.0) - Icon library
- **Heroicons** (v2.2.0) - SVG icons
- **Lucide React** (v0.475.0) - Icon components

### Utilities
- **React Toastify** (v11.0.5) - Toast notifications

### Development Tools
- **ESLint** (v9.19.0) - Code linting
- **Vite Plugin React** (v4.3.4) - Fast refresh

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd E-Rental\ System/E-Rental_System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

**For Production (Vercel):**
```env
VITE_API_BASE_URL=https://your-backend-api.onrender.com/api/v1
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Build output will be in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
E-Rental_System/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── OwnerDashboard.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── RegisterVehicle.jsx
│   │   ├── EditVehicle.jsx
│   │   ├── VehicleList.jsx
│   │   ├── VehicleDetails.jsx
│   │   ├── Booking.jsx
│   │   └── ...
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Root component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # TailwindCSS configuration
├── package.json        # Dependencies
└── README.md          # This file
```

## 🌐 Deployment on Vercel

### Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket repository (recommended)

### Method 1: Deploy via Vercel CLI

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
vercel
```

Follow the prompts to configure your deployment.

#### 4. Deploy to Production
```bash
vercel --prod
```

### Method 2: Deploy via Vercel Dashboard (Recommended)

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Import Project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `E-Rental_System` (if monorepo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### 3. Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
VITE_API_BASE_URL = https://your-backend-api.onrender.com/api/v1
```

#### 4. Deploy
Click "Deploy" and wait for the build to complete.

### Post-Deployment Configuration

#### Update API Base URL
After backend is deployed on Render, update the environment variable:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Update `VITE_API_BASE_URL` with your Render backend URL
3. Redeploy the project

#### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Vercel Deployment Settings

**vercel.json** (Optional - for advanced configuration):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |

## 🎨 Key Features & Pages

### Public Pages
- **Home** - Landing page with featured vehicles
- **Login** - User authentication
- **Register** - New user registration (Owner/Customer)
- **Vehicle List** - Browse available vehicles
- **Vehicle Details** - Detailed vehicle information

### Owner Pages (Protected)
- **Owner Dashboard** - Manage vehicles and bookings
- **Register Vehicle** - Add new vehicles
- **Edit Vehicle** - Update vehicle details
- **Bookings** - View and manage customer bookings

### Customer Pages (Protected)
- **Customer Dashboard** - View bookings and profile
- **Booking** - Create new vehicle bookings
- **My Bookings** - Rental history

## 🧪 Testing

### Development Testing
```bash
npm run dev
```
Test all features locally before deploying.

### Production Build Testing
```bash
npm run build
npm run preview
```

## 📦 Build Output

After running `npm run build`, the optimized production files will be in:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html
```

## ⚡ Performance Optimization

- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Removes unused code
- **Asset Optimization** - Images and fonts optimized
- **Lazy Loading** - Components loaded on demand
- **Minification** - CSS and JS minified

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Ensure all env variables start with `VITE_`
- Restart dev server after changing `.env`
- On Vercel, redeploy after updating env variables

### API Connection Issues
- Check `VITE_API_BASE_URL` is correct
- Ensure backend is running
- Check CORS settings in backend

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing library
- Vite for the blazing fast build tool
- TailwindCSS for the utility-first CSS framework
- Vercel for the deployment platform

---

**Built with ❤️ using React + Vite + TailwindCSS**

For backend documentation, see [Backend README](../E-Rental_backend/README.md)
