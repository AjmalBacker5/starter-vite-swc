import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import BottomNavigationBar from "./components/BottomNavigationBar";
import ChatInterface from "./components/ChatInterface";
import ProfileCreation from "./components/ProfileCreation";
import ProfileSection from "./components/ProfileSection";
import WelcomePage from "./components/WelcomePage";
import EnterPhoneNumberPage from "./components/EnterPhoneNumberPage";
import OTPVerificationPage from "./components/OTPVerificationPage";
import UserInfoPage from "./components/UserInfoPage";
import routes from "tempo-routes";

// Lazy load components for better performance
const MatchesSection = lazy(() => import("./components/MatchesSection"));
const PreferencesSection = lazy(
  () => import("./components/PreferencesSection"),
);
const DetailedProfilePage = lazy(
  () => import("./components/DetailedProfilePage"),
);
const EditProfile = lazy(() => import("./components/EditProfile"));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {/* Authentication Flow */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/enter-phone" element={<EnterPhoneNumberPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />

          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/matches"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <MatchesSection />
              </Suspense>
            }
          />
          <Route path="/messages" element={<ChatInterface />} />
          <Route
            path="/preferences"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <PreferencesSection />
              </Suspense>
            }
          />
          <Route path="/profile" element={<ProfileSection />} />
          <Route
            path="/edit-profile"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <EditProfile />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <DetailedProfilePage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
      </Suspense>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <BottomNavigationBar />
    </div>
  );
}

export default App;
