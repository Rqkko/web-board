import { styled, TextField } from "@mui/material";

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6F7E8C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
    },
  },
});

interface PostTextFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
}

export default function PostTextField({ type, value, onChange, multiline }: PostTextFieldProps) {
  return (
    <CssTextField 
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      style={{ margin: '20px', width: '50%' }}
      slotProps={{
        inputLabel: {
          style: { fontSize: '24px' }
        },
        input: {
          style: { fontSize: '24px' }
        }
      }}
      multiline={multiline}
      rows={multiline ? 4 : 1}
    />   
  );
}