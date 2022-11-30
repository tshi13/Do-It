import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Tutorial.css';

import tutorial1 from '../assets/DoItLogo.png';

export default function Tutorial(props) {
    let [show, setShow] = useState(props.showTutorial);
    let [step, setStep] = useState(1);
    let [totalSteps, setTotalSteps] = useState(props.tutorialSteps);

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
            case 2:
                return (
                    <div className="tutorial-step">
                        <div className="tutorial-step-title">Sample Code</div>
                        <img src={tutorial1} alt="tutorial1" className="tutorial-step-image "/>
                        <div className="tutorial-step-description">Sample Text</div>
                    
                    </div>
                );
            case 3:
                return (
                <div className="tutorial-step">
                    <div className="tutorial-step-title">Sample Code</div>
                    <div className="tutorial-step-description">Sample Text</div>
                </div>
                );
        }
    }


   return (
        <Modal show={show} onHide={() => {setShow(false); props.setShowTutorial(false);}} centered className = "tutorial-modal" size = "md" >
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
                {step === 3 ? <Button variant="primary" onClick={() => {handleNext(); }}>Finish</Button> : <Button variant="primary" onClick={() => {handleNext();}}>Next</Button>}
            </Modal.Footer>
        </Modal>
    );
}



    
    