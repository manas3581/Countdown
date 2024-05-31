
const InputTimer=({handleInput,handleStart})=>{
    return(
        
        <div className="input-container">
          <div className="input-box">
            <input
              onChange={handleInput}
              id="hours"
              type="hour"
              placeholder="HH"
            />
            <input
              onChange={handleInput}
              id="minutes"
              type="min"
              placeholder="MM"
            />
            <input
              onChange={handleInput}
              id="seconds"
              type="sec"
              placeholder="SS"
            />
          </div>
          <button onClick={handleStart} className="timer-button">
            Start
          </button>
        </div>
      
    )
}

export default InputTimer;