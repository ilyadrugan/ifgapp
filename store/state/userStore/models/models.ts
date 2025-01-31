export type UserInfo = {
    id: number,
    name: string;
    phone: string;
    last_name: string;
    email: string;
    profile_photo_url: string;
    birthday: string;
    ifg_level: string;
    city: string;
}

export type UserChangeInfoModel = {
    name: string;
    phone: string;
    city?: string;
    photo?: string;
    last_name: string;
    // birthday: string;
    email: string;
    passwordData: UserPasswordChangeModel
}
export type UserPasswordChangeModel = {
    current_password: string;
    password: string;
    password_confirmition: string;
}

export type UserChangeInfoState = {
    nameInputError?: string,
    last_nameInputError?: string,
    phoneInputError?: string,
    emailInputError?: string,
    current_passwordInputError?: string;
    passwordInputError?: string;
    password_confirmitionInputError?: string,
    errors?: UserChangeInfoErrors
}

export interface UserChangeInfoErrors {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}
