import Container from '../Container'
import Logo from './Logo'
import Options from './Options'
import UserMenu from './UserMenu'


const Navbar = async ({currentUser}) => {
  
  return (
    <div className="fixed w-full bg-white z-40 top-0">
      <div className="border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-center md:justify-between gap-3 md:gap-0">
            <div className="hidden md:block ">
              <Logo />
            </div>
            <Options />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar