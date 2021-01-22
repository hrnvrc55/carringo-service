import React from "react";
import Layout from "./Layout";

function NotFoundPage(){

    return (
        <Layout stepper={false} title={"Sayfa Bulunamadı"}>
              <div className="not-found text-center">
                  <p className="title mb-0">404</p>
                  <p className="text ">Sayfa Bulunamadı</p>
              </div>
        </Layout>
    )
}

export default NotFoundPage
