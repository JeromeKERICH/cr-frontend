import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PaymentSuccess from "../pages/ecommerce/PaymentSuccess";



import ClientLayout from "../components/layout/ClientLayout";
import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "../pages/client/Dashboard";
import Cases from "../pages/client/Cases";

import AdminDashboard from "../pages/admin/Dashboard";
import Clients from "../pages/admin/Clients";
import Register from "../pages/auth/Register";
import AdminBookings from "../pages/admin/Bookings";
import AdminProducts from "../pages/admin/Products";
import AdminPayments from "../pages/admin/Payments";
import Products from "../pages/ecommerce/Products";
import ProductDetails from "../pages/ecommerce/ProductDetails";
import Retainers from "../pages/ecommerce/Retainers";
import LawyerDashboard from "../pages/lawyer/Lawyer";
import LawyerLayout from "../components/layout/LawyerLayout";
import Users from "../pages/admin/Users";
import Home from "../pages/public/Home";
import PublicLayout from "../components/layout/PublicLayout";
import About from "../pages/public/About";
import AdminTeam from "../pages/admin/Team";
import CorporateLaw from "../pages/public/practice/CorparateLaw";
import ContractDrafting from "../pages/public/practice/Contract";
import IntellectualProperty from "../pages/public/practice/Interlectialproperty";
import EmploymentLaw from "../pages/public/practice/EmploymentLaw";
import BusinessAdvisory from "../pages/public/practice/Business";
import DisputeResolution from "../pages/public/practice/Dispute";
import AdminBlogs from "../pages/admin/Blog";
import CreateBlog from "../pages/admin/CreateBlog";
import BlogPage from "../pages/public/Blog";
import Contact from "../pages/public/Contact";







export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

      <Route element={<PublicLayout/>}>

    <Route path="/" element={<Home/>}/>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/retainers" element={<Retainers/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/practice-areas/corporate-law" element={<CorporateLaw/>}/>
        <Route path="/practice-areas/contract-drafting" element={<ContractDrafting/>}/>
        <Route path="/practice-areas/intellectual-property" element={<IntellectualProperty/>}/>
        <Route path="/practice-areas/employment-law" element={<EmploymentLaw/>}/>
        <Route path="/practice-areas/business-advisory" element={<BusinessAdvisory/>}/>
        <Route path="/practice-areas/dispute-resolution" element={<DisputeResolution/>}/>
        <Route path="/insights" element={<BlogPage />} />
        <Route path="/contact" element={<Contact/>}/>
        {/* <Route path="/insights/:slug" element={<BlogDetails />} /> */}

    </Route>
        

        {/* CLIENT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="client">
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="cases" element={<Cases />} />
        </Route>

        {/* LAWYER */}
        <Route
          path="/lawyer"
          element={
            <ProtectedRoute role="lawyer">
              <LawyerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LawyerDashboard />} />

        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="clients" element={<Clients />} />

   

      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute role="admin">
            <AdminBookings />
          </ProtectedRoute>
        }
      />

    <Route
        path="/admin/blog"
        element={
          <ProtectedRoute role="admin">
            <AdminBlogs />
          </ProtectedRoute>
        }
      />

        <Route
          path="/admin/blogs/create"
          element={
          <ProtectedRoute role="admin">
          <CreateBlog/>
          </ProtectedRoute>
          }
        />

    <Route
        path="/admin/team"
        element={
          <ProtectedRoute role="admin">
            <AdminTeam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/lawyers"
        element={
        <ProtectedRoute role="admin">
          <Users />
        </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute role="admin">
            <AdminProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute role="admin">
            <AdminPayments />
          </ProtectedRoute>
        }
      />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
