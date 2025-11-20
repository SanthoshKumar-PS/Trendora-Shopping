export function camelCase(value:string){
    return value[0].toUpperCase().concat(value.slice(1).toLowerCase())
}