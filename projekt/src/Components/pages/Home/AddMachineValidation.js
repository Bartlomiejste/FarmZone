import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  Category: yup.string().required("Required"),
  Name: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Damage: yup.string().required("Required"),
  Condition: yup.string().required("Required"),
  Price: yup.number().min(1).required("Required"),
});
