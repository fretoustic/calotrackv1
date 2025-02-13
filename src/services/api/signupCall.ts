import axios from 'axios';

interface SignupResponse {
    status: number;
    data: any;
}

export async function signup(email: string, password: string,name:string,weight:number,height:number): Promise<SignupResponse> {
    try {
        console.log("trying signup");
        const response = await axios.post('http://localhost:8080/auth/signup', {
            email,
            name,
            password,
            weight,
            height
        });
        console.log(response);
        const token = response.data.token;
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}



interface SigninResponse {
    status: number;
    data: any;
}

export async function signin(email: string, password: string): Promise<SigninResponse> {
    try {

        const response = await axios.post('https://example.com/api/signin', {
            email,
            password,
        });

        const token = response.data.token;
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}

// // Example usage
// signin('test@example.com', 'password123')
//     .then(response => {
//         console.log('Status:', response.status);
//         console.log('Data:', response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
// Example usage