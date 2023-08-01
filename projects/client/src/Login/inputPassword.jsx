import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function PasswordInput({ value, onChange }) {
  return (
    <FormControl mb={4}>
      <FormLabel>Password</FormLabel>
      <Input type="password" value={value} onChange={onChange} />
    </FormControl>
  );
}

export default PasswordInput;