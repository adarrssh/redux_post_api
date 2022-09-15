import React from 'react'
import { useState } from 'react';
import SingleComments from "../Comments/SingleComments"
import { addSingleComment, deletePost } from '../../features/postSlice';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./Comment.css"
import { nanoid } from '@reduxjs/toolkit';

const Comments_body = ({ post, editPost }) => {

    const dispatch = useDispatch()

    const [showInput, setShowInput] = useState(false)

    const [addComment, setAddComment] = useState({ comments: "" });
    // console.log(addComment);

    const onChangeComm = (e) => {
        setAddComment({ ...addComment, [e.target.name]: e.target.value })
    }

    const addComm=(id,addComment)=>{
        console.log(id,addComment);
        dispatch(addSingleComment({ id: post.id, comm_id: nanoid(), data: addComment }))
        setAddComment({comments:""})
    }


    return (
        <div key={post.id} className='col-lg-6'>
            <div className="card" >
                <div className="card-body">
                    <h3 className="card-title">
                    <i>
                        {post.title}
                    </i>
                    </h3>
                    
                    <p className="card-text"><i>{post.description}</i></p>
                    <div className='icon' onClick={() => { dispatch(deletePost({ id: post.id })) }}>
                        <DeleteIcon />
                    </div>
                    <div className="edit-icon" onClick={() => { editPost(post.id, post.title, post.description) }}>
                        {/* dispatch(updatePost({ id:post.id, title: post.title })) */}
                        <EditIcon />
                    </div>
                    <div className="grey-line"></div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label my-3"><b>Post a comment</b></label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            name='comments' placeholder='type your comment' onChange={onChangeComm} value={addComment.comments} />
                        <button onClick={() => { addComm(post.id,addComment) }} className='btn btn-primary my-3'>Submit</button>
                    </div>
                    <h6 className='my-3'><b>Comments</b></h6>
                    <div className="grey-line my-3">

                    </div>

                    {post.comments.map((comm, key) => {

                        return (

                            <SingleComments post={post} key={key} comm={comm} showInput={showInput} setShowInput={setShowInput} />

                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Comments_body