import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  Login: yup
    .string()
    .min(2, "Too Short!")
    .matches("Admin")
    .max(50, "Too Long!")
    .required("Required"),
  Password: yup
    .string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
