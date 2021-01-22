import React from "react";
import AccountLayout from "./AccountLayout";
import Layout from "../Layout";

function MyAppointments(){

    return (
        <Layout title={"Randevularım"} stepper={false}>
            <AccountLayout>
                <div>Randevularım</div>
            </AccountLayout>
        </Layout>

    )
}

export default MyAppointments;
