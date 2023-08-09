import React, { useState, useEffect } from "react";
import { Box, Avatar, FormControl, useToast } from "@chakra-ui/react";
import axios from "axios";

const baseUrl = "http://localhost:8000/";

const uploadAvatar = async (formData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${baseUrl}profile/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ["success", response];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

export const ChangeAvatarSidebar = () => {
  const avatar = localStorage.getItem("avatar");
  const [avatarState, setAvatarState] = useState(avatar);
  const userId = localStorage.getItem("userId");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const toast = useToast();

  const handleToast = (props, content) => {
    toast({
      description: content,
      status: props,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleFileChange = async (e) => {
    const file = await e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("cashierId", userId);
    formData.append("avatar", file);
    const result = await uploadAvatar(formData);
    if (result[0] === "success") {
      handleToast("success", "Successfully change avatar");
      localStorage.setItem("avatar", result[1].data.avatarPath);
      setAvatarState(result[1].data.avatarPath);
    } else {
      handleToast("error", "Failed change avatar");
    }
  };

  useEffect(() => {
    const avatar = localStorage.getItem("avatar");
    setAvatarState(avatar);
  }, []);

  if (isAdmin) {
    return (
      <Box>
        <Avatar
          boxSize="80px"
          name="Profile Picture"
          src={avatar ? `${baseUrl}${avatarState}` : "image/foodlogo.png"}
          cursor="pointer"
        />
      </Box>
    );
  } else {
    return (
      <Box>
        <form>
          <FormControl>
            <Box textAlign="left">
              <label>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Avatar
                  boxSize="80px"
                  name="Profile Picture"
                  src={`${baseUrl}${avatar}`}
                  cursor="pointer"
                />
              </label>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
};