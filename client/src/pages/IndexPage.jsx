import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import Loading from '../Loading';
import Post from '../Post'

const IndexPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
            setLoading(false);
        })
    }, []);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='container mt-4'>
                    {posts.length > 0 && posts.map((post, i) => (
                        <Post key={i} {...post} />
                    ))}
                </div>)}
            <Footer />
        </>
    )
}

export default IndexPage