import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Tutorial.css';

import tutorial1 from '../assets/DoItCrop.png';
import CreateGroupIcon from '../assets/CreateGroupIcon.png';
import GearBox from '../assets/GearBox.png';
import GroupChat from '../assets/GroupChat.png';
import GroupInvite from '../assets/GroupInvite.png';
import SearchGroups from '../assets/SearchGroups.png';


export default function Tutorial(props) {
    // changing to const, and equal to the props
    // show and setShow -- we don't need to change it locally, we just need
    // to change the state in the parent
    let [show, setShow] = useState(props.showTutorial);
    let [step, setStep] = useState(1);
    let [totalSteps, setTotalSteps] = useState(8);

    useEffect(() => {
        setShow(props.showTutorial);
    }, [props.showTutorial]);

    const renderStepCircles = () => {
        let circles = [];
        for (let i = 0; i < totalSteps; i++) {
            if(step === i + 1) {
                circles.push(<div className="step-circle activeStep" key={i}><div className="step-number">{i + 1}</div></div>);
            } else if (i < step) {
                circles.push(<div className="step-circle completedStep" key={i}><div className="step-number">{i + 1}</div></div>);
            }
            else {
                circles.push(<div className="step-circle" key={i}><div className="step-number">{i + 1}</div></div>);
            }
        }
        return circles;
    }

    const handleFinish = () => {
        props.setShowTutorial(false);
        setShow(false);
        sessionStorage.setItem("shownTutorial", true);
    }

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleFinish();
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Welcome to DoIt!</div>
                        <div className="tutorial-step-description">DoIt is a task management app that allows you to create and manage tasks for yourself and your friends.</div>
                        <div className="tutorial-step-description">This tutorial will walk you through the basics of using the app. Click the <b>Next</b> button to continue.</div>
                    </div>
                );
                break;
            case 2:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">DoIt: An awesome application to find the better you!</div>
                        <img src={tutorial1} alt="tutorial1" className="tutorial-step-image "/>
                        <div className="tutorial-step-description">The DoIt App helps you and your friends stay focused and motivated on the important things in life.</div>
                    
                    </div>
                );
                break;
            case 3:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Creating Groups</div>
                        <img src={CreateGroupIcon} alt="CreateGroupIcon" className="tutorial-step-image" style={{width:"60%"}}/>
                        <div className="tutorial-step-description">To create a group, please press <b>Create Group</b> on the side bar.</div>
                    </div>
                );
                break;
            case 4:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Inviting Friends</div>
                        <img src={GroupInvite} alt="GroupInvite" className="tutorial-step-image" style={{width:"60%"}}/>
                        <div className="tutorial-step-description">After you create a group, you can send the <b>Invite Code</b> on the right side of the screen to your friends.</div>
                    </div>
                );
                break;
            case 5:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Chatting in Groups</div>
                        <img src={GroupChat} alt="GroupChat" className="tutorial-step-image" style={{width:"60%"}}/>
                        <div className="tutorial-step-description">You can chat with friends via the <b>group chat!</b></div>
                    </div>
                );
                break;
            case 6:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Searching for Groups</div>
                        <img src={SearchGroups} alt="SearchGroups" className="tutorial-step-image" style={{width:"60%"}}/>
                        <div className="tutorial-step-description">At the center of the top navigation bar, you can <b>search for groups</b> by name or Invite Code.</div>
                    </div>
                );
                break;
            case 7:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Creating Group Tasks</div>
                        <img src={GearBox} alt="GearBox" className="tutorial-step-image" style={{width:"60%"}}/>
                        <div className="tutorial-step-description">You can press the gearbox and then press <b>Create Task</b> to create a task for the entire group. People who press <b>Join Task</b> will be pay coins to join the task and receive their payout on a regular basis if they complete their tasks.</div>
                    </div>
                );
                break;
            case 8:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">That's it!</div>
                        <img src={tutorial1} alt="tutorial1" className="tutorial-step-image "/>
                        <div className="tutorial-step-description">You've completed the DoIt tutorial. We hope you enjoy the application! For further questions, please see <a href="https://github.com/jhu-oose-f22/team-doit-project-repo">our Github Repo.</a> Thank you for using DoIt!</div>
                    </div>
                );
                break;
        }
    }


   return (
        <Modal show={show} onHide={() => {setShow(false); handleFinish();}} centered className = "tutorial-modal" size = "md" >
            <Modal.Header closeButton>
                <div className="tutorialHeader">
                    <div className = "tutorialCircles">
                        {renderStepCircles()}
                    </div>
                    <div className="tutorial-title"> Quick Start Guide </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="tutorial">
                    <div className="tutorialContent">
                        {renderStep()}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className = "TutorialFooter">
                {step > 1 ? <Button variant="secondary" onClick={() => {handleBack();}}>Back</Button> : null}
                {step === totalSteps ? <Button variant="primary" onClick={() => {handleNext(); }}>Finish</Button> : <Button variant="primary" onClick={() => {handleNext();}}>Next</Button>}
            </Modal.Footer>
        </Modal>
    );
}



    
    