import { Copyright } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  type SectionKey = "Exclusive" | "Support" | "Account" | "Quicklist";
  const FooterObjects = [
    {
      Exclusive: [
        { id: 1, heading: "Subscribe", visitPage: "" },
        { id: 2, heading: "10% Off your first order", visitPage: "" },
        { id: 3, heading: "View higher discount Products", visitPage: "" },
      ],
    },
    {
      Support: [
        {
          id: 1,
          heading: "111 Church Street,Bangalore - 635147",
          visitPage: "",
        },
        { id: 2, heading: "trendora@gmail.com", visitPage: "" },
        { id: 3, heading: "+91-9597889162", visitPage: "" },
      ],
    },
    {
      Account: [
        { id: 1, heading: "My Account", visitPage: "" },
        { id: 2, heading: "Login", visitPage: "/login" },
        { id: 3, heading: "Register", visitPage: "/signup" },
        { id: 4, heading: "Cart", visitPage: "/cart" },
        { id: 5, heading: "Shop", visitPage: "/products" },
      ],
    },
    {
      Quicklist: [
        { id: 1, heading: "Privacy Policy", visitPage: "" },
        { id: 2, heading: "Terms Of Use", visitPage: "" },
        { id: 3, heading: "FAQ", visitPage: "" },
        { id: 4, heading: "Contact", visitPage: "" },
      ],
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#1D2024] text-[#FFFFFF] ">
      <div className="w-full px-4 md:px-16 py-6 md:py-10 grid grid-cols-2 md:grid:cols-3 lg:grid-cols-4 gap-4 md:gap-16 place-content-center">
        {FooterObjects.map((section, index) => {
          const sectionName = Object.keys(section)[0] as SectionKey;
          const sectionItems = section[sectionName]!;
          return (
            <div key={index} className="flex flex-col gap-3">
              <h1 className="text-md font-semibold text-white">
                {sectionName}
              </h1>
              <div className="text-sm max-w-[200px] ">
                {sectionItems.map((item) => (
                  <div
                    key={item.id}
                    className="text-sm mb-2 text-white hover:cursor-pointer hover:text-blue-500 hover:underline hover:underline-offset-2"
                    onClick={() => item.visitPage && navigate(item.visitPage)}
                  >
                    {item.heading}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2 pb-4 text-zinc-400">
        <Copyright size={20} /> Copyright 2024. All right reserved
      </div>
    </div>
  );
};

export default Footer;
