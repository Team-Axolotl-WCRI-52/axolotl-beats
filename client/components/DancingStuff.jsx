//client/components/DancingStuff.jsx
import React from 'react'
import axolotl from '../imgs/axolotl.gif';
import ostrich from '../imgs/ostrich.gif';
import lightning from '../imgs/lightning.png';
import singleNote from '../imgs/single-note.png';
import dualNote from '../imgs/dual-note.png';
const DancingStuff = (props) => {


    return(
        <div className="dancing-div">
            <div className="lights-div">
                <div className="lights red"></div>
                <div className="lights blue"></div>
                <div className="lights purple"></div>
                <div className="lights red"></div>
                <div className="lights blue"></div>
                <div className="lights purple"></div>
                <div className="lights blue"></div>
            </div>
            <div className="notes-div">
                <img className="note blast-left" src={dualNote}></img>
                <img className="note blast-left" src={singleNote}></img>
                <img className="note blast-right" src={dualNote}></img>
                <img className="note blast-right" src={singleNote}></img>
            </div>
            <div className="two-axolotls">
                <div className="axolotl-div">
                    <img className="axolotl flip-horizontally" src={axolotl}></img>
                </div>
                <div className="axolotl-div">
                    
                    <img className="axolotl" src={axolotl}></img>
                    
                </div>
            </div>
            
            {/* <div className="ostrich-div">
                <img className="lightning" src={lightning}></img>
                <img className="ostrich flip-horizontally" src={ostrich}></img>
                <img className ="lightning" src={lightning}></img>
            </div> */}
        </div>
    )
}

export default DancingStuff;