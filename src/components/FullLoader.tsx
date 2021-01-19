import React from 'react';

type FullLoaderProps = {
    show: boolean | undefined;
}

function FullLoader({show} : FullLoaderProps){

        return (
            <>
                {show && (
                    <div className="d-flex justify-content-center align-items-center" style={{
                        background: 'rgba(255,255,255,0.5)',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 99
                    }}>
                        <div className="full-loader-icon">
                            <img src={"/spinner-icon.png"} className="icon-first spin"  height={140}/>
                            {/*<img src={"/spinner-icon-sabit.png"} className="icon-second " />*/}
                        </div>
                    </div>
                )}
            </>

        );

}

export default FullLoader;
