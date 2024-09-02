import Cabecalho from "../Cabecalho";
import Rodape from '../Rodape/';

const Layout = ({ children }) => {
  return (
    <>
      <Cabecalho />
        <main>{children}</main>
      <Rodape />
    </>
  );
};

export default Layout;
