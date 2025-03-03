import React, { useContext } from 'react'
import ForeCastList from '~/forecastlist/ForeCastList';
import { CgDetailsMore } from "react-icons/cg";
import { UserContext, type WeatherData } from '~/routes/home';

interface ForeCastListMbType {
    setCurrentIndex: (index: number) => void;
    showCelsius: boolean
    
}
const ForeCastListMb = ({ setCurrentIndex, showCelsius }: ForeCastListMbType) => {
  const context = useContext(UserContext);
  
      if (!context) {
          return <p>Loading context...</p>;
      }
  
  return (
    <div>
    <button
    className="btn border-2"
    onClick={() => {
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
      if (modal) {
        modal.showModal(); // Open the modal
      } else {
        console.error("Modal not found");
      }
    }}
  >
    <CgDetailsMore size={25} color='purple'/>

  </button>  
  <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
      <form method="dialog">
        {/* Close button inside modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>

      </form>
      <div className='mt-5'>
      <ForeCastList  setCurrentIndex={setCurrentIndex} showCelsius={showCelsius}/>

      </div>
    </div>
  </dialog>
    </div>
  )
}

export default ForeCastListMb