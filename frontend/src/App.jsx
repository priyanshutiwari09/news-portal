import "./App.css";
import Menus from "./components/layout/Menus";
import NavBar from "./components/layout/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import NewsDetail from "./components/news/NewsDetail";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUp from "./components/auth/SignUp";
import NewsList from "./components/news/NewsList";
import CreateNews from "./components/news/CreateNews";
import MyNews from "./components/news/MyNews";
import EditNews from "./components/news/EditNews";
import About from "./components/layout/About";
import Contact from "./components/layout/Contact";
import Advertise from "./components/layout/Advertise";
import Terms from "./components/layout/Terms";
import Privacy from "./components/layout/Privacy";
import Cookies from "./components/layout/Cookies";

// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
function Layout() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/SignUp" ||
    location.pathname === "/CreateNews";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sticky Navbar */}
      {!hideLayout && (
        <div className="sticky top-0 z-50">
          <NavBar />
        </div>
      )}

      {/* Sticky Menus */}
      {!hideLayout && (
        <div className="sticky top-[4rem] z-40">
          <Menus />
        </div>
      )}

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CreateNews" element={<CreateNews />} />
          <Route path="/MyNews" element={<MyNews />} />
          <Route path="/edit/:id" element={<EditNews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App;
