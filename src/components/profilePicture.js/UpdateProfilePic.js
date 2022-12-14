import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { newProfilePicture } from "../../functions/user";
import getCroppedImg from "../../helpers/getCroppedImg";
// import { uploadImages } from "../../../../backend/controllers/upload";

export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  PRef,
  setNewProfile,
  
}) {
  const dispatch = useDispatch();
  

  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));

 
  
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);




  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });

          setImage(img);
          //console.log("just show");
        } else {
          //console.log("not show");
          //console.log(img);
          return img;
        }
      } catch (error) {
        //console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
     
      const res = await uploadImages(formData, path, user.token);
      
      const updated_picture = await newProfilePicture(res[0].url, user.token);
     
      if (updated_picture === "okay") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          //   res[0].url,
          res,
          user.id,
          user.token
        );
    //     console.log(444444);
    // console.log({new_post})
        if (new_post === "okay") {
        
           // console.log({new_post:1})
          setLoading(false);
          setImage("");
          PRef.current.style.backgroundImage = `url(${res[0].url})`;
           setNewProfile((prev)=> !prev)
          Cookies.set("user", 
            JSON.stringify({
                ...user,
            picture: res[0].url,
            })
          );
          dispatch({
            type:"UPDATE_PICTURE",
            payload:res[0].url,
          })
          setShow(false);

          //
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(error.response.data.message);
   
    }
  };

  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImg("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      {/* <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div> */}
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button
          className="orange_btn"
          disabled={loading}
          onClick={() => updateProfilePicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}
