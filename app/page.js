import FirstSection from "../components/FirstSection";
import WorkGuide from "../components/WorkGuide";
import Promotion from "../components/Promotion";
import LearnCrypto from "../components/LearnCrypto";
import WhyUs from "../components/WhyUs";
import Testimonial from "../components/Testimonial";
// import Questions from "@/components/Questions";
import {NextUIProvider} from '@nextui-org/react'


export default function Home() {
  return (
    <section className="w-full">
      <div className="top-section overflow-hidden">
        
        
        <FirstSection/>
        
      </div>
      <div className="workGuide-section">

        <WorkGuide />
        
      </div>
      <div className="promotion-section">
        <Promotion />
      </div>

      <div className="learnCrypto-section">
        <LearnCrypto/>
      </div>

      <div className="whyus-section">
        <WhyUs/>
      </div>

      <div className="testimonials-section">
        <Testimonial/>
      </div>
     

      {/* <div className="faq-section">
        <Questions/>
      </div> */}
      
      
    </section>
  )
}
