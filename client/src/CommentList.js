import React from 'react'

export default function CommentList({ comments}) {

    const renderedComment = comments.map(comment => {
        let content;
        if (comment.status === 'approved') {
            content = comment.content
        }
        if (comment.status === 'rejected') {
            content = 'This comment has been rejected'
        }
        if (comment.status === 'pending') {
            content = 'Content waiting moderation'
        }

        return <li key={comment.id}>{content}</li>
    })

    return (
        <div>
            {renderedComment}
        </div>
    )
}
