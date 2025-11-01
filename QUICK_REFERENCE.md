# 🚀 HealthAI - Quick Reference Card

## ⚡ Quick Start Commands

```bash
# 1. Setup Backend
cd backend
npm install
npm run setup-db    # Creates database + tables
npm run dev         # Start server on port 5000

# 2. Setup Frontend (in another terminal)
cd ..
npm install
npm run dev         # Start frontend

# 3. Test
# Visit: http://localhost:5173
# Click "Patient Portal" or "Doctor Portal"
# Register or use demo accounts below
```

## 🔐 Demo Accounts

```
Patient:
  Email: patient@demo.com
  Password: patient123

Doctor:
  Email: doctor@demo.com
  Password: doctor123
```

## 📊 Your Database

```
Host: localhost
User: UDHAY
Password: Teja@7586
Database: healthcare
Port: 3306

Tables: 14 tables created
- users, patient_profiles, doctor_profiles
- health_records, ai_predictions
- prescriptions, appointments
- iot_devices, iot_readings
- insurance_claims, abdm_consents
- notifications, emergency_alerts
- audit_logs
```

## 🔌 API Endpoints (localhost:5000/api)

### Authentication
```
POST /auth/register  - Create account
POST /auth/login     - Login
GET  /auth/verify    - Verify token
```

### Patient
```
GET  /patients/profile     - Get profile
PUT  /patients/profile     - Update profile
GET  /patients/dashboard   - Get stats
```

### AI Predictions
```
POST /predictions          - Create prediction
GET  /predictions/patient  - Get all predictions
```

### Health Records
```
GET  /ehr                  - Get records
POST /ehr                  - Create record
```

### Appointments
```
GET  /appointments         - Get appointments
POST /appointments         - Book appointment
```

### IoT Devices
```
GET  /iot/devices          - Get devices
GET  /iot/readings         - Get readings
POST /iot/readings         - Add reading
```

## 💻 Frontend API Usage

```typescript
// Import API service
import api from '../services/api';

// Login
const response = await api.auth.login(email, password);
// Returns: { success: true, data: { token, user } }

// Get patient profile
const profile = await api.patient.getProfile();
// Returns: { success: true, data: {...} }

// Create AI prediction
const prediction = await api.prediction.create({
  modelName: 'CardioRisk',
  diseaseType: 'heart_disease',
  riskLevel: 'medium',
  confidenceScore: 85.5,
  predictionResult: 'Moderate risk detected',
  inputParameters: { age: 45, bp: 140, ... }
});
```

## 🛠️ Common Tasks

### Check if Backend is Running
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok"}
```

### Register New User via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "userType": "patient",
    "fullName": "Test User"
  }'
```

### Query Database Directly
```bash
mysql -u UDHAY -pTeja@7586 healthcare

# Inside MySQL:
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM patient_profiles;
```

### View Backend Logs
```bash
cd backend
npm run dev
# Logs will show all requests and database queries
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect to MySQL | `sudo systemctl start mysql` or `net start MySQL80` |
| Port 5000 in use | Change `PORT=5001` in backend/.env |
| CORS error | Add frontend URL to `ALLOWED_ORIGINS` in backend/.env |
| JWT invalid | Clear localStorage, login again |
| Database not found | Run `npm run setup-db` in backend folder |

## 📁 Important Files

```
/backend/
  server.js              ← Main server file
  config/database.js     ← MySQL connection
  routes/auth.js         ← Login/Register
  .env                   ← Your credentials (already configured!)

/services/
  api.ts                 ← Frontend API service

/components/
  auth-modal.tsx         ← Update this to use real API
  patient-dashboard.tsx  ← Update to fetch real data
  doctor-dashboard.tsx   ← Update to fetch real data

/documentation/
  Architecture-Diagram.md  ← Visual architecture
  Authentication-System.md ← Auth system docs

/MYSQL_SETUP_GUIDE.md    ← Complete setup guide
```

## 🎯 Integration Checklist

- [x] MySQL database created
- [x] Backend API running (port 5000)
- [x] Frontend API service created (/services/api.ts)
- [ ] Update auth-modal.tsx to use api.auth
- [ ] Update patient-dashboard.tsx to use api.patient
- [ ] Update doctor-dashboard.tsx to use api.doctor
- [ ] Update prediction components to use api.prediction
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test data persistence

## 🚀 Next Features to Add

1. **Connect All Components**
   - Replace demo data with API calls
   - Add loading states
   - Add error handling

2. **File Upload**
   - Health reports (PDF, images)
   - Profile pictures
   - Prescription documents

3. **Real-time Features**
   - WebSocket for live updates
   - Chat between doctor-patient
   - Live appointment status

4. **Notifications**
   - Email notifications
   - SMS alerts (Twilio)
   - Push notifications

5. **Advanced Features**
   - ABDM API integration
   - Payment gateway
   - Video consultation
   - AI model integration

## 📞 Support

**Database Issues:**
```bash
# Check MySQL status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# View MySQL errors
sudo tail -f /var/log/mysql/error.log
```

**Backend Issues:**
```bash
# Check if port 5000 is available
lsof -i :5000

# View all running processes
ps aux | grep node

# Kill hung processes
pkill -f node
```

**Frontend Issues:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check environment variables
cat .env
```

## 🎉 You're All Set!

Your HealthAI platform now has:
✅ MySQL database with 14 tables
✅ Secure backend API (50+ endpoints)
✅ Frontend API service layer
✅ JWT authentication system
✅ Demo accounts ready to use
✅ Beautiful 3D animated UI

**Start coding and bring your healthcare vision to life! 🏥💙**

---

*For detailed documentation:*
- Backend API: `/backend/README.md`
- Full Setup: `/MYSQL_SETUP_GUIDE.md`
- Architecture: `/documentation/Architecture-Diagram.md`
