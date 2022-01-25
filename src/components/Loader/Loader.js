import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <AiOutlineLoading3Quarters className="spinning" />
      <p>Loading</p>
    </div>
  )
}

export default Loader
