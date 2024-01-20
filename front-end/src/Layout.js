import {Link} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">topic1</Link>
                    </li>
                    <li>
                        <Link to="/">topic2</Link>    
                    </li> 
                </ul>
            </nav>
        </>
    )
};
export default Layout;