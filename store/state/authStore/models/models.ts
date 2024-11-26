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
