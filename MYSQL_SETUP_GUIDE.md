# 🚀 HealthAI MySQL Backend - Complete Setup Guide

## 📋 What You Have Now

✅ **Complete MySQL Database Schema** (14 tables)
✅ **Node.js/Express Backend API** (13 route modules)  
✅ **Frontend API Service Layer** (Ready to connect)
✅ **Authentication System** (JWT-based)
✅ **Automated Setup Scripts**

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- Express (web framework)
- MySQL2 (database driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- And more security/utility packages

### Step 2: Setup Database

Option A - **Automated Setup** (Recommended):
```bash
npm run setup-db
```

This script will:
- Create the `healthcare` database
- Create all 14 tables
- Setup indexes and relationships
- Create demo accounts

Option B - **Manual Setup**:
```bash
# Login to MySQL
mysql -u UDHAY -pTeja@7586

# Run these commands:
CREATE DATABASE IF NOT EXISTS healthcare;
USE healthcare;
SOURCE database/schema.sql;
```

### Step 3: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Server will start on: **http://localhost:5000**

✅ Test it: Visit http://localhost:5000/health

---

## 🔌 Connecting Frontend to Backend

### Update Environment Variables

Create `.env` in your frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

### Update AuthModal to Use Real API

Open `/components/auth-modal.tsx` and replace the `handleSubmit` function:

```typescript
import api from '../services/api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = isLogin 
      ? await api.auth.login(formData.email, formData.password)
      : await api.auth.register({
          email: formData.email,
          password: formData.password,
          userType: portalType,
          fullName: formData.fullName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          bloodGroup: formData.bloodGroup,
          emergencyContact: formData.emergencyContact,
          medicalLicense: formData.medicalLicense,
          specialization: formData.specialization,
          hospitalName: formData.hospitalName,
          experience: parseInt(formData.experience) || undefined,
          address: formData.address
        });

    if (response.success) {
      onLogin(portalType, response.data?.user);
      console.log('✅ Login successful:', response.data);
    } else {
      alert(response.error || 'Authentication failed');
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('Authentication failed. Please try again.');
  }
};
```

### Use API in Other Components

Example - Patient Dashboard:

```typescript
import api from '../services/api';
import { useEffect, useState } from 'react';

export function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Get profile
        const profileRes = await api.patient.getProfile();
        if (profileRes.success) {
          setProfile(profileRes.data);
        }

        // Get predictions
        const predictionsRes = await api.prediction.getPatientPredictions();
        if (predictionsRes.success) {
          setPredictions(predictionsRes.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Rest of your component...
}
```

---

## 📊 Database Structure

Your MySQL database includes these tables:

### Core Tables
1. **users** - Authentication (email, password, user type)
2. **patient_profiles** - Patient information
3. **doctor_profiles** - Doctor credentials

### Health Data Tables
4. **health_records** - Electronic Health Records
5. **ai_predictions** - AI model predictions
6. **prescriptions** - Doctor prescriptions
7. **prescription_medications** - Medication details

### Appointments & Communication
8. **appointments** - Telemedicine bookings
9. **notifications** - User notifications

### IoT & Monitoring
10. **iot_devices** - Wearable devices
11. **iot_readings** - Device readings

### Insurance & ABDM
12. **insurance_claims** - Insurance claims
13. **abdm_consents** - ABDM consent management

### Emergency & Analytics
14. **emergency_alerts** - SOS alerts
15. **disease_statistics** - Analytics data
16. **audit_logs** - System audit trail

---

## 🔐 Test the System

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Register a patient
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@patient.com",
    "password": "test123",
    "userType": "patient",
    "fullName": "Test Patient",
    "phone": "1234567890"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@patient.com",
    "password": "test123"
  }'
```

### 2. Use Demo Accounts

The setup script creates these demo accounts:

**Patient Account:**
- Email: `patient@demo.com`
- Password: `patient123`

**Doctor Account:**
- Email: `doctor@demo.com`
- Password: `doctor123`

### 3. Test from Frontend

1. Start your backend server (port 5000)
2. Start your frontend app (port 5173 or 3000)
3. Click on "Patient Portal" or "Doctor Portal"
4. Try registering a new account
5. Try logging in with demo credentials

---

## 🛠️ Available API Endpoints

### Authentication (No token required)
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
GET  /api/auth/verify    - Verify JWT token
```

### Patients (Token required)
```
GET  /api/patients/profile      - Get profile
PUT  /api/patients/profile      - Update profile
GET  /api/patients/dashboard    - Get stats
```

### Doctors (Token required)
```
GET  /api/doctors/profile       - Get profile
PUT  /api/doctors/profile       - Update profile
GET  /api/doctors/patients      - Get patients list
```

### AI Predictions (Token required)
```
POST /api/predictions           - Create prediction
GET  /api/predictions/patient   - Get predictions
GET  /api/predictions/:id       - Get by ID
```

### EHR (Token required)
```
GET  /api/ehr                   - Get health records
POST /api/ehr                   - Create record
```

### Prescriptions (Token required)
```
GET  /api/prescriptions         - Get prescriptions
GET  /api/prescriptions/:id/medications - Get medications
```

### Appointments (Token required)
```
GET  /api/appointments          - Get appointments
POST /api/appointments          - Create appointment
```

### IoT Wearables (Token required)
```
GET  /api/iot/devices           - Get devices
GET  /api/iot/readings          - Get readings
POST /api/iot/readings          - Add reading
```

### Insurance (Token required)
```
GET  /api/insurance             - Get claims
POST /api/insurance             - Submit claim
```

### ABDM (Token required)
```
GET  /api/abdm/consents         - Get consents
POST /api/abdm/link-health-id   - Link health ID
```

### Notifications (Token required)
```
GET  /api/notifications         - Get notifications
PUT  /api/notifications/:id/read - Mark as read
```

### Emergency (Token required)
```
POST /api/emergency/alert       - Send SOS alert
GET  /api/emergency/alerts      - Get alerts
```

### Analytics (Token required)
```
GET  /api/analytics/disease-trends - Get trends
GET  /api/analytics/predictions-summary - Get summary
```

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to MySQL"

**Solution:**
1. Check if MySQL is running:
   ```bash
   # Linux/Mac
   sudo systemctl status mysql
   
   # Windows
   net start MySQL80
   ```

2. Verify credentials:
   ```bash
   mysql -u UDHAY -pTeja@7586 -e "SHOW DATABASES;"
   ```

3. Check .env file has correct credentials

### Issue: "Port 5000 already in use"

**Solution:**
1. Change port in `.env`:
   ```env
   PORT=5001
   ```

2. Or kill the process:
   ```bash
   # Linux/Mac
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

### Issue: "CORS error from frontend"

**Solution:**
Add your frontend URL to backend `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174
```

### Issue: "JWT token invalid"

**Solution:**
1. Make sure JWT_SECRET is set in .env
2. Token might be expired (default: 7 days)
3. Clear localStorage and login again

---

## 📁 Project Structure

```
your-project/
├── backend/                    # ← Backend server
│   ├── config/
│   │   └── database.js         # MySQL connection
│   ├── database/
│   │   └── schema.sql          # Database schema
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── routes/                 # API endpoints
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   └── ... (11 more files)
│   ├── scripts/
│   │   └── setup-database.js   # Setup script
│   ├── server.js               # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── services/
│   └── api.ts                  # ← Frontend API service
├── components/                 # ← Your React components
│   └── auth-modal.tsx          # Update this to use API
└── App.tsx                     # Your main app
```

---

## ✅ Checklist

Before you start, make sure:

- [ ] MySQL server is running
- [ ] Node.js is installed (v16+)
- [ ] Backend dependencies installed (`npm install`)
- [ ] Database is created and schema imported
- [ ] Backend server is running (port 5000)
- [ ] Frontend .env has VITE_API_URL configured
- [ ] AuthModal is updated to use real API

---

## 🚀 Next Steps

1. **Test Authentication**
   - Register new user
   - Login with credentials
   - Verify token is stored in localStorage

2. **Connect All Components**
   - Update PatientDashboard to fetch real data
   - Update DoctorDashboard to fetch real data
   - Connect AI Prediction components
   - Connect EHR, Prescriptions, etc.

3. **Add Features**
   - File upload for reports
   - Email notifications
   - Real-time updates (WebSocket)
   - ABDM API integration

4. **Deploy**
   - Deploy backend to VPS/cloud
   - Deploy frontend to Vercel/Netlify
   - Use environment variables for production

---

## 📞 Need Help?

**Common Issues:**
1. Check backend logs for errors
2. Verify MySQL credentials
3. Ensure ports are not blocked
4. Check CORS configuration
5. Verify JWT token in localStorage

**Database Issues:**
```bash
# Check tables
mysql -u UDHAY -pTeja@7586 healthcare -e "SHOW TABLES;"

# Check user exists
mysql -u UDHAY -pTeja@7586 healthcare -e "SELECT * FROM users LIMIT 5;"

# Reset database
mysql -u UDHAY -pTeja@7586 healthcare < backend/database/schema.sql
```

---

## 🎉 You're Ready!

Your HealthAI platform now has:
- ✅ Real MySQL database with 14+ tables
- ✅ Secure authentication (JWT + bcrypt)
- ✅ Complete REST API (50+ endpoints)
- ✅ Frontend API service layer
- ✅ Demo accounts for testing

**Start building amazing features! 🚀**

---

*For detailed API documentation, see `/backend/README.md`*
