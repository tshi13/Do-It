import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import axios from 'axios';

export default function groupCard(props) {
  const { item, userID } = props;

  function handleSubmit (e) {
    e.preventDefault();
    axios.post('/addToGroup', {
        userID: userID,
        groupID: e.target.value
    })
}

  
  const joinedButton = (
	  <Button size="small" disabled>Joined</Button>
    );
  
    return (
    <ListItem>
      <Card sx={{ minWidth: 250, maxWidth:300, boxShadow: 2, }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {item.groupName}
          </Typography>
        </CardContent>
        <CardActions>
          {item.idList.includes(userID) ? joinedButton : <Button size="small" value={item._id} onClick={handleSubmit}>Join</Button>}
        </CardActions>
      </Card>
    </ListItem>
  );
}