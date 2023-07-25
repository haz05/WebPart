import * as React from 'react';
import { useFetch } from "../hooks/useFetch"
import { useParams } from 'react-router-dom'
const Product = (): React.ReactElement => {
  // 4 - rota dinamica
  const {id} = useParams()

  // 5 - Carregamento dado individual
  const url = 'http://localhost:3000/products/' + id 
  const {data: product,}= useFetch(url)
  console.log(product);
  return (
    <div>
      <p>ID do Produto: {id}</p>
    </div>
  )
}

export default Product