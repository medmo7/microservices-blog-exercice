import axios from 'axios'
import React from 'react'

export default function CommentList({postId}) {

    const [comments, setComments] = React.useState([])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)

        setComments(res.data)
    }

    React.useEffect(() => {
        fetchData()
    },[])

    const renderedComment = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })

    return (
        <div>
            {renderedComment}
        </div>
    )
}
