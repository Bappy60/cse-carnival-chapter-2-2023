
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Redirection from './Common/Redirection'
import SuperAdminLogin from './SuperAdmin/SuperAdminLogin'
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard/Dashboard'
import OTPInput from './Common/OTPPage'
import SuperAdminOutlet from './Outlets/SuperAdminOutlet'
import CareProviderRegister from './CareProvider/Registration/CareProviderRegister'
import CompleteProfile from './Common/CompleteProfile'
import CareProviderDashboard from './CareProvider/Dashboard/CareProviderDashboard'
import CareProviderLogin from './CareProvider/Registration/CareProviderLogin'
import MemberRegister from './Members/Registration/MemberRegistyer'
import CompleteandEditProfile from './Members/Profile/CompleteandEditProfile'
import MemberDashboard from './Members/Profile/MemberDashboard'
import Calednly from './SuperAdmin/CalendlyTest'
import AllCareProviders from './Members/AppointmentBooking/AllCareProviders'
import BookAppointment from './Members/AppointmentBooking/BookAppointment'
import MemberOUtlet from './Outlets/MemberOutlet'
import CareOUtlet from './Outlets/CareOutlet'
import RateUSer from './Members/AppointmentBooking/RateUser'
import MemberLogin from './Members/Registration/MemberLogin'
import Questions from './Members/Questions'
import CreateBlog from './CareProvider/Blogs/BlogCreate'
import AllBlogs from './Common/AllBlogs'
import ViewBlog from './Common/ViewBlog'
import RepresentativeRegister from './Representative/RepresentativeRegistration/RepresentativeRegister'
import RepresentativeHomePage from './Representative/HomePage/RepresentariveHomePage'
import CreateSession from './Representative/SessionCreate/CreateForm'

function App() {
  return (
 <div>
  <Routes>
  <Route path="/represent/register" element={<RepresentativeRegister />}></Route>
  <Route path="/represent/home" element={<RepresentativeHomePage />}></Route>
  <Route path="/represent/sessioncreate" element={<CreateSession />}></Route>

  <Route path="/member/register" element={<MemberRegister />}></Route>
  <Route path="/member/login" element={<MemberLogin />}></Route>
  <Route path="/member/onboarding" element={<CompleteandEditProfile />}></Route>
  <Route path="/member" element={<MemberDashboard />}></Route>
  <Route path="/allblogs" element={<AllBlogs />}></Route>
  <Route path="/viewblog/:id" element={<ViewBlog />}></Route>

    <Route path="/" element={<Redirection/>}></Route>
  <Route path="/cp/register" element={<CareProviderRegister />}></Route>
  <Route path="/member/*" element={<MemberOUtlet />}>
  <Route path="questions" element={<Questions />}></Route>

  <Route path="showcareproviders" element={<AllCareProviders />}></Route>
  <Route path="review/:id" element={<RateUSer />}></Route>

  <Route path="showprovider/:id" element={<BookAppointment />}></Route>
</Route>
  <Route path="/cp/onboarding" element={<CompleteProfile />}></Route>
  <Route path="/cp/login" element={<CareProviderLogin />}></Route>
  <Route path="/calendly" element={<Calednly />}></Route>
<Route path='/createblog' element={<CreateBlog/>}></Route>

  <Route path="/cp/*" element={<CareOUtlet />}>
  <Route path="" element={<CareProviderDashboard />}></Route>
  </Route>

<Route path='/adminlogin' element={<SuperAdminLogin/>}></Route>
<Route path="/superadmin/*" element={<SuperAdminOutlet />}>
  <Route path=''element={<SuperAdminDashboard/>}></Route>
</Route>
<Route path="/otp" element={<OTPInput />}></Route>

</Routes>
 </div>
  )
}

export default App