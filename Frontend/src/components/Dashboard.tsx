import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  name: string;
  email: string;
}

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<TokenPayload>(token) : null;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-green-600">
        {decoded ? `Welcome, ${decoded.name} 👋` : "User not logged in"}
      </div>
      {/* Additional dashboard content can be added here */}
    </div>
  );
}
