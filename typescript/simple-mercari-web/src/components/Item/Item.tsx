import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button,CardActions } from "@mui/material";
import { MenuAppBar } from "../MenuAppBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {Barter} from "../Barter";
interface Item {
  item_uuid: number;
  item_name: string;
  category_name: string;
  price: number;
  on_sale: number;
  image: string;
  exchange_items: number;
  user_uuid: number;
  is_public:number;
}

const server = process.env.API_URL || "http://127.0.0.1:9000";
//const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

export const ItemDetail: React.FC<{}> = () => {
  const initialState = {
    item_uuid: 0,
    item_name: "",
    category_name: "",
    price: 0,
    on_sale: 1,
    image: "",
    exchange_items: 0,
    user_uuid: 0,
    is_public:1
  };
  const [item, setItem] = useState<Item>(initialState);
  const [isBarter, setMode] = useState(false);
  let { id } = useParams();
  const fetchItem = () => {
    fetch(server.concat("/items/" + id), {
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
        setItem(data);
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
      {item.image !== "" && (
        <>
            <Card
              key={item.item_uuid}
              sx={{mt:2, width: 220, height: 275, mx: "auto" }}
            >
              
                {!item.on_sale && (
                  <div className="SOLD">
                    <p>SOLD</p>
                  </div>
                )}
                 {!item.is_public && (
                  <div className="Private_in_Item">
                    <p>Private</p>
                  </div>
                )}
                <div className="Price_in_Item">
                  <p>{"¥" + item.price}</p>
                </div>
                <CardMedia
                  component="img"
                  height="150"
                  sx={{objectFit:"scale-down"}}
                  image={fetchImage(item)}
                  alt={item.item_name}
                />
                <CardContent>
                  <Typography
                    textAlign="center"
                    variant="h6"
                    component="div"
                  >
                    {item.item_name}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Chip label={"#"+item.category_name}  variant="outlined"/>
                    {item.exchange_items===1 && (
                      <Chip label="barter" onClick={()=>setMode(!isBarter)}/>
                    )}
                  </Stack>
                </CardContent>
              <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{ mt:-1.5 }}
                onClick={() => navigator.clipboard.writeText(document.URL)}
              >
                copy the link
              </Button>
            </CardActions>
            </Card>

            {isBarter&&(<Stack sx={{pt:2}} direction="row"  justifyContent="center"><Barter/></Stack>)}
        </>
      )}
    </>
  );
};
