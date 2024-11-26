export type UserInfo = {
    name: string;
    phone: string;
    last_name: string;
    email: string;
    profile_photo_url: string;
    birthday: string;
}

export type UserChangeInfo = {
    name: string;
    phone: string;
    last_name: string;
    birthday: string;
    email: string;
    passwordData: {
        old: string;
        new: string;
        repeat: string;
    }
}

