import { useState, useEffect } from "react";

export default function useLocal() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        if (authUser) {
            setUser(authUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('authUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('authUser');
        }
    }, [user]);

    return { user, setUser }; 
}
