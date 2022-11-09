import { Portal } from "@headlessui/react";
import { useForm } from "@inertiajs/inertia-react";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";

export default function AddUserForm() {
    const [modalOpen, setModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
    });

    function openModal(event) {
        event.stopPropagation();
        setModalOpen(true);
    }

    function closeModal(event) {
        event.preventDefault();
        setModalOpen(false);
    }

    function onHandleChange(event) {
        setData(event.target.name, event.target.value);
    }

    function createUser(event) {
        event.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                setModalOpen(false);
                reset('name', 'email');
            }
        });
    }

    return (
        <>
            <button onClick={openModal} className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded">
                Add User
            </button>

            {
                modalOpen && (
                    <Portal>
                        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50'>
                            <ClickAwayListener onClickAway={closeModal}>
                                <form onSubmit={createUser} className='p-4 bg-white rounded-md min-w-[25rem]'>
                                    <div className='flex items-center justify-between pb-4 border-b'>
                                        <h2 className='text-lg font-semibold'>
                                            Add New User
                                        </h2>
                                        <button onClick={closeModal} type='button' className='p-2 bg-gray-300 rounded-full hover:text-red-500 hover:bg-red-200'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='mt-8 space-y-4'>
                                        <label className='block' htmlFor="name">
                                            <div className='text-sm'>
                                                Name
                                            </div>
                                            <input
                                                required
                                                id='name'
                                                name='name'
                                                value={data.name}
                                                onChange={onHandleChange}
                                                className="block w-full rounded-md"
                                                type="text" />
                                            {errors.name && (<div className='mt-2 text-sm text-red-500'>{errors.name}</div>)}
                                        </label>

                                        <label className='block' htmlFor="email">
                                            <div className='text-sm'>
                                                Email
                                            </div>
                                            <input
                                                required
                                                id='email'
                                                name='email'
                                                value={data.email}
                                                onChange={onHandleChange}
                                                className="block w-full rounded-md"
                                                type="email" />
                                            {errors.email && (<div className='mt-2 text-sm text-red-500'>{errors.email}</div>)}
                                        </label>
                                    </div>

                                    <div className='flex justify-between mt-8 space-x-4'>
                                        <button type='button' onClick={closeModal} className='flex-grow px-6 py-3 font-semibold bg-gray-200 rounded-md'>
                                            Cancel
                                        </button>
                                        <button disabled={processing} className='flex-grow px-6 py-3 font-semibold text-white bg-indigo-600 rounded-md'>
                                            {processing? 'Adding User...':'Add User'}
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
