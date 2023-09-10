import "./contact.scss";

export function Contact({
   bgCol,
   color,
   icons,
   me,
   socials,
}: Props): JSX.Element {
   return (
      <div
         style={{ backgroundColor: bgCol, color }}
         className="contact-main-container"
      >
         <div className="contact-container">
            {/* Left Container */}
            <div className="contact-container-left_container">
               <h4>Contact Me</h4>
               <p>
                  <img src={icons?.email} /> hellosumanbiswas@gmail.com
               </p>
               <p>
                  <img src={icons?.location} /> Tehatta, West Bengal, India
               </p>
            </div>

            {/* Right Container */}
            <div className="contact-container-right_container">
               <img src={me} />
               <div className="contact-container-right_container-social_container">
                  <a target="_blank" href={socials?.ig?.link}>
                     <img src={socials?.ig?.img} />
                  </a>
                  <a target="_blank" href={socials?.gh?.link}>
                     <img src={socials?.gh?.img} />
                  </a>
                  <a target="_blank" href={socials?.fb?.link}>
                     <img src={socials?.fb?.img} />
                  </a>
               </div>
            </div>
         </div>

         <p className="contact-container-copyright">
            ©{" "}
            <a href="https://www.linkedin.com/in/sumanbiswas7" target="_blank">
               Suman Biswas
            </a>
            , 2023
         </p>
      </div>
   );
}

interface Props {
   color: string;
   bgCol: string;
   icons: { email: string; location: string };
   me: string;

   socials: {
      ig: { img: string; link: string };
      gh: { img: string; link: string };
      fb: { img: string; link: string };
   };
}
