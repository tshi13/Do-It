import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import ProgressBar from '../progressBar';
import taskDAO from '../../utils/taskDAO';

export default function TaskCard(props) {
  const { task } = props;
  const [completed, setCompleted] = React.useState(task.completed);
  const [userCompleted, setUserCompleted] = React.useState();
  const [list, setList] = React.useState(task.completedList ? task.completedList : []); // list of users who have completed the task 
  const [progress, setProgress] = React.useState(0);
  const groupSize = task.groupSize ? task.groupSize : 1;



  const handleSubmit = () => {
    let newCompletedList = task.completedList ? task.completedList : [];
    newCompletedList.push(task.userID);

    let newTask = {
      taskID: task.id,
      data: {
        completedList: newCompletedList,
      },
    };

    if(task.type === "private") {
      newTask.data.completed = true;
    } else if(task.type === "groupIndividual") {
      let maxSize = Math.ceil(groupSize * 0.20);
      if(list.length + 1 >= maxSize) {
        newTask.data.completed = true;
      }
    }

    taskDAO.updateTask(newTask).then((res) => {
      setCompleted(res.completed);
      setUserCompleted(true);
      setList(newCompletedList);
      handleProgress(newCompletedList);
    });
  };

  const handleProgress = (newCompletedList) => {
    let compareList = newCompletedList ? newCompletedList : list;
  
    if(Array.isArray(compareList)) {
      let localProgress = 0;
      if(task.type === "group") {
        localProgress = compareList.length / groupSize * 100;
      } else if(task.type === "groupIndividual") {
        let maxSize = Math.ceil(groupSize * 0.20);
        if(compareList.length >= maxSize) {
          localProgress = 100;
        } else {
          localProgress = compareList.length / maxSize * 100;
        }
      }
      setProgress(localProgress);
    }
  };

  React.useEffect(() => {
    if(task.completedList) {
      if(task.completedList.includes(task.userID)) {
        setUserCompleted(true);
      }
    }
    handleProgress();
  }, []);

    

  return (
    <ListItem >
      <Card sx={{ width: '100%', boxShadow: 2}}>
        <CardContent>
          <Typography variant="h5" component="div" className="title" style={{color: 'black', textOverflow: 'ellipsis'}} noWrap>
            {task.taskName}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Coins entered: {task.coinsEntered}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Time: {task.time}
          </Typography>
          {
            task.type == "groupIndividual" ?
            <div>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Username: {task.username}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Checked off by: {Array.isArray(list) ? list.length : 0} Person(s)
              </Typography>
              <ProgressBar bgcolor="#6a1b9a" progress={progress} style ={{width: '100%'}}/>
            </div>
            :
            <></>
          }
          {
            task.type == "group" ?
            <div>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Completed by: {Array.isArray(list) ? list.length : 0} Person(s)
              </Typography>
              <ProgressBar bgcolor="#6a1b9a" progress={progress} style ={{width: '100%'}}/>
            </div>
            :
            <></>
          }
        </CardContent>
        <CardActions>
          {
            completed || userCompleted ?
            <Button size="small" disabled>Completed</Button>
            :
            <Button size="small" onClick={handleSubmit}>Submit</Button>
          }
        </CardActions>
      </Card>
    </ListItem>
  );
}