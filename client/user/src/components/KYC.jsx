import { Form } from "semantic-ui-react";
import React, { useState } from "react";
import { url } from "../util/data";
import { Formik } from "formik";
import { kycformvalues as initialvalue } from "../util/initial-data";
import { kycformvalidation as schema } from "../util/validations";
import FormError from "../elements/FormError";
import { useHistory } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";

export default function RegisterformKYC() {
	const history = useHistory();

	const [iserror, setiserror] = useState(false);

	if (iserror) {
		return (
			<React.Fragment>
				<div className="flex flex-column items-center justify-center bg-white ma3 br2 vh-75">
					<p className="f3 gray">Something Went Wrong!</p>
					<button
						className="mt4 fw6 f6 bn dim br1 ph3 pointer pv2 dib white"
						style={{ background: "#6EB6FF" }}
						onClick={() => history.push("/")}
					>
						Go Back
					</button>
				</div>
			</React.Fragment>
		);
	}

    return (
        <div className="flex mt-4 justify-center items-center">
            <div className="w-11/12 md:w-3/5 p-5 m-6 bg-white rounded shadow-lg">
                <Formik
                    initialValues={initialvalue}
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        fetch(`${url}/kyc/apply`,{
                            method:'POST',
                            headers:{'Content-Type':'application/json'},
                            body: JSON.stringify({
                                bank: values.bank === "HDFC"?"A":"B", 
                                email: values.email, 
                                aadhar: values.aadhar, 
                                pan: values.pan
                            })
                        }).then(response => response.json())
                        .then(data => {
                            if(data.success){
                                history.push('/dashboard');
                            }
                            else{
                                setiserror(true)
                            }
                        }).catch(()=> setiserror(true));
                        // resetForm({ values: '' });
                    }}
                >
                    {props => {
                        const {
                            values,// eslint-disable-line
                            handleChange,// eslint-disable-line
                            handleBlur,// eslint-disable-line
                            handleSubmit,// eslint-disable-line
                            setFieldValue,
                            // setFieldTouched,
                        } = props;
                        return (
                            <Form>
                                <h1 className="gray-600 text-3xl my-6 text-center font-bold">KYC Details</h1>
                                <Form.Group widths='equal'>
                                    <Form.Input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} fluid label='Email' placeholder='Email' />
                                    <FormError name="email" />
                                    <Form.Input name="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone} fluid label='Phone Number' placeholder='Phone Number' />
                                    <FormError name="phone" />
                                </Form.Group>
                                <Form.Input name="bank" onChange={handleChange} onBlur={handleBlur} value={values.firstname} fluid label='Bank Name' placeholder='Bank Name' />
                                <FormError name="bank" />
                                <Form.Input name="aadhar" onChange={handleChange} onBlur={handleBlur} value={values.firstname} fluid label='Aadhar Number' placeholder='Aadhar Number' />
                                <FormError name="aadhar" />
                                <DropzoneArea
                                    fileObjects={values.aadhar_file}
                                    filesLimit={2}
                                    maxFileSize = {3000000}
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Drag and drop or click to add front/back of your Aadhar card image"}
                                    onChange={(file) => {
                                        if(file.length >0){
                                        let reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFieldValue('aadhar_file',reader.result);
                                          };
                                        reader.readAsDataURL(file[0]);
                                        }
                                    }}
                                />
                                <FormError name="aadhar_file" />
                                <Form.Input name="pan" onChange={handleChange} onBlur={handleBlur} value={values.firstname} fluid label='Pan Number' placeholder='Pan Number' />
                                <FormError name="pan" />
                                <DropzoneArea
                                    fileObjects={values.pan_file}
                                    filesLimit={1}
                                    maxFileSize = {3000000}
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Drag and drop or click to add your Pan card image"}
                                    onChange={(file) => {
                                        if(file.length >0){
                                        let reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFieldValue('pan_file',reader.result);
                                          };
                                        reader.readAsDataURL(file[0]);
                                        }
                                    }}                                />
                                <FormError name="pan_file" />
                                <div className="mt-4">
                                    <Form.Checkbox name="istrue" onChange={handleChange} onBlur={handleBlur} value={values.istrue} label='I agree all the information provided is true' />
                                    <FormError name="istrue" />
                                </div>
                                <div className="flex justify-center mt-4"><Form.Button onClick={handleSubmit} color="blue">Submit</Form.Button></div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}
