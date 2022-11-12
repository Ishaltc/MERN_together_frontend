import { useRef, useState } from "react";
import { deletePost, savePost } from "../../functions/post";
import useClickOutside from "../../helpers/ClickOutside";
import MenuItem from "./MenuItem";
import { saveAs } from 'file-saver';
export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);

  const menu = useRef(null);

  useClickOutside(menu, () => setShowMenu(false));

  //post saving
  const saveHandler = async () => {
    savePost(postId, token);
    if(checkSaved){
      setCheckSaved(false)
    }else{
      setCheckSaved(true)
    }
  };
  //downloading images
  const downloadImages =async ()=>{
images.map((img)=>{
  saveAs(img.url,"image.jpg")
})
  }

  //deleting post
const removeHandler = async ()=>{
 const res =await  deletePost(postId,token)
 if(res.status === "okay"){
  // both way can use for getting refresh after delete post
  // postRef.current.style.display ="none"
  postRef.current.remove()
 }
}


  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="UnSave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}

      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notification for this post"
        />
      )}

      {imagesLength &&(
        <div onClick={()=>downloadImages()}>
       <MenuItem icon="download_icon" title="Download" />
       </div>
       )}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notification for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off transactions" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
       <div onClick={()=>removeHandler()}>
         <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
       </div>

      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
}
