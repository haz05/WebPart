import * as React from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
// interface parametros {
//     name: string;
//     label: string
// }
const Home = (): React.ReactElement => {

    const url = 'http://localhost:3000/products'

  const { data: items, error } = useFetch(url)
 

    return (
        <div>
        <h1>Produtos</h1>
        {error && <p>{error}</p>}
  
        {!error && (
          <ul className={styles.products}>
            {items && items.map((item: { id: React.Key | null | undefined; name: any; price: any; }) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>R$: {item.price}</p>
                 <Link to={`/products/${item.id}`}>Detalhes</Link>
              </li>
            ))}
          </ul>
        )}
  
      </div>
    )
}
export default Home
