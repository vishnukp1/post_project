import { useRef} from "react";
import { POST } from "../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, addreply } from "../reducers/commentReducer";
import { v4 as uuidv4 } from "uuid";

const Post = () => {
  const comments = useSelector((state) => state.comment.value);
  const commentRef = useRef(null);
  const inputRef = useRef({});
  const dispatch = useDispatch();

  console.log(comments);

  const submitComment = (e) => {
    e.preventDefault();
    const data = commentRef.current.value;
    dispatch(addcomment({ id: uuidv4(), text: data }));
    commentRef.current.value = "";
  };

  const submitReply = (e, postId) => {
    e.preventDefault();
    const data = inputRef.current[postId].value;
    console.log("data", data);
    console.log("postid", postId);

    dispatch(
      addreply({ postId, comment: { id: uuidv4(), text: data, replies: [] } })
    );
    inputRef.current[postId].value = "";
  };

  return (
    <div className="flex-col items w-96 mt-12 pt-5 bg-gray-400 rounded-lg">
      <img src={POST} className="w-64 h-64 mb-5 ml-16 mt-2" alt="" />

      <form onSubmit={submitComment}>
        <input
          ref={commentRef}
          className="bg-gray-200 appearance-none border-2 border-gray-500 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          name="comment"
          type="text"
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Comment
        </button>
      </form>

      <div>
        {comments.map((item) => (
          <div key={item.id}>
            <p>{item.text}</p>

            <form onSubmit={(e) => submitReply(e, item.id)}>
              <input
                ref={(el) => (inputRef.current[item.id] = el)}
                className="bg-gray-200 appearance-none border-2 border-gray-500 rounded w-44 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="reply"
                type="text"
              />
              <button
                className="shadow bg-blue-300 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Add Reply
              </button>
            </form>

            {item.replies && item.replies.length > 0 && (
              <div className="ml-5">
                {item.replies.map((reply) => (
                  <div key={reply.id} className="">
                    {reply.text}
                    <form onSubmit={(e) => submitReply(e, reply.id)}>
                      <input
                        ref={(el) => (inputRef.current[reply.id] = el)}
                        className="bg-gray-200 appearance-none border-2 border-gray-500 rounded w-44 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        name="reply"
                        type="text"
                      />
                      <button
                        className="shadow bg-blue-300 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Add Reply
                      </button>
                    </form>
                    <div></div>
                    {reply.replies.map((reply) => (
                      <div key={reply.id} className="bg-slate-300">{reply.text}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
