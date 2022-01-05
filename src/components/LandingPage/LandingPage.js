import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

import Simulation from '../Simulation';

import './LandingPage.css';

function LandingPage({ gridArray, setGridArray, rowCount, columnCount, obstructionCount, setRenderLandingPage, resetInputs }) {
    const [simulationInit, setSimulationInit] = useState();
    const [initDrag, setInitDrag] = useState(false);
    const [dragCompleted, setDragCompleted] = useState(false)
    const [inputBlockKey, setInputBlockKey] = useState()
    const [startSimulation, setStartSimulation] = useState(false)

    useEffect(() => {
        setGridArray(Array.from(Array(rowCount), _ => Array(columnCount).fill(0)))
    }, [])

    const handleClickBackButton = () => {
        resetInputs()
        setRenderLandingPage(false)
    }

    const handleClickInitSimulation = () => {
        setSimulationInit(true)
    }

    const handleClickStartSimulation = () => {
        setStartSimulation(true)
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
        if (e.target.className !== "grid-block-filled") {
            let newArr = gridArray
            e.target.className = "grid-block-filled"
            setDragCompleted(true)
            newArr[e.target.getAttribute('row')][e.target.getAttribute('col')] = 2
            setGridArray(newArr)
        }
    }

    const onDragEnd = (e) => {
        e.preventDefault()
        if (dragCompleted) {
            e.target.draggable = false
            e.target.className = "empty-obstruction"
            if (!initDrag) {
                setInitDrag(true)
            }
        }
    }

    return (
        <Col>
            {!startSimulation && <Col className='py-4 landing-page-header'>
                {simulationInit ? "Select the waterflow start point by clicking on any of blue boxes" : "Drag the obstructions and place it inside the grid"}
            </Col>
            }

            <Row className='py-5 mx-auto landing-page-container'>
                {!startSimulation ?
                    <>
                        <Col xs={12} sm={9}>
                            {gridArray.map((row, rid) => {
                                if (rid === rowCount - 1 || (rid === 0 && !simulationInit)) return

                                if (rid === 0 && !inputBlockKey) return <div key={rid} className="input-grid">
                                    {row.map((_, cid) =>
                                        <div key={cid} className="input-block" onClick={() => handleClickInputBlock(cid)} />
                                    )}
                                </div>

                                if (rid === 0 && inputBlockKey)
                                    return <div key={rid} className='input-block-selected'>
                                        {row.map((_, cid) => {
                                            return cid === inputBlockKey ?
                                                <div key={inputBlockKey} className="selected-input-box" />
                                                :
                                                <div key={cid} className="selected-empty-box" />
                                        })}
                                    </div>

                                return <div key={rid} className='grid'>
                                    {row.map((_, cid) =>
                                        <div key={cid} row={rid} col={cid} onDrop={onDrop} onDragOver={onDragOver} className="grid-blocks" />
                                    )}
                                </div>
                            }
                            )}
                        </Col>

                        <Col xs={12} sm={3}>
                            {[...Array(obstructionCount)].map(() =>
                                <div className="filled-obstruction" onDragStart={onDragStart} onDragEnd={onDragEnd} draggable />
                            )}
                        </Col>
                    </>
                    :
                    <Simulation handleClickBackButton={handleClickBackButton} gridArray={gridArray} setGridArray={setGridArray} rowCount={rowCount} columnCount={columnCount} inputBlockKey={inputBlockKey} />
                }
            </Row>

            <Col className='p-0'>
                <Button className='back-button border-0' onClick={handleClickBackButton}>Back</Button>
                
                {!simulationInit && <Button disabled={!initDrag ? true : false} onClick={handleClickInitSimulation} className='ml-3 start-simulation-button border-0'>Start simulation</Button>
                }

                {!startSimulation && inputBlockKey && <Button onClick={handleClickStartSimulation} className='ml-3 start-simulation-button border-0'>Start</Button>
                }
            </Col>
        </Col>
    );
}

export default LandingPage;