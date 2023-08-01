import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Homepage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Homepage;
