import { useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import CropImage from '../CropImg'
import { Spinner } from "flowbite-react";
import { ImagePlus } from "lucide-react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { addStory } from "../../services/api/user/apiMethods";


function AddStoryModal({ setAddStoryModal, setUserStory }) {
    const selectUser = (state) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    const [isLoading, setIsLoading] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isCroppeSelected, setIsCroppeSelected] = useState(false);
    const [croppedImage, setCroppedImage] = useState("");
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            images: "",
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async () => {
            setIsLoading(true);
            let imageUrls = "";
            let isVideo = false
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            console.log('res', response, blob);
            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", "fqmpgsjl");
            // Determine the correct Cloudinary upload URL based on the MIME type
            let uploadUrl;
            if (blob.type.startsWith('image/')) {
                uploadUrl = "https://api.cloudinary.com/v1_1/dg5lcmwvr/image/upload";
            } else {
                isVideo = true
                uploadUrl = "https://api.cloudinary.com/v1_1/dg5lcmwvr/video/upload";
            }

            try {
                const res = await axios.post(
                    uploadUrl,
                    formData,
                )

                console.log('res', res);
                const imageUrl = res.data.secure_url;
                imageUrls = imageUrl;
            } catch (error) {
                console.log("Error uploading image:", error);
            }

            addStory({
                userId,
                imageUrls,
                isVideo
            })
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200) {
                        toast.info(data.message);
                        setIsLoading(false);
                        setUserStory(response.data);
                        resetState();
                        handleCancelClick();
                    } else {
                        console.log(response.message);
                        toast.error(data.message);
                    }
                })
                .catch((error) => {
                    toast.error(error?.message);
                    console.log(error?.message);
                });
        },
    });

    const handleCancelClick = () => {
        formik.values.images = "";
        setCroppedImage('');
        resetState();
        setAddStoryModal(false);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.setAttribute("accept", "image/*,video/*");
        fileInputRef.current?.click();
    };

    const resetState = () => {
        setCroppedImage("");
        formik.values.images = "";
    };

    const handleCloseCanvas = () => {
        setIsCroppeSelected(!isCroppeSelected);
    };

    return (
        <div className="addpost-popup z-50" >
            <div className="addpost-popup">
                <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto w-full flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg h-3/4 max-w-md">
                    <p className="font-semibold text-3xl text-center m-3">Create Story</p>
                    <hr />
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex ">
                            <div className=" w-full">
                                <div
                                    onClick={handleButtonClick}
                                    className="image-preview flex items-center bg-white shadow-lg justify-center h-96 cursor-pointer"
                                >
                                    {!formik.values.images.length && (
                                        <div className="flex flex-col gap 10 items-center">
                                            {(!formik.values.images || formik.errors.images) && (
                                                <div className="flex flex-col gap 10 items-center">
                                                    <ImagePlus color="gray" strokeWidth={1.5} size={40} />
                                                    <p className="text-blue-700 mt-2">
                                                        Select Image
                                                    </p>{" "}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {croppedImage && !formik.errors.images && !isVideo && (
                                        <div className="flex mt-5 gap-4">
                                            <div>
                                                {
                                                    <img
                                                        style={{ borderRadius: "10px" }}
                                                        src={croppedImage}
                                                        alt={`Preview `}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    )}
                                    {croppedImage && !formik.errors.images && isVideo && (
                                        <div className="flex mt-5 gap-4">
                                            <div>
                                                {
                                                    <video
                                                        style={{ borderRadius: "10px" }}
                                                        src={croppedImage}
                                                        alt={`Preview `}
                                                        autoPlay
                                                        loop
                                                        controls
                                                    />
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {formik.values.images &&
                                    isCroppeSelected &&
                                    !formik.errors.images && (
                                        <CropImage
                                            imgUrl={formik.values.images}
                                            aspectInit={{ value: 1 / 1 }}
                                            setCroppedImg={setCroppedImage}
                                            handleNextImage={handleCloseCanvas}
                                        />
                                    )}

                                {formik.errors.images && (
                                    <p className="text-red-600 text-xs">{formik.errors.images}</p>
                                )}
                            </div>
                        </div>
                        <div className="icons flex text-gray-500 m-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        const file = files[0];
                                        if (file.type.startsWith("image/")) {
                                            setIsCroppeSelected(!isCroppeSelected);
                                        }
                                        const imageUrl = URL.createObjectURL(file);
                                        formik.setFieldValue("images", imageUrl);
                                        if (!file.type.startsWith("image/")) {
                                            setIsVideo(true)
                                            setCroppedImage(imageUrl)
                                        }
                                    }
                                }}
                            />


                        </div>
                        <div className="buttons flex ">
                            <div
                                onClick={handleCancelClick}
                                className="text-xs  btn border border-gray-300 px-6 py-3 rounded-lg cursor-pointer text-gray-500 ml-auto hover:bg-red-600  hover:text-white "
                            >
                                Cancel
                            </div>
                            <button
                                type="submit"
                                className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400  hover:bg-green-600"
                            >
                                {isLoading && (
                                    <Spinner aria-label="Extra small spinner example" size="sm" />
                                )}
                                Publish Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AddStoryModal
