// <======== Exporting Interfaces ========>
export interface SignUpRequestBody {
    fullName: string,
    email: string,
    password: string,
    profileUrl: string,
    signUpCode: number,
};

export interface SignInRequestBody {
    email: string,
    password: string,
};