import { createContext, useState } from 'react';

export interface TokenProp {
    token: string;
    membershipId: string;
    setToken: (token: string) => void;
    setMemberId: (membershipId: string) => void;
}

export const TokenContext = createContext<TokenProp>(undefined!);

export default TokenContext;