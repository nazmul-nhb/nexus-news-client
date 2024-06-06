import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaNewspaper } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import useImageUpload from "../../../hooks/useImageUpload";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AddPublisher = () => {
    const [imageFileName, setImageFileName] = useState("Upload Publisher Logo");
    const [imageUploading, setImageUploading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const uploadImage = useImageUpload();

    const { data: publishers = [], refetch } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers')
            return res.data;
        }
    });

    const handleAddPublisher = async (publisherData) => {
        const { publisher, logo } = publisherData;
        const imageFile = logo[0];

        // set image file name on upload input
        if (imageFile) {
            setImageFileName(imageFile.name);
        } else {
            setImageFileName("Upload Publisher Logo");
        }

        setImageUploading(true);

        try {
            const result = await uploadImage(imageFile);
            console.log(result);
            const publisher_logo = result.data.image.url;

            if (result.success) {
                const newPublisher = { publisher, publisher_logo, added_on: moment().format("YYYY-MM-DD HH:mm:ss") }

                const res = await axiosSecure.post('/publishers', newPublisher);

                if (res.data.insertedId) {
                    toast.success("Publisher Added Successfully!");
                    reset();
                    setImageFileName("Upload Publisher Logo");
                    refetch();
                } else if (res.data.message) {
                    Swal.fire({
                        title: 'Error!',
                        text: res.data.message,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }

            } else {
                throw new Error("Image Upload Failed!");
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } finally {
            setImageUploading(false);
        }
    }


    return (
        <section className="flex md:flex-row-reverse md:items-start flex-col gap-6">
            <form onSubmit={handleSubmit(handleAddPublisher)} className="w-full md:w-1/4 md:flex-grow-0 flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-nexus-secondary border border-nexus-secondary rounded-md">
                {/* Publisher Name */}
                <div className="flex flex-col gap-3">
                    <label className="font-medium" htmlFor="publisher">Add A Publisher *</label>
                    <div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-primary">
                        <FaNewspaper className="text-gray-500" />
                        <input
                            {...register("publisher", {
                                required:
                                    { value: true, message: "You must provide publisher name." }
                            })}
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full focus:bg-transparent focus:outline-0" type="text" name="publisher" id="publisher" placeholder="Enter Publisher Name" />
                    </div>
                    {
                        errors.publisher && <p className="text-red-700">{errors.publisher.message}</p>
                    }
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-medium" htmlFor="logo">Choose Publisher Logo *</label>
                    <div className="flex items-center gap-2 bg-transparent pl-2 py-2 rounded-lg border border-nexus-primary">
                        <MdImage className="text-gray-500" />
                        <div className="w-full">
                            <div className="relative w-full">
                                <input
                                    {...register("logo", {
                                        required:
                                            { value: true, message: "Provide an Image File!" }
                                    })}
                                    className="absolute w-full h-full opacity-0 cursor-pointer bg-transparent focus:outline-0"
                                    type="file" name="logo" id="logo"
                                    accept="image/jpeg, image/png"
                                    onChange={(e) => setImageFileName(e.target.files[0]?.name || "Upload Publisher Logo")}
                                />
                                <label htmlFor="logo" className="px-2 rounded-r-lg py-1 text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-500 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis absolute top-1/2 left-0 -translate-y-1/2 bg-transparent cursor-pointer">
                                    {imageFileName}
                                </label>
                            </div>
                        </div>
                    </div>
                    {
                        errors.picture && <p className="text-red-700">{errors.picture.message}</p>
                    }
                </div>
                <button className="">{imageUploading ? 'Loading...' : 'Add Publisher'}</button>
            </form>
            <div className="grid md:grid-cols-2 gap-4 w-3/4">
{
    publishers?.map((pub, index) =><div className="flex flex-col gap-2 p-2 border" key={index}>
        <img src={pub.publisher_logo} alt={pub.publisher} />
        <h3>{pub.publisher}</h3>
        <h4>{moment(pub.added_on).format('dddd, MMMM DD, YYYY • hh:mm:ss A')}</h4>
    </div>)
}
            </div>
        </section>
    );
};

export default AddPublisher;