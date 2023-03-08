import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './userContext';
import { AiOutlineMenu } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { IoIosLogOut, IoIosLogIn } from 'react-icons/io';
import { IoPersonAddOutline } from 'react-icons/io5';
import { FaBlogger } from 'react-icons/fa';


import Cookies from 'js-cookie';

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [setUserInfo]);
    const logout = () => {
        fetch('/logout', {
            credentials: 'include',
            method: 'GET',
        });
        setUserInfo(null);
        Cookies.remove("jwtoken");
    }
    const username = userInfo?.username;
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/"><FaBlogger className='text-warning' style={{ fontSize: "2rem" }} /> MyBlog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <AiOutlineMenu />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className='nav-link'></Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        {
                            username && (
                                <>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link to='/create' className='nav-link'><CiEdit /> New Blog</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href='/' onClick={logout} className='nav-link'>Logout <IoIosLogOut /></a>
                                        </li>
                                    </ul>
                                </>
                            )
                        }
                        {
                            !username && (
                                <>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link to="/login" className='nav-link'>Login <IoIosLogIn /></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register" className='nav-link'>Register <IoPersonAddOutline /></Link>
                                        </li>
                                    </ul>
                                </>
                            )
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header