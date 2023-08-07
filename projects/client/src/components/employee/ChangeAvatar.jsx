import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

export const ProfileAvatar = (item) => {
  const [avatarUrl, setAvatarUrl] = useState(item.User_Profile.avatar);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming you have a function to handle file uploads and get the new avatar URL
      // This is just an example implementation, you should replace it with your own logic
      //   uploadAvatar(file)
      // .then((newAvatarUrl) => {
      //   setAvatarUrl(newAvatarUrl);
      // })
      // .catch((error) => {
      //   console.error("Error uploading avatar:", error);
      // });
    }
  };

  return (
    <Stack spacing={4}>
      <Avatar size="md" name={item.username} src={avatarUrl} />
      <FormControl>
        <FormLabel>Change Avatar</FormLabel>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
      </FormControl>
      {/* Other components */}
    </Stack>
  );
};
