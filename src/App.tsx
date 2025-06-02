import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/style.css';

import Header from './layouts/HomeHeader';
import Footer from './layouts/HomeFooter';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register'
import About from './pages/AboutUs';
import Contact from './pages/contact';

import Dashboard from './pages/User/user'
import Featured1 from './layouts/UserLayouts/FeaturedMotorcycles';
import Settings from './pages/User/Settings';
import Status from './pages/User/Status.tsx'
import Motorcycles from './pages/User/motorcycles'
import Support_help from './pages/User/SupportHelp'

import Profiles from './pages/User/profile'

import HondaA from './pages/User/MotorDetails/HondaADV';
import HondaX from './pages/User/MotorDetails/HondaX.tsx';
import Honda_Click from './pages/User/MotorDetails/HondaClick.tsx';
import HondaAlpha from './pages/User/MotorDetails/HondaAlpha.tsx';
import HondaRS from './pages/User/MotorDetails/HondaRS.tsx';
import KawasakiK from './pages/User/MotorDetails/KawasakiKLX.tsx';
import KawasakiBarako from './pages/User/MotorDetails/KawasakiBarako.tsx';
import KawasakiCT from './pages/User/MotorDetails/KawasakiCT.tsx';
import KawasakiCT100B from './pages/User/MotorDetails/KawasakiCT100B.tsx';
import SuzukiF from './pages/User/MotorDetails/SuzukiFI.tsx';
import SuzukiG from './pages/User/MotorDetails/SuzukiGSX.tsx';
import Suzuki_Burgman from './pages/User/MotorDetails/SuzukiBurgman.tsx';
import YamahaM from './pages/User/MotorDetails/YamahaMio.tsx';
import YamahaMioi125 from './pages/User/MotorDetails/YamahaMioi125.tsx';
import YamahaMioSporty from './pages/User/MotorDetails/YamahaMioSporty.tsx';


import Installment from './layouts/UserLayouts/InstallmentCalculator/Installment';


import AdminDashboard from './pages/Admin/admin';
import Profiles2 from './pages/Admin/AdminProfile';
import AdminSettings from './pages/Admin/AdminSetting';

import AdminMotorcycles from './pages/Admin/AdminMotorcycles/admin-motorcycles.tsx';
import AddMotorcycle from './pages/Admin/AdminMotorcycles/AddMotorcycle';

import AdminHondaA from './pages/Admin/AdminMotorcycleDetails/aHondaADV';
import AdminHondaX from './pages/Admin/AdminMotorcycleDetails/aHondaX';
import AdminKawasakiK from './pages/Admin/AdminMotorcycleDetails/aKawasakiKLX';
import AdminSuzukiF from './pages/Admin/AdminMotorcycleDetails/aSuzukiFI';
import AdminSuzukiG from './pages/Admin/AdminMotorcycleDetails/aSuzukiGSX';
import AdminYamahaM from './pages/Admin/AdminMotorcycleDetails/aYamahaMio';
import Details from './pages/Admin/AdminMotorcycleDetails/details';

import UserManagement from './pages/Admin/UserManagement';

import ApplicationRequest from './pages/Admin/ApplicationRequest.tsx';

import Forms from './pages/User/form';
import Pendings from './pages/User/ApplicationForms/pending.tsx';

import ProtectedRoute from './components/ProtectedRoute';

import { NotificationProvider } from './contexts/NotificationContext';
import { SidebarProvider } from './contexts/SidebarContext';

const App = () => {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Header" element={<Header />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/user" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
            <Route path="/featured" element={<ProtectedRoute role="user"><Featured1 /></ProtectedRoute>} />
            <Route path="/Settings" element={<ProtectedRoute role="user"><Settings /></ProtectedRoute>} />
            <Route path="/Status" element={<ProtectedRoute role="user"><Status /></ProtectedRoute>} />
            <Route path="/Motorcycles" element={<ProtectedRoute role="user"><Motorcycles /></ProtectedRoute>} />
            <Route path="/SupportHelp" element={<ProtectedRoute role="user"><Support_help /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute role="user"><Profiles /></ProtectedRoute>} />

            <Route path="/form" element={<ProtectedRoute role="user"><Forms /></ProtectedRoute>} />

            <Route path="/HondaADV" element={<ProtectedRoute role="user"><HondaA /></ProtectedRoute>} />
            <Route path="/HondaX" element={<ProtectedRoute role="user"><HondaX /></ProtectedRoute>} />
            <Route path="/HondaClick" element={<ProtectedRoute role="user"><Honda_Click /></ProtectedRoute>} />
            <Route path="/HondaAlpha" element={<ProtectedRoute role="user"><HondaAlpha /></ProtectedRoute>} />
            <Route path="/HondaRS" element={<ProtectedRoute role="user"><HondaRS /></ProtectedRoute>} />
            <Route path="/KawasakiKLX" element={<ProtectedRoute role="user"><KawasakiK /></ProtectedRoute>} />
            <Route path="/KawasakiBarako" element={<ProtectedRoute role="user"><KawasakiBarako /></ProtectedRoute>} />
            <Route path="/KawasakiCT" element={<ProtectedRoute role="user"><KawasakiCT /></ProtectedRoute>} />
            <Route path="/KawasakiCT100B" element={<ProtectedRoute role="user"><KawasakiCT100B /></ProtectedRoute>} />
            <Route path="/SuzukiFI" element={<ProtectedRoute role="user"><SuzukiF /></ProtectedRoute>} />
            <Route path="/SuzukiGSX" element={<ProtectedRoute role="user"><SuzukiG /></ProtectedRoute>} />
            <Route path="/YamahaMio" element={<ProtectedRoute role="user"><YamahaM /></ProtectedRoute>} />
            <Route path="/YamahaMioi125" element={<ProtectedRoute role="user"><YamahaMioi125 /></ProtectedRoute>} />
            <Route path="/YamahaMioSporty" element={<ProtectedRoute role="user"><YamahaMioSporty /></ProtectedRoute>} />
            <Route path="/SuzukiBurgman" element={<ProtectedRoute role="user"><Suzuki_Burgman /></ProtectedRoute>} />

            <Route path="/InstallmentCalculator" element={<Installment motorcyclePrice={0} onClose={() => {}} />} />

            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-profile" element={<ProtectedRoute role="admin"><Profiles2 /></ProtectedRoute>} />
            <Route path="/admin-setting" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin-motorcycles" element={<ProtectedRoute role="admin"><AdminMotorcycles /></ProtectedRoute>} />
            <Route path="/add-motorcycle" element={<ProtectedRoute role="admin"><AddMotorcycle /></ProtectedRoute>} />

            <Route path="/aHondaADV" element={<ProtectedRoute role="admin"><AdminHondaA /></ProtectedRoute>} />
            <Route path="/aHondaX" element={<ProtectedRoute role="admin"><AdminHondaX /></ProtectedRoute>} />
            <Route path="/aKawasakiKLX" element={<ProtectedRoute role="admin"><AdminKawasakiK /></ProtectedRoute>} />
            <Route path="/aSuzukiFI" element={<ProtectedRoute role="admin"><AdminSuzukiF /></ProtectedRoute>} />
            <Route path="/aSuzukiGSX" element={<ProtectedRoute role="admin"><AdminSuzukiG /></ProtectedRoute>} />
            <Route path="/aYamahaMio" element={<ProtectedRoute role="admin"><AdminYamahaM /></ProtectedRoute>} />

            <Route path="/details" element={<ProtectedRoute role="admin"><Details /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
            <Route path="/ApplicationRequest" element={<ProtectedRoute role="admin"><ApplicationRequest /></ProtectedRoute>} />
            <Route path="/Pending" element={<ProtectedRoute role="user"><Pendings /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </SidebarProvider>
  );
};

export default App;