import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import ProgressBar from '../progressBar';
import taskDAO from '../../utils/taskDAO';
import Grid from '@mui/material/Grid';
import ConfirmBox from '../ConfirmBox';
import userDAO from '../../utils/userDAO';



export default function TaskCard(props) {
  const { task } = props;
  const [userCompleted, setUserCompleted] = React.useState();
  const [list, setList] = React.useState(task.completedList ? task.completedList : []); // list of users who have completed the task 
  const groupSize = props.groupSize ? props.groupSize : 1;
  const userID = props.userID;
  const deleteTask = props.deleteTask;
  
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [showList, setShowList] = React.useState(false);
  const owner = props.owner;
  const setCoins = props.setCoins;
  const [joinedList, setJoinedList] = React.useState(task.joinedList ? task.joinedList : []);
  const [joined, setJoined] = React.useState(false);
  const [coinPool, setCoinPool] = React.useState(task.coinPool ? task.coinPool : 0);
  const [completedUsernames, setCompletedUsernames] = React.useState([]);
  const [joinedUsernames, setJoinedUsernames] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");


  const handleSubmit = () => {
    if(task.type !== "group" || (task.type === "group" && joined)) {
      let newCompletedList = task.completedList ? task.completedList : [];
      newCompletedList.push(userID);

      let newTask = {
        taskID: task.id,
        data: {
          completedList: newCompletedList,
        },
      };
      taskDAO.updateTask(newTask).then((res) => {
        setUserCompleted(true);
        setList(newCompletedList);
      });
    } else if(task.type === "group" && !joined) {
      alert ("You must join the task to complete it!");
    }
  };

  
  React.useEffect(() => {
    if(task.completedList || task.userID === userID) {
      if(task.completedList.includes(userID) || task.userID === userID ) {
        setUserCompleted(true);
      }
    }
    if(task.joinedList) {
      if(task.joinedList.includes(userID)) {
        setJoined(true);
      }
    }

    let userName = "";
    if(task.userID) {
      userDAO.getUserData(task.userID).then((res) => {
        userName = res.name;
        setUsername(userName);
      });

    }
    

  }, []);

  React.useEffect(() => {
    if(list) {
      let completedUsernames = [];
      list.map((item, index) => {
        userDAO.getUserData(item).then((res) => {
          completedUsernames.push(res.name);
        });
      });
      setCompletedUsernames(completedUsernames);
    }
  }, [list]);

  React.useEffect(() => {
    if(joinedList) {
      let joinedUsernames = [];
      joinedList.map((item, index) => {
        userDAO.getUserData(item).then((res) => {
          joinedUsernames.push(res.name);
        });
      });
      setJoinedUsernames(joinedUsernames);
    }
  }, [joinedList]);
  
  React.useEffect(() => {
    if(task.type === "group") {
      setMessage("Are you sure you want to finish this task? This will pay out to everyone and delete the task. Please make sure to have everyone (INCLUDING YOURSELF) hit 'Submit' before Clicking confirm.");
    } else if(task.type === "groupIndividual") {
      setMessage("Are you sure you want to finish this task? This will pay out to the user who the task is for even if they haven't reached the goal.");
    } else {
      setMessage("Are you sure you want to finish this task?");
    }
  }, [task.type]);


  const handleFinishTask = () => {
    let completedUsers = task.completedList ? task.completedList : [];
    if(task.type === "group") {
    for(let i = 0; i < completedUsers.length; i++) {
      let coinsToAdd = Math.ceil(coinPool / completedUsers.length);
      userDAO.getUserData(completedUsers[i]).then((res) => {

        if(res) {
          let coins = res.coins ? res.coins : 0;
          coins += coinsToAdd;
          userDAO.updateUser(completedUsers[i], {coins: coins});
          if(completedUsers[i] === userID) {
            sessionStorage.setItem("coins", coins);
            setCoins(coins);
          }
        }
      });
    }
  } else if(task.type === "groupIndividual") {
    let userData = task.userID
    userDAO.getUserData(userData).then((res) => {
      if(res) {
        let coins = res.coins ? res.coins : 0;
        userDAO.updateUser(userData, {coins: coins});
        if(userData === userID) {
          sessionStorage.setItem("coins", coins);
          setCoins(coins);
        }
      }
    });
  } else if(task.type === "private") {
    let userData = userID;
    userDAO.getUserData(userData).then((res) => {
      if(res) {
        let coins = res.coins ? res.coins : 0;
        coins += task.coinsEntered;
        userDAO.updateUser(userData, {coins: coins});
          sessionStorage.setItem("coins", coins);
          setCoins(coins);
      }
    });
  }
    deleteTask(task.id);
    setShowPrompt(false);
  };

  const handleJoinTask = () => {
    let newJoinedList = joinedList ? joinedList : [];
    newJoinedList.push(userID);
    userDAO.getUserData(userID).then((res) => {
      if(res) {
        let coins = res.coins ? res.coins : 0;
        coins -= task.coinsEntered;
        if(coins >= 0) {
          taskDAO.getTask(task.id).then((res) => {
            if(res) {
              userDAO.updateUser(userID, {coins: coins});
              sessionStorage.setItem("coins", coins);
              setCoins(coins);
              let newTask = {
                taskID: task.id,
                data: {
                  joinedList: newJoinedList,
                },
              };
              let coinPool = res.coinPool ? res.coinPool : 0;
              coinPool += task.coinsEntered;
              newTask.data.coinPool = coinPool;
              taskDAO.updateTask(newTask).then((res) => {
                if(res) {
                setJoined(true);
                setJoinedList(newJoinedList);
                setCoinPool(coinPool);
                }
              });
            }  
          });
        } else {
          alert("You don't have enough coins to join this task!");
        }
      }

    });
  };

  return (
    <div>
      <ListItem >
        <Card sx={{ width: '100%', boxShadow: 2}}>
          <CardContent>
            {task.type !== "private" ? (
              <div>
                <div className = "buttonStyle" style={{float: "left"}}>
                { !joined && task.type === "group" ? (
                    <Button size = "small" onClick={handleJoinTask}>Join Task</Button>
                  ) : (
                    <div></div>
                  )
                }
                </div>
                <div className="buttonStyle" style = {{float: 'right'}} >
                      {showList  ? 
                        <Button size="small" onClick={() => setShowList(false)}>Show Task</Button> : 
                        <Button size="small" onClick={() => setShowList(true)}>Show Stats</Button>
                      }
                </div>
            </div>
            ) : null}
            {!showList ? 
                <div>
                  <Typography variant="h5" component="div" className="title" style={{color: 'black', textOverflow: 'ellipsis'}}>
                    {task.taskName}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Time: {task.time}
                  </Typography>
                  {
                    task.type === "groupIndividual" ?
                    <div>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                      Coins for Completion: {task.coinsEntered}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        Username: {username}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        Checked off by: {Array.isArray(list) ? list.length : 0} Person(s)
                      </Typography>
                      <ProgressBar bgcolor="#6a1b9a"  base = {groupSize} compare = {list.length} style ={{width: '100%'}}/>
                    </div>
                    :
                    <></>
                }
                {
                  task.type === "group" ?
                  <div>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Cost To Join: {task.coinsEntered}
                    </Typography>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Coin Pool: {coinPool}
                    </Typography>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Completed by: {Array.isArray(list) ? list.length : 0} Person(s)
                    </Typography>
                    <ProgressBar bgcolor="#6a1b9a" base = {joinedList.length} compare = {list.length} style ={{width: '100%'}}/>
                  </div>
                  :
                  <></>
                } 
                {
                  task.type === "private" ?
                  <div>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Coins for Completion: {task.coinsEntered}
                    </Typography>
                  </div>
                    :
                    <></>
                }
            </div>
            :
            <div className = "userList" style ={{marginTop: '5%', width: '100%'}}>
              <div className = "completedByList" >
                <p component="div" style={{color: 'black', textOverflow: 'ellipsis'}} >
                  {task.type === "groupIndividual" ? "Checked off" : "Completed"}
                </p>
                <Grid container direction = "column">
                  {completedUsernames ? completedUsernames.map((username, index) => { 
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key = {index}>
                        <Typography sx={{ mb: 1 }} color="text.secondary">
                          {username}
                        </Typography>
         
                      </Grid>
                    )
                  }) : <></>}
                </Grid>
              </div>
              {task.type === "group" ?
              <div className = "joinedByList">
                <p component="div" style={{color: 'black', textOverflow: 'ellipsis'}} >
                  Joined
                </p>
                <Grid container direction = "column">
                  {joinedUsernames ? joinedUsernames.map((username, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key = {index}>
                        <Typography sx={{ mb: 1 }} color="text.secondary">
                          {username}
                        </Typography>
                      </Grid>
                    )
                  }) : <></>}
                </Grid>
              </div> : <></>}
            </div>
            }
          </CardContent>
          {!showList ? 
          <CardActions>
            
            { task.type !== "private" ?
             userCompleted ?
              <Button size="small" disabled>Completed</Button>
              :
              <Button size="small" onClick={handleSubmit}>Submit</Button>
              : null
             }
            { owner == userID ?
              <Button size="small" onClick={() => setShowPrompt(true)}>Finish</Button>
              :
              <></>
            }
          </CardActions>
          :
          <></>
          }
        </Card>
      </ListItem>
      <ConfirmBox show={showPrompt} setShow={setShowPrompt} onConfirm ={() => {handleFinishTask()}} onCancel = {() => {setShowPrompt(false)}} message = {message} />
    </div>
  );
}