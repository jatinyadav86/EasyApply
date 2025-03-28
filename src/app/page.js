import Carousel from "./components/Carousal";
import Container from "./components/Container";
import { Categories } from "./components/navbar/Categories";
import AdmissionCard from "./components/cards/AdmissionCard";
import { getAppData } from "./actions/getAppData";
import SpecifyServiceCard from "./components/cards/SpecifyServiceCard";
import ServiceCard from "./components/cards/ServiceCard";
import JobCard from "./components/cards/JobCard";
import { getCurrentUser } from "./actions/getCurrrentUser";

export default async function Home() {
  const data = await getAppData()
  const currentUser = await getCurrentUser()

  return (
    <>
      <div className="pt-[73px] md:pt-20">
        <Categories />
        <Carousel />
        <div id="services" className="w-full py-20 bg-[#f2f2f28c]">
          <div className="text-5xl font-bold text-[#484848] w-full text-center mb-10">Our Services</div>
          <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.services?.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
        <div id="educatioal" className="w-full py-20">
          <Container>
            <div className="text-4xl sm:text-5xl font-bold text-[#484848] w-full text-center mb-10">Educational Forms</div>
            <div className="w-full grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.eduForm?.toReversed().map((form) => (
                <AdmissionCard key={form._id} form={form} />
              ))}
              <SpecifyServiceCard user={currentUser} formType="educational" />
            </div>
          </Container>
        </div>
        <div id="govt_Jobs" className="w-full py-20 bg-[#f2f2f28c]">
          <Container>
            <div className="text-4xl sm:text-5xl font-bold text-[#484848] w-full text-center mb-10">Govt. Jobs Forms</div>
            <div className="w-full grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.jobs?.toReversed().map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
              <SpecifyServiceCard user={currentUser} formType="govtJob" />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export function generateMetadata() {
  return {
    title: "EaseApply - Hassle-free form applications, done for you",
    description: "Welcome to Ease Apply, your one-stop solution for educational forms and government job applications.",
  };
}
