import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import DeleteForm from '@/Components/DeleteForm';
import AddUserForm from '@/Components/AddUserForm';
import TransactForm from '@/Components/TransactForm';

export default function Welcome({users}) {
    return (
        <>
            <Head title='Berzel Assessment' />
            <div className='container mt-6 '>
                <div className="flex md:space-x-8">
                    <div className="w-full md:flex-grow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">
                                All Users
                            </h1>

                            <AddUserForm />
                        </div>

                        <div className="relative mt-4 overflow-x-auto md:shadow sm:rounded">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-gray-700 uppercase md:bg-gray-200 border-y md:border-y-0">
                                    <tr>
                                        <th scope="col" className="p-4 pl-0 md:pl-4 min-w-[15rem]">
                                            User Details
                                        </th>
                                        <th scope="col" className="p-4 min-w-[6rem]">
                                            Balance
                                        </th>
                                        <th scope="col" className="p-4">
                                            Created At
                                        </th>
                                        <th scope="col" className="p-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map(user => (
                                            <tr key={user.id} className="border-b md:bg-white hover:bg-gray-100">
                                                <td scope="row" className="p-4 pl-0 font-medium text-gray-900 md:pl-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 overflow-hidden bg-gray-200 rounded-full aspect-square">

                                                        </div>
                                                        <div>
                                                            <div>
                                                                {user.name}
                                                            </div>
                                                            <div className="mt-1 text-xs text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    1234
                                                </td>
                                                <td className="p-4">
                                                    5/10/2022
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex space-x-4">
                                                        <TransactForm user={user} />
                                                        <DeleteForm user={user} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
