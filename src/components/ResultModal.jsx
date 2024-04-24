import { useImperativeHandle, useRef, forwardRef } from "react";

const ResultModal = forwardRef((props, ref) => {
  const dialog = useRef()
  const formattedRemainingTime = (props.remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - props.remainingTime / (props.targetTime * 1000)) * 100)
  const userLost = props.remainingTime <= 0;
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal()
    },
    close() {
      dialog.current.close()
    }
  }))
  return (

    <dialog ref={dialog} className={'result-modal'} onClose={props.onReset} >
      {!userLost && <h2>Your score: {score}</h2>
      }
      <p>The target time was  {props.targetTime} seconds</p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
      <button onClick={() => {
        if (dialog.current) dialog.current.close();
        if (props.onReset) props.onReset();
      }}>Close</button>
    </dialog>
  )
});

export default ResultModal;