import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function EmailInput({ value, onChange }) {
  return (
    <FormControl mb={4}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={value} onChange={onChange} />
    </FormControl>
  );
}

export default EmailInput;