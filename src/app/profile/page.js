import ImageUpload from '../components/inputs/ImageUpload'
import { RiInformation2Line } from 'react-icons/ri'
import { getCurrentUser } from '../actions/getCurrrentUser'
import UserName from '../components/UserName'
import Logout from '../components/Logout'

const page = async () => {
    const currentUser = await getCurrentUser()

    return (
        <div className="w-full md:w-[70%] pt-[73px] px-5 mx-auto">
            <div className="w-full md:w-1/2 flex justify-between items-center">
                <div className="text-3xl font-bold text-[#484848] my-10">Personal Info</div>
                <Logout />
            </div>
            <UserName user={currentUser} />
            <div className="w-full md:w-1/2 h-[1px] bg-[#e5e7eb]"></div>
            <div className="w-full md:w-1/2 py-6">
                <div className="text-base text-[#222222] font-semibold">Phone Number</div>
                <div className="text-sm text-[#6A6A6A]">{currentUser?.phone}</div>
            </div>
            <div className="w-full md:w-1/2 h-[1px] bg-[#e5e7eb]"></div>
            <div className="w-full md:w-1/2 py-6">
                <div className="text-base text-[#222222] font-semibold">Documets</div>
                <div className="text-sm text-[#6A6A6A] my-5">Upload your basic documents</div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="w-52 h-56 p-1 font-light bg-white border-2 rounded-md outline-none">
                        <label className="text-lg text-zinc-400">Photo</label>
                        <div className="h-[80%]">
                            <ImageUpload title="photo" user={currentUser} folder="EasyApply_Users_documents" value={currentUser?.documents?.find((doc) => doc.title === "photo")?.value} />
                        </div>
                        <div className="w-full flex items-center gap-1 font-bold text-zinc-400 my-[1px]">
                            <RiInformation2Line size={15} />
                            <div className=" text-xs">Click above to update !</div>
                        </div>
                    </div>
                    <div className="w-52 h-56 p-1 font-light bg-white border-2 rounded-md outline-none">
                        <label className="text-lg text-zinc-400">Sign</label>
                        <div className="h-[80%]">
                            <ImageUpload title="sign" user={currentUser} folder="EasyApply_Users_documents" value={currentUser?.documents?.find((doc) => doc.title === "sign")?.value} />
                        </div>
                        <div className="w-full flex items-center gap-1 font-bold text-zinc-400 my-[1px]">
                            <RiInformation2Line size={15} />
                            <div className=" text-xs">Click above to update !</div>
                        </div>
                    </div>
                    <div className="w-52 h-56 p-1 font-light bg-white border-2 rounded-md outline-none">
                        <label className="text-lg text-zinc-400">Aadhar Card (Front Side)</label>
                        <div className="h-[80%]">
                            <ImageUpload title="aadhar front" user={currentUser} folder="EasyApply_Users_documents" value={currentUser?.documents?.find((doc) => doc.title === "aadhar front")?.value} />
                        </div>
                        <div className="w-full flex items-center gap-1 font-bold text-zinc-400 my-[1px]">
                            <RiInformation2Line size={15} />
                            <div className=" text-xs">Click above to update !</div>
                        </div>
                    </div>
                    <div className="w-52 h-56 p-1 font-light bg-white border-2 rounded-md outline-none">
                        <label className="text-lg text-zinc-400">Aadhar Card (Back Side)</label>
                        <div className="h-[80%]">
                            <ImageUpload title="aadhar back" user={currentUser} folder="EasyApply_Users_documents" value={currentUser?.documents?.find((doc) => doc.title === "aadhar back")?.value} />
                        </div>
                        <div className="w-full flex items-center gap-1 font-bold text-zinc-400 my-[1px]">
                            <RiInformation2Line size={15} />
                            <div className=" text-xs">Click above to update !</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

export function generateMetadata() {
    return {
        title: "Personal Information - EaseApply",
        description: "Update your personal information and documents"
    }
}