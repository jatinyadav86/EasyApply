import Container from '../Container'
import { FaRegIdCard } from'react-icons/fa6'
import { AiOutlineCreditCard } from'react-icons/ai'
import { GiIdCard } from'react-icons/gi'
import { GiPassport } from'react-icons/gi'
import { MdOutlineFamilyRestroom } from'react-icons/md'
import { RiMoneyRupeeCircleFill } from'react-icons/ri'
import { BsFillPostcardHeartFill } from'react-icons/bs'
import { TiBusinessCard } from'react-icons/ti'
import { LuIdCard } from'react-icons/lu'
import { LuBaby } from'react-icons/lu'
import { GiMedalSkull } from'react-icons/gi'
import { GrCertificate } from'react-icons/gr'
import { FaIndianRupeeSign } from'react-icons/fa6'
import { CategoryBox } from '../CategoryBox'

export const categories = [
    {
        label: 'Pan Card',
        icon:   FaRegIdCard,
        route: 'pan_card/67b94aa86dc9126ad708f075'
    },
    {
        label: 'Voter Id',
        icon:   GiIdCard,
        route: 'voting_card/67b7240ec6a66db654dffa71'
    },
    {
        label: 'Family Id',
        icon:   MdOutlineFamilyRestroom,
        route: 'family_id/67b945856dc9126ad708f048'
    },
    {
        label: 'Aadhar Card',
        icon:   AiOutlineCreditCard,
        route: 'aadhar_card/67b94c406dc9126ad708f0a2'
    },
    {
        label: 'Passport',
        icon:   GiPassport,
        route: 'passport/67b9b48f6dc9126ad708f19f'
    },
    {
        label: 'Provident Fund',
        icon:   RiMoneyRupeeCircleFill,
        route: 'provident_fund/67b96ef76dc9126ad708f13c'
    },
    {
        label: 'Ayushman Card',
        icon:   BsFillPostcardHeartFill,
        route: 'ayushma_card/67b9bd836dc9126ad708f1cd'
    },
    {
        label: 'Ration Card',
        icon:   TiBusinessCard,
        route: 'ration_card/67b956c16dc9126ad708f106'
    },
    {
        label: 'PRAN Card',
        icon:   LuIdCard,
        route: 'pran_card/67b9991a6dc9126ad708f155'
    },
    {
        label: 'Birth Certificate',
        icon:   LuBaby,
        route: 'birth_certificate/67b94e3b6dc9126ad708f0b8'
    },
    {
        label: 'Death Certificate',
        icon:   GiMedalSkull,
        route: 'death_certificate/67b955976dc9126ad708f0f0'
    },
    {
        label: 'Police Verification',
        icon:   GrCertificate,
        route: 'police_verification/67b9b3126dc9126ad708f189'
    },
    {
        label: 'Income Certificate',
        icon:   FaIndianRupeeSign,
        route: 'income_certificate/67e24ecfa5927bd8d5694466'
    },
]

export const Categories = () => {

  return (
    <Container>
        <div className="flex flex-row items-center justify-between scrollbar-hide overflow-x-auto">
            {categories.map((item,index)=>(
                <CategoryBox key={index} label={item.label} route={item.route} icon={item.icon}  />
            ))}
        </div>
    </Container>
  )
}
