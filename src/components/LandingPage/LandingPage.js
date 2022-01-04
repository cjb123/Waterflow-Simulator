import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap'

import './LandingPage.css';

function LandingPage({ rowCount, columnCount, obstructionCount }) {
    const [gridArray, setGridArray] = useState(Array.from(Array(rowCount), _ => Array(columnCount).fill(0)))

    return (
        <Row className='py-5 landing-page-container'>
            <Col xs={12} sm={9}>
                {gridArray.map((row, rid) => {
                    if (rid === rowCount - 1 || rid === 0) return
                    return <div key={rid} style={{ height: 30 }}>
                        {row.map((col, cid) =>
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
    );
}

export default LandingPage;