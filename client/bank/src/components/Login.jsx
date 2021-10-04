import { Form } from 'semantic-ui-react'
import { url } from '../util/data';
import { Formik } from 'formik';
import { loginformvalues as initialvalue } from '../util/initial-data';
import { loginformvalidation as schema } from '../util/validations';
import FormError from '../elements/FormError';
import {useHistory} from 'react-router-dom';

export default function Loginform({setloggedin}) {

    const history = useHistory();

    return (
        <div className="flex mt-4 justify-center items-center">
            <div className="w-4/5 md:w-2/5 p-5 m-6 bg-white rounded shadow-lg">
                <Formik
                    initialValues={initialvalue}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        fetch(`${url}/bank/login`,{
                            method:'POST',
                            headers:{'Content-Type':'application/json'},
                            body: JSON.stringify({
                                email:values.uuid,
                                password:values.password
                            })
                        }).then(response => response.json())
                        .then(data => {
                            if(data.success){
                                localStorage.setItem('amexloggedin',true);
                                localStorage.setItem('email',values.uuid);
                                setloggedin(true);
                            }
                        })
                        resetForm({ password: '' });
                    }}
                >
                    {props => {
                        const {
                            values,// eslint-disable-line
                            isSubmitting,
                            handleChange,// eslint-disable-line
                            handleBlur,// eslint-disable-line
                            handleSubmit,// eslint-disable-line
                            // setFieldValue,
                            // setFieldTouched,
                        } = props;
                        return (
                            <Form>
                                <h1 className="gray-600 text-3xl my-6 text-center font-bold">Bank Login</h1>
                                <Form.Input name="uuid" onChange={handleChange} onBlur={handleBlur} value={values.uuid} fluid label='Bank UUID' placeholder='Bank UUID' />
                                <FormError name="uuid" />
                                <Form.Input name="password" onChange={handleChange} onBlur={handleBlur} type="password" value={values.password} fluid label='Password' placeholder='Password' />
                                <FormError name="password" />
                                <div className="flex justify-around my-5">
                                <p onClick={() => history.push('/register')} className="f7 m-0 cursor-pointer hover:text-blue-400 text-gray-600">New to platform?</p>
                                <p onClick={() => history.push('/forget')} className="f7 m-0 cursor-pointer hover:text-blue-400 text-gray-600">Forgot password?</p>
                                </div>
                                <div className="flex justify-center"><Form.Button disabled={isSubmitting} onClick={handleSubmit} color="blue">Login</Form.Button></div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}