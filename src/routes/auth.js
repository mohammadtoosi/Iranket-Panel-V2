const base = "https://app.iranket.com/";

const auth = {
    check: base + "rest/otp?mobile=",
    login: base + "rest/login",
    requestOtp: base + "rest/otp",
    register: base + "rest/register",
    logout: base + "rest/logout",
};

export default auth;
