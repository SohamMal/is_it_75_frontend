import { useState } from 'react';
import accountIcon from "../images/account1.png";
import logo from "../images/isit75.png";
import { useNavigate } from 'react-router-dom';


export function Navbar() {
    const [showLogout, setShowLogout] = useState(false);
    const navigate=useNavigate();

    const handleProfileClick = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        setShowLogout(false);
        window.location.reload();
    };

    return (
        <nav>
            <div>
                <img src={logo} alt="Logo" className="logo-img" onClick={()=>{
                    navigate('/');
                }}/>
            </div>
            <div>
                <ul>
                    <li className="nav-item">About</li>
                    <li className="nav-item"><a href="https://www.youtube.com/watch?v=DwxGFfJON7Q" target="_blank" rel="noopener noreferrer">Tutorial</a></li>
                    <li className="profile-icon" onClick={handleProfileClick}>
                        <img src={accountIcon} alt="profile" className="Profile-img" />
                        {showLogout && (
                            <div className="dropdown-content">
                                <button className='tut_button'><a href="https://www.youtube.com/watch?v=DwxGFfJON7Q" target="_blank" rel="noopener noreferrer">Tutorial</a></button>
                                <button className="logout-button" onClick={handleLogout}>Log out</button>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
