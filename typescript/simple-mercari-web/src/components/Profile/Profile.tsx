import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { MenuAppBar } from "../MenuAppBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface Item {
  item_uuid: number;
  item_name: string;
  category_name: string;
  price: number;
  on_sale: number;
  image: string;
  exchange_items: number;
  user_id: number;
  is_public:number;
}
const server = process.env.API_URL || "http://127.0.0.1:9000";
//const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

export const Profile: React.FC<{}> = () => {
  const [items, setItems] = useState<Item[]>([]);
  let { user_uuid } = useParams();
  const fetchItem = () => {
    fetch(server.concat("/user_items/" + user_uuid), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("GET success:", data);
        setItems(data.items);
      })
      .catch((error) => {
        console.error("GET error:", error);
      });
  };

  const fetchImage = (item: Item): string => {
    return server + item.image;
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MenuAppBar />
      <Typography textAlign="center" variant="h5">
        User {user_uuid}
      </Typography>
      <Divider />
      <Typography textAlign="center" variant="h5">
        Listed items
      </Typography>
      <Grid
        sx={{ pt: 2, rowGap: 5 }}
        container
        spacing={0}
        columns={{ xs: 2, sm: 12, md: 16 }}
      >
        {items.map((item) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={item.item_uuid}>
              <Card
                key={item.item_uuid}
                sx={{ width: 220, height: 235, mx: "auto" }}
              >
                <CardActionArea
                  href={"http://localhost:3000/content/item/" + item.item_uuid}
                >
                  {!item.on_sale && (
                    <div className="SOLD">
                      <p>SOLD</p>
                    </div>
                  )}
                  {!item.is_public && (
                    <div className="Private">
                      <p>Private</p>
                    </div>
                  )}
                  <div className="Price">
                    <p>{"¥" + item.price}</p>
                  </div>
                  <CardMedia
                    component="img"
                    height="150"
                    image={fetchImage(item)}
                    sx={{objectFit:"scale-down"}}
                    alt={item.item_name}
                  />
                  <CardContent>
                    <Typography textAlign="center" variant="h6" component="div">
                      {item.item_name}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Chip
                        label={"#" + item.category_name}
                        variant="outlined"
                      />
                      {item.exchange_items === 1 && <Chip label="barter" component="a" href={"http://localhost:3000/content/myitem/" + item.item_uuid} clickable/>}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
