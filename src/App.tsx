import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CourseProvider } from "@/context/CourseContext";
import { EnrollmentProvider } from "@/context/EnrollmentContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import VideoLearning from "./pages/VideoLearning";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import { ManageCourses } from "./pages/dashboards/ManageCourses";
import { CreateCourse } from "./pages/dashboards/CreateCourse";
import { StudentStats } from "./pages/dashboards/StudentStats";
import { MyCourses } from "./pages/dashboards/MyCourses";
import { UserManagement } from "./pages/dashboards/UserManagement";
import { CategoryManagement } from "./pages/dashboards/CategoryManagement";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound.tsx";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CourseProvider>
            <EnrollmentProvider>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/learn/:courseId/:lessonId" element={<VideoLearning />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
                
                {/* Dashboard Routes with Sidebar Layout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  {/* Instructor Routes */}
                  <Route path="manage" element={<ManageCourses />} />
                  <Route path="create" element={<CreateCourse />} />
                  <Route path="edit/:id" element={<CreateCourse />} />
                  <Route path="students" element={<StudentStats />} />
                  {/* Student Routes */}
                  <Route path="courses" element={<MyCourses />} />
                  {/* Admin Routes */}
                  <Route path="users" element={<UserManagement />} />
                  <Route path="categories" element={<CategoryManagement />} />
                  <Route path="courses-admin" element={<ManageCourses />} />
                  {/* Fallback for other dashboard sub-routes */}
                  <Route path="*" element={<Dashboard />} />
                </Route>

                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </EnrollmentProvider>
          </CourseProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
