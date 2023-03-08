import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import Footer from "../Footer";
import Loading from "../Loading";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
            setLoading(false);
        });
    }, [id]);

    if (!postInfo) return '';

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="container mt-4 postpage">
                    <h1>{postInfo.title}</h1>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                    <div className="author">by @{postInfo.author.username}</div>
                    {userInfo.id === postInfo.author._id && (
                        <div className="edit-row">
                            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                                <CiEdit /> Edit this post
                            </Link>
                        </div>
                    )}
                    <div className="image">
                        <img src={`/${postInfo.cover}`} alt="" />
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
            )}
            <Footer />
        </>
    );
}