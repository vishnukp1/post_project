import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addcomment: (state, action) => {
      state.value.push({
        id: action.payload.id,
        text: action.payload.text,
        replies: [],
      });
    },
    addreply: (state, action) => {
      const { postId, comment } = action.payload;

      const post = state.value.find(post => post.id === postId);
      if (post) {
        post.replies.push(comment);
      }else{
        for(let i=0;i< state.value.length;i++){
            const post = state.value[i].replies.find(post => post.id === postId);
            post.replies.push(comment);
        }
      
      }
    },
  },
})

export const { addcomment, addreply } = commentSlice.actions;

export default commentSlice.reducer;