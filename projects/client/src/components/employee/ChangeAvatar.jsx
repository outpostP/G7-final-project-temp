import React from "react";
import { Box, Avatar, FormControl, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCashier } from "../../services/reducer/employeeReducer";

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

export const ChangeAvatar = ({ item }) => {
  const dispatch = useDispatch();
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
    formData.append("cashierId", JSON.stringify(item.id));
    formData.append("avatar", file);
    const result = await uploadAvatar(formData);
    if (result) {
      handleToast("success", "Successfully change avatar");
      dispatch(getAllCashier());
    } else {
      handleToast("error", "Failed change avatar");
    }
  };

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
                size="md"
                name={item.username}
                src={`${baseUrl}${item.User_Profile.avatar}`}
                cursor="pointer"
              />
            </label>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};
