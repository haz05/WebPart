import * as React from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom'
// interface parametros {
//     name: string;
//     label: string
// }
const Navbar = (): React.ReactElement => {

    return (
        <nav className={styles.font}> 
        <Link to="/teams/BR-CORP-RH-SLE-EXTERNAL/_layouts/15/workbench.aspx">Home</Link>
        <Link to="/teams/BR-CORP-RH-SLE-EXTERNAL/_layouts/15/workbench.aspx/about">Sobre</Link>
    </nav>
    )
}
export default Navbar
