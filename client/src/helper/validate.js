import toast from 'react-hot-toast'

// userName validation!
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}

// passworValidate
export async function passwordValidate(values) {
     const errors = passwordVerify({}, values);

     return errors;
}

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

        if(values.password !== values.confirm_password) {
            errors.exist = toast.error("PAssword not match!")
        }

    return errors;
}

export async function registerValidate(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

export async function profileValidate(values) {
    const errors = emailVerify({}, values);
    return errors;
}

// Password Verification
const passwordVerify = (errors = {}, values) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password) {
        errors.password = toast.error("Password Required!")
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Invalid Password!")
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4!")
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must contain special Characters")
    }
    return errors;
}


// userName verification
const usernameVerify = (error = {}, values) => {
    //you don't have values.username call error.username
    if(!values.username){
        error.username = toast.error('Username required!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username!")
    } 
    return error;
}

const emailVerify = (error = {}, values ) => {
    if (!values.email) {
        error.email = toast.error("Email Required");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...");
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...")
    }
    return error;
}
