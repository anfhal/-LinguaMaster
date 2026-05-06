import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Learn from "@/pages/Learn";
import Progress from "@/pages/Progress";
import Community from "@/pages/Community";
import Achievements from "@/pages/Achievements";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/learn/:courseId/:module" element={<Learn />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/community" element={<Community />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/:action" element={<Auth />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌍</span>
                  </div>
                  <span className="font-bold text-gray-800">LinguaMaster</span>
                </div>
                <p className="text-sm text-gray-500">
                  Learn any language anytime, anywhere with immersive learning experiences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Languages</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><button className="hover:text-primary-600 transition-colors">English</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Japanese</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Korean</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><button className="hover:text-primary-600 transition-colors">Vocabulary</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Grammar</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Speaking</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Listening</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><button className="hover:text-primary-600 transition-colors">Help Center</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Contact Us</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Privacy Policy</button></li>
                  <li><button className="hover:text-primary-600 transition-colors">Terms of Service</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
              <p>© 2024 LinguaMaster. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
