import React from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { newContextComponents } from '@drizzle/react-components';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData, ContractData, ContractForm } = newContextComponents;

function MyComponent() {
    const { drizzle } = useDrizzle();
    const state = useDrizzleState(state => state);

    return (
        <div className="App">
            <AccountData
                drizzle={drizzle}
                drizzleState={state}
                accounts={state.accounts}
                accountIndex={0}
            />
            <ContractData
                drizzle={drizzle}
                drizzleState={state}
                contract="SimpleStorage"
                method="storedData"
            />
            <ContractForm
                drizzle={drizzle}
                contract="SimpleStorage"
                method="set"
            />
        </div>
    );
}

export default MyComponent;
