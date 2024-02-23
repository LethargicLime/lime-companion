export async function RemoveParams(arg: string) {
    let params = new URLSearchParams(location.search);
    params.delete(arg);
    history.pushState({}, '', `${location.pathname + (params.size > 0 ? '?' + params.toString() : '')}`);
}