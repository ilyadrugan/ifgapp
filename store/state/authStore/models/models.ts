export type LoginByUserPasswordModel = {
    email: string;
    password: string;
};

export interface LoginByUserPasswordState {
    loginInputError?: string,
    passwordInputError?: string,
    errors?: LoginByUserPasswordStateErrors
}

export interface LoginByUserPasswordStateErrors {
    code: string;
    email: string;
    password: string;
    message: string;
}

export interface RegisterFormModel {
    name?: string,
    last_name?: string,
    phone?: string,
    password: string,
    password_confirmation?: string,
    email: string,
    birthday?: string,
    num_doc?: string,
    promocode?: string,
    sale?: boolean,
    tariff_id?: number
}

export interface RegisterFormState {
    nameInputError?: string,
    last_nameInputError?: string,
    phoneInputError?: string,
    promocodeInputError?: string,
    passwordInputError?: string,
    password_confirmationInputError?: string,
    emailInputError?: string,
    birthdayInputError?: string,
    num_docInputError?: string,
    errors?: RegisterFormStateErrors
}

export interface RegisterFormStateErrors {
    name: string;
    last_name: string;
    birthday: string;
    num_doc: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string,
    message: string;
}

export interface ForgotPasswordModel {
    email: string
}
