import { useRef } from "react";
import {createPortal} from 'react-dom';
import { useImperativeHandle } from "react";
export default function ResultModal({ref,targetTime,remainingTime,onReset}){
    const userLost = remainingTime<=0;
    const formateTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1-remainingTime/(targetTime*1000))*100);    
    const dialog = useRef();
    useImperativeHandle(ref,()=>{
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });
    return createPortal(<dialog ref={dialog} className="result-modal">
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>You Score:{score}</h2>}
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>{formateTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
    );
}