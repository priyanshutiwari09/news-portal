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

// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
function Layout() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/SignUp" ||
    location.pathname == "/CreateNews";

  return (
    <>
      {!hideLayout && <NavBar />}
      {!hideLayout && <Menus />}

      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CreateNews" element={<CreateNews />} />
        <Route path="/MyNews" element={<MyNews />} />
        <Route path="/edit/:id" element={<EditNews />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;
