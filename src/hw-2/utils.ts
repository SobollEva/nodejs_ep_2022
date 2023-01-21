import {User} from './types';

function sortListByLogin(a: User, b: User) {
    const textA = a.login.toLowerCase();
    const textB = b.login.toLowerCase();

    if (textA > textB) {
        return 1;
    } else if (textA < textB) {
        return -1;
    } else {
        return 0;
    }
}

export function getAutoSuggestUsers(loginSubstring: string, limit: number, userList: User[]): User[] {
    // userList should be sorted if items number in userList are more than one item
    const newStore = userList
        .sort(sortListByLogin)
        .filter((user: User) => user.login.includes(loginSubstring));

    return limit
        ? newStore.splice(0, limit - 1)
        : newStore;
}

export function getUserIndex(userStore: User[], userId: string): number | null {
    return userStore.findIndex((item: User) => item.id === userId);
}
