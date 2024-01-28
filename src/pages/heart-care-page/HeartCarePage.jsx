import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./heartcare.css" 
import HeartRate from "../../components/api/HeartRate";

const HeartCarePage = () => {
    const formik = useFormik({
        initialValues:{
            heartrate: "",
        },
        validationSchema: Yup.object({
            heartrate: Yup.string()
            .matches(/^[0-9]{1,3}$/, 'Must be an integer with 1 to 3 digits')
            .test('is-positive', 'Must be a positive integer', value => {
                if (value) {
                  return parseInt(value, 10) >= 0;
                }
                return true;
             })
            .required('Heart rate is required'),
        }),
        onSubmit: (values) =>{
            window.alert("Form submited")
        }
    });

    return (
        <section>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <div className="input-heart-rate">
                    <label> 心拍数 </label>
                    <input 
                        type="text" 
                        id="heartrate" 
                        name="heartrate"
                        value={formik.values.heartrate}
                        onChange={formik.handleChange}
                        placeholder="XX"
                    />
                </div>             
                {formik.errors.heartrate && (
                    <p className="errorMsg">{formik.errors.heartrate}</p>
                )}
                <label className="heart-info"> 
                    あなたの<br/>目標心拍数 
                    <HeartRate/>
                </label>

                <label className="heart-info">
                     目標達成
                     <div>
                        {formik.values.heartrate === <heartRate/>}
                     </div>
                </label>
                <button className="btn-submit" type="submit">運動完了</button>
            </form>
        </section>
    );
}

export default HeartCarePage;