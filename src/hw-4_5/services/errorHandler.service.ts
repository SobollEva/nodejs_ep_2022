export function logControllerError(methodName: string, params: any, errorMessage: string){
   console.error(`The error has been occurred on the scope of ${methodName} with params: ${JSON.stringify(params)}`);
    console.error(`The error message: ${errorMessage}`);
}
