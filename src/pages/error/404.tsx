import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  //The Grid component is used for laying out the contents of the page. The first Grid item contains an image. The second Grid item contains a Typography component with the text "404". The third Grid item contains another Typography component with the text "The page you're looking for doesn't exist". Finally, the last Grid item contains a Button component with the text "Go Back".
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      spacing={2}
    >
      <Grid item>
        <img src="/images/logo.webp" />
      </Grid>
      <Grid item>
        <motion.div
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 0.8 }}
          transition={{
            duration: 2,
          }}
        >
          <Typography variant="h1" color="primary">
            404
          </Typography>
        </motion.div>
      </Grid>
      <Grid item>
        <Typography variant="h6" color="primary">
          The page you’re looking for doesn’t exist.
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="end"
          justifyContent="space-between"
        >
          <Button variant="contained" onClick={goBack}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
