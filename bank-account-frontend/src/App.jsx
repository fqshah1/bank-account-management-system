import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 👇 correct imports
import CreateAccount from "./components/CreateAccount";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import CheckBalance from "./components/CheckBalanceForm";
import UserSummary from "./components/UserSummary";

// 👇 simple Home component so "/" route works
function Home() {
  return <h1 className="text-2xl font-bold">Welcome to Bank Account Management</h1>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 flex gap-4">
          <Link to="/create-account" className="text-blue-600 hover:underline">
            Create Account
          </Link>
          <Link to="/deposit" className="text-blue-600 hover:underline">
            Deposit
          </Link>
          <Link to="/withdraw" className="text-blue-600 hover:underline">
            Withdraw
          </Link>
          <Link to="/balance" className="text-blue-600 hover:underline">
            Check Balance
          </Link>
          <Link to="/summary" className="text-blue-600 hover:underline">
            User Summary
          </Link>
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/balance" element={<CheckBalance />} />
            <Route path="/summary" element={<UserSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
