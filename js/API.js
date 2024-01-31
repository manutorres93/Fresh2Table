const url= 'http://localhost:4000/usuarios'

//Función GET 
export const getUsers= async()=>{
    try {
        const result = await fetch(url)
        const usersData = await result.json()

        const usersIsArray = Array.isArray(usersData) //? usersData : [];

        console.log(usersIsArray);

      
        return usersData
    } catch (error) {
        console.log('Algo no salió bien');
        
    }
}

//Funcion POST



export const createNewUser=async (user)=>{

    try {
        
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        
        console.log('Algo no salió bien');
    }


}

//Función PUT 

export const editUser=async (user)=>{

    try {
        
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        
        console.log('Algo no salió bien');
    }


}