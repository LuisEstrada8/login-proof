# Login Proof

This project was developed as part of a technical exercise focused on building a simple React + TypeScript application that interacts with the [ReqRes](https://reqres.in) public API. It features a login screen and a user list with pagination, along with some extra enhancements like a modal for creating users.

## 📝 Exercise Requirements

### ✅ Login

- [x] Login screen with email and password inputs
- [x] Authentication via `POST https://reqres.in/api/login`  
  Example payload:  
  ```json
  { "email": "eve.holt@reqres.in", "password": "cityslicka" }
 On success, store token in sessionStorage

 On failure or missing fields, show relevant error messages

## ✅ User List
 Fetch users from GET https://reqres.in/api/users?page=1

 Pagination support

 Loading indicator while data is fetched

## ⭐ Extras (Bonus Features)
 Modal to create a new user

 Basic form validation

 Proper usage of TypeScript types and interfaces

 Clean and responsive UI using Tailwind CSS and Radix UI

### 🚀 Getting Started
Prerequisites
Node.js (v18+)

npm or yarn

## Installation

```bash
git clone https://github.com/LuisEstrada8/login-proof.git
cd login-proof
npm install
# or
yarn install

# Run the app
npm run dev
# or
yarn dev
```

## 📁 Project Structure
```bash
src/
├── components/
│   └── ui/
│       └── dialog.tsx         # Create user modal
├── pages/
│   ├── Login.tsx              # Login screen
│   └── Home.tsx               # User list with pagination
├── services/
│   └── api.ts                 # ReqRes API methods
```
## 📦 Tech Stack
React

TypeScript

Tailwind CSS

Radix UI (Dialog, Toast)

Fetch

## 🖼️ UI Highlights
Toast notifications for user feedback

Form loader with spinner

Responsive design for mobile and desktop

Simple and clean layout
