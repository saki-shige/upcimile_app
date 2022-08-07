import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { handleGetCreators } from "../functionals/creators";
import { Creator } from "../../interface";

import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent} from "@mui/material";

const Creators: React.FC = () => {
  const [ creators, setCreators ] = useState<Creator[]>([])

   useEffect(()=>{
    const f = async() => {
      const creators = await handleGetCreators();
      setCreators(creators);
    }
    f();
  },[]);

  return (
    <>
    <Box sx={{my: 5, px:10, mx: 'auto'}}>
      <Typography sx={{textAlign:'center'}}>
        企業一覧
      </Typography>
    </Box>
    <Card
      sx={{
        backgroundColor: 'white',
        width: '80%',
        maxWidth: 1100,
        py: 10,
        mx: 'auto',
        mb: 10,
        zIndex: 'modal',
        borderRadius: 2,
      }}
    >
      <Grid container spacing={1} sx={{ px:8 }}>
      {creators.map((creator,index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 0, borderRadius: 0 }}
          >
            <CardActionArea component={Link} to={`/creators`}>
              <CardMedia
                component="img"
                image={creator.icon}
                alt={creator.channelTitle}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {creator.channelTitle}
                </Typography>
                <Typography>
                  {creator.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Card>
    </>
  );

}

export default Creators;
