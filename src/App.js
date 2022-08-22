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
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { HomePage } from "./pages/HomePage";



function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/location" element={<OurLocationPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="*" element={<NotFoundPage />} />
          {/*<Route path="/events/:id" element={<Event />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:id" element={<Booking />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<Customer />} /> */}
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
