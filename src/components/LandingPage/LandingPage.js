import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'

import './LandingPage.css';

function LandingPage({ rowCount, columnCount, obstructionCount }) {
    const [gridArray, setGridArray] = useState(Array.from(Array(rowCount), _ => Array(columnCount).fill(0)))
    const [simulationInit, setSimulationInit] = useState(false);
    console.log('COUNTS : ', rowCount)
    return (
        <Col className=''>
            <Col className='py-4 landing-page-header'>
                {simulationInit ? "Select the waterflow start point by clicking on any of blue boxes" : "Drag the obstructions and place it inside the grid"}
            </Col>
            <Row className='py-5 mx-auto landing-page-container'>
                <Col xs={12} sm={9}>
                    {gridArray.map((row, rid) => {
                        if (rid === rowCount - 1 || (rid === 0 && !simulationInit)) return
                        return <div key={rid} className='grid'>
                            {row.map((_, cid) =>
                                <span key={cid} row={rid} col={cid} className="grid-blocks" />
                            )}
                        </div>
                    }
                    )}
                </Col>

                <Col xs={12} sm={3}>
                    {[...Array(obstructionCount)].map((obs) =>
                        <div className="filled-obstruction" draggable />
                    )}
                </Col>
            </Row>

            <Col className='p-0'>
                <Button className='back-button border-0'>Back</Button> 
                {!simulationInit && <Button className='ml-3 start-simulation-button border-0'>Start simulation</Button> }
            </Col>
        </Col>
    );
}

export default LandingPage;