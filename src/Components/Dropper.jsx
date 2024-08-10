
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

function AccountsDropper({ placeHolder, accounts }) {
    const acc = accounts.data.accounts

    const [selectedAccount, setSelectedAccount] = useState(null)

    const dropdownOptions = acc.map((account) => ({
        label: account.displayName,
        value: account.name,
    }))


    return (
        <div className="card flex justify-content-center border pl-4 pr-4 pt-2 pb-2">
            <Dropdown value={selectedAccount} onChange={(e) => setSelectedAccount(e.value)} options={dropdownOptions} optionLabel="label"
                placeholder={placeHolder} className="w-full md:w-14rem gap-2 text-slate-800" />
        </div>
    )
}


function PropertiesDropper({ placeHolder, accounts }) {
    const acc = accounts.data.properties

    const [selectedProperty, setSelectedProperty] = useState(null)

    const dropdownOptions = acc.map((account) => ({
        label: account.displayName,
        value: account.name,
    }))


    return (
        <div className="card flex justify-content-center border pl-4 pr-4 pt-2 pb-2">
            <Dropdown value={selectedProperty} onChange={(e) => setSelectedProperty(e.value)} options={dropdownOptions} optionLabel="label"
                placeholder={placeHolder} className="w-full md:w-14rem gap-2 text-slate-800" />

        </div>
    )
}

export {
    AccountsDropper,
    PropertiesDropper
}