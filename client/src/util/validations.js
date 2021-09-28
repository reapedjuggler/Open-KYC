import * as Yup from 'yup';
import {ref} from "yup";

export const regformvalidation = Yup.object().shape({
    firstname: Yup.string()
        .trim()
        .matches(/^[a-z A-Z]+$/, "Invalid name "),
    lastname: Yup.string()
        .trim()
        .matches(/^[a-z A-Z]+$/, "Invalid name "),
    email: Yup.string()
        .trim()
        .email("Not a valid email address")
        .required("Required"),
    phone: Yup.string()
        .required("Required")
        .matches(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,"Invalid Number!"),//eslint-disable-line
    istrue: Yup.bool()
        .required("Required"),

})

export const loginformvalidation = Yup.object().shape({
    uuid: Yup.string()
        .trim()
        .required("Required"),
    password: Yup.string()
        .trim()
        .required("Required")
        .min(8, "Too short - minimum 8 characters required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password Must contain number & uppercase letters")
})

export const forgotformvalidation = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Not a valid email address")
        .required("Required")
})

export const resetformvalidation = Yup.object().shape({
    otp: Yup.string()
        .trim()
        .required("Required"),
    password: Yup.string()
        .trim()
        .required("Required")
        .min(8, "Too short - minimum 8 characters required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password Must contain number & uppercase letters"),
    confirm_password: Yup.string("*Please confirm the password.")
		.trim()
		.required("*Please confirm the password.")
		.oneOf([ref('password'), null], 'Passwords must match'), 
})