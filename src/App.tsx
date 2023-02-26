import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const DataInput = lazy(() => import('./pages/DataInput'));
const NoMatch = lazy(() => import('./pages/NoMatch'));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/data-input" element={<DataInput />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
