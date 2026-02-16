# 📚 NestJS + Prisma Book API

A RESTful API built with NestJS and Prisma that allows users to manage their personal book collection with authentication and role-based access control.

This project integrates with the Open Library API to import book data using ISBN.

---

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- SQLite
- JWT Authentication
- Role-Based Authorization (Admin / User)
- Axios (for external API integration)
- Open Library API

---

## 📌 Main Features

- ✅ User registration
- ✅ User authentication (JWT)
- ✅ Role-based access control
- ✅ Create, read, update and delete books
- ✅ Import book data using ISBN (Open Library integration)
- ✅ Books are associated with the authenticated user

---

## 🔐 Authentication & Roles

The system uses JWT for authentication.

There are two roles:

- `USER`
- `ADMIN`

---

## 🌍 External API Integration

The API integrates with:

Open Library:  
https://openlibrary.org

The project follows a **modular domain-based architecture**, where each feature is encapsulated in its own module (controller + service + DTOs).

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/LeonardoQuintiliano/nestJs-Prisma.git