// import { useId } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { nanoid } from 'nanoid'
// import * as Yup from "yup";

// const initialValues = {
//   name: "",
//   number: "",
// };

// export default function ContactForm({ onAdd }) {
//   const name = useId();
//   const number = useId();
  
//   const handleSubmit = (values, actions) => {
//     console.log(values);
//     onAdd(values);
//     actions.resetForm();
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//       <Form>
//         <label htmlFor={name}>Name</label>
//         <Field type="text" name="name" id={name} required/>

//         <label htmlFor={number}>Number</label>
//         <Field type="number" name="number" id={number} required/>

//         <button type="submit">Add contact</button>
//       </Form>
//     </Formik>
//   );
// }

import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from 'nanoid';
import * as yup from 'yup';

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  number: yup.string()
    .required('Number is required')
    .min(3, 'Number must be at least 3 characters')
    .max(50, 'Number must not exceed 50 characters')
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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