import React from 'react'
import QRCode from 'react-qr-code'

const QrCodePopup = ({url}) => {
    console.log("url aagya",url)
return (
    <div className="text-center p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Scan this QR Code</h2>
            <div className="m-auto w-fit">
                    <QRCode value={url?url:'http://localhost:5173/'} size={200} />
            </div>
    </div>
)
}

export default QrCodePopup