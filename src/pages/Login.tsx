import { LoginForm } from "@/components/login-form"
import { Navigate } from "react-router-dom";


export default function LoginPage() {
  const token = sessionStorage.getItem("authToken");
if (token) return <Navigate to="/" replace />;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}