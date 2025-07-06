import { useMutation } from "@tanstack/react-query";
import "./form.css";
import { motion } from "framer-motion";
import { loginUser } from "../../utils/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      dispatch(userActions.login(userData))
      const userId = userData._id
      navigate(`/${userId}/dashboard`)
    },
  });
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const userData = Object.fromEntries(data);
    mutate({ userData });
  }
  if (isPending) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return (
      <ErrorBlock
        title="An error occured while signing in"
        message={error.info?.message}
      />
    );
  }
  return (
    <motion.form
      className="login-container"
      animate={{ y: [30, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, type: "spring" }}
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={6}
          required
        />
      </div>
      <motion.button type="submit" whileHover={{ scale: 1.1 }}>
        Sign In
      </motion.button>
    </motion.form>
  );
}
