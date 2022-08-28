import { Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import EventsPage from "./pages/EventsPage"
import OurLocationPage from "./pages/OurLocationPage"
import TestPage from "./pages/TestPage"
import Dashboard from "./dashboard/DashboardLayout"
import Events from './dashboard/Events'
import Customers from './dashboard/Customers'
import Bookings from './dashboard/Bookings'
import Booking from './pages/Booking'
import NotFoundPage from "./pages/NotFoundPage";
import { ChakraProvider } from "@chakra-ui/react";
import { HomePage } from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import ScrollToTop from "./ScrollToTop";
import Login from "./dashboard/Login";


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/location" element={<OurLocationPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/bookings/:uuid" element={<Booking />} />
          <Route path="/dashboard/login" element={<Login />} />
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
