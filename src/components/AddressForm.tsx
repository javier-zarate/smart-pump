import { Grid, InputLabel, TextField, Typography } from "@mui/material";
import { styles } from "styles/styles";

interface AddressFormProps {
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  zipcode: string;
  setZipcode: React.Dispatch<React.SetStateAction<string>>;
}

export const AddressForm = ({
  street,
  setStreet,
  city,
  setCity,
  state,
  setState,
  zipcode,
  setZipcode,
}: AddressFormProps) => {
  return (
    <Grid item>
      <Typography variant="h5" color="primary" textAlign="center" gutterBottom>
        Address
      </Typography>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <InputLabel>Street</InputLabel>
          <TextField
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            size="small"
            sx={{ ...styles.inputFields }}
          />
          <InputLabel>City</InputLabel>
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            size="small"
            sx={{ ...styles.inputFields }}
          />
        </Grid>

        <Grid item>
          <InputLabel>State</InputLabel>
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            size="small"
            sx={{ ...styles.inputFields }}
          />

          <InputLabel>Zipcode</InputLabel>
          <TextField
            label="ZipCode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            size="small"
            sx={{ ...styles.inputFields }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
