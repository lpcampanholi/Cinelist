import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const Container = styled.div`
  margin: 1em;
  padding-bottom: 1em;
  transition: transform 0.3s ease;
  background-color: var(--cinza-escuro);
  max-width: 10em;
  height: 22em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    height: auto;
    flex-shrink: 0;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Icones = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.5em 1em;
  .heart {
    color: #850f0f;
  }
  .star {
    color: var(--amarelo);
  }
`;

const Nota = styled.div`
  display: flex;
  gap: 4px;
  font-weight: 900;
  color: var(--branco);
`;

const Titulo = styled.h3`
  font-size: 1em;
  font-weight: 400;
  color: var(--branco); 
  text-align: left;
  padding: 0 1em;
  margin: 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function CardFilme ({ titulo, nota, capa, favorito = false, aoClicar }) {
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);

  const handleMouseDown = (e) => {
    setStartPos(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (startPos !== null && Math.abs(e.clientX - startPos) > 5) {
      setDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (!dragging) {
      aoClicar();
    }
    setDragging(false);
    setStartPos(null);
  };

  return (
    <Container
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src={capa ? capa : "/imagens/sem-capa.png"} alt="capa" />
      <Icones>
        <Nota><FaStar className="star" />{nota ? nota.toFixed(1) : '--'}</Nota>
        {favorito && <FaHeart className="heart" size={14} />}
      </Icones>
      <Titulo onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {titulo}
      </Titulo>
    </Container>
  );
};

export default CardFilme;
