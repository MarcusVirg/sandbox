import React from 'react'

const CommentDetail = ({ author, timeAgo, text, avatarUrl }) => {
    return (
        <div className="comment">
            <a href="/" className="avatar">
                <img alt="avatar" src={avatarUrl} />
            </a>
            <div className="content">
                <a href="/" className="author">
                    {author}
                </a>
                <div className="metadata">
                    <span className="date">
                        {timeAgo}
                    </span>
                </div>
                <div className="text">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default CommentDetail