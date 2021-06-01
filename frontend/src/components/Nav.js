import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className='navbar'>
            <ul>
                <Link
                    to={{ pathname: '/' }}
                    className='link'>
                    <li>Logo</li>
                </Link>
                <Link to='/' className='link'>
                    <li>Home</li>
                </Link>
                <Link to='search' className='link'>
                    <li>Search</li>
                </Link>
                <Link to='notifications' className='link'>
                    <li>Notifications</li>
                </Link>
                <Link to='messages' className='link'>
                    <li>Messages</li>
                </Link>
                <Link to='user' className='link'>
                    <li>User</li>
                </Link>
            </ul>
        </div>
    );
};

export default Nav;
