import styled, { keyframes } from 'styled-components'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, max(500px, 1fr));
  grid-gap: 20px;
  place-items: center;
`
export default Columns
