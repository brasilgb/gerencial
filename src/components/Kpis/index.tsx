import React from 'react'

interface KpisProps {
  classname?: string;
  title?: string;
  value: any;
  valueColor?: string;
  titleColor?: string;
  rotulo?: string;
}

const Kpis = ({ classname, title, value, valueColor, rotulo }: KpisProps) => {
  return (
    <div className={`bg-solar-gray-middle shadow border border-white flex flex-col items-center justify-center py-6 ${classname}`}>
      <h1 className="text-lg text-gray-600 font-medium mb-2 drop-shadow-md">{title}</h1>
      { rotulo && <h1 className="text-xl font-semibold text-gray-500 drop-shadow-md mb-2">{rotulo}</h1> }
      <h1 className={`font-extrabold drop-shadow-md ${valueColor} ${rotulo ? 'text-3xl' : 'text-2xl'}  `}>{value}</h1>
    </div>
  )
}

export default Kpis