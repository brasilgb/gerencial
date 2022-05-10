import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

const NoSelect = ({ children }) => {

  const { user, logout, valuesKpis, graficoVencidos, graficoProjecao, totalValuesKpis, totalGraficoVencidos, totalGraficoProjecao, filialuser, allFiliais } = useContext(AuthContext);

  const [analiseRede, setAnaliseRede] = useState(false);
  const [currentFilial, setCurrentFilial] = useState(user.Filial);
  useEffect(() => {
    filialuser(currentFilial);
  });

  return (
    <Fragment>
      <span className="mx-2 px-8 py-1 rounded text-white text-sm border border-rose-600 bg-rose-500">
        {children}
      </span>
    </Fragment>
  )
}

export default NoSelect