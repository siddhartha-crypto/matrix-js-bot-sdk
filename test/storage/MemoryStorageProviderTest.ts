import { IFilterInfo, MemoryStorageProvider } from "../../src";
import * as expect from "expect";

// @ts-ignore
describe('MemoryStorageProvider', () => {
    // @ts-ignore
    it('should return the right sync token', async () => {
        const provider = new MemoryStorageProvider();

        const value = "testing";
        expect(provider.getSyncToken()).toBeFalsy();
        provider.setSyncToken(value);
        expect(provider.getSyncToken()).toEqual(value);
    });

    // @ts-ignore
    it('should return the right filter object', async () => {
        const provider = new MemoryStorageProvider();

        const value: IFilterInfo = {id: 12, filter: {hello: "world"}};
        expect(provider.getFilter()).toBeFalsy();
        provider.setFilter(value);
        expect(provider.getFilter()).toMatchObject(value);
    });

    // @ts-ignore
    it('should track registered users', async () => {
        const provider = new MemoryStorageProvider();

        const userIdA = "@first:example.org";
        const userIdB = "@second:example.org";

        expect(provider.isUserRegistered(userIdA)).toBeFalsy();
        expect(provider.isUserRegistered(userIdB)).toBeFalsy();
        provider.addRegisteredUser(userIdA);
        expect(provider.isUserRegistered(userIdA)).toBeTruthy();
        expect(provider.isUserRegistered(userIdB)).toBeFalsy();
        provider.addRegisteredUser(userIdA); // duplicated to make sure it is safe to do so
        expect(provider.isUserRegistered(userIdA)).toBeTruthy();
        expect(provider.isUserRegistered(userIdB)).toBeFalsy();
        provider.addRegisteredUser(userIdB);
        expect(provider.isUserRegistered(userIdA)).toBeTruthy();
        expect(provider.isUserRegistered(userIdB)).toBeTruthy();
    });

    // @ts-ignore
    it('should track completed transactions', async () => {
        const provider = new MemoryStorageProvider();

        const txnA = "@first:example.org";
        const txnB = "@second:example.org";

        expect(provider.isTransactionCompleted(txnA)).toBeFalsy();
        expect(provider.isTransactionCompleted(txnB)).toBeFalsy();
        provider.setTransactionCompleted(txnA);
        expect(provider.isTransactionCompleted(txnA)).toBeTruthy();
        expect(provider.isTransactionCompleted(txnB)).toBeFalsy();
        provider.setTransactionCompleted(txnA); // duplicated to make sure it is safe to do so
        expect(provider.isTransactionCompleted(txnA)).toBeTruthy();
        expect(provider.isTransactionCompleted(txnB)).toBeFalsy();
        provider.setTransactionCompleted(txnB);
        expect(provider.isTransactionCompleted(txnA)).toBeTruthy();
        expect(provider.isTransactionCompleted(txnB)).toBeTruthy();
    });
});
