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
    <ListItem>
      <Card sx={{ minWidth: 250, maxWidth:300, boxShadow: 2, }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {task.second_title}
          </Typography>
          <Typography variant="body2">
            {task.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Finished</Button>
        </CardActions>
      </Card>
    </ListItem>
  );
}