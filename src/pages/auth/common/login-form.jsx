import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser, setToken } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
const schema = yup
  .object({
    username: yup.string().required("Username is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (response.error) {
        throw new Error(response.error.data.message);
      }

      if (response.data.error) {
        throw new Error(response.data.data.error);
      }

      if (!response.data.token) {
        throw new Error("Invalid credentials");
      }

      dispatch(setUser(data));
      dispatch(setToken(response.data.token));
      navigate("/dashboard");
      // localStorage.setItem("user", JSON.stringify(response.data.data.user));
      console.log("response", response);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const [checked, setChecked] = useState(false);
  console.log("errors", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="username"
        label="username"
        defaultValue=""
        placeholder="Type your username here"
        type="text"
        register={register}
        error={errors.username}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        defaultValue=""
        placeholder="Type your password here"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      {/* <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div> */}

      <Button
        type="submit"
        text="Sign in"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
