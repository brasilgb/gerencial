import React, { Fragment, useContext } from 'react'
import { IconContext } from 'react-icons';
import { IoClose, IoKey, IoKeypadSharp, IoWarning } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import { AuthContext } from '../../contexts/auth';
import { useForm } from "react-hook-form";
import BoxError from '../../Components/Boxes/BoxError';
import 'animate.css';
import { Link } from 'react-router-dom';
import BoxLoginRegister from '../../Components/Boxes/BoxLoginRegister';

const Login = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { loading, login, setErrorMessage, errorMessage } = useContext(AuthContext);

    const data = new Date();
    const ano = data.getFullYear();
    const onSubmit = (data) => {
        login(data.code, data.password, reset);
    }
    
    return (
        <Fragment>
            <BoxLoginRegister>
            <div className={`animate__animated ${errorMessage ? 'animate__shakeX' : 'animate__fadeIn'} animate__delay-0s w-full max-w-sm p-4 m-auto bg-gray-100 rounded shadow-lg shadow-gray-900/40 border-2 border-white`}>
                    <div className="bg-gradient-to-b from-solar-blue-200 to-blue-500 p-4 rounded border border-white">

                        <div className="flex items-center justify-center mt-8 mb-8">
                            <img src="images/logo-grupo.png" alt="logo" />
                        </div>

                        <div className='relative'>
                            {errorMessage &&
                                <div className="animate__animated animate__zoomIn animate__delay-0s absolute flex justify-start w-full border border-yellow-100 bg-yellow-200 rounded px-2 py-6 -top-24 shadow-lg">
                                    <button onClick={() => setErrorMessage(!errorMessage)} className="absolute right-0 top-0">
                                        <IconContext.Provider value={{ className: "text-lg text-yellow-700" }}>
                                            <div>
                                                <IoClose />
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                    <IconContext.Provider value={{ className: "text-lg text-red-500" }}>
                                        <div>
                                            <IoWarning />
                                        </div>
                                    </IconContext.Provider>
                                    <div className="ml-2 text-red-500 text-sm">{errorMessage.Message}</div>
                                </div>
                            }
                        </div>
                        <form className="mt-6" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <div>
                                <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200"></label>
                                <div className="flex items-center relative">
                                    <IconContext.Provider value={{ className: "absolute text-2xl text-gray-600 left-2 top-6" }}>
                                        <div>
                                            <IoKeypadSharp />
                                        </div>
                                    </IconContext.Provider>
                                    <input
                                        id="code"
                                        {...register('code', {
                                            required: {
                                                value: "Required",
                                                message: 'Digite seu código!'
                                            },
                                            maxLength: {
                                                value: 6,
                                                message: 'Máximo 6 caracteres!'
                                            },
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Somente números!',
                                            }
                                        })}
                                        type="text"
                                        placeholder="Digite o código do gerente"
                                        className={`w-full shadow shadow-gray-700/40 pl-10 py-2 mt-4 text-gray-600 bg-gray-100 border-dashed focus:outline-none focus:ring focus:ring-opacity-40
                                        ${errors.code
                                                ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}
                                        `}
                                    />
                                </div>
                                {errors.code && errors.code?.type === 'required' && <BoxError text={errors.code.message} />}
                                {errors.code && errors.code?.type === 'maxLength' && <BoxError text={errors.code.message} />}
                                {errors.code && errors.code?.type === 'pattern' && <BoxError text={errors.code.message} />}
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200"></label>
                                </div>
                                <div className="flex items-center relative">
                                    <IconContext.Provider value={{ className: "absolute text-2xl text-gray-600 left-2 top-6" }}>
                                        <div>
                                            <IoKey />
                                        </div>
                                    </IconContext.Provider>
                                    <input
                                        id="password"
                                        {...register('password', {
                                            required: {
                                                value: "Required",
                                                message: 'Digite sua senha!'
                                            },
                                            maxLength: {
                                                value: 6,
                                                message: 'Máximo 6 caracteres!'
                                            },
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Somente números!',
                                            }
                                        })}
                                        type="password"
                                        placeholder="Digite a senha do gerente"
                                        className={`w-full shadow shadow-gray-700/40 pl-10 py-2 mt-4 text-gray-600 bg-gray-100 border  focus:outline-none focus:ring focus:ring-opacity-40
                                        ${errors.password ? 'focus:border-1 focus:ring-0 rounded-t-md' : 'rounded-md focus:border-blue-400 focus:ring-blue-300'}
                                        `}
                                    />
                                </div>
                                {errors.password && errors.password?.type === 'required' && <BoxError text={errors.password.message} />}
                                {errors.password && errors.password?.type === 'maxLength' && <BoxError text={errors.password.message} />}
                                {errors.password && errors.password?.type === 'pattern' && <BoxError text={errors.password.message} />}
                            </div>

                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white shadow shadow-gray-700/40 transition-colors duration-200 transform 
                                    border border-orange-400 bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
                                    {loading ?
                                        <IconContext.Provider value={{ className: "text-2xl text-gray-50 animate-spin" }}>
                                            <div className="flex items-center justify-center">
                                                <CgSpinner />
                                            </div>
                                        </IconContext.Provider>
                                        :
                                        <div className="">Entrar</div>
                                    }
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-100">&copy;{ano} Solar Comércio e Agroindústria Ltda. <br /> Todos os direitos reservados.</p>


                    </div>

                    <div className="flex items-center justify-center pt-4 text-center">
                        <span className="text-sm text-gray-600">Ainda não têm acesso? </span>
                        <Link to="/register" className="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Registrar</Link>
                    </div>
                </div>
            </BoxLoginRegister>
        </Fragment>
    )
}

export default Login;