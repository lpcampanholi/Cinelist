import styled from 'styled-components';
import { PiUserCircle } from "react-icons/pi";
import { useAuth } from '../../contextos/AuthProvider';

const Container = styled.div`
  display: flex;
  align-items: center;
  color: var(--branco);
`;

const UserName = styled.span`
  margin-right: 10px;
  color: var(--destaque);
`;

const UserIcon = () => {

  const { userName } = useAuth();

  return (
    <Container>
      <PiUserCircle size={30} />
      <UserName>{userName}</UserName>
    </Container>
  );
};

export default UserIcon;
