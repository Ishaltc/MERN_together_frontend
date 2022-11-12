import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/ClickOutside";

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const oldCovRef = useRef(null);
  useClickOutside=(oldCovRef,()=> setShow(false))
  return (
    <div className="blur" ref={oldCovRef}>
      <div className="postBox selectCoverBox">
        <div className="box_header">
          <div className="small_circle" onClick={()=>{
            setShow(false);
          }}>
            <i className="exit_icon"></i>
          </div>
          <span>Select Photos</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
          <div className="old_pictures_wrap scrollbar">
            <div className="old_pictures">
              {photos &&
                photos
                  .filter(
                    (img) => img.folder === `${user.username}/cover_pictures`
                  )
                  .slice(0, 6)
                  .map((photo) => (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      alt=""
                      onClick={() => {
                        setCoverPicture(photo.secure_url);
                        setShow(false);
                      }}
                    />
                  ))}
            </div>

            <div className="old_pictures">
              {photos &&
                photos
                  .filter(
                    (img) => img.folder !== `${user.username}/post_images`
                  )
                  .slice(0, 6)
                  .map((photo) => (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      alt=""
                      onClick={() => {
                        setCoverPicture(photo.secure_url);
                        setShow(false);
                      }}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
