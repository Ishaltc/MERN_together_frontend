import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
import { ClipLoader } from "react-spinners";
export default function CreateComments({postId,user ,setComments,setCount}) {
  const [commentImage, setCommentImage] = useState("");
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [loading, setLoading] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
 
  const textRef = useRef(null);
  const imgInput = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    //accessing the textRef
    const ref = textRef.current;
    //when click emoji it get focused in textarea
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format isn't supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large.Max 5mb allowed`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      setCommentImage(event.target.result);
    };
  };
  // Comment function

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (commentImage != "") {
        setLoading(true);
        const img = dataURItoBlob(commentImage);
        const path = `${user.username}/$post_images/${postId}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const imgComment = await uploadImages(formData, path, user.token);
        const comments = await comment(
          postId,
          text,
          imgComment[0].url,
          user.token
        );
        //  console.log(comments);
       setComments(comments)
// setCount((prev)=> ++prev)
        setLoading(false);
        setText("");
        setCommentImage("");
      } else {
        setLoading(true);
        const comments = await comment(postId, text, "", user.token);
        setComments(comments)
        // setCount((prev)=> ++prev)
        setLoading(false);
        setText("");
        setCommentImage("");
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}

          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,images/png,images/gif,images/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="post_error comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try Again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Drop a comment...."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <ClipLoader size={20} color="#FF8C00" loading={loading} />
          </div>
          <div
            className="comment_circle_icon hover3"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover3"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover3">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover3">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
