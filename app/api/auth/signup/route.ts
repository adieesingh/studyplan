import {z} from 'zod';
const isValidTimezone=(tz:string)=>{
    try {
        new Intl.DateTimeFormat("en",{timeZone:tz}); return true;
    } catch (error) {
        return false;
    }
};

const schema = z.object({

})