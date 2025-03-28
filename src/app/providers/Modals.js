import AddServiceModal from "../components/modals/AddServiceModal"
import ApplyModal from "../components/modals/ApplyModal"
import AuthModal from "../components/modals/AuthModel"
import CodeVerificationModal from "../components/modals/CodeVerificationModal"
import RegisterModalWithPhone from "../components/modals/RegisterModalWithPhone"
import EducationalModal from "../components/modals/EducationalModal"
import GovtJobModal from "../components/modals/GovtJobModal"
import ServiceModal from "../components/modals/ServiceModal"
import { getAppData } from "../actions/getAppData"
import { getCurrentUser } from "../actions/getCurrrentUser"
import ConfirmationModal from "../components/modals/ConfirmationModal"
import OfferModal from "../components/modals/OfferModal"


const Modals = async () => {
    const { subServices, eduForm, jobs } = await getAppData()
    const currentUser = await getCurrentUser()

    return (
        <>
            <AuthModal />
            <RegisterModalWithPhone />
            <CodeVerificationModal />
            <ApplyModal user={currentUser} subServices={subServices} eduForm={eduForm} jobs={jobs} />
            <EducationalModal educationalForms={eduForm} />
            <GovtJobModal govtJobs={jobs} />
            <ServiceModal subServices={subServices}  />
            <AddServiceModal user={currentUser} />
            <ConfirmationModal userId={currentUser?.id} />
            <OfferModal/>
        </>
    )
}

export default Modals