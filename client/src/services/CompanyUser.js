import axios from '../modules/axios';
import { UR_POST_ENTERPRISE_USER } from '../constants/urls';

export const registerCompanyUser = async (name, phone, address, company_name, contact_name, company_type, sector, email,
                               password, rtn, contact_number, business_name) => {
    const payload = {
        name, 
        phone, 
        address, 
        company_name, 
        contact_name, 
        company_type, 
        sector, 
        email,
        password, 
        rtn, 
        contact_number, 
        business_name
    }
    try {
        const response = await axios.post(UR_POST_ENTERPRISE_USER, payload);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        return error.response;
    }
}