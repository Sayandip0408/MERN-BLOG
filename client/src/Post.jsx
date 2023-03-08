import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'/' + cover} alt="post" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <p className="author">{author.username}</p>
                    <p>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</p>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    )
}

export default Post