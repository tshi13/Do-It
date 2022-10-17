import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';

export default function TaskCard(props) {
  const { task } = props;
  return (
    <ListItem href="#simple-list">
      <Card sx={{ minWidth: 250, maxWidth:300, boxShadow: 2, }}>
        <CardContent>
          <Typography variant="h5" component="div" className="title" style ={{color: 'black'}}>
            {task.taskName}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Coins entered: {task.coinsEntered}
          </Typography>
          <Typography variant="body2">
            Time: {task.time}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Finished</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </ListItem>
  );
}