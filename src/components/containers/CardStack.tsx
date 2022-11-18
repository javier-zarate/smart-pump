import { Card, CardContent, Typography } from "@mui/material";
import { styles } from "styles";

interface CardStackProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}
export const CardStack = ({ children, title }: CardStackProps) => {
  return (
    <Card sx={{ ...styles.mainCard }} variant="outlined">
      <CardContent>
        <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
          {title}
        </Typography>
        <Card variant="outlined" sx={{ ...styles.innerCard }}>
          <CardContent>{children}</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
