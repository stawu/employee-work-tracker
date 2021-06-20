import React from 'react';
import QRCode from "react-qr-code";

class QrCodes extends React.Component {
    render() {
        return(
            <div style={{
                width: "720px"
            }}>
                {
                    this.props.employees.map(employee => {
                        return (
                            <div style={{
                                margin: "15px",
                                padding: "7px",
                                border: "1px solid grey",
                                width: "330px",
                                height: "198px",
                                display: "inline-block"
                            }}>
                                <div style={{
                                    display: "inline-block",
                                    width: "136px",
                                    height: "100%",
                                    fontWeight: "bold",
                                    verticalAlign: "top"
                                }}>
                                    {employee.name + " " + employee.lastName}
                                </div>
                                <div style={{
                                    display: "inline-block",
                                    height: "100%"
                                }}>
                                    <QRCode value={employee.id.toString()} size={178}/>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default QrCodes;