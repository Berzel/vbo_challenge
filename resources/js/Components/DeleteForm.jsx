import { Portal } from "@headlessui/react";
import { useForm } from "@inertiajs/inertia-react";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";

export default function DeleteForm({user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const { delete: destroy, processing } = useForm({});

    function openModal(event) {
        event.preventDefault();
        setModalOpen(true);
    }

    function closeModal(event) {
        event.preventDefault();
        setModalOpen(false);
    }

    function deleteUser(event) {
        event.preventDefault();
        destroy(route('users.destroy', {user: user.id}), {
            onSuccess: () => {
                setModalOpen(false);
                alert('User deleted.')
            }
        })
    }

    return (
        <>
            <button onClick={openModal} type='button' className="font-medium text-red-500 hover:underline">
                Delete
            </button>

            {
                modalOpen && (
                    <Portal>
                        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50'>
                            <ClickAwayListener onClickAway={closeModal}>
                                <form onSubmit={deleteUser} className='p-4 bg-white rounded-md w-[25rem]'>
                                    <div className='flex items-center justify-between pb-4 border-b'>
                                        <h2 className='text-lg font-semibold'>
                                            Delete User
                                        </h2>
                                        <button onClick={closeModal} type='button' className='p-2 bg-gray-300 rounded-full hover:text-red-500 hover:bg-red-200'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='mt-8 space-y-4'>
                                        <div className='p-4 font-semibold text-center'>
                                            Delete {user.name} with email {user.email}?
                                        </div>
                                    </div>

                                    <div className='flex justify-between mt-8 space-x-4'>
                                        <button type='button' onClick={closeModal} className='flex-grow px-6 py-3 font-semibold bg-gray-200 rounded-md'>
                                            Cancel
                                        </button>
                                        <button disabled={processing} className='flex-grow px-6 py-3 font-semibold text-white bg-red-500 rounded-md'>
                                            {processing? 'Deleting...':'Delete User'}
                                        </button>
                                    </div>
                                </form>
                            </ClickAwayListener>
                        </div>
                    </Portal>
                )
            }
        </>
    )
}
