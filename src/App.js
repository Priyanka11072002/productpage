import "./styles.css";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardMedia,
  CardActionArea,
  CardActions,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  cardmedia: {
    transition: "transform 1s linear",
    "&:hover": {
      transform: "scaleX(1.3)  scaleY(1)"
    }
  }
});

export default function App() {
  const classes = useStyles();
  const [page, setPage] = useState([]);
  useEffect(() => {
    function fetchApi() {
      fetch("https://fakestoreapi.com/products/")
        .then((data) => data.json())
        .then((item) => setPage(item));
    }
    fetchApi();
  }, [page]);
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",

        justifyContent: "space-around",

        flexWrap: "wrap",
        padding: "30px 15px"
      }}
    >
      {page &&
        page.map((items, index) => (
          <Card
            className={classes.cardmedia}
            key={index}
            sx={{
              width: "340px",
              height: "500px",
              margin: "12px  20px"
            }}
          >
            <CardActionArea>
              <CardMedia
                className={classes.cardmedia}
                image={items.image}
                alt={items.title}
                component="img"
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  padding: "10px 3px 2px 1px"
                }}
              />
              <CardContent>
                <Typography variant="h5">
                  ({items.id}) {items.title}
                </Typography>
                <Typography variant="h6"> category:{items.category}</Typography>
                <Typography variant="p">
                  description:{items.description}
                </Typography>
                <Typography variant="h6">
                  price:{items.price}
                  {"            "}
                  {items.rating.rate && items.rating.count
                    ? `rate:${items.rating.rate}           count:${items.rating.count}`
                    : ""}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
    </Stack>
  );
}
