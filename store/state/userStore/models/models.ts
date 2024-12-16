export type UserInfo = {
    name: string;
    phone: string;
    last_name: string;
    email: string;
    profile_photo_url: string;
    birthday: string;
}

export type UserChangeInfoModel = {
    name: string;
    phone: string;
    city?: string;
    photo?: string;
    last_name: string;
    // birthday: string;
    email: string;
    // passwordData: {
    //     old: string;
    //     new: string;
    //     repeat: string;
    // }
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
    errors?: UserChangeInfoErrors
}

export interface UserChangeInfoErrors {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}
