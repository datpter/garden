import { BASE_URL } from "./app.config"

/**
 * Hàm đăng nhập vào tài khoản người dùng
 * @param {loginUserDto} Object chứa username và password {username: "dat", password: "dat"}
 */
export const login = async function(url, loginUserDto) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(loginUserDto),
    });
    return response.json();
}