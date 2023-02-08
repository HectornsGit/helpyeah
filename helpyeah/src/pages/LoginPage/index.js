import LoginForm from "../../components/LoginForm";
import { useTokenContext } from "../../contexts/TokenContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { token } = useTokenContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <h2>Login</h2>

      <LoginForm />
    </section>
  );
};

export default LoginPage;
