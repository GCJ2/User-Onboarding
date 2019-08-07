import React from 'react'
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const UserForm = ({ values, handleChange, errors, touched }) => {

  return(
    <div className="form-div">
      <h1>New User Onboarding</h1>
        <Form className="form-wrapper">
          <div>
            {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type='name' name='name' placeholder='Name' />
          </div>
          <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type='email' name='email' placeholder='Email' />
          </div>
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type='password' name='password' placeholder='Password' />
          </div>
          <div>
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
            <label>
              <Field type="checkbox" name="tos" checked={values.tos} />
              Please agree to Terms of Service
            </label>
          </div>
          <button type="submit">Submit</button>
        </Form>
    </div>
    )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos, hearaboutus }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    email: Yup.string().email('Email not valid').required('Valid email required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a valid password'),
    tos: Yup.bool().oneOf([true],('You must agree to the terms of service'))
  }),
  handleSubmit(values) {
    console.log(values);
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        console.log(res);
      })
  }
})(UserForm)

export default FormikUserForm
