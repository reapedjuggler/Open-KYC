import { Form } from 'semantic-ui-react'
import { url } from '../util/data';
import { Formik } from 'formik';
import { resetformvalues as initialvalue } from '../util/initial-data';
import { resetformvalidation as schema } from '../util/validations';
import FormError from '../elements/FormError';

export default function Loginform() {
    return (
        <div className="min-h-screen flex bg-gray-50 justify-center items-center">
            <div className="w-4/5 md:w-2/5 p-5 m-6 bg-white rounded shadow-lg">
                <Formik
                    initialValues={initialvalue}
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("hey", values, url);
                        // setSubmitting(true);
                        // resetForm({ values: '' });
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
                                <h1 className="gray-600 text-3xl my-6 text-center font-bold">Forget Password</h1>
                                <Form.Input name="otp" onChange={handleChange} onBlur={handleBlur} value={values.otp} fluid label='One Time Password' placeholder='One Time Password' />
                                <FormError name="otp" />
                                <Form.Input name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} fluid label='Password' placeholder='Password' />
                                <FormError name="password" />             
                                <Form.Input name="confirm_password" onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} fluid label='Confirm Password' placeholder='Confirm Password' />
                                <FormError name="confirm_password" />
                                <div className="flex justify-center"><Form.Button disabled={isSubmitting} onClick={handleSubmit} color="blue">Change Password</Form.Button></div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}