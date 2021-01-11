import styled from 'styled-components'

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  link,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 20px;
      padding: 0 10px;
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: flex-end;
    /* font-size: 1.5rem; */
  }
`

export default NavStyles
