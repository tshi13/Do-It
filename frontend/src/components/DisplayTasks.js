import {Grid, Typography} from '@mui/material';
import TaskCard from './Task/TaskCard';


export default function DisplayTasks(props){

    const tasks = props.privateTasks;
    const userID = props.userID;
    const deleteTask = props.deleteTask;
    const setCoins = props.setCoins;

    function getFormattedDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    return (
        <>
            <Grid container spacing={1}>
                {
                   
                    tasks.map((task, index) => {
                        let checkedDate = new Date(task.checkedDate);
                        let modifiedDate = new Date(task.checkedDate);
                        modifiedDate.setDate(modifiedDate.getDate() + task.time);
                        let taskData = {
                            taskName: task.taskName,
                            coinsEntered: task.coinsEntered,
                            time: task.time,
                            id: task._id,
                            completedList: task.completedList,
                            type: "private",
                            userID: null,
                            lastCheckOff: getFormattedDate(checkedDate),
                            nextCheckOff: getFormattedDate(modifiedDate),
                        }

                        return (
                            <Grid item xs={2.2} key={index}>
                                <TaskCard setCoins = {setCoins} deleteTask = {deleteTask} task = {taskData} key = {index} userID = {userID} owner = {userID} />
                            </Grid>
                        );
                    })
                }
            </Grid>
            
        </>
    );
}
