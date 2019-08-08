import React, {useState, useEffect} from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserList from './List'

const UserForm = ({values, errors, touched, status}) => {

    const [users, setUsers] = useState ([])

    useEffect(() => {
        if(status){
            setUsers(users => [...users, status]);
        }
        console.log(users)
    }, [status]);

    // Name
    // Email
    // Password
    // Terms of Service (checkbox)
    // A Submit button to send our form data to the server.

    return (
        <div>
            <h1> OnBoarding Form </h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}

                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                
                <label>
                    Accept Terms of Service
                    <Field type="checkbox" name="terms" checked={values.terms} />
                    {touched.terms && errors.terms && (<p className="error">{errors.terms}</p>)}
                </label>

                <button type="submit">Submit</button>
            </Form>
            {users.map((user) => {
                return <UserList key={user.name} user={user} />
            })}
        </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false, 
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('name is required'),
        email: Yup.string().email().required('email is required'),
        password: Yup.string().required('password is required'),
        terms: Yup.boolean()
    }),

    handleSubmit( values, {resetForm, setStatus}){
        console.log(values)
        // https://reqres.in/api/users
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log("response:", res)
                setStatus(res.data)
                resetForm();
            })
            .catch(err => {
                console.log("error:", err.response)
            })
    },

})(UserForm);

export default FormikUserForm;