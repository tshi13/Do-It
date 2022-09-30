import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 250, maxWidth:300, boxShadow: 2, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Task name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Secondary title
        </Typography>
        <Typography variant="body2">
          Content
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Finished</Button>
      </CardActions>
    </Card>
  );
}