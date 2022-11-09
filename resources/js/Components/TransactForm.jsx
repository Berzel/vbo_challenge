import { Portal } from "@headlessui/react";
import { useForm } from "@inertiajs/inertia-react";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";

export default function TransactForm({user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        user: user.id,
        bank: 'bank1',
        type: 'debit',
        amount: 100,
        currency: 'usd'
    });

    function openModal(event) {
        event.preventDefault();
        setModalOpen(true);
    }

    function closeModal(event) {
        event.preventDefault();
        setModalOpen(false);
    }

    function onHandleChange(event) {
        setData(event.target.name, event.target.value);
    }

    function addTransaction(event) {
        event.preventDefault();
        post(route('transactions.store'), {
            onSuccess: () => {
                setModalOpen(false);
                alert('Transaction successfull!');
                reset('bank', 'type', 'amount', 'currency');
            }
        });
    }

    return (
        <>
            <button onClick={openModal} className="font-medium text-blue-600 hover:underline">
                Transact
            </button>

            {
                modalOpen && (
                    <Portal>
                        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50'>
                            <ClickAwayListener onClickAway={closeModal}>
                                <form onSubmit={addTransaction} className='p-4 bg-white rounded-md min-w-[25rem]'>
                                    <div className='flex items-center justify-between pb-4 border-b'>
                                        <h2 className='text-lg font-semibold'>
                                            Add Transaction
                                        </h2>
                                        <button onClick={closeModal} type='button' className='p-2 bg-gray-300 rounded-full hover:text-red-500 hover:bg-red-200'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='mt-8 space-y-4'>
                                        <div className='p-4 font-semibold text-orange-600 bg-orange-100 border-2 border-orange-600 rounded-md'>
                                            New transaction for <span>{user.name}</span>
                                        </div>
                                        <label className='block' htmlFor="bank">
                                            <div className='text-sm'>
                                                Select Bank
                                            </div>

                                            <select
                                                required
                                                id="bank"
                                                name="bank"
                                                value={data.bank}
                                                className='block w-full rounded-md'
                                                onChange={onHandleChange}>
                                                    <option>--select bank---</option>
                                                    <option value="bank1">Bank 1</option>
                                                    <option value="bank3">Bank 2</option>
                                                    <option value="bank2">Bank 3</option>
                                            </select>
                                            {errors.bank && (<div className='mt-2 text-sm text-red-500'>{errors.bank}</div>)}
                                        </label>

                                        <label className='block' htmlFor="type">
                                            <div className='text-sm'>
                                                Transaction Type
                                            </div>

                                            <select
                                                required
                                                id="type"
                                                name="type"
                                                value={data.type}
                                                className='block w-full rounded-md'
                                                onChange={onHandleChange}>
                                                    <option>--transaction type---</option>
                                                    <option value="debit">Debit</option>
                                                    <option value="credit">Credit</option>
                                            </select>
                                            {errors.type && (<div className='mt-2 text-sm text-red-500'>{errors.type}</div>)}
                                        </label>

                                        <label className='block' htmlFor="currency">
                                            <div className='text-sm'>
                                                Currency
                                            </div>

                                            <select
                                                required
                                                id="currency"
                                                name="currency"
                                                value={data.currency}
                                                className='block w-full rounded-md'
                                                onChange={onHandleChange}>
                                                    <option>--currency---</option>
                                                    <option value="usd">USD</option>
                                                    <option value="gbp">GBP</option>
                                                    <option value="eur">EUR</option>
                                            </select>
                                            {errors.currency && (<div className='mt-2 text-sm text-red-500'>{errors.currency}</div>)}
                                        </label>

                                        <label className='block' htmlFor="amount">
                                            <div className='text-sm'>
                                                Amount
                                            </div>

                                            <input
                                                required
                                                id="amount"
                                                name="amount"
                                                value={data.amount}
                                                className='block w-full rounded-md'
                                                onChange={onHandleChange}
                                                type="text" />
                                            {errors.amount && (<div className='mt-2 text-sm text-red-500'>{errors.amount}</div>)}
                                        </label>
                                    </div>

                                    <div className='flex justify-between mt-8 space-x-4'>
                                        <button type='button' onClick={closeModal} className='flex-grow px-6 py-3 font-semibold bg-gray-200 rounded-md'>
                                            Cancel
                                        </button>
                                        <button disabled={processing} className='flex-grow px-6 py-3 font-semibold text-white bg-indigo-600 rounded-md'>
                                            {processing? 'Adding Transaction...':'Add Transaction'}
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
