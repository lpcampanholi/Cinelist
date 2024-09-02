import styled from "styled-components";

const ImagemLogo = styled.img`
  width: 7em;
`;

function Logo() {
  return (
    <ImagemLogo src="/imagens/logo.png" alt="logo imdb" />
  );
};

export default Logo;
