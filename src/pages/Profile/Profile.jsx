import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { MdImage } from "react-icons/md";
import useImageUpload from "../../hooks/useImageUpload";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import moment from "moment";

const Profile = () => {
    const { user, setUser, userLoading, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageFileName, setImageFileName] = useState("Upload Your Profile Picture")
    const axiosPublic = useAxiosPublic();
    const [imageUploading, setImageUploading] = useState(false);
    const uploadImage = useImageUpload();

    const handleUpdateProfile = async (updateInfo) => {
        const { name, picture } = updateInfo;
        const imageFile = picture[0];

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Upload Your Profile Picture");
        }

        setImageUploading(true);

        try {
            let lowResImageURL;
            let result;
            if (imageFile) {
                // start image upload
                result = await uploadImage(imageFile);
                if (result.success) {
                    lowResImageURL = result.data.display_url;
                }
            }

            // update profile
            updateUserProfile(name, lowResImageURL)
                .then(() => {
                    toast.success("Profile Updated Successfully!");
                    const userInfo = { name, email: user.email, updated_on: moment().format("YYYY-MM-DD HH:mm:ss") };
                    if (lowResImageURL) {
                        userInfo.profile_image = lowResImageURL;
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res);
                            if (res.data.modifiedCount > 0) {
                                toast.success("Profile Updated!");
                            }
                        })
                    setUser(prevUser => ({
                        ...prevUser,
                        displayName: name,
                        photoURL: lowResImageURL || prevUser.photoURL,
                    }));
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message.split(': ')[1] || error.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                })
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } finally {
            setImageUploading(false);
        }
    }

    return (
        <section className="mx-6 md:mx-10 my-2 md:my-8 p-2 md:px-4">
            <Helmet>
                <title>{user.displayName}&rsquo;s - Nexus News</title>
            </Helmet>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-nexus-secondary border border-nexus-secondary rounded-md">
                {/* Name */}
                <div className="flex flex-col gap-3">
                    <label className="font-medium" htmlFor="name">Your Name *</label>
                    <div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-primary">
                        <FaUserEdit className="text-gray-500" />
                        <input
                            defaultValue={user?.displayName}
                            {...register("name", {
                                required:
                                    { value: true, message: "You must provide your name." }
                            })}
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full focus:bg-transparent focus:outline-0" type="text" name="name" id="name" placeholder="Enter Your Name" />
                    </div>
                    {
                        errors.name && <p className="text-red-700">{errors.name.message}</p>
                    }
                </div>
                {/* Profile Picture */}
                <div className="flex flex-col gap-3">
                    <label className="font-medium" htmlFor="picture">Choose Your Profile Picture</label>
                    <div className="flex items-center gap-2 bg-transparent pl-2 py-2 rounded-lg border border-nexus-primary">
                        <MdImage className="text-gray-500" />
                        <div className="w-full">
                            <div className="relative w-full">
                                <input
                                    {...register("picture", { required: false })}
                                    className="absolute w-full h-full opacity-0 cursor-pointer bg-transparent focus:outline-0"
                                    type="file" name="picture" id="picture"
                                    accept="image/jpeg, image/bmp, image/png, image/gif"
                                    onChange={(e) => setImageFileName(e.target.files[0]?.name || "Upload Your Profile Picture")}
                                />
                                <label htmlFor="picture" className="px-2 rounded-r-lg py-1 text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-500 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis absolute top-1/2 left-0 -translate-y-1/2 bg-transparent cursor-pointer">
                                    {imageFileName}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{userLoading || imageUploading ? "Loading..." : "Update Profile"}</button>
            </form>
        </section>
    );
};

export default Profile;