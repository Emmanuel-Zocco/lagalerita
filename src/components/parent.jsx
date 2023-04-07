import LoginPage from "./LoginPage";

const ParentComponent = () => {
  const authenticate = () => {
    // ...
  };
  const redirectTo = "/home";
  const signUpEndpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signupNewUser?key=AIzaSyABCE05u-QC9JErTA0Ing46YpgBXDinDG4";
  return <LoginPage authenticate={authenticate} redirectTo={redirectTo} signupEndpoint={signupEndpoint} />;
};

export default ParentComponent;
