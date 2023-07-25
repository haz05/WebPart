import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { SPFI } from '@pnp/sp';
import { Web } from '@pnp/sp/webs';
import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists/web";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { list1, list2 } from '../../../interfaces';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Product from './Product';

const HelloWorld = (props: IHelloWorldProps): React.ReactElement => {

  const _sp: SPFI = getSP(props.context);
  const [dado1, setDado1] = React.useState<list1[]>([]);
  const [dado2, setDado2] = React.useState<list2[]>([]);

  const LIST_1 = 'lista1';
  const LIST_2 = 'lista2';

  const getDado1 = async (): Promise<void> => {
    const web1 = Web([_sp.web, "https://weg365.sharepoint.com/teams/BR-CORP-RH-SLE"]);
    web1.lists
      .getByTitle(LIST_1)
      .select("Id, Title")
      .items
      .getAll()
      .then((items: React.SetStateAction<list1[]>): void => {
        setDado1(items);
      },
        (err: string) => {
          console.log(err);
        });
  }
  const getDado2 = async (): Promise<void> => {
    // console.log("context", _sp);
    const items = _sp.web.lists.getByTitle(LIST_2).items.getAll();
    console.log(items);

    setDado2((await items).map((item: list2) => {
      return {
        Id: item.Id,
        Title: item.Title,
      }
    }));
  }

  const carregarDados = async (): Promise<void> => {
    await getDado1()
    await getDado2()
  }

  // Função Responssável por chamar as funções quando iniciar o código (roda apenas uma vez)
  React.useEffect(() => {
    carregarDados().then(
      () => {
        // Tudo correu bem (1º argumento do then).
      },
      (error) => {
        // Lide com o erro (2º argumento do then).
        console.log("Erro", error);

      })
  }, [])

  // printar no console os dados da variavel dado 1 toda vez que for modificada
  React.useEffect(() => {
    console.log("dado1", dado1);
  }, [dado1])

  // printar no console os dados da variavel dado 1 toda vez que for modificada
  React.useEffect(() => {
    console.log("dado2", dado2);
  }, [dado2])

  return (
    // necessario que se tenha apenas um objeto Pai
    <div className={styles.fontHelloWorld}>
      <h1>Hello World</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/teams/BR-CORP-RH-SLE-EXTERNAL/_layouts/15/workbench.aspx" element={<Home />} />
          <Route path="/teams/BR-CORP-RH-SLE-EXTERNAL/_layouts/15/workbench.aspx/about" element={<About />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default HelloWorld

