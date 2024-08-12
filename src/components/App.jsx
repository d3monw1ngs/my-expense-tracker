import { HomePage } from "./Home/HomePage";
import { SignupForm } from "./SignupForm/SignupForm";
import { SigninForm } from "./SigninForm/SigninForm";

export const App = () => {
  return (
    <div>
      <HomePage />
      <SignupForm />
      <SigninForm />
    </div>
  );
};
