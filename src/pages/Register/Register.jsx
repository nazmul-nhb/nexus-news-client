// import banner from '../../assets/banner.png';
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment";
import { MdEmail, MdImage } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import useImageUpload from "../../hooks/useImageUpload";
import { buttonLoader } from "../../components/LoadingSpinners/Loaders";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [imageFileName, setImageFileName] = useState(
		"Upload Your Profile Picture"
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { createUser, updateUserProfile, userLoading, user, setUser } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const axiosPublic = useAxiosPublic();
	const [imageUploading, setImageUploading] = useState(false);
	const uploadImage = useImageUpload();

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [from, navigate, user]);

	useEffect(() => {
		if (errors.name) {
			toast.error(errors.name.message, { duration: 2000 });
			return;
		}
		if (errors.picture) {
			toast.error(errors.picture.message, { duration: 2000 });
			return;
		}
		if (errors.email) {
			toast.error(errors.email.message, { duration: 2000 });
			return;
		}
		if (errors.password) {
			toast.error(errors.password.message, { duration: 2000 });
			return;
		}
	}, [errors.email, errors.name, errors.password, errors.picture]);

	const handleRegister = async (registrationInfo) => {
		const { name, picture, email, password } = registrationInfo;
		const imageFile = picture[0];

		// set image file name on upload input
		if (imageFile) {
			setImageFileName(imageFile.name);
		} else {
			setImageFileName("Upload Your Profile Picture");
		}

		// console.log(imageFile);

		setImageUploading(true);
		try {
			// start image upload
			const result = await uploadImage(imageFile);
			const lowResImageURL = result.data.display_url;

			if (result?.success) {
				createUser(email, password)
					.then(() => {
						// update profile
						updateUserProfile(name, lowResImageURL)
							.then(() => {
								const userInfo = {
									name,
									email,
									profile_image: lowResImageURL,
									joined_on: moment().format(
										"YYYY-MM-DD HH:mm:ss"
									),
								};
								axiosPublic
									.post("/users", userInfo)
									.then((res) => {
										if (res.data.insertedId) {
											toast.success(
												"User Added in Database!"
											);
										}
									});
							})
							.catch((error) => {
								Swal.fire({
									title: "Error!",
									text:
										error.message.split(": ")[1] ||
										error.message,
									icon: "error",
									confirmButtonText: "Close",
								});
							});
						toast.success("Successful! Please, Login Now!");
						// logOut();
						// navigate('/login');
						setUser((prevUser) => ({
							...prevUser,
							displayName: name,
							photoURL: lowResImageURL || prevUser.photoURL,
						}));
						navigate(from, { replace: true });
					})
					.catch((error) => {
						if (
							error.message ===
							"Firebase: Error (auth/email-already-in-use)."
						) {
							Swal.fire({
								title: "Registration Failed!",
								text: "Already Exists! Email is Registered with Different Credential!",
								icon: "warning",
								confirmButtonText: "Close",
							});
						} else if (
							error.message ===
							"Firebase: Error (auth/network-request-failed)."
						) {
							Swal.fire({
								title: "Network Error!",
								text: "Please, Check Your Network Connection!",
								icon: "error",
								confirmButtonText: "Close",
							});
						} else {
							Swal.fire({
								title: "Error!",
								text:
									error.message.split(": ")[1] ||
									error.message,
								icon: "error",
								confirmButtonText: "Close",
							});
						}
					});
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: error,
				icon: "error",
				confirmButtonText: "Close",
			});
		} finally {
			setImageUploading(false);
		}
	};

	return (
		<section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4 flex flex-col items-center">
			<Helmet>
				<title>Register - Nexus News</title>
			</Helmet>
			<h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 font-kreonSerif">
				Please, Register
			</h2>
			{/* <div className='flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8'> */}
			{/* <figure className='flex-1 w-1/2 lg:w-full'>
                    <img src={banner} alt="" />
                </figure> */}
			<div className="flex-1 flex flex-col items-center gap-2 lg:w-1/2">
				{/* Social Media Login */}
				<SocialLogin />
				<div className="flex items-center w-full my-4">
					<hr className="w-full dark:text-gray-600" />
					<p className="px-3 dark:text-gray-600">OR</p>
					<hr className="w-full dark:text-gray-600" />
				</div>
				{/* Email Password Login */}
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="w-full flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-nexus-primary border border-nexus-primary rounded-md"
				>
					<h3 className="text-lg md:text-xl font-medium text-center">
						Register with Email & Password
					</h3>
					{/* Name */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="name">
							Your Name *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-secondary">
							<FaUserEdit className="text-gray-500" />
							<input
								{...register("name", {
									required: {
										value: true,
										message: "You must provide your name.",
									},
								})}
								className="px-2 rounded-r-lg py-1 bg-transparent w-full focus:bg-transparent focus:outline-0"
								type="text"
								name="name"
								id="name"
								placeholder="Enter Your Name"
							/>
						</div>
						{errors.name && (
							<p className="text-red-700">
								{errors.name.message}
							</p>
						)}
					</div>
					{/* Email */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="email">
							Your Email *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-secondary">
							<MdEmail className="text-gray-500" />
							<input
								{...register("email", {
									required: {
										value: true,
										message:
											"Provide a valid email address!",
									},
								})}
								className="px-2 rounded-r-lg py-1 bg-transparent w-full focus:outline-0"
								type="email"
								name="email"
								id="email"
								placeholder="Enter Your Email"
							/>
						</div>
						{errors.email && (
							<p className="text-red-700">
								{errors.email.message}
							</p>
						)}
					</div>
					{/* Profile Picture */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="picture">
							Choose Your Profile Picture *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 py-2 rounded-lg border border-nexus-secondary">
							<MdImage className="text-gray-500" />
							<div className="w-full">
								<div className="relative w-full">
									<input
										{...register("picture", {
											required: {
												value: true,
												message:
													"Provide an Image File!",
											},
										})}
										className="absolute w-full h-full opacity-0 cursor-pointer bg-transparent focus:outline-0"
										type="file"
										name="picture"
										id="picture"
										accept="image/jpeg, image/bmp, image/png, image/gif"
										onChange={(e) =>
											setImageFileName(
												e.target.files[0]?.name ||
													"Upload Your Profile Picture"
											)
										}
									/>
									<label
										htmlFor="picture"
										className="px-2 rounded-r-lg py-1 text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-500 block w-full overflow-hidden whitespace-nowrap overflow-ellipsis absolute top-1/2 left-0 -translate-y-1/2 bg-transparent cursor-pointer"
									>
										{imageFileName}
									</label>
								</div>
							</div>
						</div>
						{errors.picture && (
							<p className="text-red-700">
								{errors.picture.message}
							</p>
						)}
					</div>
					{/* <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="photo">Photo URL for Your Profile*</label>
                            <input
                                {...register("photo", {
                                    required:
                                        { value: true, message: "Provide a valid photo URL." }
                                })}
                                className="bg-transparent focus:border-2 p-2 rounded-lg border border-nexus-secondary transition duration-500 focus:outline-0" type="text" name="photo" id="photo" placeholder="Enter Your Photo URL" />
                            {
                                errors.photo && <p className="text-red-700">{errors.photo.message}</p>
                            }
                        </div> */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="password">
							Your Password *
						</label>
						<div className="flex items-center gap-2 bg-transparent  pl-2 rounded-lg border border-nexus-secondary">
							<RiLockPasswordFill className="text-gray-500" />
							<div className="relative w-full">
								<input
									{...register("password", {
										required: {
											value: true,
											message:
												"You must choose a password.",
										},
										minLength: {
											value: 6,
											message:
												"Password must contain 6 characters!",
										},
										validate: {
											isCapital: (value) => {
												if (/(?=.*[A-Z])/.test(value)) {
													return true;
												}
												return "Password must contain uppercase!";
											},
											// isLower: (value) => {
											//     if (/(?=.*[a-z])/.test(value)) {
											//         return true;
											//     }
											//     return "Password must contain lowercase!"
											// },
											isNumeric: (value) => {
												if (/(?=.*[0-9])/.test(value)) {
													return true;
												}
												return "Password must contain a number!";
											},
											isSpecialChar: (value) => {
												if (
													/(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(
														value
													)
												) {
													return true;
												}
												return "Password must contain a symbol!";
											},
										},
									})}
									className="px-2 rounded-r-lg py-1 bg-transparent w-full focus:outline-0"
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter Your Password"
								/>
								<span
									className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>
						</div>
						{errors.password && (
							<p className="text-red-700">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{userLoading || imageUploading
							? buttonLoader
							: "Register New Account"}
					</button>
					<p className="text-center text-sm md:text-base font-medium">
						Already have an Account?{" "}
						<Link
							className="hover:pl-4 text-[#3c5cc3] font-bold hover:text-nexus-secondary transition-all duration-500"
							to={"/login"}
						>
							Login Here!
						</Link>
					</p>
				</form>
			</div>
			{/* </div> */}
		</section>
	);
};

export default Register;
