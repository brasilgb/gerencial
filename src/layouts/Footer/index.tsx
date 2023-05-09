import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-solar-blue-light border-t-2 border-solar-gray-light shadow">
    <p className="text-solar-gray-light py-1 text-center text-[10px]">&copy;{new Date().getFullYear()} Solar Comércio e Agroindústria Ltda. Todos os direitos reservados. | Desenvolvido por TI - Sistemas | Grupo Solar</p>
    </footer>
  )
}

export default Footer;