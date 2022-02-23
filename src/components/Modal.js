import './Components.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
let defaultLocations = ['Buenos Aires', 'New York', 'Shanghai', 'Moscow', 'London', 'Cairo']

let Modal = ({setOpenModal, changeLocation}) => {
    let [locations, setNewLocation] = useState(defaultLocations)
    return (
        <>
            <div className='overlay' onClick={() => setOpenModal(false)}></div>
            <div className='modal'>
                <div className="btn-close">
                    <button onClick={() => setOpenModal(false)}>
                        <IoMdClose/>
                    </button>
                </div>
                <div className='section-search'>
                    <div>
                        <IconContext.Provider value={{size: '18px', style: { verticalAlign: 'middle', margin: '5px', color: '#616475' }}}>
                            <AiOutlineSearch/>
                        </IconContext.Provider>
                        <input placeholder='search location' className='input-search' onInput={(evt) => locationFilter(evt)}></input>
                    </div>
                    <button className="btn-search">Search</button>
                </div>
                <div className='locations-section' onClick={() => setOpenModal(false)}>
                    {
                        locations.map((l,i) => 
                            <p key={i} onClick={() => changeLocation(l)}> 
                                {l} 
                                <span className='hidden'>&gt;</span> 
                            </p>    
                        )
                    }
                </div>
            </div>
        </>
    )

    function locationFilter(evt) {
        let value = evt.target.value
        if(value.length <= 0) {
            setNewLocation(defaultLocations)
            return
        } 
        let filteredLocations = locations.filter(l => l.includes(value))
        if(filteredLocations.length === 0) {
            setNewLocation(['Sin coincidencias'])
            return
        }
        if(filteredLocations.length > 0) {
            filteredLocations.map(e => setNewLocation([e]))
            return
        }
        setNewLocation(defaultLocations)
    }
}

export default Modal;