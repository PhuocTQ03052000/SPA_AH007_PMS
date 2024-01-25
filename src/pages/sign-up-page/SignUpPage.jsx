
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css" 

const SignUpPage = () => {
    const formik = useFormik({
        initialValues:{
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(4,"Must be 4 characters or more"),
            phone: Yup.string().required("Required").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/,"Must be a valid phone number"),
            email: Yup.string().required("Required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email"),
            password: Yup.string().required("Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be valid"),
            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match")
        }),
        onSubmit: (values) =>{
            window.alert("Form submited")
        }
    });

    return (
        <section>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <label> Your name </label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter your name"
                />
                {formik.errors.name && (
                    <p className="errorMsg">{formik.errors.name}</p>
                )}
                <label> Phone </label>
                <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="Enter your phone number"
                />
                {formik.errors.phone && (
                    <p className="errorMsg">{formik.errors.phone}</p>
                )}
                <label> Email address </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter your email"
                />
                {formik.errors.email && (
                    <p className="errorMsg">{formik.errors.email}</p>
                )}
                <label> Password </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter your password"
                />
                {formik.errors.password && (
                    <p className="errorMsg">{formik.errors.password}</p>
                )}
                <label> Confirm password </label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    placeholder="Confirm your password"
                />
                {formik.errors.confirmPassword && (
                    <p className="errorMsg">{formik.errors.confirmPassword}</p>
                )}
                <button 
                    type="submit">Continue</button>
            </form>
        </section>
    );
}

export default SignUpPage;