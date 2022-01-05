import React, { useState, useEffect } from 'react';

import { left, right } from '../../utilities/simulatorUtilities'
import './Simulation.css'

export default function Simulation(props) {
    const { gridArray, setGridArray, rowCount, columnCount, inputBlockKey, handleClickBackButton } = props
    const [simulator, setSimulator] = useState(true);

    var freshCol = []

    useEffect(() => {
        let simulator = bfsSim(0, [inputBlockKey])
        setGridArray(gridArray)
        setSimulator(simulator)
    }, []);

    const bfsSim = (row, col) => {
        const left = (row, colL, array) => {
            if (array[row][colL] !== 2) {
                array[row][colL] = 1
                if (array[row + 1][colL] !== 2) {
                    freshCol.push(colL)
                }
                else if (colL - 1 >= 0) left(row, colL - 1, array)
            }
            return array
        }

        const right = (row, col, array) => {
            if (array[row][col] !== 2) {
                array[row][col] = 1
                if (array[row + 1][col] !== 2) {
                    freshCol.push(col)
                }
                else {
                    if (col + 1 < columnCount) right(row, col + 1, array)
                }
            }
            return array
        }

        let arr = gridArray
        freshCol = []
        col.map((col) => arr[row][col] = 1)
        col.map((col) => {
            arr[row][col] = 1
            if (row !== rowCount - 1) {
                if (arr[row + 1][col] !== 2) freshCol.push(col)
                else {
                    if (col < columnCount - 1) arr = right(row, col + 1, arr)
                    if (col > 0) arr = left(row, col - 1, arr)
                }
                setGridArray(arr)
            }
        })
        if (row < rowCount - 1) bfsSim(++row, freshCol)
        return false
    }

    if(simulator) return null

    return (
        <div>
            {gridArray.map((row, rid) => {
                if (rid === 0 || rid === rowCount - 1)
                    return <div key={rid} style={{ height: '51px' }} >
                        {row.map((_, cid) => {
                            return gridArray[rid][cid] ? <span key={cid} className="selected-input-box" /> : <span key={cid} className="selected-empty-box" />
                        })}
                    </div>

                return <div style={{ height: 40 }}>
                    {row.map((_, cid) =>
                        gridArray[rid][cid] === 0 ? <span className="block bd whiteBlock" /> :
                            gridArray[rid][cid] === 2 ? <span className="block bd obsBlock" /> :
                                <span className="block waterBlock bd" />
                    )}
                </div>
            }
            )}
        </div >
    )
}


