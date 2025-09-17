// App.jsx (or any parent component)
// import { useState } from 'react';
// import Popup from './popup';
// import DraggablePopup from './DraggablePopup';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
function App() {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const openPopup = () => setIsPopupOpen(true);
  // const closePopup = () => setIsPopupOpen(false);
  //  const [showPopup, setShowPopup] = useState(false);


  return (
    <div className='container'>
      <h1>My Application</h1>
      {/* <button onClick={openPopup}>Open Popup</button>

      {isPopupOpen && (
        <Popup onClose={closePopup}>
          <h2>Welcome to the Popup!</h2>
          <p>This is some content inside the Popup.</p>
        </Popup>
      )}



      <button onClick={() => setShowPopup(true)}>Open Draggable Popup</button>
      {showPopup && (
        <DraggablePopup onClose={() => setShowPopup(false)}>
          <h2>This is a draggable popup!</h2>
          <p>You can move me anywhere.</p>
        </DraggablePopup>

      )} */}


      

        <h1> < SentimentDissatisfiedIcon/> </h1>
       <h1>No data Available</h1>
    </div>
  );
}

export default App;