import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './heartcare.css'
import { getHeartRateOfUser } from '../../api/heart-rate/getHeartRateOfUser'

const DEFAULT_USER_INFRO = {
    id: '',
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '...',
    images: ['...', '...', '...'],
}

const HeartCarePage = () => {
    const [user, setUser] = useState(DEFAULT_USER_INFRO)
    const [isShowSubmitBtn, setIsShowSubmitBtn] = useState("-")

    useEffect(() => {
        async function getProduct() {
            const response = await getHeartRateOfUser(1)
            const users = await response.json()
            setUser(users)
        }
        getProduct()
    }, [])

    const formik = useFormik({
        initialValues: {
            heartrate: '',
        },
        validationSchema: Yup.object({
            heartrate: Yup.string()
                .min(1)
                .max(3)
                .test('is-positive', 'Must be a positive integer', (value) => {
                    console.log("rate", user.stock);
                    console.log("value: " + value);
                    if (value < 0) {
                        return false;
                    }
                    if (value >= user.stock) {
                        setIsShowSubmitBtn("O");
                    } else if(value < user.stock){
                        setIsShowSubmitBtn("X");
                    } else {
                        setIsShowSubmitBtn("-");
                    }

                    return true
                })
                .required('Heart rate is required'),
        }),
        onSubmit: (values) => {
            window.alert('Form submited')
        },
    })

    return (
        <section>
            <form className="info-form" onSubmit={formik.handleSubmit}>
                <div className="input-heart-rate">
                    <label> 心拍数 </label>
                    <div className="msg-area">
                        <input
                            type="text"
                            id="heartrate"
                            name="heartrate"
                            value={formik.values.heartrate}
                            onChange={formik.handleChange}
                            placeholder="XX"
                        />
                        {formik.errors.heartrate && (
                            <span className="error-msg">
                                {formik.errors.heartrate}
                            </span>
                        )}
                    </div>
                </div>

                <div className="heart-info">
                    <div className="heart-rate-standard">
                        あなたの
                        <br />
                        目標心拍数
                        <br />
                        {user.stock}
                    </div>

                    <div className="heart-rate-level">
                        目標達成
                        <span className='heart-rate-icon'>{isShowSubmitBtn}</span>
                    </div>
                </div>
                <button
                    className="btn-submit"
                    type="submit"
                    disabled={formik.errors.heartrate ? true : false}
                >
                    運動完了
                </button>
            </form>
        </section>
    )
}

export default HeartCarePage
