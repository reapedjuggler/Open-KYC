import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import {useHistory} from 'react-router-dom';

export default function Card({data}) {

    const history = useHistory();

    return (
        <div className="flex justify-around items-center w-2/3 m-4 p-2 rounded-md bg-white">
            <div>
                <img className="w-40 h-40 rounded-full mx-auto" src={data.profile} alt="user_pic"/>
                <p className="text-md font-semibold text-center pt-2 text-gray-500">{data.name}</p>
            </div>
            <div>
                <p className="text-center">Aadhar</p>
                {data.aadhar?<BiCheckCircle className="mx-auto w-6 h-6" color={"green"}/>:<AiOutlineIssuesClose className="mx-auto w-6 h-6" color={"red"}/>}
            </div>
            <div>
                <p className="text-center">Pan</p>
                {data.pan?<BiCheckCircle className="mx-auto w-6 h-6" color={"green"}/>:<AiOutlineIssuesClose className="mx-auto w-6 h-6" color={"red"}/>}
            </div>
            <div>
                <p className="text-center">Biometrics</p>
                {data.bio?<BiCheckCircle className="mx-auto w-6 h-6" color={"green"}/>:<AiOutlineIssuesClose className="mx-auto w-6 h-6" color={"red"}/>}
            </div>
            <button onClick={() => {history.push(`/user/${data.id}`)}} class="ui active blue button">
                <i class="address card outline icon" />
                View Details
            </button>
        </div>
    )
}
