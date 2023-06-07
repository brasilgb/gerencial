"use client"

import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff, IoKeypad, IoLockClosedSharp, IoPerson, IoStorefront } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "animate.css";
import { AuthContext } from "@/contexts/auth";
import { CgSpinnerTwo } from "react-icons/cg";

interface SignInProps {
    name: string;
    code: string;
    filial: string;
    password: string;
}

const Register = () => {

    const { registerUser, messageLogin, loading } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    let userSchema = Yup.object({
        name: Yup.string().required("Digite o nome do gerente!"),
        code: Yup.number().typeError("Digite somente números").required("Digite o código do gerente!"),
        filial: Yup.number().typeError("Digite somente números").required("Digite o número da filial!"),
        password: Yup.number().typeError("Digite somente números").required("Digite uma senha!")
    });

    const handleSubmitForm = (async (values: SignInProps, { resetForm }: any) => {
        await registerUser({ name: values.name, code: values.code, filial: values.filial, password: values.password });
        resetForm({});
    });

    return (
        <Fragment>
            <div className="flex flex-col min-h-screen bg-auth-image bg-no-repeat bg-cover font-poppins items-center justify-center">
                <div className="w-[25%] bg-solar-blue-dark shadow-md border-2 border-[#305fb6] p-4 bg-opacity-90 rounded animate__animated animate__fadeIn">
                    <div className="flex items-center justify-center py-12">
                        <Image width={195} height={71} src={"/logo/logo_grupo.png"} alt={"Logo Grupo Solar"} />
                    </div>
                    <div className="shadow rounded-md">

                        <div className="bg-solar-gray-dark pb-8 rounded  border border-white">
                            <div className=" bg-solar-yellow-dark rounded-t pl-5 py-2">
                                <h1 className="text-sm text-white font-semibold uppercase drop-shadow text-center">Acesso ao Relatório Gerencial</h1>
                            </div>

                            <div className="h-14 mx-2 flex items-center justify-center">
                                {messageLogin &&
                                    <div className="w-full m-2 p-1 bg-white rounded-md border border-red-200 shadow-sm flex items-start justify-start animate__animated animate__shakeX">
                                        <IconContext.Provider value={{ className: "text-sm text-red-500 mr-1" }}>
                                            <div>
                                                <FiAlertTriangle />
                                            </div>
                                        </IconContext.Provider>
                                        <h1 className="text-xs text-red-400">{messageLogin}</h1>
                                    </div>
                                }
                            </div>

                            <div className="px-4">
                                <Formik
                                    validationSchema={userSchema}
                                    initialValues={{
                                        name: "",
                                        code: "",
                                        filial: "",
                                        password: ""
                                    }}
                                    onSubmit={handleSubmitForm}>
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
                                        <Form onSubmit={handleSubmit} autoComplete="off">
                                            <label htmlFor="name" className="pl-1 text-sm text-gray-600 font-semibold drop-shadow">Nome</label>
                                            <div className="w-full relative mb-6">
                                                <IconContext.Provider value={{ className: "absolute text-2xl left-2 top-3 text-gray-500" }}>
                                                    <div>
                                                        <IoPerson />
                                                    </div>
                                                </IconContext.Provider>
                                                <Field
                                                    className="w-full shadow bg-solar-gray-middle border-white rounded-md focus:ring-0 focus:border-solar-gray-middle pl-9 py-2.5 text-base text-solar-blue-dark font-medium"
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    title="Digite o código de funcionário"
                                                />
                                                <ErrorMessage name="name">{msg => <div className="text-sm pl-2 pt-0.5 text-red-500 drop-shadow">{msg}</div>}</ErrorMessage>
                                            </div>

                                            <label htmlFor="code" className="pl-1 text-sm text-gray-600 font-semibold drop-shadow">Código</label>
                                            <div className="w-full relative mb-6">
                                                <IconContext.Provider value={{ className: "absolute text-2xl left-2 top-3 text-gray-500" }}>
                                                    <div>
                                                        <IoKeypad />
                                                    </div>
                                                </IconContext.Provider>
                                                <Field
                                                    className="w-full shadow bg-solar-gray-middle border-white rounded-md focus:ring-0 focus:border-solar-gray-middle pl-9 py-2.5 text-base text-solar-blue-dark font-medium"
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.code}
                                                    title="Digite o código de funcionário"
                                                />
                                                <ErrorMessage name="code">{msg => <div className="text-sm pl-2 pt-0.5 text-red-500 drop-shadow">{msg}</div>}</ErrorMessage>
                                            </div>

                                            <label htmlFor="filial" className="pl-1 text-sm text-gray-600 font-semibold drop-shadow">Número da Filial</label>
                                            <div className="w-full relative mb-6">
                                                <IconContext.Provider value={{ className: "absolute text-2xl left-2 top-3 text-gray-500" }}>
                                                    <div>
                                                        <IoStorefront />
                                                    </div>
                                                </IconContext.Provider>
                                                <Field
                                                    className="w-full shadow bg-solar-gray-middle border-white rounded-md focus:ring-0 focus:border-solar-gray-middle pl-9 py-2.5 text-base text-solar-blue-dark font-medium"
                                                    type="text"
                                                    name="filial"
                                                    id="filial"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.filial}
                                                    title="Digite o código de funcionário"
                                                />
                                                <ErrorMessage name="filial">{msg => <div className="text-sm pl-2 pt-0.5 text-red-500 drop-shadow">{msg}</div>}</ErrorMessage>
                                            </div>

                                            <label htmlFor="password" className="pl-1 text-sm text-gray-600 font-semibold drop-shadow">Senha</label>
                                            <div className="w-full relative">
                                                <IconContext.Provider value={{ className: "absolute text-2xl left-2 top-2.5 text-gray-500" }}>
                                                    <div>
                                                        <IoLockClosedSharp />
                                                    </div>
                                                </IconContext.Provider>
                                                <Field
                                                    className="w-full shadow bg-solar-gray-middle border-white rounded-md focus:ring-0 focus:border-solar-gray-middle pl-9 py-2.5 text-base text-solar-blue-dark font-medium"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                <IconContext.Provider value={{ className: "absolute text-2xl right-2 top-2.5 text-gray-500 cursor-pointer" }}>
                                                    <div>
                                                        {showPassword ? <IoEye onClick={() => setShowPassword(!showPassword)} title="Ocultar senha" /> : <IoEyeOff onClick={() => setShowPassword(!showPassword)} title="Mostrar senha" />}
                                                    </div>
                                                </IconContext.Provider>
                                                <ErrorMessage name="password">{msg => <div className="text-sm pl-2 pt-0.5 text-red-500 drop-shadow">{msg}</div>}</ErrorMessage>
                                            </div>

                                            <button
                                                className={`mt-10 w-full shadow rounded-md py-1.5 border flex items-center justify-center ${!isValid ? "" : "bg-solar-yellow-dark border-[#d37f11] hover:bg-[#df8612] hover:border-solar-yellow-dark"}`}
                                                type="submit"
                                                disabled={!isValid}
                                            >
                                                {loading
                                                    ? <IconContext.Provider value={{ className: "text-gray-50" }}>
                                                        <div>
                                                            <CgSpinnerTwo size={28} className="animate-spin" />
                                                        </div>
                                                    </IconContext.Provider>
                                                    : <span className={`text-lg ${!isValid ? "text-gray-300" : "text-solar-gray-middle drop-shadow-md"}`}>Entrar</span>
                                                }
                                            </button>
                                        </Form>
                                    )}

                                </Formik>
                                <div className="pt-6 flex items-center">
                                    <p className="text-sm font-medium text-gray-500">Efetuou o registro?</p>
                                    <Link className="text-sm text-solar-blue-dark hover:text-blue-600 font-semibold ml-2" href={"/login"}>Retornar ao login</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Register;

