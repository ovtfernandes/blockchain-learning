import React from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

const { useDrizzleState } = drizzleReactHooks;

function LoadingContainer({ children }) {
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    return !drizzleStatus.initialized
        ? 'Loading...'
        : (
            <>
                {children}
            </>
        );
}

export default LoadingContainer;
