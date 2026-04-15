import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import UserManagement from './components/admin/UserManagement'
import ScrollToTop from './components/shared/ScrollToTop'


const PageWrapper = ({ children }) => (
  <>
    <ScrollToTop />
    {children}
  </>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper><Home /></PageWrapper>
  },
  {
    path: '/login',
    element: <PageWrapper><Login /></PageWrapper>
  },
  {
    path: '/signup',
    element: <PageWrapper><Signup /></PageWrapper>
  },
  {
    path: "/jobs",
    element: <PageWrapper><Jobs /></PageWrapper>
  },
  {
    path: "/description/:id",
    element: <PageWrapper><JobDescription /></PageWrapper>
  },
  {
    path: "/profile",
    element: <PageWrapper><Profile /></PageWrapper>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/dashboard",
    element: <ProtectedRoute><PageWrapper><AdminDashboard/></PageWrapper></ProtectedRoute>
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><PageWrapper><Companies/></PageWrapper></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><PageWrapper><CompanyCreate/></PageWrapper></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><PageWrapper><CompanySetup/></PageWrapper></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><PageWrapper><AdminJobs/></PageWrapper></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PageWrapper><PostJob/></PageWrapper></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><PageWrapper><Applicants/></PageWrapper></ProtectedRoute> 
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
