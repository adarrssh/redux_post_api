/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useRef } from 'react'
import "./Home.css"
import { useSelector, useDispatch } from 'react-redux'
import { postAdded, updatePost } from '../../features/postSlice'
import { nanoid } from '@reduxjs/toolkit'
import Comments_body from '../Comments/Comments_body'

const Home = () => {
    // console.log(nanoid.id);
    const dispatch = useDispatch()
    const ref = useRef(null)
    const { postArray } = useSelector((store) => store.post)
    // console.log(postArray);



    const [addPost, setAddPost] = useState({ title: "", description: "", comments: [] })
    const [updateNote, setUpdateNote] = useState({ id: "", title: "", description: "" });

    const onUpdateChange = (e) => {
        setUpdateNote({ ...updateNote, [e.target.name]: e.target.value })
    }

    const onChange = (e) => {
        setAddPost({ ...addPost, [e.target.name]: e.target.value })
    }

    const editPost = (id, title, description) => {
        ref.current.click();
        // console.log(id, title, description);
        setUpdateNote({ id: id, title: title, description: description })
    }
    // console.log(updateNote);



    // console.log(addPost);

    return (
        <div className='container my-3'>
            {/* <!-- Button trigger modal --> */}
            <div>



                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add a Post</h5>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div className="grey-line">

                    </div>
                    <div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label my-3">Post Title</label>
                                <input type="text" className="form-control" aria-describedby="emailHelp"
                                    name='title'
                                    value={addPost.title || ""}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Post Description</label>
                                <input type="text" className="form-control"
                                    name='description'
                                    value={addPost.description || ""}
                                    onChange={onChange} />
                            </div>

                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        </form>


                    </div>
                    <div className="modal-footer">
                        <button onClick={() => {
                            dispatch(postAdded(
                                {
                                    id: nanoid(),
                                    title: addPost.title,
                                    description: addPost.description,
                                    comments: addPost.comments
                                }))
                        setAddPost({ title: "", description: "", comments: [] })
                        
                            }
                        }

                            type="button" className="btn btn-primary mx-3">Save</button>
                        <button type="button" className="btn btn-secondary" >Close</button>
                    </div>
                </div>
                <div className="grey-line my-3">

                </div>

            </div>



            <div className="row post">


                {postArray.map((post, key) => {
                    // console.log(post);
                    return (
                        <>
                            < Comments_body editPost={editPost} post={post} key={key} />
                        </>
                    )
                })}

            </div>

            {/* <!-- Popup Modal for Post --> */}
            <button ref={ref} type="button" className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add a Post
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Post Title</label>
                                    <input type="text" className="form-control" aria-describedby="emailHelp"
                                        name='title'
                                        value={updateNote.title || ""}
                                        onChange={onUpdateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Post Description</label>
                                    <input type="text" className="form-control"
                                        name='description'
                                        value={updateNote.description || ""}
                                        onChange={onUpdateChange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                dispatch(updatePost({
                                    
                                    id: updateNote.id,
                                    title: updateNote.title,
                                    description: updateNote.description
                                }))
                            }
                            
                        } type="button" className="btn btn-primary" data-bs-dismiss="modal">save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home