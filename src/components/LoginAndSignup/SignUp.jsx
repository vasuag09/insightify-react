import { useMutation } from "@tanstack/react-query";
import "./form.css";
import { motion, scale } from "framer-motion";
import { signUpUser } from "../../utils/http";
import ErrorBlock from "../UI/ErrorIndicator";
import LoadingIndicator from "../UI/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (userData) => {
      dispatch(userActions.login(userData));
      const userId = userData._id;
      navigate(`/${userId}/dashboard`);
    },
    onError: (error) => {
      console.log(error);
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
        title="An error occured while signing up"
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
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required />
      </div>
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
        Create Account
      </motion.button>
    </motion.form>
  );
}
