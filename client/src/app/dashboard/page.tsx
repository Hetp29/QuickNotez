'use client';
import PrivateRoute from '../components/PrivateRoute';

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Welcome to the Dashboard</h1>
        {/* Add more dashboard content here */}
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
