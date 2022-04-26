import { Fragment } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Layout from "./Components/Layout";

function App() {

    return (
        <Fragment>
            <Layout>

                <AppRoutes />

            </Layout>
        </Fragment>
    )
};
export default App;