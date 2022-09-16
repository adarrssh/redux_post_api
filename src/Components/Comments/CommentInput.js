// import React from 'react'
// import { useState } from 'react';
// import { useDispatch } from 'react-redux'
// import { deleteComment, addChildComment } from '../../features/postSlice'
// import DeleteIcon from '@mui/icons-material/Delete';


// const CommentInput = ({ comm, showInput, setShowInput, post }) => {
//     const dispatch = useDispatch()
//     const [comment, setComment] = useState("")

//     const onChange = (e) => {
//         setComment(e.target.value)
//     }

//     return (
//         <>
//             <p >
//                 {comm.name}
//             </p>
//             <DeleteIcon onClick={() => { dispatch(deleteComment({ id: post.id, comm_id: comm.id, comment_name: comm.name })) }} />
//             <span className='margin' onClick={(e) => {
//                 setShowInput(!showInput)

//             }}>
//                 {!showInput ? "reply to this comment" : "cancel"}
//             </span>
//             <div className={`mb-3 ${!showInput ? "invisible" : ""}`}>
//                 <label htmlFor="exampleInputEmail1" className="form-label mx-3">Your message</label>
//                 <input onChange={onChange} value={comment} type="text" className="form-control mx-3 " id="exampleInputEmail1" aria-describedby="emailHelp" />
//                 <button className='btn btn-primary mx-3 my-3' onClick={() => { dispatch(addChildComment({ id: post.id, comm_id: comm.id, data: comment })) }}>submit</button>
//             </div>
//         </>
//     )
// }

// export default CommentInput