import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import useClickOutside from "../../helpers/ClickOutside";
import "./style.css";
import UpdateProfilePic from "./UpdateProfilePic";

export default function ProfilePicture({ setShow, PRef, photos ,setNewProfile}) {
  // console.log(photos);
  const popup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  useClickOutside(popup, () => setShow(false));
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      setError(`${file.name} format isn't supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large.Max 5mb allowed`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      {/* if i wanna accept all types of files (image/* )*/}
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
      />
      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_orange_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon"></i>
              Upload Photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add Frame
            </button>
          </div>
        </div>
        {error && (
          <div className="post_error comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try Again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos && photos 
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
             .slice(0,6).map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={()=> setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
            {photos && photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .slice(0,6).map((photo) => (
                <img src={photo.secure_url} key={photo.public_id} alt="" onClick={()=> setImage(photo.secure_url)} />
              ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePic
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          PRef={PRef}
          setNewProfile={setNewProfile}
         
        />
      )}
    </div>
  );
}
