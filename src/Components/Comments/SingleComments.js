import React, { useState } from 'react'
import { deleteComment, addChildComment, updateSingleComment } from '../../features/postSlice'
import { useDispatch } from 'react-redux'
import "./Comment.css"
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';


const Comments = ({ showInput, setShowInput, comm, post }) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("")

    const [updateComment, setUpdateComment] = useState("")

    const [showEditBox, setShowEditBox] = useState(false)

    const onChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className="card-text my-3">
            <p>
                {comm.name}
            </p>

            <div className={`mb-3 ${showEditBox ? "" : "invisible"}`}>
                <label htmlFor="exampleInputEmail1" className="form-label my-3"><b>Edit your comment</b></label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name='comments' onChange={(e) => setUpdateComment(e.target.value)} value={updateComment || ""} />
                <button className='btn btn-primary my-3' onClick={() => {
                    dispatch(updateSingleComment(
                        {
                            id: post.id,
                            comm_id: comm.id,
                            comment_name: updateComment

                        }

                        
                        ))
                        setShowEditBox(!showEditBox)
                        setUpdateComment("")
                }} >Submit</button>
            </div>


            {/* <div className={`mb-3 ${!showInput ? "invisible" : ""}`}>
                <label htmlFor="exampleInputEmail1" className="form-label mx-3">Your message</label>
                <input onChange={onChange} value={comment} type="text" className="form-control mx-3 " id="exampleInputEmail1" aria-describedby="emailHelp" />
                <button className='btn btn-primary mx-3 my-3' onClick={() => {
                    dispatch(addChildComment({ id: post.id, comm_id: comm.id, data: comment }))
                    setShowInput(false)
                    setComment("")
                }}>submit</button>
            </div> */}
            <div className="c-del">
                <DeleteIcon onClick={() => {
                    dispatch(deleteComment(
                        {
                            id: post.id,
                            comm_id: comm.id,
                            comment_name: comm.name
                        }
                    ))
                }

                } />
            </div>
            <div className="c-edit" onClick={() => {
                setShowEditBox(!showEditBox)
                setUpdateComment(comm.name)
            }}>
                <EditIcon />
            </div>
            <span className='margin' onClick={(e) => {
                setShowInput(!showInput)
                setComment('')

            }}>
                {!showInput ? "reply to this comment" : "cancel"}
            </span>
            <div className={`mb-3 ${!showInput ? "invisible" : ""}`}>
                <label htmlFor="exampleInputEmail1" className="form-label mx-3">Your message</label>
                <input onChange={onChange} value={comment} type="text" className="form-control mx-3 " id="exampleInputEmail1" aria-describedby="emailHelp" />
                <button className='btn btn-primary mx-3 my-3' onClick={() => {
                    dispatch(addChildComment({ id: post.id, comm_id: comm.id, data: comment }))
                    setShowInput(false)
                    setComment("")
                }}>submit</button>
            </div>

            <ol>

                {comm.reply.map((item, key) => {
                    return (
                        <li key={key} className="card-text mx-3">{item}</li>

                    )
                })}
            </ol>

            <div className="grey-line m-top">

            </div>
        </div>
    )
}

export default Comments