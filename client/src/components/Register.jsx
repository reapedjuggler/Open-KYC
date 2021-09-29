import { Form } from 'semantic-ui-react'
import { url } from '../util/data';
import { Formik } from 'formik';
import { regformvalues as initialvalue } from '../util/initial-data';
import { regformvalidation as schema } from '../util/validations';
import FormError from '../elements/FormError';

export default function Registerform() {
    return (
        <div className="flex mt-4 justify-center items-center">
            <div className="w-4/5 md:w-3/5 p-5 m-6 bg-white rounded shadow-lg">
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
                                <h1 className="gray-600 text-3xl my-6 text-center font-bold">Register Yourself</h1>
                                <Form.Group widths='equal'>
                                    <Form.Input name="firstname" onChange={handleChange} onBlur={handleBlur} value={values.firstname} fluid label='First name' placeholder='First name' />
                                    <FormError name="firstname" />
                                    <Form.Input name="lastname" onChange={handleChange} onBlur={handleBlur} value={values.lastname} fluid label='Last name' placeholder='Last name' />
                                    <FormError name="lastname" />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} fluid label='Email' placeholder='Email' />
                                    <FormError name="email" />
                                    <Form.Input name="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone} fluid label='Phone Number' placeholder='Phone Number' />
                                    <FormError name="phone" />
                                </Form.Group>
                                <Form.Checkbox name="istrue" onChange={handleChange} onBlur={handleBlur} value={values.istrue} label='I agree all the information provided is true' />
                                <FormError name="istrue" />
                                <div className="flex justify-center"><Form.Button disabled={isSubmitting} onClick={handleSubmit} color="blue">Submit</Form.Button></div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}