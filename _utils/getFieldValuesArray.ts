

/* OLD CODE (kept for reference): 
export default function getFieldValuesArray(field:string, arrayOfObjects:Array<{}>):Array<string> {
    let array:Array<string> = [];
    
    for(const [key, value] of Object.entries(arrayOfObjects)) {
        array.push(value);
        console.log(array); => array [{ _id: new ObjectId('67c88e83dc676582c2afa425'), storeName: 'متجر1' }]
        because the key here => [key, value] are the indics number(0, 1, 2...) while the value is the wanted and actual object.
        so I had to use the dynamic field approach.
       
       array.push(value[field]); ERROR🔴: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.

       👉🏻 occurs because TypeScript doesn’t know that value has the field you’re trying to access.
       The issue is that Object.entries(arrayOfObjects) returns an array of key-value pairs,
       where TypeScript infers value as {} (an empty object type), so it doesn’t allow indexing by field.
    }
    return array;
    
}
*/
//TypeScript needs to be told explicitly that VALUE is an object with string keys:
export default function getFieldValuesArray<T extends Record<string, any>>(field:string, arrayOfObjects:Array<T>):Array<string> {
    let array:Array<string> = [];

    for(const [_, value] of Object.entries(arrayOfObjects)) {
        array.push(value[field]);
    }

    return array;

}