import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Pages/auth';
import Dashboard from './Pages/Dashboard';
import ConnectAnalytics from './Pages/auth/connect-analytics';
import SelectAnalyticsAccount from './Pages/auth/SelectAnalyticsAccount_Property';
import LoginWithSameAccountError from './Pages/auth/login-with-same-account-error';


function App() {
  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/connect-analytics' element={<ConnectAnalytics />} />
          <Route path='/select-analytics-account' element={<SelectAnalyticsAccount />} />
          <Route path='/login-with-same-account' element={<LoginWithSameAccountError />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
