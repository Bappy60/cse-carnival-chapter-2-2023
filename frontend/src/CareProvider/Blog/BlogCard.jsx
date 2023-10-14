import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { baseURL } from '../../../config';
import {NavLink} from "react-router-dom"
export default function RecipeReviewCard({card}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <NavLink to={`/viewblog/${card._id}`}>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {card.careProviderName.charAt(0)+" "+card.careProviderName.charAt(1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={card.careProviderName}
        subheader={card.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${baseURL}/images/${card.images}`}
      />
      <CardContent>
      <Typography variant="h6" sx={{color:"black"}}>
        {card.title.substr(0,20)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {card.desc.substr(0,50)}
        </Typography>
      </CardContent>
    
    </Card>
    </NavLink>
  );
}