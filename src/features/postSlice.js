import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postArray: [

        {
            "id": "0",
            "title": "This is title",
            "description": "This is description",
            "comments": [
                {
                    "id":"2312",
                    "name": "comment1",
                    "reply": ["one", "two"]

                },
                {
                    "id":"fdasfasdfs",
                    "name": "comment2",
                    "reply": ["one", "two"]

                }
            ]

        },
        {
            "id": "1",
            "title": "This is title 2",
            "description": "This is description",
            "comments": [

            ]


        }

    ]

}

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
                const id = action.payload.id
                let post = state.postArray
                let el = post.filter((item)=>item.id!==id)
                state.postArray=el
            }
        },
        updatePost: {
            reducer(state, action) {
                console.log(action.payload);
                let id = action.payload.id
                let post = state.postArray.findIndex((item)=>item.id===id)
                console.log(post);

                state.postArray[id].title=action.payload.title
                state.postArray[id].description=action.payload.description

            }
        },
        // comments reducers
        addSingleComment: {
            reducer(state, action) {
                // console.log(action.payload);
                const id = action.payload.id;
                const comm_id= action.payload.comm_id
                const data = action.payload.data.comments;
                console.log(id,comm_id,data);
                const obj = {
                    "id":comm_id,
                    "name": data,
                    "reply": []
                }

                state.postArray[id].comments.push(obj)
            }
        },
        deleteComment: {
            reducer(state, action) {
                console.log(action.payload);
                const id = action.payload.id
                const comm_id = action.payload.comm_id
                const post = state.postArray[id].comments.filter((el) => el.id !== comm_id)
                state.postArray[id].comments = post

            }
        },
        addChildComment: {
            reducer(state, action) {
                const id = action.payload.id;
                const comment_id = action.payload.comm_id
                const data = action.payload.data
                console.log(action.payload);
                let findId = state.postArray[id].comments.findIndex((el)=>el.id === comment_id)
                console.log(findId);
                let post = state.postArray[id].comments[findId].reply.concat(data)
                console.log(post);

                state.postArray[id].comments[findId].reply=post

                // let replyArray = initialState.postArray[id].comments.filter((obj)=>obj.name===parentComment)[0]
                // console.log(replyArray);
                // let newData = replyArray[0].reply.map((item)=> item)
                // newData.push(subComment)
            }
        }
    }
})

export const { postAdded, deletePost, updatePost, deleteComment, deleteSubComment, addSingleComment, addChildComment } = postSlice.actions

export default postSlice.reducer

