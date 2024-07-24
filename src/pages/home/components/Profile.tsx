import { useContext } from "react";
import Image from "next/image";
import ImageIcon from "@/assets/platformicons/ImageIcon";
import Button from "@/components/button";
import { DataContext } from "@/context/DataContext";
import SavedIcon from "@/assets/platformicons/SavedIcon";
import useForm from "../../../hooks/useForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContextType } from "@/types";

export default function Profile() {
  const {
    userInfo,
    imgPreviewPath,
    updateFirstName,
    updateLastName,
    updateEmail,
    previewImg,
    saveUserInfoToDb,
  } = useContext(DataContext) as DataContextType;

  const { validateInput, submitForm } = useForm(saveUserInfoToDb);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFirstName(e.target.value);
    validateInput(e);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLastName(e.target.value);
    validateInput(e);
  };

  const handleSave = () => {
    if (!userInfo?.firstName || !userInfo?.lastName) return;
    submitForm();
    toast.success(
      <div className="flex items-center">
        <SavedIcon />
        <span className="ml-2">Your changes have been successfully saved!</span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
  };

  const getImageSource = () => {
    if (imgPreviewPath) return imgPreviewPath;
    if (userInfo.profileImg) return userInfo.profileImg;
    return "/default-avatar.png"; // Replace with your default image path
  };

  // Early return if userInfo is not available
  if (!userInfo) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <>
      <section className="relative p-10 w-full max-w-[900px] mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Profile Details</h3>
          <p className="text-gray-600">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div className="mt-10 p-5">
          <label
            htmlFor="image"
            className="sm:grid sm:grid-cols-[1fr_193px_1fr] sm:items-center sm:gap-6"
          >
            <span className="text-gray-400 text-sm">Profile Picture</span>

            <div className="relative h-[193px] w-[193px] bg-purple-200 rounded-xl mt-4 mb-6 overflow-hidden">
              <Image
                src={getImageSource()}
                alt="Profile picture"
                layout="fill"
                objectFit="cover"
              />

              <input
                type="file"
                name="image"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={previewImg}
                className="hidden"
              />

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  imgPreviewPath || userInfo.profileImg
                    ? "opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-200"
                    : ""
                }`}
              >
                <ImageIcon />
                <span className="text-sm font-bold text-purple-600">
                  &#43; Upload Image
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </label>
        </div>

        {/* ... (rest of the component remains unchanged) */}
        <div className="grid gap-3 mt-6 p-5 pb-20">
          <label
            htmlFor="first-name"
            className="sm:grid sm:grid-cols-[1fr_calc(50%+96px)] sm:items-center sm:gap-6"
          >
            <span className="text-gray-400 text-sm">First name*</span>
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="e.g. John"
              value={userInfo.firstName}
              onChange={handleFirstNameChange}
              required
              className="p-3 px-4 border rounded"
            />
          </label>

          <label
            htmlFor="last-name"
            className="sm:grid sm:grid-cols-[1fr_calc(50%+96px)] sm:items-center sm:gap-6"
          >
            <span className="text-gray-400 text-sm">Last name*</span>
            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder="e.g. Appleseed"
              value={userInfo.lastName}
              onChange={handleLastNameChange}
              required
              className="p-3 px-4 border rounded"
            />
          </label>

          <label
            htmlFor="email"
            className="sm:grid sm:grid-cols-[1fr_calc(50%+96px)] sm:items-center sm:gap-6"
          >
            <span className="text-gray-400 text-sm">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g. email@example.com"
              value={userInfo.email}
              onChange={(e) => updateEmail(e.target.value)}
              required
              className="p-3 px-4 border rounded"
            />
          </label>
        </div>

        <div className="absolute -bottom-6 -left-6 -right-6 p-4 border-t border-gray-200 sm:left-0 sm:right-0">
          <Button
            disabled={!userInfo.firstName || !userInfo.lastName}
            onClick={handleSave}
            className="sm:block sm:w-[91px] sm:ml-auto sm:mr-6"
          >
            Save
          </Button>
        </div>
      </section>

      <ToastContainer />
    </>
  );
}
