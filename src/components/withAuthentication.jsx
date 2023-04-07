import { Navigate } from 'react-router-dom';

function WithAuthentication(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = false; // Replace with actual authentication logic

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}
export default WithAuthentication