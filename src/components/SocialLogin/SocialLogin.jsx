import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment";

const SocialLogin = () => {
	const { googleLogin } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const axiosPublic = useAxiosPublic();

	const handleGoogleLogin = () => {
		googleLogin()
			.then((result) => {
				toast.success("Successfully Logged in!");
				const user = result.user;
				const userInfo = {
					name: user?.displayName,
					email: user?.email,
					profile_image: user?.photoURL,
					joined_on: moment().format("YYYY-MM-DD HH:mm:ss"),
				};
				axiosPublic.post("/users", userInfo).then((res) => {
					if (res.data.insertedId) {
						toast.success("User Added in Database!");
					}
					if (res.data.modifiedCount > 0) {
						toast.success("Profile Picture Updated!");
					}
				});
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (
					error.message ===
					"Firebase: Error (auth/popup-closed-by-user)."
				) {
					Swal.fire({
						title: "Login Failed!",
						text: "Popup Closed by User!",
						icon: "warning",
						confirmButtonText: "Close",
					});
				} else if (
					error.message ===
					"Firebase: Error (auth/account-exists-with-different-credential)."
				) {
					Swal.fire({
						title: "Error!",
						text: "Account Exists for this Email with Different Credential!",
						icon: "error",
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
						text: error.message.split(": ")[1] || error.message,
						icon: "error",
						confirmButtonText: "Close",
					});
				}
			})
	};

	return (
		<div className="text-nexus-secondary">
			<h3 className="text-lg md:text-xl font-medium text-center mb-6 font-kreonSerif">
				Login with Social Media
			</h3>
			<div className="flex flex-col md:flex-row md:items-center gap-4 text-xl font-bold tracking-wider">
				<button
					onClick={handleGoogleLogin}
					aria-label="Login with Google"
					type="button"
					className="flex items-center justify-center w-full px-2 py-1 gap-2 border rounded-md border-[#dc3c2a] bg-[#dc3c2a] text-[#fff] hover:text-[#dc3c2a] hover:bg-transparent transition-all duration-500"
				>
					<FaGoogle />
					<p>Google</p>
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
