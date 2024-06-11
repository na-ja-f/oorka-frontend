import { useFormik } from "formik";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { loginSuccess } from "../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { editProfile } from "../services/api/user/apiMethods";
import CropImg from "./CropImg"


function ProfileEdit({ user, onClose }) {

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [croppedImage, setCroppedImage] = useState("")
  const [isCropSelected, setIsCropSelected] = useState(false)
  const [isPrivate, setIsPrivate] = useState(user.isPrivate)

  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current?.setAttribute("accept", "image/*");
    fileInputRef.current?.click();
  }

  const formik = useFormik({
    initialValues: {
      image: user.profileImg,
      name: user.name,
      phone: user.phone,
      bio: user.bio
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
    }),
    onSubmit: async (values) => {
      const userId = user._id
      const { name, phone, bio } = values
      let imageUrl
      try {
        if (croppedImage) {
          const response = await fetch(croppedImage)
          const blob = await response.blob();

          const formData = new FormData();
          formData.append("file", blob);
          formData.append("upload_preset", "fqmpgsjl");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dg5lcmwvr/image/upload",
            formData
          )
          imageUrl = res.data.secure_url
        } else {
          imageUrl = user.profileImg
        }

        await editProfile({
          userId,
          image: imageUrl,
          name,
          phone,
          bio,
          isPrivate
        }).then((response) => {
          const userData = response.data
          dispatch(loginSuccess({ user: userData }))
          toast.info("profile updated succesfully")
          onClose();
        })
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    }
  })

  const handlePrivateToggle = () => {
    setIsPrivate(!isPrivate)
  }

  const handleCloseCanvas = () => {
    setIsCropSelected(!isCropSelected)
  }

  return (
    <div>
      <div className="addpost-popup">
        <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto w-10/12 flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg max-w-2xl">
          <p className="font-semibold text-2xl m-3">Edit Profile</p>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className="flex">
              <div className="">
                <div onClick={handleButtonClick} className="image-preview flex items-center bg-white shadow-lg justify-center h-36 cursor-pointer">
                  {!croppedImage && (
                    <img src={user.profileImg} alt="profile" style={{ height: "100px", borderRadius: "10px" }} />
                  )}
                  {croppedImage && !formik.errors.image && (
                    <img src={croppedImage} alt="croppedimage" style={{ height: "140px", borderRadius: "10px" }} />
                  )}
                </div>
                {formik.values.image && isCropSelected && !formik.errors.image && (
                  <CropImg
                    imgUrl={formik.values.image}
                    aspectInit={{ value: 1 / 1 }}
                    setCroppedImg={setCroppedImage}
                    handleNextImage={handleCloseCanvas}
                  />
                )}
              </div>
              <div className="flex flex-col w-6/12">
                <p className="font-semibold">name</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-600 text-xs">{formik.errors.name}</p>
                )}
                <p className="font-semibold">Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                  value={user.email}
                  name="email"
                  disabled
                />
              </div>
            </div>
            <div className="w-full">
              <p className="font-semibold mb-2">Bio</p>
              <textarea
                className="rounded-lg description sec w-full p-3 h-24 shadow-lg border-gray-300 outline-none text-xs font-normal"
                spellCheck="false"
                placeholder="Describe everything about you here"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="bio"
              ></textarea>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter a Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="rounded-lg shadow-lg p-2 py-3 mb-3 w-full outline-none text-xs font-normal"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
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
                    if (!file.type.startsWith("image/")) {
                      toast.error("Please select an image file.");
                      return;
                    }
                    const imageUrl = URL.createObjectURL(file);

                    formik.setFieldValue("image", imageUrl);
                    setIsCropSelected(!isCropSelected);
                  }
                }}
              />
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isPrivate}
                  onChange={handlePrivateToggle}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                  Private
                </span>
              </label>
            </div>
            <div className="buttons flex">
              <div
                onClick={() => onClose()}
                className="text-xs  btn border border-gray-300 px-6 py-3 rounded-lg cursor-pointer text-gray-500 ml-auto hover:bg-red-600  hover:text-white "
              >
                Cancel
              </div>
              <button
                type="submit"
                className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400  hover:bg-green-600"
              >
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
