import React, { useRef, useState, useEffect } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { FaCopy, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import API from "../utils/axios"; // ← NEW LINE
import { useNavigate } from "react-router-dom"; // ← for logout on 401

const Manager = () => {
  const ref = useRef();
  const passwordInput = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const res = await API.get("/passwords");
      setPasswordArray(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const copyText = (text) => {
    toast("Copied to Clipboard!");
    navigator.clipboard.writeText(text);
  };

  const savePassword = async () => {
    const isFormIncomplete = !form.site || !form.username || !form.password;

    if (isFormIncomplete) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const isDuplicate = passwordArray.some(
      (item) =>
        item.site.toLowerCase() === form.site.toLowerCase() &&
        item.username.toLowerCase() === form.username.toLowerCase() &&
        item.password.toLowerCase() === form.password.toLowerCase()
    );

    if (isDuplicate && !form._id) {
      toast.error("Duplicate entry! Please enter unique credentials.");
      return;
    }

    if (form._id) {
      const existing = passwordArray.find((item) => item._id === form._id);
      if (
        existing &&
        existing.site.toLowerCase() === form.site.toLowerCase() &&
        existing.username.toLowerCase() === form.username.toLowerCase() &&
        existing.password.toLowerCase() === form.password.toLowerCase()
      ) {
        toast.error("No changes detected.");
        return;
      }
    }

    try {
      if (form._id) {
        // Edit existing password
        const res = await API.put(`/passwords/${form._id}`, form);
        const updated = passwordArray.map((p) =>
          p._id === form._id ? res.data : p
        );
        setPasswordArray(updated);
        toast.success("Password updated successfully!");
      } else {
        // Add new password
        const res = await API.post("/passwords", form);
        setPasswordArray([...passwordArray, res.data]);
        toast.success("Password saved successfully!");
      }
      setform({ site: "", username: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error saving password.");
    }
  };

  const deletePassword = async (_id) => {
    console.log("Deleting password with ID:", _id);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (!isConfirmed) return;
    try {
      await API.delete(`/passwords/${_id}`);
      const updatedArray = passwordArray.filter((item) => item._id !== _id);
      setPasswordArray(updatedArray);
      toast.success("Password deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting password.");
    }
  };

  const editPassword = (_id) => {
    const selected = passwordArray.find((i) => i._id === _id);
    if (selected) setform(selected);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      passwordInput.current.type = "text";
      ref.current.src = "icons/eyeslash1.png";
    } else {
      passwordInput.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        {/* Background gradient */}
        <div className="md:mycontainer md:px-40 md:py-4 m-16">
          <h1 className="text-3xl text font-bold text-center">
            <span className="text-blue-500"> &lt;</span>

            <span className="text-white">Vault</span>
            <span className="text-blue-500">Keeper / </span>
            <span className="text-blue-500">&gt;</span>
          </h1>
          <p className="text-blue-500 text-lg text-center">
            Your personal key to digital safety
          </p>
          <div className="flex flex-col p-4 text-white gap-8 items-center">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="rounded-full border border-white w-full p-4 py-1"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="rounded-full border border-white w-full p-4 py-1"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                  <input 
                    ref={passwordInput}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="rounded-full border border-white w-full p-4 py-1"
                    type="password"
                    name="password"
                    id="password"
                  />
                <span
                  className="absolute right-[10px] top-[6px] cursor-pointer coptbtn z-10"
                  onClick={showPassword}
                >
                  <img
                    className="w-[22px] z-10 invert"
                    ref={ref}
                    src="icons/eye.png"
                    alt="PasswordShowToggle"
                  />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-500 rounded-full px-8 py-2 w-fit border cursor-pointer coptbtn border-blue-900 text-white"
            >
              <CiSaveDown1 size={20} strokeWidth={1} />
              Save
            </button>
          </div>

          <div className="passwords">
            <h2 className="font-bold text-2xl py-4 text-white">Your Passwords</h2>
            {passwordArray.length === 0 && <div className="text-white"> No passwords to show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-300">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center gap-3">
                            <a
                              href={
                                item.site.startsWith("http")
                                  ? item.site
                                  : `https://${item.site}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.site}
                            </a>
                            <span
                              className="cursor-pointer coptbtn"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <FaCopy />
                            </span>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center gap-3">
                            <span>{item.username}</span>
                            <span
                              className="cursor-pointer coptbtn"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <FaCopy />
                            </span>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center gap-3">
                            <span>{"*".repeat(6)}</span>
                            <span
                              className="cursor-pointer coptbtn"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <FaCopy />
                            </span>
                          </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                          <div className="flex justify-center gap-3">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                editPassword(item._id);
                              }}
                            >
                              <FaEdit />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                deletePassword(item._id);
                              }}
                            >
                              <MdDelete />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
    </>
  );
};

export default Manager;
