# User Management System (Node.js + Express + MongoDB)

A full-featured **User & Admin Management System** built using **Node.js, Express, MongoDB (Atlas), EJS, and JWT authentication**.  
The project supports role-based access control, secure authentication, admin dashboards, validations, edge cases, testing, and deployment readiness.


### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication (stored in cookies)
- Role-based access (`user` / `admin`)
- Protected routes using middleware
- Auto logout when account is deleted or role changes

### 👤 User Management
- Admin dashboard to view all users
- Edit user details with validation
- Delete users (with edge case handling)
- Prevent duplicate emails and usernames
- Redirect & alert handling for validation errors

### 🧠 Edge Cases Handled
- Admin deletes own account → redirected to login
- Deleted user with active token → auto logout
- Invalid user edit → stay on edit page with error
- Duplicate email on edit
- Unauthorized access prevention
- Session expiration handling

### 🧪 Testing
- Unit & integration tests using **Jest + Supertest**
- Authentication test cases
- User/Admin access tests
- Edge case test coverage

### ☁️ Deployment Ready "https://user-management-4-932n.onrender.com"
- MongoDB Atlas integration
- Environment variables using `.env`
- Render deployment support
- Production-safe server startup
- Secure secret handling

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT, Cookies
- **View Engine:** EJS
- **Testing:** Jest, Supertest
- **Deployment:** Render
- **Env Management:** dotenv

---

## 📂 Project Structure

