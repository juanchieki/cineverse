import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toasts from "./components/Toasts";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="bg-[#231f10] text-white min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/my-list" element={<MyList />} />
            </Routes>
          </main>
          <Footer />
          <Toasts />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
