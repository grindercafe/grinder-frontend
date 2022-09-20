import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import EventsPage from "./pages/EventsPage"
import OurLocationPage from "./pages/OurLocationPage"
import TestPage from "./pages/TestPage"
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
import EventDetails from './dashboard/EventDetails'
import BookingDetails from "./dashboard/BookingDetails";


function App() {
  return (
    <ScrollToTop>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/location" element={<OurLocationPage />} />
            <Route path="/dashboard" element={<Navigate to={'/dashboard/events'} />} />
            <Route path="/dashboard/events" element={<Events />} />
            <Route path="/dashboard/events/:id" element={<EventDetails />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/bookings" element={<Bookings />} />
            <Route path="/dashboard/bookings/:id" element={<BookingDetails />} />
            <Route path="/bookings/:uuid" element={<Booking />} />
            <Route path="/dashboard/login" element={<Login />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/*<Route path="/events/:id" element={<Event />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<Booking />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Customer />} /> */}
          </Routes>
        </div>
      </ChakraProvider>
    </ScrollToTop>
  );
}

export default App;
