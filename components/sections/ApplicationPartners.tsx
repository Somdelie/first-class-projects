import Image from "next/image";
import React from "react";

const partners = [
  {
    name: "Dulux",
    logo: "/dulux-logo.png",
  },
  {
    name: "Marmoran",
    logo: "/marmoran-logo.png",
  },
  {
    name: "MBA North",
    logo: "/mba-north-logo.png",
  },
  {
    name: "Plascon",
    logo: "/plascon-logo.png",
  },
];

const ApplicationPartners = () => {
  return (
    <section className="  dark:bg-gray-800">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Application Partners
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center shadow dark:bg-gray-700 rounded px-6 pb-4 w-64"
          >
            <div className="w-full h-32 flex items-center justify-center mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={64}
                className="object-contain max-h-32"
              />
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApplicationPartners;
