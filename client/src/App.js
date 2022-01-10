import React from 'react'
import PostCreat from './PostCreat'
import PostList from './PostList'

export default function App() {
    return (
        <div className='container'>
            <h1>Create Post</h1>
            <PostCreat/>
            <hr/>
            <h1>Posts</h1>
            <PostList/>

        </div>
    )
}
