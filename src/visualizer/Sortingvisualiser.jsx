
import React, { useState, useEffect } from "react";
import './visualiser.css'

//Fixed size
const ARRAYSIZE = 100;
function Sortingvisualiser() {

    const [primaryArray, setPrimaryArray] = useState([]);

    //Animation Speed
    const [animationSpeed, setAnimationSpeed] = useState(40);


    useEffect(() => {
        randomizeArray();
    }, []);


    function randomizeArray() {
        for (var i = 0; i < primaryArray.length; i++) {
            //console.log(primaryArray.length);
            var bar = document.getElementById(i).style;
            bar.backgroundColor = "#ff7f50";
        }
        var array = [];
        for (let i = 0; i < ARRAYSIZE; i++) {
            array.push(randomVals(20, 400));
        }

        setPrimaryArray(array);
    }

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    async function finishedAnimation() {
        for (var i = 0; i < primaryArray.length; i++) {
            var bar = document.getElementById(i).style;
            bar.backgroundColor = "black";
            await sleep(animationSpeed);
        }
    }

    
    //for fetching random values from the given limit
    function randomVals(min, max) {
        var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
        return randomVal;
    }

    async function bubbleSort() {
        var currentArr = primaryArray;
        var sorted = false;

        while (!sorted) {
            sorted = true;
            for (var i = 0; i < currentArr.length - 1; i++) {
                if (currentArr[i] > currentArr[i + 1]) {
                    var swap1 = currentArr[i];
                    var swap2 = currentArr[i + 1];
                    currentArr[i] = swap2;
                    currentArr[i + 1] = swap1;
                    setPrimaryArray([...primaryArray, currentArr]);

                    //Changing Style while swapping
                    let bar1 = document.getElementById(i).style;
                    let bar2 = document.getElementById(i + 1).style;
                    bar1.backgroundColor = "green";
                    bar2.backgroundColor = "black";

                    await sleep(animationSpeed);

                    //Changing back to original
                    bar1.backgroundColor = "#FF7F50";
                    bar2.backgroundColor = "#FF7F50";

                    sorted = false;
                }
            }
            if (sorted) finishedAnimation();
        }
    }

  return (
      <div className="sortingVisualizer">
          <div className="header">
              <div className="headerBttns">
                  <button onClick={randomizeArray}>New Array</button>
                  <button onClick={bubbleSort}>Bubble Sort</button>
                
              </div>
          </div>

          <div className="arrayControllers">
              <button
                  id="restart"
                  onClick={() => {
                      window.location.reload(false);
                  }}
              >
                  {" "}
                  Restart
              </button>
              <div id="modes">
                  <button onClick={() => { setAnimationSpeed(400) }} id={animationSpeed === 80 ? "selected" : ""}>Slow</button>
                  <button onClick={() => { setAnimationSpeed(40) }} id={animationSpeed === 40 ? "selected" : ""}>Medium</button>
                  <button onClick={() => { setAnimationSpeed(5) }} id={animationSpeed === 5 ? "selected" : ""}>Fast</button>
              </div>
             
          </div>
          <div className="arrayContainer">
              {primaryArray &&
                  primaryArray.map((val, key) => {
                      return (
                          <div
                              className="bar"
                              id={key}
                              key={key}
                              style={{ height: val }}
                          ></div>
                      );
                  })}
          </div>
      </div>
  )
}

export default Sortingvisualiser