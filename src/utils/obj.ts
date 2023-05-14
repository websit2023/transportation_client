interface AnyObject {
    [key: string]: any;
}

function removeEmpty(obj: AnyObject): AnyObject {
    const newObj: AnyObject = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
            const newSubObj = removeEmpty(value);
            if (Object.keys(newSubObj).length > 0) {
                newObj[key] = newSubObj;
            }
        } else if (value !== "" && value !== undefined) {
            newObj[key] = value;
        }
    }
    return newObj;
}


export {
    removeEmpty
}