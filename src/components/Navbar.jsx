import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  let navigate = useNavigate();
  return (
    <nav>
      <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>

          </div>
      </div>
    </nav>
  )
}