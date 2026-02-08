import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Corporate from './pages/landing/Corporate';
import Families from './pages/landing/Families';
import Trucking from './pages/landing/Trucking';
import Utilities from './pages/landing/Utilities';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import DriverHubLogin from './pages/DriverHubLogin';

// Regulation Pages
import DOTPhysical from './pages/regulations/DOTPhysical';
import DrugTesting from './pages/regulations/DrugTesting';
import AlcoholTesting from './pages/regulations/AlcoholTesting';

// Forms
import Forms from './pages/Forms';
import RespiratorQuestionnaire from './pages/forms/RespiratorQuestionnaire';
import RespiratorClearance from './pages/forms/RespiratorClearance';
import RespiratorFitTest from './pages/forms/RespiratorFitTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Audience Landing Pages */}
          <Route path="corporate" element={<Corporate />} />
          <Route path="employers" element={<Corporate />} />
          <Route path="families" element={<Families />} />
          <Route path="trucking" element={<Trucking />} />
          <Route path="cdl" element={<Trucking />} />
          <Route path="utilities" element={<Utilities />} />
          <Route path="fleet" element={<Utilities />} />
          
          {/* DOT Regulations */}
          <Route path="regulations/dot-physical" element={<DOTPhysical />} />
          <Route path="regulations/drug-testing" element={<DrugTesting />} />
          <Route path="regulations/alcohol-testing" element={<AlcoholTesting />} />
          
          {/* Forms */}
          <Route path="forms" element={<Forms />} />
          <Route path="forms/respirator-questionnaire" element={<RespiratorQuestionnaire />} />
          <Route path="forms/respirator-clearance" element={<RespiratorClearance />} />
          <Route path="forms/respirator-fit-test" element={<RespiratorFitTest />} />
          
          {/* Driver Hub Entry */}
          <Route path="driver-hub" element={<DriverHubLogin />} />
          <Route path="login" element={<DriverHubLogin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
