import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get('jwtoken');
        console.log(userToken);
        if (!userToken || userToken === null) {
            setIsLoggedIn(false);
            navigate('/login');
        }
        else {
            setIsLoggedIn(true);
        }
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            <Component />
        </React.Fragment>
    );
}
export default ProtectedRoute;