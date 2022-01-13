import axios from 'axios'
import React from 'react'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default function PostList() {


    const [posts, setPosts] = React.useState({})

    React.useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts')

        setPosts(res.data)
    }

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div
                className='card'
                style={{ width: '30%', marginBottom: '20px' }}
                key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    )
}
