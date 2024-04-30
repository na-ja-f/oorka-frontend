import { Check, X } from "lucide-react";

function Requests({ request, handleAcceptRequest, handleReject }) {

    const { _id } = request

    return (
        <div className="lg:col-span-2 ms-96 w-12/12 pl-3 pb-2" id="posted">
            <div className="flex justify-between bg-white p-2 ml-2 rounded-lg" style={{ width: "660px" }}>
                <div className="info flex items-center">
                    <div className="h-full bg-gradient-to-b from-purple-600 to-blue-400 w-1 mr-3"></div>
                    <img src={request.profileImg} alt="User" className=" h-10 rounded-full" />
                    <p className="text-gray-800 font-semibold mx-1">{request.name}</p>
                    <p className="text-gray-500 text-sm mx-1">-</p>
                    <p className="text-gray-500 text-sm">10 min Ago</p>
                </div>
                <div className="items-center flex gap-5 actions">
                    <Check
                        onClick={() => handleAcceptRequest(_id)}
                        className="text-purple-500 cursor-pointer"
                    />
                    <X
                        onClick={() => handleReject(_id)} 
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default Requests
