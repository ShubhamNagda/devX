import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { ImagePlus } from "lucide-react";
import axios from "axios";

const UploadPost = ({ onBack }) => {
  const [user, _] = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("")
  const [err, setErr] = useState(false)

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);

  };

  const upload = async () => {
    if(!content && !images.length > 0){
      setErr(true)
    }
  try {
    const formData = new FormData();

    formData.append("content", content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL_POSTS}/createpost`,
      formData,
      {
        withCredentials: true,
      }
    );

    onBack(); 
  } catch (error) {
    console.error(error);
  }
  }

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {err ? <h1 className="text-red-600">Must required content or atleast one image </h1>: <div></div>}
      <div className="p-4">
        <h1
          onClick={onBack}
          className="cursor-pointer active:scale-95"
        >
          ← Back
        </h1>
      </div>

      <div className="flex flex-col items-center gap-3">
        <textarea
          placeholder="Write here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-11/12 bg-[#1c2633] p-2 rounded-xl outline-none resize-none h-30"
        />

        <input
          type="submit"
          value="Post"
          onClick={upload}
          className="absolute top-3 right-7 bg-blue-600 p-2 px-4 rounded-xl cursor-pointer active:scale-95"
        />

        <div className="w-full flex ml-15">
          <label className="cursor-pointer">
            <ImagePlus className="w-6 h-6 text-white" />

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {images.length > 0 && (
          <div className="w-11/12 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div key={index} className="relative shrink-0">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPost;