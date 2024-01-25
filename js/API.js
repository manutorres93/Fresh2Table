const url= 'http://localhost:4000/0'

export const getUsers= async()=>{
    try {
        const result = await fetch(url)
        const users = await result.json()

        //console.log(users);
         return [users]
    } catch (error) {
        
    }
}