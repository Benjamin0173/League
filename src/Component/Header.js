import styled from 'styled-components'
import { StyledLink } from '../Style/Styled'

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  return (
    <NavContainer>
      <div>
        <StyledLink to="/" $isFullLink>
          Log In
        </StyledLink>
        <StyledLink to="/client" $isFullLink>
          client
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header
