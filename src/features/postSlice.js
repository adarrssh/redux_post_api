import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postArray: []
}

// single post structure
// {
//     "id": "postId",
//     "title": "Post title",
//     "description": "Post description",
//     "comments": [
//         {
//             "id":"comment id ",
//             "name": "comment name",
//             "reply": ["reply to comment", "reply to comment"]

//         },
//         {
//             "id":"comment id ",
//             "name": "comment name",
//             "reply": ["reply", "reply"]

//         }
//     ]

// },




const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // post reducres
        postAdded: {
            reducer(state, action) {
                state.postArray.push(action.payload)
            }
        },
        deletePost: {
            reducer(state, action) {
                let post = state.postArray
                let el = post.filter((item) => item.id !== action.payload.id)
                state.postArray = el
            }
        },
        updatePost: {
            reducer(state, action) {
                let post = state.postArray.findIndex((item) => item.id === action.payload.id)
                state.postArray[post].title = action.payload.title
                state.postArray[post].description = action.payload.description

            }
        },
        // comments reducers
        addSingleComment: {
            reducer(state, action) {
                const findId = state.postArray.findIndex((item) => item.id === action.payload.id)
                const comm_id = action.payload.comm_id
                const data = action.payload.data.comments;
                const obj = {
                    "id": comm_id,
                    "name": data,
                    "reply": []
                }

                state.postArray[findId].comments.push(obj)
            }
        },
        updateSingleComment: {
            reducer(state, action) {
                const PostId = state.postArray.findIndex((item) => item.id === action.payload.id);
                let CommentIndex = state.postArray[PostId].comments.findIndex((el) => el.id === action.payload.comm_id)
                state.postArray[PostId].comments[CommentIndex].name = action.payload.comment_name;
            }
        },
        deleteComment: {
            reducer(state, action) {
                const findIndex = state.postArray.findIndex((item) => item.id === action.payload.id)
                const comm_id = action.payload.comm_id
                const post = state.postArray[findIndex].comments.filter((el) => el.id !== comm_id)
                state.postArray[findIndex].comments = post

            }
        },
        addChildComment: {
            reducer(state, action) {
                const PostId = state.postArray.findIndex((item) => item.id === action.payload.id);
                let CommentIndex = state.postArray[PostId].comments.findIndex((el) => el.id === action.payload.comm_id)
                let post = state.postArray[PostId].comments[CommentIndex].reply.concat(action.payload.data);
                state.postArray[PostId].comments[CommentIndex].reply = post
            }
        }
    }
})

export const {

    postAdded,
    deletePost,
    updatePost,
    deleteComment,
    addSingleComment,
    addChildComment,
    updateSingleComment 
} = postSlice.actions

export default postSlice.reducer

