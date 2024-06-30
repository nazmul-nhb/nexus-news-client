import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { MdImage, MdVerified } from "react-icons/md";
import useImageUpload from "../../hooks/useImageUpload";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import moment from "moment";
import useNexusUsers from "../../hooks/useNexusUsers";
import { Tooltip } from "react-tooltip";
import { VscUnverified } from "react-icons/vsc";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { articleLoader, buttonLoader } from "../../components/LoadingSpinners/Loaders";

const Profile = () => {
    const { user, setUser, userLoading, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageFileName, setImageFileName] = useState("Update Your Profile Picture")
    const axiosPublic = useAxiosPublic();
    const [imageUploading, setImageUploading] = useState(false);
    const uploadImage = useImageUpload();
    const { isNexusUserLoading, data: nexusUser = {} } = useNexusUsers(['nexusUser', user?.email], user?.email);
    const now = moment();
    const expiration = moment(nexusUser?.expires_on);
    // console.log(now.isAfter(expiration));

    const handleUpdateProfile = async (updateInfo) => {
        const { name, picture } = updateInfo;
        const imageFile = picture[0];

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Update Your Profile Picture");
        }

        setImageUploading(true);

        try {
            let lowResImageURL;
            let result;
            if (imageFile) {
                // start image upload
                result = await uploadImage(imageFile);
                if (result?.success) {
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
                            // console.log(res);
                            if (res.data.modifiedCount > 0) {
                                toast.success("Profile Updated!");
                            }
                        })
                    reset();
                    setImageFileName("Update Your Profile Picture");
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
        <section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>{user.displayName}&rsquo;s Profile - Nexus News</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row gap-10 items-center mb-8 lg:mb-16">
                {isNexusUserLoading ? <div className="lg:w-3/5 flex-1 ">{articleLoader}</div> :
                    <div className="w-full lg:w-3/5 flex-1 border bg-gradient-to-l from-[#2e50bc62] to-[#033eff37]  border-nexus-primary flex flex-col gap-6 p-6 shadow-lg shadow-[#8689ee]">
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start justify-center lg:justify-start my-4">
                                <Tooltip anchorSelect=".user-name" place="top">
                                    {user.displayName}
                                </Tooltip>
                                <PhotoProvider>
                                    <PhotoView src={user.photoURL}>
                                        <img className="user-name cursor-pointer border p-1 border-nexus-primary w-24 md:w-36 h-24 md:h-36" src={user.photoURL} alt={user.displayName} />
                                    </PhotoView>
                                </PhotoProvider>
                                <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start gap-3">
                                    <h4 className="text-lg md:text-2xl font-bold">{user.displayName}</h4>
                                    <Tooltip anchorSelect=".verification-status" place="top">
                                        {user.emailVerified ? "Verified!" : "Not Verified!"}
                                    </Tooltip>
                                    <h4 className="verification-status font-semibold flex items-center gap-1">{user.email} {user.emailVerified ? <MdVerified className="text-nexus-primary" /> : <VscUnverified className="text-red-700" />}</h4>
                                    <div className="flex flex-col items-center lg:flex-row gap-1 md:text-xl">
                                        <h4 className="font-semibold">Last Login:</h4>
                                        <h4>{moment(user.metadata.lastSignInTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col items-center lg:flex-row gap-1 md:text-xl">
                                    <h4 className="font-semibold">Account Created:</h4>
                                    <h4>{moment(user.metadata.creationTime).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                                </div>
                                {nexusUser?.updated_on &&
                                    <div className="flex flex-col items-center lg:flex-row gap-1 md:text-xl">
                                        <h4 className="font-semibold">Last Updated:</h4>
                                        <h4>{moment(nexusUser?.updated_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                                    </div>
                                }
                                {nexusUser?.expires_on && <>
                                    <div className={`${now.isAfter(expiration) && 'text-red-600'} flex flex-col items-center lg:flex-row gap-1 md:text-xl`}>
                                        <h4 className="font-semibold">{now.isAfter(expiration) ? 'Previous Plan:' : 'Current Plan:'}</h4>
                                        <h4>{nexusUser?.current_plan}</h4>
                                    </div>
                                    <div className={`${now.isAfter(expiration) && 'text-red-600'} flex flex-col items-center lg:flex-row gap-1 md:text-xl`}>
                                        <h4 className="font-semibold">{now.isAfter(expiration) ? 'Expired' : 'Will Expire'} on:</h4>
                                        <h4>{moment(nexusUser?.expires_on).format('MMMM DD, YYYY [at] hh:mm:ss A')}</h4>
                                    </div>
                                    <div className={`flex flex-col items-center lg:flex-row gap-1 md:text-xl`}>
                                        <h4 className="font-semibold">Last Transaction ID:</h4>
                                        <h4>{nexusUser?.last_transaction_ID}</h4>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                }

                <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full lg:w-2/5 flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-nexus-primary border border-nexus-primary rounded-md">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                        <label className="font-medium" htmlFor="name">Update Your Name *</label>
                        <div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-secondary">
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
                        <div className="flex items-center gap-2 bg-transparent pl-2 py-2 rounded-lg border border-nexus-secondary">
                            <MdImage className="text-gray-500" />
                            <div className="w-full">
                                <div className="relative w-full">
                                    <input
                                        {...register("picture", { required: false })}
                                        className="absolute w-full h-full opacity-0 cursor-pointer bg-transparent focus:outline-0"
                                        type="file" name="picture" id="picture"
                                        accept="image/jpeg, image/bmp, image/png, image/gif"
                                        onChange={(e) => setImageFileName(e.target.files[0]?.name || "Update Your Profile Picture")}
                                    />
                                    <label htmlFor="picture" className="px-2 rounded-r-lg py-1 text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-500 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis absolute top-1/2 left-0 -translate-y-1/2 bg-transparent cursor-pointer">
                                        {imageFileName}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{userLoading || imageUploading ? buttonLoader : "Update Profile"}</button>
                </form>
            </div>
        </section>
    );
};

export default Profile;