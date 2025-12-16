import { useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './components/Landing';
import To_Do from './components/To_Do';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = "Task_Scheduler";
  }, []);

  return (
    <Routes>
      {/* Public routes without Layout/Sidebar */}
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected routes with Layout/Sidebar */}
      <Route path="/" element={<Layout />}>
        <Route path="todo" element={<To_Do />} />
        <Route path="profile" element={<div>Profile Page Coming Soon</div>} />
      </Route>
    </Routes>
  );
}

export default App;