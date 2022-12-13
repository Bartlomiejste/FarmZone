import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  Name: yup
    .string()
    .min(2, "Za krótkie!")
    .max(50, "Za długie!")
    .required("Wymagane"),
  Email: yup
    .string()
    .email()
    .min(2, "Za krótkie!")
    .max(50, "Za długie!")
    .required("Wymagane"),
  Message: yup.string().min(5, "Za krótkie!").required("Wymagane"),
});
