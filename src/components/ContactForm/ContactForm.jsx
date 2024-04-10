import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as yup from "yup";

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
  number: yup
    .string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
});

export default function ContactForm({ onAdd }) {
  const name = useId();
  const number = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor={name}>Name</label>
        <Field type="text" name="name" id={name} />
        <ErrorMessage name="name" component="div" />

        <label htmlFor={number}>Number</label>
        <Field type="text" name="number" id={number} />
        <ErrorMessage name="number" component="div" />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
