import React from "react";
import AccountLayout from "./AccountLayout";
import Layout from "../Layout";

function Profile(){

    return (
        <Layout title={"Hesabım"} stepper={false}>
            <AccountLayout>
                <div>
                    profile
                </div>
            </AccountLayout>
        </Layout>
    )
}

export default Profile;
