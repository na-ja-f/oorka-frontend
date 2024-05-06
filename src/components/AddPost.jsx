import React, { useState, useRef, useEffect } from "react";
import { Bell, Bookmark, Mail, LucideKeySquare, ImagePlus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { addPost } from "../services/api/user/apiMethods";
import CropImage from "./CropImg";
import BouncingBall from './BouncingBall'
import FilterComponent from "./FilterComponent";


function AddPost({ setNewPost, setShowModal }) {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""

    const [isLoading, setIsLoading] = useState(false)
    const [croppedImage, setCroppedImage] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [hideLikes, setHideLikes] = useState(false);
    const [hideComment, setHideComment] = useState(false);

    const [filteredImage, setFilteredImage] = useState([])
    const [currentCroppedImgeIndex, setCurrentCroppedImageIndex] = useState(0)
    const [ croppedImageLength, setCroppedImageLength] = useState(0);

    const fileInputRef = useRef(null)

    const resetState = () => {
        setHideLikes(false)
        setHideComment(false)
        setCroppedImage([])
        setCurrentImageIndex(0)
        formik.values.images = ([])
        formik.values.description = ''
    }

    const handleHideLikesToggle = () => {
        setHideLikes(!hideLikes)
    };

    const handleHideCommentToggle = () => {
        setHideComment(!hideLikes)
    };

    const handleButtonClick = () => {
        fileInputRef.current?.setAttribute("accept", "image/*")
        fileInputRef.current?.click();
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
            const selectedFiles = Array.from(files)
            const invalidFiles = selectedFiles.filter(file => !validImageTypes.includes(file.type))
            if (invalidFiles.length > 0) {
                toast.error("files allowed(JPEG, PNG, GIF)")
                return
            }
            const imageUrls = selectedFiles.map(file => URL.createObjectURL(file))
            setCroppedImageLength(imageUrls.length)
            formik.setFieldValue("images", imageUrls)
        }
    }

    const formik = useFormik({
        initialValues: {
            images: [],
            description: ""
        },
        validationSchema: Yup.object({
            images: Yup.array().min(1, "At least one image required")
        }),
        onSubmit: async () => {
            console.log("hello");
            setIsLoading(true)
            const { description } = formik.values
            const imageUrls = []
            for (const image of formik.values.images) {
                const response = await fetch(image)
                const blob = await response.blob();

                const formData = new FormData()
                formData.append("file", blob)
                formData.append("upload_preset", "fqmpgsjl")

                try {
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/dg5lcmwvr/image/upload",
                        formData
                    )
                    console.log(res.data.secure_url);

                    const imageUrl = res.data.secure_url
                    imageUrls.push(imageUrl)
                } catch (error) {
                    console.log("error uploading images", error);
                }
            }
            addPost({
                userId,
                imageUrls,
                description,
                hideLikes,
                hideComment,
            })
                .then((response) => {
                    const data = response.data
                    if (response.status === 200) {
                        toast.info(data.message);
                        setNewPost(response.data.posts)
                        setIsLoading(false)
                        resetState()
                        handleCancelClick()
                    } else {
                        console.log(response.message);
                        toast.error(data.message)
                    }
                })
                .catch((error) => {
                    toast.error(error?.message)
                    console.log(error?.message)
                })
        }
    })

    const handleCancelClick = () => {
        formik.values.images = []
        setCroppedImage([])
        resetState()
        setShowModal(false)
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1)
    }

    const handleNextFilteredImage = () => {
        setCurrentCroppedImageIndex((prevIndex) => prevIndex + 1)
    }

    return (
        <div className=" ms-96 w-96 shadow-2xl ">
            <div className="addpost-popup z-50">
                <div className="addpost-popup">
                    <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg max-w-2xl">
                        <p className="font-semibold text-2xl text-myText m-3"> Create Post</p>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="">
                                <div className="mb-4">
                                    <div onClick={handleButtonClick} className="image-preview flex items-center bg-white shadow-lg justify-center h-40 cursor-pointer">
                                        {!formik.values.images.length && (
                                            <div className="flex flex-col gap 10 items-center">
                                                {(!formik.values.images.length ||
                                                    formik.errors.images) && (
                                                        <div className="flex flex-col gap 10 items-center">
                                                            <ImagePlus color="black" strokeWidth={1.5} size={30} />
                                                            <p className="text-myViolet mt-2">Select Image</p>{" "}
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                        {croppedImage && !formik.errors.images && (
                                            <div className="flex gap-4">
                                                {croppedImage.map((preview, index) => (
                                                    <div key={index} className="w-32">
                                                        {preview && (
                                                            <img style={{ borderRadius: "10px" }} src={preview} alt={`preview ${index + 1}`} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {formik.values.images &&
                                        !formik.errors.images &&
                                        formik.values.images.map((imageFile, index) => (
                                            <React.Fragment key={index}>
                                                {index === currentImageIndex && (
                                                    <CropImage
                                                        imgUrl={imageFile}
                                                        aspectInit={{ value: 1 / 1 }}
                                                        setCroppedImg={setCroppedImage}
                                                        handleNextImage={handleNextImage}
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    {/* {formik.values.images &&
                                        !formik.errors.images && croppedImage.length === croppedImageLength &&
                                        croppedImage.map((imageFile, index) => (
                                            <React.Fragment key={index}>
                                                {index === currentCroppedImgeIndex && (
                                                    <FilterComponent
                                                        imgUrl={imageFile}
                                                        setFilteredImg={setFilteredImage}
                                                        handleNextImage={handleNextFilteredImage}
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))} */}
                                    {formik.errors.images && (
                                        <p className="text-red-600 text-xs">
                                            {formik.errors.images}
                                        </p>
                                    )}

                                    <div className="icons flex mt-7 text-gray-500 m-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                        <label className="flex items-center me-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="sr-only peer"
                                                checked={hideComment}
                                                onChange={handleHideCommentToggle}
                                            />
                                            <div className="relative w-10 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                            <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                                                Hide Comments
                                            </span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="sr-only peer"
                                                checked={hideLikes}
                                                onChange={handleHideLikesToggle}
                                            />
                                            <div className="relative w-10 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                            <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                                                Hide Likes
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-10">
                                    <p className=" font-semibold text-myText mb-2">Description</p>
                                    <textarea
                                        className="rounded-lg description sec p-3 h-24 shadow-lg border-gray-300 outline-none text-xs font-normal"
                                        spellCheck="false"
                                        placeholder="write a description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="description"
                                    ></textarea>
                                    {formik.touched.description &&
                                        formik.errors.description && (
                                            <p className="text-red-600 text-xs">
                                                {formik.errors.description}
                                            </p>
                                        )}
                                </div>
                            </div>
                            <div className="icons flex text-gray-500 m-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </div>
                            <div className="buttons flex">
                                <div
                                    onClick={handleCancelClick}
                                    className="text-xs text-red-600 btn border border-myText px-6 py-3 rounded-lg cursor-pointer ml-auto hover:bg-red-600  hover:text-white "
                                >
                                    Cancel
                                </div>
                                <button type="submit" className="text-xs rounded-lg btn border px-8 py-3 cursor-pointer text-white ml-2 bg-myViolet  hover:bg-purple-900">
                                    {isLoading && (
                                        <Spinner aria-label="Extra small spinner example"
                                            size="sm" />
                                    )}
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost
