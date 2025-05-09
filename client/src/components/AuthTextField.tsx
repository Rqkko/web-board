import { styled, TextField } from "@mui/material";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

interface AuthTextFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthTextField({ label, type, value, onChange }: AuthTextFieldProps) {
  return (
    <CssTextField 
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      style={{ margin: '20px', width: '600px' }}
      slotProps={{
        inputLabel: {
          style: { fontSize: '24px' }
        },
        input: {
          style: { fontSize: '24px' }
        }
      }}
    />   
  );
}
