import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

import './LandingPage.css';

function LandingPage({ rowCount, columnCount, obstructionCount, setRenderLandingPage, resetInputs }) {
    const [ gridArray, setGridArray ] = useState([])
    const [ simulationInit, setSimulationInit ] = useState(false);
    const [ initDrag, setInitDrag ] = useState(false);
    const [ dragCompleted , setDragCompleted ] = useState(false)
    const [ inputBlockKey, setInputBlockKey ] = useState()
    // const [ dragCompletedArr , setDragCompletedArr ] = useState([...Array(obstructionCount)].fill(0))

    useEffect(()=>{
        setGridArray(Array.from(Array(rowCount), _ => Array(columnCount).fill(0)))
    },[])

    const handleClickBackButton = () => {
        resetInputs()
        setRenderLandingPage(false)
    }
    
    const handleClickInitSimulation = () => {
        setSimulationInit(true)
    }

    const handleClickInputBlock = (key) => {
       setInputBlockKey(key)
    }

    const onDragStart = () => {
        setDragCompleted(false)
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e) => {
        e.preventDefault()
        e.target.className = (e.target.className != 'grid-block-filled') && 'grid-block-filled'
        setDragCompleted(true)
    }

    const onDragEnd = (e) => {
        e.preventDefault()
        if (dragCompleted) {
            e.target.draggable = false
            // e.target.style.background = "#fffff"
            e.target.className = "empty-obstruction"
            if(!initDrag) {
                setInitDrag(true)
            }
            
        }
    }

    return (
        <Col className=''>
            <Col className='py-4 landing-page-header'>
                {simulationInit ? "Select the waterflow start point by clicking on any of blue boxes" : "Drag the obstructions and place it inside the grid"}
            </Col>
            <Row className='py-5 mx-auto landing-page-container'>
                <Col xs={12} sm={9}>
                    {gridArray.map((row, rid) => {
                        if (rid === rowCount - 1 || (rid === 0 && !simulationInit)) return

                        if (rid === 0) return <div key={rid} className={"input-grid"}>
                        {row.map((_, cid) =>
                            <div key={cid} className="input-block" onClick={() => handleClickInputBlock(cid)} />
                        )}
                    </div>                        
                        return <div key={rid} className='grid'>
                            {row.map((_, cid) =>
                                <span key={cid} row={rid} col={cid} onDrop={onDrop} onDragOver={onDragOver} className="grid-blocks" />
                            )}
                        </div>
                    }
                    )}
                </Col>

                <Col xs={12} sm={3}>
                    {[...Array(obstructionCount)].map((obs) =>
                        <div className="filled-obstruction" onDragStart={onDragStart} onDragEnd={onDragEnd} draggable />
                    )}
                </Col>
            </Row>

            <Col className='p-0'>
                <Button className='back-button border-0' onClick={handleClickBackButton}>Back</Button> 
                <Button disabled={!initDrag ? true: false} onClick={handleClickInitSimulation} className='ml-3 start-simulation-button border-0'>Start simulation</Button>
            </Col>
        </Col>
    );
}

export default LandingPage;