import { Routes, Route } from "react-router-dom";
import './App.css'
import Hero from "./components/Hero"
import 'bootstrap/dist/css/bootstrap.min.css'
import EventsPage from "./pages/EventsPage"
import OurLocationPage from "./pages/OurLocationPage"
import TestPage from "./pages/TestPage"
import Layout from "./components/Layout"
import Dashboard from "./dashboard/DashboardLayout"
import Events from './dashboard/Events'
import Customers from './dashboard/Customers'
import Bookings from './dashboard/Bookings'
import NotFoundPage from "./pages/NotFoundPage";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/events" element={<EventsPage />} />
         <Route path="/location" element={<OurLocationPage />} />
         <Route path="/test" element={<TestPage />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/dashboard/events" element={<Events /> } />
         <Route path="/dashboard/customers" element={<Customers /> } />
         <Route path="/dashboard/bookings" element={<Bookings /> } />
         <Route path="*" element={ <NotFoundPage /> } />
        {/*<Route path="/events/:id" element={<Event />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:id" element={<Booking />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<Customer />} /> */}
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <Layout child={'home'}>
        <Hero />
      </Layout>
    </>
  );
}

export default App;
