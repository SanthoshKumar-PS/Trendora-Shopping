

const Pdf = () => {
  return (
    <div className='flex flex-col p-4 gap-4'>
        {/* Headers */}
        <div className="w-full flex flex-col justify-center items-center gap-1">
            <img src="/App/LogoWithName.png" alt="Logo" className="h-16 object-cover" />
            <h1 className="text-zinc-800 font-medium text-lg">Tax Invoice/Bill Of Supply</h1> 
            <h1 className="text-zinc-700 font-normal text-md">(Original for Recipient)</h1> 
        </div>

        {/* Addresses */}
        <div className="flex justify-between items-start">
            <div>
                <h1 className="font-medium text-zinc-800 text-md">Sold By:</h1>
                <p>Santhosh Kumar</p>
                <p>12/10, SRS illam, Amman Nagar</p>
                <p>Dinnur, Hosur</p>
                <p>India - 365109</p>
                <p>Contact - 9597889163</p>
            </div>
            <div className="flex flex-col items-end">
                <h1 className="font-medium text-zinc-800 text-md">Shipping Address:</h1>
                <p className="">Santhosh Kumar</p>
                <p>12/10, SRS illam, Amman Nagar</p>
                <p>Dinnur, Hosur</p>
                <p>India - 365109</p>
                <p>Contact - 9597889163</p>
            </div>
           
        </div>

        {/* PAN GSTIN */}
        <div className="flex flex-col justify-center items-start">
            <p className=" text-md text-zinc-800">
                <span className="font-medium">PAN No: </span>
                <span>RAF12 TAH75 PLA25</span>
            </p>
            <p className=" text-md text-zinc-800">
                <span className="font-medium">GSTIN No: </span>
                <span>27ABCDE36AZHK8</span>
            </p>
        </div>

        {/* Order Details */}
        <div>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Order No: </span>
                <span>24465</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Order Date: </span>
                <span>22.08.2025</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Total Amount: </span>
                <span>55,000</span>
            </p>
            <p className="text-zinc-800 text-md">
                <span className="font-medium">Mode of Payment: </span>
                <span>Cash On Delivery</span>
            </p>
        </div>

        {/* Order Table */}
        <div className="">
            <table className="w-full border border-gray-400 border-collapse ">
                <thead className="bg-gray-300">
                    <tr className="text-center ">
                        <th className="border border-gray-400 px-2 py-2 font-medium text-md ">
                            ID
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Description
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Unit Price
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Qty
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Net Total
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Tax Percent
                        </th>
                        <th className=" border border-gray-400 px-2 py-2 font-medium text-md">
                            Total Amount
                        </th>
                    </tr>                    
                </thead>
                <tbody className="">
                    <tr className="text-center">
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            1
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            Lightweight earbuds with crystal-clear sound, noise cancellation, and long battery life. 
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹50,000
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            2
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹1,00,000
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            18%
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹1,18,000
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            2
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            A compact and energy-efficient inverter that converts solar energy into reliable household electricity. 
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹50,000
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            2
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹1,00,000
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            18%
                        </td>
                        <td className=" border border-gray-400 px-2 py-2  text-md">
                            ₹1,18,000
                        </td>
                    </tr>

                </tbody>
                <tfoot>
                <tr className="font-semibold">
                    <td className="border border-gray-400 px-2 py-2 text-right" colSpan={6}>
                    Total Amount
                    </td>
                    <td className="border border-gray-400 px-2 py-2 text-center text-blue-600">
                    ₹1,36,000
                    </td>
                </tr>
                <tr className="font-semibold">
                    <td className="border border-gray-400 px-2 py-2 text-right" colSpan={7}>
                    Total Amount in Words: <span className="text-blue-600">One Lakh Thirty Six Thousands Only</span>
                    </td>
                    {/* <td className="border border-gray-400 px-2 py-2 text-center text-blue-600" colSpan={3}>
                    One Lakh Thirty Six Thousands Only
                    </td> */}
                </tr>
                </tfoot>
                
            </table>
        </div>

        {/* Terms and Condition */}
        <div>
            <p className="font-semibold text-gray-800">Terms & Conditions:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>All orders are processed subject to availability and confirmation of payment.</li>
                <li>Products once sold are non-refundable and can only be exchanged if damaged or defective upon delivery.</li>
            </ul>
        </div>

        {/* Authorized Signature */}
        <div className="w-full flex justify-end">
            <img src="/App/Signature.png" alt="Authorized Signature" className="h-15"/>
        </div>
    </div>
  )
}

export default Pdf