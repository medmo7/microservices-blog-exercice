import React from 'react'

export default function CommentList({ comments}) {

    const renderedComment = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })

    return (
        <div>
            {renderedComment}
        </div>
    )
}
