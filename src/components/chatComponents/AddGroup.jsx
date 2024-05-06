import { useRef, useState } from "react";
import { Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import CropImage from "../CropImg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { addChatGroup } from "../../services/api/user/apiMethods";
const animatedComponents = makeAnimated();



function AddGroup({
    chatEligibleUsers,
    openModal,
    setOpenModal,
    emailInputRef,
    setUserGroups,
}) {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");
    const [isCroppeSelected, setIsCroppeSelected] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");

    const handleButtonClick = () => {
        fileInputRef.current?.click();
        fileInputRef.current?.setAttribute("accept", "image/*");
    };

    const colourOptions = chatEligibleUsers.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    const handleCloseCanvas = () => {
        setIsCroppeSelected(!isCroppeSelected);
    };

    const resetState = () => {
        setName("");
        setImage("");
        setCroppedImage("");
        setIsCroppeSelected(false);
        setSelectedUsers([]);
        setIsLoading(false);
        setDescription("");
        setIsLoading(false);
        setOpenModal(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setSelectedUsers([...selectedUsers, { value: user._id, label: user.name },
        ]);
        try {
            const response = await fetch(croppedImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", "fqmpgsjl");
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dg5lcmwvr/image/upload",
                formData
            );
            const imageUrl = res.data.secure_url;
            const admins = [userId];
            await addChatGroup({
                name,
                image: imageUrl,
                users: selectedUsers,
                description,
                admins,
            }).then((response) => {
                console.log("hello");
                const GroupData = response.data;
                console.log(GroupData);
                setUserGroups((prev) => [...prev, GroupData]);
                toast.info("Group Added successfully");
                resetState();
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to add Group");
        }
    };

    return (
        <>
            <Modal
                show={openModal}
                size="md"
                popup
                onClose={() => setOpenModal(false)}
                initialFocus={emailInputRef}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Add new Group
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Group Name" />
                            </div>
                            <TextInput
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                ref={emailInputRef}
                                placeholder="Group Name"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                className="rounded-lg description w-full sec p-3 h-24 shadow-lg border-gray-300 outline-none text-xs font-normal"
                                spellCheck="false"
                                placeholder="Describe everything about this post here"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                name="description"
                            ></textarea>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Group Icon" />
                            </div>
                            <div className="mb-4">
                                {croppedImage && <img src={croppedImage} className="w-full" />}
                                <Button
                                    onClick={handleButtonClick}
                                    outline
                                    pill
                                    className="w-full"
                                    gradientDuoTone="purpleToBlue"
                                >
                                    <Plus className="h-6 w-6" />
                                </Button>
                                {image && isCroppeSelected && (
                                    <CropImage
                                        imgUrl={image}
                                        aspectInit={{ value: 1 / 1 }}
                                        setCroppedImg={setCroppedImage}
                                        handleNextImage={handleCloseCanvas}
                                    />
                                )}
                            </div>

                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                options={colourOptions}
                                onChange={(selectedOption) => {
                                    console.log(selectedOption);

                                    setSelectedUsers(selectedOption);
                                }}
                                isMulti
                            />

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

                                        setImage(imageUrl);
                                        setIsCroppeSelected(!isCroppeSelected);
                                    }
                                }}
                            />
                        </div>

                        <div className="w-full flex justify-center mt-3">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400  hover:bg-green-600"
                            >
                                {isLoading && (
                                    <Spinner aria-label="Extra small spinner example" size="sm" />
                                )}
                                Create
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddGroup
