"use client";

import MalariaDeathsChart from "@/lib/components/death-chart";
import MalariaMap from "@/lib/components/malaria-cases/index";
import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full  h-full">
      {/* <div className="w-full mt-20 min-[1532px]:pr-[4rem] min-[1532px]:pl-[4rem] pr-[1rem] pl-[1rem]  flex justify-between  flex-row ">
        <div className="w-[790px]">
          <h1 className="font-bold text-2xl">
            Report on Malaria in Nigeria 2022
          </h1>
          <p className="mt-4">
            The Federal Republic of Nigeria is a country in West Africa. It is
            situated between the Sahel to the north and the Gulf of Guinea to
            the south in the Atlantic Ocean. It covers an area of 923 769 square
            kilometres, and with a population of over 225 million, it is the
            most populous country in Africa. Nigeria borders Niger in the north,
            Chad in the north-east, Cameroon in the east, and Benin in the west.
            Nigeria is a Federal Republic comprising 36 States and the Federal
            Capital Territory, where the capital, Abuja, is located. The largest
            city in Nigeria is Lagos, the second-largest metropole in Africa.
            Malaria is a major public health concern in Nigeria, with an
            estimated 68 million cases and 194 000 deaths due to the disease in
            2021. Nigeria has the highest burden of malaria globally, accounting
            for nearly 27% of the global malaria burden. The risk of
            transmission exists throughout the country, all year round. However,
            the incidence of malaria is highest in the northern and
            north-eastern parts of the country.
          </p>
        </div>
        <Image
          src={"/image/UN.jpg"}
          alt="Cover Image"
          className="filter grayscale  object-cover shrink-0 w-[780px] h-[510px]"
          width={6740}
          height={6740}
          quality={100}
        />
      </div> */}

      <div className="w-full mt-16 flex items-center  flex-col ">
        <div className="w-[60%]">
          <h1 className="font-bold text-center text-2xl">
            249 million malaria cases estimated globally in 2022
          </h1>
          <p className="mt-4 text-center">
            Globally in 2022, there were 249 million estimated malaria cases in
            85 malaria endemic countries and areas (including the territory of
            French Guiana) , an increase of 5 million cases compared with 2021.
            Between 2000 and 2014, although the trend in case numbers
            fluctuated, there was an overall decrease from 243 million to 230
            million across the 108 countries that were malaria endemic in 2000.
            Since 2015, malaria cases have increased; the largest annual
            increase of 11 million cases was estimated between 2019 and 2020.
            Most of the increase in case numbers over the past 5 years occurred
            in countries in the WHO African Region.
            <br></br>
            An estimated 608 000 deaths occurred globally due to malaria in
            2022, a mortality rate of 14·3 deaths per 100 000 population at
            risk. More than 50% of all deaths occurred in just four
            countries—Nigeria (31%), the Democratic Republic of the Congo (12%),
            Niger (6%), and Tanzania (4%)
          </p>
          <div className="mt-20 relative flex justify-between bg-[linear-gradient(90deg,rgba(255,255,224,1)_0%,rgba(255,231,132,1)_33%,rgba(255,153,51,1)_63%,rgba(153,0,0,1)_100%)] h-[30px] w-[320px]">
            <p className="text-xs absolute top-[-25px]">
              Estimated Cases Worldwide 2022
            </p>
            <div className="relative">
              <hr className="w-[.8px] h-full bg-black" />
              <p className="text-xs  absolute bottom-[-30px]">0</p>
            </div>
            <div className="relative">
              <hr className="w-[.8px] h-full bg-black" />
              <p className="text-xs left-[-20px]   absolute bottom-[-30px]">
                100,000
              </p>
            </div>
            <div className="relative">
              <hr className="w-[.8px] h-full bg-black" />
              <p className="text-xs left-[-20px]   absolute bottom-[-30px]">
                2,000,000
              </p>
            </div>
            <div className="relative">
              <hr className="w-[.8px] h-full bg-black" />
              <p className="text-xs left-[-20px]   absolute bottom-[-30px]">
                70,000,000
              </p>
            </div>
          </div>
        </div>
        <div className="w-fit h-fit mt-20  relative">
          <p className="mb-10">
            <strong>World choropleth: </strong> Estimated malaria cases globally
            in 2022.
          </p>
          <MalariaMap />
          <div className="absolute right-0">
            <Link
              target="_blank"
              className="underline text-sm text-blue-900"
              href="https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2023"
            >
              Data Source
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mt-40  flex items-center  flex-col ">
        <div className="w-[60%]">
          <h1 className="font-bold text-center  text-2xl">
            Malaria deaths in infants below the age of 5 compared to other
            causes of death in Nigeria
          </h1>
          <p className="mt-4 text-center ">
            In 2021, the World Health Organization (WHO) estimates that 180,000
            to 194,000 people died from severe malaria in Nigeria, with about
            80% of those deaths occurring in children under the age of five.
            This accounts for 31% of all malaria deaths globally and 40% in the
            WHO African Region. Malaria is a leading cause of child mortality
            globally, and in Nigeria, it accounted for 16.05% of deaths among
            children under five in 2021. Other leading causes of death in this
            age group in Nigeria in 2021 included: Lower respiratory infections
            (12.75%), Diarrheal diseases (12.41%), and Congenital birth defects
            (6.41%)
            <br></br>
            An estimated 608 000 deaths occurred globally due to malaria in
            2022, a mortality rate of 14·3 deaths per 100 000 population at
            risk. More than 50% of all deaths occurred in just four
            countries—Nigeria (31%), the Democratic Republic of the Congo (12%),
            Niger (6%), and Tanzania (4%)
          </p>
        </div>
        <div className="mt-10 relative h-fit">
          <p>
            <strong>Line Graph: </strong> Malaria deaths in infants below the
            age of 5 to other causes of infant deaths.
          </p>
          <div className="flex gap-2 mt-5 flex-col">
            <div className="flex gap-3 items-center">
              <div className="bg-[#ff0000] w-3 h-3"></div>
              <p className="text-sm">Malaria</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-[#ffa500] w-3 h-3"></div>
              <p className="text-sm">Other Causes</p>
            </div>
          </div>
          <MalariaDeathsChart />
          <div className="absolute bottom-[-60px] right-0">
            <Link
              target="_blank"
              className="underline text-sm text-blue-900"
              href="https://childmortality.org/causes-of-death/data?refArea=NGA&d_refArea=GHA&type=DEATHS&cause=MALARIA&age=Y0T4&sex=_T&causes=MALARIA"
            >
              Data Source
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center"></div>
    </div>
  );
}
