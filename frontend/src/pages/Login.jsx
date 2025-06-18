import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/manager");
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href =
      "https://password-manager-mern-backend.onrender.com/auth/google";
  };

  const handleGitHubLogin = () => {
    window.location.href =
      "https://password-manager-mern-backend.onrender.com/auth/github";
  };

  return (
    <div
      className="bg-blue-100 min-h-screen"
      style={{
        backgroundImage: "url('/bg-image.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or 'contain' depending on your need
        backgroundPosition: "center",
      }}
    >
      {/* Login Section */}
      <div className="flex flex-col items-center justify-center pt-28 px-4">
        <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-lg p-8 w-full max-w-md ">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Login to VaultKeeper
          </h2>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 mb-4 hover:bg-gray-800 bg-gray-900 text-white font-semibold rounded transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              className="w-10"
              src="/icons/icon-google.svg"
              alt="GitHub logo"
            />
            Login with Google
          </button>

          <button
            onClick={handleGitHubLogin}
            className="w-full py-2 hover:bg-gray-800 bg-gray-900 text-white font-semibold rounded transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              className="w-10 invert"
              src="/icons/github-mark.svg"
              alt="GitHub logo"
            />
            Login with GitHub
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-slate-900 mt-20 py-12 px-4 text-center shadow-inner">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">
          About VaultKeeper
        </h3>
        <p className="text-white max-w-3xl mx-auto">
          VaultKeeper is a modern, secure password manager built using the MERN
          stack. Easily log in using Google or GitHub, and safely manage your
          credentials with AES encryption and cloud storage.
        </p>
        <div className="mt-6 text-sm text-white">
          📞 Contact us at{" "}
          <a
            href="mailto:harshpdsingh@gmail.com"
            className="text-blue-300 underline"
          >
            harshpdsingh@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
