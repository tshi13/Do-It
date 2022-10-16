import {List} from '@mui/material';
import TaskCard from '../components/TaskCard';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

function DisplayTasks(props) {
    const { tasks } = props;
    return(
        <>
            <List style={ flexContainer }>
                {tasks.map((task, index) => {
                    return <TaskCard task = {task} key = {index}/>
                })}
            </List>
        </>
    );
}

export default DisplayTasks;